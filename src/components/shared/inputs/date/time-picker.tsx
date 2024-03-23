"use client";

import { FC } from "react";
//
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker, TimePickerProps } from "@mui/x-date-pickers/TimePicker";
//
import useLocales from "@/hooks/use-locales";

export type DataType = Date | null;

export interface Props extends Partial<TimePickerProps<Date>> {
  date: DataType;
  handleChange: (newDate: DataType) => void;
}

export const CustomTimePicker: FC<Props> = ({
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
      <TimePicker
        label="Select time"
        value={date}
        onChange={(newDate) => handleChange(newDate)}
        {...other}
      />
    </LocalizationProvider>
  );
};
