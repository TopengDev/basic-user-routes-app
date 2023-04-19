import type { FC } from "react";

import IDefaultProps from "@/interfaces";

const FormCard: FC<IDefaultProps> = ({ children }) => {
  return <div className="px-12 py-12 shadow-xl rounded-xl bg-white">{children}</div>;
};

export default FormCard;
