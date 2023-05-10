import {
  type FC,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
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
