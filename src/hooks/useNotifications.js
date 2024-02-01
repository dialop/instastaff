import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useNotifications = (job) => {
  const sendAppNotification = async () => {
    try {
      const response = await axios.post('/api/send-email', job);
      console.log(response.data);
    } catch (error) {
      console.error("Error accepting job:", error);
    }
  };

  return sendAppNotification; 
};

export default useNotifications;
