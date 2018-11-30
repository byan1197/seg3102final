import React, {Component} from 'react';
// import { Link } from 'react-router-dom';
import Carousel from 'react-slick';
import styled from 'styled-components';
const asset = process.env.PUBLIC_URL + '/assets/';

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
`;
const CarouselWrapper = styled.div`
  width: 100%;
`;
const ImgTint = styled.div`
  background-color: rgba(10,10,10,1);
  background-blend-mode: multiply;
`;
const SlideImg = styled.img`
  width: 100%;
  opacity: 0.7;
`;
const HomeHeader = styled.div`
  position: fixed;
  width: fit-content;
  left: 4em;
  top: 5.5em;
  background-color: rgba(0,0,0,.4);
  background-blend-mode: multiply;
  border-radius: 10em;
`;
const Header = styled.h1`
  width: fit-content;
  color: #fff;
  font-weight: 100;
  margin-left: 0.5em;
  margin-right: 0.5em;
  font-size: 3em;
`;

class Home extends Component {
  render(){
    const settings = {
      infinite: true,
      speed: 200,
      fade: true,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerPadding: "60px",
      pauseOnHover: false
    }
    return(
      <HomeWrapper>
        <CarouselWrapper>
          <Carousel {...settings} >
            <ImgTint>
              <SlideImg alt='img2' src={asset+'house2.jpg'}/>
            </ImgTint>
            <ImgTint>
              <SlideImg alt='img3' src={asset+'house3.jpg'}/>
            </ImgTint>
            <ImgTint>
              <SlideImg alt='img4' src={asset+'house4.jpg'}/>
            </ImgTint>
            <ImgTint>
              <SlideImg alt='img5' src={asset+'house5.jpg'}/>
            </ImgTint>
          </Carousel>
        </CarouselWrapper>
        <HomeHeader>
          <Header>Welcome to OnPropRentals !</Header>
        </HomeHeader>
        {/*<Link to='/test'>Go to Test page</Link>*/}
      </HomeWrapper>
    )
  }
}

export default Home;
