import { ExitIcon } from "../assets/Icons";
import TabsComponent from "../components/Tabs";
import useServerUser from "../services/useServerUser";
import { store } from "../store/root";

export default function AppContainer() {
  const session = store?.getState().session.key;
  const { logOut } = useServerUser();
  return (
    <main className="p-4">
      <header className="center fixed w-11/12 mx-10 flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md h-14">
        <div className="flex items-center gap-3">
          <img
            src={session?.picture}
            alt="User"
            className="w-10 h-10 rounded-full border border-gray-300"
          />
          <span className="text-lg font-semibold">{session?.name}</span>
        </div>
        <button
          onClick={logOut}
          className="h-10 flex items-center bg-blue-500 text-white px-2 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <span className="cursor-pointer">Salir</span>
          <ExitIcon />
        </button>
      </header>
      <div className="flex justify-center mt-20">
        <TabsComponent />
      </div>
    </main>
  );
}
