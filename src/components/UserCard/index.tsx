import type { FC, Dispatch, SetStateAction } from "react";
import { EditSVG, TrashSVG } from "../SVG";
import { IUser, IEditUserForm } from "@/interfaces";
import { deleteUserById } from "@/utils/api";

interface IProps {
  user: IUser;
  state: {
    addUserPopupWindow: boolean;
    editUserPopupWindow: boolean;
  };
  setState: Dispatch<
    SetStateAction<{
      addUserPopupWindow: boolean;
      editUserPopupWindow: boolean;
    }>
  >;
  setEditUserForm: Dispatch<SetStateAction<IEditUserForm>>;
  users: IUser[];
  setUsers: Dispatch<SetStateAction<IUser[]>>;
}

const UserCard: FC<IProps> = ({
  user,
  state,
  setState,
  setEditUserForm,
  users,
  setUsers,
}) => {
  const handleEdit = async (user: IEditUserForm) => {
    setEditUserForm({
      id: user.id,
      name: user.name,
      address: user.address,
      gender: user.gender,
      born_date: user.born_date,
    });
    setState({ ...state, editUserPopupWindow: true });
  };
  const handleDelete = async (id: number) => {
    await deleteUserById(id);
    const tmpUsers = users.filter((user) => user.id != id);
    setUsers(tmpUsers);
  };
  return (
    <div
      id={user.id.toString()}
      className="px-8 py-4 my-6 rounded-xl border-2 border-slate-300 border-solid shadow-xl grid grid-cols-3 gap-24"
    >
      <div>
        <div className="p2">{user.name}</div>
        <div className="p2">
          id:&nbsp;
          {user.id}
        </div>
      </div>
      <div>
        <div className="p2">
          birthday:&nbsp;
          {user.born_date.toString()}
        </div>
        <div className="p2">
          address:&nbsp;
          {user.address}
        </div>
      </div>
      <div className="flex items-center justify-center gap-4">
        <button onClick={() => handleEdit(user)}>
          <EditSVG />{" "}
        </button>
        <button onClick={() => handleDelete(user.id)}>
          <TrashSVG />
        </button>
      </div>
    </div>
  );
};

export default UserCard;
