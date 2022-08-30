import React from "react";
import LottieView from "lottie-react-native";

import loadingCar from "../../assets/speed.json";
import { Container } from "./styles";

export function LoadingAnimation() {
  return (
    <Container>
      <LottieView
        source={loadingCar}
        autoPlay
        style={{ width: 150 }}
        resizeMode="contain"
        loop
      />
    </Container>
  );
}
