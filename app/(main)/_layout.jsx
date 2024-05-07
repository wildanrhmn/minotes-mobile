import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "../../context/GlobalProvider";
import { View } from "react-native";

import Loader from "../../components/Loader";
const MainLayout = () => {
  const { session, isLoading, loadingGlobal } = useGlobalContext();

  if (!isLoading && !session)
    return (
      <View className="bg-primary flex-1">
        <Redirect href="/" />
      </View>
    );

  return (
    <>
      <Stack>
        <Stack.Screen name="home" options={{ headerShown: false }} />
      </Stack>

      <Loader isLoading={loadingGlobal} />
      <StatusBar style="light" backgroundColor="#161622" />
    </>
  );
};

export default MainLayout;
