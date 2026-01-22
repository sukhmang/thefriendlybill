import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Play, Clock } from 'lucide-react'
import { EVENT_DATA } from '../constants'

const Card = styled.div`
  background-color: ${props => props.theme.colors.cardBackground};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.lg};
  padding: 2rem;
  margin-bottom: 1.5rem;
`

const Title = styled.h2`
  font-size: ${props => props.theme.typography.sizes['2xl']};
  font-weight: ${props => props.theme.typography.weights.bold};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const CountdownContainer = styled.div`
  text-align: center;
  padding: 2rem 0;
`

const SmallCountdownContainer = styled.div`
  text-align: center;
  padding: 1rem 0;
  margin-top: 1.5rem;
  border-top: 1px solid ${props => props.theme.colors.border};
`

const CountdownTitle = styled.p`
  font-size: ${props => props.theme.typography.sizes.lg};
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 1.5rem;
`

const SmallCountdownTitle = styled.p`
  font-size: ${props => props.theme.typography.sizes.xs};
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 0.75rem;
`

const CountdownGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
`

const SmallCountdownGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`

const CountdownItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SmallCountdownItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`

const CountdownValue = styled.div`
  font-size: ${props => props.theme.typography.sizes['4xl']};
  font-weight: ${props => props.theme.typography.weights.bold};
  color: ${props => props.theme.colors.text.primary};
  line-height: 1;
  margin-bottom: 0.5rem;
`

const SmallCountdownValue = styled.div`
  font-size: ${props => props.theme.typography.sizes.base};
  font-weight: ${props => props.theme.typography.weights.bold};
  color: ${props => props.theme.colors.text.primary};
  line-height: 1;
`

const CountdownLabel = styled.div`
  font-size: ${props => props.theme.typography.sizes.sm};
  color: ${props => props.theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const SmallCountdownLabel = styled.div`
  font-size: ${props => props.theme.typography.sizes.xs};
  color: ${props => props.theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: #000;
`

const VideoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`

const PreviewContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: #000;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.01);
  }
`

const PreviewImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.$thumbnailUrl});
  background-size: cover;
  background-position: center;
  filter: blur(8px);
  transform: scale(1.1); /* Slight scale to hide blur edges */
`

const PreviewOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  z-index: 1;
`

const PlayButton = styled.div`
  width: 5rem;
  height: 5rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.accent};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  ${PreviewContainer}:hover & {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
  }

  svg {
    width: 2.5rem;
    height: 2.5rem;
    margin-left: 0.25rem; /* Slight offset for play icon */
  }
`

const WatchLiveText = styled.div`
  font-size: ${props => props.theme.typography.sizes['2xl']};
  font-weight: ${props => props.theme.typography.weights.bold};
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.05em;
`

const NoVideoMessage = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.typography.sizes.base};
`

