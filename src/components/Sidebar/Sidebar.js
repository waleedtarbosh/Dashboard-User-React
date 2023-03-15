import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import Logo from "./img/logo.png";
const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
  };

  return (
    <>
      {/* Sidebar */}
      <aside id="sidebar">
        <div className="sidebar-title">
          <div className="sidebar-brand">
            <img src={Logo} alt="logo img" />
          </div>
          <span className="material-icons-outlined" onclick="closeSidebar()">
            close
          </span>
        </div>
        <ul className="sidebar-list">
          <li className={`sidebar-list-item ${activeItem === "overview" ? "active" : ""}`}>
            <Link to="/" onClick={() => handleItemClick("overview")}>
              <span className="fa-solid fa-chart-pie" />
              Overview
            </Link>
          </li>
          <li className={`sidebar-list-item ${activeItem === "tickets" ? "active" : ""}`}>
            <Link to="/tickets" onClick={() => handleItemClick("tickets")}>
              <span className="fa-solid fa-ticket" />
              Tickets
            </Link>
          </li>
          <li className={`sidebar-list-item ${activeItem === "ideos" ? "active" : ""}`}>
            <Link to="/ideos" onClick={() => handleItemClick("ideos")}>
              <span className="fa-solid fa-lightbulb" />
              Ideos
            </Link>
          </li>
          <li className={`sidebar-list-item ${activeItem === "users" ? "active" : ""}`}>
            <Link to="/users" onClick={() => handleItemClick("users")}>
              <span className="fa-solid fa-user" />
              Users
            </Link>
          </li>
        </ul>
      </aside>
      {/* End Sidebar */}
    </>
  );
};

export default Sidebar;