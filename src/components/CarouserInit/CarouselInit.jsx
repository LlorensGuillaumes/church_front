import React, { useState, useEffect } from 'react';
import { Carousel } from '@sefailyasoz/react-carousel';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import './CarouselInit.css';

const CarouselInit = ({ carouselData, dataType, imagesFront = false }) => {

  const [datos, setDatos] = useState([]);

  useEffect(() => {
    if(imagesFront){
      setDatos(
        carouselData.map((src) =>({
          headerText: null,
          subText: null,
          image: src
        }))
      )
    }else if (dataType === 'exist') {
      setDatos(
        carouselData.map((src) => ({
          headerText: null,
          subText: null,
          image: `http://localhost:5000/churches/getImages/${src}`,
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
  }, [dataType, carouselData, imagesFront]);



  return (
    <div className='container'>
      <Carousel
        data={datos}
        autoPlay={true}
        rightItem={<FaAngleRight className='imageSelectors' />}
        leftItem={<FaAngleLeft className='imageSelectors' />}
        animationDuration={1000}
        headerTextType='black'
        subTextType='white'
        size='normal'
       
      />
  
    </div>
  );
};

export default CarouselInit;