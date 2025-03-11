function Login(){
    return(
        <div id="LoginContainer">
			<label className="LoginLabel" htmlFor="email">Email</label>
            <input className="LoginInput" type="email" />
			<label className="LoginLabel" htmlFor="password">Password</label>
			<input className="LoginInput" type="password" />
			<button>Submit</button>
        </div>
    )
}

export default Login