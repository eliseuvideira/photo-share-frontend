import { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router";
import { Page } from "../components/Page";

export const SignInPage = () => {
  const [redirect, setRedirect] = useState(false);
  const location = useLocation();
  const redirectTo = location.state?.from;

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setRedirect(true);
    }

    const params = new URLSearchParams(location.search || "");
    const code = params.get("code");
    if (code) {
      window.localStorage.setItem("token", code);
      setRedirect(true);
    }
  }, [location]);

  return redirect ? (
    <Redirect to={redirectTo || "/photos"} />
  ) : (
    <Page>
      <p>Sign In Page</p>
      <button
        onClick={() => {
          window.location.assign(
            `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&scope=user`
          );
        }}
      >
        Sign In
      </button>
    </Page>
  );
};
