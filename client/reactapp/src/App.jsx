// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Components/Login.jsx'
import Dashboard from "./Components/Dashboard.jsx";
// import { auth } from './Firebase.js'
import './styles/index.css';
import './styles/Login.css';
import './styles/Dashboard.css';

function App() {
  return (
	<Router>
		<Routes>
			<Route 
				path="/" 
				element={<Login/>}>
			</Route>
			<Route 
				path="/dashboard" 
				element={<Dashboard/>}>
			</Route>
		</Routes>
	</Router>
  );
}

export default App
