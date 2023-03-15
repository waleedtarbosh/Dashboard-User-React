import React from "react";
import "./WrapperUsers.css";
import Table from "../TableUsers/Table";
import Img from "./img/avatar.png";
const WrapperUsers = () => {
  return (
    <>
      {/* Main */}
      <div className="all-container">
        {/*title and avatar  */}
        <div className="main-title">
          <p>Users</p>
          <div className="header-avatar">
            <p>Jones Ferdinand</p>
            <img src={Img} alt="avatar img " />
          </div>
        </div>
        
        {/* Table */}
        <Table />

      </div>

      {/* End Main */}
    </>
  );
};

export default WrapperUsers;
