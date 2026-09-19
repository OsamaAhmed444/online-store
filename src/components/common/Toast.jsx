import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const showSuccess = (message) => {
  toast.success(message);
};

export const showError = (message) => {
  toast.error(message);
};

export const showInfo = (message) => {
  toast.info(message);
};

export default function Toast() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      theme="dark"
    />
  );
}