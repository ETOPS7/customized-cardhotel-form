import React, { useState } from "react";
import styles from "./Card.module.css";
import {
  BsFillBookmarkPlusFill,
  BsFillStarFill,
  BsFillBookmarkCheckFill,
} from "react-icons/bs";
import { ICard } from "../../App";

export interface CardProps extends ICard {
  toggleFav: (id: number) => void;
}

export default function Card(props: CardProps) {
  const { rate, name, location, price, id, toggleFav, isFav} = props;

  const handleToggleFav = () => {
    toggleFav(id)
  };

  const formatedPrice = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 2,
    style: "currency",
    currency: "EUR",
  }).format(price);

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <div className={styles.rateStar}>
          <BsFillStarFill />
          <div className={styles.rateNum}>{rate}</div>
        </div>
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{name}</h3>
        <span className={styles.location}>{location}</span>

        <div className={styles.bottomBoxFlex}>
          <div className={styles.priceBox}>
            <span className={styles.price}>{formatedPrice}</span>
            <span className={styles.location}> /night</span>
          </div>

          <div className={styles.favoriteBox} onClick={handleToggleFav}>
            <div className={styles.icon}>
              {isFav ? (
                <BsFillBookmarkPlusFill />
              ) : (
                <BsFillBookmarkCheckFill
                  style={{ fontSize: "22px", color: "green" }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
