import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantFinder from "../APIs/RestaurantFinder";
import { useContext } from "react";

const UpdateRestaurant = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();
  const { restaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/${id}`);
      //console.log(response.data.data);
      setName(response.data.data.restaurant.name);
      setLocation(response.data.data.restaurant.location);
      setPriceRange(response.data.data.restaurant.price_range);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: priceRange,
    });
    navigate("/");
  };


  return (
    <div>
        <form action=''>
            <div className="form-group">
                <label htmlFor="name"> Name </label>
                <input value ={name} onChange={e => setName(e.target.value)} id='name' className='form-control' type="text"/>
            </div>

            <div className="form-group">
                <label htmlFor="location"> Location </label>
                <input value ={location} onChange={e => setLocation(e.target.value)} id='location' className='form-control' type="text"/>
            </div>

            {/* <div className="form-group">
                <label htmlFor="price_range"> Price Range </label>
                <input value ={priceRange} onChange={e => setPriceRange(e.target.value)} id='price_range' className='form-control' type="number"/>
            </div> */}
            


            <label htmlFor="price_range"> Price Range </label>
            <select value ={priceRange} onChange={e => setPriceRange(e.target.value)} id='price_range' className='ml-5'>
                <option disabled>Select</option>
                <option value = "1">$</option>
                <option value = "2">$$</option>
                <option value = "3">$$$</option>
                <option value = "4">$$$$</option>
                <option value = "5">$$$$$</option>
            </select>
        <button type="submit" onClick={handleSubmit} className="btn btn-primary ml-5 mb-3">Submit</button>
        </form>
    </div>
  )
}

export default UpdateRestaurant