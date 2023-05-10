import { type FC, useContext } from "react";
import { addUser, getUsers } from "@/utils/api";
import FormCard from "../FormCard";
import { GlobalContext } from "@/GlobalState";

const AddUserForm: FC = () => {
  const { state, setState } = useContext(GlobalContext);

  const handleAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addUser(state.addUserForm);
    const users = await getUsers();
    setState({
      ...state,
      popups: {
        ...state.popups,
        addUserPopupWindow: false,
      },
      users: users.data,
    });
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setState({
      ...state,
      addUserForm: {
        ...state.addUserForm,
        [field]: e.target.value,
      },
    });
  };

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
            <div>
              <label htmlFor="adduser-gender">Gender</label>
              <div className="pt-2">
                <label className="pr-4" htmlFor="">
                  <input
                    type="radio"
                    name="gender"
                    value="l"
                    onChange={(e) => handleChange(e, "gender")}
                  />
                  Male
                </label>
                <label className="pr-4">
                  <input
                    type="radio"
                    name="gender"
                    value="p"
                    onChange={(e) => handleChange(e, "gender")}
                  />
                  Female
                </label>
              </div>
            </div>
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
