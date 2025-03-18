//
// Enum Request and related types
//
export type ERequestType =
    | "Version"
    | "Outputs"
    | "Workspaces"
    | "Windows"
    | "Layers"
    | "KeyboardLayouts"
    | "FocusedOutput"
    | "FocusedWindow"
    | "PickWindow"
    | "EventStream"
    | "ReturnError"

/// Class implementation
export declare class IPCRequest {
    type: ERequestType | "Action" | "Output";
    action?: Action | OutputAction;
    output?: string;
    public constructor (type: ERequestType);
    public constructor (type: "Action", action: Action);
    public constructor (type: "Output", action: OutputAction, output: string);
}

class IPCRequestSimple extends IPCRequest {
    type: ERequestType;
    public constructor (type: ERequestType) {
        super(type);
        this.type = type;
    }
}

class IPCRequestAction extends IPCRequest {
    type: "Action";
    action: Action;
    public constructor (type: "Action", action: Action) {
        super(type, action);
        this.type = type;
        this.action = action;
    }
}

class IPCRequestOutputAction extends IPCRequest {
    type: "Output";
    output: string;
    action: OutputAction;
    public constructor (type: "Output", action: OutputAction, output: string) {
        super(type, action, output);
        this.type = type;
        this.action = action;
        this.output = output;
    }
}

export function createIPCRequest (type: ERequestType): IPCRequestSimple;
export function createIPCRequest (type: "Action", action: Action): IPCRequestAction;
export function createIPCRequest (type: "Output", action: OutputAction, output: string): IPCRequestOutputAction;
export function createIPCRequest (type: ERequestType | "Action" | "Output", action?: Action | OutputAction, output?: string) : IPCRequest {
    switch (type){
        case "Action"   : return new IPCRequestAction("Action", action as Action);
        case "Output"   : return new IPCRequestOutputAction("Output", action as OutputAction, output as string);
        default         : return new IPCRequestSimple(type);
    }
}


//
// The Result type and Reply alias
//
export type Reply = Promise<Res>;

//
// Enum Response
//
export type Res =
    | { type: "Handled" }
    | { type: "Version"; version: string }
    | { type: "Outputs"; outputs: { [key: string]: Output } }
    | { type: "Workspaces"; workspaces: Workspace[] }
    | { type: "Windows"; windows: Window[] }
    | { type: "Layers"; layers: LayerSurface[] }
    | { type: "KeyboardLayouts"; keyboardLayouts: KeyboardLayouts }
    | { type: "FocusedOutput"; focusedOutput: Output | null }
    | { type: "FocusedWindow"; focusedWindow: Window | null }
    | { type: "PickedWindow"; pickedWindow: Window | null }
    | { type: "OutputConfigChanged"; outputConfigChanged: OutputConfigChanged };

