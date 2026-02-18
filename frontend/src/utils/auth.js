import { toast } from "react-toastify";

export const getToken = () => localStorage.getItem("token");

export const logout = () => {
  localStorage.removeItem("token");
  toast.success("Logout Successfull");
  setTimeout(()=>{
    window.location.href = "/login"
  },1000);
};

export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;

  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.role;
};
