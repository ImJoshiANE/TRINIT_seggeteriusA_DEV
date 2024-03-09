import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import { GlobalContext } from "@/App";

const Login = () => {
  const { toast } = useToast();
  const [type, setType] = useState("Student");
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { languages, setUser } = useContext(GlobalContext);

  const handleMultiChange = (selectedOptions) => {
    const langs = selectedOptions.map(option => option.value);
    setSelectedLanguages(langs);
  };

  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    console.log("cj");
    if (!email || !password) {
      toast({
        description: "Please fill all the details",
      });
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      toast({
        description: "Please enter a valid email",
      });
      return;
    }

    const data = {
      email,
      password,
      fullName: name,
      languages: selectedLanguages,
    };

    try {
      setIsSubmitting(true);
      const res = await axios.post(
        `/api/users/signup`,
        { ...data },
        { withCredentials: true }
      );

      if (res.data?.status === "success") {
        toast({
          description: "Signup successful"
        });
        setUser({
          fullName: res.data.user.fullName,
          email: res.data.user.email,
          accountType: res.data.user.accountType,
          profilePicture: res.data.user.profilePicture,
          languages: res.data.user.languages,
        });
        setIsOpen(!isOpen);
      } else if (res.data?.status === "error") {
        toast({
          description: "Something went wrong!",
        });
      }
    } catch (error) {
      console.log(error);
      const msg = error.response.data.message || error.response.data.error;
      toast({
        description: msg,
      });
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        description: "Please fill all the fields",
      });
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      toast({
        description: "Please enter a valid email",
      });
      return;
    }

    const data = {
      email,
      password,
    };

    try {
      setIsSubmitting(true);
      const res = await axios.post(
        `api/users/login`,
        { ...data },
        { withCredentials: true }
      );

      if (res.data?.status === "success") {
        toast({
          description: "Login successful",
        });
        console.log(res);
        setUser({
          fullName: res.data.user.fullName,
          email: res.data.user.email,
          accountType: res.data.user.accountType,
          profilePicture: res.data.user.profilePicture,
          languages: res.data.user.languages,
        });
        setIsOpen(!isOpen);
      } else if (res.data?.status === "error") {
        toast({
          description: "Something went wrong",
        });
      }
    } catch (error) {
      console.log(error);
      const msg = error.response.data.message || error.response.data.error;
      toast({
        description: msg
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    console.log("type", type);
    console.log("email", email);
    console.log("name", name);
    console.log("password", password);
    console.log("confirmPassword", confirmPassword);
    console.log("selectedLanguages", selectedLanguages);
  }, [type, email, name, password, confirmPassword, selectedLanguages]);

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger className="bg-slate-400 text-xl px-4 py-1 rounded-full">
        {isLogin ? "Login" : "Signup"}
      </DialogTrigger>
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
              onValueChange={(value) => setType(value)}
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
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          <Button
            onClick={(e) => {
              isLogin ? handleSubmitLogin(e) : handleSubmitSignup(e);
            }}
          >
            {isLogin ? "Login" : "Signup"}
          </Button>
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
