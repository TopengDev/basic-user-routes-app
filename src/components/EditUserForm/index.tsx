import { FC, useContext } from "react";
import FormCard from "../FormCard";

import { editUserById, getUsers } from "@/utils/api";
import { GlobalContext } from "@/GlobalState";

const EditUserForm: FC = () => {
  const { state, setState } = useContext(GlobalContext);
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await editUserById(state.editUserForm, state.editUserForm.id);
    const users = await getUsers();
    setState({
      ...state,
      users: users.data,
      popups: { ...state.popups, editUserPopupWindow: false },
    });
  };
  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setState({
      ...state,
      editUserForm: {
        ...state.editUserForm,
        [field]: e.target.value,
      },
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
              value={state.editUserForm.name}
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
              value={state.editUserForm.address}
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
              value={state.editUserForm.gender}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="edituser-born-date">Born date</label>
            <input
              type="date"
              id="edituser-born-date"
              className="input-style"
              onChange={(e) => handleEditChange(e, "born_date")}
              value={state.editUserForm.born_date.toString()}
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
