import { Analytics } from "@vercel/analytics/react";
import { useEffect } from "react";

import { Home } from "./components/home";

import { getServerSideConfig } from "./config/server";
// @ts-ignore
import cookie from "react-cookies";

const serverConfig = getServerSideConfig();

export default async function App() {
  useEffect(() => {
    fetch(
      "/phpApi/checkuserstatus.php?rid=" +
        new Date().getTime() +
        "&userrndstr=" +
        cookie.load("userrndstr"),
    );
  }, []);
  return (
    <>
      <Home />
      {serverConfig?.isVercel && <Analytics />}
    </>
  );
}
