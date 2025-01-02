/**
 * @module serial
 * USB Serial Port communication for the browser
 */

import { writable } from "svelte/store";

export const serial = writable(null);

export const getDevices = async () => {
    const devices = await navigator.usb.getDevices();
    return devices;
};

export const getPorts = async () => {
    const ports = await navigator.serial.getPorts();
    return ports;
};
