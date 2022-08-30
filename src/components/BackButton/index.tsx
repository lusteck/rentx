import React from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { BorderlessButtonProps } from "react-native-gesture-handler";

import { Container } from "./styles";

interface Props extends BorderlessButtonProps {
  color?: string;
}

export function BackButton({ color, ...rest }: Props) {
  const navigation = useNavigation();

  function handleClick() {
    navigation.goBack();
  }

  return (
    <Container {...rest}>
      <MaterialIcons
        name="chevron-left"
        size={24}
        color={color ? color : "grey"}
        onPress={handleClick}
      />
    </Container>
  );
}
