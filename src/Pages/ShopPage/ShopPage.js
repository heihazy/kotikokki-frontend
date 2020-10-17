import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
const ShopPage = () => {
    const [renderDish, setRenderDish] = useState();

    useEffect(()=>{
        const getDishes = async ()=>{
            const result = await fetch(
                "http://localhost:8000/api/v1/dishes",
                {
                    headers:{
                        "Content-Type":"application/json",
                    }
                }
            );
            const json = await result.json();
            if (json.status !== "success") {
                alert("Sorry, could not get dishes. Try again later.");
              } else {
                const dishList = json.data.dishes.map((item) => (
                  <Link key={item._id}>
                    <li>{item.name}</li>
                  </Link>
                ));
                setRenderDish(dishList);
              }
        };
        getDishes();
    },[])
    return (
        <div className='dishes-listing-page'>
            <ul className="dishes-list">
                {renderDish}
            </ul>
        </div>
    );
}

export default ShopPage;
