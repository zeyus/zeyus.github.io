<script lang="ts">
    import { AnsiUp } from 'ansi_up';
    import { onMount } from 'svelte';
    import { serialTerminal } from '$lib/serial';
	import { on } from 'svelte/events';

    const ansi_up = new AnsiUp();
    const shellprompt = "anon@zeyus&gt;";
    
    type Line = {
        text: string;
        type: 'input' | 'output' | 'error' | 'serial';
    };
    let lines: Line[] = $state([
        { text: `            __________                                 
         .'----------\`.                              
         | .--------. |                             
         | |########| |       __________              
         | |########| |      /__________\             
.--------| \`--------' |------|    --=-- |-------------.
|        \`----,-.-----'      |o ======  |             | 
|       ______|_|_______     |__________|             | 
|      /  %%%%%%%%%%%%  \\                             | 
|     /  %%%%%%%%%%%%%%  \\                            | 
|     ^^^^^^^^^^^^^^^^^^^^                            | 
+-----------------------------------------------------+`, type: 'output' },
        { text: '\n', type: 'output' },
        { text: `WARNING:  Unauthorized access to this system is
forbidden and will be prosecuted by law. By accessing
this system, you agree that your actions may be
monitored if unauthorized usage is suspected.`, type: 'output' },
        { text: '\n', type: 'output' },
        { text: 'Type "help" for a list of commands.', type: 'output' },
        { text: '\n', type: 'output' },
    ]);
    let currentInput = $state('');
    let serialMode = $state(false);
    let inputElementValue = '';
    let terminalDiv: HTMLDivElement;
    
    // For handling input
    function handleInput(e: KeyboardEvent) {
        e.preventDefault();
        const touchdevice = document.getElementById('touchinput') as HTMLTextAreaElement;
        if (serialMode) {
            handleSerialKey(e.key);
            return;
        }
        if (e.key === 'Enter') {
            lines = [...lines, { text: currentInput, type: 'input' }];
            handleCommand(currentInput);
            currentInput = '';
            touchdevice.value = '';
            inputElementValue = '';
            // Scroll to bottom after a slight delay
            setTimeout(() => {
                terminalDiv.scrollTop = terminalDiv.scrollHeight;
            }, 0);
        } else if (e.key === 'Backspace') {
            currentInput = currentInput.slice(0, -1);
        } else if (e.key.length === 1) {
            currentInput += e.key;
        }
    }

    function handleVirtualInput(e: Event) {
        const input = e.target as HTMLTextAreaElement;
        currentInput = input.value;
        if (serialMode) {
            handleSerial(currentInput);
            return;
        }
        // if \r or \n is in the input, handle it as an enter
        if (currentInput.includes('\r') || currentInput.includes('\n')) {
            handleInput(new KeyboardEvent('keydown', { key: 'Enter' }));
        }
    }

    function typeInput(input: string, delay: number = 25) {
        for (let i = 0; i < input.length; i++) {
            setTimeout(() => {
                currentInput += input[i];
            }, delay * i);
        }
        setTimeout(() => {
            handleInput(new KeyboardEvent('keydown', { key: 'Enter' }));
        }, delay * input.length);
    }

    function handleSerial(input: string) {


    }

    function handleSerialKey(key: string) {
        // Handle serial input
        serialTerminal.serialOutput.set(key);
    }

    function serialResponse(data: string) {
        lines = [...lines, { text: data, type: 'serial' }];
    }
    
    function handleCommand(input: string) {
        input = input.trim().replace(/\s+/g, ' ');
        const args = input.split(' ');
        const command = args[0];
        switch (command) {
            case 'echo':
                const echoarg: string = args.slice(1).join(' ');
                // Ansi escape codes are not parsed from the input
                // before using ansi_to_html, we need to parse them
                const output: string = ansi_up.ansi_to_html(
                    echoarg
                        .replace(/\\033/g, '\x1b')
                        .replace(/\\e/g, '\x1b')
                        .replace(/\\n/g, '\n')
                        .replace(/\\t/g, '\t')
                        .replace(/\\r/g, '\r')
                        .replace(/\\b/g, '\b')
                        .replace(/\\f/g, '\f')
                        .replace(/\\v/g, '\v')
                        .replace(/\\0/g, '\0')
                        .replace(/\\x1b/g, '\x1b'));
                lines = [...lines, { text: output, type: 'output' }];
                break;
            case 'clear':
                lines = [];
                break;
            case 'help':
                lines = [...lines, { text: 'Commands: echo, clear, help, serial', type: 'output' }];
                break;
            case 'serial':
                if (args.length < 2) {
                    lines = [...lines, { text: 'Serial commands: list, open, close', type: 'output' }];
                    break;
                }
                const serialcommand = args[1];
                switch (serialcommand) {
                    case 'list':
                        lines = [...lines, { text: 'Listing serial ports...', type: 'output' }];
                        serialTerminal.getPorts().then((ports) => {
                            ports.forEach((port, i) => {
                                lines = [...lines, { text: i.toString() + ': Allowed port ' + i.toString(), type: 'serial' }];
                            });
                        });
                        break;
                    case 'open':
                        if (args.length < 8) {
                            const txt = 'Usage: serial open PORT_INDEX BAUD_RATE DATA_BITS STOP_BITS PARITY FLOW_CONTROL' +
                                '\nPORT_INDEX: The index of the port to open' +
                                '\nBAUD_RATE: The baud rate to use (default: 9600)' +
                                '\nDATA_BITS: The number of data bits (default: 8)' +
                                '\nSTOP_BITS: The number of stop bits (default: 1)' +
                                '\nPARITY: The parity to use (default: none)' +
                                '\nFLOW_CONTROL: The flow control to use (default: none)' +
                                '\nExample: serial open 0 9600 8 1 none none';

                            lines = [...lines, { text: txt, type: 'serial' }];
                            break;
                        }
                        const port = parseInt(args[2]);
                        const baudRate = parseInt(args[3]);
                        const dataBits = parseInt(args[4]);
                        const stopBits = parseInt(args[5]);
                        const parity = args[6];
                        const flowControl = args[7];
                        lines = [...lines, { text: `Opening serial port ${port}...`, type: 'serial' }];
                        serialTerminal.connect(port, {
                            baudRate: baudRate,
                            dataBits: dataBits,
                            stopBits: stopBits,
                            parity: parity as ParityType,
                            flowControl: flowControl as FlowControlType
                        }).then((sp) => {
                            serialMode = true;
                            lines = [...lines, { text: `Opened serial port ${port}`, type: 'serial' }];
                            sp.ondisconnect = () => {
                                lines = [...lines, { text: `Serial port ${port} disconnected`, type: 'serial' }];
                                serialMode = false;
                            };
                            serialTerminal.serialInput.subscribe(serialResponse);
                        }).catch((err) => {
                            lines = [...lines, { text: `Error opening serial port ${port}: ${err}`, type: 'error' }];
                        })

                        break;
                    case 'close':
                        if (args.length < 3) {
                            lines = [...lines, { text: 'Usage: serial close PORT_INDEX', type: 'serial' }];
                            break;
                        }
                        const closeport = args[2];
                        lines = [...lines, { text: `Closing serial port ${closeport}...`, type: 'serial' }];
                        serialTerminal.getPorts().then((ports) => {
                            if (ports.includes(closeport)) {
                                lines = [...lines, { text: `Closed serial port ${closeport}`, type: 'ouserialtput' }];
                            } else {
                                lines = [...lines, { text: `Serial port ${closeport} not found`, type: 'error' }];
                            }
                        });
                        break;
                    default:
                        lines = [...lines, { text: `Unknown serial command: ${serialcommand}`, type: 'error' }];
                        break;
                }
                break;
            default:
                lines = [...lines, { text: `Unknown command: ${command}`, type: 'error' }];
                break;
        }
    }
    
    // Add handler for touch devices:
    // Focus on hidden input if touch happens anywhere on the terminal
    const handleTerminalTouch = (event: TouchEvent) => {
        event.preventDefault();
        const touchdevice = document.getElementById('touchinput');
        if (touchdevice) {
            touchdevice.focus();
        }
    }

    // For typing out the intro
    const intro = "echo 👋\\x1b[31mHello\\x1b[0m👋\\n🌍\\x1b[32mWorld\\x1b[0m🌍"
    typeInput(intro);
    let devices = $state<USBDevice[]>([]);
    let ports = $state<SerialPort[]>([]);
    
    const updateDevices = async () => {
        serialTerminal.requestDevice({filters:[]}).then(function(device){
            console.log(device);
        });
        devices = await serialTerminal.getDevices();
    }

    const updatePorts = async () => {
        await serialTerminal.requestPort({filters:[]}).then(function(port){
            console.log(port);
        });
        ports = await serialTerminal.getPorts();
    }

    onMount(() => {
        
    });

    $inspect(ports);
    $inspect(devices);
    