export default function LivestreamCard() {
  const [timeRemaining, setTimeRemaining] = useState(null)
  const [isLive, setIsLive] = useState(false)
  const [showEmbed, setShowEmbed] = useState(false)

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const eventDate = new Date(EVENT_DATA.eventDateTime)
      const now = new Date()
      const difference = eventDate - now

      if (difference <= 0) {
        setIsLive(true)
        setTimeRemaining(null)
        return
      }

      setIsLive(false)
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeRemaining({ days, hours, minutes, seconds })
    }

    // Calculate immediately
    calculateTimeRemaining()

    // Update every second
    const interval = setInterval(calculateTimeRemaining, 1000)

    return () => clearInterval(interval)
  }, [])

  const getYouTubeEmbedUrl = () => {
    if (!EVENT_DATA.youtubeVideoId) return null
    
    // For live streams, use the embed format
    return `https://www.youtube.com/embed/${EVENT_DATA.youtubeVideoId}?autoplay=1&rel=0`
  }

  const getYouTubeThumbnail = () => {
    if (!EVENT_DATA.youtubeVideoId) return null
    
    // Get high-quality thumbnail from YouTube
    return `https://img.youtube.com/vi/${EVENT_DATA.youtubeVideoId}/maxresdefault.jpg`
  }

  const handlePreviewClick = () => {
    setShowEmbed(true)
  }

  // Render small countdown component
  const renderSmallCountdown = () => {
    if (!timeRemaining) return null
    
    return (
      <SmallCountdownContainer>
        <SmallCountdownTitle>
          Livestream begins on {EVENT_DATA.displayDate} at {EVENT_DATA.displayTime}
        </SmallCountdownTitle>
        <SmallCountdownGrid>
          <SmallCountdownItem>
            <SmallCountdownValue>{timeRemaining.days}</SmallCountdownValue>
            <SmallCountdownLabel>Days</SmallCountdownLabel>
          </SmallCountdownItem>
          <SmallCountdownItem>
            <SmallCountdownValue>{timeRemaining.hours}</SmallCountdownValue>
            <SmallCountdownLabel>Hours</SmallCountdownLabel>
          </SmallCountdownItem>
          <SmallCountdownItem>
            <SmallCountdownValue>{timeRemaining.minutes}</SmallCountdownValue>
            <SmallCountdownLabel>Minutes</SmallCountdownLabel>
          </SmallCountdownItem>
          <SmallCountdownItem>
            <SmallCountdownValue>{timeRemaining.seconds}</SmallCountdownValue>
            <SmallCountdownLabel>Seconds</SmallCountdownLabel>
          </SmallCountdownItem>
        </SmallCountdownGrid>
      </SmallCountdownContainer>
    )
  }

  // If video ID exists and user clicked to show embed, show the YouTube embed
  if (showEmbed && EVENT_DATA.youtubeVideoId) {
    return (
      <Card id="watch-live">
        <Title>
          <Play size={28} />
          Watch Live
        </Title>
        <VideoContainer>
          <VideoIframe
            src={getYouTubeEmbedUrl()}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowFullScreen
            title="Livestream"
          />
        </VideoContainer>
        {!isLive && renderSmallCountdown()}
      </Card>
    )
  }

  // If live and video ID exists, show blurred preview with "Watch Live"
  if (isLive && EVENT_DATA.youtubeVideoId) {
    return (
      <Card id="watch-live">
        <Title>
          <Play size={28} />
          Watch Live
        </Title>
        <PreviewContainer
          onClick={handlePreviewClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handlePreviewClick()
            }
          }}
          aria-label="Click to watch live stream"
        >
          <PreviewImage $thumbnailUrl={getYouTubeThumbnail()} />
          <PreviewOverlay>
            <PlayButton>
              <Play fill="currentColor" />
            </PlayButton>
            <WatchLiveText>WATCH LIVE</WatchLiveText>
          </PreviewOverlay>
        </PreviewContainer>
        {renderSmallCountdown()}
      </Card>
    )
  }

  // Show countdown if not live yet, but also show preview if video ID exists
  if (!isLive && timeRemaining) {
    return (
      <Card id="watch-live">
        <Title>
          <Play size={28} />
          Watch Live
        </Title>
        
        {/* Show blurred preview prominently */}
        {EVENT_DATA.youtubeVideoId && (
          <PreviewContainer
            onClick={handlePreviewClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handlePreviewClick()
              }
            }}
            aria-label="Click to watch live stream when available"
          >
            <PreviewImage $thumbnailUrl={getYouTubeThumbnail()} />
            <PreviewOverlay>
              <PlayButton>
                <Play fill="currentColor" />
              </PlayButton>
              <WatchLiveText>WATCH LIVE</WatchLiveText>
            </PreviewOverlay>
          </PreviewContainer>
        )}
        
        {/* Small countdown at the bottom */}
        {renderSmallCountdown()}
      </Card>
    )
  }

  // Fallback message
  return (
    <Card id="watch-live">
      <Title>
        <Clock size={28} />
        Livestream
      </Title>
      <NoVideoMessage>
        {EVENT_DATA.youtubeVideoId 
          ? 'The livestream will be available here when it begins.'
          : 'Livestream information will be available soon.'}
        <br />
        {EVENT_DATA.displayDate && `Please check back on ${EVENT_DATA.displayDate} at ${EVENT_DATA.displayTime}.`}
      </NoVideoMessage>
    </Card>
  )
}
