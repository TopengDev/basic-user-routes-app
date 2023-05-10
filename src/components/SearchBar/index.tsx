import { type FC, useContext } from "react";
import { getUserById, getUsers } from "@/utils/api";
import { GlobalContext } from "@/GlobalState";

const SearchBar: FC = () => {
  const { state, setState } = useContext(GlobalContext);

  const handleSearch = async () => {
    if (state.search) {
      const id = parseInt(state.search);
      const user = await getUserById(id);
      if (user) {
        setState({ ...state, users: [user.data] });
      } else {
        setState({ ...state, users: [] });
      }
    } else {
      const users = await getUsers();
      setState({ ...state, users: users.data });
      console.log(state);
    }
  };
  return (
    <div className="mt-8  px-8 py-4 shadow-xl rounded-xl border-2 border-solid border-slate-300 flex items-center gap-4">
      <button
        className="bg-slate-600 text-white px-4 py-2 rounded-lg p1"
        onClick={() => handleSearch()}
      >
        Search id
      </button>
      <input
        type="number"
        className="border-2 border-solid border-slate-200 px-3 py-2 rounded-lg p1"
        onChange={(e) => setState({ ...state, search: e.target.value })}
      />
    </div>
  );
};

export default SearchBar;
