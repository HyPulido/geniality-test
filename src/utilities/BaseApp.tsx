import { Theme, ToastContainer, ToastPosition, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function showToast(
    message: string,
    position: ToastPosition,
    timeout: number,
    type: string
  ) {
    const toastOptions = {
      position: position,
      autoClose: timeout,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    };
  
    switch (type) {
      case "warn":
        toast.warn(message, toastOptions);
        break;
      case "info":
        toast.info(message, toastOptions);
        break;
      case "success":
        toast.success(message, toastOptions);
        break;
      case "error":
        toast.error(message, toastOptions);
        break;
      default:
        toast(message, toastOptions);
        break;
    }
  }
  