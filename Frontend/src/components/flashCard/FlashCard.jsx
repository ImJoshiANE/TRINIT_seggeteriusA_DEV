import React, {useState} from 'react'
import ReactCardFlip from "react-card-flip";
import { Card } from '../ui/card';


const FlashCard = ({frontContent, backContent}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <div onClick={() => setIsFlipped(!isFlipped)}>
        <Card className="h-60 w-60 p-5 flex items-center justify-center">
          {frontContent}
        </Card>
      </div>

      <div onClick={() => setIsFlipped(!isFlipped)}>
        <Card className="h-60 w-60 p-5 flex items-center justify-center font-bold">
          {backContent}
        </Card>
      </div>
    </ReactCardFlip>
  );
}

export default FlashCard