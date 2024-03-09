import React from "react";
import "./OneFlashCard.css";

export const OneFlashCard = ({ front, back }) => {
  return (
    <div className="flash_card_container">
      <div className="the_flash_card"></div>
      <div className="the_flash_card_front">
        <img
          className="hoverbox__image"
          src="https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Njk2OTQxOTc&ixlib=rb-4.0.3&q=80"
          alt="Test Img"
        />
        <h3>Title of the Flash Card</h3>
        <a href="">More info</a>
      </div>
      <div className="the_flash_card_back">Back</div>
    </div>
  );
};
