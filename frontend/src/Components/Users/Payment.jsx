import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Navbar';
import { toast } from 'react-toastify';
import { useGetBalanceQuery, usePaymentMutation } from '../../Slices/userApiSlice';
// import { displayRazorpay } from '../../Services/checkout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setRideCredentials } from '../../Slices/rideSlice';
import { clearPlaceCredentials } from '../../Slices/placeSlice';
import Loader from './Loader';

const Payment = () => {

  const [basefare,setBasefare] = useState(884);
  const [basekm,setBasekm] = useState(40);
  const [remainingbasefare,setRemainingbasefare] = useState(21);
  const [remainingkm,setRemainingkm] = useState(1);
  const [remainingfare,setRemainingfare] = useState(1);
  const [taxes,setTaxes] = useState(662);
  const [estimatedfare,setEstimatedfare] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  // const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [ payment , {isError,isLoading}] = usePaymentMutation();


  const { userInfo } = useSelector((state)=>state.auth);
  console.log(userInfo.name);
  const { availableVehicles } = useSelector((state)=>state.availablevehicles);
  console.log(availableVehicles);

  const { startplaceInfo } = useSelector((state)=>state.place);
  const { destplaceInfo } = useSelector((state)=>state.place);
  const { distance } = useSelector((state)=>state.place);
  const { duration } = useSelector((state)=>state.place);
  const { cartype } = useSelector((state)=>state.place);

  const userid = userInfo?.id;
  console.log(userid);
  const { data:balanceData, refetch } = useGetBalanceQuery(userid);

  console.log(cartype);

  useEffect(() => {
    const remainkm = distance-basekm;
    setRemainingkm(remainkm);
    setRemainingfare(remainkm*remainingbasefare);
    
    if(cartype && cartype==='Suv'){
      const total = 25*distance+1080+taxes;
      setEstimatedfare(total);
    }
    if(cartype && cartype==='Sedan'){
      const total = 19*distance+820+taxes;
      setEstimatedfare(total);
    }
    if(cartype && cartype==='Mini'){
      const total = 18*distance+780+taxes;
      setEstimatedfare(total);
    }
    
    
  }, [distance,remainingfare]);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
};

  const handleSubmit = async () => {
    if(paymentMethod===""){
      toast.error("Enter any payment Method");
      return;
    }
    const data = {
      rideUser : userInfo?.name,
      rideDriver: availableVehicles?.driver[0]?.name,
      rideFrom: startplaceInfo,
      rideTo: destplaceInfo,
      rideAmount: estimatedfare,
      paymentMethod: paymentMethod,
      rideApproximateTime: duration
    }
    if(paymentMethod==="UPI"){
      function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const result = await axios.post("http://localhost:5000/api/users/payment");

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        // const { amount, id: order_id, currency } = result.data;

        const options = {
            key: "rzp_test_0FzeJlcAe5blcS", // Enter the Key ID generated from the Dashboard
            amount: estimatedfare*100,
            currency: "INR",
            name: "carConnect",
            description: "Test Transaction",
            // image: { logo },
            // order_id: order_id,
            // data,
            handler: async function (response) {
                const data = {
                  rideUser : userInfo?.name,
                  // rideDriver: availableVehicles?.driver[0]?.name,
                  rideFrom: startplaceInfo,
                  rideTo: destplaceInfo,
                  rideAmount: estimatedfare,
                  paymentMethod: paymentMethod,
                  rideApproximateTime: duration,
                    // orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };
                console.log(data);
                const result = await axios.post("http://localhost:5000/api/users/payment/success", data);
                console.log(result);
                if(result.data && result.data.id){
                  dispatch(setRideCredentials({...result.data}));
                  toast.success("Payment successful");
                  navigate('/paymentsuccess');
                }else{
                  console.log(result.data); 
                  toast.error("Payment failed");
                  // alert(result.data.msg);
                }
            },
            prefill: {
                name: "Soumya Dey",
                email: "SoumyaDey@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Soumya Dey Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }
    displayRazorpay();
  }
  if(paymentMethod==="COD"){
    const res = await payment(data).unwrap();
    console.log(res);
    navigate('/paymentsuccess');
    dispatch(setRideCredentials({...res}));
  }
  if(paymentMethod==="Wallet"){
     const { BalanceAmount } = balanceData;
     console.log(BalanceAmount);
     if(data.rideAmount > BalanceAmount){
      toast.error("Insufficient Wallet Amount");
      return;
     }
    const res = await payment(data).unwrap();
    console.log(res);
    navigate('/paymentsuccess');
    dispatch(setRideCredentials({...res}));
  }

  // dispatch(clearPlaceCredentials());
    
  }

  //  // Simulate data loading
  //  setTimeout(() => {
  //   setLoading(false);
  // }, 5000); // 5000 milliseconds = 5 seconds

  return (
  <>
  <Navbar />

  {/* {loading ? (<Loader/>) : ( */}
     <section className="h-100">
     <div className="container py-5">
         <div className="toast-container position-fixed top-0 end-0 p-3">
         
         </div>
   
         <div className="row align-items-md-start  my-4">
             <div className="w-100">
                 <div className="card mb-4 w-100">
                     <div className="card-header py-3">
                         <h5 className="mb-0">Summary</h5>
                     </div>
                     <div className="card-body">
                         
                         <div className="row">
                             <div className="col-md-3">
                                 
                             {/* <div className='h-75 w-100 m-4 d-flex'>
   
                               {availableVehicles && availableVehicles?.vehicleURL && availableVehicles?.vehicleURL.map((image, index) => (
                                 <img
                                   key={index}
                                   className='m-3'
                                   src={`http://localhost:5000/${image}`}
                                   alt={`Vehicle Image ${index + 1}`}
                                 />
                               ))}
                              
                             </div> */}
                               
                             </div>
   
                             <div className='m-3 shadow p-3 bg-white rounded text-start ' style={{ fontFamily: 'Arial, sans-serif' }}>
                                 <p className='fw-bold'>PICKUP :-  {startplaceInfo} </p>
                                 <p className='fw-bold'>DROP :-  {destplaceInfo} </p>
                               </div>
                             
                         </div>
                         {
                           cartype && cartype==='Suv' && (
                             <div className="card h-50 w-75 mx-5 align-items-center justify-content-center" style={{width: '18rem',background:'white',cursor:'pointer'}}>
                               <h6 className='mt-2 font-dark'>BOOKING FOR :-</h6>
                             <img className="" style={{width: '270px'}} src="https://cdn-icons-png.flaticon.com/512/9559/9559752.png" alt="Card image cap" />
                             <div className="card-body text-center">
                               <h5 className=" text-dark">Mini SUV</h5>
                               <p className="">Spacious SUV for group travel</p>
                               <p className=""> Enjoy, Ertiga, Innova</p>
                               <p className="text-dark"> Amount :- <b className='text-dark'>INR {25*distance+1080 } + tax</b></p>
                               {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                           </div>
                         </div>
                           )
                         }
   
                         {
                           cartype && cartype==='Sedan' && (
                             <div className="card w-75 h-50 mx-5 align-items-center justify-content-center" style={{width: '18rem',background:'white',cursor:'pointer'}}>
                               <h6 className='mt-2 font-dark'>BOOKING FOR :-</h6>
                               <img className="px-3" style={{width: '270px'}} src="https://cdn-icons-png.flaticon.com/512/55/55283.png" alt="Card image cap" />
                              <div className="card-body text-center">
                                <h5 className=" text-dark">Prime Sedan</h5>
                                <p className="">Comfortable sedan with extra legroom</p>
                                <p className="">Dzire, Etios, Sunny</p>
                                <p className="text-dark"> Amount :- <b className='text-dark'>INR {19*distance+820 } + tax</b></p>
                               {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                           </div>
                         </div>
                           )
                         }
   
                         {
                           cartype && cartype==='Mini' && (
                             <div className="card w-75 h-50 mx-5 align-items-center justify-content-center" style={{width: '18rem',background:'white',cursor:'pointer'}}>
                               <h6 className='mt-2 font-dark'>BOOKING FOR :-</h6>
                               <img className="px-3" style={{width: '270px'}} src="https://cdn-icons-png.flaticon.com/512/55/55308.png" alt="Card image cap" />
                               <div className="card-body text-center">
                                 <h5 className=" text-dark">Mini</h5>
                                 <p className="">Affordable AC cabs with free wi-fi</p>
                                 <p className="">Indica, Micra, Ritz</p>
                                 <p className="text-dark"> Amount :- <b className='text-dark'>INR {18*distance+780 } + tax</b></p>
                               {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                           </div>
                         </div>
                           )
                         }
   
   
                         {/* <div className='d-flex mt-3 text-start '>
                         <div className="col-md-6 border-1 " style={{ fontFamily: 'Arial, sans-serif' }}>
                                <h5>Vehicle Details :-</h5>
                                 <p className="card-text font-weight-bold mt-3">Model : {availableVehicles?.model}</p>
                                 <p className="card-text font-weight-bold">Type : {availableVehicles?.type}</p>
                                 <p className="card-text font-weight-bold">Passengers: {availableVehicles?.passengers } seater </p>
                             </div>
   
                             <div className="col-md-6" style={{ fontFamily: 'Arial, sans-serif' }}>
                             <h5>Driver Details :-</h5>
                                 <p className="card-text font-weight-bold mt-3">Name : {availableVehicles?.driver[0]?.name}</p>
                                 <p className="card-text font-weight-bold">Email : {availableVehicles?.driver[0]?.email}</p>
                                 <p className="card-text font-weight-bold">Mobile: {availableVehicles?.driver[0]?.phonenumber } </p>
                             </div>
                           </div> */}
                       
                     </div>
                 </div>
             </div>
             <div className="col-md-12 w-100">
                 <div className="card mb-4 p-3 border border-2 md-12 w-100 text-start" >
                   
                 <div className='d-flex Segoe UI'>
                         <div className="col-md-6">
                           <p className='fw-bold '>About {distance} kms</p>
                                <h5>Fare Details :-</h5>
                                {cartype && cartype==='Suv' && <p className="card-text font-weight-bold mt-3">Base fare ({basekm}km) : INR {1080}</p>}
                                {cartype && cartype==='Sedan' && <p className="card-text font-weight-bold mt-3">Base fare ({basekm}km) : INR {820}</p>}
                                {cartype && cartype==='Mini' && <p className="card-text font-weight-bold mt-3">Base fare ({basekm}km) : INR {780}</p>}
                                 {/* <p className="card-text font-weight-bold mt-3">Base fare ({basekm}km) : INR {basefare}</p> */}
                                 {cartype && cartype==='Suv' && <p className="card-text font-weight-bold">Fare for remaining km (25 per km) : INR {25*distance}</p>}
                                 {cartype && cartype==='Sedan' && <p className="card-text font-weight-bold">Fare for remaining km (19 per km) : INR {19*distance}</p>}
                                 {cartype && cartype==='Mini' && <p className="card-text font-weight-bold">Fare for remaining km (18 per km) : INR {18*distance}</p>}
   
                                 {/* <p className="card-text font-weight-bold">Fare for remaining km ({remainingbasefare} per km) : INR {remainingfare}</p> */}
                                 <p className="card-text font-weight-bold">Taxes & Fees : INR {taxes}</p>
                                 <p className="card-text font-weight-bold">Estimated fare : INR {estimatedfare}</p>
                             </div>
   
                             <div className="col-md-6">
                             <h5>Pay by :-</h5>
                               <div className="form-check">
                                   <input 
                                   className="form-check-input" 
                                   type="radio" 
                                   name='paymentMethod' 
                                   id="payByCOD" 
                                   value="COD"
                                   checked={paymentMethod === 'COD'}
                                   onChange={handlePaymentMethodChange} 
                                   required/>
                                   <label className="form-check-label font-weight-bold" >COD</label>
                               </div>
                               <div className="form-check">
                                   <input 
                                   className="form-check-input" 
                                   type="radio" 
                                   name='paymentMethod' 
                                   id="payByWallet" 
                                   value="Wallet" 
                                   checked={paymentMethod === 'Wallet'}
                                   onChange={handlePaymentMethodChange}
                                   required/>
                                   <label className="form-check-label font-weight-bold">Wallet</label>
                               </div>
                               <div className="form-check">
                                   <input 
                                   className="form-check-input" 
                                   type="radio" 
                                   name='paymentMethod' 
                                   id="payByUPI" 
                                   value="UPI" 
                                   checked={paymentMethod === 'UPI'}
                                   onChange={handlePaymentMethodChange}
                                   required/>
                                   <label className="form-check-label font-weight-bold">UPI</label>
                               </div>
                                 <button onClick={handleSubmit} className="btn btn-primary btn-md ml-2 mt-2">CONTINUE</button>
                             </div>
                           </div>
                    
                 </div>
             </div>
         </div>
         </div>
     
   </section>
  {/* )} */}
   
</>
  )
}

export default Payment;