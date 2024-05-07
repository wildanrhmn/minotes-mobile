import { Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  onGoogleSignIn as googleSign,
  onFacebookSignIn as facebookSign,
} from "../lib/action";
import { useGlobalContext } from "../context/GlobalProvider";
import { Link } from "expo-router";

import Toast from "react-native-root-toast";
import images from "../constants/images";

const SocialAuthButton = () => {
  const { setSession, setLoadingGlobal } = useGlobalContext();

  const handleGoogleLogin = async () => {
    setLoadingGlobal(true);
    try {
      const result = await googleSign();

      if (result.success) {
        setSession(JSON.stringify(result.userData));
      }

      Toast.show(result.message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        backgroundColor: result.success ? "green" : "red",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingGlobal(false);
    }
  };

  const handleFacebookLogin = async () => {
    setLoadingGlobal(true);
    try {
      const result = await facebookSign();

      if (result.success) {
        setSession(JSON.stringify(result.userData));
      }

      Toast.show(result.message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        backgroundColor: result.success ? "green" : "red",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingGlobal(false);
    }
  };
  return (
    <View className="pb-8">
      <Text className="font-pregular text-sm text-white text-center">
        Sign in to experience full features
      </Text>
      <TouchableOpacity
        onPress={handleFacebookLogin}
        activeOpacity={0.8}
        className="relative items-center w-full bg-[#1877FA] mt-3 rounded-3xl py-3 flex-row justify-center space-x-3"
      >
        <Image
          source={images.facebook}
          className="w-6 h-6 absolute left-5"
          resizeMode="contain"
        />

        <Text className="text-white text-lg font-bold">
          Sign In With Facebook
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleGoogleLogin}
        activeOpacity={0.8}
        className="relative items-center w-full bg-white mt-5 rounded-3xl py-3 flex-row justify-center space-x-3"
      >
        <Image
          source={images.google}
          className="w-6 h-6 absolute left-5"
          resizeMode="contain"
        />

        <Text className="text-black text-lg font-bold">
          Sign In With Google
        </Text>
      </TouchableOpacity>

      <Text className="px-5 text-center font-plight text-xs mt-5 text-white">
        By logging in, you have agreeing to our{" "}
        <Link href={"/terms-of-service"} className="text-secondary underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href={"/terms-of-service"} className="text-secondary underline">
          Privacy Policy
        </Link>
      </Text>
    </View>
  );
};

export default SocialAuthButton;
