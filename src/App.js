import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  //useEffect는 재평가 후에 실행된다는 것이 매우 중요.
  //이 컴포넌트가 실행된 이후 그 다음에 useEffect 안에 있는 코드가 실행됨.
  //그리고 의존성이 변경된  경우에만 실행이 된다.

  //이 코드는 앱이 시작될 때 한 번만 실행이된다.
  //의존성 배열에 아무것도 없기 때문이다. 이 코드를 한번만 실행하고 싶을 때!!
  //데이터를 저장소(로컬스토리지)에서 가져오는 것은 사이드 이펙트이다. UI와 전혀 관련이 없기 때문이다!
  useEffect(() => {
    const storedUserloggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserloggedInInformation === "1") {
      setIsLoggedIn("true");
    }
  }, []);
  //다시 실행했을때 로그인된 것도 사라짐. 그렇기 때문에 어디에다가 저장해놓는 것이 좋겠음.
  //이 앱이 시작될때마다 데이터가 유지되었는 확인하자!-> 만약 그렇다면 자동로그인 -> useEffect로 구현가능.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways

    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedin");
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
