import React, { useCallback, useContext, useEffect } from "react";
import { Link } from "react-router-dom"; // If you're using React Router
import styles from "./Navbar.module.css";
import useNavigation from "../../hooks/useNavigation";
import useAuth from "../../hooks/useAuth";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import {
  ADMIN_ROUTE_PATH,
  DASHBOARD_ROUTE_PATH,
  HOME_ROUTE_PATH,
  LOGIN_ROUTE_PATH,
  PROFILE_ROUTE_PATH,
} from "../../data/Constant";
import { AuthContext } from "../base/Contexts";

const { navbar, logo, navItems, navItem, selectedNavItem } = styles;

const Navbar = (props) => {
  const { currentRoute, setCurrentRoute } = useNavigation();
  const currentUser = useContext(AuthContext);
  console.log(currentUser);

  const isAuth = useAuth();
  const navigate = useNavigate();

  const navigationItems = [
    { tabName: "Home", route: HOME_ROUTE_PATH },
    { tabName: "Dashboard", route: DASHBOARD_ROUTE_PATH },
    { tabName: "Profile", route: PROFILE_ROUTE_PATH },
    { tabName: "Admin", route: ADMIN_ROUTE_PATH },
  ];

  const navItemChangeHandler = useCallback((item) => {
    setCurrentRoute(item.tabName);
    navigate(item.route);
  });

  const logoutHandler = useCallback(() => {
    navigate(LOGIN_ROUTE_PATH);
    localStorage.clear();
  });

  return (
    <nav className={`${navbar}`}>
      <div className={`${logo} w-10`}>
        <img
          src="https://img.freepik.com/free-vector/illustration-business-team-structure_53876-5881.jpg?size=338&ext=jpg&ga=GA1.1.2113030492.1711843200&semt=ais"
          alt="logo"
        />
      </div>
      <div className={`${navItems}`}>
        {navigationItems.map((item) => (
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