//
// Enum Action
//
export type Action =
    | { type: "Quit"; skip_confirmation: boolean }
    | { type: "PowerOffMonitors" }
    | { type: "PowerOnMonitors" }
    | { type: "Spawn"; command: string[] }
    | { type: "DoScreenTransition"; delay_ms: number | null }
    | { type: "Screenshot"; show_pointer: boolean }
    | { type: "ScreenshotScreen"; write_to_disk: boolean; show_pointer: boolean }
    | { type: "ScreenshotWindow"; id: number | null; write_to_disk: boolean }
    | { type: "CloseWindow"; id: number | null }
    | { type: "FullscreenWindow"; id: number | null }
    | { type: "FocusWindow"; id: number }
    | { type: "FocusWindowInColumn"; index: number }
    | { type: "FocusWindowPrevious" }
    | { type: "FocusColumnLeft" }
    | { type: "FocusColumnRight" }
    | { type: "FocusColumnFirst" }
    | { type: "FocusColumnLast" }
    | { type: "FocusColumnRightOrFirst" }
    | { type: "FocusColumnLeftOrLast" }
    | { type: "FocusColumn"; index: number }
    | { type: "FocusWindowOrMonitorUp" }
    | { type: "FocusWindowOrMonitorDown" }
    | { type: "FocusColumnOrMonitorLeft" }
    | { type: "FocusColumnOrMonitorRight" }
    | { type: "FocusWindowDown" }
    | { type: "FocusWindowUp" }
    | { type: "FocusWindowDownOrColumnLeft" }
    | { type: "FocusWindowDownOrColumnRight" }
    | { type: "FocusWindowUpOrColumnLeft" }
    | { type: "FocusWindowUpOrColumnRight" }
    | { type: "FocusWindowOrWorkspaceDown" }
    | { type: "FocusWindowOrWorkspaceUp" }
    | { type: "FocusWindowTop" }
    | { type: "FocusWindowBottom" }
    | { type: "FocusWindowDownOrTop" }
    | { type: "FocusWindowUpOrBottom" }
    | { type: "MoveColumnLeft" }
    | { type: "MoveColumnRight" }
    | { type: "MoveColumnToFirst" }
    | { type: "MoveColumnToLast" }
    | { type: "MoveColumnLeftOrToMonitorLeft" }
    | { type: "MoveColumnRightOrToMonitorRight" }
    | { type: "MoveColumnToIndex"; index: number }
    | { type: "MoveWindowDown" }
    | { type: "MoveWindowUp" }
    | { type: "MoveWindowDownOrToWorkspaceDown" }
    | { type: "MoveWindowUpOrToWorkspaceUp" }
    | { type: "ConsumeOrExpelWindowLeft"; id: number | null }
    | { type: "ConsumeOrExpelWindowRight"; id: number | null }
    | { type: "ConsumeWindowIntoColumn" }
    | { type: "ExpelWindowFromColumn" }
    | { type: "SwapWindowRight" }
    | { type: "SwapWindowLeft" }
    | { type: "ToggleColumnTabbedDisplay" }
    | { type: "SetColumnDisplay"; display: ColumnDisplay }
    | { type: "CenterColumn" }
    | { type: "CenterWindow"; id: number | null }
    | { type: "FocusWorkspaceDown" }
    | { type: "FocusWorkspaceUp" }
    | { type: "FocusWorkspace"; reference: WorkspaceReferenceArg }
    | { type: "FocusWorkspacePrevious" }
    | { type: "MoveWindowToWorkspaceDown" }
    | { type: "MoveWindowToWorkspaceUp" }
    | { type: "MoveWindowToWorkspace"; window_id: number | null; reference: WorkspaceReferenceArg }
    | { type: "MoveColumnToWorkspaceDown" }
    | { type: "MoveColumnToWorkspaceUp" }
    | { type: "MoveColumnToWorkspace"; reference: WorkspaceReferenceArg }
    | { type: "MoveWorkspaceDown" }
    | { type: "MoveWorkspaceUp" }
    | { type: "MoveWorkspaceToIndex"; index: number; reference: WorkspaceReferenceArg | null }
    | { type: "SetWorkspaceName"; name: string; workspace: WorkspaceReferenceArg | null }
    | { type: "UnsetWorkspaceName"; reference: WorkspaceReferenceArg | null }
    | { type: "FocusMonitorLeft" }
    | { type: "FocusMonitorRight" }
    | { type: "FocusMonitorDown" }
    | { type: "FocusMonitorUp" }
    | { type: "FocusMonitorPrevious" }
    | { type: "FocusMonitorNext" }
    | { type: "FocusMonitor"; output: string }
    | { type: "MoveWindowToMonitorLeft" }
    | { type: "MoveWindowToMonitorRight" }
    | { type: "MoveWindowToMonitorDown" }
    | { type: "MoveWindowToMonitorUp" }
    | { type: "MoveWindowToMonitorPrevious" }
    | { type: "MoveWindowToMonitorNext" }
    | { type: "MoveWindowToMonitor"; id: number | null; output: string }
    | { type: "MoveColumnToMonitorLeft" }
    | { type: "MoveColumnToMonitorRight" }
    | { type: "MoveColumnToMonitorDown" }
    | { type: "MoveColumnToMonitorUp" }
    | { type: "MoveColumnToMonitorPrevious" }
    | { type: "MoveColumnToMonitorNext" }
    | { type: "MoveColumnToMonitor"; output: string }
    | { type: "SetWindowWidth"; id: number | null; change: SizeChange }
    | { type: "SetWindowHeight"; id: number | null; change: SizeChange }
    | { type: "ResetWindowHeight"; id: number | null }
    | { type: "SwitchPresetColumnWidth" }
    | { type: "SwitchPresetWindowWidth"; id: number | null }
    | { type: "SwitchPresetWindowHeight"; id: number | null }
    | { type: "MaximizeColumn" }
    | { type: "SetColumnWidth"; change: SizeChange }
    | { type: "ExpandColumnToAvailableWidth" }
    | { type: "SwitchLayout"; layout: LayoutSwitchTarget }
    | { type: "ShowHotkeyOverlay" }
    | { type: "MoveWorkspaceToMonitorLeft" }
    | { type: "MoveWorkspaceToMonitorRight" }
    | { type: "MoveWorkspaceToMonitorDown" }
    | { type: "MoveWorkspaceToMonitorUp" }
    | { type: "MoveWorkspaceToMonitorPrevious" }
    | { type: "MoveWorkspaceToMonitorNext" }
    | { type: "MoveWorkspaceToMonitor"; output: string; reference: WorkspaceReferenceArg | null }
    | { type: "ToggleDebugTint" }
    | { type: "DebugToggleOpaqueRegions" }
    | { type: "DebugToggleDamage" }
    | { type: "ToggleWindowFloating"; id: number | null }
    | { type: "MoveWindowToFloating"; id: number | null }
    | { type: "MoveWindowToTiling"; id: number | null }
    | { type: "FocusFloating" }
    | { type: "FocusTiling" }
    | { type: "SwitchFocusBetweenFloatingAndTiling" }
    | { type: "MoveFloatingWindow"; id: number | null; x: PositionChange; y: PositionChange }
    | { type: "ToggleWindowRuleOpacity"; id: number | null }
    | { type: "SetDynamicCastWindow"; id: number | null }
    | { type: "SetDynamicCastMonitor"; output: string | null }
    | { type: "ClearDynamicCastTarget" };

