"use client";
import axios from "axios";
import SignUp from "../../Components/SignUp/SignUp";
import notAuthenticated from "middleware/notAuthenticated";

export default notAuthenticated(function Register() {
  const onRegister = (user) => {
    console.table(user);
    register(user);
  };
  return <SignUp submit={onRegister} loginLink="/auth/login" />;
});

const register = (user) => {
  axios
    .post("/register", user)
    .then((res) => {
      //success! - Usuario creado.
      if (res.data.status == "success") {
        // this.$notify({
        //   type: "success",
        //   icon: "tim-icons icon-check-2",
        //   message: "Success! Now you can login...",
        // });
        console.log("success");
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
        console.log("error");

        return;
      }
    });
};
