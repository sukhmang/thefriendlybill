import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import { GlobalStyles } from './styles/GlobalStyles'
import Layout from './components/Layout'
import Hero from './components/Hero'
import StickyNav from './components/StickyNav'
import LivestreamCard from './components/LivestreamCard'
import EventDetailsCard from './components/EventDetailsCard'
import Gallery from './components/Gallery'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StickyNav />
      <Layout>
        <Hero />
        <LivestreamCard />
        <EventDetailsCard />
        <Gallery />
      </Layout>
    </ThemeProvider>
  )
}

export default App
