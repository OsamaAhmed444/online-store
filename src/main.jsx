import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import "./index.css";
import CartContext from "./context/CartContext.jsx";
import AuthContext from "./context/AuthContext.jsx";
import ThemeContext from "./context/ThemeContext.jsx";
import useTheme from "./hooks/useTheme.js";

const stripePromise = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  : null;

function ThemedToastContainer() {
  const { theme } = useTheme();
  return <ToastContainer position="top-right" theme={theme} />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeContext>
      <BrowserRouter>
        <AuthContext>
          <CartContext>
            <Elements stripe={stripePromise}>
              <App />
              <ThemedToastContainer />
            </Elements>
          </CartContext>
        </AuthContext>
      </BrowserRouter>
    </ThemeContext>
  </StrictMode>,
);
