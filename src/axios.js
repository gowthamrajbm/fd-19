import axios from "axios";

const instance1 = axios.create({
  baseURL: "https://anz-fd19-backend.herokuapp.com"
});
export default instance1;
