import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux'; 

const DriverPrivateroute = () => {
    const { driverInfo } = useSelector((state) => state.driver);

    return driverInfo ? (<Outlet />) : (<Navigate to='/driverlogin' replace />);
}

export default DriverPrivateroute;