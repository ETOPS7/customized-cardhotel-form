import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { ICard } from "../App";
import styles from "./HotelForm.module.css";

const initialValues = {
  name: "",
  location: "",
  price: 0,
  rate: 0,
};

export default function HotelForm({
  addHotel,
}: {
  addHotel: (values: Omit<ICard, "id" | "isFav">) => void;
}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<ICard>>({});
  const ref = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref2.current?.focus();
  }, []);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!Object.keys(validateValues(values)).length) {
      addHotel(values);
      setValues(initialValues);
    }
  };

  const validateValues = (values: Omit<ICard, "id" | "isFav">) => {
    const errors = {} as any;
    if (values.name.length < 5) {
      errors.name = "Too short name";
    }
    setErrors(errors);
    return errors;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    const newValues = { ...values };
    // @ts-ignore
    newValues[name] = value;
    setValues(newValues);
  };
  return (
    <div>
      {/* {JSON.stringify(values)}
      {JSON.stringify(errors)} */}
      <h2>New hotel</h2>
      <form className={styles.form}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            ref={ref}
            type="text"
            id="name"
            name="name"
            value={values.name}
            className={errors.name ? styles.error : ""}
            placeholder="Enter name.."
            onChange={onChange}
          />
        </div>
        {errors.name && <p className={styles.errorTitle}>{errors.name}</p>}
        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={values.location}
            placeholder="Enter location.."
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={values.price}
            placeholder="Enter price.."
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="rate">Rate</label>
          <input
            type="number"
            min="0"
            max="5"
            placeholder="Enter rate.."
            id="rate"
            name="rate"
            value={values.rate}
            onChange={onChange}
          />
        </div>
        <button type="submit" onClick={onSubmit}>
          Add
        </button>
      </form>
    </div>
  );
}
