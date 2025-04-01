import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar/AdminSidebar/AdminSidebar'
import Navbar from '../../components/AdminNavbar/AdminNavbar'
import { Link } from 'react-router-dom'

import "./Orders.css"


const Orders = () => {
  const [orders, setOrders] = useState([
    { id: 1, shop: 'Shop', date: '3/4/2025', repName: 'Raheem', status: 'Pending' },
    { id: 2, shop: 'Shop', date: '3/4/2025', repName: 'Raheem', status: 'Pending' },
    { id: 3, shop: 'Shop', date: '3/4/2025', repName: 'Raheem', status: 'Pending' },
    { id: 4, shop: 'Shop', date: '3/4/2025', repName: 'Raheem', status: 'Pending' },
    { id: 5, shop: 'Shop', date: '3/4/2025', repName: 'Raheem', status: 'Pending' },
    { id: 6, shop: 'Shop', date: '3/4/2025', repName: 'Raheem', status: 'Pending' },
    { id: 7, shop: 'Shop', date: '3/4/2025', repName: 'Raheem', status: 'Pending' },
    { id: 8, shop: 'Shop', date: '3/4/2025', repName: 'Raheem', status: 'Pending' },
    { id: 9, shop: 'Shop', date: '3/4/2025', repName: 'Raheem', status: 'Pending' },
    { id: 10, shop: 'Shop', date: '3/4/2025', repName: 'Raheem', status: 'Pending' },
    { id: 11, shop: 'Shop', date: '3/4/2025', repName: 'Rah', status: 'Pending' },
    { id: 12, shop: 'Shop', date: '3/4/2025', repName: 'Raheem', status: 'Pending' },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  // Handle status change (Accept/Cancel)
  const handleStatusChange = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  // Calculate pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container1">
       <div>
         <Sidebar/>
       </div>
       <div>
          <Navbar/>
       </div>
       <div className='order-title'>
         <h1>Orders</h1>
       </div>
       <div className='btn1'>
            <Link to="/adminOrdersHistory">
              <button className='history-btn'>History</button>
            </Link>
       </div>
       <div className='btn2'>
       <button className='add-new-btn'>Add New</button>
       </div>

       <div className='orders-table-container'>           
        <table className="tableO">
                <thead>
                  <tr>
                    <th>Shop</th>
                    <th>Date</th>
                    <th>Rep Name</th>
                    <th>Status</th>
                    <th className="text-center" colSpan="3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.shop}</td>
                      <td>{order.date}</td>
                      <td>{order.repName}</td>
                      <td>{order.status}</td>
                      <td>
                        <button className="btn view-btn">View</button>
                      </td>
                      <td>
                        <button 
                          className="btn accept-btn"
                          onClick={() => handleStatusChange(order.id, 'Accepted')}
                        >
                          Accept
                        </button>
                      </td>
                      <td>
                        <button 
                          className="btn cancel-btn"
                          onClick={() => handleStatusChange(order.id, 'Cancelled')}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
        </table>
        
        {/* Pagination component */}
        <div className="pagination-container-O">
          <ul className="pagination-O">
            <li className={`page-item-O ${currentPage === 1 ? 'disabled' : ''}`}>
              <button 
                className="page-link" 
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
            </li>
            {[...Array(totalPages).keys()].map((number) => (
              <li 
                key={number + 1} 
                className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}
              >
                <button 
                  className="page-link-O" 
                  onClick={() => paginate(number + 1)}
                >
                  {number + 1}
                </button>
              </li>
            ))}
            <li className={`page-item-O ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button 
                className="page-link-O" 
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </li>
            <li className="page-item-O">
              <button className="page-link-O">...</button>
            </li>
            <li className="page-item-O">
              <button className="page-link go-btn-O">Go</button>
            </li>
          </ul>
        </div>
      </div>         
    </div>  
  )
}

export default Orders;

