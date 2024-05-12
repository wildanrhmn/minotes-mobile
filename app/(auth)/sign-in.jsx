import { View, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import images from "../../constants/images";
import SocialAuthButton from "../../components/SocialAuthButton";

const Page = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <KeyboardAwareScrollView>
        <View className="w-full min-h-[90vh] justify-between px-6 my-6">
          <View className="items-center justify-center mt-8">
            <Image
              source={images.notes}
              className="w-[130px] h-[80px]"
              contentFit="contain"
            />

            <Text className="text-white text-4xl font-pbold my-7">
              Log In to MI<Text className="text-secondary">NOTES</Text>
            </Text>
          </View>

          <SocialAuthButton />

        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Page;
