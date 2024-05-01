import React, { useState, useEffect } from 'react';

function App() {
  const [employeeData, setEmployeeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setEmployeeData(data);
      setLoading(false);
    } catch (error) {
      alert('Failed to fetch data');
      setLoading(false);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages()) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPages = () => {
    return Math.ceil(employeeData.length / 10);
  };

  const renderTable = () => {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = Math.min(startIndex + 10, employeeData.length);
    const pageData = employeeData.slice(startIndex, endIndex);

    return (
      <table style={{ border: '1px solid lightgray', borderCollapse: 'collapse', width: '90%', margin: '10px auto' }}>
        <thead>
          <tr style={{ backgroundColor: 'lightgreen' }}>
            <th style={{ textAlign: 'left', border: '1px solid lightgray', padding: '8px' }}>ID</th>
            <th style={{ textAlign: 'left', border: '1px solid lightgray', padding: '8px' }}>Name</th>
            <th style={{ textAlign: 'left', border: '1px solid lightgray', padding: '8px' }}>Email</th>
            <th style={{ textAlign: 'left', border: '1px solid lightgray', padding: '8px' }}>Role</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map(employee => (
            <tr key={employee.id} style={{ border: '1px solid lightgray' }}>
              <td style={{ textAlign: 'left', border: '1px solid lightgray', padding: '8px' }}>{employee.id}</td>
              <td style={{ textAlign: 'left', border: '1px solid lightgray', padding: '8px' }}>{employee.name}</td>
              <td style={{ textAlign: 'left', border: '1px solid lightgray', padding: '8px' }}>{employee.email}</td>
              <td style={{ textAlign: 'left', border: '1px solid lightgray', padding: '8px' }}>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>Employee Data Table</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {renderTable()}
          <div style={{ textAlign: 'center' }}>
            <button style={{ backgroundColor: 'lightgreen', margin: '0 10px', padding: '10px 20px' }} onClick={prevPage} disabled={currentPage === 1}>Previous</button>
            <span style={{ margin: '0 10px', fontSize: '20px' }}>{currentPage}</span>
            <button style={{ backgroundColor: 'lightgreen', margin: '0 10px', padding: '10px 20px' }} onClick={nextPage} disabled={currentPage === totalPages()}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
