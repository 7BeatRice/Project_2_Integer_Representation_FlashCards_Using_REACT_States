import { useEffect } from "react";
import { useState } from "react";
const FlashCard = (props) => {
     const handleDifficulty = () => {
    switch (props.difficulty) {
      case 'easy':
        return 'lightgreen';
      case 'medium':
        return 'orange';
      case 'hard':
        return 'lightcoral';
      default:
        return 'white'; // default fallback
    }
  };

  const [bgColor, setBgColor] = useState('white');

  useEffect(() => {
    setBgColor(handleDifficulty());
  }, [props.difficulty]);

    return(
        <div className="card" onClick={props.onClick} style={{ backgroundColor: bgColor }}>
            <h1 className ="topic">{props.topic}</h1>
            <h2 className="statement">{props.statement}</h2>
            <img src={props.source} alt={props.topic}/>

        </div>
    );
}
export default FlashCard