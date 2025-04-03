import { useEffect } from "react";
import useServerUser from "../services/useServerUser";

export default function UserTable() {
  const { users, getUsers } = useServerUser();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="p-6 min-h-96 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Gestión de Plantillas</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Avatar</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Correo</th>
            <th className="border p-2">Id de google</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.google_id} className="border">
              <td className="px-4 py-2 flex items-center justify-center">
                <img
                  src={user.picture}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </td>
              <td className="border text-center">{user.name}</td>
              <td className="border text-center">{user.email}</td>
              <td className="border text-center">{user.google_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
