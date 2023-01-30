import { useEffect } from "react";

//If the user does not have a token, we send it to login
//si el usuario no tiene token lo enviamos a login
export default function authenticated(WrappedComponent) {
  // store.dispatch("readToken");
  // if (!store.state.auth) {
  //   return redirect("/login");

  // }
  return (props) => {
    return <WrappedComponent {...props} />;
    props.authenticated = true;
    useEffect(() => {
      if (!props.authenticated) {
        document.location.href = "/auth/login";
      }
    }, [props.authenticated]);
  };
}
