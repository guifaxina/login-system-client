import axios from "axios";
import cookie from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const accessToken = cookie.get("accessToken");

  const navigate = useNavigate();

  useEffect(() => {
    const authorizeRequest = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/authorize",
        {
          headers: {
            "x-access-token": `Bearer ${accessToken}`,
          },
        }
      );

      return response;
    };

    authorizeRequest()
      .then()
      .catch((err) => {
        if (err.response.data.err.name === "TokenExpiredError") {
          return navigate("/login");
        }
        
       return navigate("/");
      });
  }, []);

  return <h1>Welcome, you're logged in. {accessToken} </h1>;
}
