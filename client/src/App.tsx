import { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const clientId = "709407869665-8ti4nes9mghprgg9a69ujoi4tu5nk34n.apps.googleusercontent.com"; // Reemplázalo con tu Client ID

interface User {
  name: string;
  picture: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLoginSuccess = (credentialResponse: any) => {
    const decoded: any = jwtDecode(credentialResponse.credential);
    setUser({
      name: decoded.name,
      picture: decoded.picture,
    });
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">Login con Google</h1>

        {user ? (
          <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center">
            <img src={user.picture} alt="User" className="w-20 h-20 rounded-full mb-4" />
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <button
              onClick={handleLogout}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <GoogleLogin onSuccess={handleLoginSuccess} onError={() => console.error("Error en login")} />
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
