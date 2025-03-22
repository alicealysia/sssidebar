export namespace IPCRequest {
    export class Version {}
    export class Outputs {}
    export class Workspaces {}
    export class Windows {}
    export class Layers {}
    export class KeyboardLayouts {}
    export class FocusedOutput {}
    export class FocusedWindow {}
    export class PickWindow {}
    export class Action {
        action: Action
        constructor (action: Action) {
            this.action = action;
        }
    }
    export class Output { 
        output: string;
        action: OutputAction;
        constructor(output: string, action: OutputAction) {
            this.output = output;
            this.action = action;
        }
    }
    export class EventStream {}
    export class ReturnError {}
}



//placeholder
type Output = {}
type Workspace = {}
type LayerSurface = {}
type KeyboardLayouts = {}
//type Reply = Result<Response, String;

export type IPCResponse =
    { Handled: {} }
    | { Version: string }
    | { Outputs: { [key: string]: Output } }
    | { Workspaces: Workspace[] }
    | { Windows: Window[] }
    | { Layers: LayerSurface[] }
    | { KeyboardLayouts: KeyboardLayouts }
    | { FocusedOutput: Output }
    | { FocusedWindow: Window }
    | { PickedWindow: Window }
    | { OutputConfigChanged: OutputConfigChanged }

export namespace Action {
    export class Quit {
        skip_confirmation: boolean
        constructor (skipConfirmation: boolean) {
            this.skip_confirmation = skipConfirmation
        }
    }
    export class PowerOffMonitors {}
    export class PowerOnMonitors {}
    export class Spawn {
        command: string [];
        constructor(command: string[]) {
            this.command = command;
        }
    }
    export class DoScreenTransition {
        delay_ms: number
        constructor (delay_ms: number) {
            this.delay_ms = delay_ms;
        }
    }
    export class Screenshot {
        show_pointer: boolean
        constructor(show_pointer: boolean) {
            this.show_pointer = show_pointer;
        }
    }
    export class ScreenshotScreen {
        write_to_disk: boolean
        show_pointer: boolean
        constructor(show_pointer: boolean, write_to_disk: boolean) {
            this.show_pointer = show_pointer;
            this.write_to_disk = write_to_disk;
        }
    }
    export class ScreenshotWindow {
        id: number;
        write_to_disk: boolean;
        constructor (id: number, write_to_disk: boolean) {
            this.id = id;
            this.write_to_disk = write_to_disk;
        }
    }
    
    export class CloseWindow {
        id: number
        constructor(id: number) {
            this.id = id;
        }
    }

