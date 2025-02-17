import { useRouter } from "next/navigation";
import React, { useState, useContext } from "react";
import toast from "react-hot-toast";

const UserContext = React.createContext();

export const UserContextProvider = ({ children }) => {
  const serverUrl = "http://localhost:8000";

  const router = useRouter ();

  const [user, setUser] = useState(null);
  const [userState, setUserState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setloading] = useState(true);

  // register user
  const registerUser = async (e) => {
    e.preventDefault();
    if (
      !userState.email.includes("@") ||
      !userState.password ||
      userState.password.length < 6
    ) {
      toast.error("Please enter a valid email and password (min 6 characters)");
      return;
    }

    try {
      const res = await axios.post(`${serverUrl}/api/v1/register`, userState);
      console.log("User registered successfully", res.data);

      toast.success("User registered successfully");

      // clear the form
      setUserState({
        name: "",
        email: "",
        password: "",
      });

      // redirect to login page
      router.push("/login");
    } catch (error) {
      console.log("Error registering user", error);
      toast.error(error.response.data.message);
    }
  };

  // dynamic form handler
  const handlerUserInput = (name) => (e) => {
    const value = e.target.value;

    setUserState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <UserContext.Provider value={{ registerUser, userState, handlerUserInput, }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
