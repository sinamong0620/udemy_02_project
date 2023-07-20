import React, { useState, useEffect } from "react";

//context 객체 생성
//createContext는 기본 컨텍스트를 만듬. 빈 state의 컴포넌트 일 뿐!
//대부분의 경우에는 객체
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserloggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserloggedInInformation === "1") {
      setIsLoggedIn("true");
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
//특정 컨텍스트 객체를 내보낼 수 있다.
export default AuthContext;

//그런 다음 다른 컴포넌트에서 컨텍스트를 사용하려면 두가지 작업을 수행해야 한다.
//1. 먼저 공급한다, 기본적으로 리액트에 알려주는 것. -> hey~ 내 컨텍스트 여깃서횸 ㅋ~
//그것이 감싸는 모든 컴포넌트는 그것에 접근 권한이 있어야 한다.
//공급한다는 것은 ,JSX 코드로 감싸는 것을 뜻한다. 감싸지지 않은 컴포넌트는 리스닝할 수 없다.

//2. 소비해야한다.
//소비하려면 리스닝이 필요하다 두가지 방법으로 리스닝을 할 수 있다. AuthContext 소비자 또는 리액트 훅을 사용하여 리스닝 가능하다.
//일반적으론 리액트 훅을 이용한다. 하지만 다른 대안인 소비자도 할 수 있다.
