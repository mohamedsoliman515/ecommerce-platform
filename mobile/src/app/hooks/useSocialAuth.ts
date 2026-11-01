import { useSSO } from "@clerk/expo";
import { useState } from "react";
import { Alert } from "react-native";
import { useRef } from "react";
function useSocialAuth() {
    const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
    const { startSSOFlow } = useSSO();
    const isProcessingRef = useRef(false);

    const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple") => {
        if (isProcessingRef.current) return;
        isProcessingRef.current = true;
        setLoadingStrategy(strategy);

        try {
            const { createdSessionId, setActive } = await startSSOFlow({ strategy });
            if (createdSessionId && setActive) {
                await setActive({ session: createdSessionId });
            }
        } catch (error) {
            console.log("Error in social auth:", error);
            const provider = strategy === "oauth_google" ? "Google" : "Apple";
            Alert.alert("Error", `Failed to sign in with ${provider}. Please try again.`);
        } finally {
            isProcessingRef.current = false;
            setLoadingStrategy(null);
        }
    };
    return { loadingStrategy, handleSocialAuth };
}
export default useSocialAuth;