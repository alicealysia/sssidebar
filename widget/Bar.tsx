import { App, Astal, Gdk } from "astal/gtk3"
import { SystemTray } from "./SystemTray"
import Workspaces from "./Workspaces";

//const time = Variable("").poll(1000, "date")

export function SystrayWindow(gdkmonitor: Gdk.Monitor) {
    const { RIGHT} = Astal.WindowAnchor

    return (
        <window
        className="TrayWindow"
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={RIGHT}
        application={App}>
        <centerbox orientation={1} className="TrayContainer">
            <SystemTray />
        </centerbox>
        </window>
    )
}

export function WorkspaceWindow(gdkmonitor: Gdk.Monitor) {
    const { LEFT} = Astal.WindowAnchor

    return (
        <window
            className="workspace-window"
            gdkmonitor={gdkmonitor}
            exclusivity={Astal.Exclusivity.EXCLUSIVE}
            anchor={LEFT}
            application={App}>
            <centerbox orientation={1}>
                <Workspaces forMonitor={gdkmonitor} showInactiveIcons={true} />
            </centerbox>
        </window>
    )
}
