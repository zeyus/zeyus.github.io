/**
 * p5.webserial
 * (c) Gottfried Haider 2021-2023
 * LGPL
 * https://github.com/gohai/p5.webserial
 * Based on documentation: https://web.dev/serial/
 * 
 * converted to typescript and modified by zeyus 2025
 */

import { serial, SerialPort as SPFill, type SerialPort as SPFillType } from './webserial-polyfill';

interface Presets {
    [key: string]: SerialPortFilter[];
}

// Can be called with ArrayBuffers or views on them
function memcpy(dst: ArrayBufferLike | Uint8Array<ArrayBufferLike>, dstOffset: number, src: ArrayBufferLike | Uint8Array<ArrayBufferLike>, srcOffset: number, len: number): void {
    if (ArrayBuffer.isView(dst)) {
        dstOffset += dst.byteOffset;
        dst = dst.buffer;
    }
    if (ArrayBuffer.isView(src)) {
        srcOffset += src.byteOffset;
        src = src.buffer;
    }
    const dstView = new Uint8Array(dst, dstOffset, len);
    const srcView = new Uint8Array(src, srcOffset, len);
    dstView.set(srcView);
}


let ports: SerialPort[] | SPFillType[] = [];
export async function getPorts() {
    try {
        if ('serial' in navigator) {
            ports = await navigator.serial.getPorts();
        } else if ('usb' in navigator) {
            // unsure if this returns "Cannot access 'serial' before initialization"
            // even with known devices present
            ports = await serial.getPorts();
        }
    } catch (error: any) {
        console.warn('Unable to get previously used serial ports:', error.message);
    }
};
getPorts();

/**
 * Get all available serial ports used previously on this page,
 * which can be used without additional user interaction.
 * This is useful for automatically connecting to serial devices
 * on page load. Pass one of the SerialPort objects this function
 * returns to WebSerial() to do so.
 * @method usedSerialPorts
 * @return {Array of SerialPort}
 */
export const usedSerialPorts = function (): Array<any> {
    return ports;
}


/**
 * Create a and return a WebSerial instance.
 */
export const createSerial = function () {
    return new WebSerial();
}


