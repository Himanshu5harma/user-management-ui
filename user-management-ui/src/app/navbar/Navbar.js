import React, { useCallback, useContext, useEffect } from "react";
import styles from "./Navbar.module.css";
import useNavigation from "../../hooks/useNavigation";
import useAuth from "../../hooks/useAuth";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import {
  ACCESS_MAP,
  ADMIN_ROUTE_PATH,
  ADMIN_TAB,
  DASHBOARD_ROUTE_PATH,
  DASHBOARD_TAB,
  HOME_ROUTE_PATH,
  HOME_TAB,
  LOGIN_ROUTE_PATH,
  PROFILE_ROUTE_PATH,
  PROFILE_TAB,
} from "../../data/Constant";
import { AuthContext, RolesContext } from "../base/Contexts";
import { getActiveRolePermissions } from "../../utils/utils";

const { navbar, logo, navItems, navItem, selectedNavItem } = styles;

const Navbar = (props) => {
  const { currentRoute, setCurrentRoute } = useNavigation();
  const currentUser = useContext(AuthContext);
  const allRoles = useContext(RolesContext);
  const { updatedAcitveRole } = props;
  // console.log(currentUser);

  const isAuth = useAuth();
  const navigate = useNavigate();

  const navigationItems = [
    { tabName: HOME_TAB, route: HOME_ROUTE_PATH },
    { tabName: DASHBOARD_TAB, route: DASHBOARD_ROUTE_PATH },
    { tabName: PROFILE_TAB, route: PROFILE_ROUTE_PATH },
    { tabName: ADMIN_TAB, route: ADMIN_ROUTE_PATH },
  ];

  const filterNavbarItembasedOnPermissions = (navigationItems) => {
    if (
      Object.keys(currentUser).length &&
      currentUser?.activeRole &&
      allRoles.length
    ) {
      const activeRolePermissions = getActiveRolePermissions(
        allRoles,
        currentUser.activeRole
      );
      
      return navigationItems.filter(
        (item) =>
          ACCESS_MAP.navBar[item.tabName].filter((p) =>
            activeRolePermissions?.includes(p)
          ).length
      );
    } else return [];
  };

  const navItemChangeHandler = useCallback((item) => {
    filterNavbarItembasedOnPermissions(navigationItems);
    setCurrentRoute(item.tabName);
    navigate(item.route);
  });

  const logoutHandler = useCallback(() => {
    navigate(LOGIN_ROUTE_PATH);
    localStorage.clear();
  });

  

  return (
    <nav className={`${navbar}`}>
      <div className={`${logo} w-10 font-medium  flex`}>
        <img
          src="https://cdn.iconscout.com/icon/premium/png-512-thumb/user-management-3431580-2862542.png?f=webp&w=256"
          alt="logo"
        />
        {/* <label className="font-medium text-sm ">User Management</label> */}
      </div>
      <div className={`${navItems}`}>
        {filterNavbarItembasedOnPermissions(navigationItems).map((item) => (
          <div
            key={item.tabName}
            className={`${navItem} ${
              currentRoute === item.tabName ? selectedNavItem : ""
            }`}
            onClick={() => navItemChangeHandler(item)}
          >
            {item.tabName}
          </div>
        ))}
      </div>

      {useAuth && (
        <div className={`flex space-x-10`}>
          {/*Role Selection Dropdown  */}
          <div className="flex relative w-56 lg:max-w-sm space-x-5 ">
            <label className={`text-nowrap w-2/5 my-auto`}>Active Role </label>
            <select
              className="w-3/5 my-auto p-1 text-center uppercase text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
              onChange={(item) => updatedAcitveRole(item.target.value)}
              value={currentUser.activeRole}
            >
              {currentUser.roles &&
                currentUser?.roles?.map((option) => (
                  <option key={option} value={option}>
                    {option?.split("_")[1]}
                  </option>
                ))}
            </select>
          </div>
          {currentUser?.firstName && (
            <div
              className={`bg-slate-200 font-sans capitalize pt-1 px-4 border rounded-3xl hover:border-gray-800 shadow-md`}
            >
              {[currentUser?.firstName, currentUser?.lastName].join(" ")}
            </div>
          )}
          <div>
            <CustomButton
              buttonName="Log Out"
              buttonType="button"
              clickHandler={logoutHandler}
            />
          </div>
        </div>
      )}
      {/* Add login/logout buttons or other actions here */}
    </nav>
  );
};

export default Navbar;
