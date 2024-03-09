import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ButtonDemo } from "./ButtonDemo";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AvatarDemo } from "./AvatarDemo";

export default function ValidationTextFields() {
  // Later populate with logged in user
  const [fName, setfName] = useState("Dheeraj");
  const [lName, setlName] = useState("Kumar");
  const [email, setEmail] = useState("dkjoshi@gmail.com");
  const [pass, setPass] = useState();
  const [img, setImg] = useState("https://i.pravatar.cc/150");

  return (
    <>
      <AvatarDemo picPath={img} className="w-50 h-50 mb-5"/>
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-12">
        <Label className="text-center" htmlFor="picture">Update Profile Picture</Label>
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
            // error
            // id="outlined-error"
            label="First Name"
            defaultValue={fName}
          />
          <TextField
            // error
            // id="outlined-error-helper-text"
            label="Second Name"
            defaultValue={lName}
            // helperText="Incorrect entry."
          />
        </div>
        <div>
          <TextField
            // error
            // id="filled-error"
            label="Email"
            defaultValue={email}
            variant="filled"
          />
          <TextField
            type="password"
            // error
            // id="filled-error-helper-text"
            label="Password"
            defaultValue={pass}
            // helperText="Incorrect entry."
            variant="filled"
          />
        </div>
        <div>
          <TextField
            // error
            // id="standard-error"
            label="Language-1"
            defaultValue="English"
            // variant="standard"
          />
          <TextField
            // error
            // id="standard-error-helper-text"
            label="Language-2"
            defaultValue="Spanish"
            helperText="Incorrect entry."
            // variant="standard"
          />
        </div>
      </Box>
      <ButtonDemo value={"Update Profile"} />
    </>
  );
}
