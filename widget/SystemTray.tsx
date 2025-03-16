import Tray from "gi://AstalTray";
import {bind, Gio} from "astal";
import {Gtk, Gdk} from "astal/gtk3";

const createMenu = (menuModel: Gio.MenuModel, actionGroup: Gio.ActionGroup | null): Gtk.Menu => {
  const menu = Gtk.Menu.new_from_model(menuModel);
  menu.insert_action_group('dbusmenu', actionGroup);

  return menu;
};

export function SystemTray() {
  const tray = Tray.get_default();
  
  return (
    <box orientation={1}>
      {
        bind(tray, "items").as(items => items.map(item => {
          const menu = createMenu(item.menuModel, item.actionGroup);
          return(
            <button onClick={(button, event) => {
                if (event.button !== 1 && menu) {
                  menu.popup_at_widget(button, Gdk.Gravity.NORTH, Gdk.Gravity.NORTH, null);
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