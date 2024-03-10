import React, {useState} from 'react'
import ReactCardFlip from "react-card-flip";
import { Card } from '../ui/card';

const FlashCard = ({frontContent, backContent}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <div onClick={() => setIsFlipped(!isFlipped)}>
        <Card className="h-60 w-60 p-5 flex items-center justify-center text-lg bg-slate-800 text-white">
          <div className="flex items-center justify-center">{frontContent}</div>
        </Card>
      </div>

      <div onClick={() => setIsFlipped(!isFlipped)}>
        <Card className="h-60 w-60 p-5 flex flex-col items-center justify-center gap-5 bg-white text-black">
          <div className="flex items-center justify-center text-lg">{backContent}</div>
        </Card>
      </div>
    </ReactCardFlip>
  );
}

export default FlashCard