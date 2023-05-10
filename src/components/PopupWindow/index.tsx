import { FC, useContext } from "react";
import { CloseSVG } from "../SVG";
import { GlobalContext } from "@/GlobalState";
import IDefaultProps from "@/interfaces";

const PopupWindow: FC<IDefaultProps> = ({ children }) => {
  const { state, setState } = useContext(GlobalContext);

  return (
    <div className="absolute top-0 left-0 bg-slate-600 bg-opacity-80 flex flex-col items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-end">
        <button
          className="mb-2"
          onClick={() => {
            setState({
              ...state,
              popups: {
                addUserPopupWindow: false,
                editUserPopupWindow: false,
                deleteConfirmationPopup: false,
              },
            });
          }}
        >
          <CloseSVG />
        </button>
        {children}
      </div>
    </div>
  );
};

export default PopupWindow;
