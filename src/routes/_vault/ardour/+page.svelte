<script lang="ts">
	import { P, List, Li, Button, Toast } from 'flowbite-svelte';
	// import BoringReference from '$components/BoringReference.svelte';
	// import BoringBibliography from '$components/BoringBibliography.svelte';
	// import { createFootnote } from '$components/BoringReference.svelte';
	import { Highlight } from 'svelte-highlight';
	import LangTag from 'svelte-highlight/LangTag.svelte';
	import { type LanguageType } from 'svelte-highlight/languages';
	import { diff } from 'svelte-highlight/languages/diff';
	import { bash } from 'svelte-highlight/languages/bash';
	import { ClipboardCleanOutline } from 'flowbite-svelte-icons';
	import 'svelte-highlight/styles/dark-violet.css';

	let items: Footnote[] = [];
	let toastStatus = false;

	function triggerToast() {
		toastStatus = true;
		setTimeout(() => {
			toastStatus = false;
		}, 3000);
	}

	const langtagColor = 'rgb(192 38 211)';
	const langtagTop = '-2.5rem';
	const langtagRight = '-.50rem';
	const highlightClass = '';
	const langtag = true;

	async function copyCode(e: MouseEvent | TouchEvent | KeyboardEvent) {
		if (e instanceof KeyboardEvent && e.key !== 'Enter') return;
		const target = e.target as HTMLElement;
		const container = target.closest('div.codeblock') as HTMLElement;
		if (!container) return;
		const code = container.querySelector('pre.langtag') as HTMLElement;
		if (code) {
			await navigator.clipboard.writeText(code.innerText);
			triggerToast();
		}
	}

	const wscript_patch = `diff --git a/wscript b/wscript
index 9745aeafd2..4ab8eb08a0 100644
--- a/wscript
+++ b/wscript
@@ -995,6 +995,7 @@ def configure(conf):
 
     if sys.platform == 'darwin':
         conf.define ('NEED_INTL', 1)
+        conf.define ('DISABLE_VISIBILITY', 1)
         autowaf.display_msg(conf, 'Will use explicit linkage against libintl in ' + user_gtk_root, 'yes')
     else:
         # libintl is part of the system, so use it
@@ -1052,10 +1053,10 @@ def configure(conf):
         #conf.env.append_value('LINKFLAGS_OSX', "-sysroot /Developer/SDKs/MacOSX10.4u.sdk")
         #conf.env.append_value('LINKFLAGS_OSX', "-sysroot /Developer/SDKs/MacOSX10.4u.sdk")
 
-        conf.env.append_value('CXXFLAGS_OSX', "-msse")
-        conf.env.append_value('CFLAGS_OSX', "-msse")
-        conf.env.append_value('CXXFLAGS_OSX', "-msse2")
-        conf.env.append_value('CFLAGS_OSX', "-msse2")
+        # conf.env.append_value('CXXFLAGS_OSX', "-msse")
+        # conf.env.append_value('CFLAGS_OSX', "-msse")
+        # conf.env.append_value('CXXFLAGS_OSX', "-msse2")
+        # conf.env.append_value('CFLAGS_OSX', "-msse2")
         #
         #       TODO: The previous sse flags NEED to be based
         #       off processor type.  Need to add in a check`;

	const osx_build_patch = `diff --git a/tools/osx_packaging/osx_build b/tools/osx_packaging/osx_build
index 264fd9a13f..7db31cf1e4 100755
--- a/tools/osx_packaging/osx_build
+++ b/tools/osx_packaging/osx_build
@@ -915,13 +915,13 @@ fi
 
 
 ##### App Signing ##############################################################
-
-if test $(sw_vers -productVersion | cut -d '.' -f 1) -lt 11 -a $(sw_vers -productVersion | cut -d '.' -f 2) -lt 14 -a $(sw_vers -productVersion | cut -d '.' -f 2) -lt 7; then
-	#less than 10.13.6 does not support notariztion
-	HARDENED_OPTIONS=
-else
-	HARDENED_OPTIONS="--options runtime --entitlements entitlements.plist"
-fi
+HARDENED_OPTIONS=
+# if test $(sw_vers -productVersion | cut -d '.' -f 1) -lt 11 -a $(sw_vers -productVersion | cut -d '.' -f 2) -lt 14 -a $(sw_vers -productVersion | cut -d '.' -f 2) -lt 7; then
+# 	#less than 10.13.6 does not support notariztion
+# 	HARDENED_OPTIONS=
+# else
+# 	HARDENED_OPTIONS="--options runtime --entitlements entitlements.plist"
+# fi
 
 echo "checking for signing credentials"
 `;

	const waf_cmds = `LC_CTYPE=C ARM_NEON_SUPPORT=1 CPATH=/usr/local/include:/opt/homebrew/include CC=/usr/bin/clang CXX=/usr/bin/clang++ ./waf configure --arm64 --no-phone-home  --strict --with-backends=jack,coreaudio,dummy --ptformat --optimize --no-carbon
LC_CTYPE=C ARM_NEON_SUPPORT=1 CPATH=/opt/homebrew/include CC=/usr/bin/clang CXX=/usr/bin/clang++ ./waf  -j$(sysctl -n hw.logicalcpu) -v
LC_CTYPE=C ARM_NEON_SUPPORT=1 CPATH=/opt/homebrew/include CC=/usr/bin/clang CXX=/usr/bin/clang++ ./waf i18n`;
</script>

