import { NavLink } from "react-router-dom";

export const Navigation = () => {
  const token = window.localStorage.getItem("token");

  return (
    <nav>
      <ul>
        {!token && (
          <li>
            <NavLink to="/sign-in">Sign In</NavLink>
          </li>
        )}
        <li>
          <NavLink to="/photos">Photos</NavLink>
        </li>
        {token && (
          <li>
            <NavLink to="/sign-out">Sign Out</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};
