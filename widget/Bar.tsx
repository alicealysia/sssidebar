import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import { Variable } from "astal"
import { SystemTray } from "./SystemTray"

const time = Variable("").poll(1000, "date")

export default function Bar(gdkmonitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor

    return (
        <window
        className="Bar"
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={ RIGHT}
        application={App}>
        <centerbox orientation={1}>
            <SystemTray />
        </centerbox>
        </window>
    )
}
