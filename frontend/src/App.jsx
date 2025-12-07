import React from 'react'

import NavBar from './components/NavBar'
import HeroPage from './pages/HeroPage'
import SolutionSection from './pages/SolutionSection'
import TestimonialsSection from './pages/TestimonialsSection'
import TypingBanner from './components/TypingBanner'
import ContactSection from './pages/ContactSection'
import VideoConsultBanner from './components/VideoConsultBanner'
import WhyUs from './pages/WhyUs'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <NavBar />

      <HeroPage />

      <SolutionSection />
      <TestimonialsSection />

      <TypingBanner />
      

      <ContactSection />
      <VideoConsultBanner />

      <WhyUs />


      <Footer />

    </div>
  )
}

export default App