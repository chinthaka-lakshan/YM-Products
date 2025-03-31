import React, { useState } from "react";
import "./Dashboard.css";
<<<<<<< HEAD:frontend/src/Pages/Dashboard/AdminDashboard/AdminDashboard.jsx
import Sidebar from "../../../components/Sidebar/AdminSidebar/AdminSidebar.jsx";
import DashboardWidget from "../../../components/DashboardWidget/DashboardWidget.jsx";
import LowPurchaseStockTable from "../../../components/LowPurchaseStockTable/LowPurchaseStockTable.jsx";
import LowDistributionStockTable from "../../../components/LowDistributionStockTable/LowDistributionStockTable.jsx";
import PendingOrdersTable from "../../../components/DashboardWidget/PendingOrdersTable/PendingOrdersTable.jsx";
=======
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import DashboardWidget from "../../components/DashboardWidget/DashboardWidget.jsx";
import LowPurchaseStockTable from "../../components/LowPurchaseStockTable/LowPurchaseStockTable.jsx";
import LowDistributionStockTable from "../../components/LowDistributionStockTable/LowDistributionStockTable.jsx";
import PendingOrdersTable from "../../components/PendingOrdersTable/PendingOrdersTable.jsx";
>>>>>>> b076be3b7d0c91ea47b765f495b8780db61f09b1:frontend/src/Pages/Dashboard/Dashboard.jsx

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
                    <LowDistributionStockTable/>
                    <PendingOrdersTable/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;