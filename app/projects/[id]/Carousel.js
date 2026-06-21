'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './project.module.css';

export default function Carousel({ images, title, index }) {
  const trackRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -trackRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: trackRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (trackRef.current) {
      const scrollPos = trackRef.current.scrollLeft;
      const slideWidth = trackRef.current.offsetWidth;
      const newSlide = Math.round(scrollPos / slideWidth);
      if (newSlide !== currentSlide) {
        setCurrentSlide(newSlide);
      }
    }
  };

  return (
    <div className={styles.carouselContainer}>
      <button className={`${styles.carouselArrow} ${styles.arrowLeft}`} onClick={scrollLeft} aria-label="Anterior">
        <ChevronLeft size={24} />
      </button>
      
      <div className={styles.carouselTrack} ref={trackRef} onScroll={handleScroll}>
        {images.map((img, i) => (
          <div key={i} className={styles.carouselSlide}>
            <Image 
              src={img} 
              alt={`${title} carousel ${index} image ${i + 1}`} 
              width={1080} 
              height={1080} 
              className={styles.carouselImage}
              unoptimized
            />
          </div>
        ))}
      </div>

      <div className={styles.carouselDots}>
        {images.map((_, i) => (
          <div 
            key={i} 
            className={`${styles.dot} ${i === currentSlide ? styles.dotActive : ''}`} 
          />
        ))}
      </div>

      <button className={`${styles.carouselArrow} ${styles.arrowRight}`} onClick={scrollRight} aria-label="Próximo">
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
