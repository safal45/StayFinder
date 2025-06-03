import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";

export default function DateFieldValue(props) {
  const { label } = props
  
  const [value, setValue] = React.useState();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateField
        label={label}
        value={value}
        onChange={(newValue) => setValue(newValue)}
        variant="standard"
        className="text-blue-500 w-4/5"
       
      />
    </LocalizationProvider>
  );
}
