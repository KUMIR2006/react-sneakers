import Card from "../components/Card";
import { Link } from 'react-router-dom';

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  favorites
}){
  return(
  <div className="content p-40">
      <div className="d-flex align-center justify-between mb-15">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>
        <div className="search d-flex">
          <img src="/img/search.svg" alt="Search"/>
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск ..."/>
          {searchValue && <img onClick={() =>setSearchValue("")} className="clear cu-p" src="/img/btn-remove.svg" alt="Clear" />}
        </div>
      </div>

      <div className="d-flex flex-wrap">
        {items
        .filter(items => items.title.toLowerCase().includes(searchValue.toLowerCase()))
        .map((item) => (
          <Card
          key={item.title}
          onFavorite={(obj) => onAddToFavorite(obj)}
          onPlus={(obj) => onAddToCart(obj)}
          alreadyFavorite={favorites}
          {... item}
          />
        ))}
      </div>
      

  </div>
  )
}

export default Home;