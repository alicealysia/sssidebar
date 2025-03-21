import { App } from "astal/gtk3"
import style from "./style.scss"
import { SystrayWindow, WorkspaceWindow } from "./widget/Bar"

App.start({
    css: style,
    main() {
        App.get_monitors().map((gdkmonitor) => {
            SystrayWindow(gdkmonitor);
            WorkspaceWindow(gdkmonitor);
        })
    },
})
