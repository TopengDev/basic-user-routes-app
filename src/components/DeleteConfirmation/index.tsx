import { type FC, useState, type Dispatch, type SetStateAction } from "react";
import IDefaultProps, { IUser } from "@/interfaces";
import { addUser, deleteUserById, getUsers } from "@/utils/api";
import FormCard from "../FormCard";

interface IProps extends IDefaultProps {
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
  setUsers: Dispatch<SetStateAction<IUser[]>>;
  delId: number;
  users: IUser[];
}

const DeleteConfirmation: FC<IProps> = ({
  delId,
  setState,
  state,
  users,
  setUsers,
}) => {
  const deleteById = async () => {
    await deleteUserById(delId);
    setState({ ...state, deleteConfirmationPopup: false });
    const tmpUsers = users.filter((user) => user.id != delId);
    setUsers(tmpUsers);
  };

  return (
    <FormCard>
      <h1 className="text-center text-2xl font-bold">Are you sure?</h1>
      <div className="flex justify-around mt-4">
        <button
          className="px-4 py-2 bg-red-400 rounded-xl text-white"
          onClick={() => deleteById()}
        >
          Delete
        </button>
      </div>
    </FormCard>
  );
};

export default DeleteConfirmation;
