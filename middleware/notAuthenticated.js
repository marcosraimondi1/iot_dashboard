//If the user has a token, we send it to index
//Si el usuario tiene token lo enviamos a index
import { useEffect } from "react";
export default function notAuthenticated(WrappedComponent) {
  // store.dispatch('readToken');
  // if (store.state.auth) {
  //     return redirect('/dashboard')
  // }
  return (props) => {
    return <WrappedComponent {...props} />;
    props.authenticated = true;
    useEffect(() => {
      if (props.authenticated) {
        document.location.href = "/dashboard";
      }
    }, [props.authenticated]);
  };
}
