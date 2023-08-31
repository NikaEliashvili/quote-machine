import { useState, useEffect } from "react";
import { FaQuoteLeft, FaTumblr } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import "./App.css";

function App() {
  const [quotes, setQuotes] = useState({});
  const [color, setColor] = useState("#8a2be2");
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    const fetchQuotes = async () => {
      try {
        const response = await fetch(
          `https://api.api-ninjas.com/v1/quotes?category=learning`,
          {
            method: "GET",
            headers: {
              "X-Api-Key": "zksk4CNBgsviRb1goGG5Ng==FwK4DgzKGuyVnSWV",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setLoad(false);
        setQuotes(result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchQuotes();
  }, [color, setColor]);
  function getRandomColor() {
    const colors = [
      "#16a085",
      "#27ae60",
      "#2c3e50",
      "#f39c12",
      "#e74c3c",
      "#9b59b6",
      "#FB6964",
      "#342224",
      "#472E32",
      "#BDBB99",
      "#77B1A9",
      "#73A857",
    ];
    const randNum = Math.floor(Math.random() * (colors.length - 1));
    setColor(colors[randNum]);
  }

  function newQuote() {
    console.log("BTN is clicked!!!");
    getRandomColor();
  }

  const backColor = { backgroundColor: color };
  const fontColor = { color: color };

  return (
    <div id="wrapper" style={backColor}>
      <div id="quote-box">
        {load ? (
          <div className="loading" style={{ borderColor: color }}></div>
        ) : (
          <>
            <div className="quote-text" style={fontColor}>
              <FaQuoteLeft className="quote-icon" />
              <span id="text">{quotes[0]?.quote}</span>
            </div>
            <div className="quote-author" style={fontColor}>
              - <span id="author">{quotes[0]?.author}</span>
            </div>
          </>
        )}
        <div className="buttons">
          <a
            className="button"
            title="Tweet this quote!"
            id="tweet-quote"
            target="_blank"
            style={backColor}
            href={`
            https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="${quotes[0]?.quote}"  - ${quotes[0]?.author}`}
          >
            <FaTwitter />
          </a>
          <a
            className="button"
            id="tumblr-quote"
            title="Post this quote on tumblr!"
            target="_blank"
            style={backColor}
            href={`
            https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${quotes[0]?.author}&content=${quotes[0]?.quote}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button
            `}
          >
            <FaTumblr />
          </a>
          <button
            className="button"
            id="new-quote"
            onClick={newQuote}
            style={backColor}
            disabled={load ? true : false}
          >
            New quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
