//If the user has a token, we send it to index
//Si el usuario tiene token lo enviamos a index
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function notAuthenticated(WrappedComponent) {
  // store.dispatch('readToken');
  // if (store.state.auth) {
  //     return redirect('/dashboard')
  // }
  const router = useRouter();
  return (props) => {
    return <WrappedComponent {...props} />;
    props.authenticated = true;
    useEffect(() => {
      if (props.authenticated) {
        router.push("/dashboard");
      }
    }, [props.authenticated]);
  };
}
