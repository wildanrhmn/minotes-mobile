import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const CustomButton = ({
  containerStyle,
  title,
  titleStyle,
  onPress,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={isLoading}
      className={`bg-secondary rounded-3xl min-h-[62px] justify-center items-center ${containerStyle} ${
        isLoading && "opacity-50"
      }`}
    >
      <Text className={`text-black-100 font-psemibold text-lg ${titleStyle}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
