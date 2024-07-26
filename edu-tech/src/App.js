import './App.css';

function App() {
  return (
    <div className="App">
    <div className="logo"></div>
    <div className="search-container">
          <input type="text" placeholder="Search.." name="search" />
          <button type="submit"><i className="fa fa-search"></i></button>
      </div>
      <div className="part1">
        <div className="card1">
          <h1 className="h1">Start Your Learning Journey Today!</h1>
          <p className="h2">Sign Up for Free!</p>
          <button className="b1">Sign Up</button>
        </div>
        {/* <div className="card">
          <h2>Master Coding for Free: Dive into Courses for Every Programming Language!</h2>
          <div className="language-box">
            <p>Java</p>
          </div>
        </div>
        <div className="card">
          <h2>Unlock Your Potential:</h2>
          <p>Explore a wide range of interactive courses designed to enhance your skills and knowledge</p>
        </div> */}
      </div>
      </div>
  );
}

export default App;
