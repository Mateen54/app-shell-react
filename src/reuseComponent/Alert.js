import React, { useEffect } from "react";
import Swal from "sweetalert2";
import "./alert.css";

const Alert = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    if (message) {
      Swal.fire({
        title: message,
        icon: type,
        background: "#f4f4f9", // light gray background
        color: "#333", // dark text
        confirmButtonColor: "#3085d6", // blue confirm button
        cancelButtonColor: "#d33", // red cancel button
        timer: 3000,
        timerProgressBar: true,
        willClose: () => {
          if (onClose) {
            onClose();
          }
        },
      });
    }
  }, [message, type, onClose]);

  return null;
};

export default Alert;
