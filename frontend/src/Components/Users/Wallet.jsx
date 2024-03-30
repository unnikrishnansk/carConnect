import React, { useState, useEffect } from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAddWalletMutation, useGetBalanceQuery } from '../../Slices/userApiSlice';
import { useSelector } from 'react-redux';

const Wallet = () => {

    const [amountAdded, setAmountAdded] = useState(0);
    const [balamount,setBalamount] = useState(0);
    const [wallets,setWallets] = useState([]);

    const { userInfo } = useSelector((state)=>state.auth);
    const userName = userInfo?.name;
    const userid = userInfo?.id;
    console.log(userid);

    const [addedAmount , { isError , isLoading }] = useAddWalletMutation();
    const { data:balanceData, refetch } = useGetBalanceQuery(userid);

    useEffect(() => {
        if (!balanceData) return; // Wait until data is available
        const { BalanceAmount , wallet} = balanceData;
        setBalamount(BalanceAmount);
        setWallets(wallet);
        console.log(wallet);
        refetch();
    }, [balanceData,refetch]);

    // useEffect(() => {
       

        if (!balanceData) {
            return <div>Loading...</div>; // or any other placeholder or loading indicator
          }

        // const { BalanceAmount, wallet } = balanceData;
        // setBalamount(BalanceAmount)
        // console.log(BalanceAmount);
    // }, [])
    
    
    // useEffect(() => {
    //     const getWalletBalance = async () => {
    //         const amount = await getBalance().unwrap();
    //         console.log(amount);
    //         setBalamount(amount);
    //     }
    // getWalletBalance();
    // }, [getBalance])

    const handleAddWallet = async () => {
        // const walletaddedamount = e.target.previousElementSibling.value;
        console.log(amountAdded);
        console.log("adding");
        const res = await addedAmount({amountAdded,userName}).unwrap();
        console.log(res);
        refetch();
    }

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

  return (
    <>
    <Navbar />
    <div className='d-flex align-items-stretch w-100'>
    <Sidebar />
    <div className='m-2 p-2 justify-content-center align-items-center w-100 border '>
    <div className='d-flex mt-2 justify-content-center' >
        <p className='bg-light p-3 '>Balance :- INR {balamount}</p>
    </div>
    <div className='d-flex mt-2 justify-content-center m-2' >
        <input type="number" onChange={(e) => setAmountAdded(e.target.value)}/>
        <button className='btn btn-primary btn-md ml-2' onClick={handleAddWallet}>ADD</button>
    </div>
    <div className='border w-100'>
    <table className="table table-striped text-center">
          <thead className="thead-dark">
            <tr>
              {/* <th  scope="col">Userid</th> */}
              <th  scope="col">WalletID</th>
              <th  scope="col">Remarks</th>
              <th scope="col">Date</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
              {/* <th scope="col">Actions</th> */}
            </tr>
          </thead>
    
          <tbody>
            {wallets && wallets.map((wal) => {
               return( 
              <tr
               key={wal.walletID}
               >
              <td>  {wal.walletID} </td>
              <td>  {wal.walletDescription.toUpperCase()} </td>
              <td>  {formatTime(wal.walletTime)} </td>
              <td>  {wal.walletTransactionAmount} </td>
              <td className='text-success'>  {wal.walletStatus} </td>
              {/* <td>
                    {user.isBlocked===true ? (
                      <button
                      onClick={()=>handleBlockUser(user.id)}
                      className="btn btn-primary btn-md"
                      >
                        Unblock
                      </button>
                    ) : (
                      <button 
                      onClick={()=>handleBlockUser(user.id)}
                       className="btn btn-primary btn-md"
                       >
                        Block
                      </button>
                    )
                    }
                </td> */}

            </tr>
               ) 
             })}   
          
          </tbody>
        </table>
        </div>
    </div>
    </div>
    </>
  )
}

export default Wallet;