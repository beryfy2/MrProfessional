import React from 'react'
import { Routes, Route } from 'react-router-dom'

import NavBar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import HeroPage from './pages/HeroPage'
import SolutionSection from './pages/SolutionSection'
import TestimonialsSection from './pages/TestimonialsSection'
import TypingBanner from './components/TypingBanner'
import ContactSection from './pages/ContactSection'
import Team from './components/Team'
import VideoConsultBanner from './components/VideoConsultBanner'
import WhyUs from './pages/WhyUs'
import Footer from './components/Footer'
import IndustriesSection from './components/IndustriesSection'
import TrustedBy from './components/TrustBy'
import MediaCoverage from './components/MediaCoverage'
import EmiCalculator from './pages/tools/EmiCalculator'
import PpfCalculator from './pages/tools/PpfCalculator'
import DepreciationCalculator from './pages/tools/DepreciationCalculator'
import TdsInterestCalculator from './pages/tools/TdsInterestCalculator'
import FssaiLicenseChecker from './pages/tools/FssaiLicenseChecker'
import Careers from './pages/Careers'
import ServicePage from './pages/ServicePage'
import AboutUs from './pages/AboutUs'
import TeamMem from './pages/TeamMem'
import Blogs from './pages/Blogs'


const Home = () => (
  <div>
    <NavBar />

    <HeroPage />

    <SolutionSection />
    <TestimonialsSection />

    <TypingBanner />
    <Team />
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
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
      <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/careers" element={<ToolPage><Careers /></ToolPage>} />
        <Route path="/tools/emi-calculator" element={<ToolPage><EmiCalculator /></ToolPage>} />
        <Route path="/tools/ppf-calculator" element={<ToolPage><PpfCalculator /></ToolPage>} />
        <Route path="/tools/depreciation-calculator" element={<ToolPage><DepreciationCalculator /></ToolPage>} />
        <Route path="/tools/tds-interest-calculator" element={<ToolPage><TdsInterestCalculator /></ToolPage>} />
        <Route path="/tools/fssai-status" element={<ToolPage><FssaiLicenseChecker /></ToolPage>} />
         <Route path="/about" element={<AboutUs />} />
        <Route path="/team" element={<TeamMem />} />
        <Route path='/blogs' element={<Blogs/>} />
      </Routes>
    </>
  )
}

export default App