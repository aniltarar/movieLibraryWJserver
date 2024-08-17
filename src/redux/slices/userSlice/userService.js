import axios from "axios";

export const registerUserService = async (registerUser) => {
  const response = await axios.post(
    "http://localhost:3000/users",
    registerUser
  );
  return response.data;
};

export const loginUserService = async (loginUser) => {
    const response = await axios.get("http://localhost:3000/users")
    const user = response.data.find ( (user)=> user.username == loginUser.username && user.password == loginUser.password);
    if(user) {
        return user;
    }
    if(!user){
        throw new Error("Kullanıcı adı veya şifre hatalı")
    }
}
