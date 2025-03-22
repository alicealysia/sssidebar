import { Event, Workspace, Window, KeyboardLayouts, EventTypes } from './lib';

//
// Define the EventStreamStatePart interface which represents part of the state
// communicated via the event stream.
//
export interface EventStreamStatePart {
    /**
     * Returns a sequence of events that replicates this state from default initialization.
     */
    replicate(): Event[];

    /**
     * Applies the event to this state.
     *
     * Returns `undefined` after applying the event, and returns the event if the event is ignored by this
     * part of the state.
     */
    apply(event: Event): Event | undefined;
}

//
// The full state communicated over the event stream.
//
// Different parts of the state are not guaranteed to be consistent across every single event
// sent by niri. For example, you may receive the first [`Event::WindowOpenedOrChanged`] for a
// just-opened window *after* an [`Event::WorkspaceActiveWindowChanged`] for that window. Between
// these two events, the workspace active window id refers to a window that does not yet exist in
// the windows state part.
//
export class EventStreamState implements EventStreamStatePart {
    // State of workspaces.
    public workspaces: WorkspacesState;
    // State of workspaces.
    public windows: WindowsState;
    // State of the keyboard layouts.
    public keyboard_layouts: KeyboardLayoutsState;

    constructor() {
        this.workspaces = new WorkspacesState();
        this.windows = new WindowsState();
        this.keyboard_layouts = new KeyboardLayoutsState();
    }

    replicate(): Event[] {
        let events: Event[] = [];
        events.push(...this.workspaces.replicate());
        events.push(...this.windows.replicate());
        events.push(...this.keyboard_layouts.replicate());
        return events;
    }

    apply(event: Event): Event | undefined {
        let evt1 = this.workspaces.apply(event);
        if (evt1 === undefined) return undefined;
        let evt2 = this.windows.apply(evt1);
        if (evt2 === undefined) return undefined;
        let evt3 = this.keyboard_layouts.apply(evt2);
        if (evt3 === undefined) return undefined;
        return evt3;
    }
}

//
// The workspaces state communicated over the event stream.
//
export class WorkspacesState implements EventStreamStatePart {
    // Map from a workspace id to the workspace.
    public workspaces: Map<number, Workspace>;

    constructor() {
        this.workspaces = new Map<number, Workspace>();
    }

    replicate(): Event[] {
        const workspacesArr: Workspace[] = [];
        this.workspaces.forEach((ws) => {
            // Using clone() to mimic Rust's cloned() behavior.
            workspacesArr.push(Object.assign({}, ws));
        });
        return [{ WorkspacesChanged: {workspaces: workspacesArr }}];
    }

    apply(event: Event): Event | undefined {
        const workspaceTypeDiscriminator = Object.keys(event)[0];
        switch (workspaceTypeDiscriminator) {
            case "WorkspacesChanged":
                const workspacesChanged = (event as EventTypes.WorkspacesChanged).WorkspacesChanged
                this.workspaces = new Map<number, Workspace>();
                for (let workspace of workspacesChanged.workspaces) {
                    this.workspaces.set(workspace.id, Object.assign({}, workspace));
                }
                return
            case "WorkspaceActivated":
                const workspacesActivated = (event as EventTypes.WorkspaceActivated).WorkspaceActivated;
                const activeWorkspace = this.workspaces.get(workspacesActivated.id);
                if (!activeWorkspace) {
                    throw new Error("activated workspace was missing from the map");
                }
                const output = activeWorkspace.output;
                this.workspaces.forEach((wsItem) => {
                    const got_activated = wsItem.id === workspacesActivated.id;
                    if (wsItem.output === output) {
                        wsItem.is_active = got_activated;
                    }
                    if (workspacesActivated.focused) {
                        wsItem.is_focused = got_activated;
                    }
                });
                return
            case "WorkspaceActiveWindowChanged":
                const workspaceActiveWindowChanged = (event as EventTypes.WorkspaceActiveWindowChanged).WorkspaceActiveWindowChanged
                const parentWorkspace = this.workspaces.get(workspaceActiveWindowChanged.workspace_id);
                if (!parentWorkspace) {
                    throw new Error("changed workspace was missing from the map");
                }
                parentWorkspace.active_window_id = workspaceActiveWindowChanged.active_window_id;
                return
            default:
                return event;
        }
    }
}

