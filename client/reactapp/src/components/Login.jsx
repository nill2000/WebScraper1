import React from 'react';
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { auth } from '../Firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";

function Login(){
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	// Code redirects back to dashboard if user is already logged in
	const [user, loading] = useAuthState(auth);
	if(loading){
		return <p>Loading...</p>
	}
	if(user){
		return <Navigate to="/dashboard"/>
	}

	// Code logic that checks for authentication for logging in
	const handleClick = async (e, isRegistering) => {
		e.preventDefault();
		try {
			if(isRegistering){ //Create user if registering
				await createUserWithEmailAndPassword(auth, email, password); 
				console.log("Registering...")
			} else{ //Otherwise, login
				await signInWithEmailAndPassword(auth, email, password);;
				console.log("Logging In...")
			}   
			navigate("/dashboard");
		} catch (err){
			console.log("Error logging in");
			setMessage(err.code)
		}
	}

    return(
		<div id='LoginWrapper'>
			<div id="LoginContainer">
				<p className="LoginHeader">Welcome</p>
				<p className="LoginHeader">Register or Login</p>
				<p className='absolute top-96'>{message}</p>
				<label className="LoginLabel" htmlFor="email">Email</label>
				<input 
					className="LoginInput" 
					type="email" 
					value = {email}
					onChange = {e => setEmail(e.target.value)}
					required
				/>
				<label className="LoginLabel" htmlFor="password">Password</label>
				<input 
					className="LoginInput" 
					type="password" 
					value = {password}
					onChange = {e => setPassword(e.target.value)}
					required
				/>
				<button 
					className="LoginBtn" 
					onClick={(e) => handleClick(e, true)}>
					Register
				</button>
				<button 
					className="LoginBtn"
					onClick={(e) => handleClick(e, false)}>
					Login
				</button>
		
        	</div>
		</div>
    )
}

export default Login