//
// Enum SizeChange
//
export type SizeChange =
    | { type: "SetFixed"; value: number }
    | { type: "SetProportion"; value: number }
    | { type: "AdjustFixed"; value: number }
    | { type: "AdjustProportion"; value: number };

//
// Enum PositionChange
//
export type PositionChange =
    | { type: "SetFixed"; value: number }
    | { type: "AdjustFixed"; value: number };

//
// Enum WorkspaceReferenceArg
//
export type WorkspaceReferenceArg =
    | { type: "Id"; value: number }
    | { type: "Index"; value: number }
    | { type: "Name"; value: string };

//
// Enum LayoutSwitchTarget
//
export type LayoutSwitchTarget =
    | { type: "Next" }
    | { type: "Prev" }
    | { type: "Index"; index: number };

//
// Enum ColumnDisplay
//
export enum ColumnDisplay {
    Normal = "normal",
    Tabbed = "tabbed"
}

//
// Enum OutputAction
//
export type OutputAction =
    | { type: "Off" }
    | { type: "On" }
    | { type: "Mode"; mode: ModeToSet }
    | { type: "Scale"; scale: ScaleToSet }
    | { type: "Transform"; transform: Transform }
    | { type: "Position"; position: PositionToSet }
    | { type: "Vrr"; vrr: VrrToSet };

//
// Enum ModeToSet
//
export type ModeToSet =
    | { type: "Automatic" }
    | { type: "Specific"; mode: ConfiguredMode };

//
// Struct ConfiguredMode
//
export interface ConfiguredMode {
    width: number;
    height: number;
    refresh: number | null;
}

//
// Enum ScaleToSet
//
export type ScaleToSet =
    | { type: "Automatic" }
    | { type: "Specific"; scale: number };

//
// Enum PositionToSet
//
export type PositionToSet =
    | { type: "Automatic" }
    | { type: "Specific"; position: ConfiguredPosition };

