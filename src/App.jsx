import { useState } from 'react'
import './App.css'
import FlashCard from './componets/FlashCard'
import CardList from './componets/CardList'
import { cardList } from './componets/CardList'

const App = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0); // index into outer list
  const [sideIndex, setSideIndex] = useState(0); // 0 = front, 1 = back
  const [inputVal, setInputVal] = useState('');
  const [shuffledCards, setShuffledCards] = useState([]);
  const activeCards = shuffledCards.length > 0 ? shuffledCards : cardList;
  const [isCorrect, setIsCorrect] = useState(null); // null | true | false
  const [streak, setStreak] = useState(0); // current streak counter
  const normalize = (str) => str.toLowerCase().replace(/[^\w\d]/g, "");


  const handleSubmit = (e) => {
  e.preventDefault();

  // Don’t allow submit if showing the back (answer)
  if (sideIndex === 1) return;

  const currentCard = activeCards[currentCardIndex];
  const correctAnswer = getAnswer(currentCard);
  
  const normalizedUser = normalize(inputVal);
  const normalizedAnswer = normalize(correctAnswer);

  if (normalizedUser === normalizedAnswer) {
    setIsCorrect(true);
    setStreak(prev => prev + 1);
  } else {
    setIsCorrect(false);
    setStreak(0);
  }
};

  
  //get the acutal answer
  const getAnswer= (card) => {
  const backText = card[1].statement; // index 1 = back side
  const answerMatch = backText.match(/Answer:\s*(.*)/i);
  return answerMatch ? answerMatch[1].trim() : "";
};


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
//shufflecards
const  handleShuffle = (cardList) => {
  const copy = [...cardList]; // avoid changing  original array
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
   setShuffledCards(copy);
    setSideIndex(0);
    setIsCorrect(null);
    setInputVal('');
}

// Go to a random card (excluding index 0
const randCard = () => {
  if (shuffledCards.length === 0) return;

      const max = activeCards.length - 1;
    let rand;
    do {
      rand = getRandomIntInclusive(0, max);
    } while (rand === currentCardIndex);

    setCurrentCardIndex(rand);
    setSideIndex(0);
    setIsCorrect(null);
     setInputVal('');
};
 //go to next card
 const handleNext = () => {
    if (currentCardIndex <  activeCards.length - 1){
      setCurrentCardIndex(currentCardIndex + 1);
      setSideIndex(0);
      setIsCorrect(null);
      setInputVal('');
    }
 }
 //go to prev card 
  const handlePrev = () => {
    if (currentCardIndex > 0){
      setCurrentCardIndex(currentCardIndex - 1);
      setSideIndex(0);
      setIsCorrect(null);
      setInputVal('');
    }
 }


  return (
    <div className='App'>
      <div className='header'>
        <h1 className="title">Computer Architecture and Organization: Integer Representation</h1>
        <h3 className="overview">It is important to remember that computers only know what we tell them.<br></br>
              This includes how they interpret integers. Computers can only understand series of ones and zeros-Binary-<br></br>
              , therefore we must interpret the various ways integers can be represented as binary.
        </h3>
        <h3>Number of Cards: 20</h3>
        <h3 style={{ color: 'white' }}>Current Streak: {streak}</h3>
      </div>
       <CardList 
        cards={shuffledCards.length > 0 ? shuffledCards : cardList}
        currentCard={currentCardIndex}
        side={sideIndex}
        onFlip={handleFlip}
      />
      <form onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder="Type your answer here..."
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        className={
          isCorrect === null
            ? ""
            : isCorrect
            ? "input-correct"
            : "input-incorrect"
        }/>

        <input type = "submit"/>
      </form>
      <div className='buttons'>
           <button onClick={handlePrev} className= {currentCardIndex === 0? "disabled-button" : "button"} disabled = {currentCardIndex === 0 }>
            <svg
              xmlns="http://www.w3.org/2001/svg"
              width="24" height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
            <polyline points="15 18 9 12 15 6" />
            </svg>
        </button>
       <button onClick={handleNext} className={currentCardIndex === activeCards.length-1? "disabled-button" : "button"} disabled = {currentCardIndex === activeCards.length -1}>
            <svg
              xmlns="http://www.w3.org/2001/svg"
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
     <button onClick={() => handleShuffle(cardList)} className= "button">Shuffle </button>  
    </div>

     
    </div>
  );
}

export default App