    export class FullscreenWindow {
        id: number;
        constructor(id: number) {
            this.id = id;
        }
    }
    export class ToggleWindowedFullscreen {
        id: number;
        constructor(id: number) {
            this.id = id;
        }
    }
    export class FocusWindow {
            id: number;
            constructor(id: number) {
                this.id = id;
            }
    }
    export class FocusWindowInColumn {
        index: number;
        constructor(index: number) {
            this.index = index;
        }
    }
    export class FocusWindowPrevious {}
    export class FocusColumnLeft {}
    export class FocusColumnRight {}
    export class FocusColumnFirst {}
    export class FocusColumnLast {}
    export class FocusColumnRightOrFirst {}
    export class FocusColumnLeftOrLast {}
    export class FocusColumn {
        index: number
        constructor(index: number) {
            this.index = index;
        }
    }
    export class FocusWindowOrMonitorUp {}
    export class FocusWindowOrMonitorDown {}
    export class FocusColumnOrMonitorLeft {}
    export class FocusColumnOrMonitorRight {}
    export class FocusWindowDown {}
    export class FocusWindowUp {}
    export class FocusWindowDownOrColumnLeft {}
    export class FocusWindowDownOrColumnRight {}
    export class FocusWindowUpOrColumnLeft {}
    export class FocusWindowUpOrColumnRight {}
    export class FocusWindowOrWorkspaceDown {}
    export class FocusWindowOrWorkspaceUp {}
    export class FocusWindowTop {}
    export class FocusWindowBottom {}
    export class FocusWindowDownOrTop {}
    export class FocusWindowUpOrBottom {}
    export class MoveColumnLeft {}
    export class MoveColumnRight {}
    export class MoveColumnToFirst {}
    export class MoveColumnToLast {}
    export class MoveColumnLeftOrToMonitorLeft {}
    export class MoveColumnRightOrToMonitorRight {}
    export class MoveColumnToIndex {
        index: number
        constructor(index: number) {
            this.index = index;
        }
    }
    export class MoveWindowDown {}
    export class MoveWindowUp {}
    export class MoveWindowDownOrToWorkspaceDown {}
    export class MoveWindowUpOrToWorkspaceUp {}
    export class ConsumeOrExpelWindowLeft {
        id: number
        constructor(id: number) {
            this.id = id;
        }
    }
    export class ConsumeOrExpelWindowRight {
        id: number
        constructor(id: number) {
            this.id = id;
        }
    }
    export class ConsumeWindowIntoColumn {}
    export class ExpelWindowFromColumn {}
    export class SwapWindowRight {}
    export class SwapWindowLeft {}
    export class ToggleColumnTabbedDisplay {}
    export class SetColumnDisplay {
        display: ColumnDisplay
        constructor(display: ColumnDisplay) {
            this.display = display
        }
    }
    export class CenterColumn {}
    export class CenterWindow {
        id: number
        constructor(id: number) {
            this.id = id;
        }
    }
    export class FocusWorkspaceDown {}
    export class FocusWorkspaceUp {}
    export class FocusWorkspace {
        reference: WorkspaceReferenceArg
        constructor(reference: WorkspaceReferenceArg) {
            this.reference = reference;
        }
    }
    export class FocusWorkspacePrevious {}
    export class MoveWindowToWorkspaceDown {}
    export class MoveWindowToWorkspaceUp {}
    export class MoveWindowToWorkspace {
        window_id: number
        reference: WorkspaceReferenceArg
        constructor(reference: WorkspaceReferenceArg, window_id: number) {
            this.reference = reference;
            this.window_id = window_id;
        }
    }
    export class MoveColumnToWorkspaceDown {}
    export class MoveColumnToWorkspaceUp {}
    export class MoveColumnToWorkspace {
        reference: WorkspaceReferenceArg
        constructor(reference: WorkspaceReferenceArg) {
            this.reference = reference;
        }
    }
    export class MoveWorkspaceDown {}
    export class MoveWorkspaceUp {}
    export class MoveWorkspaceToIndex {
        index: number
        reference: WorkspaceReferenceArg
        constructor(index: number, reference: WorkspaceReferenceArg) {
            this.index = index;
            this.reference = reference;
        }
    }
    export class SetWorkspaceName {
        name: string
        workspace: WorkspaceReferenceArg
        constructor(name: string, workspace: WorkspaceReferenceArg) {
            this.name = name;
            this.workspace = workspace;
        }
    }
    export class UnsetWorkspaceName {
        reference: WorkspaceReferenceArg
        constructor(reference: WorkspaceReferenceArg) {
            this.reference = reference;
        }
    }
    export class FocusMonitorLeft {}
    export class FocusMonitorRight {}
    export class FocusMonitorDown {}
    export class FocusMonitorUp {}
    export class FocusMonitorPrevious {}
    export class FocusMonitorNext {}
    export class FocusMonitor {
        output: String
        constructor(output: string) {
            this.output = output;
        }
    }
    export class MoveWindowToMonitorLeft {}
    export class MoveWindowToMonitorRight {}
    export class MoveWindowToMonitorDown {}
    export class MoveWindowToMonitorUp {}
    export class MoveWindowToMonitorPrevious {}
    export class MoveWindowToMonitorNext {}
    export class MoveWindowToMonitor {
        id: number
        output: String
        constructor(output: string, window_id: number) {
            this.output = output;
            this.id = window_id;
        }
    }
    export class MoveColumnToMonitorLeft {}
    export class MoveColumnToMonitorRight {}
    export class MoveColumnToMonitorDown {}
    export class MoveColumnToMonitorUp {}
    export class MoveColumnToMonitorPrevious {}
    export class MoveColumnToMonitorNext {}
    export class MoveColumnToMonitor {
            output: string;
            constructor(output: string) {
                this.output = output;
            }
    }
    export class SetWindowWidth {
        id: number
        change: SizeChange
        constructor(id: number, change: SizeChange) {
            this.id = id;
            this.change = change;
        }
    }
    export class SetWindowHeight {
        id: number
        change: SizeChange
        constructor(id: number, change: SizeChange) {
            this.id = id;
            this.change = change;
        }
    }
    export class ResetWindowHeight {
        id: number
        constructor(id: number) {
            this.id = id;
        }
    }
    export class SwitchPresetColumnWidth {}
    export class SwitchPresetWindowWidth {
        id: number
        constructor(id: number) {
            this.id = id;
        }
    }
    export class SwitchPresetWindowHeight {
        id: number
        constructor(id: number) {
            this.id = id;
        }
    }
    export class MaximizeColumn {}
    export class SetColumnWidth {
        change: SizeChange
        constructor (change: SizeChange) {
            this.change = change;
        }
    }
    export class ExpandColumnToAvailableWidth {}
    export class SwitchLayout {
        layout: LayoutSwitchTarget
        constructor(layout: LayoutSwitchTarget) {
            this.layout = layout;
        }
    }
    export class ShowHotkeyOverlay {}
    export class MoveWorkspaceToMonitorLeft {}
    export class MoveWorkspaceToMonitorRight {}
    export class MoveWorkspaceToMonitorDown {}
    export class MoveWorkspaceToMonitorUp {}
    export class MoveWorkspaceToMonitorPrevious {}
    export class MoveWorkspaceToMonitorNext {}
    export class MoveWorkspaceToMonitor {
        output: String
        reference: WorkspaceReferenceArg
        constructor(output: string, reference: WorkspaceReferenceArg) {
            this.output = output;
            this.reference = reference;
        }
    }
    export class ToggleDebugTint {}
    export class DebugToggleOpaqueRegions {}
    export class DebugToggleDamage {}
    export class ToggleWindowFloating {
        id: number
        constructor(id: number) {
            this.id = id;
        }
    }
    export class MoveWindowToFloating {
        id: number
        constructor(id: number) {
            this.id = id;
        }
    }
    export class MoveWindowToTiling {
        id: number
        constructor(id: number) {
            this.id = id;
        }
    }
    export class FocusFloating {}
    export class FocusTiling {}
    export class SwitchFocusBetweenFloatingAndTiling {}
    export class MoveFloatingWindow {
        id: number
        x: PositionChange
        y: PositionChange
        constructor(id: number, x: PositionChange, y: PositionChange) {
            this.id = id;
            this.x = x;
            this.y = y;
        }
    }
    export class ToggleWindowRuleOpacity {
        id: number
        constructor(id: number) {
            this.id = id;
        }
    }
    export class SetDynamicCastWindow {
        id: number
        constructor(id: number) {
            this.id = id;
        }
    }
    export class SetDynamicCastMonitor {
        output: String
        constructor(output: string) {
            this.output = output;
        }
    }
    export class ClearDynamicCastTarget {}

}



