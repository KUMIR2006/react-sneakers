import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from "./components/Header";
import Drawer from "./components/Drawer";

import AppContext from './Context';

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  
  React.useEffect(() => { 
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([axios.get('http://localhost:3000/cart'), 
        axios.get('http://localhost:3000/favorite'),
        axios.get('http://localhost:3000/items')]);
        //const cartResponse = await axios.get('http://localhost:3000/cart');
        //const favoritesResponse = await axios.get('http://localhost:3000/favorite');
        //const itemsResponse = await axios.get('http://localhost:3000/items');


        setCartItems(cartResponse.data)
        setFavorites(favoritesResponse.data)
        setItems(itemsResponse.data)

        setIsLoading(false)

      } catch (error) {alert("Ошибка при запросе данных :(")}
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
      console.error(error);
    }
  }

  const onRemoveItem = (id) => {
    try {
      axios.delete(`http://localhost:3000/cart/${id}`);
      setCartItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      alert("Ошибка при удалении из корзины")
      console.error(error);
    }

  }
  
  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(favObj => Number(favObj.id) == Number(obj.id))) {
        setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
        axios.delete(`http://localhost:3000/favorite/${obj.id}`);
      } else {
        setFavorites(prev => [...prev, data]);
        const { data } = await axios.post('http://localhost:3000/favorite', obj);
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты")
      console.error(error);
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
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, setCartOpened, setCartItems, onAddToCart}}>
  <div className="wrapper clear">

  <div className="">  
  <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened}/>
  </div>


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
          <Favorites/>
        } />

        <Route path="/orders" exact element={
          <Orders/>
        } />
    </Routes>
</div>
</AppContext.Provider>
  );
}

export default App;
