import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useVehicleListMutation } from '../../Slices/userApiSlice';
import { Link, useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import Navbar from './Navbar';
import { setAvailableVehicleCredentials } from '../../Slices/SelectedVehicle';
import { setCarType } from '../../Slices/placeSlice';

const VehicleList = () => {

  const mapContainerRef = useRef(null);
  const [mapInitialized, setMapInitialized] = useState(false);

    // const [searchText,setSearchText] = useState('');
    const [ vehiclelists,setVehiclelists ] = useState([]);
    console.log(vehiclelists)

    const { startplaceInfo } = useSelector((state)=>state.place);
    const { destplaceInfo } = useSelector((state)=>state.place);

    const { startplaceCord } = useSelector((state)=>state.place);
    const { destplaceCord } = useSelector((state)=>state.place);

    const { distance } = useSelector((state)=>state.place);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [ vehiclelist, {isLoading} ] = useVehicleListMutation();

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
  const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&steps=true&access_token=${token}`);
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

  // const markerIcon = document.createElement('div');
  // markerIcon.className = 'marker-icon';
  // markerElement.appendChild(markerIcon);

  // const markerText = document.createElement('div');
  // markerText.className = 'marker-text';
  // markerText.textContent = 'Your Text Here'; // Replace 'Your Text Here' with the text you want to display
  // markerElement.appendChild(markerText);

  // Add pointer for starting point
  new mapboxgl.Marker({color:'green'})
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

    useEffect(() => {
        const ListVehicle = async () =>{
            const res = await vehiclelist({startplaceInfo,destplaceInfo}).unwrap();
            dispatch(setAvailableVehicleCredentials(res));
            setVehiclelists(res.vehicles);
        }

        ListVehicle();
    }, [vehiclelist])

    console.log(vehiclelists);

    const handleCarType = (typeCar) => {
      if(typeCar==="Mini"){
        console.log("car type is mini");
        dispatch(setCarType(typeCar));
        navigate('/payment');
      }
      else if(typeCar==="Sedan"){
        console.log("car type is sedan");
        dispatch(setCarType(typeCar));
        navigate('/payment');
      }
      else{
        console.log("car type is suv");
        dispatch(setCarType(typeCar));
        navigate('/payment');
      }
    }

  return (
    <>
    <Navbar />

<div className='d-flex'>
    <div ref={mapContainerRef} style={{ width: '50%', height: '500px' }} />
        <div className='w-50 h-100'>
      <h2 className='m-3'>Choose a car to continue :-</h2>
      <div className='w-100 d-flex mx-2 align-items-center justify-content-center h-100'>
        <div onClick={()=>handleCarType("Suv")}  className=" h-50 m-2 align-items-center justify-content-center" style={{width: '12rem',background:'white',cursor:'pointer'}}>
          <img className="px-2" style={{width: '150px'}} src="https://cdn-icons-png.flaticon.com/512/9559/9559752.png" alt="Card image cap" />
          <div className="card-body text-center">
            <h5 className=" text-dark">Mini SUV</h5>
            <p className="">Spacious SUV for group travel</p>
            <p className=""> Enjoy, Ertiga, Innova</p>
            <p className="text-dark"> Amount :- <b className='text-dark'>INR {25*distance+1080 } + tax</b></p>
            {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
        </div>
      </div>


      <div onClick={()=>handleCarType("Sedan")}  className=" h-50 m-2 align-items-center justify-content-center" style={{width: '12rem',background:'white',cursor:'pointer'}}>
          <img className="px-2" style={{width: '150px'}} src="https://cdn-icons-png.flaticon.com/512/55/55283.png" alt="Card image cap" />
          <div className="card-body text-center">
            <h5 className=" text-dark">Prime Sedan</h5>
            <p className="">Comfortable sedan with extra legroom</p>
            <p className="">Dzire, Etios, Sunny</p>
            <p className="text-dark"> Amount :- <b className='text-dark'>INR {19*distance+820 } + tax</b></p>
            {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
        </div>
      </div>

    
      <div onClick={()=>handleCarType("Mini")} className=" h-50 m-2 align-items-center justify-content-center" style={{width: '12rem',background:'white', cursor:'pointer'}}>
          <img className="px-2" style={{width: '150px'}} src="https://cdn-icons-png.flaticon.com/512/55/55308.png" alt="Card image cap" />
          <div className="card-body text-center">
            <h5 className=" text-dark">Mini</h5>
            <p className="">Affordable AC cabs with free wi-fi</p>
            <p className="">Indica, Micra, Ritz</p>
            <p className="text-dark"> Amount :- <b className='text-dark'>INR {18*distance+780 } + tax</b></p>
            {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
        </div>
      </div>

      </div>
      </div>
      {/* </div> */}
    {/* )  */}
    {/* } */}
    
    </div>
    </>
  )
}

export default VehicleList;