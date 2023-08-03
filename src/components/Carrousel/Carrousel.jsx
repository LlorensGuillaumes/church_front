import React, { useState } from 'react';
import { Carousel } from '@sefailyasoz/react-carousel';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import './Carrousel.css';

const Carrousel = ({ carouselData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  let datos = carouselData.map((src) => ({
    headerText: null,
    subText: null,
    image: src,
  }));

  const handleSlideChange = (currentIndex) => {
    setCurrentSlide(currentIndex);
  };

  return (
    <div className='container'>
      <Carousel
        data={datos}
        autoPlay={true}
        rightItem={<FaAngleRight className='imageSelectors' />}
        leftItem={<FaAngleLeft className='imageSelectors' />}
        animationDuration={3000}
        headerTextType='black'
        subTextType='white'
        size='normal'
        onSlideChange={handleSlideChange}
      />
      <p id='actualPosition'>
        Imagen {currentSlide + 1} de {datos.length}
      </p>
    </div>
  );
};

export default Carrousel;
