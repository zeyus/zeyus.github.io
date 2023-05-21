<script lang="ts">
    import {
        default as AnsiUp
    } from 'ansi_up';

    const ansi_up = new AnsiUp();
    const shellprompt = "anon@zeyus&gt;";
    
    type Line = {
        text: string;
        type: 'input' | 'output' | 'error';
    };
    let lines: Line[] = [
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
    ];
    let currentInput = '';
    let terminalDiv: HTMLDivElement;
    
    // For handling input
    function handleInput(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            lines = [...lines, { text: currentInput, type: 'input' }];
            handleCommand(currentInput);
            currentInput = '';
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
    
    function handleCommand(input: string) {
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
                lines = [...lines, { text: 'Commands: echo, clear, help', type: 'output' }];
                break;
            default:
                lines = [...lines, { text: `Unknown command: ${command}`, type: 'error' }];
                break;
        }
    }

    // For typing out the intro
    const intro = "echo 👋\\x1b[31mHello\\x1b[0m👋\\n🌍\\x1b[32mWorld\\x1b[0m🌍"
    typeInput(intro);
    

    </script>
    <style>
        .terminal {
            background-color: #000;
            color: #fff;
            padding: 10px;
            overflow: auto;
            height: 100%;
            font-family: 'Courier New', monospace;
            font-size: 1rem;
        }
        
        .terminal-line {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        .terminal pre {
            margin: 0;
            font-family: 'Courier New', monospace;
        }
        .prompt {
            color: #00ff00;
            font-family: 'Courier New', monospace;
        }
        .cursor {
            display: inline-block;
            width: 7px;
            height: 1rem;
            background-color: #00ff00;
            animation: blink 1.5s infinite;
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
    <div bind:this={terminalDiv} class="terminal">
        {#each lines as line}
            <div class="terminal-line">
                {#if line.type === 'output'}
                    <pre class={line.type}>{@html line.text}</pre>
                {:else if line.type === 'error'}
                    <pre class={line.type}>{line.text}</pre>
                {:else}
                    <span class="prompt">{@html shellprompt}</span><pre class={line.type}>{line.text}</pre>
                {/if}
            </div>
        {/each}
        <div class="terminal-line">
            <span class="prompt">{@html shellprompt}</span><pre class="input">{currentInput}</pre><span class="cursor"></span>
        </div>
    </div>
<svelte:window
    on:keydown={handleInput}
/>
