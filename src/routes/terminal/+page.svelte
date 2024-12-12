<script lang="ts">
    // from: https://github.com/tanepiper/web-serial-controller
    // will need heavy modification to get it working properly
    import { Select } from 'flowbite-svelte';
    import { serialService } from '../../services/serial.service';
    import { connectionStatus, type ConnectionStatus } from '../../state/connection-status';
    import { vendorStore } from '../../state/vendors';
    import Terminal from '../../components/Terminal.svelte';
    // @ts-ignore
    import { title } from '$lib/store.ts';
    title.set('terminal');

    let { applicationSettings, connectedDevice, serialPortSettings } = $props();

    async function onCapability({ detail }: CustomEvent) {
        if (detail.canHaz) {
            await serialService.setupListeners();
        }
    }

    async function eventTypeHandler(
        { detail }: CustomEvent,
        filterDevice: any,
        options: SerialOptions
    ) {
        const { type } = detail;
        console.log('eventTypeHandler', type);
        if (type === 'disconnect') {
            serialService.disconnect();
        } else if (type === 'connect') {
            try {
                if (filterDevice) {
                    const val = { usbVendorId: parseInt(filterDevice.value, 10) };
                    await serialService.requestPort({ filters: [val] });
                } else {
                    await serialService.requestPort();
                }
                serialService.connect(options);
            } catch {}
        }
    }

    async function toggleConnection(status: ConnectionStatus) {
        if (status.isConnecting) {
            return;
        }
        if (status.status === 'user_cancelled') {
            return;
        }
        console.log('toggleConnection', status);
        let e = new CustomEvent('toggle-connection', {
            detail: {
                type: status.isConnected ? 'disconnect' : 'connect'
            }
        });
        eventTypeHandler(e, connectedDevice, serialPortSettings);
    }

    connectionStatus.subscribe((value) => {
        toggleConnection(value);
    });
</script>

<strong>Connection Status:</strong>&nbsp;<span class="status">{$connectionStatus.displayText}</span>
<div class="vendor-filter">
    <Select
        disabled={$connectionStatus.isConnected}
        items={$vendorStore}
        bind:value={$connectionStatus.filterDevice}
        placeholder="Filter by Vendor ID"
    />
</div>

<Terminal />
