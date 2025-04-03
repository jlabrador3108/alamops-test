import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const clientId = "TU_CLIENT_ID_AQUI"; // Reemplaza con tu Client ID

const GoogleAuth = () => {
  const [user, setUser] = useState(null);

  const handleSuccess = (response) => {
    const decoded = jwt_decode(response.credential);
    setUser({
      name: decoded.name,
      picture: decoded.picture,
    });
  };

  const handleFailure = () => {
    console.log("Login Failed");
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="container">
        {!user ? (
          <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
        ) : (
          <div className="profile">
            <img src={user.picture} alt="Profile" />
            <h3>{user.name}</h3>
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
