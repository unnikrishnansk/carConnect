import React, { useState, useEffect, useRef } from 'react';
import AdminNavbar from './AdminNavbar';
import Chart from 'chart.js/auto';
import { useGetAdminhomeQuery } from '../../Slices/adminApiSlice';

const AdminHomepage = () => {

  const chartRef = useRef(null);
  const chartRef2 = useRef(null);

  let myChart = null;
  let myChart2 = null;

  const {data:getDatas, isError, isLoading, refetch} = useGetAdminhomeQuery();

  const totalRideAmount = getDatas?.rides?.reduce((total, ride) => total + ride.rideAmount, 0);
  
  const upiCount = getDatas?.rides?.reduce((count, ride) => {
    return ride.paymentMethod === 'UPI' ? count + 1 : count;
  }, 0);
  const walletCount = getDatas?.rides?.reduce((count, ride) => {
    return ride.paymentMethod === 'Wallet' ? count + 1 : count;
  }, 0);
  const codCount = getDatas?.rides?.reduce((count, ride) => {
    return ride.paymentMethod === 'COD' ? count + 1 : count;
  }, 0);

  const NumAccepted = getDatas?.rides?.reduce((count, ride) => {
    return ride.isAccepted === true ? count + 1 : count;
  }, 0);
  const NumCompleted = getDatas?.rides?.reduce((count, ride) => {
    return ride.isCompleted === true ? count + 1 : count;
  }, 0);
  const NumRejected = getDatas?.rides?.reduce((count, ride) => {
    return ride.isRejected === true ? count + 1 : count;
  }, 0);


  useEffect(() => {
    if (chartRef.current && chartRef2.current && getDatas) {

    // Destroy previous chart instance if it exists
    if (myChart) {
      myChart.destroy();
    }
    if (myChart2) {
      myChart2.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Accepted Rides', 'Completed Rides', 'Rejected Rides'],
        datasets: [{
          label: 'Rides',
          data: [NumAccepted, NumCompleted, NumRejected],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

     // Chart 2
     const ctx2 = chartRef2.current.getContext('2d');
     myChart2 = new Chart(ctx2, {
       type: 'pie',
       data: {
         labels: ['upi', 'cod', 'wallet'],
         datasets: [{
           label: 'Payment Methods',
           data: [upiCount, codCount, walletCount],
           fill: false,
           borderColor: 'rgba(255, 99, 132, 1)',
           borderWidth: 1
         }]
       },
       options: {
         scales: {
           
         }
       }
     });

     refetch();

    // Clean up function
    return () => {
      if (myChart) {
        myChart.destroy();
      }
      if (myChart2) {
        myChart2.destroy();
      }
    };
  }
  }, [getDatas]);


  return (
    <>
    < AdminNavbar />
    <div>
      {getDatas && <>
        <div class=" d-flex m-5 text-center ">
  <div class="card-body">
    <h5 class="card-title">Total Drivers</h5>
    <p class="card-text text-bold">{getDatas?.Numdrivers}</p>
  </div>
  <div class="card-body">
    <h5 class="card-title">Total Users</h5>
    <p class="card-text">{getDatas?.Numusers}</p>
  </div>
  <div class="card-body">
    <h5 class="card-title">Total Vehicles</h5>
    <p class="card-text">{getDatas?.Numvehicles}</p>
  </div>
  <div class="card-body">
    <h5 class="card-title">Total Active Drivers</h5>
    <p class="card-text">{getDatas?.activeDrivers}</p>
  </div>
  <div class="card-body">
    <h5 class="card-title">Total Revenue</h5>
    <p class="card-text">{totalRideAmount}</p>
  </div>
  <div class="card-body">
    <h5 class="card-title">Total Rides</h5>
    <p class="card-text">{getDatas?.rides?.length}</p>
  </div>
</div>
{getDatas.rides && (
            <div className='d-flex'>
              <div style={{ height: '700px', width: '600px', margin: 'auto', marginTop: '30px' }}>
                <canvas ref={chartRef}></canvas>
              </div>
              <div style={{ height: '500px', width: '500px', margin: 'auto', marginTop: '15px' }}>
                <canvas ref={chartRef2}></canvas>
              </div>
            </div>
          )}

      </>}
    
    </div>
    </>
    
  )
}

export default AdminHomepage