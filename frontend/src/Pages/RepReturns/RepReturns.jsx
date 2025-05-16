import React, { useState } from 'react'
import './RepReturns.css'
import RepNavbar from "../../components/RepNavbar/RepNavbar"
import RepSidebar from "../../components/Sidebar/RepSidebar/RepSidebar"
import SearchIcon from '@mui/icons-material/Search';

const RepReturns = () => {
  const [goodreturns, setGoodReturns] = useState([
    { id: 1, shop_name: 'A Shop', created_at: '3/4/2027', return_cost: 1500.00 },
    { id: 2, shop_name: 'B Shop', created_at: '13/4/2025', return_cost: 2500.00 },
    { id: 3, shop_name: 'Dilshan Shop', created_at: '3/4/2025', return_cost: 1800.00 },
    { id: 4, shop_name: 'C Shop', created_at: '30/4/2027', return_cost: 2500.00 },
    { id: 5, shop_name: 'F Shop', created_at: '3/2/2025', return_cost: 12500.00 },
    { id: 6, shop_name: 'Y Shop', created_at: '31/1/2025', return_cost: 22500.00 },
    { id: 7, shop_name: 'S Shop', created_at: '13/4/2027', return_cost: 20500.00 },
    { id: 8, shop_name: 'Wijaya Shop', created_at: '3/4/2025', return_cost: 1300.00 },
    { id: 9, shop_name: 'Q Shop', created_at: '3/4/2020', return_cost: 52500.00 },
    { id: 10, shop_name: 'AB Shop', created_at: '3/4/2025', return_cost: 13500.00 },
    { id: 11, shop_name: 'CD Shop', created_at: '3/4/2025', return_cost: 26500.00 },
  ].sort((a, b) => {
    const dataA = new Date(a.created_at.split('/').reverse().join('/'));
    const dataB = new Date(b.created_at.split('/').reverse().join('/'));
    return dataB - dataA;
  }));

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar when clicking outside
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

  const [searchQuery, setSearchQuery] = useState('');
  const filteredReturns = orders.filter(order =>
    order.created_at.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.shop_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.total_price.toString().includes(searchQuery) ||
    order.status.toLowerCase().includes(searchQuery.toLowerCase())
  );
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [returnsPerPage] = useState(5);
    
    // Calculate current returns to display
    const indexOfLastReturn = currentPage * returnsPerPage;
    const indexOfFirstReturn = indexOfLastReturn - returnsPerPage;
    const currentReturns = returns.slice(indexOfFirstReturn, indexOfLastReturn);
    
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    // Calculate total pages
    const totalPages = Math.ceil(returns.length / returnsPerPage);

    // Handle delete function
    const handleDelete = (id) => {
      const updatedReturns = returns.filter(item => item.id !== id);
      setReturns(updatedReturns);
    };

    return (
      <div>
          <div>
              <RepSidebar/>
          </div>
          <div>
              <RepNavbar/>
          </div>
          <div className='repreturns-title'>
           <h1>Returns</h1>
          </div>
          <div className='repbtn-re'>
            <button className='repgood-btn'>Good</button>
          </div>
          <div className='repbtn--re'>
             <button className='repbad-btn'>Bad</button>
          </div>

          <div className="repreturns-table-container">
            <table className="repreturns-table">
                <thead>
                <tr>
                    <th>Shop</th>
                    <th>Item</th>
                    <th>Weight(g)</th>
                    <th>QTY</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {currentReturns.map(returnItem => (
                    <tr key={returnItem.id}>
                    <td>{returnItem.shop}</td>
                    <td>{returnItem.item}</td>
                    <td>{returnItem.weight}</td>
                    <td>{returnItem.qty}</td>
                    <td>{returnItem.type}</td>
                    <td>{returnItem.date}</td>
                    <td>
                        <button 
                          className="repdlt-btn"
                          onClick={() => handleDelete(returnItem.id)}
                        >
                          Delete
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
          
            <div className="reppagination-container-returns">
                <button 
                className="reppagination-arrow-returns" 
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
                >
                &lt;
                </button>
                
                {[...Array(totalPages).keys()].slice(0, 5).map(number => (
                <button
                    key={number + 1}
                    onClick={() => paginate(number + 1)}
                    className={`reppagination-number-returns ${currentPage === number + 1 ? 'active' : ''}`}
                >
                    {number + 1}
                </button>
                ))}
                
                {totalPages > 5 && <button className="reppagination-ellipsis-returns">...</button>}
                
                {totalPages > 5 && (
                  <button 
                    className="reppagination-number-returns"
                    onClick={() => paginate(totalPages)}
                  >
                    {totalPages}
                  </button>
                )}
                
                <button 
                className="reppagination-arrow-returns" 
                onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                disabled={currentPage === totalPages}
                >
                &gt;
                </button>
            </div>
          </div>
      </div>
    )
}

export default RepReturns