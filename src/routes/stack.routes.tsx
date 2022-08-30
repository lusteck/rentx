import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "../screens/Home";
import { CarDetails } from "../screens/CarDetails";
import { Schedule } from "../screens/Schedule";
import { ScheduleDetails } from "../screens/ScheduleDetails";
import { ScheduleCompleted } from "../screens/ScheduleCompleted";
import { MyCars } from "../screens/MyCars";
import { Splash } from "../screens/Splash";

const { Navigator, Screen } = createStackNavigator();

// Rotas públicas *****
export function StackRoutes() {
  return (
    <Navigator headerMode="none">
      <Screen name="Splash" component={Splash} />
      <Screen
        name="Home"
        component={Home}
        options={{ gestureEnabled: false }}
      />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Schedule" component={Schedule} />
      <Screen name="ScheduleDetails" component={ScheduleDetails} />
      <Screen name="ScheduleCompleted" component={ScheduleCompleted} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}
