import Tray from "gi://AstalTray";
import { bind } from "astal";
import AstalApps from "gi://AstalApps?version=0.1";
import { Icons } from "../utils/Icons";
export function SystemTray() {
  const tray = Tray.get_default();
  const items = bind(tray, "items");
  let app = new AstalApps.Application();
  const apps = new AstalApps.Apps();

  return (
    <box orientation={1}>
      {bind(tray, "items").as((items) => {
        return items.map((item) => (
          <button
            onClicked={() => item.activate}
            tooltipText={item.get_title()}
            child = {<icon icon={item.icon_name} />}
          />
        ));
      })}
    </box>
  );
}