{#snippet codeBlock(code: string, language: LanguageType<string>)}
	<div class="codeblock relative">
		<Highlight
			let:highlighted
			--langtag-color={langtagColor}
			--langtag-top={langtagTop}
			--langtag-right={langtagRight}
			class={highlightClass}
			{language}
			{code}
		>
			<Button
				outline={false}
				onkeyup={copyCode}
				ontouchend={copyCode}
				onclick={copyCode}
				class="absolute inset-e-4 top-4 z-10 h-8 w-8 p-0"
			>
				<ClipboardCleanOutline
					class="m-0 h-8 w-8 cursor-pointer p-1 text-gray-500 dark:text-gray-400 dark:hover:text-white"
				/>
			</Button>
			<LangTag {highlighted} languageName={language.name} code={false} {langtag} />
		</Highlight>
	</div>
{/snippet}
<P>
	This is very much a work in progress rough guide. But I thought I would document it now so it
	doesn't get lost in the void.
</P>
<P
	>These are my most recently installed homebrew packages, some of the required packages were
	probably already installed previously:</P
>
<List
	id="pkg-list"
	class="mb-4 ml-8 grid  grid-cols-2 space-y-1 text-gray-500 md:grid-cols-3 dark:text-gray-400"
	position="inside"
>
	<Li>gtk+</Li>
	<Li>hicolor-icon-theme</Li>
	<Li>at-spi2-core</Li>
	<Li>libxtst</Li>
	<Li>libxi</Li>
	<Li>libxfixes</Li>
	<Li>dbus</Li>
	<Li>cmake</Li>
	<Li>speexdsp</Li>
	<Li>sleef</Li>
	<Li>meson</Li>
	<Li>ninja</Li>
	<Li>lilv</Li>
	<Li>sratom</Li>
	<Li>sord</Li>
	<Li>zix</Li>
	<Li>serd</Li>
	<Li>lrdf</Li>
	<Li>raptor</Li>
	<Li>libwebsockets</Li>
	<Li>cppunit</Li>
	<Li>lv2</Li>
	<Li>pangomm@2.46</Li>
	<Li>pangomm</Li>
	<Li>cairomm@1.14</Li>
	<Li>cairomm</Li>
	<Li>aubio</Li>
	<Li>numpy</Li>
	<Li>fftw</Li>
	<Li>open-mpi</Li>
	<Li>pmix</Li>
	<Li>hwloc</Li>
	<Li>jack</Li>
	<Li>aften</Li>
	<Li>berkeley-db@5</Li>
	<Li>vamp-plugin-sdk</Li>
	<Li>taglib</Li>
	<Li>liblo</Li>
	<Li>glibmm@2.66</Li>
	<Li>libsigc++@2</Li>
	<Li>fluid-synth</Li>
	<Li>glibmm</Li>
	<Li>libsigc++</Li>
	<Li>boost</Li>
	<Li>cpp-gsl</Li>
	<Li>gsl</Li>
</List>
<P>clone the repo</P>
{@render codeBlock(`git clone https://github.com/Ardour/ardour.git`, bash)}
<P>cd into the repo</P>
{@render codeBlock(`cd ardour`, bash)}
<P>Apply the following patches</P>
<P>1) Patch wscript (waf)</P>
{@render codeBlock(wscript_patch, diff)}
<P>2) Patch osx_build</P>
{@render codeBlock(osx_build_patch, diff)}
<P>Run the following commands</P>
{@render codeBlock(waf_cmds, bash)}
<P>Now set some environment variables for signing</P>
{@render codeBlock(
	`set -x APPLE_DEVELOPER_ID_FOR_APPLICATION "Apple Development: xxx@xxx (XXXXX)"\ncd tools/osx_packaging\n./osx_build --nls --public`,
	bash
)}
<P>Now you should have a signed app in the build directory that you can install...good luck.</P>
<Toast
	dismissable={false}
	classes={{ content: 'rounded-lg px-8 py-4 dark:text-gray-400 dark:bg-gray-800 mb-0' }}
	class="fixed right-8 bottom-8"
	bind:toastStatus>Copied to clipboard</Toast
>

<style>
	div.codeblock {
		margin-top: 0;
		margin-bottom: 2rem;
	}
</style>
