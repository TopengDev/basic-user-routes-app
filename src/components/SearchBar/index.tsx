import { type FC, useState, type Dispatch, type SetStateAction } from "react";
import { getUserById, getUsers } from "@/utils/api";
import { IUser } from "@/interfaces";

interface IProps {
  setUsers: Dispatch<SetStateAction<IUser[]>>;
}

const SearchBar: FC<IProps> = ({ setUsers }) => {
  const [search, setSearch] = useState("");
  const handleSearch = async () => {
    const id = parseInt(search);
    if (search) {
      await getUserById(id).then((data) => {
        if (data) setUsers([data.data]);
      });
    } else {
      await getUsers().then((data) => setUsers(data.data));
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
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
