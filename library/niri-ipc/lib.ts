export type IPCRequest =
    "Version"
    | "Outputs"
    | "Workspaces"
    | "Windows"
    | "Layers"
    | "KeyboardLayouts"
    | "FocusedOutput"
    | "FocusedWindow"
    | "PickWindow"
    | { Action: Action }
    | { Output: { output: string, action: OutputAction }
    | "EventStream"
    | "ReturnError"
}

export interface IPCResponse {
    [reply: string]: 
        "Handled"
        | { Version: string }
        | { Outputs: { [key: string]: Output } }
        | { Workspaces: Workspace[] }
        | { Windows: Window[] }
        | { Layers: LayerSurface[] }
        | { KeyboardLayouts: KeyboardLayouts }
        | { FocusedOutput?: Output }
        | { FocusedWindow?: Window }
        | { PickedWindow: Window }
        | { OutputConfigChanged: OutputConfigChanged }
}


export type Action =
    { Quit: { skip_confirmation: boolean } }
    | "PowerOffMonitors"
    | "PowerOnMonitors"
    | { Spawn : { command: string [] } }
    | { DoScreenTransition: { delay_ms?: number } }
    | { Screenshot: { show_pointer: boolean } }
    | { ScreenshotScreen: { write_to_disk: boolean, show_pointer: boolean } }
    | { ScreenshotWindow: { id?: number, write_to_disk: boolean } }
    | { CloseWindow: { id?: number } }
    | { FullscreenWindow: { id?: number } }
    | { ToggleWindowedFullscreen: { id: number } }
    | { FocusWindow: { id: number } }
    | { FocusWindowInColumn: { index: number } }
    | "FocusWindowPrevious"
    | "FocusColumnLeft"
    | "FocusColumnRight"
    | "FocusColumnFirst"
    | "FocusColumnLast"
    | "FocusColumnRightOrFirst"
    | "FocusColumnLeftOrLast"
    | { FocusColumn: { index: number } }
    | "FocusWindowOrMonitorUp"
    | "FocusWindowOrMonitorDown"
    | "FocusColumnOrMonitorLeft"
    | "FocusColumnOrMonitorRight"
    | "FocusWindowDown"
    | "FocusWindowUp"
    | "FocusWindowDownOrColumnLeft"
    | "FocusWindowDownOrColumnRight"
    | "FocusWindowUpOrColumnLeft"
    | "FocusWindowUpOrColumnRight"
    | "FocusWindowOrWorkspaceDown"
    | "FocusWindowOrWorkspaceUp"
    | "FocusWindowTop"
    | "FocusWindowBottom"
    | "FocusWindowDownOrTop"
    | "FocusWindowUpOrBottom"
    | "MoveColumnLeft"
    | "MoveColumnRight"
    | "MoveColumnToFirst"
    | "MoveColumnToLast"
    | "MoveColumnLeftOrToMonitorLeft"
    | "MoveColumnRightOrToMonitorRight"
    | { MoveColumnToIndex: { index: number} }
    | "MoveWindowDown"
    | "MoveWindowUp"
    | "MoveWindowDownOrToWorkspaceDown"
    | "MoveWindowUpOrToWorkspaceUp"
    | { ConsumeOrExpelWindowLeft: { id?: number } }
    | { ConsumeOrExpelWindowRight: { id?: number } }
    | "ConsumeWindowIntoColumn"
    | "ExpelWindowFromColumn"
    | "SwapWindowRight"
    | "SwapWindowLeft"
    | "ToggleColumnTabbedDisplay"
    | { SetColumnDisplay: { display: ColumnDisplay } }
    | "CenterColumn"
    | { CenterWindow: { id?: number } }
    | "FocusWorkspaceDown"
    | "FocusWorkspaceUp"
    | { FocusWorkspace: { reference: WorkspaceReferenceArg } }
    | "FocusWorkspacePrevious"
    | "MoveWindowToWorkspaceDown"
    | "MoveWindowToWorkspaceUp"
    | { MoveWindowToWorkspace: { window_id?: number, reference: WorkspaceReferenceArg } }
    | "MoveColumnToWorkspaceDown"
    | "MoveColumnToWorkspaceUp"
    | { MoveColumnToWorkspace: { reference: WorkspaceReferenceArg } }
    | "MoveWorkspaceDown"
    | "MoveWorkspaceUp"
    | { MoveWorkspaceToIndex: { index: number, reference?: WorkspaceReferenceArg } }
    | { SetWorkspaceName: { name: string, workspace?: WorkspaceReferenceArg } }
    | { UnsetWorkspaceName: { reference?: WorkspaceReferenceArg } }
    | "FocusMonitorLeft"
    | "FocusMonitorRight"
    | "FocusMonitorDown"
    | "FocusMonitorUp"
    | "FocusMonitorPrevious"
    | "FocusMonitorNext"
    | { FocusMonitor: { output: String } }
    | "MoveWindowToMonitorLeft"
    | "MoveWindowToMonitorRight"
    | "MoveWindowToMonitorDown"
    | "MoveWindowToMonitorUp"
    | "MoveWindowToMonitorPrevious"
    | "MoveWindowToMonitorNext"
    | { MoveWindowToMonitor: { id: number, output: String } }
    | "MoveColumnToMonitorLeft"
    | "MoveColumnToMonitorRight"
    | "MoveColumnToMonitorDown"
    | "MoveColumnToMonitorUp"
    | "MoveColumnToMonitorPrevious"
    | "MoveColumnToMonitorNext"
    | { MoveColumnToMonitor: { output: string } }
    | { SetWindowWidth: { id?: number, change: SizeChange } }
    | { SetWindowHeight: { id?: number, change: SizeChange } }
    | { ResetWindowHeight: { id?: number } }
    | "SwitchPresetColumnWidth"
    | { SwitchPresetWindowWidth: { id?: number } }
    | { SwitchPresetWindowHeight: { id?: number } }
    | "MaximizeColumn"
    | { SetColumnWidth: { change: SizeChange } }
    | "ExpandColumnToAvailableWidth"
    | { SwitchLayout: { layout: LayoutSwitchTarget } }
    | "ShowHotkeyOverlay"
    | "MoveWorkspaceToMonitorLeft"
    | "MoveWorkspaceToMonitorRight"
    | "MoveWorkspaceToMonitorDown"
    | "MoveWorkspaceToMonitorUp"
    | "MoveWorkspaceToMonitorPrevious"
    | "MoveWorkspaceToMonitorNext"
    | { MoveWorkspaceToMonitor: { output: String, reference?: WorkspaceReferenceArg } }
    | "ToggleDebugTint"
    | "DebugToggleOpaqueRegions"
    | "DebugToggleDamage"
    | { ToggleWindowFloating: { id?: number } }
    | { MoveWindowToFloating: { id?: number } }
    | { MoveWindowToTiling: { id?: number } }
    | "FocusFloating"
    | "FocusTiling"
    | "SwitchFocusBetweenFloatingAndTiling"
    | { MoveFloatingWindow: { id?: number, x: PositionChange, y: PositionChange } }
    | { ToggleWindowRuleOpacity: { id?: number } }
    | { SetDynamicCastWindow: { id: number } }
    | { SetDynamicCastMonitor: { output: String } }
    | "ClearDynamicCastTarget";

