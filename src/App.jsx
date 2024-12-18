import React from 'react';
import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";


function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false);
  
  React.useEffect(() => {
  fetch('https://6754b7c836bcd1eec851d5bd.mockapi.io/items')
      .then(res => { 
        return res.json()
      })
      .then((json) => {
        setItems(json)
      });
  }, []);

  const onAddToCart = (obj) => {
    setCartItems(prev => [ ... prev, obj]);
  }

  const onChangeSearchInput = (event) =>{
    console.log(event.target.value);
    setSearchValue(event.target.value);
  };

  return (
  <div className="wrapper clear">
  {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)}/>}
  <Header onClickCart={() => setCartOpened(true)}/>
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
          title={item.title}
          price={item.price}
          imageUrl={item.imageUrl}
          onFavorite={() => console.log("Закладки")}
          onPlus={(obj) => onAddToCart(obj)}
          />
        ))}
      </div>
      

  </div>

</div>
  );
}

export default App;
