import React from "react";
import Navbar from "./Navbar.js";

const Home = () => {
  return (
    <>
      <Navbar></Navbar>
      <section class="home">
        <div class="home-container">
          <div class="home-content">
            <h1 className="head">Instructions</h1>
            <div class="instruction">
              <p>
                <span class="step-number">Step 1:</span> Lorem ipsum dolor sit
                amet, consectetur adipiscing elit.
              </p>
              <p>
                <span class="step-number">Step 2:</span> Sed ut perspiciatis
                unde omnis iste natus error sit voluptatem accusantium
                doloremque.
              </p>
              <p>
                <span class="step-number">Step 3:</span> At vero eos et
                accusamus et iusto odio dignissimos ducimus qui blanditiis
                praesentium voluptatum deleniti atque.
              </p>
              <p>
                <span class="step-number">Step 4:</span> Lorem ipsum dolor sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                <span class="step-number">Step 5:</span> Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
          <div class="home-video">
            <iframe
              src="https://www.youtube.com/embed/9fvkY7jSH9Y"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
