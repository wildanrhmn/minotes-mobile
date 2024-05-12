import { Text, TouchableOpacity } from "react-native";
import { formatFirestoreTimestamp } from "../lib/utils";

const NotesCard = ({ note, createdAt }) => {
  const formattedDate = formatFirestoreTimestamp(createdAt);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="relative h-[150px] px-4 py-2 w-full flex-1 rounded-xl bg-[#171717] mb-2"
    >
      <Text numberOfLines={4} className="text-[13px] text-[#909090] leading-5">{note}</Text>

      <Text className="text-xs text-[#909090] absolute bottom-3 left-5">{formattedDate}</Text>
    </TouchableOpacity>
  );
};

export default NotesCard;
