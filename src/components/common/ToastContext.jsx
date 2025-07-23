import React, { createContext, useContext, useState } from "react";
import "../../styles/css/ToastContext.css";

const ToastContext = createContext();

export const ToastProvider = ({children}) => {
    const [toast, setToast] = useState(null);

    const showToast = (message, type="") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 2000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <div className="toast-area">
                    <div className="toast-row">
                        <p className="toast-msg">{toast.message}</p>
                        {toast.type === "cart" && <p className="goto-cart">바로가기</p> }
                    </div>
                </div>
            )}
        </ToastContext.Provider>
    )
}

export const useToast= () => useContext(ToastContext);