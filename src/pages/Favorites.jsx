import React from 'react';
import Card from "../components/Card";
import AppContext from '../Context';

function Favorites({onAddToFavorite}){
  const {favorites} = React.useContext(AppContext);

  return(
  <div className="content p-40">
      <div className="d-flex align-center justify-between mb-15">
        <h1>Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap">
        {favorites.map((item) => (
            <Card
            key={item.id}
            favorited={true}
            onFavorite={(obj) => onAddToFavorite(obj)}
            {... item}
            //onPlus={(obj) => onAddToCart(obj)}
            />
          ))}
      </div>
      

  </div>
  )
}

export default Favorites;