import React from 'react';
import styles from './Card.module.scss'

function Card(props){
  const [isAdded, setIsAdded] = React.useState();

  const onClickPlus= () => {
    setIsAdded(!isAdded);
  }

  React.useEffect(() => {
    console.log('Переменная изменилась!');
  }, [isAdded]);

  return(
    <div className={styles.card}>
    <div className={styles.favorite} onClick={props.onFavorite}>        
      <img src="/img/unliked.svg"/>
    </div>

    <img width={133} height={112} src={props.imageUrl} alt=""/>
    <h5>{props.title}</h5>
    <div className="d-flex justify-between align-center">
      <div className="d-flex flex-column">
        <span>Цена:</span>
        <b>{props.price}</b>
      </div>
        <img className={styles.plus} onClick={onClickPlus} src={isAdded ? "/img/added.svg" : "/img/add.svg"} alt="Plus"/>
    </div>
  </div>
  )
}

export default Card;