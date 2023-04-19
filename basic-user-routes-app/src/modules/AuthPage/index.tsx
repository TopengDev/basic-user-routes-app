import { type FC, useState } from "react";
import { RegisForm, LoginForm } from "@/components";
import { IFormState } from "@/interfaces";

const AuthPage: FC = () => {
  const [formState, setFormState] = useState<IFormState>({
    pOpt: 0,
    name: "",
    email: "",
    password: "",
  });

  return (
    <main className="centered-layout">
      {formState.pOpt == 0 ? (
        <RegisForm formState={formState} setFormState={setFormState} />
      ) : (
        <LoginForm formState={formState} setFormState={setFormState} />
      )}
    </main>
  );
};

export default AuthPage;
