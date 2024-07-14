import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css'; // Assuming you have a CSS file for styling
import girlImage from './img/girl.jpg'; 


function Home() {
  const [file, setFile] = useState(null);
  const [upvotes, setUpvotes] = useState(24);
  const [position, setPosition] = useState(18);
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);
  const [burst, setBurst] = useState(false);

  const comments = [
    "This dress is stunning, the pattern is so unique!",
    "The color combination is perfect, really eye-catching!",
    "The fit looks amazing, very flattering.",
    "Love the little details, like the buttons and stitching.",
    "Overall, it’s a stylish and beautifully designed piece!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCommentIndex((prevIndex) => (prevIndex === comments.length - 1 ? 0 : prevIndex + 1));
    }, 5000); // Change comment every 5 seconds

    return () => clearInterval(interval);
  }, []); // Run effect only once on component mount

  const handleFileUpload = (event) => {
    setFile(URL.createObjectURL(event.target.files[0]));
  };

  const handleThumbClick = () => {
    const newUpvotes = upvotes + 1;
    setUpvotes(newUpvotes);
    if (newUpvotes >= 50) {
      setPosition(12);
    } else if (newUpvotes >= 30) {
      setPosition(15);
    }
    setBurst(true);
    setTimeout(() => setBurst(false), 600); // Reset burst effect after animation
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/success');
  };

  return (
    <div className="container">
      <div className="left-column">
        <div className="profile">
          <img src={girlImage} alt="User" />
          <h2>PROFILE</h2>
          <div className="info">
            <p>USERNAME: PRICKYARTS</p>
            <p>EMAIL: pricky15@.....</p>
            <p>PHONE NO: 98566xxxxx</p>
          </div>
        </div>

        <div className="position">
          <h3>CURRENT POSITION</h3>
          <div className="position-info">
            <span className="icon-up">↑</span>
            <span>{position}th</span>
            <span className="icon-down">↓</span>
          </div>
        </div>

        <div className="comments">
          <h3>COMMENTS</h3>
          <p>{comments[currentCommentIndex]}</p>
        </div>
      </div>

      <div className="right-column">
        <div className="design">
          <h2>MY DESIGN</h2>
          <div className="upload-box">
            {file ? (
              <img src={file} alt="Design" className="thumbnail" onClick={handleThumbClick} />
            ) : (
              <label htmlFor="file-upload" className="file-upload">
                <div className="upload-placeholder">
                  <img src="upload_icon.png" alt="Upload" className="upload-icon" />
                  <p>Upload your DESIGN here</p>
                </div>
                <input id="file-upload" type="file" onChange={handleFileUpload} />
              </label>
            )}
          </div>
          <button className="submit" onClick={handleSubmit}>SUBMIT</button>
          <div className="upvotes" onClick={handleThumbClick}>
            <span role="img" aria-label="thumbs-up">👍</span>
            <div className="burst">
              {burst && (
                <>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </>
              )}
            </div>
            UPVOTES: {upvotes}
          </div>
        </div>
      </div>
    </div>
  );
}

function Success() {
  return (
    <div className="success-message">
      <h1>CONGRATULATIONS ! YOUR DESIGN IS SUCCESSFULLY SUBMITTED</h1>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