pub enum SizeChange {
        SetFixed(i32),
        SetProportion(f64),
        AdjustFixed(i32),
        AdjustProportion(f64),
}

pub enum PositionChange {
        SetFixed(f64),
        AdjustFixed(f64),
}

pub enum WorkspaceReferenceArg {
        Id(number),
        Index(u8),
        Name(String),
}

pub enum LayoutSwitchTarget {
        Next,
        Prev,
        Index(u8),
}

pub enum ColumnDisplay {
        Normal,
        Tabbed,
}

pub enum OutputAction {
        Off,
        On,
        Mode {
                mode: ModeToSet,
},
Scale {
        scale: ScaleToSet,
},
Transform {
        transform: Transform,
},
Position {
        position: PositionToSet,
},
Vrr {
        vrr: VrrToSet,
},
}

pub enum ModeToSet {
        Automatic,
        Specific(ConfiguredMode),
}

pub struct ConfiguredMode {
        pub width: u16,
                pub height: u16,
                pub refresh: f64,
}

pub enum ScaleToSet {
        Automatic,
        Specific(f64),
}

pub enum PositionToSet {
    Automatic,
Specific(ConfiguredPosition),
}

pub struct ConfiguredPosition {
        pub x: i32,
                pub y: i32,
}

pub struct VrrToSet {
    #[cfg_attr(
        feature = "clap",
        arg(
            value_name = "ON|OFF",
            action = clap::ArgAction::Set,
            value_parser = clap::builder::BoolishValueParser::new(),
            hide_possible_values = true,
        ),
    )]
    pub vrr: bool,
        pub on_demand: bool,
}

