import { Hero, About, Services, Contact, Navbar, Footer, StarsCanvas } from "./components";
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { useWindowScroll } from "react-use";

const App = () => {

  const [showScrollButton, setShowScrollButton] = useState(false);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { y: scrollY } = useWindowScroll();

  useEffect(() => {
    if (scrollY > 300) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  }, [scrollY]);

  return (
<BrowserRouter>
      <div className="relative z-0 black-gradient max-w-full">
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

                <Footer />

                {/* "Back to Top" button */}
        {showScrollButton && (
          <button className="back-to-top-button" onClick={scrollToTop}>
            <svg class="arrow up" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="5 0 50 80" xml:space="preserve">
    <polyline fill="none" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" points="
0.375, 35.375 28.375, 0.375 58.67, 35.375 " />
</svg>
          </button>
        )}
      </div>
      </BrowserRouter>
  );
};

export default App;
