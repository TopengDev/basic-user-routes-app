import { FC, useContext } from "react";
import { FormCard } from "../../components";
import { register } from "@/utils/api";
import { useRouter } from "next/router";
import { GlobalContext } from "@/GlobalState";

const RegisForm: FC = () => {
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
    const registered = await register(state.authFormState);
    if (registered) {
      setState({ ...state, token: true });
      router.reload();
    }
  };

  return (
    <FormCard>
      <div className="flex flex-col justify-center">
        <h3 className="text-center font-bold">Register new account</h3>
        <form
          action=""
          className="flex flex-col gap-4 mt-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="register-name">Name</label>
            <input
              type="text"
              id="register-name"
              placeholder="Christopher"
              className="input-style"
              onChange={(e) => handleChange(e, "name")}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="register-email">Email</label>
            <input
              type="email"
              id="register-email"
              placeholder="christopher@email.com"
              className="input-style"
              onChange={(e) => handleChange(e, "email")}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="register-password">Password</label>
            <input
              type="password"
              id="register-password"
              placeholder="password"
              className="input-style"
              onChange={(e) => handleChange(e, "password")}
            />
          </div>
          <button
            type="submit"
            className="px-8 py-4 bg-slate-700 text-white w-full rounded-lg h4"
          >
            Register
          </button>
        </form>
        <button
          className="mt-4 h4"
          onClick={() =>
            setState({
              ...state,
              authFormState: { ...state.authFormState, pOpt: 1 },
            })
          }
        >
          Log in
        </button>
      </div>
    </FormCard>
  );
};

export default RegisForm;
