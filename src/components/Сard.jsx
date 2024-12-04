function Card(){
  return(
    <div className="card">
    <div className="favorite">        
      <img src="/img/unliked.svg"/>
    </div>

    <img width={133} height={112} src="/img/sneakers/boots1.jpg" alt=""/>
    <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
    <div className="d-flex justify-between align-center">
      <div className="d-flex flex-column">
        <span>Цена:</span>
        <b>124 999 руб.</b>
      </div>
      <button className="button">
        <img  width={11} height={11} src="/img/plus.png" alt="Plus"/>
      </button>
    </div>
  </div>
  )
}

export default Card;