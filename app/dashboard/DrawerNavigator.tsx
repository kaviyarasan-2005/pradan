import { createDrawerNavigator } from "@react-navigation/drawer";
import Dashboard from "./index";
import SettingsScreen from "./settings";
import TotalSubmit from "./totalSubmit";
import Pending from "./pending";
import Approved from "./approved";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      {/* <Drawer.Screen name="Total Submit" component={TotalSubmit} /> */}
      {/* <Drawer.Screen name="Pending" component={Pending} /> */}
      {/* <Drawer.Screen name="Approved" component={Approved} /> */}
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}
