import { Inter } from "next/font/google";
import { NextPage } from "next";
import { setCookie, parseCookies, destroyCookie } from "nookies";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage = () => {
  const cookies = parseCookies();
  const accessToken = cookies.accessToken;

  return <main>{accessToken ? <HomePage /> : <AuthPage />}</main>;
};

export default Home;
