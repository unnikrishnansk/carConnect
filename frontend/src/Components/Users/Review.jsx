import React, { useState } from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { toast } from 'react-toastify';
import { useAddReviewMutation } from '../../Slices/userApiSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Review = () => {

    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const { userInfo } = useSelector((state)=>state.auth);
    const name = userInfo.name;

    const navigate = useNavigate();

    const [ addReview, { isLoading, isError } ] = useAddReviewMutation();

    const handleSubmit = async () => {
        if (review.trim() !== '' && rating) {
        //   onSubmit(review);
          const res = await addReview({review,name,rating}).unwrap();
          console.log(res);
          setReview('');
          navigate('/ridedetails');
          toast.success("Review submitted");
          console.log(review);
        }else{
          toast.error("Enter Review and Rating");
          return;
        }
      };

      const handleInputChange = (e) => {
        setReview(e.target.value);
      };

      const handleRatingChange = (e) => {
        setRating(parseInt(e.target.value)); // Parse value as integer
    };


  return (
    <>
    <Navbar />
    <div className='d-flex align-items-stretch'>
    <Sidebar />

    <div>
        <h6 className='m-3 text-dark'>Your Review helps us to make the service better !!...</h6>
      <textarea
      className='m-2'
        value={review}
        onChange={handleInputChange}
        placeholder="Write your review..."
        rows={6}
        cols={50}
      />
      <br />
      <label className='m-2'>Rate out of 5 :-</label><input type='number' value={rating} onChange={handleRatingChange} min={0} max={5} />
      <br />
      <button className='btn btn-primary btn-md mb-5 m-2' onClick={handleSubmit}>Submit Review</button>
    </div>

    </div>
    </>
  )
}

export default Review;