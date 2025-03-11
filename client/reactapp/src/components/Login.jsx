function Login(){
    return(
        <div id="LoginContainer">
			<label className="LoginLabel" htmlFor="email">Email</label>
            <input type="email" />
			<label className="LoginInput" htmlFor="password">Password</label>
			<input type="password" />
			<button>Submit</button>
        </div>
    )
}

export default Login