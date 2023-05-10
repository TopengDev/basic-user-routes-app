import { useContext, type FC } from "react";
import FormCard from "../FormCard";
import { useRouter } from "next/router";
import { login } from "@/utils/api";
import { GlobalContext } from "@/GlobalState";

const LoginForm: FC = () => {
  const { state, setState } = useContext(GlobalContext);

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setState({
      ...state,
      authFormState: {
        ...state.authFormState,
        [field]: e.target.value,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const LoggedIn = await login(state.authFormState);
    console.log(LoggedIn);
    if (LoggedIn) {
      setState({ ...state, token: true });
      router.reload();
    }
  };

  return (
    <FormCard>
      <div className="flex flex-col justify-center">
        <h3 className="text-center  font-bold">Log in</h3>
        <form
          action=""
          className="flex flex-col gap-4 mt-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="login-email">Email</label>
            <input
              type="email"
              id="login-email"
              placeholder="christopher@email.com"
              className="input-style"
              onChange={(e) => handleChange(e, "email")}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="login-password">Password</label>
            <input
              type="password"
              id="login-password"
              placeholder="password"
              className="input-style"
              onChange={(e) => handleChange(e, "password")}
            />
          </div>
          <button
            type="submit"
            className="px-8 py-4 bg-slate-700 text-white w-full rounded-lg h4"
          >
            Log in
          </button>
        </form>
        <button
          className="mt-4 h4"
          onClick={() =>
            setState({
              ...state,
              authFormState: { ...state.authFormState, pOpt: 0 },
            })
          }
        >
          Register
        </button>
      </div>
    </FormCard>
  );
};

export default LoginForm;
