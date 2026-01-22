import styled from 'styled-components'
import { Video, Calendar, Images } from 'lucide-react'

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: ${props => props.theme.colors.cardBackground};
  box-shadow: ${props => props.theme.shadows.md};
`

const NavContainer = styled.div`
  margin: 0 auto;
  max-width: 600px;
  width: 100%;
  padding: 0 1rem;
`

const NavContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem 0;
  gap: 0.5rem;
`

const NavButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 1rem;
  font-size: ${props => props.theme.typography.sizes.sm};
  font-weight: ${props => props.theme.typography.weights.semibold};
  color: ${props => props.theme.colors.text.primary};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.accent};
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`

export default function StickyNav() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Nav>
      <NavContainer>
        <NavContent>
          <NavButton
            onClick={() => scrollToSection('watch-live')}
            aria-label="Watch Live"
          >
            <Video />
            <span>Watch Live</span>
          </NavButton>
          
          <NavButton
            onClick={() => scrollToSection('event-details')}
            aria-label="Event Details"
          >
            <Calendar />
            <span>Event Details</span>
          </NavButton>
          
          <NavButton
            onClick={() => scrollToSection('gallery')}
            aria-label="Gallery"
          >
            <Images />
            <span>Gallery</span>
          </NavButton>
        </NavContent>
      </NavContainer>
    </Nav>
  )
}
