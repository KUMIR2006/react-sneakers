import React from 'react';
import styles from './Card.module.scss'

function Card({id, title, imageUrl, price, onFavorite, onPlus, favorited, alreadyFavorite}){
  const [isAdded, setIsAdded] = React.useState();
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  

  //let arrFavorite = alreadyFavorite.some(o => o.title === title);
  const onClickPlus= () => {
    onPlus({title, imageUrl, price});
    setIsAdded(!isAdded);
  }

  const onClickFavorite= () => {
    onFavorite({id, title, imageUrl, price});
    setIsFavorite(!isFavorite);
  }

  React.useEffect(() => {
    console.log('Переменная изменилась!');
  }, [isAdded]);
  return(

    <div className={styles.card}>
    <div className={styles.favorite} onClick={() => onClickFavorite()}>        
      <img src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"}/>
    </div>

    <img width={133} height={112} src={imageUrl} alt=""/>
    <h5>{title}</h5>
    <div className="d-flex justify-between align-center">
      <div className="d-flex flex-column">
        <span>Цена:</span>
        <b>{price}</b>
      </div>
        <img className={styles.plus} onClick={onClickPlus} src={isAdded ? "/img/added.svg" : "/img/add.svg"} alt="Plus"/>
    </div>
  </div>
  )
}

export default Card;