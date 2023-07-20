import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../context/auth-context";

//emailReducer 함수는 컴포넌트 함수 내부에서 만들어진 어떤 데이터도 필요하지 않기 때문이다. 따라서 이 리듀서 함수는 컴포넌트 함수의 범위 밖에서 만들어 질 수 있다.
//값과 유효성을 하나의 state로 결합하여 useReducer로 관리하는 것.
const emailReducer = (state, action) => {
  console.log(state);
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  console.log(state);
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};
const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  //useReducer 함수의 첫번째 인자는 함수를 취한다.
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: undefined,
  });

  const authCtx = useContext(AuthContext);

  //객체 디스트럭처링 => 객체의 특정 속성을 추출하는 것
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  //이 useEffect는 다른 state를 기준으로 state를 업데이트하는 괜찮은 방법이다. 왜냐면 useEffect가 있으니까 이것은 반드시 실행될 것이다.
  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log("클린업 함수");
      clearTimeout(identifier);
    }; //이것은 클린업 프로세스이다. 실행되기 전에 이 클린업 함수가 실행이 된다. 처음 실행되는 때를 제외하고. 그리고 컴포넌트가 제거되기 전에 실행된다.
    //첫번째 사이드이펙트 함수가 실행되기 전에는 실행되지 않는다.
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
    // setEmailIsValid(emailState.isValid);
    //다른 state값으로 state값을 설정해서는 안되는 일이다.
    //이런 경우에는 하나의 state로 병합하는 것도 좋다.
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
