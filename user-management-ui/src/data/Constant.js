export const baseUrl = `http://localhost:8080`;
export const saltRounds = 10;

// *************************** Component Routes Paths ******************
export const LOGIN_ROUTE_PATH = "/login";
export const NEW_USER_ROUTE_PATH = "/new-user";
export const SESSION_EXPIRED_ROUTE_PATH = "/session-expired";
export const HOME_ROUTE_PATH = "/";
export const PROFILE_ROUTE_PATH = "/profile";
export const DASHBOARD_ROUTE_PATH = "/dashboard";
export const ADMIN_ROUTE_PATH = "/admin";
export const ROLE_SELECTION_ROUTE_PATH = "/role-selection";
export const UN_AUTHORIZED_ROUTE_PATH = "/unauthoriezed";

// ******************** Roles *************************
export const NO_ROLE_SELECTED = 'no-role-selected';
export const ADMIN_ROLE = 'ROLE_admin';
export const SUPEVISOR_ROLE = 'ROLE_supervisor';
export const WORKER_ROLE = 'ROLE_worker';

// ************************** Permissions ********************************

export const READ = 'read';
export const WRITE = 'write';
export const GRANT = 'grant';
export const DELETE = 'delete';
export const ADMIN = 'admin';

// *********************** Tabs ********************************
export const HOME_TAB = 'Home';
export const DASHBOARD_TAB = 'Dashboard';
export const PROFILE_TAB = 'Profile';
export const ADMIN_TAB = 'Admin';



// ************************ Role Based Access Map ******************
export const ACCESS_MAP = {
  navBar: {
    [HOME_TAB]: [READ],
    [ADMIN_TAB]: [ADMIN],
    [PROFILE_TAB]: [READ],
    [DASHBOARD_TAB]: [READ],
  },
  editUser: [ADMIN],
  grantPermission: [GRANT, ADMIN],
  grantRole: [GRANT, ADMIN],
};
