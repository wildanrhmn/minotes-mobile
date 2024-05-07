import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants/index";
import { useGlobalContext } from "../../context/GlobalProvider";

import Search from "../../components/Search";
const Page = () => {
  const { session, signOut } = useGlobalContext();
  const user = JSON.parse(session);
  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="my-6 px-4">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-md text-gray-300 font-pregular">
            Welcome back,{" "}
            <Text className="text-secondary">{user?.username}</Text>
          </Text>

          <TouchableOpacity activeOpacity={0.8} onPress={() => signOut()}>
            <Image
              source={icons.logout}
              className="w-4 h-4"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <Search />

        <View className="space-x-3 mt-6 flex flex-row px-4">
          <TouchableOpacity className="w-10 h-10 bg-[#171717] rounded-xl items-center justify-center">
            <Text className="text-[#909090] text-sm">All</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-14 h-10 bg-[#171717] rounded-xl items-center justify-center">
            <Image
              source={icons.folder}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
      className="px-4"
        data={["1", "2", "3", "4"]}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-around", flex: 1, gap: 10 }}
        renderItem={({ item }) => (
          <View className="min-h-[150px] w-full flex-1 rounded-xl bg-[#171717] mb-2"></View> 
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default Page;
