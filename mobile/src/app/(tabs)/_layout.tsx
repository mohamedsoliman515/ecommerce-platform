import { Redirect, Tabs } from "expo-router";
import Ionicons from "@react-native-vector-icons/ionicons";
import { BlurView } from "expo-blur";
import { useAuth } from "@clerk/expo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";


const TabsLayout = () => {
    const { isSignedIn, isLoaded } = useAuth();
    const insets = useSafeAreaInsets();

    if (!isLoaded) return null; // for a better ux
    if (!isSignedIn) return <Redirect href={"/(auth)"} />;
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#1DB954",
                tabBarInactiveTintColor: "#B3B3B3",

                tabBarLabelPosition: "below-icon",

                tabBarStyle: {
                    position: "absolute",
                    left: 16,
                    right: 16,
                    bottom: Math.max(insets.bottom, 12),
                    height: 64,
                    paddingTop: 4,
                    paddingBottom: 4,
                    marginHorizontal: 60,
                    backgroundColor: "transparent",
                    borderTopWidth: 0,
                    borderRadius: 24,
                    overflow: "hidden",
                },

                tabBarBackground: () => (
                    <BlurView
                        intensity={80}
                        tint="dark"
                        style={StyleSheet.absoluteFill}
                    />
                ),

                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: "600",
                },

                tabBarItemStyle: {
                    flex: 1,
                    minWidth: 0,
                },

                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Shop",
                    tabBarIcon: ({ color, size }) => <Ionicons name="grid" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: "Cart",
                    tabBarIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
                }}
            />
        </Tabs>
    )
}

export default TabsLayout