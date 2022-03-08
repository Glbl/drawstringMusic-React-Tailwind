import React from 'react';

const MethodFilter = ({
  column: {
  filterValue, setFilter, preFilteredRows, id, splitByComma,
  },
}) => {
  const methods = [
    { title: 'USD', color: '#18C684'},
    { title: 'STX', color: '#5546FF'}
  ];

  const handleSelect = (item) => {
    setFilter(item.title);
  };

  return (
    <div className="w-52 relative bg-black shadow-md rounded-lg">
      {
        methods.map((item, index) => (
          <div key={index} className="flex items-center p-2 cursor-pointer hover:bg-gray-800 rounded-lg" onClick={() => handleSelect(item)}>
            <div className="h-4 w-4 rounded-full" style={{ backgroundColor: item.color }} />
            <div className="text-white text-sm pl-3">{item.title}</div>
          </div>
        ))
      }
    </div>
  );
};

export default MethodFilter;