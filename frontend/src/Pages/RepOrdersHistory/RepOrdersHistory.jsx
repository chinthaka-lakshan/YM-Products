import React, { useState } from 'react';
import './RepOrdersHistory.css';
import RepSideBar from '../../components/Sidebar/RepSidebar/RepSidebar';
import RepNavbar from '../../components/RepNavbar/RepNavbar';

const RepOrdersHistory = () => {
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
    <div className="rep-orders-history-container">
      <div className="sidebar-container-rep">
        <RepSideBar/>
      </div>
      <div>
        <RepNavbar/>
      </div>
       <div className="order-title-rep">
          <h1>Orders History</h1>
        </div>
      
      <div className="content-container-rep">

        <div className="order-table-container-rep">
          <table className="order-table-rep">
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
                    <button className="view-btn-rep">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="pagination-container-rep">
            <button 
              className="pagination-arrow-rep" 
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`pagination-number-rep ${currentPage === i + 1 ? 'active' : ''}`}
              >
                {i + 1}
              </button>
            ))}
            
            {totalPages > 5 && (
              <>
                <button className="pagination-ellipsis-rep">...</button>
                <button 
                  className="pagination-number-rep"
                  onClick={() => paginate(totalPages)}
                >
                  {totalPages}
                </button>
              </>
            )}
            
            <button 
              className="pagination-arrow-rep" 
              onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepOrdersHistory;