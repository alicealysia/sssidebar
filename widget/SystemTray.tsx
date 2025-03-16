import Tray from "gi://AstalTray";
import {bind} from "astal";
import AstalApps from "gi://AstalApps?version=0.1";
import Gio from "gi://Gio?version=2.0";
import {Gtk} from "astal/gtk3";
import Gdk from "gi://Gdk?version=3.0";
import Gravity = Gdk.Gravity;

const createMenu = (menuModel: Gio.MenuModel, actionGroup: Gio.ActionGroup | null): Gtk.Menu => {
  const menu = Gtk.Menu.new_from_model(menuModel);
  menu.insert_action_group('dbusmenu', actionGroup);

  return menu;
};

export function SystemTray() {
  const tray = Tray.get_default();
  const items = bind(tray, "items");
  let app = new AstalApps.Application();
  const apps = new AstalApps.Apps();

  return (
    <box orientation={1}>
      {
        bind(tray, "items").as(items => items.map(item => {
          const menu = createMenu(item.menuModel, item.actionGroup);
          return(
            <button onClick={(button, event) => {
                if (event.button !== 1 && menu) {
                  menu.popup_at_widget(button, Gravity.NORTH, Gravity.NORTH, null);
                } else {
                  item.activate(1,1);
                }
              }}
              tooltipText={item.get_title()}
              child = {<icon icon={item.icon_name} />
            }/>
          )
        })
      )}
    </box>
  );
}