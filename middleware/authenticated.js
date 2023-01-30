import { useEffect } from "react";
import { useRouter } from "next/navigation";
//If the user does not have a token, we send it to login
//si el usuario no tiene token lo enviamos a login
export default function authenticated(WrappedComponent) {
  // store.dispatch("readToken");
  // if (!store.state.auth) {
  //   return redirect("/login");

  // }
  const router = useRouter();
  return (props) => {
    return <WrappedComponent {...props} />;
    props.authenticated = true;
    useEffect(() => {
      if (!props.authenticated) {
        router.push("/auth/login");
      }
    }, [props.authenticated]);
  };
}
