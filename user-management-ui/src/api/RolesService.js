import axios from "axios";
import { baseUrl } from "../data/Constant";
import { getHeaderToken } from "../utils/utils";

export const getAllRoles = async () => {
  return await axios.get(baseUrl + "/api/v1/roles/find-all", {
    headers: { ...getHeaderToken() },
  });
};

export const getAllRolesAndPermissions = async () => {
  return await axios.get(baseUrl + "/api/v1/roles/find-all-roles-permissions", {
    headers: { ...getHeaderToken() },
  });
};

export const createNewRole = async (role) => {
  return await axios.post(baseUrl + "/api/v1/roles/create-role", role, {
    headers: { ...getHeaderToken() },
  });
};

export const deleteRole = async (id) => {
  return await axios.delete(baseUrl + `/api/v1/roles/delete-role/${id}`,{
    headers: { ...getHeaderToken() },
  });
};
