import axios from "axios";

async function verifyToken() {
  const token = localStorage.getItem(token)
  console.log(token);
    const response = await axios.get('http://localhost:4500/api/users/', {
      headers: {
        Authorization: `${token}`
      }
    });
    return response.data;
}

export default verifyToken