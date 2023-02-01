import { useEffect } from "react";
import { store } from "../store/store";

//If the user does not have a token, we send it to login
//si el usuario no tiene token lo enviamos a login
export default function authenticated(WrappedComponent) {
  const token = store.getState().auth.token;
  return (props) => {
    useEffect(() => {
      if (!token) document.location.href = "/auth/login";
    }, [token]);
    return <WrappedComponent {...props} />;
  };
}
