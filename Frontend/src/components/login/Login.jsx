import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import Select from "react-select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const languages = [
  { value: "hindi", label: "Hindi" },
  { value: "bengali", label: "Bengali" },
  { value: "telugu", label: "Telugu" },
  { value: "marathi", label: "Marathi" },
  { value: "tamil", label: "Tamil" },
  { value: "urdu", label: "Urdu" },
  { value: "gujarati", label: "Gujarati" },
  { value: "kannada", label: "Kannada" },
  { value: "odia", label: "Odia" },
  { value: "punjabi", label: "Punjabi" },
  { value: "english", label: "English" },
];

const Login = () => {
  const [type, setType] = useState("Student");
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const handleMultiChange = (selectedOptions) => {
    setSelectedLanguages(selectedOptions);
  };

  useEffect(() => {
    console.log("type", type);
    console.log("email", email);
    console.log("name", name);
    console.log("password", password);
    console.log("confirmPassword", confirmPassword);
    console.log("selectedLanguages", selectedLanguages);
  }, [type, email, name, password, confirmPassword, selectedLanguages])


  return (
    <Dialog>
      <DialogTrigger className="bg-slate-400 text-xl px-4 py-1 rounded-full">{isLogin ? "Login" : "Signup"}</DialogTrigger>
      <DialogContent className="w-80">
        <DialogHeader>
          <DialogTitle>{isLogin ? "Login" : "Signup"}</DialogTitle>
          <DialogDescription>
            {isLogin ? "Login into your account" : "Register please"}
          </DialogDescription>
        </DialogHeader>
        {!isLogin && (
          <>
            <RadioGroup
              defaultValue="Student"
              className="flex items-center justify-between w-10"
              onValueChange={value => setType(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Tutor" id="tutor" />
                <Label htmlFor="tutor">Tutor</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Student" id="student" />
                <Label htmlFor="student">Student</Label>
              </div>
            </RadioGroup>
            <Input
              placeholder={"Enter your name"}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </>
        )}
        <Input
          placeholder={"Enter your email"}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex  gap-2">
          <Input
            placeholder={"Password"}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          {!isLogin && (
            <Input
              placeholder={"Confirm it"}
              onChange={e => setConfirmPassword(e.target.value)}
              type="password"
            />
          )}
        </div>
        {!isLogin && (
          <Select
            closeMenuOnSelect={false}
            isMulti
            options={languages}
            onChange={handleMultiChange}
          />
        )}
        <div className="flex justify-between items-center">
          <Button>{isLogin ? "Login" : "Signup"}</Button>
          <p>
            {isLogin ? (
              <>
                Not registered?{" "}
                <span
                  className="underline hover:cursor-pointer"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  Signup
                </span>
              </>
            ) : (
              <>
                Already registered?{" "}
                <span
                  className="underline hover:cursor-pointer"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  Login
                </span>
              </>
            )}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
