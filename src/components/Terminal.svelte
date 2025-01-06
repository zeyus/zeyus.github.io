<script lang="ts">
    import { AnsiUp } from 'ansi_up';
    import { Button } from 'flowbite-svelte';
    import { createSerial, getPorts, usedSerialPorts } from '$lib/serial2';

    const ansi_up = new AnsiUp();
    const shellprompt = "anon@zeyus&gt;";


    
    
    type Line = {
        text: string;
        type: 'input' | 'output' | 'error' | 'serial';
    };
    let lines: Line[] = $state([]);

    function addLine(text: string, type: 'input' | 'output' | 'error' | 'serial') {
        lines = [...lines, { text, type }];
    }

    addLine(`            __________                                 
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
+-----------------------------------------------------+`, 'output');
    addLine('\n', 'output');
    addLine(`WARNING:  Unauthorized access to this system is
forbidden and will be prosecuted by law. By accessing
this system, you agree that your actions may be
monitored if unauthorized usage is suspected.`, 'output');
    addLine('\n', 'output');
    addLine('Type "help" for a list of commands.', 'output');
    addLine('\n', 'output');

    let currentInput = $state('');
    let currentPort: number | null = $state(null);
    let serialMode = $state(false);
    let inputElementValue = '';
    let terminalDiv: HTMLDivElement;
    let serialIO = $state('');
    const serialTerminal = createSerial();
    
    // For handling input
    function handleInput(e: KeyboardEvent) {
        e.preventDefault();
        const touchdevice = document.getElementById('touchinput') as HTMLTextAreaElement;
        if (serialMode) {
            handleSerialKey(e);
            return;
        }
        if (!touchdevice) {
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

    async function handleSerial(input: string) {
        await serialRequest(input);
    }

    async function handleSerialKey(e: KeyboardEvent) {
        // Handle serial input
        const key = e.key;
        if (key === 'Control' || key === 'Shift' || key === 'Alt' || key === 'Meta') {
            return;
        }
        let transformedKey: string;
        let hiddenChar = false;
        switch (key) {
            case 'Enter':
                transformedKey = '\n';
                break;
            case 'Backspace':
                transformedKey = '\x08';
                break;
            case 'Escape':
                if (currentPort !== null) {
                    serialMode = false;
                    serialTerminal.close();
                }
                return;
            default:
                if (e.ctrlKey) {
                    hiddenChar = true;
                    switch (key) {
                        case '@':
                            transformedKey = '\x00';
                            break;
                        case 'a':
                            transformedKey = '\x01';
                            break;
                        case 'b':
                            transformedKey = '\x02';
                            break;
                        case 'c':
                            transformedKey = '\x03';
                            break;
                        case 'd':
                            transformedKey = '\x04';
                            break;
                        case 'e':
                            transformedKey = '\x05';
                            break;
                        case 'f':
                            transformedKey = '\x06';
                            break;
                        case 'g':
                            transformedKey = '\x07';
                            break;
                        case 'h':
                            transformedKey = '\x08';
                            break;
                        case 'i':
                            transformedKey = '\x09';
                            break;
                        case 'j':
                            transformedKey = '\x0a';
                            break;
                        case 'k':
                            transformedKey = '\x0b';
                            break;
                        case 'l':
                            transformedKey = '\x0c';
                            break;
                        case 'm':
                            transformedKey = '\x0d';
                            break;
                        case 'n':
                            transformedKey = '\x0e';
                            break;
                        case 'o':
                            transformedKey = '\x0f';
                            break;
                        case 'p':
                            transformedKey = '\x10';
                            break;
                        case 'q':
                            transformedKey = '\x11';
                            break;
                        case 'r':
                            transformedKey = '\x12';
                            break;
                        case 's':
                            transformedKey = '\x13';
                            break;
                        case 't':
                            transformedKey = '\x14';
                            break;
                        case 'u':
                            transformedKey = '\x15';
                            break;
                        case 'v':
                            transformedKey = '\x16';
                            break;
                        case 'w':
                            transformedKey = '\x17';
                            break;
                        case 'x':
                            transformedKey = '\x18';
                            break;
                        case 'y':
                            transformedKey = '\x19';
                            break;
                        case 'z':
                            transformedKey = '\x1a';
                            break;
                        case '[':
                            transformedKey = '\x1b';
                            break;
                        case '\\':
                            transformedKey = '\x1c';
                            break;
                        case ']':
                            transformedKey = '\x1d';
                            break;
                        case '^':
                            transformedKey = '\x1e';
                            break;
                        case '_':
                            transformedKey = '\x1f';
                            break;
                        case '?':
                            transformedKey = '\x7f';
                            break;
                        default:
                            return;
                    }
                
                } else {
                    transformedKey = key;
                    break;
                }
        }
        await serialRequest(transformedKey, hiddenChar);
    }

    async function serialRequest(data: string, hidden: boolean = false) {
        if (!hidden) {
            serialIO += data;
        }

        serialTerminal.write(data);
    }

    async function serialResponse(data: string) {
        console.log("response", data);
        serialIO += data;
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
                addLine(output, 'output');
                break;
            case 'clear':
                lines = [];
                break;
            case 'help':
                addLine('Commands: echo, clear, help, serial', 'output');
                break;
            case 'serial':
                if (args.length < 2) {
                    addLine('Serial commands: list, open, close, forget', 'output');
                    break;
                }
                const serialcommand = args[1];
                switch (serialcommand) {
                    case 'list':
                        addLine('Listing serial ports...', 'output');
                        ports = usedSerialPorts();
                        ports.forEach((_, i) => {
                            addLine('Allowed port ' + i.toString(), 'serial');
                        });
                        if (ports.length === 0) {
                            addLine('No serial ports permitted, to use them from your browser please request them using "serial open ..."', 'serial');
                        }
                        break;
                    case 'open':
                        if (args.length < 7) {
                            const txt = 'Usage: serial open BAUD_RATE DATA_BITS STOP_BITS PARITY FLOW_CONTROL' +
                                '\nBAUD_RATE: The baud rate to use (default: 9600)' +
                                '\nDATA_BITS: The number of data bits (default: 8)' +
                                '\nSTOP_BITS: The number of stop bits (default: 1)' +
                                '\nPARITY: The parity to use (default: none)' +
                                '\nFLOW_CONTROL: The flow control to use (default: none)' +
                                '\nExample: serial open 9600 8 1 none none';

                            addLine(txt, 'output');
                            break;
                        }
                        // const port = parseInt(args[2]);
                        const baudRate = parseInt(args[2]);
                        const dataBits = parseInt(args[3]);
                        const stopBits = parseInt(args[4]);
                        const parity = args[5];
                        const flowControl = args[6];
                        serialTerminal.open(baudRate).then(() => {
                            const port = serialTerminal.port;

                            if (port === null) {
                                addLine('No serial ports available', 'error');
                                return;
                            }
                            getPorts().then(() => {
                                ports = usedSerialPorts();
                                currentPort = usedSerialPorts().indexOf(port);
                            });

                            addLine(`Opening serial port...`, 'serial');
                            serialMode = true;
                            
                            serialIO = '';
                            serialTerminal.selectPort(port, {
                                baudRate: baudRate,
                                dataBits: dataBits,
                                stopBits: stopBits,
                                parity: parity as ParityType,
                                flowControl: flowControl as FlowControlType
                            }).then(() => {
                                serialTerminal.start(serialResponse).then(() => {
                                    serialMode = false;
                                    addLine('Serial port closed', 'serial');
                                }).catch((err) => {
                                    serialMode = false;
                                    addLine(`Error starting serial port: ${err}`, 'error');
                                    addLine('Try refreshing the browser tab or ensuring the port is not used by another program.', 'error');
                                });
                            }).catch((err) => {
                                serialMode = false;
                                addLine(`Error opening serial port: ${err}`, 'error');
                            })
                        }).catch((err) => {
                            addLine(`Error opening serial port: ${err}`, 'error');
                        });
                        break;
                    case 'close':
                        addLine('Closing serial port...', 'serial');
                        serialTerminal.close();
                        addLine('Closed serial port', 'serial');
                        break;
                    case 'forget':
                        addLine('Forgetting serial ports...', 'serial');
                        serialTerminal.forget().then(() => {
                            addLine('Serial ports forgotten.', 'serial');
                        }).catch((err) => {
                            addLine(`Error forgetting serial ports: ${err}`, 'error');
                        });
                        break;
                    default:
                        addLine(`Unknown serial command: ${serialcommand}`, 'error');
                        break;
                }
                break;
            default:
                addLine(`Unknown command: ${command}`, 'error');
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
    let ports = $state<SerialPort[]>([]);

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
        {#if serialMode}
            <pre class="input">{serialIO}</pre><span class="cursor"></span>
        {:else}
            <pre class="input">{currentInput}</pre><span class="cursor"></span>
        {/if}
    </div>
</div>
{#if serialMode}
    <Button name="Disconnect" on:click={() => {
        serialMode = false;
        serialTerminal.close();
    }}> Disconnect</Button>
{/if}
<svelte:window
    on:keydown={handleInput}
/>
