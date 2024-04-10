import { Buffer } from "buffer";

export const logoutHandler = () => {};

export const getHeaderToken = () => ({
  Authorization: `Bearer ` + localStorage.getItem("token"),
});

export const decodeToken = (token) => {
  if (token) {
    var base64Payload = token.split(".")[1];
    var payloadBuffer = Buffer.from(base64Payload, "base64");
    // Here validating token
    const tokenJson = JSON.parse(payloadBuffer.toString());
    console.log(tokenJson);
    return tokenJson;
  }
  return "Please pass Token";
};
