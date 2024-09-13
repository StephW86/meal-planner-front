import { useEffect, useState } from "react";

const Greeting = () => {
  const [name, setName] = useState('');
  const names = ["Julian", "Marek", "Joe"]

  useEffect(() => {
    console.log(`We're in ${name}`)
  }, [name])

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const handleClick = () => {
    setName(names[getRandomInt(2)])
  }

  return (
      <div onClick={handleClick}>Hello {name}!</div>
  );
};

export default Greeting;