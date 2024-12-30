import {jwtDecode} from "jwt-decode";
import Commons from "../utils/Common";

const JwtDecoding = {
  getDecodedToken: () => {
    try {
      const token = Commons.getAccessToken();
      if (!token) {
        console.error("No token found");
        return null;
      }
      return jwtDecode(token);
    } catch (error) {
      console.error("Error decoding token : ", error.message);
      return null;
    }
  },
  getField: (field) => {
    const decoded = JwtDecoding.getDecodedToken();
    if (decoded && field in decoded) {
      return decoded[field];
    } else {
      console.warn(`Field ${field} not found in token payload`);
      return null;
    }
  },
};
export default JwtDecoding;
