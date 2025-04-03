import Logo from "../assets/react.svg";
import useServer from "../services/useServerUser";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { AuthData, GoogleJwtPayload } from "../types";

export default function GoogleAuth() {
  const { logIn } = useServer();

  const navigate = useNavigate();

  const onSubmit = async (values: AuthData) => {
    const response = await logIn(values);
    if (response?.success) {
      navigate("/");
    }
  };

  const handleSuccess = (response: any) => {
    const decoded = jwtDecode<GoogleJwtPayload>(response.credential);
    onSubmit({
      name: decoded.name,
      picture: decoded.picture,
      google_id: decoded.sub,
      email: decoded.email,
    });
  };

  const handleFailure = () => {
    toast.error("Error al autenticarse");
  };

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-slate-100 ">
        <div className="sm:w-1/3 xl:w-1/5   ">
          <div className="mx-auto flex justify-center">
            <img className="h-40 w-auto" src={Logo} alt="Logo" />
          </div>

          <h2 className="text-center text-xl font-bold text-slate-900">
            Inicia sesión
          </h2>
          <GoogleOAuthProvider clientId={clientId}>
            <div className="container">
              <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
            </div>
          </GoogleOAuthProvider>
        </div>
      </div>
    </>
  );
}
