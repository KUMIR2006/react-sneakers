function Header(){
  return(
    <header className="d-flex justify-between align-center p-40">
    <div className="d-flex align-center">
      <img width={40} height={40} src="/img/logo.png"/>
      <div>
        <h3>React Sneakers</h3>
        <p className="opacity-5">Магазин лучших кроссовок</p>
      </div>
    </div>


    <ul className="d-flex">
      <li className="mr-30">
        <img width={20} height={20} src="/img/basket.svg"/>
        <span>1205руб</span>
      </li>
      <li>
        <img width={20} height={20} src="/img/profile.svg"/>
      </li>
    </ul>
  </header> 

  )
}

export default Header;