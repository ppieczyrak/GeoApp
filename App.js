import {createStackNavigator, createAppContainer } from "react-navigation";
import Main from "./src/components/Main";
import List from "./src/components/List";
import Map from "./src/components/Map";

const App = createStackNavigator({
    main: { screen: Main },
    list: { screen: List},
    map: { screen: Map},
  } 
);

export default createAppContainer(App);