import styled from "styled-components/native";
import { FlatList } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";
import { CarData } from "../../dtos";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  width: 100%;
  height: 113px;
  background-color: ${({ theme }) => theme.colors.header};
  justify-content: flex-end;
  padding: 32px 24px;
`;

export const HeaderContent = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const TotalCars = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
`;

export const CarList = styled(FlatList as new () => FlatList<CarData>).attrs({
  contentContainerStyle: { padding: 24 },
  showsVerticalScrollIndicator: false,
})``;

export const MyCarButton = styled(RectButton)`
  width: 60px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.main};
  position: absolute;
  bottom: 13px;
  right: 22px;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
`;
