import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from './Context';

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  
  React.useEffect(() => { 
    async function fetchData() {
      const cartResponse = await axios.get('http://localhost:3000/cart');
      const favoritesResponse = await axios.get('http://localhost:3000/favorite');
      const itemsResponse = await axios.get('http://localhost:3000/items');
      
      

      setCartItems(cartResponse.data)
      setFavorites(favoritesResponse.data)
      setItems(itemsResponse.data)

      setIsLoading(false)
      
    }
    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    try{
      if (cartItems.find(item => Number(item.id) === Number(obj.id))) {
        axios.delete(`http://localhost:3000/cart/${obj.id}`);
        setCartItems(prev => prev.filter(item =>  Number(item.id) !== Number(obj.id)));
      }else{
        axios.post('http://localhost:3000/cart', obj);
        setCartItems(prev => [ ... prev, obj]);
      }
    }catch(error){
      alert("Не удалось добавить в корзину")
    }
  }

  const onRemoveItem = (id) => {
    axios.delete(`http://localhost:3000/cart/${id}`);
    setCartItems(prev => prev.filter(item =>  item.id !== id));
  }
  
  const onAddToFavorite = async (obj) => {
    if (favorites.find(favObj => Number(favObj.id) == Number(obj.id))) {
      axios.delete(`http://localhost:3000/favorite/${obj.id}`);
      setFavorites(prev => prev.filter(item =>  Number(item.id) !== Number(obj.id)));
    }else{
      const { data } = await axios.post('http://localhost:3000/favorite', obj);
      setFavorites(prev => [ ... prev, data]);
    }
  }

  const onChangeSearchInput = (event) =>{
    console.log(event.target.value);
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id))
  }

  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, setCartOpened, setCartItems}}>
  <div className="wrapper clear">
  {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>}
  <Header onClickCart={() => setCartOpened(true)}/>
  <Routes>
      <Route path="/" exact element={
      <Home 
        items={items}
        cartItems={cartItems}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onChangeSearchInput={onChangeSearchInput}
        onAddToFavorite={onAddToFavorite}
        onAddToCart={onAddToCart}
        isLoading={isLoading}
        />} />

      <Route path="/favorites" exact element={
      <Favorites 
      onAddToFavorite={onAddToFavorite}
      />
      } />
    </Routes>
</div>
</AppContext.Provider>
  );
}

export default App;