const WebSerial = class {
    options: SerialOptions;
    port: SerialPort | SPFillType | null;
    reader: ReadableStreamDefaultReader<Uint8Array> | null;
    writer: WritableStreamDefaultWriter<Uint8Array> | undefined;
    keepReading: boolean;
    inBuf: ArrayBuffer;
    inLen: number;
    textEncoder: TextEncoder;
    textDecoder: TextDecoder;


    constructor() {
        this.options = { baudRate: 9600 };            // for port.open()
        this.port = null;                          // SerialPort object
        this.reader = null;                          // ReadableStream object
        this.keepReading = true;                          // set to false by close()
        this.inBuf = new ArrayBuffer(1024 * 1024);  // 1M
        this.inLen = 0;                             // bytes in inBuf
        this.textEncoder = new TextEncoder();             // to convert to UTF-8
        this.textDecoder = new TextDecoder();             // to convert from UTF-8

        if ('serial' in navigator) {
            // using WebSerial API
        } else if ('usb' in navigator) {
            console.log('Using WebUSB polyfill for WebSerial');
        } else {
            throw new Error('WebSerial is not supported in your browser (try Chrome or Edge)');
        }
    }

    /**
     * Returns the number of characters available for reading.
     * Note: use availableBytes() to get the number of bytes instead.
     * @method available
     * @return {Number} number of Unicode characters
     */
    available(): number {
        const view = new Uint8Array(this.inBuf, 0, this.inLen);

        // count the number of codepoint start bytes, excluding
        // incomplete trailing characters
        let characters = 0;
        for (let i = 0; i < view.length; i++) {
            const byte = view[i];
            if (byte >> 7 == 0b0) {
                characters++;
            } else if (byte >> 5 == 0b110 && i < view.length - 1) {
                characters++;
            } else if (byte >> 4 == 0b1110 && i < view.length - 2) {
                characters++;
            } else if (byte >> 3 == 0b11110 && i < view.length - 3) {
                characters++;
            }
        }
        return characters;
    }

    /**
     * Returns the number of bytes available for reading.
     * Note: use available() to get the number of characters instead,
     * as a Unicode character can take more than a byte.
     * @method availableBytes
     * @return {Number} number of bytes
     */
    availableBytes(): number {
        return this.inLen;
    }

    /**
     * Change the size of the input buffer.
     * By default, the input buffer is one megabyte in size. Use this
     * function to request a larger buffer if needed.
     * @method bufferSize
     * @param {Number} size buffer size in bytes
     */
    bufferSize(size: number) {
        if (size != this.inBuf.byteLength) {
            const newBuf = new ArrayBuffer(size);
            const newLen = Math.min(this.inLen, size);
            memcpy(newBuf, 0, this.inBuf, this.inLen - newLen, newLen);
            this.inBuf = newBuf;
            this.inLen = newLen;
        }
    }

    /**
     * Empty the input buffer and remove all data stored there.
     * @method clear
     */
    clear() {
        this.inLen = 0;
    }

    /**
     * Closes the serial port.
     * @method close
     */
    close() {
        if (this.reader) {
            this.keepReading = false;
            this.reader.cancel();
        } else {
            console.log('Serial port is already closed');
        }
    }

    /**
     * Turns the DTR signal on or off
     * @param {Boolean} assert true to assert the signal, false to deassert it
     */
    async dtr(assert: boolean) {
        if (assert === undefined) {
            throw new Error('Pass either true or false to dtr() to turn the Data Terminal Ready signal on or off');
        } else if (assert) {
            await this.port?.setSignals({ dataTerminalReady: true });
        } else {
            await this.port?.setSignals({ dataTerminalReady: false });
        }
    }

    /**
     * Returns whether or not the argument is a SerialPort (either native
     * or polyfill)
     * @param {object} port
     * @return {Boolean}
     */
    isSerialPort(port: object): boolean {
        return ((typeof SerialPort !== "undefined" && port instanceof SerialPort) || port instanceof SPFill);
    }

    /**
     * Returns the last character received.
     * This method clears the input buffer afterwards, discarding its data.
     * @method last
     * @return {String} last character received
     */
    last(): string {
        if (!this.inLen) {
            return '';
        }

        const view = new Uint8Array(this.inBuf, 0, this.inLen);

        let startByteOffset: number | null = null;
        let byteLength: number | null = null;

        for (let i = view.length - 1; 0 <= i; i--) {
            const byte = view[i];
            if (byte >> 7 == 0b0) {
                startByteOffset = i;
                byteLength = 1;
                break;
            } else if (byte >> 5 == 0b110 && i < view.length - 1) {
                startByteOffset = i;
                byteLength = 2;
                break;
            } else if (byte >> 4 == 0b1110 && i < view.length - 2) {
                startByteOffset = i;
                byteLength = 3;
                break;
            } else if (byte >> 3 == 0b11110 && i < view.length - 3) {
                startByteOffset = i;
                byteLength = 4;
                break;
            }
        }

        if (startByteOffset !== null && byteLength !== null) {
            const out = new Uint8Array(this.inBuf, startByteOffset, byteLength);
            const str = this.textDecoder.decode(out);

            // shift input buffer
            if (startByteOffset + byteLength < this.inLen) {
                memcpy(this.inBuf, 0, this.inBuf, startByteOffset + byteLength, this.inLen - byteLength - startByteOffset);
            }
            this.inLen -= startByteOffset + byteLength;

            return str;
        } else {
            return '';
        }
    }

    /**
     * Returns the last byte received as a number from 0 to 255.
     * Note: For the oldest byte in the input buffer, use readByte() instead.
     * This method clears the input buffer afterwards, discarding its data.
     * @method lastByte
     * @return {Number} value of the byte (0 to 255), or null if none available
     */
    lastByte(): number | null {
        if (this.inLen) {
            const view = new Uint8Array(this.inBuf, this.inLen - 1, 1);
            this.inLen = 0;  // Serial library in Processing does similar
            return view[0];
        } else {
            return null;
        }
    }


    /**
     * Opens a port based on arguments
     * e.g.
     * - open();
     * - open(57600);
     * - open('Arduino');
     * - open(usedSerialPorts()[0]);
     * - open('Arduino', 57600);
     * - open(usedSerialPorts()[0], 57600);
     */
    async open(...args: any[]) {
            await this.selectPort(...args);            // sets options and port
    }

    /**
     * Returns whether the serial port is open and available for
     * reading and writing.
     * @method opened
     * @return {Boolean} true if the port is open, false if not
     */
    opened(): boolean {
        return (this.port !== null && this.isSerialPort(this.port) && this.port.readable !== null);
    }

    presets: Presets = {
        'Adafruit': [                                     // various Adafruit products
            { usbVendorId: 0x239a },
        ],
        'Arduino': [                                      // from Arduino's board.txt files as of 9/13/21
            { usbVendorId: 0x03eb, usbProductId: 0x2111 },  // Arduino M0 Pro (Atmel Corporation)
            { usbVendorId: 0x03eb, usbProductId: 0x2157 },  // Arduino Zero (Atmel Corporation)
            { usbVendorId: 0x10c4, usbProductId: 0xea70 },  // Arduino Tian (Silicon Laboratories)
            { usbVendorId: 0x1b4f },                        // Spark Fun Electronics
            { usbVendorId: 0x2341 },                        // Arduino SA
            { usbVendorId: 0x239a },                        // Adafruit
            { usbVendorId: 0x2a03 },                        // dog hunter AG
            { usbVendorId: 0x3343, usbProductId: 0x0043 },  // DFRobot UNO R3
        ],
        'MicroPython': [                                  // from mu-editor as of 9/4/22
            { usbVendorId: 0x0403, usbProductId: 0x6001 },  // M5Stack & FT232/FT245 (XinaBox CW01, CW02)
            { usbVendorId: 0x0403, usbProductId: 0x6010 },  // FT2232C/D/L/HL/Q (ESP-WROVER-KIT)
            { usbVendorId: 0x0403, usbProductId: 0x6011 },  // FT4232
            { usbVendorId: 0x0403, usbProductId: 0x6014 },  // FT232H
            { usbVendorId: 0x0403, usbProductId: 0x6015 },  // FT X-Series (Sparkfun ESP32)
            { usbVendorId: 0x0403, usbProductId: 0x601c },  // FT4222H
            { usbVendorId: 0x0694, usbProductId: 0x0009 },  // Lego Spike
            { usbVendorId: 0x0d28, usbProductId: 0x0204 },  // BBC micro:bit
            { usbVendorId: 0x10c4, usbProductId: 0xea60 },  // CP210x
            { usbVendorId: 0x1a86, usbProductId: 0x7523 },  // HL-340
            { usbVendorId: 0x2e8A, usbProductId: 0x0005 },  // Raspberry Pi Pico
            { usbVendorId: 0xf055, usbProductId: 0x9800 },  // Pyboard
        ],
        'RaspberryPi': [
            { usbVendorId: 0x2e8A },                        // various Raspberry Pi products
        ]
    };

    /**
     * Reads characters from the serial port and returns them as a string.
     * The data received over serial are expected to be UTF-8 encoded.
     * @method read
     * @param {Number} length number of characters to read (default: all available)
     * @return {String}
     */
    read(length: number = this.inLen): string {
        if (!this.inLen || !length) {
            return '';
        }

        const view = new Uint8Array(this.inBuf, 0, this.inLen);

        // This consumes UTF-8, ignoring invalid byte sequences at the
        // beginning (we might have connected mid-sequence), and the
        // end (we might still missing bytes).

        // 0xxxxxxx
        // 110xxxxx 10xxxxxx
        // 1110xxxx 10xxxxxx 10xxxxxx
        // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx

        let bytesToConsume = 0;
        let startByteOffset = null;
        let byteLength = null;
        let charLength = 0;

        for (let i = 0; i < view.length; i++) {
            const byte = view[i];
            //console.log('Byte', byte);

            let codepointStart;
            if (byte >> 7 == 0b0) {
                codepointStart = true;
                bytesToConsume = 0;
                //console.log('ASCII character');
            } else if (byte >> 5 == 0b110) {
                codepointStart = true;
                bytesToConsume = 1;
                //console.log('Begin 2-byte codepoint');
            } else if (byte >> 4 == 0b1110) {
                codepointStart = true;
                bytesToConsume = 2;
                //console.log('Begin 3-byte codepoint');
            } else if (byte >> 3 == 0b11110) {
                codepointStart = true;
                bytesToConsume = 3;
                //console.log('Begin 4-byte codepoint');
            } else {
                codepointStart = false;
                bytesToConsume--;
                //console.log('Continuation codepoint');
            }

            if (startByteOffset === null && codepointStart) {
                startByteOffset = i;
                //console.log('String starts at', i);
            }
            if (startByteOffset !== null && bytesToConsume <= 0) {
                charLength++;
                byteLength = i - startByteOffset + 1;
                //console.log('Added character', charLength, 'characters', byteLength, 'bytes');
            }
            if (length <= charLength) {
                //console.log('Enough characters');
                break;
            }
        }

        if (startByteOffset !== null && byteLength !== null) {
            const out = new Uint8Array(this.inBuf, startByteOffset, byteLength);
            const str = this.textDecoder.decode(out);
            //console.log('String is', str);

            // shift input buffer
            if (startByteOffset + byteLength < this.inLen) {
                memcpy(this.inBuf, 0, this.inBuf, startByteOffset + byteLength, this.inLen - byteLength - startByteOffset);
            }
            this.inLen -= startByteOffset + byteLength;

            return str;
        } else {
            return '';
        }
    }

    /**
     * Reads characters from the serial port up to (and including) a given
     * string to look for.
     * The data received over serial are expected to be UTF-8 encoded.
     * @method readUntil
     * @param {String} needle sequence of characters to look for
     * @return {String}
     */
    readUntil(needle: string): string {
        let out = this.readArrayBufferUntil(needle);

        // trim leading invalid bytes, as does read()
        let startByteOffset = null;

        for (let i = 0; i < out.length; i++) {
            const byte = out[i];
            if (byte >> 7 == 0b0) {
                startByteOffset = i;
                break;
            } else if (byte >> 5 == 0b110) {
                startByteOffset = i;
                break;
            } else if (byte >> 4 == 0b1110) {
                startByteOffset = i;
                break;
            } else if (byte >> 3 == 0b11110) {
                startByteOffset = i;
                break;
            }
        }

        if (startByteOffset !== null) {
            if (0 < startByteOffset) {
                out = new Uint8Array(out.buffer, out.byteOffset + startByteOffset, out.length - startByteOffset);
            }
            return this.textDecoder.decode(out);
        } else {
            return '';
        }
    }

    /**
     * Reads bytes from the serial port and returns them as Uint8Array.
     * @method readArrayBuffer
     * @param {Number} length number of bytes to read (default: all available)
     * @return {Uint8Array} data
     */
    readArrayBuffer(length: number = this.inLen): Uint8Array {
        if (this.inLen && length) {
            length = Math.min(length, this.inLen);
            const view = new Uint8Array(this.inBuf, 0, length);

            // this makes a copy of the underlying ArrayBuffer
            const out = new Uint8Array(view);

            // shift input buffer
            if (length < this.inLen) {
                memcpy(this.inBuf, 0, this.inBuf, length, this.inLen - length);
            }
            this.inLen -= length;

            return out;
        } else {
            return new Uint8Array([]);
        }
    }

    /**
     * Reads bytes from the serial port up until (and including) a given sequence
     * of bytes, and returns them as Uint8Array.
     * @method readArrayBufferUntil
     * @param {String|Number|Array of number|Uint8Array} needle sequence of bytes to look for
     * @return {Uint8Array} data
     */
    readArrayBufferUntil(needle: string | number | Array<number> | Uint8Array
    ): Uint8Array {
        // check argument
        if (typeof needle === 'string') {
            needle = this.textEncoder.encode(needle);
        } else if (typeof needle === 'number' && Number.isInteger(needle)) {
            if (needle < 0 || 255 < needle) {
                throw new TypeError('readArrayBufferUntil expects as an argument an integer between 0 to 255');
            }
            needle = new Uint8Array([needle]);
        } else if (Array.isArray(needle)) {
            for (let i = 0; i < needle.length; i++) {
                if (typeof needle[i] !== 'number' || !Number.isInteger(needle[i]) ||
                    needle[i] < 0 || 255 < needle[i]) {
                    throw new TypeError('Array contained a value that wasn\'t an integer, or outside of 0 to 255');
                }
            }
            needle = new Uint8Array(needle);
        } else if (needle instanceof Uint8Array) {
            // nothing to do
        } else {
            throw new TypeError('Supported types are: String, Integer number (0 to 255), Array of integer numbers (0 to 255), Uint8Array');
        }

        if (!this.inLen || !needle.length) {
            return new Uint8Array([]);
        }

        const view = new Uint8Array(this.inBuf, 0, this.inLen);

        let needleMatchLen = 0;

        for (let i = 0; i < view.length; i++) {
            if (view[i] === needle[needleMatchLen]) {
                needleMatchLen++;
            } else {
                needleMatchLen = 0;
            }

            if (needleMatchLen == needle.length) {
                const src = new Uint8Array(this.inBuf, 0, i + 1);

                // this makes a copy of the underlying ArrayBuffer
                const out = new Uint8Array(src);

                // shift input buffer
                if (i + 1 < this.inLen) {
                    memcpy(this.inBuf, 0, this.inBuf, i + 1, this.inLen - i - 1);
                }
                this.inLen -= i + 1;

                return out;
            }
        }

        return new Uint8Array([]);
    }

    /**
     * Reads a byte from the serial port and returns it as a number
     * from 0 to 255.
     * Note: this returns the oldest byte in the input buffer. For
     * the most recent one, use lastByte() instead.
     * @method readByte
     * @return {Number} value of the byte (0 to 255), or null if none available
     */
    readByte(): number | null {
        const out = this.readArrayBuffer(1);

        if (out.length) {
            return out[0];
        } else {
            return null;
        }
    }

    /**
     * Reads bytes from the serial port and returns them as an
     * array of numbers from 0 to 255.
     * @method readBytes
     * @param {Number} length number of bytes to read (default: all available)
     * @return {Array of number}
     */
    readBytes(length: number = this.inLen): Array<any> {
        const out = this.readArrayBuffer(length);

        const bytes = [];
        for (let i = 0; i < out.length; i++) {
            bytes.push(out[i]);
        }
        return bytes;
    }

    /**
     * Reads bytes from the serial port up until (and including) a given sequence
     * of bytes, and returns them as an array of numbers.
     * @method readBytesUntil
     * @param {String|Number|Array of number|Uint8Array} needle sequence of bytes to look for
     * @return {Array of number}
     */
    readBytesUntil(needle: string | number | Array<number> | Uint8Array): Array<any> {
        const out = this.readArrayBufferUntil(needle);

        const bytes = [];
        for (let i = 0; i < out.length; i++) {
            bytes.push(out[i]);
        }
        return bytes;
    }

    /**
     * Turns the RTS signal on or off
     * @param {Boolean} assert true to assert the signal, false to deassert it
     */
    async rts(assert: boolean) {
        if (assert === undefined) {
            throw new Error('Pass either true or false to rts() to turn the Request To Send signal on or off');
        } else if (assert) {
            await this.port?.setSignals({ requestToSend: true });
        } else {
            await this.port?.setSignals({ requestToSend: false });
        }
    }

    /**
     * Sets this.port and this.options based on arguments passed
     * to the constructor.
     */
    async selectPort(...args: any[]) {
        let filters: SerialPortFilter[] | null = [];

        if (1 <= args.length) {
            if (Array.isArray(args[0])) {                // for requestPort(), verbatim
                filters = args[0];
            } else if (this.isSerialPort(args[0])) {     // use SerialPort as-is, skip requestPort()
                this.port = args[0];
                filters = null;
            } else if (typeof args[0] === 'object') {    // single vid/pid-containing object
                filters = [args[0]];
            } else if (typeof args[0] === 'string') {    // preset
                const preset = args[0];
                if (preset in this.presets) {
                    filters = this.presets[preset];
                } else {
                    throw new TypeError('Unrecognized preset "' + preset + '", available: ' + Object.keys(this.presets).join(', '));
                }
            } else if (typeof args[0] === 'number') {
                this.options.baudRate = args[0];
            } else {
                throw new TypeError('Unexpected first argument "' + args[0] + '"');
            }
        }

        if (2 <= args.length) {
            if (typeof args[1] === 'object') {           // for port.open(), verbatim
                this.options = args[1];
            } else if (typeof args[1] === 'number') {
                this.options.baudRate = args[1];
            } else {
                throw new TypeError('Unexpected second argument "' + args[1] + '"');
            }
        }

        try {
            if (filters) {
                if ('serial' in navigator) {
                    this.port = await navigator.serial.requestPort({ filters: filters });
                } else if ('usb' in navigator) {
                    this.port = await serial.requestPort({ filters: filters });
                }
            } else {
                // nothing to do if we got passed a SerialPort instance
            }
        } catch (error: any) {
            console.warn(error.message);
            this.port = null;
        }
    }

    /**
     * Opens this.port and read from it indefinitely.
     */
    async start(consumer?: (data: string) => Promise<void>) {
        if (!this.port) {
            console.error('No serial port selected.');
            return;
        }

        try {
            await this.port.open(this.options);
            console.log('Connected to serial port');
            this.keepReading = true;
        } catch (error: any) {
            let msg = error.message;
            if (msg.includes('already open')) {
                msg += ' (the port may be open in another program, please try refreshing the tab)';
            }
            console.error(msg);
            return;
        }

        while (this.port.readable && this.keepReading) {
            this.reader = this.port.readable.getReader();
            this.writer = this.port.writable?.getWriter();

            try {
                while (true) {
                    let { value, done } = await this.reader.read();

                    if (done) {
                        await this.writer?.ready;    // wait for any outstanding writes to finish
                        this.writer?.releaseLock();  // allow the serial port to be closed later
                        this.reader.releaseLock();
                        break;
                    }

                    if (value) {
                        // take the most recent bytes if the newly-read buffer was
                        // to instantly overflow the input buffer (unlikely)
                        if (this.inBuf.byteLength < value.length) {
                            value = new Uint8Array(value.buffer, value.byteOffset + value.length - this.inBuf.byteLength, this.inBuf.byteLength);
                        }

                        // discard the oldest parts of the input buffer on overflow
                        if (this.inBuf.byteLength < this.inLen + value.length) {
                            memcpy(this.inBuf, 0, this.inBuf, this.inLen + value.length - this.inBuf.byteLength, this.inBuf.byteLength - value.length);
                            console.warn('Discarding the oldest ' + (this.inLen + value.length - this.inBuf.byteLength) + ' bytes of serial input data (you might want to read more frequently or increase the buffer via bufferSize())');
                            this.inLen -= this.inLen + value.length - this.inBuf.byteLength;
                        }

                        // copy to the input buffer
                        memcpy(this.inBuf, this.inLen, value, 0, value.length);
                        this.inLen += value.length;
                        if (consumer) {
                            consumer(this.read());
                        }
                    }
                }
            } catch (error: any) {
                // if a non-fatal (e.g. framing) error occurs, continue w/ new Reader
                this.reader.releaseLock();
                console.warn(error.message);
            }
        }

        this.port.close();
        this.reader = null;
        console.log('Disconnected from serial port');
    }

    async forget() {
        getPorts();
        if (this.port) {
            console.log('Forgetting current serial port');
            this.close();
            this.port = null;
        }
        for (let port of ports) {
            console.log(port);
            try {
                await port.close();
            } catch (error: any) {
                console.warn(error.message);
            }
            await port.forget();
        }
        
    }

    /**
     * Writes data to the serial port.
     * Note: when passing a number or an array of numbers, those need to be integers
     * and between 0 to 255.
     * @method write
     * @param {String|Number|Array of number|ArrayBuffer|TypedArray|DataView} out data to send
     * @return {Boolean} true if the port was open, false if not
     */
    async write(out:string | number | Array<number> | ArrayBuffer | ArrayBufferView | DataView): Promise<boolean> {
        let buffer: ArrayBuffer | ArrayBufferView | undefined;

        // check argument
        if (typeof out === 'string') {
            buffer = this.textEncoder.encode(out);
        } else if (typeof out === 'number' && Number.isInteger(out)) {
            if (out < 0 || 255 < out) {
                throw new TypeError('Write expects a number between 0 and 255 for sending it as a byte. To send any number as a sequence of digits instead, first convert it to a string before passing it to write().');
            }
            buffer = new Uint8Array([out]);
        } else if (Array.isArray(out)) {
            for (let i = 0; i < out.length; i++) {
                if (typeof out[i] !== 'number' || !Number.isInteger(out[i]) ||
                    out[i] < 0 || 255 < out[i]) {
                    throw new TypeError('Array contained a value that wasn\'t an integer, or outside of 0 to 255');
                }
            }
            buffer = new Uint8Array(out);
        } else if (out instanceof ArrayBuffer || ArrayBuffer.isView(out)) {
            buffer = out;
        } else {
            throw new TypeError('Supported types are: String, Integer number (0 to 255), Array of integer numbers (0 to 255), ArrayBuffer, TypedArray or DataView');
        }

        if (!this.port || !this.port.writable) {
            console.warn('Serial port is not open, ignoring write');
            return false;
        }

        await this.writer?.ready;  // wait for any outstanding writes to finish
        /** @ts-ignore */
        await this.writer?.write(buffer);
        return true;
    }
}
