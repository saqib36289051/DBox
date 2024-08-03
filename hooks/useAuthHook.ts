import { getData } from "@/utils/utils";
import { useEffect, useState } from "react";

const useAuthHook = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    getData("userInfo").then((data) => {
      setUser(data);
    });
  }, []);
  return {
    ...user?.user_info,
  };
};
export default useAuthHook;
