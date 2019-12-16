import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-server-9be18.firebaseio.com/"
});

export default instance;
