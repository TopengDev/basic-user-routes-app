import { type FC, useContext } from "react";
import { PersonSVG } from "@/components/SVG";
import {
  PopupWindow,
  EditUserForm,
  AddUserForm,
  UserCard,
  SearchBar,
} from "@/components";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import { GlobalContext } from "@/GlobalState";

const HomePage: FC = () => {
  const { state, setState } = useContext(GlobalContext);

  return (
    <section className="flex justify-center items-center flex-col p-8">
      {state.popups.deleteConfirmationPopup && (
        <PopupWindow>
          <DeleteConfirmation />
        </PopupWindow>
      )}
      {state.popups.editUserPopupWindow && (
        <PopupWindow>
          <EditUserForm />
        </PopupWindow>
      )}
      {state.popups.addUserPopupWindow && (
        <PopupWindow>
          <AddUserForm />
        </PopupWindow>
      )}
      <div className="mt-8  px-8 py-4 shadow-xl rounded-xl border-2 border-solid border-slate-300 flex items-center gap-4">
        <PersonSVG />
        <div>
          <h2 className="font-bold">{state.me.name}</h2>
          <h4>{state.me.email}</h4>
          <div className="flex justify-between">
            <h5 className="p1">{state.me.status}</h5>
            <h5 className="p1">
              {state.me.created_at && state.me.created_at.toString()}
            </h5>
          </div>
        </div>
      </div>
      <div className="flex gap-8">
        <SearchBar />
        <button
          className="mt-8  px-8 py-4 shadow-xl rounded-2xl  bg-slate-600 text-white flex items-center gap-4 p1"
          onClick={() =>
            setState({
              ...state,
              popups: {
                ...state.popups,
                addUserPopupWindow: true,
              },
            })
          }
        >
          Add new user
        </button>
      </div>
      <div className="2xl:max-h-[560px] xl:max-h-[520px] lg:max-h-[480px] md:max-h-[440px] sm:max-h-[400px] max-h-[360px] overflow-y-scroll">
        {state.users.map((user) => {
          return user.id && <UserCard key={user.id} user={user} />;
        })}
      </div>
    </section>
  );
};

export default HomePage;
