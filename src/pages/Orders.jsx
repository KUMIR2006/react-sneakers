import axios from 'axios';
import React from 'react';
import Card from "../components/Card";
import AppContext from '../Context';

function Orders(){
  const {onAddToFavorite, onAddToCart} = React.useContext(AppContext)
  const [orders, setOrders] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("http://localhost:3000/orders")
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false)
      } catch (error) {
        alert("Ошибка при запросе на заказ")
        console.error(error)
      }
    }
    fetchData();
  }, []);


  return(
  <div className="content p-40">
      <div className="d-flex align-center justify-between mb-15">
        <h1>Мои заказы</h1>
      </div>

      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(4)] : orders).map((item,index) => (
            <Card 
            key={index}
            onFavorite={(obj) => onAddToFavorite(obj)}
            loading={isLoading}
            {... item}/>
          ))}
      </div>
      

  </div>
  )
}

export default Orders;