import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Play, Clock, Radio, X } from 'lucide-react'
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
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`

const VideosContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const VideoLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: ${props => props.theme.typography.sizes.lg};
  font-weight: ${props => props.theme.typography.weights.semibold};
  color: ${props => props.theme.colors.text.primary};
`

const LiveIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const PulsingDot = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  background-color: #ef4444;
  border-radius: ${props => props.theme.borderRadius.full};
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.2);
    }
  }
`

const VideoWrapper = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`

const ComingSoonPlaceholder = styled.div`
  width: 100%;
  padding: 4rem 2rem;
  background-color: ${props => props.theme.colors.background};
  border: 2px dashed ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  text-align: center;
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.typography.sizes.lg};
  font-weight: ${props => props.theme.typography.weights.semibold};
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.98);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  animation: fadeIn 0.2s ease-out;
  overflow: hidden; /* Prevent scrolling */

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

const ModalContent = styled.div`
  width: 100%;
  max-width: 1200px;
  height: calc(100vh - 4rem); /* Account for padding */
  max-height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  animation: zoomIn 0.2s ease-out;
  overflow: visible; /* Allow videos to be visible */

  @keyframes zoomIn {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`

const ModalCloseButton = styled.button`
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  border-radius: ${props => props.theme.borderRadius.full};
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: all 0.2s ease;
  z-index: 1001;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.1);
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`

const ModalVideoContainer = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  min-height: 0; /* Allow flex shrinking */
  overflow: hidden;
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: #000;
  
  /* Maintain 16:9 aspect ratio using padding-bottom technique */
  &::before {
    content: '';
    display: block;
    padding-bottom: 56.25%; /* 16:9 aspect ratio (9/16 = 0.5625) */
  }
`

const ModalVideoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`

const ModalVideoLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: ${props => props.theme.typography.sizes.lg};
  font-weight: ${props => props.theme.typography.weights.semibold};
  color: white;
`

const ModalVideoWrapper = styled.div`
  flex: 1 1 0; /* Equal flex basis, allow shrinking */
  min-height: 0; /* Allow flex shrinking */
  display: flex;
  flex-direction: column;
  width: 100%;

  &:last-child {
    margin-bottom: 0;
  }
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
  width: 4.5rem;
  height: 4.5rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.accent};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin-bottom: 0.75rem;

  ${PreviewContainer}:hover & {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
  }

  svg {
    width: 2rem;
    height: 2rem;
    margin-left: 0.25rem; /* Slight offset for play icon */
  }
`

