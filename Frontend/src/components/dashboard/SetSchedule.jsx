import Select from "react-select";
import makeAnimated from "react-select/animated";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import React from "react";
import Heading2 from "../Heading2";
import { ButtonDemo } from "./ButtonDemo";

const SetSchedule = () => {
  const [title, setTitle] = useState();
  const [duration, setDuration] = useState();
  const [sessions, setSessions] = useState();
  const [language, setLanguage] = useState();
  const [availableFrom, setAvailableFrom] = useState();
  const [availableTill, setAvailableTill] = useState();
  const [time, setTime] = useState();
  const [days, setDays] = useState();
  const [description, setDescription] = useState(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting."
  );

  const durationOptions = [
    { value: "30 Min", label: "30 Min" },
    { value: "45 Min", label: "45 Min" },
    { value: "60 Min", label: "60 Min" },
  ];

  const daysOptions = [
    { value: "0", label: "Sunday" },
    { value: "1", label: "Monday" },
    { value: "2", label: "Tuesday" },
    { value: "3", label: "Wednesday" },
    { value: "4", label: "Thursday" },
    { value: "5", label: "Friday" },
    { value: "6", label: "Saturday" },
  ];

  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Mandarin Chinese", label: "Mandarin Chinese" },
    { value: "Hindi", label: "Hindi" },
    { value: "Spanish", label: "Spanish" },
    { value: "French", label: "French" },
    { value: "Standard Arabic", label: "Standard Arabic" },
    { value: "Bengali", label: "Bengali" },
    { value: "Russian", label: "Russian" },
    { value: "Portuguese", label: "Portuguese" },
    { value: "Urdu", label: "Urdu" },
  ];

  const validSession = (value) => {
    return typeof value === "number" && !isNaN(value);
  };

  const animatedComponents = makeAnimated();

  return (
    <>
      <Heading2 heading={"Create & Manage Schedule"} />
      <Box
        className="mb-10"
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "35ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            type="number"
            label="Mininum Sessions Per Month"
            value={sessions}
            // error={!validSession(sessions) && true}
            // helperText={!validSession(sessions) && "Needs an Integer"}
            onChange={(e) => setSessions(e.target.value)}
          />
        </div>
        <div className="z-50">
          <h6 className="ml-2 mt-3">Duration of Sessions</h6>
          <Select
            label="Duration"
            className="w-[98%] mx-auto"
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={[durationOptions[0]]}
            options={durationOptions}
            onChange={(e) => setDuration(e.value)}
          />
        </div>
        <div className="z-50">
          <h6 className="ml-2 mt-3">Language to Teach</h6>
          <Select
            label="languages"
            className="w-[98%] mx-auto"
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={languageOptions[0]}
            options={languageOptions}
            onChange={(e) => setLanguage(e.value)}
          />
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                label="Available From"
                onChange={(e) => setAvailableFrom(e)}
              />
              <DatePicker
                label="Available Till"
                onChange={(e) => availableTill(e)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["TimePicker"]}>
              <TimePicker label="Start Time" onChange={(e) => setTime(e)} />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className="z-50">
          <h6 className="ml-2 mt-3">Session Days In A Week</h6>
          <Select
            label="Days"
            className="w-[98%] mx-auto"
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={daysOptions[0]}
            options={daysOptions}
            isMulti
            onChange={(e) => setDays(e.value)}
          />
        </div>
      </Box>
      <Box
        sx={{
          width: 625,
          maxWidth: "100%",
        }}
      >
        <TextField
          fullWidth
          multiline
          rows={6}
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Box>
      <ButtonDemo
        // onClick={handleSubmit}
        value={"Create Schedule"}
        className="my-10"
      />
      <Heading2 heading={"Created Schedules"} />
    </>
  );
};

export default SetSchedule;
