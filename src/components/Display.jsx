import React, { useEffect, useState } from 'react';

const Display = () => {
    const [data, setData] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/extra-task')
        .then(res=>res.json())
        .then(data=>setData(data))
    },[])
    return (
        <div className='bg-green-600'>
            <p>Number of data: {data.length}</p>
            {
                data.map(singleData=>
                <p key={singleData._id} >{singleData.title}
                </p>
                )
            }
        </div>
    );
};

export default Display;