import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login.jsx'
import Dashboard from "./components/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import './styles/index.css';
import './styles/Login.css';
import './styles/Dashboard.css';
import './styles/Item.css'

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
				element={
				<ProtectedRoute>
					<Dashboard/>
				</ProtectedRoute>}>
			</Route>
		</Routes>
	</Router>
  );
}

export default App