const WatchLiveText = styled.div`
  font-size: ${props => props.theme.typography.sizes.sm};
  font-weight: ${props => props.theme.typography.weights.semibold};
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.05em;
  margin-top: 0;
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
  const [isDesktop, setIsDesktop] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // Detect if desktop (screen width >= 768px)
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768)
    }

    checkDesktop()
    window.addEventListener('resize', checkDesktop)

    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const eventDate = new Date(EVENT_DATA.livestreamDateTime || EVENT_DATA.eventDateTime)
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

  const getYouTubeLoopEmbedUrl = () => {
    if (!EVENT_DATA.youtubeLoopVideoId) return null
    
    // For looping videos, use loop=1&playlist=VIDEO_ID (playlist parameter is required for loop to work)
    // Note: autoplay removed as per user request
    return `https://www.youtube.com/embed/${EVENT_DATA.youtubeLoopVideoId}?loop=1&playlist=${EVENT_DATA.youtubeLoopVideoId}&rel=0`
  }

  const getYouTubeThumbnail = () => {
    if (!EVENT_DATA.youtubeVideoId) return null
    
    // Get high-quality thumbnail from YouTube
    return `https://img.youtube.com/vi/${EVENT_DATA.youtubeVideoId}/maxresdefault.jpg`
  }

  const handlePreviewClick = () => {
    if (isDesktop) {
      setShowModal(true)
      document.body.style.overflow = 'hidden'
    } else {
      setShowEmbed(true)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    document.body.style.overflow = 'unset'
  }

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showModal])

  // Render small countdown component
  const renderSmallCountdown = () => {
    if (!timeRemaining) return null
    
    return (
      <SmallCountdownContainer>
        <SmallCountdownTitle>
          Livestream begins on {EVENT_DATA.displayDate} at {EVENT_DATA.livestreamDisplayTime || EVENT_DATA.displayTime}
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

  // Render modal for desktop
  const renderModal = () => {
    if (!showModal || !isDesktop) return null

    return (
      <ModalOverlay onClick={handleCloseModal}>
        <ModalCloseButton onClick={handleCloseModal} aria-label="Close">
          <X />
        </ModalCloseButton>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          {/* Slideshow on top */}
          {EVENT_DATA.youtubeLoopVideoId ? (
            <ModalVideoWrapper>
              <ModalVideoContainer>
                <ModalVideoIframe
                  src={getYouTubeLoopEmbedUrl()}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  allowFullScreen
                  title="Memorial Video"
                />
              </ModalVideoContainer>
            </ModalVideoWrapper>
          ) : (
            <ModalVideoWrapper>
              <ComingSoonPlaceholder style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
                Coming soon
              </ComingSoonPlaceholder>
            </ModalVideoWrapper>
          )}

          {/* Live Feed below */}
          {EVENT_DATA.youtubeVideoId && (
            <ModalVideoWrapper>
              <ModalVideoContainer>
                <ModalVideoIframe
                  src={getYouTubeEmbedUrl()}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  allowFullScreen
                  title="Livestream"
                />
              </ModalVideoContainer>
            </ModalVideoWrapper>
          )}
        </ModalContent>
      </ModalOverlay>
    )
  }

  // If video ID exists and user clicked to show embed (mobile), show the YouTube embeds
  if (showEmbed && EVENT_DATA.youtubeVideoId && !isDesktop) {
    return (
      <>
        <Card id="watch-live">
          <VideosContainer>
            {/* Slideshow on top (mobile) */}
            {EVENT_DATA.youtubeLoopVideoId ? (
              <VideoWrapper>
                <VideoLabel>Slideshow: In Loving Memory, Baljit Singh Grewal</VideoLabel>
                <VideoContainer>
                  <VideoIframe
                    src={getYouTubeLoopEmbedUrl()}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                    allowFullScreen
                    title="Memorial Video"
                  />
                </VideoContainer>
              </VideoWrapper>
            ) : (
              <VideoWrapper>
                <VideoLabel>Slideshow: In Loving Memory, Baljit Singh Grewal</VideoLabel>
                <ComingSoonPlaceholder>
                  Coming soon
                </ComingSoonPlaceholder>
              </VideoWrapper>
            )}

            {/* Live Feed below (mobile) */}
            <VideoWrapper>
              <VideoLabel>
                <LiveIndicator>
                  <PulsingDot />
                  <Radio size={18} />
                </LiveIndicator>
                Live Feed
              </VideoLabel>
              <VideoContainer>
                <VideoIframe
                  src={getYouTubeEmbedUrl()}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  allowFullScreen
                  title="Livestream"
                />
              </VideoContainer>
            </VideoWrapper>
          </VideosContainer>
          {!isLive && renderSmallCountdown()}
        </Card>
      </>
    )
  }

  // If live and video ID exists, show blurred preview with "Watch Live"
  if (isLive && EVENT_DATA.youtubeVideoId) {
    return (
      <>
        {renderModal()}
        <Card id="watch-live">
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
      </>
    )
  }

  // Show countdown if not live yet, but also show preview if video ID exists
  if (!isLive && timeRemaining) {
    return (
      <>
        {renderModal()}
        <Card id="watch-live">
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
      </>
    )
  }

  // Fallback message
  return (
    <>
      {renderModal()}
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
    </>
  )
}
