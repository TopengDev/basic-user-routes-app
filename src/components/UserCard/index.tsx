import type { FC, Dispatch, SetStateAction } from "react";
import { EditSVG, TrashSVG } from "../SVG";
import { IUser, IEditUserForm } from "@/interfaces";
import { deleteUserById } from "@/utils/api";

interface IProps {
  user: IUser;
  state: {
    addUserPopupWindow: boolean;
    editUserPopupWindow: boolean;
    deleteConfirmationPopup: boolean;
  };
  setState: Dispatch<
    SetStateAction<{
      addUserPopupWindow: boolean;
      editUserPopupWindow: boolean;
      deleteConfirmationPopup: boolean;
    }>
  >;
  setEditUserForm: Dispatch<SetStateAction<IEditUserForm>>;
  users: IUser[];
  setUsers: Dispatch<SetStateAction<IUser[]>>;
  delId: number;
  setDelId: Dispatch<SetStateAction<number>>;
}

const UserCard: FC<IProps> = ({
  user,
  state,
  setState,
  setEditUserForm,
  users,
  setUsers,
  setDelId,
  delId,
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
    setDelId(id);
    setState({ ...state, deleteConfirmationPopup: true });
  };
  const formatDate = () => {
    const date = new Date(user.born_date);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
  };
  const formattedInputDate = () => {
    let date = new Date(user.created_at);
    let day = date.getDate().toString().padStart(2, "0");
    let month = date.toLocaleString("default", { month: "long" });
    let year = date.getFullYear().toString().substr(-2);
    let hour = date.getHours().toString().padStart(2, "0");
    let minute = date.getMinutes().toString().padStart(2, "0");
    let second = date.getSeconds().toString().padStart(2, "0");

    let formattedDate = `${day} ${month} ${year}, ${hour} : ${minute} : ${second}`;
    return formattedDate;
  };
  return (
    <div
      id={user.id.toString()}
      className="px-8 py-4 my-6 rounded-xl border-2 border-slate-300 border-solid shadow-xl grid grid-cols-3 gap-24"
    >
      <div>
        <div className="p2">{user.name}</div>
        <div className="p2">
          Id:&nbsp;
          {user.id}
        </div>
        <div className="p2">
          Input date:&nbsp;
          {formattedInputDate()}
        </div>
      </div>
      <div>
        <div className="p2">
          Birthday:&nbsp;
          {formatDate()}
        </div>
        <div className="p2">
          Address:&nbsp;
          {user.address}
        </div>
        <div className="p2">
          Gender:&nbsp;
          {user.gender === "l" ? "Male" : "Female"}
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
