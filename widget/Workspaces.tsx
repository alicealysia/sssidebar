// Source + Credits for this file go to: https://github.com/maxverbeek/astalconfig/blob/master/service/niri.ts

import { App, Astal, Gdk } from "astal/gtk3"
import { bind } from "astal"
import Niri, { OutputsWithWorkspacesWithWindows, Window, WorkspaceWithWindows } from "../services/niri"

const niri = Niri.get_default()

// whenever we notice that monitors appear/disappear, make a query to niri to repopulate the monitor information. Niri
// does not recieve this over its eventbus. Moreover, niri does not get manufacturer names over the event stream. This
// only happens when you query for outputs explicitly which is what is triggered here.
App.connect('monitor-added', () => niri.reloadMonitors())
App.connect('monitor-removed', () => niri.reloadMonitors())

function guessAppIcon(window: Window) {
    if (window.title?.endsWith('NVIM')) {
        return 'neovim'
    }

    // Nvim runs in foot, but nvim is checked first
    if (window.app_id === 'foot') {
        return 'foot'
    }

    if (window.app_id === '' && window.title?.includes('Spotify')) {
        return 'spotify'
    }

    if (window.app_id === 'chromium-browser') {
        return 'chromium'
    }

    if (window.app_id === '1Password') {
        return '1password'
    }

    if (window.app_id === 'Slack') {
        return 'slack'
    }

    if (!!Astal.Icon.lookup_icon(window.app_id)) {
        return window.app_id
    }

    if (!!Astal.Icon.lookup_icon(window.app_id.toLowerCase())) {
        return window.app_id.toLowerCase()
    }

    // default custom icon from lucide
    return 'circle-dashed'
}

function Workspace(workspace: WorkspaceWithWindows, showInactiveIcons: boolean) {
    const traits = ['workspace']
    if (workspace.is_active) {
        traits.push('active')
    }

    if (workspace.windows.length > 0) {
        traits.push('populated')
    }

    const showIcons = (workspace.is_active || showInactiveIcons) && workspace.windows.length > 0
    return <button onClick={() => niri.focusWorkspaceId(workspace.id)} className={workspace.is_active? "workspace-active-button": "workspace-inactive-button"}>
        {showIcons && workspace.windows.filter(win => win.id == workspace.active_window_id).map((win: any) => <icon className="workspace-button-icon" icon={guessAppIcon(win)}  />)}
    </button>
}

export type WorkspacesProps = {
    forMonitor: Gdk.Monitor
    showInactiveIcons?: boolean
}

function getMonitorName(gdkmonitor: Gdk.Monitor) {
    const display = Gdk.Display.get_default()!;
    const screen = display.get_default_screen();
    for (let i = 0; i < display.get_n_monitors(); ++i) {
        if (gdkmonitor === display.get_monitor(i))
            return screen.get_monitor_plug_name(i);
    }
}

export default function Workspaces({ forMonitor, showInactiveIcons = false }: WorkspacesProps) {
    // hacky way to get the connector name (e.g. DP-2)
    const monitorName = getMonitorName(forMonitor)!

    const filterWorkspacesForMonitor = (outputs: OutputsWithWorkspacesWithWindows, name: string) => {
        // @ts-ignore
        return Object.values(outputs)
            // @ts-ignore
            .filter(o => o.monitor?.name === name)
            // @ts-ignore
            .flatMap(o => Object.values(o.workspaces))
            // @ts-ignore
            .sort((a, b) => a.idx - b.idx)
    }

    // The two binds with a derived variable are because I noticed that when turning montors off and on, the manufacturer
    // field was not set. I thought this would emit a signal when it is set afterward (hence the binds) but that doesn't
    // happen. I've added a setTimeout workaround in app.ts. Because of this workaround I technically don't need the
    // bind(forMonitor, 'manufacturer') statement, but I left it in here to remind myself how this works xD
    const outputs = bind(niri, 'outputs')

    const workspacesForMe = outputs.as(os => filterWorkspacesForMonitor(os, monitorName))
    /* const workspacesForMe = Variable.derive([outputs, monitorMake], filterWorkspacesForMonitor) */

    return <box orientation={1} className="workspaces">
        {workspacesForMe.as(ws => ws.map(w => Workspace(w, showInactiveIcons)))}
    </box>
}