import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function Login(){
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const [isRegistered, setIsRegistered] = useState();
	const [message, setMessage] = useState("");

	const handleClick = async (e, isRegistering) => {
		e.preventDefault();
		try {
			if(isRegistering){
				await createUserWithEmailAndPassword(auth, email, password);
				console.log("Logging In")
			} else{
				await signInWithEmailAndPassword(auth, email, password);;
				console.log("Registering")
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
				<p>{message}</p>
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