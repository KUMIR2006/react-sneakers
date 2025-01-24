import React from 'react';
import ContentLoader from "react-content-loader"
import styles from './Card.module.scss'
import AppContext from '../../Context';

function Card({id, title, imageUrl, price, onFavorite, onPlus, favorited = false, alreadyFavorite, loading}){
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const {isItemAdded} = React.useContext(AppContext);

  
  //let arrFavorite = alreadyFavorite.some(o => o.title === title);
  const onClickPlus= () => {
    onPlus({id, title, imageUrl, price});
  }

  const onClickFavorite= () => {
    onFavorite({id, title, imageUrl, price});
    setIsFavorite(!isFavorite);
  }
  return(
    <div className={styles.card}>
      {
        loading ? 
        (  <ContentLoader 
          speed={2}
          width={180}
          height={225}
          viewBox="0 0 180 225"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="180" height="120" /> 
          <rect x="0" y="146" rx="3" ry="3" width="180" height="15" /> 
          <rect x="0" y="202" rx="8" ry="8" width="100" height="24" /> 
          <rect x="144" y="190" rx="8" ry="8" width="36" height="36" /> 
          <rect x="0" y="165" rx="3" ry="3" width="103" height="15" />
        </ContentLoader>) :
  (<>
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
        <img 
        className={styles.plus} 
        onClick={onClickPlus} 
        src={isItemAdded(id) ? "/img/added.svg" : "/img/add.svg"} 
        alt="Plus"/>
    </div>  
    </>)
    }
  </div>
  )
}

export default Card;