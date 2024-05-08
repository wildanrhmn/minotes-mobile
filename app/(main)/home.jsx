import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants/index";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getNotes } from "../../lib/data";
import { auth } from "../../lib/firebase";

import useFirestore from "../../lib/useFirestore";
import NotesCard from "../../components/NotesCard";
import Search from "../../components/Search";
import EmptyNotes from "../../components/EmptyNotes";
const Page = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { session, signOut } = useGlobalContext();
  const { data: notes, refetch } = useFirestore(() => getNotes(auth().currentUser.uid));

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        className="px-4"
        data={notes}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{
          justifyContent: "space-around",
          flex: 1,
          gap: 10,
        }}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-md text-gray-300 font-pregular">
                Welcome back,{" "}
                <Text className="text-secondary">{session?.username}</Text>
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
        )}
        renderItem={({ item }) => (
          <NotesCard note={item.note} createdAt={item.createdAt} />
        )}
        ListEmptyComponent={<EmptyNotes />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <TouchableOpacity
        activeOpacity={0.8}
        className="bg-secondary w-14 h-14 items-center justify-center rounded-full absolute bottom-16 right-11"
      >
        <Image source={icons.plus} className="w-6 h-6" resizeMode="contain" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Page;