export type SizeChange = 
    { SetFixed: number }
    | { SetProportion: number }
    | { AdjustFixed: number }
    | { AdjustProportion: number }

export type PositionChange =
    { SetFixed: number }
    | { AdjustFixed: number }

export type WorkspaceReferenceArg =
    { Id: number }
    | { Index: number }
    | { Name: string }

export type LayoutSwitchTarget =
    "Next"
    | "Prev"
    | { Index: number }

export type ColumnDisplay =
    "Normal"
    | "Tabbed"

export type OutputAction =
    "Off"
    | "On"
    | { Mode: ModeToSet }
    | { scale: ScaleToSet }
    | { transform: Transform }
    | { position: PositionToSet }
    | { vrr: VrrToSet }

export type ModeToSet =
    "Automatic"
    | { Specific: ConfiguredMode }

export interface ConfiguredMode {
    width: number,
    height: number,
    refresh?: number,
}

export type ScaleToSet =
    "Automatic"
    | { Specific: number }

export type PositionToSet =
    "Automatic"
    | { Specific: ConfiguredPosition }

export interface ConfiguredPosition {
    x: number,
    y: number,
}

export interface VrrToSet {
    vrr: boolean,
    on_demand: boolean,
}

export interface Output {
    name: String,
    make: String,
    model: String,
    serial?: String,
    physical_size: [number, number],
    modes: Mode[],
    current_mode?: number,
    vrr_supported: boolean,
    vrr_enabled: boolean,
    logical?: LogicalOutput,
}

