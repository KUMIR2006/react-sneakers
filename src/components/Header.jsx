import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import React from 'react';

function Header(props){
  const { totalPrice } = useCart();

  return(
    <header className="d-flex justify-between align-center p-40">
    <Link to="/">
      <div className="d-flex align-center">
        <img width={40} height={40} src="/img/logo.png" alt="Logo"/>
        <div>
          <h3>React Sneakers</h3>
          <p className="opacity-5">Магазин лучших кроссовок</p>
        </div>
      </div>
    </Link>


    <ul className="d-flex">
      <li onClick={props.onClickCart} className="mr-30 cu-p d-flex">
        <img width={20} height={20} src="/img/basket.svg" alt="Cart"/>
        <span>{totalPrice} руб.</span>
      </li>
      <li className="mr-20 cu-p d-flex">
        <Link to="/favorites">
          <img width={20} height={20} src="/img/favorite.svg" alt="Favorite"/>
        </Link>
      </li>
      <li className="cu-p d-flex">
        <Link to="/orders">
          <img width={20} height={20} src="/img/profile.svg" alt="Profile"/>
        </Link>
      </li>
    </ul>
  </header> 

  )
}

export default Header;