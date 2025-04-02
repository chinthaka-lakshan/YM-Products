import React, { useState } from 'react';
import './OrdersHistory.css';
import Sidebar from '../../components/Sidebar/AdminSidebar/AdminSidebar';
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar';

const OrdersHistory = () => {
  const [orders, setOrders] = useState([
    { id: 1, shop: 'Shop', date: '3/4/2025', repName: 'Raheem', status: 'Distributed' },
    { id: 2, shop: 'Shop', date: '3/4/2025', repName: 'Raheem', status: 'Distributed' },
    { id: 3, shop: 'Shop', date: '3/4/2025', repName: 'Raheem', status: 'Distributed' },
    { id: 4, shop: 'Shop', date: '3/4/2025', repName: 'Raheem', status: 'Distributed' },
    { id: 5, shop: 'Shop', date: '3/4/2025', repName: 'Raheem', status: 'Distributed' },
    { id: 6, shop: 'Shop', date: '3/4/2025', repName: 'Raheem', status: 'Distributed' },
    { id: 7, shop: 'Shop', date: '3/4/2025', repName: 'Raheem', status: 'Distributed' },
    { id: 8, shop: 'Shop', date: '3/4/2025', repName: 'Rah', status: 'Distributed' },

  ]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  
  // Calculate current orders to display
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Calculate total pages
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div>
        <div>
            <Sidebar/>
        </div> 
        <div>
            <AdminNavbar/>
        </div>
        <div className='order-titl-h'>
         <h1>Orders History</h1>
        </div>

        <div className="order-table-container-h">
        <table className="order-table-h">
            <thead>
            <tr>
                <th>Shop</th>
                <th>Date</th>
                <th>Rep Name</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {currentOrders.map(order => (
                <tr key={order.id}>
                <td>{order.shop}</td>
                <td>{order.date}</td>
                <td>{order.repName}</td>
                <td>{order.status}</td>
                <td>
                    <button className="view-btn1">View</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        
        <div className="pagination-container-h">
            <button 
            className="pagination-arrow-h" 
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
            >
            &lt;
            </button>
            
            {[...Array(totalPages).keys()].slice(0, 5).map(number => (
            <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`pagination-number-h ${currentPage === number + 1 ? 'active' : ''}`}
            >
                {number + 1}
            </button>
            ))}
            
            <button className="pagination-ellipsis-h">...</button>
            
            <button className="pagination-number-h">40</button>
            
            <button 
            className="pagination-arrow-h" 
            onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
            disabled={currentPage === totalPages}
            >
            &gt;
            </button>
        </div>
        </div>
    </div>
  );
};

export default OrdersHistory;