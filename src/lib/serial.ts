/**
 * @module serial
 * USB Serial Port communication for the browser
 */

import { writable, type Unsubscriber, type Writable } from "svelte/store";

class DummyUSB {
    
    async requestDevice(options?: USBDeviceRequestOptions): Promise<USBDevice> {
        return new USBDevice();
    }

    async getDevices(): Promise<USBDevice[]> {
        return [];
    }
}

class DummySerial {
    async getPorts(): Promise<SerialPort[]> {
        return [];
    }

    async requestPort(options?: SerialPortRequestOptions): Promise<SerialPort> {
        return new SerialPort();
    }
}

const defaultPortOptions: SerialOptions = {
    baudRate: 9600,
    dataBits: 8,
    stopBits: 1,
    parity: "none",
    flowControl: "none",
};



export const baudRates = [
    75,
    110,
    300,
    600,
    1200,
    2400,
    4800,
    7200,
    9600,
    14400,
    19200,
    31250,
    38400,
    56000,
    57600,
    76800,
    115200,
    128000,
    256000,
];

export const dataBits = [5, 6, 7, 8];

export const stopBits = [1, 2];

export const parity = ["none", "even", "odd", "mark", "space"];

export const flowControl = ["none", "hardware", "software"];

export class SerialTerminal {
    private usb: USB;
    private serial: Serial;
    private ports: SerialPort[];
    private devices: USBDevice[];
    private connected: boolean;
    private writer: Unsubscriber | undefined;
    private reader: WritableStream<Uint8Array<ArrayBufferLike>> | undefined;
    serialInput: Writable<string>;
    serialOutput: Writable<string>;

    constructor() {
        this.usb = navigator.usb || new DummyUSB();
        this.serial = navigator.serial || new DummySerial();
        this.ports = [];
        this.devices = [];
        this.connected = false;
        this.serialInput = writable("");
        this.serialOutput = writable("");
        this.getDevices();
        this.getPorts();
        
    }


    getDevices = async () => {
        const devices = await this.usb.getDevices();
        this.devices = devices;
        return devices;
    };

    getPorts = async () => {
        const ports = await this.serial.getPorts();
        this.ports = ports;
        return ports;
    };

    requestPort = async (options?: SerialPortRequestOptions) => {
        return this.serial.requestPort(options);
    }

    requestDevice = async (options?: USBDeviceRequestOptions) => {
        return this.usb.requestDevice(options);
    }

    connect = async (portIdx: number, options: SerialOptions): Promise<SerialPort> => {
        if (portIdx < 0) {
            throw new Error("Invalid port index");
        }
        if (portIdx >= this.ports.length) {
            throw new Error("Invalid port index");
        }
        const port = this.ports[portIdx];

        // merge options
        options = {
            ...defaultPortOptions,
            ...options,
        };

        
        try {
            await port.open(options);
        } catch (e) {
            console.error(e);
            // it may be already open
        }

        this.connected = true;
        

        // setup reader
        const qStrat: QueuingStrategy = new ByteLengthQueuingStrategy({ highWaterMark: 1}); // this may need to change
        this.reader = new WritableStream<Uint8Array<ArrayBufferLike>>(
            {
                write: (chunk) => {
                    return new Promise((resolve, reject) => {
                        const decoder = new TextDecoder();
                        const value = decoder.decode(chunk);
                        this.serialInput.set(value);
                        resolve();
                    });
                },
                close: () => {
                    console.log("reader closed");
                },
                abort: (reason) => {
                    console.error(reason);
                },
            },
            qStrat
        )
        await port.readable?.pipeTo(this.reader);

        const writer = port.writable?.getWriter();
        console.log(writer);
        this.writer = this.serialOutput.subscribe(async (value) => {
            console.log("write");
            console.log(value);
            const encoder = new TextEncoder();
            const data = encoder.encode(value);
            writer?.ready.then(() => {
                writer?.write(data);
            });
        }, () => {
            writer?.ready.then(() => {
                writer?.releaseLock();
                writer?.close();
            });
        });

        return port;
    }

    disconnect = async (portIdx: number) => {
        if (portIdx < 0) {
            throw new Error("Invalid port index");
        }
        if (portIdx >= this.ports.length) {
            throw new Error("Invalid port index");
        }
        const port = this.ports[portIdx];
        this.connected = false;
        try {
            if(port.readable?.locked) {
                const reader = this.reader?.getWriter();
                reader?.ready.then(() => {
                    reader?.releaseLock();
                    reader?.close();
                });
                
            }
        } catch (e) {
            console.error(e);
        }
        try {
            port.writable?.getWriter().releaseLock();
        } catch (e) {
            console.error(e);
        }
        port.writable?.close();

        await port.close();
    }

    // destructor
    destroy = () => {
        this.reader?.close();
        this.writer?.();
        this.ports.forEach((port) => {
            try {
                port.close();
            } catch (e) {
                console.error(e);
            }
        });
    }
}


export const serialTerminal = new SerialTerminal();