//
// Struct ConfiguredPosition
//
export interface ConfiguredPosition {
    x: number;
    y: number;
}

//
// Struct VrrToSet
//
export interface VrrToSet {
    vrr: boolean;
    on_demand: boolean;
}

//
// Struct Output
//
export interface Output {
    name: string;
    make: string;
    model: string;
    serial: string | null;
    physical_size: [number, number] | null;
    modes: Mode[];
    current_mode: number | null;
    vrr_supported: boolean;
    vrr_enabled: boolean;
    logical: LogicalOutput | null;
}

//
// Struct Mode
//
export interface Mode {
    width: number;
    height: number;
    refresh_rate: number;
    is_preferred: boolean;
}

//
// Struct LogicalOutput
//
export interface LogicalOutput {
    x: number;
    y: number;
    width: number;
    height: number;
    scale: number;
    transform: Transform;
}

//
// Enum Transform
//
export enum Transform {
    Normal = "normal",
    _90 = "90",
    _180 = "180",
    _270 = "270",
    Flipped = "flipped",
    Flipped90 = "flipped-90",
    Flipped180 = "flipped-180",
    Flipped270 = "flipped-270"
}

//
// Struct Window
//
export interface Window {
    id: number;
    title: string | null;
    app_id: string | null;
    pid: number | null;
    workspace_id: number | null;
    is_focused: boolean;
    is_floating: boolean;
}

//
// Enum OutputConfigChanged
//
export enum OutputConfigChanged {
    Applied = "Applied",
    OutputWasMissing = "OutputWasMissing"
}

//
// Struct Workspace
//
export interface Workspace {
    id: number;
    idx: number;
    name: string | null;
    output: string | null;
    is_active: boolean;
    is_focused: boolean;
    active_window_id: number | null;
}

//
// Struct KeyboardLayouts
//
export interface KeyboardLayouts {
    names: string[];
    current_idx: number;
}

//
// Enum Layer
//
export enum Layer {
    Background = "Background",
    Bottom = "Bottom",
    Top = "Top",
    Overlay = "Overlay"
}

//
// Enum LayerSurfaceKeyboardInteractivity
//
export enum LayerSurfaceKeyboardInteractivity {
    None = "None",
    Exclusive = "Exclusive",
    OnDemand = "OnDemand"
}

//
// Struct LayerSurface
//
export interface LayerSurface {
    namespace: string;
    output: string;
    layer: Layer;
    keyboard_interactivity: LayerSurfaceKeyboardInteractivity;
}

//
// Enum Event
//
export type Event =
    | { type: "WorkspacesChanged"; workspaces: Workspace[] }
    | { type: "WorkspaceActivated"; id: number; focused: boolean }
    | { type: "WorkspaceActiveWindowChanged"; workspace_id: number; active_window_id: number | null }
    | { type: "WindowsChanged"; windows: Window[] }
    | { type: "WindowOpenedOrChanged"; window: Window }
    | { type: "WindowClosed"; id: number }
    | { type: "WindowFocusChanged"; id: number | null }
    | { type: "KeyboardLayoutsChanged"; keyboard_layouts: KeyboardLayouts }
    | { type: "KeyboardLayoutSwitched"; idx: number };

export function parseWorkspaceReferenceArg(s: string) {
    const index = parseInt(s);
    if (!isNaN(index)) {
        if (index >= 0 && index <= 255) {
            return { type: "Index", value: index };
        } else {
            throw "workspace index must be between 0 and 255";
        }
    } else {
        return { type: "Name", value: s };
    }
}

