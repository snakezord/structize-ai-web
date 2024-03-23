"use client";

import { FC } from "react";
//
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  DateTimePicker,
  DateTimePickerProps,
} from "@mui/x-date-pickers/DateTimePicker";
//
import useLocales from "@/hooks/use-locales";

export type DataType = Date | null;

export interface Props extends Partial<DateTimePickerProps<Date>> {
  date: DataType;
  handleChange: (newDate: DataType) => void;
}

export const CustomDateTimePicker: FC<Props> = ({
  date,
  handleChange,
  ...other
}) => {
  const { currentLang } = useLocales();
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={currentLang.dateValue}
    >
      <DateTimePicker
        label="Select date"
        value={date}
        onChange={(newDate) => handleChange(newDate)}
        {...other}
      />
    </LocalizationProvider>
  );
};
