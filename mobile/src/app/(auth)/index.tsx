import useSocialAuth from "@/hooks/useSocialAuth";
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";

const AuthScreen = () => {
    const { loadingStrategy, handleSocialAuth } = useSocialAuth();

    return (
        <View className="flex-1 justify-center items-center bg-white px-8 gap-5">
            {/* DEMO IMAGE */}
            <Image
                source={require("@/assets/images/auth-image.png")}
                style={{
                    width: 380,
                    height: 300,
                    alignSelf: "center",
                }}
                resizeMode="contain"
            />

            <View className="gap-2 mt-3">
                {/* GOOGLE SIGN IN BTN */}
                <TouchableOpacity
                    className="flex-row items-center justify-center bg-white border border-gray-300 rounded-full px-6 py-2"
                    onPress={() => handleSocialAuth("oauth_google")}
                    disabled={loadingStrategy !== null}
                    style={{
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.1,
                        elevation: 2, // this is for android
                    }}
                >
                    {loadingStrategy === "oauth_google" ? (
                        <ActivityIndicator size={"small"} color={"#4285f4"} />
                    ) : (
                        <View className="flex-row items-center justify-center">
                            <Image
                                source={require("@/assets/images/google.png")}
                                style={{
                                    width: 50,
                                    height: 50,
                                    marginRight: 12,
                                }}
                                resizeMode="contain"
                            />
                            <Text className="text-black font-medium text-base">Continue with Google</Text>
                        </View>
                    )}
                </TouchableOpacity>

                {/* APPLE SIGN IN BTN */}
                <TouchableOpacity
                    className="flex-row items-center justify-center bg-white border border-gray-300 rounded-full px-6 py-3"
                    onPress={() => handleSocialAuth("oauth_apple")}
                    disabled={loadingStrategy !== null}
                    style={{
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.1,
                        elevation: 2, // this is for android
                    }}
                >
                    {loadingStrategy === "oauth_apple" ? (
                        <ActivityIndicator size={"small"} color={"#4285f4"} />
                    ) : (
                        <View className="flex-row items-center justify-center">
                            <Image
                                source={require("@/assets/images/apple.png")}
                                style={{
                                    width: 40,
                                    height: 40,
                                    marginRight: 12
                                }}
                                resizeMode="contain"
                            />
                            <Text className="text-black font-medium text-base">Continue with Apple</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            <Text className="text-center text-gray-500 text-xs leading-4 mt-6 px-2">
                By signing up, you agree to our <Text className="text-blue-500">Terms</Text>
                {", "}
                <Text className="text-blue-500">Privacy Policy</Text>
                {", and "}
                <Text className="text-blue-500">Cookie Use</Text>
            </Text>
        </View>
    );
};

export default AuthScreen;