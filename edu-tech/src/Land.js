import './Land.css';
import Py from './assets/OIP.jpeg';
import JS from './assets/OIP1.jpeg';
import Java from './assets/OIP2.jpeg';
import { Link } from 'react-router-dom';
import logo from './assets/edu-tech-high-resolution-logo-black-transparent.png';
import backg from './assets/Landing-page.png';
import Code from './assets/coding.png';

function Land() {
  return (
    <div className="App" style={{ backgroundImage: `url(${backg})`, backgroundPosition: 'center', height: '100vh' }}>
      <div className="logo">
        <Link to="">
        <img src={logo} alt="Edu-Tech Logo" />
        </Link>
      </div>
      <div className="search-container">
        <input type="text" placeholder="Search.." name="search" />
        <button type="submit"><i className="fa fa-search"></i></button>
      </div>
      <div>
        <div className="card1">
          <h1 className="ch1">Start Your Learning Journey Today!</h1>
          <p className="ch2">Sign Up for Free!</p>
          <button className="signup-button">
            <Link to="/form" className="signup-link">
              Sign Up
            </Link>
          </button>
        </div>
        <div className="card2">
          <h2>Master Coding for Free: Dive into Courses for Every Programming Language!</h2>
          <div className="language-box">
            <div className="container">
              <div id="myCarousel" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                  <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                  <li data-target="#myCarousel" data-slide-to="1"></li>
                  <li data-target="#myCarousel" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                  <div className="item active img">
                    <img src={Py} alt="Python" />
                  </div>
                  <div className="item img">
                    <img src={JS} alt="JS" />
                  </div>
                  <div className="item img">
                    <img src={Java} alt="Java" />
                  </div>
                </div>
                <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                  <span className="glyphicon glyphicon-chevron-left"></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a className="right carousel-control" href="#myCarousel" data-slide="next">
                  <span className="glyphicon glyphicon-chevron-right"></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card3">
      <h2>Master Coding for Free: Dive into Courses for Every Programming Language!</h2>
      <img src={Code} alt="code screen" />
    </div>
    </div>
  );
}

export default Land;
