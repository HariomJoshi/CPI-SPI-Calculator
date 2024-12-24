import "./App.css";
import { Home } from "./pages/Home";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

function App() {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  return (
    <div className={`${darkTheme ? "bg-black" : "bg-white"}`}>
      <h2
        className={`text-3xl font-bold ${
          darkTheme ? "text-white bg-black" : "text-black bg-white"
        } flex justify-around`}
      >
        CPI-SPI-Caculator
      </h2>
      <div className="flex justify-around">
        <Switch
          onClick={() => {
            setDarkTheme(!darkTheme);
          }}
        ></Switch>
      </div>
      <Home darkTheme={darkTheme} />
    </div>
  );
}

export default App;
