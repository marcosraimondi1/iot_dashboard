"use client";
import SignIn from "../../Components/SignIn/SignIn";
import notAuthenticated from "middleware/notAuthenticated";
import axios from "axios";
import { useRouter } from "next/navigation";

export default notAuthenticated(function Login() {
  const router = useRouter();

  const login = (user) => {
    axios
      .post("/login", user)
      .then((res) => {
        //success! - Usuario creado.
        if (res.data.status == "success") {
          // this.$notify({
          //   type: "success",
          //   icon: "tim-icons icon-check-2",
          //   message: "Success! Welcome " + res.data.userData.name,
          // });

          const auth = {
            token: res.data.token,
            userData: res.data.userData,
          };

          //token to de store - token a la tienda
          // this.$store.commit("setAuth", auth);

          //set auth object in localStorage - Grabamos el token en localStorage
          localStorage.setItem("auth", JSON.stringify(auth));

          router.push("/dashboard");

          return;
        }
      })
      .catch((e) => {
        console.log(e.response.data);

        if (e.response.data.error.errors.email.kind == "unique") {
          // this.$notify({
          //   type: "danger",
          //   icon: "tim-icons icon-alert-circle-exc",
          //   message: "User already exists :(",
          // });

          return;
        } else {
          // this.$notify({
          //   type: "danger",
          //   icon: "tim-icons icon-alert-circle-exc",
          //   message: "Error creating user...",
          // });
          console.log("ERROR!");
          return;
        }
      });
  };

  const onLogin = (user) => {
    console.table(user);
    login(user);
  };

  return <SignIn submit={onLogin} registerLink="/auth/register" />;
});

// const Cookie = process.client ? require("js-cookie") : undefined;