pub struct Output {
        pub name: String,
                pub make: String,
                pub model: String,
                pub serial: String,
                pub physical_size: (u32, u32),
                pub modes: Vec<Mode,
                                pub current_mode: usize,
                pub vrr_supported: bool,
                pub vrr_enabled: bool,
                                pub logical: LogicalOutput,
}

pub struct Mode {
        pub width: u16,
                pub height: u16,
                pub refresh_rate: u32,
                pub is_preferred: bool,
}

pub struct LogicalOutput {
        pub x: i32,
                pub y: i32,
                pub width: u32,
                pub height: u32,
                pub scale: f64,
                pub transform: Transform,
}

pub enum Transform {
        Normal,
        _90,
_180,
_270,
        Flipped,
Flipped90,
Flipped180,
Flipped270,
}

pub struct Window {
                                pub id: number,
                pub title: String,
                pub app_id: String,
                                        pub pid: i32,
                pub workspace_id: number,
                                pub is_focused: bool,
                                pub is_floating: bool,
}

pub enum OutputConfigChanged {
        Applied,
        OutputWasMissing,
}

pub struct Workspace {
                                pub id: number,
                                                                        pub idx: u8,
                pub name: String,
                                pub output: String,
                                pub is_active: bool,
                                pub is_focused: bool,
                pub active_window_id: number,
}

pub struct KeyboardLayouts {
        pub names: Vec<String,
                pub current_idx: u8,
}

pub enum Layer {
        Background,
        Bottom,
        Top,
        Overlay,
}

pub enum LayerSurfaceKeyboardInteractivity {
        None,
        Exclusive,
        OnDemand,
}

pub struct LayerSurface {
        pub namespace: String,
                pub output: String,
                pub layer: Layer,
                pub keyboard_interactivity: LayerSurfaceKeyboardInteractivity,
}

pub enum Event {
        WorkspacesChanged {
                    workspaces: Vec<Workspace,
},
WorkspaceActivated {
        id: number,
                                        focused: bool,
},
WorkspaceActiveWindowChanged {
        workspace_id: number,
                active_window_id: number,
},
WindowsChanged {
                    windows: Vec<Window,
},
WindowOpenedOrChanged {
                window: Window,
},
WindowClosed {
        id: number,
},
WindowFocusChanged {
        id: number,
},
KeyboardLayoutsChanged {
        keyboard_layouts: KeyboardLayouts,
},
KeyboardLayoutSwitched {
        idx: u8,
},
}

impl FromStr for WorkspaceReferenceArg {
    type Err = &'static str;

    fn from_str(s: &str) - Result<Self, Self::Err {
        let reference = if let Ok(index) = s.parse::<i32() {
        if let Ok(idx) = u8::try_from(index) {
            Self::Index(idx)
        } else {
            return Err("workspace index must be between 0 and 255");
        }
    } else {
        Self::Name(s.to_string())
    };

    Ok(reference)
}
}

impl FromStr for SizeChange {
    type Err = &'static str;

