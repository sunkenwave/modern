import React, { PropTypes } from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { slideOne } from './slideIndicator';
import { Link } from 'react-router';
const project = data.project.slice(0, -6);
const topGames = require(`../../../${project}/components/games/gamesData.js`).topGames;

const settingsTabs = {
  arrows: false,
  centerMode: true,
  centerPadding: '40px',
  slidesToShow: 1,
  dots: false,
  infinite: true,
  speed: 500,
};

const CarouselTopGames = ({ user }) => {
  const slides = [];
  let url;

  const cashLink = <Link className="full-size" to="cash">.</Link>;
  const registrationLink = <Link className="full-size" to="registration">.</Link>;

  if (user) {
    if (!user.balance) {
      url = cashLink;
    }
  } else {
    url = registrationLink;
  }

  topGames.forEach((slide, i) => {
    if (user && user.balance) {
      url = <a className="full-size" href={slide.attributes['play-url']}>.</a>;
    }
    const assignmentSlide = Object.assign({}, slide);
    assignmentSlide.attributes['play-url'] = url;
    slides.push(slideOne(slide, i));
  });

  return (
    <div className="event-container event-container-tournaments event-container-tabs">
      <Slider {...settingsTabs}>
        {slides}
      </Slider>
    </div>
  );
};

CarouselTopGames.propTypes = {
  user: PropTypes.object,
};

const select = (state) => ({
  user: state.authorization.user,
});

export default connect(select)(CarouselTopGames);
