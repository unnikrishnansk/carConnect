import React from 'react'

const DriverFooter = () => {
  return (
    <>
    <div className="container my-5">

<footer
        className="text-center text-lg-start text-dark shadow-lg w"
        style={{backgroundColor: 'grey'}}
        >
  
  <div className="container p-4 pb-0">
  
    <section className="">
  
      <div className="row">
       
        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
          <h6 className="text-uppercase mb-4 font-weight-bold">
            CarConnect
          </h6>
          <p>
            Ride to anywhere with carConnect
          </p>
        </div>
      

        <hr className="w-100 clearfix d-md-none" />

      
        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
          <h6 className="text-uppercase mb-4 font-weight-bold">Products</h6>
          <p>
            <a className="text-dark">Rides</a>
          </p>
          <p>
            <a className="text-dark">Map</a>
          </p>
          <p>
            <a className="text-dark">Easy Payments</a>
          </p>
          <p>
            <a className="text-dark">Regularly expanding</a>
          </p>
        </div>
      

        <hr className="w-100 clearfix d-md-none" />

    
        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
          <h6 className="text-uppercase mb-4 font-weight-bold">
            Useful links
          </h6>
          <p>
            <a className="text-dark">Profile</a>
          </p>
          <p>
            <a className="text-dark">About</a>
          </p>
          <p>
            <a className="text-dark">Home</a>
          </p>
          <p>
            <a className="text-dark">Help</a>
          </p>
        </div>

     
        <hr className="w-100 clearfix d-md-none" />

     
        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
          <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
          <p><i className="fas fa-home mr-3"></i> New York, NY 10012, US</p>
          <p><i className="fas fa-envelope mr-3"></i> info@gmail.com</p>
          <p><i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
          <p><i className="fas fa-print mr-3"></i> + 01 234 567 89</p>
        </div>
      
      </div>
     
    </section>


    <hr className="my-3"/>

    <section className="p-3 pt-0">
      <div className="row d-flex align-items-center">
     
        <div className="col-md-7 col-lg-8 text-center text-md-start">
      
          <div className="p-3">
            © 2024 Copyright:
            <a className="text-dark" href="https://mdbootstrap.com/"
               >carConnect.com </a>
          </div>
       
        </div>
      
        <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
      
          <a
             className="btn btn-outline-light btn-floating m-1 text-light"
             role="button"
             ><i className="fab fa-facebook-f"></i
            ></a>

          <a
             className="btn btn-outline-light btn-floating m-1 text-light"
             role="button"
             ><i className="fab fa-twitter"></i
            ></a>

          <a
             className="btn btn-outline-light btn-floating m-1 text-light"
             role="button"
             ><i className="fab fa-google"></i
            ></a>

         
          <a
             className="btn btn-outline-light btn-floating m-1 text-light"
             role="button"
             ><i className="fab fa-instagram"></i
            ></a>
        </div>
       
      </div>
    </section>

  </div>
 
</footer>

</div>
    </>
  )
}

export default DriverFooter