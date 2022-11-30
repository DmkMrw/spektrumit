import { useEffect, useState } from "react";
import { Link, NavLink } from 'react-router-dom';

interface Person {
  name: string,
  height: number,
}

const Home = () => {
const [data, setData] = useState<Person>();
  const [number, setNumber] = useState<number>(1);
  const [photo, setPhoto] = useState('https://picsum.photos/534/383')

  useEffect( () => {
    fetch(`https://swapi.dev/api/people/${number}/`)
    .then((res) => res.json())
    .then((ppl) => setData(ppl))
  }, [number])

  const handleClick = () => {
    setNumber(prevState => prevState + 1)
    setPhoto('https://picsum.photos/534/383')
  }

  return (
    <div>
      <h1>Dominik Mrówka</h1>
      <Link to="/register"><button>Register</button></Link>
      <h1>{data && data.name}</h1>
      <h2>{data && data.height}</h2>
      <button onClick={() => handleClick()}>Button</button>
      <img src={photo} alt="" />
    </div>
  );
}

export default Home;