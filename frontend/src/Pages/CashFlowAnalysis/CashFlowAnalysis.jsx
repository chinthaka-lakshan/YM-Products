import React, { useState } from "react";
import "./CashFlowAnalysis.css"
import AdminSidebar from "../../components/Sidebar/AdminSidebar/AdminSidebar.jsx"
import CashFlowWidget from "../../components/CashFlowWidget/CashFlowWidget.jsx"
import CashFlowTable from "../../components/CashFlowTable/CashFlowTable.jsx"

const CashFlowAnalysis = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  return (
    
    <div className="CashFlowAnalysis">
      <AdminSidebar onToggle={setSidebarExpanded} />
      <div className={`CashFlowContainer ${sidebarExpanded ? "" : "collapsed"}`}>
        <div className="MonthCashFlow">
        <h1>
        {(() => {
            const today = new Date();
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
            return monthNames[today.getMonth()];
        })()}
        </h1>
        <div className="MonthCashFlowWidgets">
            <CashFlowWidget type="monthlyIncome"/>
            <CashFlowWidget type="monthlyExpense"/>
            <CashFlowWidget type="monthlyProfit"/>
        </div>
        </div>
        <div className="DayCashFlow">
        <h1>
        {(() => {
            const today = new Date();
            const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            return date;
        })()}
        </h1>
        <div className="DayCashFlowWidgets">
            <CashFlowWidget type="dayIncome"/>
            <CashFlowWidget type="dayExpense"/>
            <CashFlowWidget type="dayProfit"/>
            
        </div>
        <div className="ButtonsContainer">
        <button type="submit" className="btn"> Add Expenses
        </button>
        </div>
        </div>
        <div className="TablesContainer">
            <CashFlowTable/>
        </div>
      </div>
      
    </div>
  )
}

export default CashFlowAnalysis
