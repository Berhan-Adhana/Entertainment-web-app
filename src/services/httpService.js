import axios from "axios";
import { toast } from "react-toastify";
// axios.create({
//   baseURL: "https://entertainment-web-app-backend.vercel.app",
// });

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (expectedError) {
    toast(error.response.data.message);
  }
  return Promise.reject(error);
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
};
