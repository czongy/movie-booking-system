import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { axiosConfig } from "../axios.config";
import UserContext from "../context/UserContext";

export default function Logout() {
  const { handleLogoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(axiosConfig.baseURL + "/logout", {withCredentials: true})
      .then(() => {
        console.log("Logout successful");
        handleLogoutUser();
        alert("Logout successful");
        document.cookie = 'JSESSIONID=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert("Logout failed. Please try again.");
      });
  }, []);

  return null;
}
