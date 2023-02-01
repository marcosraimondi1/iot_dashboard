//If the user has a token, we send it to index
//Si el usuario tiene token lo enviamos a index
import { useEffect } from "react";
import { store } from "../store/store";
export default function notAuthenticated(WrappedComponent) {
  // store.dispatch('readToken');
  // if (store.state.auth) {
  //     return redirect('/dashboard')
  // }
  const token = store.getState().auth.token;
  return (props) => {
    useEffect(() => {
      if (token) document.location.href = "/dashboard";
    }, [token]);

    return <WrappedComponent {...props} />;
  };
}
