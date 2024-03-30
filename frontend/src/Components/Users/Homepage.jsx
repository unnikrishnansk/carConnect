import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import './Homepage.css';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './MapContainer.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setDistanceCredentials, setDurationCredentials } from '../../Slices/placeSlice';
import { useGetReviewQuery } from '../../Slices/userApiSlice';
import Footer from './Footer';
// import { useGetBalanceQuery } from '../../Slices/userApiSlice';

const Homepage = () => {

  const [distance,setDistance] = useState(null);
  const [duration,setDuration] = useState(null);

  const { userInfo } = useSelector((state)=>state.auth);
  const { startplaceInfo } = useSelector((state)=>state.place);
  const { destplaceInfo } = useSelector((state)=>state.place);
  const { startplaceCord } = useSelector((state)=>state.place);
  const { destplaceCord } = useSelector((state)=>state.place);
  console.log(startplaceCord,destplaceCord);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data:reviews, refetch } = useGetReviewQuery();
  console.log(reviews);

  mapboxgl.accessToken = 'pk.eyJ1IjoidW5uaWtyaXNobmFuODA3NSIsImEiOiJjbHRpZTlmcXAwYWpkMmtxd2JwOXJveXAyIn0.IOfM5FIc6EnW86dMN3-DyA';

  useEffect(() => {
    const getDistance = async () => {
      if (startplaceCord && destplaceCord) {
        console.log(startplaceCord[0],startplaceCord[1]);
        // Use a distance calculation service to calculate the distance between start and end locations
        const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${startplaceCord[0]},${startplaceCord[1]};${destplaceCord[0]},${destplaceCord[1]}?access_token=${mapboxgl.accessToken}`);
        const data = await response.json();
        console.log('Data:', data);
        const hour = Math.floor(data?.routes[0]?.duration / 3600).toFixed(0);
        const minutes = (((data?.routes[0]?.duration)%3600)/60).toFixed(0);
        const time = `${hour} hr ${minutes} mins`
        setDuration(time);
        setDistance(((data?.routes[0]?.distance)/1000).toFixed(0));
        console.log(time);
        dispatch(setDurationCredentials(time));
        dispatch(setDistanceCredentials(((data?.routes[0]?.distance)/1000).toFixed(0)));
        console.log('Distance:', data?.routes[0]?.distance);
        console.log('Distance:', data?.routes[0]?.duration);
        // dispatch(setDistanceCredentials(data?.routes[0]?.distance));
      }
    }

    getDistance();
  }, [startplaceCord,destplaceCord])

  const HandleOpenMap = () =>{
    navigate('/map');
  }

  const HandleBookNow = async () =>{
    if(startplaceInfo===destplaceInfo){
      toast.error("Source place and Destination cannot be same");
      return;
    }
    navigate('/vehiclelist')
  }

  return (
    <>
    < Navbar />
    

<section className="home-about-area section-gap">
  <div className="container">

              <form>
                <div className='d-flex '>
                {/* <h5>Booking</h5> */}
								<div className="row">
									<div className="col-sm-6">
											<input
                        className="h-100"
                        type="text" 
                        placeholder='Where from?'
                        defaultValue={startplaceInfo === null ? "" : startplaceInfo}
                        onClick={HandleOpenMap} 
                        required />
										</div>
									<div className="col-sm-6">
											<input
                      className="h-100" 
                      type="text" 
                      placeholder='Where to?'
                      defaultValue={destplaceInfo === null ? "" : destplaceInfo}
                      onClick={HandleOpenMap}  
                      required />
										</div>
								</div>
									<button 
                  className="btn btn-primary btn-md ml-3"
                  onClick={HandleBookNow}
                  >
                    Book Now
                  </button>
								</div>
							</form>
{ startplaceInfo && destplaceInfo ? (
  <>
  <p className='mt-2 text-dark text-start '>Total Distance to be covered - {distance} kms</p>
  <p className='text-dark text-start'>Total Time taken for the journey - {duration}</p>
  </>
) : (
  <>
  </>
)}
    <div className="row align-items-center">
      <div className="col-lg-6 about-left">
        <img className="img-fluid" src="https://plus.unsplash.com/premium_photo-1670985849617-ce4853d4a533?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      </div>
      <div className="col-lg-6 about-right">
        <h1>Globally Connected by Large Network</h1>
        <h4>We are here to listen from you deliver exellence</h4>
        <p>
          Embark on journeys with confidence as our extensive network spans across the globe. From bustling metropolises to tranquil destinations, our reach ensures that you can seamlessly book rides wherever you go.
        </p>
         {/* <a className="text-uppercase primary-btn" href="#">Get Details</a>  */}
      </div>
    </div>
  </div>
</section>

<section className="services-area pb-120">
  <div className="container">
    <div className="row section-title">
      <h1>What Services we offer to our clients</h1>
    </div>
    <div className="row">
      <div className="col-lg-4 single-service">
        <span className="lnr lnr-car"></span>
        <a href="#"><h4>Taxi Service</h4></a>
        <p>
          Enjoy the ease of booking a taxi within seconds. Our user-friendly interface ensures a smooth and hassle-free experience, allowing you to focus on your journey ahead.
        </p>
      </div>
      <div className="col-lg-4 single-service">
        <span className="lnr lnr-briefcase"></span>
        <a href="#"><h4>Office Pick-ups</h4></a>
        <p>
          Streamline your workday with our easy-to-use scheduling feature. Plan your office pickups in advance, ensuring a timely and efficient commute for you and your colleagues.
        </p>
      </div>
      <div className="col-lg-4 single-service">
        <span className="lnr lnr-bus"></span>
        <a href="#"><h4>Event Transportation</h4></a>
        <p>
          Tailor transportation routes to match the unique needs of your event. Add multiple stops and create a customized itinerary that ensures smooth transitions for attendees.
        </p>
      </div>
    </div>
  </div>
</section>

<section className="reviews-area section-gap">
  <div className="container">
    <div className="row section-title">
      <h1>Client’s Reviews</h1>
    </div>
    <div className="row w-100">
      <div className="col-lg-12 col-md-6 reviews-grid w-100">
      {reviews && reviews.map((rev,index)=>{
            return(
        <div className="single-review ml-2" key={index}>
          
            <h4>{rev.reviewUser.toUpperCase()}</h4>
            <p>
              {rev.reviewText}
            </p>
            <div className="star">
            {[...Array(rev.reviewRating)].map((_, index) => (
    <FontAwesomeIcon key={index} icon={faStar} className="fa-lg me-3 fa-fw" />
))}
            
          </div>
          {/* <p>Rating :- {rev.reviewRating}</p> */}
          </div>
            
            )
          })}
        
      </div>
    </div>
  </div>
</section>

<Footer />

    </>

    
    
  )
}

export default Homepage;