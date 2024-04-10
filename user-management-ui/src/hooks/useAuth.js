import { Buffer } from "buffer";

const useAuth = () => {
  let token = localStorage.getItem("token");
  let validToken = false;
  if (token) {
    var base64Payload = token.split(".")[1];
    var payloadBuffer = Buffer.from(base64Payload, "base64");
    // Here validating token
    const tokenJson = JSON.parse(payloadBuffer.toString());
    if((parseInt(tokenJson.exp)-Math.floor(Date.now()/1000))>=0)
        validToken = true;
  }
  validToken = token ? true : false;

  return { validToken, token };
};
export default useAuth;
