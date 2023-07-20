import React, { useContext } from "react";

import classes from "./Navigation.module.css";
import AuthContext from "../../context/auth-context";

const Navigation = (props) => {
  //AuthContext를 가리킨다.
  //이..이게 더 엘레강트하다....
  const ctx = useContext(AuthContext);

  //consumer은 자식을 가진다. 인수로 context 데이터를 가져온다. 따라서 이 경우 객체를 얻게 되는 것이다.
  //또다른 방법은 훅을 이용하는 방법이다.
  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
