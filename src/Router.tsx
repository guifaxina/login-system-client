import { Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/SignUp/SignUp";
import { SignIn } from "./pages/SignIn/SignIn";
import { Home } from "./pages/Home/Home";
import { RecoverPassword } from "./pages/RecoverPassword/RecoverPassword";
import { ResetPassword } from "./pages/ResetPassword/ResetPassword";

export function Router() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/reset-password/:recoverCode" element={<ResetPassword />} />
      </Route>
    </Routes>
  );
}
