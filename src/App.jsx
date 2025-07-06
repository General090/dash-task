import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import TabContainer from './component/TabContainer';
import Dashboard from './pages/Dashboard';
import LoginForm from './component/LoginForm';
import SuccessPage from './pages/SuccessPage';

const App = () => {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<TabContainer />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/successPage" element={<SuccessPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Add other routes as needed */}
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;
