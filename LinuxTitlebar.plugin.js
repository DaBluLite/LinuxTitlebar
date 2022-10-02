/**
* @name Linux Titlebar
* @version 0.0.1
* @description A Windows titlebar replica for linux
* @author DaBluLite
*/

/*@cc_on
@if (@_jscript)
	
   // Offer to self-install for clueless users that try to run this directly.
   var shell = WScript.CreateObject("WScript.Shell");
   var fs = new ActiveXObject("Scripting.FileSystemObject");
   var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\BetterDiscord\plugins");
   var pathSelf = WScript.ScriptFullName;
   // Put the user at ease by addressing them in the first person
   shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
   if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
      shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
   } else if (!fs.FolderExists(pathPlugins)) {
      shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
   } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
      fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
      // Show the user where to put plugins in the future
      shell.Exec("explorer " + pathPlugins);
      shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
   }
   WScript.Quit();

@else@*/

module.exports = class LinuxTitlebar {
    load() {}
    
    start() {
        document.documentElement.classList.add("platform-linux-frameless");
    	let titlebar = document.createElement("div");
    	titlebar.id = "linuxCustomTitlebar";
    	titlebar.innerHTML = `
    	<div class="linuxCustomTitlebarButton linuxCustomTitlebarButton_close material-symbols-sharp" onclick="DiscordNative.window.close();">close</div>
    	<div class="linuxCustomTitlebarButton linuxCustomTitlebarButton_max material-symbols-sharp" onclick="DiscordNative.window.maximize();">crop_5_4</div>
    	<div class="linuxCustomTitlebarButton linuxCustomTitlebarButton_min material-symbols-sharp" onclick="DiscordNative.window.minimize();">minimize</div>
    	`;
    	BdApi.injectCSS("linuxCustomTitlebarStyles", `
        @import url(https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200);
    	@import url(https://fonts.googleapis.com/icon?family=Material+Icons);
    	#linuxCustomTitlebar {
    	    width: 100%;
    	    height: 22px;
    	    background-color: var(--background-tertiary);
    	    order: -999;
    	    -webkit-app-region: drag;
    	}
        .sidebar-1tnWFu {
            border-top-left-radius: 8px;
        }
    	.linuxCustomTitlebarButton {
            float: right;
            line-height: 22px;
            height: 22px;
            width: 35px;
            opacity: .8;
            text-align: center;
            font-size: 17px;
            color: var(--header-primary);
            -webkit-app-region: no-drag;
        }
        .linuxCustomTitlebarButton_max {
            line-height: 24px;
            font-size: 12px;
        }
        .linuxCustomTitlebarButton_close {
            line-height: 24px;
        }
    	.linuxCustomTitlebarButton_close:hover {
    	    background-color: #ff0000;
    	}
    	.linuxCustomTitlebarButton_max:hover {
    	    background-color: var(--background-secondary);
    	}
    	.linuxCustomTitlebarButton_min:hover {
    	    background-color: var(--background-secondary);
    	}
    	`);
    	document.getElementById("app-mount").appendChild(titlebar);
    }
    
    stop() {
        document.documentElement.classList.remove("platform-linux-frameless")
        document.getElementById("linuxCustomTitlebar").remove();
        BdApi.clearCSS("linuxCustomTitlebarStyles");
    }
}