import { useState } from "react";
import { toast } from "react-toastify";
import { store } from "../store/root";
import { ApiResponse, Template } from "../types";

const useServerTemplate = () => {
  const [templates, setTemplates] = useState<Template[]>([]);

  const newTemplate = async (body: Omit<Template, 'id' | 'created_at' | 'created_by'>) => {

    const session = store?.getState().session;
    const key = session.key;

    const url = import.meta.env.VITE_API_URL + "/templates";
    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ created_by: key?.email, ...body }),
        redirect: 'manual', 
      });

      if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);

      const result = await resp.json() as ApiResponse<Template>;

      setTemplates([result.data,...templates]);

      toast.success("Plantilla creada");
    } catch (e) {
      toast.error("Error al crear plantilla");
    }
  };

  const getTemplates = async () => {
    const url = import.meta.env.VITE_API_URL + "/templates";
    try {
      const resp = await fetch(url, {
        method: "GET",
      });

      if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);

      const result = await resp.json() as ApiResponse<Template[]>;

      setTemplates(result.data);
    } catch (e) {
      toast.error("Error al cargar las plantillas");
    }
  };

  return {
    newTemplate,
    templates,
    getTemplates,
  };
};

export default useServerTemplate;
