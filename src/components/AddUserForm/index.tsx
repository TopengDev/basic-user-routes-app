import { type FC, useState, type Dispatch, type SetStateAction } from "react";
import { IAddUserForm, IUser } from "@/interfaces";
import { addUser, getUsers } from "@/utils/api";
import FormCard from "../FormCard";

interface IProps {
  state: { addUserPopupWindow: boolean; editUserPopupWindow: boolean };
  setState: Dispatch<
    SetStateAction<{
      addUserPopupWindow: boolean;
      editUserPopupWindow: boolean;
    }>
  >;
  setUsers: Dispatch<SetStateAction<IUser[]>>;
}

const AddUserForm: FC<IProps> = ({ setState, setUsers, state }) => {
  const handleAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addUser(addUserForm);
    setState({ ...state, addUserPopupWindow: false });
    await getUsers().then((data) => setUsers(data.data));
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setAddUserForm({
      ...addUserForm,
      [field]: e.target.value,
    });
  };
  const [addUserForm, setAddUserForm] = useState<IAddUserForm>({
    name: "",
    address: "",
    gender: "l",
    born_date: new Date(),
  });
  return (
    <FormCard>
      <div className="flex flex-col justify-center">
        <h1 className="text-center text-2xl font-bold">Add new user</h1>
        <form
          action=""
          className="flex flex-col gap-4 mt-4"
          onSubmit={handleAddSubmit}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="adduser-name">Name</label>
            <input
              type="text"
              id="adduser-name"
              placeholder="christopher"
              className="input-style"
              onChange={(e) => handleChange(e, "name")}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="adduser-address">Address</label>
            <input
              type="text"
              id="adduser-address"
              placeholder="Jakarta, Greenlake Residence"
              className="input-style"
              onChange={(e) => handleChange(e, "address")}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="adduser-gender">gender</label>
            <input
              type="text"
              id="adduser-gender"
              placeholder="l / p"
              className="input-style"
              onChange={(e) => handleChange(e, "gender")}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="adduser-born-date">Born date</label>
            <input
              type="date"
              id="adduser-born-date"
              className="input-style"
              onChange={(e) => handleChange(e, "born_date")}
            />
          </div>
          <button
            type="submit"
            className="px-8 py-4 bg-slate-700 text-white w-full rounded-lg"
          >
            Add
          </button>
        </form>
      </div>
    </FormCard>
  );
};

export default AddUserForm;
