import { View, TextInput, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { icons } from "../constants";
import { useState } from "react";

const Search = () => {
  const [value, setValue] = useState("");
  return (
    <View className="flex flex-row items-center rounded-3xl w-full min-h-[45px] space-x-3 px-6 bg-[#171717]">
      <TouchableOpacity>
        <Image source={icons.search} className="w-4 h-4" contentFit="contain" />
      </TouchableOpacity>
      <TextInput
        value={value}
        onChangeText={(text) => setValue(text)}
        placeholder="Search notes..."
        placeholderTextColor="#909090"
        className="text-sm text-[#909090] font-pregular flex-1 mt-0.5"
      />

      {value && (
        <TouchableOpacity onPress={() => setValue("")}>
          <Image
            source={icons.close}
            className="w-3 h-3"
            contentFit="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Search;