export interface Mode {
    width: number,
    height: number,
    refresh_rate: number,
    is_preferred: boolean,
}

export interface LogicalOutput {
    x: number,
    y: number,
    width: number,
    height: number,
    scale: number,
    transform: Transform,
}

export type Transform =
    "Normal"
    | "_90"
    | "_180"
    | "_270"
    | "Flipped"
    | "Flipped90"
    | "Flipped180"
    | "Flipped270"

export interface Window {
    id: number,
    title?: string,
    app_id?: string,
    pid?: number,
    workspace_id?: number,
    is_focused: boolean,
    is_floating: boolean,
}

export type OutputConfigChanged =
    "Applied"
    | "OutputWasMissing"

export interface Workspace {
    id: number,
    idx: number,
    name?: string,
    output?: string,
    is_active: boolean,
    is_focused: boolean,
    active_window_id?: number,
}

export interface KeyboardLayouts {
    names: String[],
    current_idx: number,
}

export type Layer = 
    "Background"
    | "Bottom"
    | "Top"
    | "Overlay"

export type LayerSurfaceKeyboardInteractivity =
    "None"
    | "Exclusive"
    | "OnDemand"

export interface LayerSurface {
    namespace: String,
    output: String,
    layer: Layer,
    keyboard_interactivity: LayerSurfaceKeyboardInteractivity,
}

export namespace EventTypes {
    export interface WorkspacesChanged {
        WorkspacesChanged: { workspaces: Workspace[] }
    }

    export interface WorkspaceActivated {
        WorkspaceActivated: { id: number, focused: boolean }
    }

    export interface WorkspaceActiveWindowChanged {
        WorkspaceActiveWindowChanged: { workspace_id: number, active_window_id: number, }
    }

    export interface WindowsChanged {
        WindowsChanged: { windows: Window[] }
    }

    export interface WindowOpenedOrChanged {
        WindowOpenedOrChanged: { window: Window }
    }

    export interface WindowClosed {
        WindowClosed: { id: number }
    }

    export interface WindowFocusChanged {
        WindowFocusChanged: { id?: number }
    }

    export interface KeyboardLayoutsChanged {
        KeyboardLayoutsChanged: { keyboard_layouts: KeyboardLayouts }
    }

    export interface KeyboardLayoutSwitched {
        KeyboardLayoutSwitched: { idx: number }
    }
}

export type Event = 
    EventTypes.WorkspacesChanged
    | EventTypes.WorkspaceActivated
    | EventTypes.WorkspaceActiveWindowChanged
    | EventTypes.WindowsChanged
    | EventTypes.WindowOpenedOrChanged
    | EventTypes.WindowClosed
    | EventTypes.WindowFocusChanged
    | EventTypes.KeyboardLayoutsChanged
    | EventTypes.KeyboardLayoutSwitched