import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  Unstable_NumberInput as BaseNumberInput,
  numberInputClasses,
} from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ButtonDemo } from "./ButtonDemo";
import { useContext, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AvatarDemo } from "./AvatarDemo";
import Heading2 from "../Heading2";
import { GlobalContext } from "@/App";

export default function Profile() {
  // const [isUser, setIsuser] = useState(user);
  const { accountType } = useContext(GlobalContext);

  // Later populate with logged in user
  const [fName, setfName] = useState("Dheeraj");
  const [lName, setlName] = useState("Kumar");
  const [email, setEmail] = useState("dkjoshi@gmail.com");
  const [basicRate, setBasicRate] = useState(20);
  const [intermediateRate, setIntermediateRate] = useState(30);
  const [advancedRate, setAdvancedRate] = useState(50);
  const [languages, setLanguages] = useState();
  const [bio, setBio] = useState(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting."
  );
  const [pass, setPass] = useState();
  const [img, setImg] = useState("https://i.pravatar.cc/150");

  const options = [
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

  const animatedComponents = makeAnimated();

  // const validLanguage = (languageToFind) => {
  //   if (!languageToFind) return true;
  //   const index = availLanguages.findIndex(
  //     (language) => language.toLowerCase() === languageToFind.toLowerCase()
  //   );
  //   return index !== -1;
  // };

  const isTutor = () => {
    accountType === "tutor";
  };

  const validRate = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };

  const handleSubmit = () => {
    console.log();
  };

  return (
    <>
      <Heading2 heading={"Personal Details"} />
      <AvatarDemo picPath={img} className="w-50 h-50 my-5" />
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-12">
        <Label className="text-center" htmlFor="picture">
          Update Profile Picture
        </Label>
        <Input id="picture" type="file" />
      </div>
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
            label="First Name"
            defaultValue={fName}
            value={fName}
            onChange={(e) => setfName(e.target.value)}
          />
          <TextField
            label="Second Name"
            defaultValue={lName}
            value={lName}
            onChange={(e) => setlName(e.target.value)}
          />
        </div>
        <div>
          <TextField
            label="Email"
            defaultValue={email}
            variant="filled"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            label="Password"
            defaultValue={pass}
            variant="filled"
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        {/* <div>
          <TextField
            label="Native"
            defaultValue="English"
            value={nativeLanguage}
            onChange={(e) => setNativeLanguage(e.target.value)}
            error={!validLanguage(nativeLanguage) && true}
            helperText={!validLanguage(nativeLanguage) && "Invalid language"}
          />
          <TextField
            label="Fluent"
            defaultValue="Spanish"
            value={fluentLanguage}
            error={!validLanguage(fluentLanguage) && true}
            helperText={!validLanguage(fluentLanguage) && "Invalid language"}
            onChange={(e) => setFluentLanguage(e.target.value)}
          />
        </div> */}
        {isTutor() ? (
          <div className="flex items-center justify-between">
            <TextField
              label="Beginner Hourly Rates"
              defaultValue={20}
              value={basicRate}
              onChange={(e) => setBasicRate(e.target.value)}
              error={!validRate(basicRate) && true}
              helperText={!validRate(basicRate) && "Invalid Rate"}
            />
            <TextField
              label="Intermediate Hourly Rates"
              defaultValue={30}
              value={intermediateRate}
              onChange={(e) => setIntermediateRate(e.target.value)}
              error={!validRate(intermediateRate) && true}
              helperText={!validRate(intermediateRate) && "Invalid Rate"}
            />
          </div>
        ) : (
          <></>
        )}
        {isTutor() ? (
          <div>
            <TextField
              label="Advanced Hourly Rates"
              defaultValue={50}
              value={advancedRate}
              onChange={(e) => setAdvancedRate(e.target.value)}
              error={!validRate(advancedRate) && true}
              helperText={!validRate(advancedRate) && "Invalid Rate"}
            />
          </div>
        ) : (
          <></>
        )}
        <div className="z-50">
          <h6 className="ml-2 mt-3">Languages</h6>
          <Select
            label="languages"
            className="w-[98%] mx-auto"
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={[options[0], options[1]]}
            isMulti
            options={options}
            onChange={(e) => {
              setLanguages(e);
            }}
          />
        </div>
      </Box>

      {isTutor() ? (
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
            label="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </Box>
      ) : (
        <></>
      )}

      <ButtonDemo
        onClick={handleSubmit}
        value={"Update Profile"}
        className="my-10"
      />
    </>
  );
}