//
// The windows state communicated over the event stream.
//
export class WindowsState implements EventStreamStatePart {
    // Map from a window id to the window.
    public windows: Map<number, Window>;

    constructor() {
        this.windows = new Map<number, Window>();
    }

    replicate(): Event[] {
        const windowsArr: Window[] = [];
        this.windows.forEach((win) => {
            windowsArr.push(Object.assign({}, win));
        });
        return [{ WindowsChanged: {windows: windowsArr }}];
    }

    apply(event: Event): Event | undefined {
        switch (Object.keys(event)[0]) {
            case "WindowsChanged":
                const windowsChanged = (event as EventTypes.WindowsChanged).WindowsChanged;
                this.windows = new Map<number, Window>();
                for (const win of windowsChanged.windows) {
                    this.windows.set(win.id, Object.assign({}, win));
                }
                return;
            case "WindowOpenedOrChanged":
                const windowOpenedOrChanged = (event as EventTypes.WindowOpenedOrChanged).WindowOpenedOrChanged;
                const windowObj = windowOpenedOrChanged.window;
                if (this.windows.has(windowObj.id)) {
                    // Update the existing entry.
                    const entry = this.windows.get(windowObj.id)!;
                }
                    // Replace with new window data.
                this.windows.set(windowObj.id, windowObj);
                let id = windowObj.id;
                let is_focused = windowObj.is_focused;
                if (is_focused) {
                    this.windows.forEach((win, key) => {
                        if (win.id !== id) {
                            win.is_focused = false;
                        }
                    });
                }
                return;
            case "WindowClosed":
                const windowClosed = (event as EventTypes.WindowClosed).WindowClosed;
                const win = this.windows.get(windowClosed.id);
                if (!win) {
                    throw new Error("closed window was missing from the map");
                }
                this.windows.delete(windowClosed.id);
                return;
            case "WindowFocusChanged":
                const windowFocusChanged = (event as EventTypes.WindowFocusChanged).WindowFocusChanged;
                this.windows.forEach((win) => {
                    win.is_focused = win.id === windowFocusChanged.id;
                });
                return;
            default:
                return event;
        }
    }
}

//
// The keyboard layout state communicated over the event stream.
//
export class KeyboardLayoutsState implements EventStreamStatePart {
    // Configured keyboard layouts.
    public keyboard_layouts: KeyboardLayouts | undefined;

    constructor() {
        this.keyboard_layouts = undefined;
    }

    replicate(): Event[] {
        if (this.keyboard_layouts !== undefined) {
            return [{KeyboardLayoutsChanged: {keyboard_layouts: Object.assign({}, this.keyboard_layouts )}}];
        } else {
            return [];
        }
    }

    apply(event: Event): Event | undefined {
        switch (Object.keys(event)[0]) {
            case "KeyboardLayoutsChanged":
                const keyboardLayoutsChanged = (event as EventTypes.KeyboardLayoutsChanged).KeyboardLayoutsChanged;
                this.keyboard_layouts = keyboardLayoutsChanged.keyboard_layouts;
                return;
            case "KeyboardLayoutSwitched":
                const keyboardLayoutSwitched = (event as EventTypes.KeyboardLayoutSwitched).KeyboardLayoutSwitched;
                if (this.keyboard_layouts === undefined) {
                    throw new Error("keyboard layouts must be set before a layout can be switched");
                }
                this.keyboard_layouts.current_idx = keyboardLayoutSwitched.idx;
                return;
            default:
                return event;
        }
    }
}
