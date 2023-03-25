import React, {useReducer} from "react";

const defaultValue = {
  isAuthenticated: false,
  inCart: [],
};

const UserStateContext = React.createContext(defaultValue);
UserStateContext.displayName = 'UserState';

function UserProvider({ children }) {
  const initialState = {
      isAuthenticated: !!localStorage.getItem("id_token"),
      inCart: [],
  };
  const [state, dispatch] = useReducer(userReducer, initialState, (arg)=> arg);

  return (
      <UserStateContext.Provider value={{...state, dispatch}}>
        {children}
      </UserStateContext.Provider>
  );
}

function userReducer(state, value) {
    console.log('...zv: userReducer:', state, value);
    return {...state, ...value};
}

export { UserProvider, loginUser, signOut, UserStateContext };

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  if (!!login && !!password) {
    setTimeout(() => {
      localStorage.setItem('id_token', 1);
      setError(null);
      setIsLoading(false);
      dispatch({ type: 'LOGIN_SUCCESS' });
      history.push('/app/dashboard');
    }, 2000);
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
