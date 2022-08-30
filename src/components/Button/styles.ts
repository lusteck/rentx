import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButtonProps, RectButton } from "react-native-gesture-handler";

interface ButtonProps extends RectButtonProps {
  color?: string;
  enabled?: boolean;
  loading?: boolean;
}

export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;
  padding: 19px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, color }) => color || theme.colors.main};
  opacity: ${({ loading, enabled }) => (!enabled || loading ? 0.5 : 1)};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(15)}px;
`;
