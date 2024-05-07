import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { images } from "../constants";

import CustomButtom from "../components/CustomButton";
import Loader from "../components/Loader";

import { useGlobalContext } from "../context/GlobalProvider";
import { router, Redirect } from "expo-router";
export default function Page() {
  const { session, isLoading } = useGlobalContext();

  if (isLoading) return <Loader isLoading={isLoading} />;
  if (session)
    return (
      <View className="bg-primary flex-1">
        <Redirect href="/home" />
      </View>
    );

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex min-h-[90vh] px-4 justify-center items-center space-y-7">
          <Image
            source={images.notes}
            className="w-[130px] h-[80px]"
            resizeMode="contain"
          />

          <Image
            source={images.index}
            className="w-[400px] h-[300px]"
            resizeMode="contain"
          />

          <Text className="text-white text-4xl font-pbold">
            MI<Text className="text-secondary">NOTES</Text>
          </Text>
          <Text className="text-white font-pregular text-base text-center">
            The only app that will help you write down your notes seamlessly
          </Text>

          <CustomButtom
            onPress={() => router.push("/sign-in")}
            title="Sign in"
            containerStyle={"mt-10 min-w-full"}
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#0D0B02" style="light" />
    </SafeAreaView>
  );
}
