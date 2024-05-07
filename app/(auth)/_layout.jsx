import { Redirect, Stack } from "expo-router";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "../../context/GlobalProvider";
import Loader from "../../components/Loader";

const AuthLayout = () => {
  const { loadingGlobal, session, isLoading } = useGlobalContext();

  if (session && !isLoading)
    return (
      <View className="bg-primary flex-1">
        <Redirect href="/home" />
      </View>
    );

  return (
    <View className="bg-primary flex-1">
      <Stack>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      </Stack>

      <Loader isLoading={loadingGlobal} />
      <StatusBar style="light" backgroundColor="#161622" />
    </View>
  );
};

export default AuthLayout;
