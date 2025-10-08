import FlashCard from "./FlashCard";
import { useState } from 'react';
import React, { useEffect } from 'react';
const cardList = [
  // 5 easy pairs
  [
    {
      topic: "Start",
      statement: "Are you ready to begin learning? Click this card.",
      source: "https://t4.ftcdn.net/jpg/01/25/02/63/360_F_125026399_mEAS8Q6djKKZ8XBAa3V9YMnLWZejm5gO.jpg",
      difficulty: "default"
    },
    {
      topic: "Start",
      statement: "To begin learning, click the next button [->]",
      source: "https://t4.ftcdn.net/jpg/01/25/02/63/360_F_125026399_mEAS8Q6djKKZ8XBAa3V9YMnLWZejm5gO.jpg",
      difficulty: "default"
    }
  ],
  [
    {
      topic: "Octal to Decimal",
      statement: "Convert (1431)₈ to decimal.",
      source: "https://media.geeksforgeeks.org/wp-content/uploads/20230608111602/C-Program-For-Octal-to-Decimal-Conversion.png",
      difficulty: "easy"
    },
    {
      topic: "Octal to Decimal",
      statement: "Answer: (1431)₈ = 793₁₀.",
      source: "https://media.geeksforgeeks.org/wp-content/uploads/20230608111602/C-Program-For-Octal-to-Decimal-Conversion.png",
      difficulty: "easy"
    }
  ],
  [
    {
      topic: "Boolean Operation",
      statement: "What is the result of x & y if x=0x49fC, y=0xA178?",
      source: "https://i.ytimg.com/vi/7dvqfpXEjdg/maxresdefault.jpg",
      difficulty: "easy"
    },
    {
      topic: "Boolean Operation",
      statement: "Answer: 0x0178",
      source: "https://i.ytimg.com/vi/7dvqfpXEjdg/maxresdefault.jpg",
      difficulty: "easy"
    }
  ],
  [
    {
      topic: "Byte Ordering",
      statement: "How is unsigned x=42 stored in little-endian memory?",
      source: "https://pythontic.com/BigEndian-LittleEndian.png",
      difficulty: "easy"
    },
    {
      topic: "Byte Ordering",
      statement: "Answer: Mem[0x208A: 2A, 0x208B: 00, 0x208C: 00, 0x208D: 00]",
      source: "https://pythontic.com/BigEndian-LittleEndian.png",
      difficulty: "easy"
    }
  ],
  [
    {
      topic: "Shift Operations",
      statement: "Calculate (x << 4) | (x >> 12) for x=0x49fC.",
      source: "https://media.geeksforgeeks.org/wp-content/uploads/20240618173455/Left-Shift-in-c-cpp.webp",
      difficulty: "easy"
    },
    {
      topic: "Shift Operations",
      statement: "Answer: 0x9FC4",
      source: "https://media.geeksforgeeks.org/wp-content/uploads/20240618173455/Left-Shift-in-c-cpp.webp",
      difficulty: "easy"
    }
  ],

  // 4 medium pairs
  [
    {
      topic: "Conversion Between Bases",
      statement: "(1431)₈ to base 16.",
      source: "https://i.ytimg.com/vi/jA0VXOZnXQ8/maxresdefault.jpg",
      difficulty: "medium"
    },
    {
      topic: "Conversion Between Bases",
      statement: "Answer: (319)₁₆.",
      source: "https://i.ytimg.com/vi/jA0VXOZnXQ8/maxresdefault.jpg",
      difficulty: "medium"
    }
  ],
  [
    {
      topic: "Working in Bases",
      statement: "Find all radix-k such that 1234 + 5432 = 6666.",
      source: "https://i.ytimg.com/vi/jA0VXOZnXQ8/maxresdefault.jpg",
      difficulty: "medium"
    },
    {
      topic: "Working in Bases",
      statement: "Answer: All k > 6.",
      source: "https://i.ytimg.com/vi/jA0VXOZnXQ8/maxresdefault.jpg",
      difficulty: "medium"
    }
  ],
  [
    {
      topic: "Signed and Unsigned Conversion",
      statement: "What is the unsigned representation of -142 in short int?",
      source: "https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fscs.hosted.panopto.com%2FPanopto%2FPages%2FViewer%2FThumb.aspx%3FeventTargetPID%3Df02fb73c-8769-43de-a970-bda301209a04%26sessionPID%3D57b29532-2a7d-4dac-8168-8892127d9e49%26number%3D20%26isPrimary%3Dfalse%26absoluteTime%3D13076614406.5337",
      difficulty: "medium"
    },
    {
      topic: "Signed and Unsigned Conversion",
      statement: "Answer: 0xff72 (65394 decimal).",
      source: "https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fscs.hosted.panopto.com%2FPanopto%2FPages%2FViewer%2FThumb.aspx%3FeventTargetPID%3Df02fb73c-8769-43de-a970-bda301209a04%26sessionPID%3D57b29532-2a7d-4dac-8168-8892127d9e49%26number%3D20%26isPrimary%3Dfalse%26absoluteTime%3D13076614406.5337",
      difficulty: "medium"
    }
  ],
  [
    {
      topic: "Weighted Codes",
      statement: "Determine if code C1 is weighted or non-weighted.",
      source: "https://www.tutorialspoint.com/computer_logical_organization/images/weighted_code.jpg",
      difficulty: "medium"
    },
    {
      topic: "Weighted Codes",
      statement: "Answer: Weighted with weights [8,4,-2,-1].",
      source: "https://www.tutorialspoint.com/computer_logical_organization/images/weighted_code.jpg",
      difficulty: "medium"
    }
  ],
  [
    {
      topic: "Boolean Operations",
      statement: "Calculate (x ^ y) | ~(z | x) for x=0x49fC, y=0xA178, z=0x517d.",
      source: "https://i.ytimg.com/vi/7dvqfpXEjdg/maxresdefault.jp",
      difficulty: "medium"
    },
    {
      topic: "Boolean Operations",
      statement: "Answer: 0xEE86",
      source: "https://i.ytimg.com/vi/7dvqfpXEjdg/maxresdefault.jp",
      difficulty: "medium"
    }
  ],
  [
    {
      topic: "Byte Ordering",
      statement: "How is short y=-17 stored in big-endian?",
      source: "https://assets.bytebytego.com/diagrams/0084-big-endian-vs-little-endian.png",
      difficulty: "medium"
    },
    {
      topic: "Byte Ordering",
      statement: "Answer: Mem[0x2094: FF, 0x2095: EF]",
      source: "https://assets.bytebytego.com/diagrams/0084-big-endian-vs-little-endian.png",
      difficulty: "medium"
    }
  ],
  [
    {
      topic: "Conversions and Truncation",
      statement: "What is the long signed representation of 14159?",
      source: "https://jappavoo.github.io/UndertheCovers/textbook/images/truncation.png",
      difficulty: "medium"
    },
    {
      topic: "Conversions and Truncation",
      statement: "Answer: 0x000000000000374F",
      source: "https://jappavoo.github.io/UndertheCovers/textbook/images/truncation.png",
      difficulty: "medium"
    }
  ],
  [
    {
      topic: "Boolean and Shift",
      statement: "Calculate z & 0xF0F0 where z=0x517d.",
      source: "https://i.ytimg.com/vi/7dvqfpXEjdg/maxresdefault.jp",
      difficulty: "medium"
    },
    {
      topic: "Boolean and Shift",
      statement: "Answer: 0x5070",
      source: "https://i.ytimg.com/vi/7dvqfpXEjdg/maxresdefault.jp",
      difficulty: "medium"
    }
  ],
  [
    {
      topic: "Base58 Encoding",
      statement: "Encode (78712)₁₀ in Bitcoin base-58 alphabet (4 digits).",
      source: "https://blog.boot.dev/img/800/Screen-Shot-2020-03-02-at-11.31.40-AM-1024x773.png",
      difficulty: "medium"
    },
    {
      topic: "Base58 Encoding",
      statement: "Answer: 1QQ7",
      source: "https://blog.boot.dev/img/800/Screen-Shot-2020-03-02-at-11.31.40-AM-1024x773.png",
      difficulty: "medium"
    }
  ],

  // 5 hard pairs
  [
    {
      topic: "Conversion Between Bases [H]",
      statement: "Convert (11001101.0101)₂ to base 8 and base 4.",
      source: "https://i.ytimg.com/vi/jA0VXOZnXQ8/maxresdefault.jpg",
      difficulty: "hard"
    },
    {
      topic: "Conversion Between Bases [H]",
      statement: "Answer: (315.24)₈, (3031.11)₄.",
      source: "https://i.ytimg.com/vi/jA0VXOZnXQ8/maxresdefault.jpg",
      difficulty: "hard"
    }
  ],
  [
    {
      topic: "Working in Bases [H]",
      statement: "Find radix-k such that 302/20 = 12.1.",
      source: "https://i.ytimg.com/vi/jA0VXOZnXQ8/maxresdefault.jp",
      difficulty: "hard"
    },
    {
      topic: "Working in Bases [H]",
      statement: "Answer: k = 4.",
      source: "https://i.ytimg.com/vi/jA0VXOZnXQ8/maxresdefault.jp",
      difficulty: "hard"
    }
  ],
  [
    {
      topic: "Boolean and Shift Operations",
      statement: "What is the value of ((x << 4) | (x >> 12)) for x=0x49fC?",
      source: "https://media.geeksforgeeks.org/wp-content/uploads/20240618173455/Left-Shift-in-c-cpp.webp",
      difficulty: "hard"
    },
    {
      topic: "Boolean and Shift Operations",
      statement: "Answer: 0x9FC4",
      source: "https://media.geeksforgeeks.org/wp-content/uploads/20240618173455/Left-Shift-in-c-cpp.webp",
      difficulty: "hard"
    }
  ],
  [
    {
      topic: "Weighted Codes [H]",
      statement: "Verify if C1 is weighted code with weights [8,4,-2,-1].",
      source: "https://www.tutorialspoint.com/computer_logical_organization/images/weighted_code.jpg",
      difficulty: "hard"
    },
    {
      topic: "Weighted Codes [H]",
      statement: "Answer: Yes, it is weighted.",
      source: "https://www.tutorialspoint.com/computer_logical_organization/images/weighted_code.jpg",
      difficulty: "hard"
    }
  ],
  [
    {
      topic: "Base58 Encoding [H]",
      statement: "Encode (123456)₁₀ in Bitcoin base-58 alphabet.",
      source: "https://blog.boot.dev/img/800/Screen-Shot-2020-03-02-at-11.31.40-AM-1024x773.png",
      difficulty: "hard"
    },
    {
      topic: "Base58 Encoding [H]",
      statement: "Answer: 4ERh",
      source: "https://blog.boot.dev/img/800/Screen-Shot-2020-03-02-at-11.31.40-AM-1024x773.png",
      difficulty: "hard"
    }
  ]
];

    
const CardList = ({ cards, currentCard, side, onFlip }) => {
  const card = cards[currentCard][side];

  return (
    <FlashCard
      onClick={onFlip}
      topic={card.topic}
      statement={card.statement}
      source={card.source}
      difficulty={card.difficulty}
    />
  );
};

export { cardList }
export default CardList