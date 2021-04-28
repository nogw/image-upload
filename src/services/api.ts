import axios from "axios";

const api = axios.create({
  baseURL: "https://imagesuploadkk.herokuapp.com"
});

export default api;