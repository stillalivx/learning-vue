import axios from "axios";

const journalApi = axios.create({
  baseURL: 'https://vue-demo-b3336-default-rtdb.firebaseio.com'
})

export default journalApi