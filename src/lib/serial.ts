/**
 * @module serial
 * USB Serial Port communication for the browser
 */

import { writable, type Writable } from "svelte/store";

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
            const reader = port.readable?.getReader();
            if (reader) {
                await reader.cancel();
                reader.releaseLock();
            }

            const writer = port.writable?.getWriter();
            if (writer) {
                await writer.abort();
                writer.releaseLock();
            }
            await port.close();
        } catch (e) {
            console.error(e);
        }
        await port.open(options);
        this.connected = true;

        port.readable?.pipeTo(new WritableStream({
            write: (chunk) => {
                const decoder = new TextDecoder();
                const text = decoder.decode(chunk);
                this.serialInput.set(text);
            },
        }));

        this.serialOutput.subscribe(async (value) => {
            const encoder = new TextEncoder();
            const data = encoder.encode(value);
            const writer = port.writable?.getWriter();
            if (writer) {
                await writer.write(data);
                writer.releaseLock();
            }
            
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
        await port.close();
    }

    // destructor
    destroy = () => {
        this.ports.forEach((port) => {
            port.close();
        });
    }
}


export const serialTerminal = new SerialTerminal();
