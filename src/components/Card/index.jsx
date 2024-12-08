import React from 'react';
import styles from './Card.module.scss'

function Card({title, imageUrl, price, onFavorite, onPlus}){
  const [isAdded, setIsAdded] = React.useState();

  const onClickPlus= () => {
    onPlus({title, imageUrl, price});
    setIsAdded(!isAdded);
  }

  React.useEffect(() => {
    console.log('Переменная изменилась!');
  }, [isAdded]);

  return(
    <div className={styles.card}>
    <div className={styles.favorite} onClick={onFavorite}>        
      <img src="/img/unliked.svg"/>
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