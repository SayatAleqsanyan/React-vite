import { useState } from 'react';
import {Link} from "react-router-dom";
import styles from './Slider.module.scss';

const Slider = ({ slides, cardWidth = 400 }) => {
    const [currentPosition, setCurrentPosition] = useState(0);
    const gap = 30;
    const step = cardWidth + gap;

    const handleNext = () => {
        const maxPosition = -((slides.length - 1) * step);
        setCurrentPosition(prev => Math.max(prev - step, maxPosition));
    };

    const handlePrev = () => {
        setCurrentPosition(prev => Math.min(prev + step, 0));
    };

    return (
        <div className={styles.container}>
            <button
                className={`${styles.arrow} ${styles.arrowLeft}`}
                onClick={handlePrev}
                disabled={currentPosition === 0}
            >
                &#10094;
            </button>

            <div className={styles.wrapper}>
                <div
                    className={styles.cardList}
                    style={{ transform: `translateX(${currentPosition}px)` }}
                >
                    {slides.map((slide) => (
                      <div key={slide.id} className={styles.cardItem}>
                        <Link to={ `/products/${slide.id}` } >
                          <div>
                            <h3 className={styles.productName}>{slide.name}</h3>
                            <img
                              src={slide.image}
                              alt={slide.title}
                              className={styles.image}
                              loading="lazy"
                            />
                          </div>
                            <p className={styles.productBody}>{slide.description}</p>
                            <p className={styles.productPrice}>
                              {slide.discount > 0
                                ? <><span className="line-through decoration-red-600"> ${slide.price} </span> ${slide.discountPrice}</>
                                : <>${slide.price}</>
                              }
                            </p>
                        </Link>
                      </div>
                    ))}
                </div>
            </div>

            <button
                className={`${styles.arrow} ${styles.arrowRight}`}
                onClick={handleNext}
                disabled={currentPosition === -((slides.length - 1) * step)}
            >
                &#10095;
            </button>
        </div>
    );
};

export default Slider;