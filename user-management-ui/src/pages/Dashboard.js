const Dashboard = () => {
    return (
        <div className="grid grid-cols-4 gap-4 bg-gray-200 p-4 border border-gray-300">
        {/* Row 1 */}
        <div className="bg-gray-700 text-white p-4">Column 1, Row 1</div>
        <div className="bg-gray-600 p-4">Column 2, Row 1</div>
        <div className="bg-gray-600 p-4">Column 3, Row 1</div>
        <div className="bg-gray-700 text-white p-4">Column 4, Row 1</div>
  
        {/* Row 2 */}
        <div className="bg-gray-700 text-white p-4">Column 1, Row 2</div>
        <div className="bg-gray-600 p-4">Column 2, Row 2</div>
        <div className="bg-gray-600 p-4">Column 3, Row 2</div>
        <div className="bg-gray-700 text-white p-4">Column 4, Row 2</div>
  
        {/* Add more rows as needed */}
      </div>
    );
  };
  
  export default Dashboard;