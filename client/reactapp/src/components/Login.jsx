import React from 'react';

function Login(){
    return(
        <div id="LoginContainer">
			<p className="LoginHeader">Welcome</p>
			<p className="LoginHeader">Register or Login</p>
			<label className="LoginLabel" htmlFor="email">Email</label>
            <input className="LoginInput" type="email" />
			<label className="LoginLabel" htmlFor="password">Password</label>
			<input className="LoginInput" type="password" />
			<button className="LoginBtn">Register</button>
			<button className="LoginBtn">Login</button>
        </div>
    )
}

export default Login