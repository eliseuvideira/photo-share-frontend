import { useEffect } from "react";
import { Redirect } from "react-router";

export const SignOutPage = () => {
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  return <Redirect to={"/sign-in"} />;
};
