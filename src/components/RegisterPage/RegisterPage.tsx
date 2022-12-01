import { useState } from "react";
import styles from './RegisterPage.module.scss';
import { FC } from 'react';

interface Properties {
  passData: any,
};

const RegisterPage:FC<Properties > = ({passData=''}: Properties) => {

  const [login, setLogin] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [statuteAccepted, setStatuteAccepted] = useState<boolean>(false);
  const [incorrectEmail, setIncorrectEmail] = useState<boolean>(false);
  const [incorrectNumber, setIncorrectNumber] = useState<boolean>(false);
  const [incorrectCheckbox, setIncorrectCheckbox] = useState<boolean>(false);


  const star_wars_data = [passData.name, passData.created, passData.vehicles];

  const handleSubmit = () => {

    if (phoneNumber.length !== 11) {
      setIncorrectNumber(true)
    } else {
      setIncorrectNumber(false)
    };

    if (!email.includes('@')) {
      setIncorrectEmail(true)
    } else {
      setIncorrectEmail(false)
    };

    if (statuteAccepted === false) {
      setIncorrectCheckbox(true)
    } else {
      setIncorrectCheckbox(false)
    };

    if (phoneNumber.length === 11 && email && statuteAccepted) {
      fetchData()
    };
  };

  const fetchData = () => {

    const formData = {
      login: login,
      password: password,
      email: email,
      phoneNumber: phoneNumber,
      starWarsData: star_wars_data
    };

    //Data fetched//
    console.log("FetchData", formData)

    fetch('https://example/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((formData) => {
        console.log('Success:', formData);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };



  const handleMail = (emailValue: string) => {
    const eMailRegex = /^[a-z0-9]+\.?[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/
    if (!emailValue.match(eMailRegex)) {
      setIncorrectEmail(true);
    } else {
      setEmail(emailValue);
      setIncorrectEmail(false);
    }
  }

  const handlePhoneNumber = (numberValue: string) => {
    const phoneNumberRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{3}$/
    if (!numberValue.match(phoneNumberRegex)) {
      setIncorrectNumber(true);
    } else {
      setPhoneNumber(numberValue);
      setIncorrectNumber(false);
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>FORMULARZ REJESTRACYJNY</h2>
      <div className={styles.registerForm}>
        <p className={styles.inputLabel}>Login:</p>
        <input className={styles.login} type="text" placeholder="Enter Login" onChange={(e)=> setLogin(e.target.value)} />
        <p className={styles.inputLabel}>Hasło:</p>
        <input className={styles.password} type="password" placeholder="Enter Password" onChange={(e)=> setPassword(e.target.value)}/>
        <p className={styles.inputLabel}>Email</p>
        <input className={styles.email} type="email" placeholder="Enter email" onChange={(e)=> handleMail(e.target.value)}/>
        <p className={styles.inputLabel}>Numer telefonu:</p>
        <input className={styles.phone} type="text" placeholder="Format: 123-456-789" onChange={(e)=>handlePhoneNumber(e.target.value)}/>
        {incorrectEmail && <p className={styles.incorrectFormatMail}>Nieprawidłowy format adresu e-mail</p>}
        {incorrectNumber &&  <p className={styles.incorrectPhoneNumber}>Nieprawidłowy numer telefonu</p>}
      </div>
      <input className={styles.checkbox} type="checkbox" name="" id="" onChange={()=>setStatuteAccepted(!statuteAccepted)} />
      <p className={styles.checkboxDescription}>Akceptuję Regulamin</p>
      {incorrectCheckbox && <p className={styles.incorrectCheckbox}>Wymagana akceptacja regulaminu</p>}

      <button className={styles.buttonSave } onClick={handleSubmit}><span>zapisz</span></button>
    </div>
  );
}

export default RegisterPage
