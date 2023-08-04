import React, { useState, useEffect } from 'react';
import { Carousel } from '@sefailyasoz/react-carousel';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import './Carrousel.css';

const Carrousel = ({ carouselData, dataType }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [datos, setDatos] = useState([]);

  console.log(dataType)

  useEffect(() => {
    if (dataType === 'exist') {
      setDatos(
        carouselData.map((src) => ({
          headerText: null,
          subText: null,
          image: 'http://localhost:5000/churches/getImages/' + src,
        }))
      );
    } else {
      setDatos(
        carouselData.map((src) => ({
          headerText: null,
          subText: null,
          image: src,
        }))
      );
    }
  }, [dataType, carouselData]);

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
