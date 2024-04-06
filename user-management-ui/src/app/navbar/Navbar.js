import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom"; // If you're using React Router
import styles from "./Navbar.module.css";
import useNavigation from "../../hooks/useNavigation";
import useAuth from "../../hooks/useAuth";
import CustomButton from "../../components/CustomButton";
import {useNavigate} from 'react-router-dom';

const { navbar, logo, navItems, navItem, selectedNavItem } = styles;

const Navbar = (props) => {
  const { currentRoute, setCurrentRoute } = useNavigation();
  const isAuth = useAuth();
  const navigationItems = [
    { tabName: "Home", route: "/" },
    { tabName: "Dashboard", route: "/dashboard" },
    { tabName: "Profile", route: "/profile" },
  ];
  const navigate = useNavigate();

  const navItemChangeHandler = useCallback((item)=>{
    setCurrentRoute(item.tabName);
    navigate(item.route);
  })
  
  const logoutHandler = useCallback(() => {
    navigate("/login");
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
      {useAuth && <div><CustomButton buttonName ="Log Out" buttonType = "button" clickHandler={logoutHandler}/></div>}
      {/* Add login/logout buttons or other actions here */}
    </nav>
  );
};

export default Navbar;
