import { NextPage } from "next";
import { parseCookies, destroyCookie } from "nookies";
import { useState, useEffect } from "react";

import { HomePage, AuthPage } from "@/modules";

const Home: NextPage = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(parseCookies().accessToken);
  }, []);

  const deleteToken = () => {
    destroyCookie(null, "accessToken");
    setToken("");
  };

  return (
    <main>
      <div>
        {token ? (
          <div>
            <HomePage setToken={setToken} />
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
        )}
      </div>
    </main>
  );
};

export default Home;
