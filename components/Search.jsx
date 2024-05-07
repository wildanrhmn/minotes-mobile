import { View, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";

const Search = ({ value, onChange }) => {
  return (
    <View className="flex flex-row items-center rounded-3xl w-full min-h-[45px] space-x-3 px-6 bg-[#171717]">
      <TouchableOpacity>
        <Image source={icons.search} className="w-4 h-4" resizeMode="contain" />
      </TouchableOpacity>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Search notes..."
        placeholderTextColor="#909090"
        className="text-sm mt-1 text-[#909090] font-pregular flex-1"
      />
    </View>
  );
};

export default Search;
