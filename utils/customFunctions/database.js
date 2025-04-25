import axios from "axios";

export const registerUser = async (fullName, email, password) => {
  let response;
  // console.log("Hi");
  try {
    response = await axios.post("http://192.168.212.20:8080/auth/sign-up", {
      // response = await axios.post("http://localhost:8080/auth/sign-up", {
      fullName: fullName,
      email: email,
      password: password,
    });

    if (!response.ok) {
      console.log(response.status);
    }

    return response;
  } catch (error) {
    // console.log(error.response.data.errors[0].message);
    // console.log(error.response.data);
    return error.response;
  }
};
