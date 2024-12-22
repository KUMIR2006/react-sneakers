import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";


function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false);
  
  React.useEffect(() => {
      axios.get('https://62392ff334196c3f.mokky.dev/items').then(res => {
        setItems(res.data);
      })
      axios.get('https://62392ff334196c3f.mokky.dev/cart').then(res => {
        setCartItems(res.data);
      })
      axios.get('https://62392ff334196c3f.mokky.dev/favorite').then(res => {
        setFavorites(res.data);
      })
  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://62392ff334196c3f.mokky.dev/cart', obj);
    setCartItems(prev => [ ... prev, obj]);
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://62392ff334196c3f.mokky.dev/cart/${id}`);
    setCartItems(prev => prev.filter(item =>  item.id !== id));
  }
  
  const onAddToFavorite = async (obj) => {
    if (favorites.find(favObj => favObj.id == obj.id)) {
      axios.delete(`https://62392ff334196c3f.mokky.dev/favorite/${obj.id}`);
    }else{
      const { data } = await axios.post('https://62392ff334196c3f.mokky.dev/favorite', obj);
      setFavorites(prev => [ ... prev, data]);
    }
  }

  const onChangeSearchInput = (event) =>{
    console.log(event.target.value);
    setSearchValue(event.target.value);
  };

  return (
  <div className="wrapper clear">
  {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>}
  <Header onClickCart={() => setCartOpened(true)}/>
  <Routes>
      <Route path="/" exact element={
      <Home 
        items={items}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onChangeSearchInput={onChangeSearchInput}
        onAddToFavorite={onAddToFavorite}
        onAddToCart={onAddToCart}
        favorites={favorites}
        />} />

      <Route path="/favorites" exact element={
      <Favorites 
      items={favorites}
      onAddToFavorite={onAddToFavorite}
      />
      } />
    </Routes>
</div>
  );
}

export default App;
