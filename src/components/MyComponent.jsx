import React, { useState } from 'react';

const MyComponent = () => {
  const [data, setData] = useState('');

  const handlePostData = async () => {
    try {
      const response = await fetch('http://localhost:5000/extra-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data }) // Change `data` to the data you want to post
      });

      if (response.ok) {
        console.log('Data posted successfully!');
        // Do something else with the response if needed
      } else {
        console.error('Failed to post data:', response.status);
      }
    } catch (error) {
      console.error('Error occurred while posting data:', error);
    }
  };

  const handleChange = (event) => {
    setData(event.target.value);
  };

  return (
    <div>
      <input className='bg-gray-400' type="text" value={data} onChange={handleChange} />
      <button onClick={handlePostData}>Post Data</button>
    </div>
  );
};

export default MyComponent;
