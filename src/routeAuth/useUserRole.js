import { useState, useEffect } from "react";

const useUserRole = () => {
  const [role, setRole] = useState(() => localStorage.getItem("userRoles"));

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem("userRoles"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return role;
};

export default useUserRole;
