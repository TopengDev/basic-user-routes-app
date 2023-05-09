import {
  type FC,
  useState,
  useEffect,
  type Dispatch,
  type SetStateAction,
} from "react";
import { PersonSVG } from "@/components/SVG";
import { getMe, getUsers } from "@/utils/api";
import {
  PopupWindow,
  EditUserForm,
  AddUserForm,
  UserCard,
  SearchBar,
} from "@/components";
import type { IUser, IEditUserForm, IMe } from "@/interfaces";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";
import DeleteConfirmation from "@/components/DeleteConfirmation";

interface IProps {
  setToken: Dispatch<SetStateAction<string>>;
}

const HomePage: FC<IProps> = ({ setToken }) => {
  const router = useRouter();
  const deleteToken = () => {
    destroyCookie(null, "accessToken");
    setToken("");
  };
  const [users, setUsers] = useState<IUser[]>([]);

  const [editUserForm, setEditUserForm] = useState<IEditUserForm>({
    id: -1,
    name: "",
    address: "",
    gender: "l",
    born_date: new Date(),
  });
  const [state, setState] = useState({
    addUserPopupWindow: false,
    editUserPopupWindow: false,
    deleteConfirmationPopup: false,
  });
  const [me, setMe] = useState<IMe>({
    id: null,
    created_at: null,
    status: null,
    name: null,
    email: null,
  });
  const [delId, setDelId] = useState(-1);

  useEffect(() => {
    const fetchData = async () => {
      const me = await getMe();
      if (me) {
        const resData = await me;
        const { id, created_at, status, name, email } = await resData;
        setMe({ id, created_at, status, email, name });
      } else {
        deleteToken();
        router.reload();
      }
      await getUsers().then((data) => setUsers(data.data));
    };
    fetchData();
  }, []);

  return (
    <section className="flex justify-center items-center flex-col p-8">
      {state.deleteConfirmationPopup ? (
        <PopupWindow setState={setState}>
          <DeleteConfirmation
            state={state}
            setState={setState}
            setUsers={setUsers}
            delId={delId}
            users={users}
          />
        </PopupWindow>
      ) : (
        ""
      )}
      {state.editUserPopupWindow ? (
        <PopupWindow setState={setState}>
          <EditUserForm
            editUserForm={editUserForm}
            setEditUserForm={setEditUserForm}
            state={state}
            setState={setState}
            setUsers={setUsers}
          />
        </PopupWindow>
      ) : (
        ""
      )}
      {state.addUserPopupWindow ? (
        <PopupWindow setState={setState}>
          <AddUserForm state={state} setState={setState} setUsers={setUsers} />
        </PopupWindow>
      ) : (
        ""
      )}
      <div className="mt-8  px-8 py-4 shadow-xl rounded-xl border-2 border-solid border-slate-300 flex items-center gap-4">
        <PersonSVG />
        <div>
          <h2 className="font-bold">{me.name}</h2>
          <h4>{me.email}</h4>
          <div className="flex justify-between">
            <h5 className="p1">{me.status}</h5>
            <h5 className="p1">{me.created_at && me.created_at.toString()}</h5>
          </div>
        </div>
      </div>
      <div className="flex gap-8">
        <SearchBar setUsers={setUsers} />
        <button
          className="mt-8  px-8 py-4 shadow-xl rounded-2xl  bg-slate-600 text-white flex items-center gap-4 p1"
          onClick={() => setState({ ...state, addUserPopupWindow: true })}
        >
          Add new user
        </button>
      </div>
      <div className="2xl:max-h-[560px] xl:max-h-[520px] lg:max-h-[480px] md:max-h-[440px] sm:max-h-[400px] max-h-[360px] overflow-y-scroll">
        {Array.isArray(users) &&
          users.map((user) => {
            return (
              <UserCard
                key={user.id}
                setEditUserForm={setEditUserForm}
                setState={setState}
                state={state}
                setUsers={setUsers}
                user={user}
                users={users}
                delId={delId}
                setDelId={setDelId}
              />
            );
          })}
      </div>
    </section>
  );
};

export default HomePage;
