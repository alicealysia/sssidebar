import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import { Variable } from "astal"
import { SystemTray } from "./SystemTray"
import Workspaces from "./Workspaces";

const time = Variable("").poll(1000, "date")

export function SystrayWindow(gdkmonitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor

    return (
        <window
        className="Bar"
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={RIGHT}
        application={App}>
        <centerbox orientation={1}>
            <SystemTray />
        </centerbox>
        </window>
    )
}

export function WorkspaceWindow(gdkmonitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor

    return (
        <window
            className="Bar"
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
