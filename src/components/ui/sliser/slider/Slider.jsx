
import { useState } from 'react';
import styles from './Slider.module.scss';

const Slider = ({ slides }) => {
    const [currentPosition, setCurrentPosition] = useState(0);
    const cardWidth = 400; // Քարտի լայնություն
    const gap = 30; // Քարտերի միջև բացը
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
                            <div className={styles.imageDiv}>
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className={styles.image}
                                    loading="lazy"
                                />
                            </div>
                            <h3 className={styles.productName}>{slide.title}</h3>
                            <p className={styles.productBody}>{slide.description}</p>
                            <div className={styles.productPrice}>{slide.price}</div>
                            <button className={styles.button}>Գնել հիմա</button>
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