</script>
<style>
    @font-face {
        font-family: 'HackNerdFont';
        src: url('/HackNerdFont-Regular.woff2') format('woff2');
    }
    .terminal {
        /* background-color: #000; */
        border: 2px inset #999999;
        color: #fff;
        padding: 1rem;
        overflow-y: scroll;
        max-height: 27rem;
        height: 27rem;
        width: 100%;
        position: relative;
        background-color: #030303;
        /* use HackNerdFont-Regular.woff in static folder */
        font-family: 'HackNerdFont', monospace;
        font-size: 0.9rem;
        line-height: 1.0rem;
    }
    
    .terminal-line {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .terminal pre {
        margin: 0;
        font-family: 'HackNerdFont', monospace;
        font-size: 0.9rem;
        line-height: 1.0rem;
    }
    .prompt {
        color: #00ff00;
        font-family: 'HackNerdFont', monospace;
        font-size: 0.9rem;
        line-height: 1.1rem;
    }
    .cursor {
        display: inline-block;
        width: 7px;
        height: 1rem;
        background-color: #00ff00;
        animation: blink 1.5s infinite;
    }
    #touchinput {
        position: absolute;
        left: -9999px;
        clip: rect(1px,1px,1px,1px);
        width: 10px;
        height: 10px;
    }
    @keyframes blink {
        0% {
            opacity: 1;
        }
        49% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
        99% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>
<div bind:this={terminalDiv} class="terminal" id="terminal-wrapper" ontouchend={handleTerminalTouch}>
    {#each lines as line}
        <div class="terminal-line">
            {#if line.type === 'output'}
                <pre class={line.type}>{@html line.text}</pre>
            {:else if line.type === 'serial'}
                <pre class="output">{line.text}</pre>
            {:else if line.type === 'error'}
                <pre class={line.type}>{line.text}</pre>
            {:else}
                <span class="prompt">{@html shellprompt}</span><pre class={line.type}>{line.text}</pre>
            {/if}
        </div>
    {/each}
    <div class="terminal-line">
        {#if !serialMode}
            <span class="prompt">{@html shellprompt}</span>
        {/if}
        <textarea 
            autocomplete="off"
            spellcheck="false"
            autocapitalize="off"
            oninput={handleVirtualInput}
            name="mobileinput"
            id="touchinput"></textarea>
        <pre class="input">{currentInput}</pre><span class="cursor"></span>
    </div>
</div>
<svelte:window
    on:keydown={handleInput}
/>
<div>
    <button type="button" onclick={updateDevices}>Devices</button>
    <ul>
        {#each devices as device}
            <li>{device.productName}</li>
        {/each}
    </ul>
    <button type="button" onclick={updatePorts}>Ports</button>
    <ul>
        {#each ports as port}
            <li>{port.open({
                baudRate: 9600,
                dataBits: 8,
                stopBits: 1,
                parity: "none",
                flowControl: "none"
            })}</li>
        {/each}
    </ul>
</div>
