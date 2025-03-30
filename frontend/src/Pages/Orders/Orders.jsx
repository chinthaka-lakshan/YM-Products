import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import "./Orders.css"

const Orders = () => {
  const [orders, setOrders] = useState([
    { id: 1, shop: 'Shop', date: '3/4/2025', repName: 'Raheem', status: 'Pending' },
    { id: 2, shop: 'Shop', date: '3/4/2025', repName: 'Raheem', status: 'Pending' },
    { id: 3, shop: 'Shop', date: '3/4/2025', repName: 'Raheem', status: 'Pending' },
    { id: 4, shop: 'Shop', date: '3/4/2025', repName: 'Raheem', status: 'Pending' },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

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
    <div className="container">
       <Sidebar/>
       <div>
          <h1>YM Product</h1>
       </div>

       <div className="admin-profile">
          <img src="profile.png" alt="Admin Avatar" className="admin-avatar" />
          <span className="admin-text">Admin</span>
       </div>
       <div className='order-title'>
        <h2>Orders</h2>
       </div>
       <div className='btn1'>
          <button>History</button>
          <button>Add New</button>
      </div>
       
          

       
        

        
        
      

       
        

        
        
          <div className="card-body">
            <div className="table-responsive">
              <table className="table">
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
            </div>
          </div>




          
      </div>  
  )
}

export default Orders;