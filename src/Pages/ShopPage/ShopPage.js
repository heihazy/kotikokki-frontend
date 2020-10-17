import React from 'react';
import {Route} from 'react-router-dom';
import ItemPreview from '../../Components/ItemPreview/ItemPreview';
const ShopPage = ({match}) => {
    return (
        <div className='dishes-listing-page'>
            <Route exact path={`${match.path}`} component={ItemPreview}/>
        </div>
    );
}

export default ShopPage;
