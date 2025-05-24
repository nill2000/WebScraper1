import React from "react";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { auth } from "../Firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Code redirects back to dashboard if user is already logged in
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  // Code logic that checks for authentication for logging in
  const handleClick = async (e, isRegistering) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        //Create user if registering
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("Registering...");
      } else {
        //Otherwise, login
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Logging In...");
      }
      navigate("/dashboard");
    } catch (err) {
      console.log("Error logging in");
      setMessage(err.code);
    }
  };

  return (
    <div className="m-0 flex h-screen items-center justify-center bg-[#16a085]">
      <div className="flex flex-col items-center justify-center rounded-sm border-2 border-solid border-black bg-[#d1eef6] p-8">
        <p className="text-3xl font-bold">Welcome</p>
        <p className="text-2xl font-bold">Register or Login</p>
        <p className="absolute top-96">{message}</p>
        <label
          className="self-start pt-5 pr-0 pb-1 pl-0 text-2xl font-bold"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="rounded-2xl border-2 border-solid p-[5px] text-base"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label
          className="self-start pt-5 pr-0 pb-1 pl-0 text-2xl font-bold"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="rounded-2xl border-2 border-solid p-[5px] text-base"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="mt-[15px] min-w-[5rem] cursor-pointer rounded-2xl border-2 border-solid border-black p-[5px] text-[15px] transition duration-300 ease-in hover:bg-gray-400"
          onClick={(e) => handleClick(e, true)}
        >
          Register
        </button>
        <button
          className="mt-[15px] min-w-[5rem] cursor-pointer rounded-2xl border-2 border-solid border-black p-[5px] text-[15px] transition duration-300 ease-in hover:bg-gray-400"
          onClick={(e) => handleClick(e, false)}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
