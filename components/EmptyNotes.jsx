import { View, Text } from "react-native";
import { Image } from "expo-image";
import { images } from "../constants";
const EmptyNotes = () => {
  return (
    <View className="flex justify-center items-center px-4 opacity-50">
        <Image
            source={images.stickynotes}
            className="w-[100px] h-[100px]"
            contentFit="contain"
        />

        <Text className="text-sm text-[#909090] font-pregular mt-2">Oppss! You don't have any notes yet</Text>
    </View>
  );
};

export default EmptyNotes;
