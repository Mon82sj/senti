import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [activePage, setActivePage] = useState('home'); // Track active page
  const user={image_url:'https://i.pinimg.com/474x/cb/1e/6b/cb1e6b78315ec3c7506063e7c3513c50.jpg',
    logo : 'https://img.icons8.com/?size=100&id=MWUdGkQ1pfjQ&format=png&color=F25081'
  };

  const analyzeSentiment = async () => {
    try {
      const response = await fetch('https://senti-4245-server.vercel.app/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      if (response.ok) {
        setResult(data);
        setError('');
      } else {
        setResult(null);
        setError(data.error || 'Error analyzing sentiment');
      }
    } catch (err) {
      setError('Error analyzing sentiment');
    }
  };

  // Function to render the active page content
  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return(<div>
          <img src={user.logo}/><br/>
          <h1 className="pheading-1">Welcome to Emo , The Sentiment Analysis Model</h1>
          <button className='Front-button' onClick={()=>setActivePage('front-page')}>Click to Start!!</button>
        </div>);
      case 'front-page':
        return (
          <div>
            <h2 className="heading-2">Sentiment Analysis</h2>
            <textarea
              color='rgb(255,0,98)'
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text here..."
            /><br /><br /><br />
            <button className="button" onClick={analyzeSentiment}>Analyze</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {result && (
              <div>
                <p className="left">Sentiment:</p><p> {result.sentiment} {result.emoji}</p>
                <p className="left">Scores:</p><p> {JSON.stringify(result.intensity)}</p>
              </div>
            )}
          </div>
        );  
      case 'contact':
        return (
          <div>
            <h2 className="heading-2">Contact Us</h2>
            <p className='contact-description'>If you have any questions, feel free to reach out to us at support@sentimentanalysis.com.</p>
            <br/>
            <p></p>
          </div>
        );
      case 'about':
        return (
          <div >
            <h2 className="heading-2">About Us</h2><br />
            <p className='about-description'>
Welcome to Emo, your go-to platform for advanced sentiment analysis.
We are passionate about helping individuals and businesses understand 
the emotional tone of their text data, enabling better decision-making 
                and deeper insights.

At Emo, we believe that every piece of text carries a sentiment, 
whether it’s a simple social media post, a customer review, or a 
detailed report. Our state-of-the-art sentiment analysis tools
 utilize cutting-edge natural language processing techniques 
 to evaluate and interpret the emotions behind the words.

<b>Our Mission:</b>
To empower our users with the tools and insights needed 
to decode emotions and sentiments in textual data, 
fostering more meaningful connections and smarter 
      communication strategies.

<b>Our Vision:</b>
To become a leader in sentiment analysis technology,
providing accurate, reliable, and user-friendly 
solutions for a diverse range of applications.

<b>What We Offer:</b>

<b>Real-Time Analysis:</b> 
Get instant feedback on the sentiment of your text.

<b>User-Friendly Interface:</b> 
Our platform is designed with simplicity and ease 
of use in mind.
<b>Advanced Technology:</b> 
We leverage powerful AI models to deliver precise
sentiment scores.

Whether you're a marketer looking to understand 
customer feedback, a researcher analyzing social 
trends, or just someone curious about the sentiment 
of your text, Emo is here to provide you with the 
tools and insights you need to succeed.

Thank you for choosing Emo. 
We look forward to helping you uncover the emotions behind your words!

</p>
          </div>
        );
      default:
        return null;
    }
  };

  

  return (
      <>
      <center>

      <div className='menu-bar'>
      <img src={user.logo} className='Logo'/>
      <p className="nav">EMO</p>
          <button className="nav-link" onClick={()=>setActivePage('home')}>Home</button>
          <button className="nav-link" onClick={()=>setActivePage('front-page')}>Analyze Sentiment</button>
          <button className="nav-link" onClick={()=>setActivePage('about')}>About</button>
          <button className="nav-link" onClick={()=>setActivePage('contact')}>Contact</button>
      </div>
      <hr />
      <>
      <div className='Quote-1'>
      <h2>"The true measure of a sentiment <br/>is not in the words themselves,<br/>
      but in the emotions <br/>they evoke and the context they inhabit."</h2>
    </div>
      <table>
        <tr>
          <td><img className='emotions' src={user.image_url}/></td>
          <td>
            <center>
            <div className="App">
              <h1 className="heading-1" >Emo</h1>
              <nav className="navbar">

              </nav>
              {renderContent()} {/* Render the content based on the active page */}
            </div>
            </center>
          </td>
        </tr>
      </table>
      </>
      
    </center>
      </>
  );
}

export default App;
