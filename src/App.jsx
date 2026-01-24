import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { theme } from './styles/theme'
import { GlobalStyles } from './styles/GlobalStyles'
import Layout from './components/Layout'
import Hero from './components/Hero'
import StickyNav from './components/StickyNav'
import LivestreamCard from './components/LivestreamCard'
import EventDetailsCard from './components/EventDetailsCard'
import Gallery from './components/Gallery'
import HomeVideos from './components/HomeVideos'

function MemorialPage() {
  return (
    <>
      <StickyNav />
      <Layout>
        <Hero />
        <LivestreamCard />
        <EventDetailsCard />
        <Gallery />
      </Layout>
    </>
  )
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MemorialPage />} />
          <Route path="/homevideos" element={<HomeVideos />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
