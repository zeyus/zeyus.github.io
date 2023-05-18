<script lang="ts">
    import {
        default as AnsiUp
    } from 'ansi_up';

    const ansi_up = new AnsiUp();
    
    type Line = {
        text: string;
        type: 'input' | 'output' | 'error';
    };
    let lines: Line[] = [];
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
        }
    }
    
    function handleCommand(input: string) {
        const args = input.split(' ');
        const command = args[0];
        switch (command) {
            case 'echo':
                const output = ansi_up.ansi_to_html(args.slice(1).join(' '));
                lines = [...lines, { text: output, type: 'output' }];
                break;
            default:
                lines = [...lines, { text: `Unknown command: ${command}`, type: 'error' }];
                break;
        }
    }
    </script>
    <style>
        .terminal {
            background-color: #000;
            color: #fff;
            padding: 10px;
            overflow: auto;
            height: 400px;
            font-family: 'Courier New', monospace;
            font-size: 1rem;
        }
        
        .terminal pre {
            margin: 0;
            font-family: 'Courier New', monospace;
        }
        
        .terminal input {
            background-color: #000;
            color: #fff;
            border: none;
            outline: none;
            font-family: 'Courier New', monospace;
            font-size: 1rem;
            padding: 0;
        }
        
        .terminal .input::before {
            content: 'user@host>';
            color: #00ff00;
            font-family: 'Courier New', monospace;
        }
        .prompt {
            color: #00ff00;
            font-family: 'Courier New', monospace;
        }
    </style>
    <div bind:this={terminalDiv} class="terminal">
        {#each lines as line (line.text + line.type)}
            {#if line.type === 'output'}
                <pre class={line.type}>{@html line.text}</pre>
            {:else}
                <pre class={line.type}>{line.text}</pre>
            {/if}
        {/each}
        <span class="prompt">user@host&gt;</span><input bind:value={currentInput} on:keydown={handleInput} />
    </div>