    fn from_str(s: &str) - Result<Self, Self::Err {
        match s.split_once('%') {
        Some((value, empty)) = {
            if !empty.is_empty() {
                return Err("trailing characters after '%' are not allowed");
            }

            match value.bytes().next() {
                Some(b'-' | b'+') = {
                    let value = value.parse().map_err(|_| "error parsing value")?;
                    Ok(Self::AdjustProportion(value))
                }
                Some(_) = {
                    let value = value.parse().map_err(|_| "error parsing value")?;
                    Ok(Self::SetProportion(value))
                }
                None = Err("value is missing"),
            }
        }
        None = {
            let value = s;
            match value.bytes().next() {
                Some(b'-' | b'+') = {
                    let value = value.parse().map_err(|_| "error parsing value")?;
                    Ok(Self::AdjustFixed(value))
                }
                Some(_) = {
                    let value = value.parse().map_err(|_| "error parsing value")?;
                    Ok(Self::SetFixed(value))
                }
                None = Err("value is missing"),
            }
        }
    }
}
}

impl FromStr for PositionChange {
    type Err = &'static str;

    fn from_str(s: &str) - Result<Self, Self::Err {
        let value = s;
        match value.bytes().next() {
        Some(b'-' | b'+') = {
            let value = value.parse().map_err(|_| "error parsing value")?;
            Ok(Self::AdjustFixed(value))
        }
        Some(_) = {
            let value = value.parse().map_err(|_| "error parsing value")?;
            Ok(Self::SetFixed(value))
        }
        None = Err("value is missing"),
    }
}
}

impl FromStr for LayoutSwitchTarget {
    type Err = &'static str;

    fn from_str(s: &str) - Result<Self, Self::Err {
        match s {
        "next" = Ok(Self::Next),
            "prev" = Ok(Self::Prev),
            other = match other.parse() {
            Ok(layout) = Ok(Self::Index(layout)),
                _ = Err(r#"invalid layout action, can be "next", "prev" or a layout index"#),
        },
    }
}
}

impl FromStr for ColumnDisplay {
    type Err = &'static str;

    fn from_str(s: &str) - Result<Self, Self::Err {
        match s {
        "normal" = Ok(Self::Normal),
            "tabbed" = Ok(Self::Tabbed),
            _ = Err(r#"invalid column display, can be "normal" or "tabbed""#),
    }
}
}

impl FromStr for Transform {
    type Err = &'static str;

    fn from_str(s: &str) - Result<Self, Self::Err {
        match s {
        "normal" = Ok(Self::Normal),
            "90" = Ok(Self::_90),
            "180" = Ok(Self::_180),
            "270" = Ok(Self::_270),
            "flipped" = Ok(Self::Flipped),
            "flipped-90" = Ok(Self::Flipped90),
            "flipped-180" = Ok(Self::Flipped180),
            "flipped-270" = Ok(Self::Flipped270),
            _ = Err(concat!(
                r#"invalid transform, can be "90", "180", "270", "#,
        r#""flipped", "flipped-90", "flipped-180" or "flipped-270""#
    )),
    }
}
}

impl FromStr for ModeToSet {
    type Err = &'static str;

    fn from_str(s: &str) - Result<Self, Self::Err {
        if s.eq_ignore_ascii_case("auto") {
        return Ok(Self::Automatic);
    }

    let mode = s.parse()?;
    Ok(Self::Specific(mode))
}
}

impl FromStr for ConfiguredMode {
    type Err = &'static str;

    fn from_str(s: &str) - Result<Self, Self::Err {
        let Some((width, rest)) = s.split_once('x') else {
            return Err("no 'x' separator found");
        };

        let (height, refresh) = match rest.split_once('@') {
        Some((height, refresh)) = (height, Some(refresh)),
            None = (rest, None),
    };

    let width = width.parse().map_err(|_| "error parsing width")?;
    let height = height.parse().map_err(|_| "error parsing height")?;
    let refresh = refresh
        .map(str::parse)
        .transpose()
        .map_err(|_| "error parsing refresh rate")?;

    Ok(Self {
        width,
            height,
            refresh,
    })
}
}

impl FromStr for ScaleToSet {
    type Err = &'static str;

    fn from_str(s: &str) - Result<Self, Self::Err {
        if s.eq_ignore_ascii_case("auto") {
        return Ok(Self::Automatic);
    }

    let scale = s.parse().map_err(|_| "error parsing scale")?;
    Ok(Self::Specific(scale))
}
}