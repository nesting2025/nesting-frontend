import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LoginNesting from "./pages/LoginNesting";
import SignupNesting from "./pages/SignupNesting";
import FindPassword from './pages/FindPassword';
import AccountInfo from './pages/AccountInfo';
import FindEmail from './pages/FindEmail';
import PreferenceSetup from './pages/PreferenceSetup';
import AuthVerify from "./pages/AuthVerify";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/nesting" element={<LoginNesting />} />
      <Route path="/signup/nesting" element={<SignupNesting /> } />
      <Route path="/signup/preference" element={<PreferenceSetup />} />
      <Route path="/login/find-password" element={<FindPassword /> } />
      <Route path="/login/find-email" element={<FindEmail />} />
      <Route path="/login/account-info" element={<AccountInfo />} />
      <Route path="/verify" element={<AuthVerify />} />
    </Routes>
  );
}

export default App;
