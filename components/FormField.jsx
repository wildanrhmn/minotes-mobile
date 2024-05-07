import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Controller } from "react-hook-form";
import icons from "../constants/icons";

const FormField = ({
  label,
  placeholder,
  title,
  name,
  control,
  keyboardType,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="space-y-2 mt-7">
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <View className="flex flex-col space-y-3">
            <View className="w-full h-16 px-4 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
              <TextInput
                label={label}
                placeholder={placeholder}
                placeholderTextColor="#7B7B8B"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType={keyboardType}
                className="flex-1 text-white font-psemibold text-base bg-primary"
                secureTextEntry={title === "Password" && !showPassword}
              />

              {title === "Password" && (
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Image
                    source={!showPassword ? icons.hide : icons.show}
                    className="w-6 h-6"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
            </View>

            {error && (
              <Text className="text-red-500 text-sm">{error.message}</Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default FormField;
