import React, { useState, useRef, useEffect } from 'react';
import './RepReturns.css';
import RepSideBar from '../../components/Sidebar/RepSidebar/RepSidebar';
import RepNavbar from '../../components/RepNavbar/RepNavbar';
import SearchIcon from '@mui/icons-material/Search';

const RepReturns = () => {
  const [goodOrders] = useState([
    { id: 1, shop_name: 'A Shop', created_at: '3/4/2027', user_name: 'ARaheem', status: 'Distributed', total_price: 1500.00 },
    { id: 2, shop_name: 'B Shop', created_at: '13/4/2025', user_name: 'BRaheem', status: 'Distributed', total_price: 2500.00 },
    { id: 3, shop_name: 'Dilshan Shop', created_at: '3/4/2025', user_name: 'DRaheem', status: 'Pending', total_price: 1800.00 },
  ]);

  const [badOrders] = useState([
    { id: 101, shop_name: 'X Shop', created_at: '4/5/2025', user_name: 'XRaheem', status: 'Returned', total_price: 1000.00 },
    { id: 102, shop_name: 'Y Shop', created_at: '6/5/2025', user_name: 'YRaheem', status: 'Returned', total_price: 2000.00 },
    { id: 103, shop_name: 'Z Shop', created_at: '7/5/2025', user_name: 'ZRaheem', status: 'Bad Item', total_price: 500.00 },
  ]);

  const [showGoodOrders, setShowGoodOrders] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const ordersToFilter = showGoodOrders ? goodOrders : badOrders;

  const filteredOrders = ordersToFilter
    .sort((a, b) => {
      const dateA = new Date(a.created_at.split('/').reverse().join('/'));
      const dateB = new Date(b.created_at.split('/').reverse().join('/'));
      return dateB - dateA;
    })
    .filter(order =>
      order.created_at.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shop_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.total_price.toString().includes(searchQuery) ||
      order.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        window.innerWidth <= 768 &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(window.innerWidth <= 768 ? 10 : 6);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 480) {
        setOrdersPerPage(8);
      } else if (width > 480 && width <= 768) {
        setOrdersPerPage(10);
      } else {
        setOrdersPerPage(6);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, showGoodOrders]);

  return (
    <div className="RepOrders">
      <RepSideBar isOpen={sidebarOpen} ref={sidebarRef} />
      <div className="RepOrdersContainer">
        <RepNavbar onMenuClick={toggleSidebar} />
        <div className="RepOrdersTableContainer">
          <div className="RepOrdersTableTop">
            <h1>{showGoodOrders ? 'Good Orders' : 'Bad Orders'}</h1>
          </div>

          <div className="toggle-switch-container">
            <button 
              className={`toggle-button ${showGoodOrders ? 'active' : ''}`} 
              onClick={() => setShowGoodOrders(true)}
            >
              Good Orders
            </button>
            <button 
              className={`toggle-button ${!showGoodOrders ? 'active' : ''}`} 
              onClick={() => setShowGoodOrders(false)}
            >
              Bad Orders
            </button>
          </div>

          <div className="RepOrdersTable">
            <div className='RepOrdersSearchContainer'>
              <input
                type="text"
                placeholder="Search Orders..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="RepOrdersSearchInput"
              />
              <SearchIcon className='RepOrdersSearchIcon' />
            </div>

            <div className="RepOrdersTableScroll">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Shop</th>
                    <th className="HideMobile">Rep Name</th>
                    <th className="HideTab">Total (LKR)</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map(order => (
                    <tr key={order.id}>
                      <td>{order.created_at}</td>
                      <td>{order.shop_name}</td>
                      <td className="HideMobile">{order.user_name}</td>
                      <td className="HideTab">{order.total_price}</td>
                      <td>{order.status}</td>
                      <td><button className="OrderTableViewButton">View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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
    </div>
  );
};

export default RepReturns;