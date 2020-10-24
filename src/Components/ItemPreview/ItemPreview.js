import React ,{useState, useEffect } from 'react';
import './ItemPreview.css';
import ShopCard from '../ShopCard/ShopCard';

const ItemPreview = ({items}) => {
    const [renderDish, setRenderDish] = useState();

    useEffect(()=>{
        const getDishes = async ()=>{
            const result = await fetch(
                "http://localhost:8000/api/v1/users/dishes",
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
                    <ShopCard key={item.id} item={item}/>
                ));
                setRenderDish(dishList);
              }
        };
        getDishes();
    },[])
    return (
        <div className='item-preview'>
            <h1 className='title'>Top picks</h1>
            <div className='preview'>
               {renderDish}
            </div>
        </div>
    );
}

export default ItemPreview;
