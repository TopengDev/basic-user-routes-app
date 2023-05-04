import type { FC, Dispatch, SetStateAction } from "react";
import FormCard from "../FormCard";
import { IEditUserForm, IUser } from "@/interfaces";

import { editUserById, getUsers } from "@/utils/api";

interface IProps {
  editUserForm: IEditUserForm;
  setEditUserForm: Dispatch<SetStateAction<IEditUserForm>>;
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
  setUsers: Dispatch<SetStateAction<IUser[]>>;
}

const EditUserForm: FC<IProps> = ({
  editUserForm,
  setEditUserForm,
  state,
  setState,
  setUsers,
}) => {
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await editUserById(editUserForm, editUserForm.id);
    await getUsers().then((data) => setUsers(data.data));
    setState({ ...state, editUserPopupWindow: false });
  };
  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setEditUserForm({
      ...editUserForm,
      [field]: e.target.value,
    });
  };
  return (
    <FormCard>
      <div className="flex flex-col justify-center">
        <h1 className="text-center text-2xl font-bold">Edit user</h1>
        <form
          action=""
          className="flex flex-col gap-4 mt-4"
          onSubmit={handleEditSubmit}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="edituser-name">Name</label>
            <input
              type="text"
              id="edituser-name"
              placeholder="christopher"
              className="input-style"
              onChange={(e) => handleEditChange(e, "name")}
              value={editUserForm.name}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="edituser-address">Address</label>
            <input
              type="text"
              id="edituser-address"
              placeholder="Jakarta, Greenlake Residence"
              className="input-style"
              onChange={(e) => handleEditChange(e, "address")}
              value={editUserForm.address}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="edituser-gender">gender</label>
            <input
              type="text"
              id="edituser-gender"
              placeholder="l / p"
              className="input-style"
              onChange={(e) => handleEditChange(e, "gender")}
              value={editUserForm.gender}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="edituser-born-date">Born date</label>
            <input
              type="date"
              id="edituser-born-date"
              className="input-style"
              onChange={(e) => handleEditChange(e, "born_date")}
              value={editUserForm.born_date.toString()}
            />
          </div>
          <button
            type="submit"
            className="px-8 py-4 bg-slate-700 text-white w-full rounded-lg"
          >
            Edit
          </button>
        </form>
      </div>
    </FormCard>
  );
};

export default EditUserForm;
