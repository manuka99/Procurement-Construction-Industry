import axios from "axios";
import { APP_URL, APP_USER_TOKEN, APP_USER } from "@/services/config";
import router from "@/routes/router";

export default function Api(nonApi = false) {
  let user_token = localStorage.getItem(APP_USER_TOKEN);
  const Api = axios.create({
    baseURL: `${APP_URL}${nonApi ? "" : "/api"}`,
    timeout: 30 * 60000,
    headers: {
      Authorization: `Bearer ${user_token}`,
      "Content-Type": "application/json"
    }
  });

  Api.interceptors.response.use(
    response => response,
    error => {
      const {
        response: { data, status }
      } = error;
      if (data && data.message) alert(data.message);
      else {
        if (status === 401) {
          localStorage.clear(APP_USER_TOKEN);
          localStorage.clear(APP_USER);
          router.push({ name: "Login" });
        }
        // else if (status === 401) alert("Not Authorized");
        // else if (status === 404) alert("Page not Found");
        // else if (status === 500) alert("500 Error");
        // else alert(error.message);
      }
      return Promise.reject(error);
    }
  );

  return Api;
}
