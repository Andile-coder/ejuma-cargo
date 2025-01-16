import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App({ children }) {
  const [count, setCount] = useState(0);

  return <>{children}</>;
}

export default App;
