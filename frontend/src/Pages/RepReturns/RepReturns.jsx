import React, { useState } from 'react'
import './RepReturns.css'
import RepNavbar from "../../components/RepNavbar/RepNavbar"
import RepSidebar from "../../components/Sidebar/RepSidebar/RepSidebar"


const RepReturns = () => {
    const [returns, setReturns] = useState([
        { id: 1, shop: 'Shop', item: 'Chil Powder', weight: '50', qty: '5', type: 'Good', date: '2023/01/10' },
        { id: 2, shop: 'Shop', item: 'Chil Powder', weight: '100', qty: '10', type: 'Bad', date: '2023/01/10' },
        { id: 3, shop: 'Shop', item: 'Chil Powder', weight: '500', qty: '8', type: 'Bad', date: '2023/01/10' },
        { id: 4, shop: 'Shop', item: 'Chil Powder', weight: '50', qty: '6', type: 'Good', date: '2023/01/10' },
        { id: 5, shop: 'Shop', item: 'Chil Powder', weight: '100', qty: '10', type: 'Bad', date: '2023/01/10' },
        { id: 6, shop: 'Shop', item: 'Chil Powder', weight: '500', qty: '8', type: 'Bad', date: '2023/01/10' },
        { id: 7, shop: 'Shop', item: 'Chil Powder', weight: '50', qty: '6', type: 'Good', date: '2023/01/10' },
    ]);
    
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