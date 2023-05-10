import {
  IUser,
  IEditUserForm,
  IMe,
  IAddUserForm,
  IPopups,
  IAuthForm,
} from "@/interfaces";

export type TGlobalState = {
  token: boolean;
  users: IUser[];
  addUserForm: IAddUserForm;
  editUserForm: IEditUserForm;
  me: IMe;
  popups: IPopups;
  delId: number;
  authFormState: IAuthForm;
  search: string;
};

export const state: TGlobalState = {
  token: false,
  users: [],
  addUserForm: {
    name: "",
    address: "",
    gender: "l",
    born_date: new Date(),
  },
  editUserForm: {
    id: -1,
    name: "",
    address: "",
    gender: "l",
    born_date: new Date(),
  },
  authFormState: {
    pOpt: 0,
    name: "",
    email: "",
    password: "",
  },
  me: { id: null, created_at: null, status: null, name: null, email: null },
  popups: {
    addUserPopupWindow: false,
    editUserPopupWindow: false,
    deleteConfirmationPopup: false,
  },
  delId: -1,
  search: "",
};
