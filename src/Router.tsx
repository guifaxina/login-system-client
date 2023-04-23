import { Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/SignUp/SignUp";
import { SignIn } from "./pages/SignIn/SignIn";

export function Router() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
      </Route>
    </Routes>
  );
}
