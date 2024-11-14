import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Forgot from "../pages/Forgot";
import SuccessEmailSend from "../pages/SuccessEmailSend";


function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/forgot-confirmado" element={<SuccessEmailSend />} />


      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RoutesApp;