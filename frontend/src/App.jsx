import React from 'react'
import { Routes, Route } from 'react-router-dom'

import NavBar from './components/NavBar'
import HeroPage from './pages/HeroPage'
import SolutionSection from './pages/SolutionSection'
import TestimonialsSection from './pages/TestimonialsSection'
import TypingBanner from './components/TypingBanner'
import ContactSection from './pages/ContactSection'
import VideoConsultBanner from './components/VideoConsultBanner'
import WhyUs from './pages/WhyUs'
import Footer from './components/Footer'
import IndustriesSection from './components/IndustriesSection'
import TrustedBy from './components/TrustBy'
import MediaCoverage from './components/MediaCoverage'
import EmiCalculator from './pages/tools/EmiCalculator'
import ServicePage from './pages/ServicePage'

const Home = () => (
  <div>
    <NavBar />

    <HeroPage />

    <SolutionSection />
    <TestimonialsSection />

    <TypingBanner />
    
    <IndustriesSection />
    <TrustedBy />
    <MediaCoverage />

    <ContactSection />
    <VideoConsultBanner />

    <WhyUs />


    <Footer />
  </div>
)

const ToolPage = ({ children }) => (
  <div>
    <NavBar />
    {children}
    <Footer />
  </div>
)

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
      <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/tools/emi-calculator" element={<ToolPage><EmiCalculator /></ToolPage>} />
      </Routes>
  )
}

export default App