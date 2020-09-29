import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Modules
import rechargeHome from "../RechargeList/rechargeList";
import RechargeHistory from "../RechargeHistory/RechargeHistory";
import rechargeView from "../RechargeList/rechargeView";
import NewConsumer from "../NewConsumer/NewConsumer";
import Users from "../Users/Users";
import UserDetails from "../Users/UserDetails";
import Settings from "../Settings/Settings";

// Icons
import mobileRechargeDisable from "../../assets/mobileRecharge.png";
import mobileRechargeEnable from "../../assets/mobileRechargeSelected.png";
import settings from "../../assets/settings.png";
import settingsSelected from "../../assets/settingsSelected.png";
import newUser from "../../assets/newUser.png";
import newUserSelected from "../../assets/newUserSelected.png";
import users from "../../assets/users.png";
import usersSelected from "../../assets/usersSelected.png";
import rechargeHistorySelected from "../../assets/rechargeHistorySelected.png";
import rechargeHistory from "../../assets/rechargeHistory.png";


import { Image, View, TouchableOpacity, Text, Platform } from "react-native";
import { px } from "../util/dimension";

const RechargeStack = createStackNavigator();
const RechargeHistoryStack = createStackNavigator();
const NewConsumerStack = createStackNavigator();
const UserssStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const RechargeNavigator = ({ navigation }) => (
    <RechargeStack.Navigator initialRouteName="rechageList">
        <RechargeStack.Screen
            name="rechageList"
            component={rechargeHome}
            options={{
                title: "Recharge List",
                headerStyle: {
                    backgroundColor: "#04405a",
                    height: px(50)
                },
                headerTitleStyle: {
                    alignSelf: "center",
                    color: "white",
                },
            }}
        />
        <RechargeStack.Screen
            name="rechargeView"
            component={rechargeView}
            options={{
                title: "Recharge View",
                headerStyle: {
                    backgroundColor: "#04405a",
                    height: px(50)
                },
                headerTitleStyle: {
                    alignSelf: "center",
                    color: "white",
                },
            }}
        />
    </RechargeStack.Navigator>
);

const RechargeHistoryNavigator = ({ navigation }) => (
    <RechargeHistoryStack.Navigator initialRouteName="rechageHistory">
        <RechargeHistoryStack.Screen
            name="rechageHistory"
            component={RechargeHistory}
            options={{
                title: "Recharge History",
                headerStyle: {
                    backgroundColor: "#04405a",
                    height: px(50)
                },
                headerTitleStyle: {
                    alignSelf: "center",
                    color: "white",
                },
            }}
        />
    </RechargeHistoryStack.Navigator>
);

const NewConsumerNavigator = ({ navigation }) => (
    <NewConsumerStack.Navigator>
        <NewConsumerStack.Screen
            name="New Consumer"
            component={NewConsumer}
            options={{
                title: "New Consumer",
                
                headerStyle: {
                    backgroundColor: "#04405a",
                    height: px(50)
                },
                headerTitleStyle: {
                    alignSelf: "center",
                    color: "white",
                },
            }}
        />
    </NewConsumerStack.Navigator>
);

const UsersNavigator = ({ route, navigation }) => (
    <UserssStack.Navigator initialRouteName="users">
        <UserssStack.Screen
            name="users"
            component={Users}
            options={{
                title: "Users",
                headerStyle: {
                    backgroundColor: "#04405a",
                    height: px(50)
                },
                headerTitleStyle: {
                    alignSelf: "center",
                    color: "white",
                },
            }}
        />
        <UserssStack.Screen
            name="userDetails"
            component={UserDetails}
            options={{
                title: "User Details",
                headerStyle: {
                    backgroundColor: "#04405a",
                    height: px(50)
                },
                headerTitleStyle: {
                    alignSelf: "center",
                    color: "white",
                },
            }}
        />
    </UserssStack.Navigator>
);


const SettingsNavigator = ({ navigation }) => (
    <SettingsStack.Navigator>
        <SettingsStack.Screen
            name="Deleted Users"
            component={Settings}
            options={{
                title: "Deleted Users",
                headerStyle: {
                    backgroundColor: "#04405a",
                    height: px(50)
                },
                headerTitleStyle: {
                    alignSelf: "center",
                    color: "white",
                },
            }}
        />
    </SettingsStack.Navigator>
);

const Tabs = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
    return (
        <View
            style={{
                flexDirection: "row",
                height: px(50),
                borderTopWidth: 1,
                borderTopColor: "#ccc",
                backgroundColor: "white"
            }}
        >
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                };

                let iConName = "";
                switch (label) {
                    case "Recharge":
                        iConName = isFocused ? mobileRechargeEnable : mobileRechargeDisable;
                        break;
                    case "History":
                        iConName = isFocused ? rechargeHistorySelected : rechargeHistory;
                        break;
                    case "New":
                        iConName = isFocused ? newUserSelected : newUser;
                        break;
                    case "Users":
                        iConName = isFocused ? usersSelected : users;
                        break;
                    case "Del Users":
                        iConName = isFocused ? settingsSelected : settings;
                        break;
                    default:
                        break;
                }

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ["selected"] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center" }}
                    >
                        <Image source={iConName} style={{ width: px(20), height: px(20) }} />
                        <Text style={{ color: isFocused ? "#E74C3C" : "#222" }}>{label}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default () => {
    return (
        <NavigationContainer>
            <Tabs.Navigator
                initialRouteName="RechargeList"
                tabBarOptions={{
                    activeTintColor: "black",
                }}
                tabBar={(props) => <MyTabBar {...props} />}
            >
                <Tabs.Screen
                    name="RechargeList"
                    component={RechargeNavigator}
                    tabBarIcon={mobileRechargeDisable}
                    options={{
                        tabBarLabel: "Recharge",
                    }}
                />
                <Tabs.Screen
                    name="RechargeHistory"
                    component={RechargeHistoryNavigator}
                    tabBarIcon={mobileRechargeDisable}
                    options={{
                        tabBarLabel: "History",
                    }}
                />
                <Tabs.Screen
                    name="New"
                    component={NewConsumerNavigator}
                    tabBarIcon={mobileRechargeDisable}
                    options={{
                        tabBarLabel: "New",
                    }}
                />
                <Tabs.Screen
                    name="Users"
                    component={UsersNavigator}
                    tabBarIcon={mobileRechargeDisable}
                    options={{
                        tabBarLabel: "Users",
                    }}
                />
                <Tabs.Screen
                    name="Deleted Users"
                    component={SettingsNavigator}
                    tabBarIcon={mobileRechargeDisable}
                    options={{
                        tabBarLabel: "Del Users",
                    }}
                />
            </Tabs.Navigator>
        </NavigationContainer>
    );
};
