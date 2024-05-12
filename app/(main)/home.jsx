import { useState, useRef } from "react";
import {
  View,
  Text,
  PanResponder,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants/index";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getNotes } from "../../lib/data";
import { auth } from "../../lib/firebase";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import AddButton from "../../components/AddButton";
import useFirestore from "../../lib/useFirestore";
import NotesCard from "../../components/NotesCard";
import Search from "../../components/Search";
import EmptyNotes from "../../components/EmptyNotes";
const Page = () => {
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const { session, signOut } = useGlobalContext();
  const scrollPosition = useSharedValue(0);
  const pullDownPosition = useSharedValue(0);
  const isReadytoRefresh = useSharedValue(false);

  const { data: notes, refetch } = useFirestore(() =>
    getNotes(auth().currentUser.uid)
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollPosition.value = event.contentOffset.y;
    },
  });

  const onPanRelease = () => {
    pullDownPosition.value = withTiming(isReadytoRefresh.value ? 40 : 0, {
      duration: 150,
    });

    if (isReadytoRefresh.value) {
      isReadytoRefresh.value = false;

      onRefresh();
    }
  };

  const panResponderRef = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) =>
        scrollPosition.value <= 0 && gestureState.dy >= 0,
      onPanResponderMove: (event, gestureState) => {
        const maxDistance = 50;
        pullDownPosition.value = Math.max(
          Math.min(maxDistance, gestureState.dy)
        );

        if (
          pullDownPosition.value >= maxDistance / 2 &&
          isReadytoRefresh.value === false
        ) {
          isReadytoRefresh.value = true;
        }

        if (
          pullDownPosition.value < maxDistance / 2 &&
          isReadytoRefresh.value === true
        ) {
          isReadytoRefresh.value = false;
        }
      },
      onPanResponderRelease: (event, gestureState) => {
        pullDownPosition.value = withTiming(0, { duration: 100 });
      },
      onPanResponderRelease: onPanRelease,
      onPanResponderTerminate: onPanRelease,
    })
  );

  const pullDownStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: pullDownPosition.value,
        },
      ],
    };
  });

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
      pullDownPosition.value = withTiming(0, { duration: 180 });
    }
  };

  const refreshContainerStyles = useAnimatedStyle(() => {
    return {
      height: pullDownPosition.value,
    };
  });


  const handleSearch = (value) => {
    setSearch(value);
  };

  return (
    <SafeAreaView
      pointerEvents={refreshing ? "none" : "auto"}
      className="bg-primary h-full"
      {...panResponderRef.current.panHandlers}
    >
      <View className="px-4">
        <View className="flex-row justify-between items-center my-6">
          <Text className="text-md text-gray-300 font-pregular">
            Welcome back,{" "}
            <Text className="text-secondary">{session?.username}</Text>
          </Text>

          <TouchableOpacity activeOpacity={0.8} onPress={() => signOut()}>
            <Image
              source={icons.logout}
              className="w-4 h-4"
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>

        <Search value={search} onChange={handleSearch} />
      </View>

    <Animated.View style={[refreshContainerStyles]} className="flex items-center translate-y-6">
        <ActivityIndicator size="large" color="#F0DB4F" animating={isReadytoRefresh.value} />
      </Animated.View>
        <Animated.View className="px-4" style={pullDownStyles}>
          <Animated.FlatList
            data={notes}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            numColumns={2}
            keyExtractor={(item) => item.id}
            columnWrapperStyle={{
              justifyContent: "space-around",
              flex: 1,
              gap: 10,
            }}
            ListHeaderComponent={() => (
                <View className="space-x-3 my-6 flex flex-row">
                  <TouchableOpacity className="w-10 h-10 bg-[#171717] rounded-xl items-center justify-center">
                    <Text className="text-[#909090] text-sm">All</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="w-14 h-10 bg-[#171717] rounded-xl items-center justify-center">
                    <Image
                      source={icons.folder}
                      className="w-5 h-5"
                      contentFit="contain"
                    />
                  </TouchableOpacity>
                </View>
            )}
            renderItem={({ item }) => (
              <NotesCard note={item.note} createdAt={item.createdAt} />
            )}
            ListEmptyComponent={<EmptyNotes />}
          />
        </Animated.View>
      <AddButton />
    </SafeAreaView>
  );
};

export default Page;
