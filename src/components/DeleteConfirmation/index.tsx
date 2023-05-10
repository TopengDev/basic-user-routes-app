import { type FC, useContext } from "react";
import { deleteUserById, getUsers } from "@/utils/api";
import FormCard from "../FormCard";
import { GlobalContext } from "@/GlobalState";

const DeleteConfirmation: FC = () => {
  const { state, setState } = useContext(GlobalContext);

  const deleteById = async () => {
    await deleteUserById(state.delId);
    const users = await getUsers();
    setState({
      ...state,
      users: users.data,
      popups: {
        ...state.popups,
        deleteConfirmationPopup: false,
      },
    });
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
