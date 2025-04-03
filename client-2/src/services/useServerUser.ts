import { useState } from "react";
import { toast } from "react-toastify";
import { setKeys } from "../store/slice/sessionSlice";
import { useAppDispatch } from "../store/hooks";
import { googleLogout } from "@react-oauth/google";
import { ApiResponse, AuthData, User } from "../types";

const useServerUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const dispatch = useAppDispatch();

  const logIn = async (data: AuthData) => {
    const url = import.meta.env.VITE_API_URL + "/users/google";
    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);

      const result = await resp.json() as ApiResponse<User>;

      dispatch(setKeys(result.data));
      toast.success("Bienvenido al sistema");
      return { success: true, data: result.data };
    } catch (e) {
      toast.error("Credenciales invalidas");
    }
  };

  const logOut = async () => {
    try {
      googleLogout();
      dispatch(setKeys(null));
      toast.success("Usted ha salido del sistema");
    } catch (e) {
      toast.error("Error");
    }
  };

  const getUsers = async () => {
    const url = import.meta.env.VITE_API_URL + "/users";
    try {
      const resp = await fetch(url, {
        method: "GET",
      });

      if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);

      const result = await resp.json() as ApiResponse<User[]>;

      setUsers(result.data);
    } catch (e) {
      toast.error("Error al cargar los usuarios");
    }
  };

  return {
    logIn,
    logOut,
    users,
    getUsers,
  };
};

export default useServerUser;
