import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Hero, About, Navbar, StarsCanvas } from "./components";
import React, { useRef } from "react";

const App = () => {
  return (

    <BrowserRouter>
      <div className="relative z-0 black-gradient">
        <Navbar />

            <div className="black-gradient bg-gradient-to-r bg-cover bg-no-repeat bg-center">
              <div className="relative z-0 h-screen max-h-full">
                <Routes>
                  <Route path='/' element={<Hero />}/>

                  <Route path='/about' element={<About />}/>

                </Routes>

                <About />

                <StarsCanvas />
              </div>
            </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
