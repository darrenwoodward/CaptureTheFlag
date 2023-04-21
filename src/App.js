import React, { useState, useEffect, useRef } from "react";

export default function App() {
  TypewriterFlag();
}

function TypewriterFlag() {
  const [isLoading, setIsLoading] = useState(true);

  const flagRef = useRef("");
  const setFlag = (value) => {
    flagRef.current = value;
  };

  useEffect(() => {
    fetch(
      "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/747269"
    )
      .then((response) => response.text())
      .then((text) => {
        setFlag(text);
        setIsLoading(false);
      });
  }, []);

  const [displayedFlag, setDisplayedFlag] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isLoading && !isTyping) {
      setIsTyping(true);
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedFlag(flagRef.current.substring(0, i + 1));
        i++;
        if (i === flagRef.current.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 500);
    }
  }, [isLoading, isTyping, flagRef]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {displayedFlag.split("").map((char, index) => (
            <li key={index}>{char}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

//Script used to get the hidden web address
/*function findFlagValues() {
  const flagValues = [];
  //Find all section elements where id starts with 11
  const sections = document.querySelectorAll('section[id^="11"]');
  sections.forEach((section) => {
    //Find all child main elements where id ends with 22
    const main = section.querySelector(`main[id$="22"]`);
    if (main) {
      //Find all child article element where id contains 33 (Assuming typo from directions)
      const article = main.querySelector(`article[id*="33"]`);
      //If ele exists search for p element with class flag
      if (article) {
        const p = article.querySelector(`p.flag`);
        //If p exists append value to flagValues Array
        if (p) {
          flagValues.push(p.getAttribute("value"));
        }
      }
    }
  });
  return flagValues;
}*/
