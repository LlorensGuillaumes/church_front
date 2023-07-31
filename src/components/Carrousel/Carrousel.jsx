import React from 'react'
import { Carousel } from '@sefailyasoz/react-carousel';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import "./Carrousel.css"

const Carrousel = ({carouselData}) => {

    // console.log({carouselData})
    let datos = [];

    for (const src of {carouselData}.carouselData) {
        const objCarusel = {
            headerText: null,
            subText: null,
            image: src,
        }

        datos.push(objCarusel)
        
    }
  return (
    <Carousel
    data={datos}
    autoPlay={true}
    rightItem={<FaArrowRight />}
    leftItem={<FaArrowLeft/>}
    animationDuration={3000}
    headerTextType='black'
    subTextType='white'
    size='normal'

    />
  )
}

export default Carrousel