function Drawer({onClose, items = []}){
  return(
<div className="overlay">
    <div className="drawer d-flex flex-column">
      <h2 className="mb-30 justify-between d-flex">
        Корзина <img onClick={onClose} className="cu-p" src="/img/btn-remove.svg" alt="Close" />
      </h2>
      <div className="items">  
      {items.map((obj) => (
          <div className="cartItem d-flex align-center mb-20">
            <div style={{ backgroundImage: `url(${obj.imageUrl})` }} className="cartItemImg"></div>
            <div className="mr-20 flex">
              <p className="mb-5">{obj.title}</p>
              <b>{obj.price}</b>
            </div>
            <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
          </div>
        ))
      }
      </div>

      <div className="cartTotalBlock">      
        <ul>
          <li>
            <span>Итого:</span>
            <div></div>
            <b>21 489 руб.</b>
          </li>
          <li>
            <span>Налог 5%:</span>
            <div></div>
            <b>1074 руб.</b>
          </li>
        </ul>
        <button className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="Arrow" /></button>
      </div>
    </div>
</div>
)
}

export default Drawer;