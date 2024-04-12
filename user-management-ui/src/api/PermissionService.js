import axios from "axios";
import { baseUrl } from "../data/Constant";
import { getHeaderToken } from "../utils/utils";

export const createNewPermission = async (permission) => {
  return await axios.post(
    baseUrl + "/api/v1/permission/create-permission",
    permission,
    { headers: { ...getHeaderToken() } }
  );
};

export const deletePermission = async (id) => {
  return await axios.delete(
    baseUrl + `/api/v1/permission/delete-permission/${id}`,
    { headers: { ...getHeaderToken() } }
  );
};
