import * as axios from "axios";

axios.default.defaults.validateStatus = function () {
  return true;
};

const serverUrl = "http://localhost:8080";

export class LoginService {
  public async login(username: string, password: string): Promise<boolean> {
    try {
      const loginResponse = await axios.default.post(`${serverUrl}/login`, {
        "username": username,
        "password": password,
      });

      if (loginResponse.status === 201) {
        console.log("Login successful");
        return true;
      } else {
        console.log("Login failed");
        return false;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        return false;
      } else {
        console.error("Unexpected error", error);
        return false;
      }
    }
  }
}
