import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { NotFoundPage } from "./pages/NotFound";
import { PhotosPage } from "./pages/Photos";
import { SignInPage } from "./pages/SignIn";
import { SignOutPage } from "./pages/SignOut";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute path="/photos" component={PhotosPage} />
      <Route path="/sign-in" component={SignInPage} />
      <Route path="/sign-out" component={SignOutPage} />
      <Route
        path="/"
        component={(props) => (
          <Redirect
            to={{
              ...props.location,
              pathname: "/sign-in",
            }}
            {...props}
          />
        )}
      />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);
