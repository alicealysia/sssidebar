Smokin Sexy Sidebar is an Astal 2 shell designed to expand and simplify the Niri feature set by adding some nifty gui widgets.

Currently it is in its earliest stages of development, with the only features being a simple system tray, and a Workspace switcher.

The workspace switcher is vertical, and anchored to the left side of the screen, displaying the currently focused window for each workspace in a vertical column, the hope is that this allows you to more easily tell your relative position, and the kinds of apps you're using in each of them. Being someone with ADHD, I know I wouldn't take the time to set an icon or a workspace name in the middle of doing a complex task, so this is my answer to that.

Currently I'm Using Maxverbeek's implementation, but I'm coding my own Niri - Astal implementation that is based primarily off the IPC as it exists in rust.

The system tray is nothing special. It's vertical too and on the right.

My plans for the project are:

1. Develop the basics - these are the things I find non-negotiable about a status bar. Clock, Volume manager, Log in/out manager.

2. Create a scroll bar - I really think Niri would benefit from having a scroll bar at the bottom of the screen that lets you scroll graphically, and help you understand your relative location on the workspace.

3. Add whatever extras I can manage - these could be: titlebars built around niri's feature set, a search/command bar, a neat lil music controller.

I doubt I will have the time to make this into something as fleshed out as hyprpanel. But I hope it can get people thinking about new and unique ways we can use the niri workflow! a unique window manager deserves a more unique shell, don't you think?

![image](https://github.com/user-attachments/assets/eabc37fa-dfb7-472e-b0eb-5e3262742a72)
