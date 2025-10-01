import { useState } from 'react'
import './App.css'
import FlashCard from './componets/FlashCard'
import CardList from './componets/CardList'
import { cardList } from './componets/CardList'

const App = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0); // index into outer list
  const [sideIndex, setSideIndex] = useState(0); // 0 = front, 1 = back

  // Flip the card (side)
  const handleFlip = () => {
    setSideIndex(side => (side === 0 ? 1 : 0));
  };

  //set random index
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  // Go to a random card (excluding index 0)
  const handleNext = () => {
    const max = cardList.length - 1;
    let rand;
    do {
      rand = getRandomIntInclusive(1, max); // exclude 0, allow max
    } while (rand === currentCardIndex); // avoid current card

    setCurrentCardIndex(rand);
    setSideIndex(0);

  };
  return (
    <div className='App'>
      <div className='header'>
        <h1 className="title">Computer Architecture and Organization: Integer Representation</h1>
        <h3 className="overview">It is important to remember that computers only know what we tell them.<br></br>
              This includes how they interpret integers. Computers can only understand series of ones and zeros-Binary-<br></br>
              , therefore we must interpret the various ways integers can be represented as binary.
        </h3>
        <h3>Number of Cards: 20</h3>
      </div>
        <CardList 
        currentCard={currentCardIndex}
        side={sideIndex}
        onFlip={handleFlip}
      />
     <button onClick={handleNext} className="next-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24" height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
     </button>
     
    </div>
  );
}

export default App
