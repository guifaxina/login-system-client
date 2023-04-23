import "./styles/global.css";
import { Router } from "./Router";
import { BrowserRouter } from "react-router-dom";

export function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App;
