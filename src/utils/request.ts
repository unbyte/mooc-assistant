import Axios from "axios";

const request = Axios.create({
  timeout: 5000
});

if (process.env.NODE_ENV === "development") {
  request.interceptors.request.use(
    req => {
      console.log(req);
      return req;
    },
    error => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  request.interceptors.response.use(
    response => {
      console.log(response.data);
      // return response.data
      return response;
    },
    error => {
      console.log(error.response.data);
      // return Promise.reject(error.response.data)
      return Promise.reject(error.response);
    }
  );
}
export default request;
