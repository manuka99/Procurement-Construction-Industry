import axios from "axios";
import { APP_URL, APP_USER_TOKEN, APP_USER } from "@/services/config";
import router from "@/routes/router";
import store from "@/store";

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
        response,
        response: { data, status }
      } = error;

      var errMessage = "Unexpected error";
      if (response && data && data.data) errMessage = data.data.message;
      else errMessage = error.message || "Unexpected error";
      let payloadNotify = {
        isToast: true,
        title: "ERROR! Unable to perform task",
        content: "There are errors that you need to pay attention.",
        list: [errMessage],
        variant: "danger"
      };
      store.dispatch("notification/setNotify", payloadNotify);

      // else if (status === 401) alert("Not Authorized");
      // else if (status === 404) alert("Page not Found");
      // else if (status === 500) alert("500 Error");
      // else alert(error.message);

      if (status === 401) {
        localStorage.clear(APP_USER_TOKEN);
        localStorage.clear(APP_USER);
        router.push({ name: "Login" });
      }

      return Promise.reject(error);
    }
  );

  return Api;
}
