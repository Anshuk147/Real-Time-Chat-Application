import { toast } from "react-hot-toast"; // Assuming you're using react-hot-toast

const handleError = (error) => {
  console.log(error);
  let errorMessage = "Something went wrong. Please try again.";

  if (error.response) {
    // Server responded with a status other than 2xx
    errorMessage = error.response.data?.message || errorMessage;
  } else if (error.request) {
    // Request was made but no response received
    errorMessage = "No response from server. Check your network.";
  } else {
    // Something else happened
    errorMessage = error.message;
  }

  console.error("API Error:", errorMessage);
  toast.error(errorMessage);
};

export default handleError;
