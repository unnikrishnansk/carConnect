import React, { useEffect, useState, useRef } from 'react'
import Navbar from '../Users/Navbar';
import DriverSidebar from './DriverSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useVehicleListMutation } from '../../Slices/userApiSlice';
import { Link, useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import { setAvailableVehicleCredentials } from '../../Slices/SelectedVehicle';
import { setCarType } from '../../Slices/placeSlice';

const DriverMap = () => {

    const mapContainerRef = useRef(null);
    const [mapInitialized, setMapInitialized] = useState(false);
  
      // const [searchText,setSearchText] = useState('');
      const [ vehiclelists,setVehiclelists ] = useState([]);
  
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
          zoom: 8,
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
    
    const el = document.createElement('div');
    el.className = 'marker';  
  console.log(el);
    // Add pointer for starting point
    new mapboxgl.Marker({color: 'green'})
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
  
    

  return (
    <>
    <Navbar />
    <div className='d-flex align-items-stretch'>
    <DriverSidebar />
    <div ref={mapContainerRef} style={{ width: '100%', height: '500px' }} />
    </div>
    </>
  )
}

export default DriverMap;