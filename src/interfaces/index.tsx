import { ReactNode } from "react";

interface IDefaultProps {
  children?: ReactNode;
}

export default IDefaultProps;

export interface IUser {
  gender: "l" | "p";
  id: number;
  file: string;
  born_date: Date;
  user_id: number;
  address: string;
  name: string;
  photo: string;
  created_at: Date;
  user_name: string;
}

export interface IAddUserForm {
  name: string;
  address: string;
  gender: "l" | "p";
  born_date: Date;
}

export interface IEditUserForm extends IAddUserForm {
  id: number;
}

export interface IMe {
  id: number | null;
  created_at: Date | null;
  status: string | null;
  name: string | null;
  email: string | null;
}

export interface IPopups {
  addUserPopupWindow: boolean;
  editUserPopupWindow: boolean;
  deleteConfirmationPopup: boolean;
}

export interface IAuthForm {
  pOpt: 0 | 1;
  name: string;
  email: string;
  password: string;
}
