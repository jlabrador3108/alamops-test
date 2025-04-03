import { useState } from "react";
import TemplateTable from "./TemplateTable";
import UserTable from "./UserTable";

export default function TabsComponent() {
  const [activeTab, setActiveTab] = useState("plantillas");

  return (
      <div className=" w-full h-full max-w-6xl mx-auto bg-white shadow-md rounded-lg p-4">
        <div className="flex border-b border-gray-300">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "plantillas"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("plantillas")}
          >
            Plantillas
          </button>

          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "usuarios"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("usuarios")}
          >
            Usuarios
          </button>
        </div>
        <div className="mt-4">
          {activeTab === "plantillas" && (
            <TemplateTable />
          )}

          {activeTab === "usuarios" && (
            <UserTable />
          )}
        </div>
      </div>
  );
}
