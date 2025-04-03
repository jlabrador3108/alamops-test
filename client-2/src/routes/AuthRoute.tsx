import { Route, Routes } from "react-router-dom";
import GoogleAuth from "../pages/GoogleAuth";

const AuthRoute = () => {
  return (
    <Routes>
      <Route path="/*" element={<GoogleAuth />} />
    </Routes>
  );
};

export default AuthRoute;
