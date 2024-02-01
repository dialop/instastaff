import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notifications = (job) => {
  const sendAppNotification = async () => {
    try {
      const response = await axios.post('/api/send-email', job);
      console.log(response.data);
      toast.success('Shift booked successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } catch (error) {
      console.error("Error booking job:", error);

      toast.error('Error booking shift. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };

  return sendAppNotification; 
};

export default notifications;
