import styled from 'styled-components'
import { Play } from 'lucide-react'
import { MEMORIAL_DATA } from '../constants'

const Card = styled.div`
  background-color: ${props => props.theme.colors.cardBackground};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.lg};
  padding: 1.5rem;
  margin-bottom: 1.5rem;

  @media (min-width: 640px) {
    padding: 2rem;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const ImageWrapper = styled.div`
  margin-bottom: 1rem;
`

const Portrait = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: ${props => props.theme.borderRadius.full};
  object-fit: cover;
  border: 3px solid ${props => props.theme.colors.border};

  @media (min-width: 640px) {
    width: 10rem;
    height: 10rem;
  }
`

const Name = styled.h1`
  font-size: ${props => props.theme.typography.sizes['2xl']};
  font-weight: ${props => props.theme.typography.weights.bold};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 0.25rem;

  @media (min-width: 640px) {
    font-size: ${props => props.theme.typography.sizes['4xl']};
  }
`

const Dates = styled.p`
  font-size: ${props => props.theme.typography.sizes.lg};
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 1rem;

  @media (min-width: 640px) {
    font-size: ${props => props.theme.typography.sizes.xl};
  }
`

const WelcomeText = styled.p`
  font-size: ${props => props.theme.typography.sizes.sm};
  color: ${props => props.theme.colors.text.tertiary};
  line-height: 1.6;
  max-width: 28rem;
  margin-bottom: 1.5rem;

  @media (min-width: 640px) {
    font-size: ${props => props.theme.typography.sizes.base};
    margin-bottom: 1.5rem;
  }
`

const CTAButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  font-size: ${props => props.theme.typography.sizes.base};
  font-weight: ${props => props.theme.typography.weights.bold};
  color: ${props => props.theme.colors.cardBackground};
  background-color: ${props => props.theme.colors.accent};
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  width: 100%;
  max-width: 300px;

  &:hover {
    background-color: ${props => props.theme.colors.accentHover};
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  @media (min-width: 640px) {
    font-size: ${props => props.theme.typography.sizes.lg};
    padding: 1.25rem 2.5rem;
  }
`

export default function Hero() {
  const scrollToWatchLive = () => {
    const element = document.getElementById('watch-live')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <Card>
      <Content>
        <ImageWrapper>
          <Portrait
            src={MEMORIAL_DATA.portraitImage}
            alt={MEMORIAL_DATA.name}
          />
        </ImageWrapper>
        
        <Name>{MEMORIAL_DATA.name}</Name>
        
        <Dates>
          {MEMORIAL_DATA.birthYear} – {MEMORIAL_DATA.deathYear}
        </Dates>
        
        <WelcomeText>
          {MEMORIAL_DATA.welcomeMessage}
        </WelcomeText>

        <CTAButton onClick={scrollToWatchLive} aria-label="Watch Live Stream">
          <Play fill="currentColor" />
          Watch Live
        </CTAButton>
      </Content>
    </Card>
  )
}
