import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';
import { FC } from 'react';

interface Person {
  name: string,
  eye_color: string,
  birth_year: string,
};

interface PassData {
  setPassData: any,
};

const Home: FC<PassData> = ({ setPassData = '' }: PassData) => {

  const [data, setData] = useState<Person>();
  const [number, setNumber] = useState<number>(1);
  const [photo, setPhoto] = useState('https://picsum.photos/534/383');

  useEffect(() => {
    fetch(`https://swapi.dev/api/people/${number}/`)
      .then((res) => res.json())
      .then((ppl) => setData(ppl))
  }, [number]);

  useEffect(() => {
    setPassData(data)
  }, [data]);

  const handleClick = () => {
    setNumber(prevState => prevState + 1)
    setPhoto('https://picsum.photos/534/383')
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.nameSurname}>Dominik Mrówka</h1>
      <div className={styles.mainComponent}>

        <img className={styles.image} src={photo} alt="" />

        <div className={styles.additionalButtons}>
          <div className={styles.addToFavorite}>
            <img src="./images/addToFavorite.svg" alt="" />
          </div>
          <div className={styles.checkButton}>
            <img src="./images/checkButton.svg" alt="" />
          </div>
        </div>

        <div className={styles.nameContainer}>
          <span>{data && data.name}</span>
        </div>

        <div className={styles.ageEyeColorContainer}>
          <h3>age: {data && data.birth_year}</h3>
          <h3>eye color: {data && data.eye_color}</h3>
        </div>

        <button className={styles.buttonNextProfile} onClick={() => handleClick()}><span>next profiles</span></button>

      </div>
      <Link to="/register"><button className={styles.buttonRegister}><span>formularz rejestracyjny</span></button></Link>
    </div>
  );
}

export default Home;