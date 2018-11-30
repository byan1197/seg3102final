import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-slick';
import styled from 'styled-components';
const asset = process.env.PUBLIC_URL + '/assets/';

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x hidden;
`;
const CarouselWrapper = styled.div`
  width: 100%;
`;
const SlideImg = styled.img`
  width: 100%;
  opacity: 0.75;
`;
// const HomeHeader = styled.h1`
//   display: inline-block;
//   width: 500;
// `;

class Home extends Component {
  render(){
    const settings = {
      infinite: true,
      speed: 200,
      fade: true,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerPadding: "60px"
    }
    return(
      <HomeWrapper>
        <CarouselWrapper>
          <Carousel {...settings} >
            <div>
              <SlideImg alt='img2' src={asset+'house2.jpg'}/>
            </div>
            <div>
              <SlideImg alt='img3' src={asset+'house3.jpg'}/>
            </div>
            <div>
              <SlideImg alt='img4' src={asset+'house4.jpg'}/>
            </div>
            <div>
              <SlideImg alt='img5' src={asset+'house5.jpg'}/>
            </div>
          </Carousel>
        </CarouselWrapper>
        <Link to='/test'>Go to Test page</Link>
      </HomeWrapper>
    )
  }
}

export default Home;
