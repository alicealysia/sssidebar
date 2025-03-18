//! Helpers for keeping track of the event stream state.
//!
//! 1. Create an [`EventStreamState`] using `Default::default()`, or any individual state part if
//!    you only care about part of the state.
//! 2. Connect to the niri socket and request an event stream.
//! 3. Pass every [`Event`] to [`EventStreamStatePart::apply`] on your state.
//! 4. Read the fields of the state as needed.

//
// Required type definitions and imports
//

// Define the Event discriminated union type.
export type Event =
    | { type: "WorkspacesChanged"; workspaces: Workspace[] }
    | { type: "WorkspaceActivated"; id: number; focused: boolean }
    | { type: "WorkspaceActiveWindowChanged"; workspace_id: number; active_window_id: number }
    | { type: "WindowsChanged"; windows: Window[] }
    | { type: "WindowOpenedOrChanged"; window: Window }
    | { type: "WindowClosed"; id: number }
    | { type: "WindowFocusChanged"; id: number }
    | { type: "KeyboardLayoutsChanged"; keyboard_layouts: KeyboardLayouts }
    | { type: "KeyboardLayoutSwitched"; idx: number };

// Define the Workspace type.
export class Workspace {
    id: number;
    output: string;
    is_active: boolean;
    is_focused: boolean;
    active_window_id: number | null;

    constructor(id: number, output: string, is_active: boolean, is_focused: boolean, active_window_id: number | null = null) {
        this.id = id;
        this.output = output;
        this.is_active = is_active;
        this.is_focused = is_focused;
        this.active_window_id = active_window_id;
    }

    // A simple clone method to mimic Rust's clone.
    clone(): Workspace {
        return new Workspace(this.id, this.output, this.is_active, this.is_focused, this.active_window_id);
    }
}

// Define the Window type.
export class Window {
    id: number;
    is_focused: boolean;

    constructor(id: number, is_focused: boolean) {
        this.id = id;
        this.is_focused = is_focused;
    }

    clone(): Window {
        return new Window(this.id, this.is_focused);
    }
}

// Define the KeyboardLayouts type.
export class KeyboardLayouts {
    current_idx: number;
    // You can add additional properties as needed

    constructor(current_idx: number) {
        this.current_idx = current_idx;
    }

    clone(): KeyboardLayouts {
        return new KeyboardLayouts(this.current_idx);
    }
}

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
            workspacesArr.push(ws.clone());
        });
        return [{ type: "WorkspacesChanged", workspaces: workspacesArr }];
    }

    apply(event: Event): Event | undefined {
        if (event.type === "WorkspacesChanged") {
            this.workspaces = new Map<number, Workspace>();
            for (const ws of event.workspaces) {
                // Using clone() if needed
                this.workspaces.set(ws.id, ws.clone());
            }
        } else if (event.type === "WorkspaceActivated") {
            const ws = this.workspaces.get(event.id);
            if (!ws) {
                throw new Error("activated workspace was missing from the map");
            }
            const output = ws.output;
            this.workspaces.forEach((wsItem) => {
                const got_activated = wsItem.id === event.id;
                if (wsItem.output === output) {
                    wsItem.is_active = got_activated;
                }
                if (event.focused) {
                    wsItem.is_focused = got_activated;
                }
            });
        } else if (event.type === "WorkspaceActiveWindowChanged") {
            const ws = this.workspaces.get(event.workspace_id);
            if (!ws) {
                throw new Error("changed workspace was missing from the map");
            }
            ws.active_window_id = event.active_window_id;
        } else {
            return event;
        }
        return undefined;
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
            windowsArr.push(win.clone());
        });
        return [{ type: "WindowsChanged", windows: windowsArr }];
    }

    apply(event: Event): Event | undefined {
        if (event.type === "WindowsChanged") {
            this.windows = new Map<number, Window>();
            for (const win of event.windows) {
                this.windows.set(win.id, win.clone());
            }
        } else if (event.type === "WindowOpenedOrChanged") {
            const windowObj = event.window;
            if (this.windows.has(windowObj.id)) {
                // Update the existing entry.
                const entry = this.windows.get(windowObj.id)!;
                // Replace with new window data.
                this.windows.set(windowObj.id, windowObj);
                var id = windowObj.id;
                var is_focused = windowObj.is_focused;
            } else {
                // Insert new entry.
                this.windows.set(windowObj.id, windowObj);
                var id = windowObj.id;
                var is_focused = windowObj.is_focused;
            }
            if (is_focused) {
                this.windows.forEach((win, key) => {
                    if (win.id !== id) {
                        win.is_focused = false;
                    }
                });
            }
        } else if (event.type === "WindowClosed") {
            const win = this.windows.get(event.id);
            if (!win) {
                throw new Error("closed window was missing from the map");
            }
            this.windows.delete(event.id);
        } else if (event.type === "WindowFocusChanged") {
            this.windows.forEach((win) => {
                win.is_focused = win.id === event.id;
            });
        } else {
            return event;
        }
        return undefined;
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
            return [{ type: "KeyboardLayoutsChanged", keyboard_layouts: this.keyboard_layouts.clone() }];
        } else {
            return [];
        }
    }

    apply(event: Event): Event | undefined {
        if (event.type === "KeyboardLayoutsChanged") {
            this.keyboard_layouts = event.keyboard_layouts;
        } else if (event.type === "KeyboardLayoutSwitched") {
            if (this.keyboard_layouts === undefined) {
                throw new Error("keyboard layouts must be set before a layout can be switched");
            }
            this.keyboard_layouts.current_idx = event.idx;
        } else {
            return event;
        }
        return undefined;
    }
}
