import { useEffect, useState } from "react";
import useServerTemplate from "../services/useServerTemplate";

export default function TemplateTable() {
  const { templates, getTemplates, newTemplate } = useServerTemplate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const addTemplate = () => {
    if (title.trim() === "" || description.trim() === "") return;
    newTemplate({
      title: title,
      description: description,
    });
    getTemplates();
    setTitle("");
    setDescription("");
  };

  useEffect(() => {
    getTemplates();
  }, []);

  const formatDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-6 min-h-96 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Gestión de Plantillas</h2>
      <div className="my-4 flex gap-2">
        <input
          type="text"
          onChange={handleTitleChange}
          placeholder="Título"
          value={title}
          className="p-2 border rounded"
        />
        <input
          type="text"
          onChange={handleDescriptionChange}
          placeholder="Descripción"
          value={description}
          className="p-2 border rounded w-full"
        />
        <button
          onClick={addTemplate}
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition ${
            title && description ? "" : "opacity-50 cursor-not-allowed"
          }`}
          disabled={!title || !description}
        >
          Agregar
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Título</th>
            <th className="border p-2">Descripción</th>
            <th className="border p-2">Creador</th>
            <th className="border p-2">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <tr key={template.created_at} className="border">
              <td className="border text-center">{template.title}</td>
              <td className="border text-center">{template.description}</td>
              <td className="border text-center">{template.created_by}</td>
              <td className="border text-center">
                {formatDate(template.created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
