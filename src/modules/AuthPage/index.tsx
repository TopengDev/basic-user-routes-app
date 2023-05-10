import { type FC, useContext } from "react";
import { RegisForm, LoginForm } from "@/components";
import { GlobalContext } from "@/GlobalState";

const AuthPage: FC = () => {
  const { state } = useContext(GlobalContext);

  return (
    <div className="centered-layout">
      {state.authFormState.pOpt == 0 ? <RegisForm /> : <LoginForm />}
    </div>
  );
};

export default AuthPage;
