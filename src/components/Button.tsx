import { Text, TouchableOpacity, ActivityIndicator, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
}

export function Button({ title, isLoading = false, ...rest }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isLoading}
      style={{
        backgroundColor: "#F48F56",
        width: "100%",
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
      }}
      {...rest}
    >
      {
        isLoading ?
          <ActivityIndicator className="text-green-500" /> :
          <Text className="text-green-500 text-base font-bold uppercase">{title}</Text>
      }

    </TouchableOpacity>
  )
}