import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './MapContainer.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearPlaceCredentials, setDistanceCredentials, setEndPlaceCords, setEndPlaceCredentials, setStartPlaceCords, setStartPlaceCredentials } from '../../Slices/placeSlice';
import { faLocation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MapDestRender = () => {

  const { startplaceInfo } = useSelector((state)=>state.place);
  console.log("start", startplaceInfo);

  mapboxgl.accessToken = 'pk.eyJ1IjoidW5uaWtyaXNobmFuODA3NSIsImEiOiJjbHRpZTlmcXAwYWpkMmtxd2JwOXJveXAyIn0.IOfM5FIc6EnW86dMN3-DyA';

  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const searchInput = useRef(null);

  const [lng, setLng] = useState(77.55);
  const [lat, setLat] = useState(12.95);
  const [zoom, setZoom] = useState(10);
  const [placeName, setPlaceName] = useState('');
  const [startLocation, setStartLocation] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(startLocation);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      console.log('Clicked at:', lng, lat);
        setStartLocation({ lng, lat });
      updateLocation(lng, lat);
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: true
    });

    
    searchInput.current.appendChild(geocoder.onAdd(map.current));

    if (searchInput.current) {
      searchInput.current.style.width = '250px';
      searchInput.current.style.height = '200px';
    }

    geocoder.on('result', (e) => {
      const { lng, lat } = e.result.geometry.coordinates;
      updateLocation(lng, lat);
        setStartLocation({ lng, lat });
    });
    
  }, []);

  const updateLocation = async (lng, lat) => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      console.log(data.query);
      const firstFeature = data.features[0];
      if (firstFeature) {
        const name = firstFeature.place_name;
        setPlaceName(name);
          dispatch(setStartPlaceCredentials(name));
          dispatch(setStartPlaceCords(data.query));
        navigate('/');
      }
    };

    if (marker.current) {
      marker.current.remove();
    }

    marker.current = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);

    setLng(lng);
    setLat(lat);

    fetchData();
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { longitude, latitude } = position.coords;
        updateLocation(longitude, latitude);
          setStartLocation({ lng, lat });
      }, error => {
        console.error('Error getting current location:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const theme = {
    variables: {
      fontFamily: 'Avenir, sans-serif',
      unit: '14px',
      padding: '0.5em',
      borderRadius: '0',
      boxShadow: '0 0 0 1px silver',
    }
  };


  return (
    <>
      <div>
       
        <div className='d-flex'>
        <div className="search-container mt-3 ml-3" ref={searchInput } theme={theme} />
       
        <button onClick={getCurrentLocation} className='btn btn-success btn-md m-3 get-current-location' > <FontAwesomeIcon icon={faLocation} className="fa-lg me-3 fa-fw" />Current Location</button>
        </div>
        <div ref={mapContainer} className="map-container"/>
      
      </div>
    </>
  );
};

export default MapDestRender;
