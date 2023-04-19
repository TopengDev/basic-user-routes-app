import { setCookie, parseCookies } from "nookies";

import { IAddUserForm, IFormState } from "@/interfaces";

const getToken = () => {
  const token = parseCookies().accessToken;

  if (token) return token;
  else return null;
};

export const getMe = async () => {
  const token = getToken();

  if (!token) {
    console.error("ERROR: Invalid Access Token");
    return;
  }

  const apiUrl = "https://cms-admin-v2.ihsansolusi.co.id/testapi/auth/me";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const res = await fetch(apiUrl, { headers });

    if (res.ok) {
      const resData = await res.json();
      return resData;
    } else {
      console.error(`ERROR: ${res.status} ${res.statusText}`);
      return;
    }
  } catch (err) {
    console.error("ERROR: ", err);
    return;
  }
};

export const register = async (formState: IFormState) => {
  const { name, email, password } = formState;
  const body = JSON.stringify({
    name,
    email,
    password,
  });
  const apiUrl = "https://cms-admin-v2.ihsansolusi.co.id/testapi/auth/register";
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const res = await fetch(apiUrl, { headers, method: "POST", body });

    if (res.ok) {
      const resData = await res.json();
      setCookie(null, "accessToken", resData.token, {
        maxAge: 3600,
        path: "/",
        sameSite: "None",
        secure: true,
      });
      return resData;
    } else {
      console.error(`ERROR: ${res.status} ${res.statusText}`);
      return;
    }
  } catch (err) {
    console.error("ERROR: ", err);
    return;
  }
};

export const login = async (formState: IFormState) => {
  const { email, password } = formState;
  const body = JSON.stringify({ email, password });
  const apiUrl = "https://cms-admin-v2.ihsansolusi.co.id/testapi/auth/login";
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const res = await fetch(apiUrl, { headers, body, method: "POST" });

    if (res.ok) {
      const resData = await res.json();

      setCookie(null, "accessToken", resData.token, {
        maxAge: 3600,
        path: "/",
        sameSite: "None",
        secure: true,
      });
      return resData;
    } else {
      console.error(`ERROR: ${res.status} ${res.statusText}`);
      return;
    }
  } catch (err) {
    console.error("ERROR: ", err);
    return;
  }
};

export const addUser = async (addUserForm: IAddUserForm) => {
  const token = getToken();
  const { name, address, gender, born_date } = addUserForm;
  const body = JSON.stringify({ name, address, gender, born_date });
  const apiUrl = "https://cms-admin-v2.ihsansolusi.co.id/testapi/user";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  if (!token) {
    console.error("Invalid Access Token");
    return;
  }

  try {
    const res = await fetch(apiUrl, { headers, body, method: "POST" });

    if (res.ok) {
      const resData = await res.json();
      return resData;
    } else {
      console.error(`ERROR: ${res.status} ${res.statusText}`);
      return;
    }
  } catch (err) {
    console.error("ERROR: ", err);
    return;
  }
};

export const getUsers = async () => {
  const token = getToken();
  const apiUrl = "https://cms-admin-v2.ihsansolusi.co.id/testapi/user";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  if (!token) {
    console.error("Invalid Access Token");
    return;
  }

  try {
    const res = await fetch(apiUrl, { headers });

    if (res.ok) {
      const resData = await res.json();
      return resData;
    } else {
      console.error(`ERROR: ${res.status} ${res.statusText}`);
      return;
    }
  } catch (err) {
    console.error("ERROR: ", err);
    return;
  }
};

export const getUserById = async (id: number) => {
  const token = getToken();
  const apiUrl = `https://cms-admin-v2.ihsansolusi.co.id/testapi/user/${id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  if (!token) {
    console.error("Invalid Access Token");
    return;
  }

  try {
    const res = await fetch(apiUrl, { headers });
    if (res.ok) {
      const resData = await res.json();
      return resData;
    } else {
      console.error(`ERROR: ${res.status} ${res.statusText}`);
      return;
    }
  } catch (err) {
    console.error("ERROR: ", err);
    return;
  }
};

export const editUserById = async (editUserForm: IAddUserForm, id: number) => {
  const token = getToken();
  const { name, address, gender, born_date } = editUserForm;
  const apiUrl = `https://cms-admin-v2.ihsansolusi.co.id/testapi/user/${id}`;
  const body = JSON.stringify({ name, address, gender, born_date });
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  if (!token) {
    console.error("Invalid Access Token");
    return;
  }

  try {
    const res = await fetch(apiUrl, { headers, body, method: "PUT" });
    if (res.ok) {
      const resData = await res.json();
      return resData;
    } else {
      console.error(`ERROR: ${res.status} ${res.statusText}`);
      return;
    }
  } catch (err) {
    console.error("ERROR: ", err);
    return;
  }
};

export const deleteUserById = async (id: number) => {
  const token = getToken();
  const apiUrl = `https://cms-admin-v2.ihsansolusi.co.id/testapi/user/${id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  if (!token) {
    console.error("Invalid Access Token");
    return;
  }

  try {
    const res = await fetch(apiUrl, { headers, method: "DELETE" });
    if (res.ok) {
      const resData = await res.json();
      return resData;
    } else {
      console.error(`ERROR: ${res.status} ${res.statusText}`);
      return;
    }
  } catch (err) {
    console.error("ERROR: ", err);
    return;
  }
};
