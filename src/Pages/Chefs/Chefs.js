import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {firestore} from '../../firebase/firebase.utils'
import "./Chefs.css";

const Chefs = () => {
  const [chefs, setChefs] = useState();

  useEffect(() => {
    firestore.collection('chefs').get().then((result)=>{
    console.log(result);
          // const chefList = result.data.map((chef) => (
          //   <Link key={chef._id} to={"/profile?" + chef._id}>
          //     <li>{chef.name}</li>
          //   </Link>
          // ));
          // setChefs(chefList);
        }
    
    )
    
  }, []);

  return (
    <div className="chef-listing-page">
      Chef listing
      <ul className="chef-list">{chefs}</ul>
    </div>
  );
};

export default Chefs;