//
// Implementation of FromStr for SizeChange
//
export function parseSizeChange(s : string) {
    if (s.indexOf('%') !== -1) {
        const parts = s.split('%');
        if (parts[1] !== "") {
            throw "trailing characters after '%' are not allowed";
        }
        const valueStr = parts[0];
        const firstChar = valueStr.charAt(0);
        if (firstChar === '-' || firstChar === '+') {
            const value = parseFloat(valueStr);
            if (isNaN(value)) throw "error parsing value";
            return { type: "AdjustProportion", value };
        } else {
            const value = parseFloat(valueStr);
            if (isNaN(value)) throw "error parsing value";
            return { type: "SetProportion", value };
        }
    } else {
        const valueStr = s;
        const firstChar = valueStr.charAt(0);
        if (firstChar === '-' || firstChar === '+') {
            const value = parseInt(valueStr);
            if (isNaN(value)) throw "error parsing value";
            return { type: "AdjustFixed", value };
        } else {
            const value = parseInt(valueStr);
            if (isNaN(value)) throw "error parsing value";
            return { type: "SetFixed", value };
        }
    }
}

//
// Implementation of FromStr for PositionChange
//
export function parsePositionChange(s : string) {
    const valueStr = s;
    const firstChar = valueStr.charAt(0);
    if (firstChar === '-' || firstChar === '+') {
        const value = parseFloat(valueStr);
        if (isNaN(value)) throw "error parsing value";
        return { type: "AdjustFixed", value };
    } else {
        const value = parseFloat(valueStr);
        if (isNaN(value)) throw "error parsing value";
        return { type: "SetFixed", value };
    }
}

//
// Implementation of FromStr for LayoutSwitchTarget
//
export function parseLayoutSwitchTarget(s : string) {
    if (s === "next") {
        return { type: "Next" };
    }
    if (s === "prev") {
        return { type: "Prev" };
    }
    const layout = parseInt(s);
    if (!isNaN(layout)) {
        return { type: "Index", index: layout };
    } else {
        throw 'invalid layout action, can be "next", "prev" or a layout index';
    }
}

//
// Implementation of FromStr for ColumnDisplay
//
export function parseColumnDisplay(s : string){
    if (s === "normal") {
        return ColumnDisplay.Normal;
    }
    if (s === "tabbed") {
        return ColumnDisplay.Tabbed;
    }
    throw 'invalid column display, can be "normal" or "tabbed"';
}

//
// Implementation of FromStr for Transform
//
export function parseTransform(s : string) {
    switch (s) {
        case "normal":
            return Transform.Normal;
        case "90":
            return Transform._90;
        case "180":
            return Transform._180;
        case "270":
            return Transform._270;
        case "flipped":
            return Transform.Flipped;
        case "flipped-90":
            return Transform.Flipped90;
        case "flipped-180":
            return Transform.Flipped180;
        case "flipped-270":
            return Transform.Flipped270;
        default:
            throw 'invalid transform, can be "90", "180", "270", "flipped", "flipped-90", "flipped-180" or "flipped-270"';
    }
}

//
// Implementation of FromStr for ModeToSet
//
export function parseModeToSet(s : string) {
    if (s.toLowerCase() === "auto") {
        return { type: "Automatic" };
    }
    const mode = parseConfiguredMode(s);
    return { type: "Specific", mode };
}

//
// Implementation of FromStr for ConfiguredMode
//
export function parseConfiguredMode(s : string) {
    const splitX = s.split("x");
    if (splitX.length < 2) {
        throw "no 'x' separator found";
    }
    const widthStr = splitX[0];
    const rest = splitX.slice(1).join("x");
    let heightStr;
    let refreshStr = null;
    if (rest.indexOf("@") !== -1) {
        const parts = rest.split("@");
        heightStr = parts[0];
        refreshStr = parts[1];
    } else {
        heightStr = rest;
    }
    const width = parseInt(widthStr);
    if (isNaN(width)) throw "error parsing width";
    const height = parseInt(heightStr);
    if (isNaN(height)) throw "error parsing height";
    let refresh = null;
    if (refreshStr !== null) {
        refresh = parseFloat(refreshStr);
        if (isNaN(refresh)) throw "error parsing refresh rate";
    }
    return { width, height, refresh };
}

//
// Implementation of FromStr for ScaleToSet
//
export function parseScaleToSet(s : string) {
    if (s.toLowerCase() === "auto") {
        return { type: "Automatic" };
    }
    const scale = parseFloat(s);
    if (isNaN(scale)) throw "error parsing scale";
    return { type: "Specific", scale };
}

