import React, { useState } from "react";
import { StatusBar } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { generateInterval, formatDate } from "../../utils/generateInterval";
import { CarData } from "../../dtos";

import {
  MyCalendar,
  DayProps,
  MarkedDateProps,
} from "../../components/MyCalendar";

import ArrowSvg from "../../assets/arrow.svg";

import {
  Container,
  Header,
  Title,
  Period,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from "./styles";

interface RentalPeriod {
  start: number;
  startFormatted: string;
  end: number;
  endFormatted: string;
}

interface Params {
  car: CarData;
}

export function Schedule() {
  const [lastSelDate, setLastSelDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  function handleConfirmRental() {
    if (!rentalPeriod.start || !rentalPeriod.end) {
      //Alert.alert('Selecione o período para alugar.')
    } else {
      navigation.navigate("ScheduleDetails", {
        car,
        dates: Object.keys(markedDates),
      });
    }
  }

  function handleSelectDate(date: DayProps) {
    let start = !lastSelDate.timestamp ? date : lastSelDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelDate(end);

    const interval = generateInterval(start, end);

    setMarkedDates(interval);

    const datas = Object.keys(interval);
    const firstDate = datas[0];
    const endDate = datas[datas.length - 1];

    setRentalPeriod({
      start: start.timestamp,
      end: end.timestamp,
      startFormatted: formatDate(firstDate),
      endFormatted: formatDate(endDate),
    });
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <BackButton color="white" onPress={handleBack} />

        <Title>
          Escolha uma {"\n"}
          data de início e {"\n"}
          fim do aluguel
        </Title>

        <Period>
          <DateInfo>
            <DateTitle>de</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>até</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </Period>
      </Header>

      <Content>
        <MyCalendar markedDates={markedDates} onDayPress={handleSelectDate} />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmRental}
          enabled={!!rentalPeriod.endFormatted}
        />
      </Footer>
    </Container>
  );
}
