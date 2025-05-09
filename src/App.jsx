import "./App.css";
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import LoginNesting from "./pages/LoginNesting";
import SignupNesting from "./pages/SignupNesting";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/nesting" element={<LoginNesting />} />
      <Route path="/signup/nesting" element={<SignupNesting /> } />
    </Routes>
  );
}

export default App;
