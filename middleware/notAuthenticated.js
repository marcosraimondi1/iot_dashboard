//If the user has a token, we send it to index
//Si el usuario tiene token lo enviamos a index
import { useEffect } from "react";
import { store } from "../store/store";

export default function notAuthenticated(WrappedComponent) {
  const token = store.getState().auth.token;
  const Wrapped = (props) => {
    useEffect(() => {
      if (token) document.location.href = "/dashboard";
    }, []);

    return <WrappedComponent {...props} />;
  };
  return Wrapped;
}
