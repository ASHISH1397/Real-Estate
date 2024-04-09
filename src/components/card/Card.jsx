import { Link } from 'react-router-dom';
import "./card.scss";

export default function Card({item}){
  return (
    <div className="card">
      {/* Using React router DOM link component instead of anchor tag */}
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.img} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link>{item.title}</Link>
        </h2>

        <p className='address'>
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>

        <p className='price'>$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} Bedroom</span>
            </div>

            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} Bathroom</span>
            </div> 
          </div>

          <div className="icons">
            <div className="icon">
              <img src="/save.png" alt="" />
            </div>
            <div className="icon">
              <img src="/chat.png" alt="" />
            </div>
            
          </div>
        </div>
      </div>

    </div>
  );
}