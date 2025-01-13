<script lang="ts">
    import { P, List, Li } from 'flowbite-svelte';
    // import BoringReference from '$components/BoringReference.svelte';
    // import BoringBibliography from '$components/BoringBibliography.svelte';
    // import { createFootnote } from '$components/BoringReference.svelte';
    import { Highlight } from 'svelte-highlight';
    import { diff } from 'svelte-highlight/languages/diff'
    import { bash } from 'svelte-highlight/languages/bash'
    import "svelte-highlight/styles/black-metal-dark-funeral.css";

    let items: Footnote[] = [];

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
<P>
    This is very much a work in progress rough guide. But I thought I would document it now so it doesn't get lost in the void.
</P>
<P>These are my most recently installed homebrew packages:</P>
<List id="pkg-list" class="ml-4 space-y-1 text-gray-500 dark:text-gray-400" position="inside">
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
<P>
    clone the repo
</P>
<Highlight language={bash} code={`git clone https://github.com/Ardour/ardour.git`} />

<P>
    cd into the repo
</P>
<Highlight language={bash} code={`cd ardour`} />

<P>
    Apply the following patches
</P>
<Highlight language={diff} code={wscript_patch} />
<Highlight language={diff} code={osx_build_patch} />
<P>
    Run the following commands
</P>
<Highlight language={bash} code={waf_cmds} />
<P>
    Now set some environment variables for signing 
</P>
<Highlight language={bash} code={`set -x APPLE_DEVELOPER_ID_FOR_APPLICATION "Apple Development: xxx@xxx (XXXXX)"\ncd tools/osx_packaging\n./osx_build --nls --public`} />
<P>
    Now you should have a signed app in the build directory that you can install...good luck.
</P>
