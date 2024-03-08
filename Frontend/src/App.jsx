import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/Button";

function App() {
  const [count, setCount] = useState(0);

  return <Button className="m-10" >Submit</Button>;
}

export default App;
