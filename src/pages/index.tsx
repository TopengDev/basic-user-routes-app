import { NextPage } from "next";

import { HomePage, AuthPage } from "@/modules";
import { parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/GlobalState";
import { getMe, getUsers } from "@/utils/api";

const Home: NextPage = () => {
  const router = useRouter();
  const { state, setState } = useContext(GlobalContext);

  const [tokenInCookie, setTokenInCookie] = useState(false);

  useEffect(() => {
    if (parseCookies().accessToken) setTokenInCookie(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const me = await getMe();
      const users = await getUsers();
      if (me) {
        const resData = me;
        const { id, created_at, status, name, email } = resData;
        setState({
          ...state,
          me: { id, created_at, status, email, name },
          token: true,
          users: users.data,
        });
      }
      console.log("RANRANRAN");
    };

    if (tokenInCookie) {
      fetchData();
    }
  }, [tokenInCookie]);

  const deleteToken = () => {
    destroyCookie(null, "accessToken");
    router.reload();
  };

  return (
    <main>
      {tokenInCookie ? (
        <div>
          <HomePage />
          <div className="w-full flex justify-center">
            <button
              onClick={deleteToken}
              className="bg-red-400 text-white rounded-xl px-6 py-2 h4"
            >
              LOGOUT
            </button>
          </div>
        </div>
      ) : (
        <AuthPage />
        // <div />
      )}
    </main>
  );
};

export default Home;
