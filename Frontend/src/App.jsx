import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
// import LessonPage from './pages/LessonPage';
// import LabPage from './pages/LabPage';
import ProtectedRoute from './router/ProtectedRoute';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from './features/auth/authSlice';
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCurrentUser());
  },[])
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        
      {/* مساراا المحمية */}
        <Route path="/dashboard" element={
          <ProtectedRoute><DashboardPage /></ProtectedRoute>
        } />
          {/*  
        <Route path="/lesson/:slug" element={
          <ProtectedRoute><LessonPage /></ProtectedRoute>
        } />
        <Route path="/lab/:sessionId" element={
          <ProtectedRoute><LabPage /></ProtectedRoute>
        } /> */}
      </Route>
    </Routes>
  );
}

export default App;