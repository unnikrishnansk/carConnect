import React, { useEffect, useState, useRef } from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './RideDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { useGetRideDetailMutation } from '../../Slices/userApiSlice';
import { clearRideCredentials } from '../../Slices/rideSlice';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';

const RideDetails = () => {

    const [rideHistory,setRideHistory] = useState([]);

    const mapContainerRef = useRef(null);
    const [mapInitialized, setMapInitialized] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const { rideInfo } = useSelector((state)=>state.ride);
    const { userInfo } = useSelector((state)=>state.auth);
    const { startplaceCord } = useSelector((state)=>state.place);
    const { destplaceCord } = useSelector((state)=>state.place);
    const rideUser = userInfo?.name;
    const [getRideDetails, {isError, refetch}] = useGetRideDetailMutation();

    useEffect(() => {
        const getRides = async () => {
            const rides = await getRideDetails({rideUser}).unwrap();
            console.log(rides);
            setRideHistory(rides);
            dispatch(clearRideCredentials())
        }
        getRides();
    }, [])

   useEffect(() => {

    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoidW5uaWtyaXNobmFuODA3NSIsImEiOiJjbHRpZTlmcXAwYWpkMmtxd2JwOXJveXAyIn0.IOfM5FIc6EnW86dMN3-DyA';

    const mapboxToken = 'pk.eyJ1IjoidW5uaWtyaXNobmFuODA3NSIsImEiOiJjbHRpZTlmcXAwYWpkMmtxd2JwOXJveXAyIn0.IOfM5FIc6EnW86dMN3-DyA';

    console.log(startplaceCord[0],startplaceCord[1]);

    const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [startplaceCord[0], startplaceCord[1]], // Source location
        zoom: 12,
    });

    map.on('load', () => {
      setMapInitialized(true);
  });

    // const directions = new mapboxgl.Directions({
    //     accessToken: mapboxgl.accessToken,
    //     unit: 'metric',
    //     profile: 'mapbox/driving',
    //     controls: { instructions: true },
    // });

    // map.addControl(directions, 'top-left');

    // // Set source and destination
    // directions.setOrigin(startplaceCord);
    // directions.setDestination(destplaceCord);

    if (mapInitialized) {
      fetchRoute(startplaceCord, destplaceCord, mapboxToken)
          .then(route => {
              drawRoute(route, map);
          })
          .catch(error => {
              console.error('Error fetching route:', error);
          });
  }

    return () => map.remove();
}, [startplaceCord, destplaceCord, mapInitialized]);

const fetchRoute = async (start, end, token) => {
  console.log("start",start,"end",end,"token",token);
  const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${start[0]+0.01},${start[1]+0.01}?geometries=geojson&steps=true&access_token=${token}`);
  const data = await response.json();
  return data.routes[0];
};

const drawRoute = (route, map) => {

  console.log("Route:", route);
  console.log("map",map);
  if (!route || !route.geometry) {
    console.error('Route or geometry is undefined');
    return;
  }

  // Add pointer for starting point
  new mapboxgl.Marker()
  .setLngLat(startplaceCord)
  .addTo(map);

// Add pointer for ending point
new mapboxgl.Marker()
  .setLngLat(destplaceCord)
  .addTo(map);

  const coordinates = route.geometry.coordinates;
  console.log(coordinates);
  map.addLayer({
    id: 'route',
    type: 'line',
    source: {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: coordinates
        }
      }
    },
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#3887be',
      'line-width': 5,
      'line-opacity': 0.75
    }
  });

};

    console.log(rideHistory);

    const formatTime = (createdAt) => {
      const formattedTime = (new Date(createdAt)).toLocaleString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
      });
      return formattedTime;
  };

  // const handleTrack = () => {
  //   navigate('/trackdriver');
  // }

  return (
    <>
    <Navbar />
    <div className='d-flex align-items-stretch'>
    <Sidebar />
    <div class="container">
      <div className="box border border-3 border-dark rounded m-3 text-dark" >
      {rideHistory && rideHistory.map(ride => (
                <div key={ride.id} className='ride-details border-dark'>
                     {ride.isAccepted===false && ride.isRejected===false && ride.isCompleted===false && <p className='fw-bold text-warning '>Waiting for Driver confirmation!!.. Confirm OTP :- {ride.rideOtp}</p>}
                     {ride.isAccepted===false && ride.isRejected===true && ride.isCompleted===false && <p className='fw-bold text-danger '>Driver rejected Ride!.. The amount deducted will be credited back..</p>}
                     {ride.isAccepted===true && ride.isRejected===false && ride.isCompleted===false && <><p className='fw-bold text-primary '>Driver on the way!.. Confirm OTP :- {ride.rideOtp}</p>
                     <div ref={mapContainerRef} style={{ width: '75%', height: '300px' }} />
                     {/* <button className='btn btn-primary btn-md' onClick={handleTrack}>Track</button> */}
                     </>}
                     {ride.isAccepted===true && ride.isRejected===false && ride.isCompleted===true && <>
                      <p className='fw-bold text-success '>Hope you enjoyed Ride!.. Come back soon..</p>
                      {/* <button className='btn btn-primary btn-md' onClick={handleReview}>Review</button> */}
                     </>}
                    
                    <p>Ride ID: {ride.id}</p>
                    <p>From: {ride.rideFrom}</p>
                    <p>To: {ride.rideTo}</p>
                    {/* <p>{ride.rideOtp}</p> */}
                    <p>Driver: {ride.rideDriver}</p>
                    <p>Booking Time : {formatTime(ride.createdAt)}</p>
                    {/* Add more details as needed */}
                </div>
            ))}
       
        <div className="btns p-2">
          {/* <button className='btn btn-primary btn-md'>Details</button> */}
          {/* <button className='btn btn-primary btn-md ml-2'>Subscribe</button> */}
        </div>
      </div>
    </div>

    </div>
    </>
  )
}

export default RideDetails;