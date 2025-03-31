import React, { useState } from "react";
import "./dashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import DashboardWidget from "../../components/DashboardWidget/DashboardWidget.jsx";
import LowPurchaseStockTable from "../../components/LowPurchaseStockTable/LowPurchaseStockTable.jsx";

const Dashboard = () => {
    const [sidebarExpanded, setSidebarExpanded] = useState(true);

    return (
        <div className="Dashboard">
            <Sidebar onToggle={setSidebarExpanded} />
            <div className={`DashboardContainer ${sidebarExpanded ? "" : "collapsed"}`}>
                <div className="DashboardWidgets">
                    <DashboardWidget type="purchaseStock"/>
                    <DashboardWidget type="distributionStock"/>
                    <DashboardWidget type="orders"/>
                    <DashboardWidget type="returns"/>
                    <DashboardWidget type="shops"/>
                </div>
                <div className="TablesContainer">
                    <LowPurchaseStockTable/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;