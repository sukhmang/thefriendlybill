import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Video, Calendar, Images } from 'lucide-react'
import { MEMORIAL_DATA } from '../constants'

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  background-color: ${props => props.theme.colors.cardBackground};
  box-shadow: ${props => props.theme.shadows.md};
  transition: box-shadow 0.3s ease;
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
  position: relative;
  transition: padding-left 0.3s ease;
  padding-left: ${props => props.$portraitVisible ? '4.5rem' : '0'};
`

const PortraitWrapper = styled.div`
  position: absolute;
  left: 1rem;
  display: flex;
  align-items: center;
  opacity: ${props => props.$show ? 1 : 0};
  transform: ${props => props.$show ? 'translateX(0)' : 'translateX(-20px)'};
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: ${props => props.$show ? 'auto' : 'none'};
  width: ${props => props.$show ? '3rem' : '0'};
  overflow: hidden;
  z-index: 1;
`

const Portrait = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: ${props => props.theme.borderRadius.full};
  object-fit: cover;
  border: 2px solid ${props => props.theme.colors.border};
  flex-shrink: 0;
`

const NavButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 1rem;
  font-size: ${props => props.theme.typography.sizes.sm};
  font-weight: ${props => props.$isActive ? props.theme.typography.weights.bold : props.theme.typography.weights.semibold};
  color: ${props => props.theme.colors.text.primary};
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  transition: color 0.2s ease, transform 0.3s ease, opacity 0.3s ease, font-weight 0.2s ease;
  transform: ${props => props.$portraitVisible ? 'translateX(0)' : 'translateX(0)'};
  opacity: 1;

  &:hover {
    color: ${props => props.theme.colors.accent};
  }

  /* Underline for active section - only when portrait is visible */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background-color: ${props => props.theme.colors.accent};
    opacity: ${props => props.$isActive && props.$portraitVisible ? 1 : 0};
    transition: opacity 0.3s ease;
    border-radius: 2px 2px 0 0;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`

export default function StickyNav() {
  const [showPortrait, setShowPortrait] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      // Find the Hero section by its id
      const heroSection = document.getElementById('hero-section')
      
      if (!heroSection) return

      // Get the bottom of the hero section
      const heroBottom = heroSection.getBoundingClientRect().bottom
      
      // Show portrait when hero section is scrolled past (with a small threshold)
      setShowPortrait(heroBottom < 100) // 100px threshold for smoother transition
    }

    // Check on mount and on scroll
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  // Track active section using IntersectionObserver
  useEffect(() => {
    const sections = ['watch', 'event-details', 'gallery']
    
    const handleScroll = () => {
      const navHeight = 100
      let activeId = ''
      let maxVisibility = 0

      sections.forEach((id) => {
        const el = document.getElementById(id)
        if (!el) return

        const rect = el.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        
        // Calculate visibility in upper portion of viewport
        const sectionTop = Math.max(rect.top, navHeight)
        const sectionBottom = Math.min(rect.bottom, viewportHeight * 0.5)
        const visibleHeight = Math.max(0, sectionBottom - sectionTop)
        
        if (rect.top < viewportHeight * 0.4 && rect.bottom > navHeight && visibleHeight > 100) {
          const visibility = visibleHeight / Math.min(rect.height, viewportHeight * 0.4)
          if (visibility > maxVisibility) {
            maxVisibility = visibility
            activeId = id
          }
        }
      })

      if (activeId) {
        setActiveSection(activeId)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Get the sticky nav height to offset the scroll position
      const nav = document.querySelector('nav')
      const navHeight = nav ? nav.offsetHeight : 80 // Default to 80px if nav not found
      
      // Calculate the position where we want to scroll to (element position minus nav height plus some padding)
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - navHeight - 20 // 20px extra padding
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <Nav>
      <NavContainer>
        <NavContent $portraitVisible={showPortrait}>
          <PortraitWrapper $show={showPortrait}>
            <Portrait 
              src={MEMORIAL_DATA.portraitImage} 
              alt={MEMORIAL_DATA.name}
            />
          </PortraitWrapper>
          
          <NavButton
            onClick={() => scrollToSection('watch')}
            aria-label="Watch"
            $portraitVisible={showPortrait}
            $isActive={activeSection === 'watch'}
          >
            <Video />
            <span>Watch</span>
          </NavButton>
          
          <NavButton
            onClick={() => scrollToSection('event-details')}
            aria-label="Events"
            $portraitVisible={showPortrait}
            $isActive={activeSection === 'event-details'}
          >
            <Calendar />
            <span>Events</span>
          </NavButton>
          
          <NavButton
            onClick={() => scrollToSection('gallery')}
            aria-label="Gallery"
            $portraitVisible={showPortrait}
            $isActive={activeSection === 'gallery'}
          >
            <Images />
            <span>Gallery</span>
          </NavButton>
        </NavContent>
      </NavContainer>
    </Nav>
  )
}
