import React, { useState, useEffect } from "react";

const Quote = () => {
  const [quote, setQuote] = useState({
    text: "Better than a thousand hollow words is one word that brings peace.",
    author: "Buddha",
  });

  const url = "https://type.fit/api/quotes";

  function generateQuote() {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let randomNum = Math.floor(Math.random() * data.length);
        setQuote(data[randomNum]);
      });
  }

  useEffect(() => {
    generateQuote();
  }, []);

 

  return (
    <div class="quote-wrapper">
      <h2>Quote Of The Day</h2>
      <blockquote id="quote-text">{quote.text}</blockquote>
      <cite id="quote-author"> -- {quote.author}</cite>
      <button onClick={() => generateQuote()} type="button" id="gen-new-quote">
        Get New Quote
      </button>
    </div>
  );
};

export default Quote;
