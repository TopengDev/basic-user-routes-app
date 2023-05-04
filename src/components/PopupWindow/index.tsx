import type { FC } from "react";
import type IDefaultProps from "@/interfaces";
import { CloseSVG } from "../SVG";
import type { Dispatch, SetStateAction } from "react";

interface IProps extends IDefaultProps {
  setState: Dispatch<
    SetStateAction<{
      addUserPopupWindow: boolean;
      editUserPopupWindow: boolean;
    }>
  >;
}

const PopupWindow: FC<IProps> = ({ setState, children }) => {
  return (
    <div className="absolute top-0 left-0 bg-slate-600 bg-opacity-80 flex flex-col items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-end">
        <button
          className="mb-2"
          onClick={() => {
            setState({ addUserPopupWindow: false, editUserPopupWindow: false });
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
