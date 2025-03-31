import React from "react";
import "./DashboardWidget.css";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import RepeatIcon from "@mui/icons-material/Repeat";
import StoreIcon from "@mui/icons-material/Store";
import { Link } from 'react-router-dom';

const DashboardWidget = ({ type }) => {

  let data;

  switch (type) {
    case "purchaseStock":
      data = {
        title: "PURCHASE STOCK",
        isMoney: false,
        link: <Link to="" style={{textDecoration:"none", color:"#425060"}}><span>View Stock</span></Link>,
        icon: (
          <StorefrontIcon
            className="icon"
            style={{ color: "crimson", backgroundColor: "#ff000033" }}
          />
        ),
      };
      break;

    case "distributionStock":
      data = {
        title: "DISTRIBUTION STOCK",
        isMoney: false,
        link: <Link to="" style={{textDecoration:"none", color:"#425060"}}><span>View Stock</span></Link>,
        icon: (
          <ShoppingCartIcon
            className="icon"
            style={{ color: "purple", backgroundColor: "#80008033" }}
          />
        ),
      };
      break;

    case "orders":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: <Link to="" style={{textDecoration:"none", color:"#425060"}}><span>View Orders</span></Link>,
        icon: (
          <InventoryIcon
            className="icon"
            style={{ color: "goldenrod", backgroundColor: "#daa52033" }}
          />
        ),
      };
      break;

    case "returns":
      data = {
        title: "RETURNS",
        isMoney: false,
        link: <Link to="" style={{textDecoration:"none", color:"#425060"}}><span>View Returns</span></Link>,
        icon: (
          <RepeatIcon
            className="icon"
            style={{ color: "green", backgroundColor: "#00800033" }}
          />
        ),
      };
      break;

      case "shops":
        data = {
          title: "SHOPS",
          isMoney: false,
          link: <Link to="" style={{textDecoration:"none", color:"#425060"}}><span>View Shops</span></Link>,
          icon: (
            <StoreIcon
              className="icon"
              style={{ color: "goldenrod", backgroundColor: "#daa52033" }}
            />
          ),
        };
        break;

    default:
      break;
  }

  return (
    <div className='widget'>
      <div className='left'>
        <span className='title'>{data.title}</span>
      </div>
      <div className='right'>
        {data.icon}
        <span className='link'>{data.link}</span>
      </div>
    </div>
  );
};

export default DashboardWidget;