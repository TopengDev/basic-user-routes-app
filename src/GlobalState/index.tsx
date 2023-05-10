import {
  type FC,
  useState,
  useEffect,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { getMe, getUsers } from "@/utils/api";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import { state, TGlobalState } from "./state";
import IDefaultProps from "@/interfaces";

type TGlobalContext = {
  state: TGlobalState;
  setState: Dispatch<SetStateAction<TGlobalState>>;
};

export const GlobalContext = createContext<TGlobalContext>({
  state: state,
  setState: () => {},
});

const GlobalState: FC<IDefaultProps> = ({ children }) => {
  const router = useRouter();

  const [globalState, setGlobalState] = useState<TGlobalState>(state);

  return (
    <GlobalContext.Provider
      value={{ state: globalState, setState: setGlobalState }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
