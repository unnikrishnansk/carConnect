import React, { useState, useEffect } from 'react';

const Loader = () => {
  const [showLoader, setShowLoader] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowLoader(false);
//     }, 5000); // 5000 milliseconds = 5 seconds

//     return () => clearTimeout(timer);
//   }, []);

  return (
    <>
    <div class="d-flex justify-content-center">
    <div class="spinner-border text-info m-5" role="status">
        <span class="sr-only">Loading...</span>
    </div>
    </div>
    <div className='d-flex justify-content-center text-center'>
    <h1 className='m-3 text-info w-75'>Thankyou for your patience...We are trying hard to find a Driver for you...</h1>
    </div>
    </>
)
};

export default Loader;
