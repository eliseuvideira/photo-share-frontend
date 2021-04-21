import { getApolloContext, gql } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router";
import { Page } from "../components/Page";

const auth = async (client, setRedirect, location) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    setRedirect(true);
  }

  const params = new URLSearchParams(location.search || "");
  const code = params.get("code");
  if (code) {
    const { data } = await client.mutate({
      mutation: gql`
        mutation($code: String!) {
          githubAuth(code: $code) {
            token
            user {
              userId
              name
              avatar
            }
          }
        }
      `,
      variables: {
        code,
      },
    });

    const { token, user } = data.githubAuth;

    window.localStorage.setItem("token", token);
    window.localStorage.setItem("user", JSON.stringify(user));

    setRedirect(true);
  }
};

export const SignInPage = () => {
  const [redirect, setRedirect] = useState(false);
  const location = useLocation();
  const redirectTo = location.state?.from;

  const { client } = useContext(getApolloContext());

  useEffect(() => {
    auth(client, setRedirect, location);
  }, [location, client]);

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
