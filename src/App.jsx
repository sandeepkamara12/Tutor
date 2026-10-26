import './App.css'
import About from './components/About'
import Achievements from './components/Achievements'
import Banner from './components/Banner'
import Footer from './components/common/Footer'
import Header from './components/common/Header'
import Enquiry from './components/Enquiry'
import Discover from './components/Discover'
import Instagram from './components/Instagram'
import LearningPath from './components/LearningPath'
import Lessons from './components/Lessons'
import Newsletter from './components/Newsletter'
import Testimonials from './components/Testimonials'
import Why from './components/Why'
import Youtube from './components/Youtube'
import Faq from './components/Faq'

function App() {
  return (
    <>
      <Header />
      <Banner />
      <Why />
      <Discover />
      <LearningPath />
      <Lessons />
      <Achievements />
      <Testimonials />
      <Faq />
      <Enquiry />
      <About />
      <Youtube />
      <Instagram />
      <Newsletter />
      <Footer />
    </>
  )
}

export default App
