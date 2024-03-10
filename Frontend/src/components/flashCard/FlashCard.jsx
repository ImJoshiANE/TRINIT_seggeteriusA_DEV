import React, {useState} from 'react'
import ReactCardFlip from "react-card-flip";
import { Card } from '../ui/card';

const FlashCard = ({idx, frontContent, backContent, flashs, setFlashs}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const removeFlash = () => {
    console.log(idx)
    setFlashs((prevFlashs) => {
      const updatedFlashs = [...prevFlashs.slice(0, idx), ...prevFlashs.slice(idx + 1)];
      return updatedFlashs;
    });
  }

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <div onClick={() => setIsFlipped(!isFlipped)}>
        <Card className="h-60 w-60 p-5 grid items-center justify-center text-lg bg-slate-800 text-white hover:cursor-pointer">
          <div className="flex items-center justify-center h-40">{frontContent}</div>
          <div className="h-6 w-6 bg-white text-slate-800 flex items-center justify-center rounded-md hover:cursor-pointer ml-44" onClick={() => removeFlash()}>X</div>
        </Card>
      </div>

      <div onClick={() => setIsFlipped(!isFlipped)}>
        <Card className="h-60 w-60 p-5 flex flex-col items-center justify-center gap-5 bg-white text-black hover:cursor-pointer">
          <div className="flex items-center justify-center text-lg">{backContent}</div>
        </Card>
      </div>
    </ReactCardFlip>
  );
}

export default FlashCard