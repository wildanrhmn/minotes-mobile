import { useEffect, useState } from "react";
import { TouchableOpacity, Keyboard } from "react-native";
import { icons } from "../constants";
import { Image } from "expo-image";

const AddButton = () => {
  const [keyboardShown, setKeyboardShown] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardShown(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
        setTimeout(() => {
            setKeyboardShown(false);
        }, 100);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [keyboardShown]);
  if (keyboardShown) return null;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="bg-secondary w-14 h-14 items-center justify-center rounded-full absolute bottom-16 right-11"
    >
      <Image source={icons.plus} className="w-6 h-6" contentFit="contain" />
    </TouchableOpacity>
  );
};

export default AddButton;
