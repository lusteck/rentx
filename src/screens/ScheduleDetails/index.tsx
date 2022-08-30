import React, { useState } from "react";
import { Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Acessory } from "../../components/Acessory";
import { Button } from "../../components/Button";
import { CarData } from "../../dtos";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { formatDate } from "../../utils/generateInterval";
import api from "../../services/api";

import {
  Container,
  Header,
  SliderContainer,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Acessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceTotal,
  RentalPriceQuota,
} from "./styles";

interface Params {
  car: CarData;
  dates: string[];
}

export function ScheduleDetails() {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  const { car, dates } = route.params as Params;
  const dt1 = formatDate(dates[0]);
  const dt2 = formatDate(dates[dates.length - 1]);

  const rentTotal = Number(dates.length * car.rent.price);

  function handleBack() {
    navigation.goBack();
  }

  async function handleConfirmRental() {
    setLoading(true);

    const schedules = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [...schedules.data.unavailable_dates, ...dates];

    // usuário fixo 1 - implementar autenticação
    api.post("/schedules_byuser", {
      user_id: 1,
      car,
      startDate: dt1,
      endDate: dt2,
    });

    api
      .put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      })
      .then(() => navigation.navigate("ScheduleCompleted"))
      .catch(() => {
        setLoading(false);
        Alert.alert("Não foi possível confirmar o agendamento.");
      });
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <SliderContainer>
        <ImageSlider imagesUrl={car.photos} />
      </SliderContainer>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Acessories>
          {car.accessories.map((accessory) => (
            <Acessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Acessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>de</DateTitle>
            <DateValue>{dt1}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(14)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>até</DateTitle>
            <DateValue>{dt2}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
