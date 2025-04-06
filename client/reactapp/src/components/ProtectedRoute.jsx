import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase'; // adjust if your path is different

// Function checks if user is loading or logged in; Redirects to necessary page
function ProtectedRoute({ children }) {
	const [user, loading] = useAuthState(auth);

	if (loading) return <p>Loading...</p>;

	if (!user) {
		return <Navigate to="/" replace />;
	}

	return children;
}

export default ProtectedRoute;