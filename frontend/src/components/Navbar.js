import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="header" style={{ color: "black" }}>
      <a href="/" className="logo">
    <img src="/logo" alt=" " className="logo-img" />
    <span className="logo-text">blockVOTE</span>
  </a>
      <nav className="navbar">
        <div className="linkcomponents">
          <Link to="/">Home</Link>
          <Link to="/addvoter">Add Voter</Link>
          <Link to="/addcandidate">Add Candidate</Link>
          <Link to="/election">Voting</Link>
          <Link to="/setelection">SetElelction</Link>
          <Link to="/result">Result</Link>
          <Link to="/stats">Stats</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
