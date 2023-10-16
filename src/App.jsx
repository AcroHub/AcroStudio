import { Hero, About, Services, Contact, Navbar, StarsCanvas } from "./components";
import { BrowserRouter } from "react-router-dom";
import React, { useRef } from "react";

const App = () => {
  return (
<BrowserRouter>
      <div className="relative z-0 black-gradient">
        <Navbar />

        <div className="bg-gradient-to-r bg-cover bg-no-repeat bg-center">
          <div className="relative z-0">
            <Hero />
            <StarsCanvas />
          </div>
        </div>

                <About />
                <Services />
                <Contact />
      </div>
      </BrowserRouter>
  );
};

export default App;
