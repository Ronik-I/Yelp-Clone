import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../APIs/RestaurantFinder';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';
import { RestaurantsContext } from '../context/RestaurantsContext';

const mystyle = {
  color: "#f4ffb5",
  textShadow: "3px 3px #000000",
  padding: "10px",
  fontFamily: 'Titan One',
  fontSize: "80px",
  textAlign: "center",
  
};

const RestaurantdetailPage = () => {
  const {id} = useParams();
  const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext)
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await RestaurantFinder.get(`/${id}`);
      //console.log(response);
      setSelectedRestaurant(response.data.data);
      }catch(err){
        console.log(err);
      }
      
    };
    fetchData();
  }, []);
  return (
    <div>{selectedRestaurant && 
      <>
      <h1 style={mystyle}>{selectedRestaurant.restaurant.name}</h1>
      {/* <p style={{fontfamily: 'Titan One', fontStyle: 'cursive'}}>{selectedRestaurant.restaurant.name}</p> */}
      <h5><div className="text-center">
            <StarRating rating={selectedRestaurant.restaurant.average_rating} />
            <span className="ml-1">
              {selectedRestaurant.restaurant.count
                ? `(${selectedRestaurant.restaurant.count})`
                : "(0)"}
            </span>
          </div></h5>
        <div className='mt-3 ml-4'>
          <Reviews reviews={selectedRestaurant.reviews}/>
        </div>
        <AddReview />
      </>
    }</div>
  );
};

export default RestaurantdetailPage;