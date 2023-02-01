import axios from "axios";
export const login = async (user) => {
  // login to api
  try {
    const res = await axios.post("/login", user);
    if (res.data.status == "success") {
      //success! - Usuario creado.
      //token to de store - token a la tienda
      const auth = {
        token: res.data.token,
        userData: res.data.userData,
      };

      //set auth object in localStorage - Grabamos el token en localStorage
      localStorage.setItem("auth", JSON.stringify(auth));

      return auth;
    }
    console.log("error logging in");
    return false;
  } catch (e) {
    console.log(e.response.data);

    console.log("ERROR!");
    return false;
  }
};

export const register = async (user) => {
  try {
    const res = axios.post("/register", user);

    //success! - Usuario creado.
    if (res.data.status == "success") {
      console.log("success");
      return true;
    }
  } catch (e) {
    console.log(e.response.data);

    if (e.response.data.error.errors.email.kind == "unique") {
      console.log("User already exists :(");

      return false;
    }
    console.log("error registering");

    return false;
  }
  return false;
};
