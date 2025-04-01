// import React from 'react'
// import './Returns.css'
// import Sidebar from '../../components/Sidebar/AdminSidebar/AdminSidebar'

// const Returns = () => {
//     const [retuens, setReturns] = useState([
//         { id: 1, shop: 'Shop', Item: 'Chil Powder', Weight: '58g', QTY: '50', Type:"Good", Date:'3/4/2001' },
        
    
//       ]);
    
//       // Pagination state
//       const [currentPage, setCurrentPage] = useState(1);
//       const [retuensPerPage] = useState(5);
      
//       // Calculate current orders to display
//       const indexOfLastOrder = currentPage * retuensPerPage;
//       const indexOfFirstOrder = indexOfLastOrder - retuensPerPage;
//       const currentOrders = retuens.slice(indexOfFirstOrder, indexOfLastOrder);
      
//       // Change page
//       const paginate = (pageNumber) => setCurrentPage(pageNumber);
      
//       // Calculate total pages
//       const totalPages = Math.ceil(retuens.length / retuensPerPage);
//   return (
//     <div>
//         <div>
//             <Sidebar/>
//         </div>
//         <div className='returns-title'>
//          <h1>Returns</h1>
//         </div>
//         <div className='btn-r'>
//           <button className='history-btn'>Good !</button>
//         </div>
//         <div className='btn--r'>
//            <button className='add-new-btn'>Bad !</button>
//         </div>

//         <div className="order-table-container">
//         <table className="order-table">
//             <thead>
//             <tr>
//                 <th>Shop</th>
//                 <th>Item</th>
//                 <th>Weight(g)</th>
//                 <th>QTY</th>
//                 <th>Type</th>
//                 <th>Date</th>
//                 <th></th>
//             </tr>
//             </thead>
//             <tbody>
//             {currentOrders.map(retuens => (
//                 <tr key={retuens.id}>
//                 <td>{retuens.shop}</td>
//                 <td>{retuens.Item}</td>
//                 <td>{retuens.Weight}</td>
//                 <td>{retuens.QTY}</td>
//                 <td>{retuens.Type}</td>
//                 <td>{retuens.Date}</td>
//                 <td>
//                     <button className="view-btn1">Delete</button>
//                 </td>
//                 </tr>
//             ))}
//             </tbody>
//         </table>
        
//         <div className="pagination-container">
//             <button 
//             className="pagination-arrow" 
//             onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
//             disabled={currentPage === 1}
//             >
//             &lt;
//             </button>
            
//             {[...Array(totalPages).keys()].slice(0, 5).map(number => (
//             <button
//                 key={number + 1}
//                 onClick={() => paginate(number + 1)}
//                 className={`pagination-number ${currentPage === number + 1 ? 'active' : ''}`}
//             >
//                 {number + 1}
//             </button>
//             ))}
            
//             <button className="pagination-ellipsis">...</button>
            
//             <button className="pagination-number">40</button>
            
//             <button 
//             className="pagination-arrow" 
//             onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
//             disabled={currentPage === totalPages}
//             >
//             &gt;
//             </button>
//         </div>
//         </div>
        
        
        
        
//     </div>
//   )
// }

// export default Returns

import React, { useState } from 'react'
import './Returns.css'
import Sidebar from '../../components/Sidebar/AdminSidebar/AdminSidebar'

const Returns = () => {
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
              <Sidebar/>
          </div>
          <div className='returns-title'>
           <h1>Returns</h1>
          </div>
          <div className='btn-re'>
            <button className='good-btn'>Good</button>
          </div>
          <div className='btn--re'>
             <button className='bad-btn'>Bad</button>
          </div>

          <div className="returns-table-container">
            <table className="returns-table">
                <thead>
                <tr>
                    <th>Shop</th>
                    <th>Item</th>
                    <th>Weight(g)</th>
                    <th>QTY</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th></th>
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
                          className="dlt-btn"
                          onClick={() => handleDelete(returnItem.id)}
                        >
                          Delete
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
          
            <div className="pagination-container-returns">
                <button 
                className="pagination-arrow-returns" 
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
                >
                &lt;
                </button>
                
                {[...Array(totalPages).keys()].slice(0, 5).map(number => (
                <button
                    key={number + 1}
                    onClick={() => paginate(number + 1)}
                    className={`pagination-number-returns ${currentPage === number + 1 ? 'active' : ''}`}
                >
                    {number + 1}
                </button>
                ))}
                
                {totalPages > 5 && <button className="pagination-ellipsis-returns">...</button>}
                
                {totalPages > 5 && (
                  <button 
                    className="pagination-number-returns"
                    onClick={() => paginate(totalPages)}
                  >
                    {totalPages}
                  </button>
                )}
                
                <button 
                className="pagination-arrow-returns" 
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

export default Returns