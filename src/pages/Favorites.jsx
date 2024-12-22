
import Card from "../components/Card";

function Favorites({items, onAddToFavorite}){
  return(
  <div className="content p-40">
      <div className="d-flex align-center justify-between mb-15">
        <h1>Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap">
        {items.map((item) => (
            <Card
            key={item.title}
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