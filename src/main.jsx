import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastProvider } from "./components/common/ToastContext";

createRoot(document.getElementById("root")).render(
    <ToastProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ToastProvider>
);
