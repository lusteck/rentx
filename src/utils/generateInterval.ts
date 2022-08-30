import { addDays } from "date-fns";

import { MarkedDateProps, DayProps } from "../components/MyCalendar";
import theme from "../styles/theme";

export function generateInterval(start: DayProps, end: DayProps) {
  let interval: MarkedDateProps = {};
  let dt1 = new Date(start.timestamp);
  const dt2 = new Date(end.timestamp);
  let data = dt1;

  while (data <= dt2) {
    const date = data.toISOString().slice(0, 10);

    interval = {
      ...interval,
      [date]: {
        color:
          start.dateString === date || end.dateString === date
            ? theme.colors.main
            : theme.colors.main_light,

        textColor:
          start.dateString === date || end.dateString === date
            ? theme.colors.main_light
            : theme.colors.main,
      },
    };

    data = addDays(data, 1);
  }

  return interval;
}

export function formatDate(data: string) {
  const myDate = data.split("-");
  return `${myDate[2]}/${myDate[1]}/${myDate[0]}`;
}
