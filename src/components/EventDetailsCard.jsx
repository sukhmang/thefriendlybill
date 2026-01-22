import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Calendar, Clock, MapPin, Navigation, Download, Phone, X } from 'lucide-react'
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

const EventSection = styled.div`
  margin-bottom: 2.5rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`

const EventTitle = styled.h3`
  font-size: ${props => props.theme.typography.sizes.xl};
  font-weight: ${props => props.theme.typography.weights.bold};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid ${props => props.theme.colors.border};
`

const PastEventLabel = styled.span`
  display: inline-block;
  margin-left: 0.75rem;
  padding: 0.25rem 0.75rem;
  font-size: ${props => props.theme.typography.sizes.xs};
  font-weight: ${props => props.theme.typography.weights.normal};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text.secondary};
  border-radius: ${props => props.theme.borderRadius.sm};
`

const BadgeContainer = styled.span`
  position: relative;
  display: inline-block;
  margin-left: 0.75rem;
`

const Badge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: ${props => props.theme.typography.sizes.xs};
  font-weight: ${props => props.theme.typography.weights.semibold};
  background-color: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.cardBackground};
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: help;
  position: relative;
`

const RSVPBadge = styled.span`
  display: inline-block;
  margin-left: 0.75rem;
  padding: 0.25rem 0.75rem;
  font-size: ${props => props.theme.typography.sizes.xs};
  font-weight: ${props => props.theme.typography.weights.semibold};
  background-color: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.cardBackground};
  border-radius: ${props => props.theme.borderRadius.sm};
`

const Tooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: ${props => props.theme.colors.text.primary};
  color: ${props => props.theme.colors.cardBackground};
  font-size: ${props => props.theme.typography.sizes.xs};
  border-radius: ${props => props.theme.borderRadius.sm};
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  z-index: 1000;
  max-width: 200px;
  text-align: center;

  @media (max-width: 480px) {
    white-space: normal;
    max-width: 180px;
  }

  ${BadgeContainer}:hover & {
    opacity: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: ${props => props.theme.colors.text.primary};
  }
`

const DetailsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const DetailItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`

const IconWrapper = styled.div`
  flex-shrink: 0;
  margin-top: 0.25rem;
  color: ${props => props.theme.colors.accent};
`

const DetailContent = styled.div`
  flex: 1;
`

const DetailLabel = styled.div`
  font-size: ${props => props.theme.typography.sizes.sm};
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 0.25rem;
  font-weight: ${props => props.theme.typography.weights.semibold};
`

const DetailValue = styled.div`
  font-size: ${props => props.theme.typography.sizes.base};
  color: ${props => props.theme.colors.text.primary};
  line-height: 1.6;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 480px) {
    flex-direction: row;
  }
`

const Button = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  font-size: ${props => props.theme.typography.sizes.base};
  font-weight: ${props => props.theme.typography.weights.semibold};
  color: ${props => props.theme.colors.cardBackground};
  background-color: ${props => props.theme.colors.accent};
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  flex: 1;

  &:hover {
    background-color: ${props => props.theme.colors.accentHover};
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`

const SecondaryButton = styled(Button)`
  background-color: ${props => props.theme.colors.cardBackground};
  color: ${props => props.theme.colors.accent};
  border: 2px solid ${props => props.theme.colors.accent};

  &:hover {
    background-color: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.cardBackground};
  }
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.95);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  animation: fadeIn 0.2s ease-out;
  backdrop-filter: blur(4px);

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 640px) {
    padding: 1rem;
  }
`

const ModalContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: zoomIn 0.2s ease-out;

  @keyframes zoomIn {
    from {
      transform: scale(0.9);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`

const ModalCloseButton = styled.button`
  position: absolute;
  top: -2.5rem;
  right: 0;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  border-radius: ${props => props.theme.borderRadius.full};
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.1);
  }

  @media (max-width: 640px) {
    top: -3rem;
    width: 2.5rem;
    height: 2.5rem;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`

const ModalCancelButton = styled.button`
  margin-top: 1.5rem;
  padding: 0.75rem 2rem;
  font-size: ${props => props.theme.typography.sizes.base};
  font-weight: ${props => props.theme.typography.weights.semibold};
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }
`

const renderEventDetails = (event, isMain = false, onShowProgram = null) => {
  const handleGetDirections = (address) => {
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank')
  }

  return (
    <EventSection key={event.name || 'main'}>
      <EventTitle>
        {event.note && !isMain && (
          <span style={{ 
            fontSize: '0.875rem', 
            fontWeight: 'normal', 
            color: '#475569',
            display: 'block',
            marginBottom: '0.25rem'
          }}>
            {event.note}
          </span>
        )}
        {event.name}
        {event.rsvp && <RSVPBadge>RSVP Event</RSVPBadge>}
        {event.isPast && <PastEventLabel>Past Event</PastEventLabel>}
      </EventTitle>
      
      <DetailsList>
        <DetailItem>
          <IconWrapper>
            <Calendar size={20} />
          </IconWrapper>
          <DetailContent>
            <DetailLabel>Date</DetailLabel>
            <DetailValue>{event.date || EVENT_DATA.displayDate}</DetailValue>
          </DetailContent>
        </DetailItem>

        <DetailItem>
          <IconWrapper>
            <Clock size={20} />
          </IconWrapper>
          <DetailContent>
            <DetailLabel>Time</DetailLabel>
            <DetailValue>{event.time || EVENT_DATA.displayTime}</DetailValue>
          </DetailContent>
        </DetailItem>

        <DetailItem>
          <IconWrapper>
            <MapPin size={20} />
          </IconWrapper>
          <DetailContent>
            <DetailLabel>Location</DetailLabel>
            <DetailValue>
              {event.venueName && (
                <>
                  <strong>{event.venueName}</strong>
                  {event.note && event.note.includes('Open House') && (
                    <BadgeContainer>
                      <Badge>{event.note}</Badge>
                      <Tooltip>
                        People can drop in any time and it's very casual
                      </Tooltip>
                    </BadgeContainer>
                  )}
                  <br />
                </>
              )}
              {event.address?.street && (
                <>
                  {event.address.street}
                  <br />
                </>
              )}
              {event.address?.city || EVENT_DATA.address.city}, {event.address?.state || EVENT_DATA.address.state} {event.address?.zip || EVENT_DATA.address.zip}
              {event.address?.country && (
                <>
                  <br />
                  {event.address.country}
                </>
              )}
            </DetailValue>
          </DetailContent>
        </DetailItem>

        {event.rsvp && (
          <DetailItem>
            <IconWrapper>
              <Phone size={20} />
            </IconWrapper>
            <DetailContent>
              <DetailLabel>
                RSVP{' '}
                <span style={{ 
                  fontSize: '0.75rem', 
                  fontWeight: 'normal', 
                  color: '#64748b',
                  fontStyle: 'italic'
                }}>
                  (text preferred)
                </span>
              </DetailLabel>
              <DetailValue>
                <strong>{event.rsvp.name}</strong>
                <br />
                <a 
                  href={`tel:${event.rsvp.phone.replace(/\D/g, '')}`}
                  style={{ 
                    color: '#2563eb', 
                    textDecoration: 'none' 
                  }}
                >
                  {event.rsvp.phone}
                </a>
              </DetailValue>
            </DetailContent>
          </DetailItem>
        )}
      </DetailsList>

      {isMain && (
        <ButtonGroup>
          <Button 
            onClick={() => handleGetDirections(event.address?.full || EVENT_DATA.address.full)} 
            as="button" 
            type="button"
          >
            <Navigation size={20} />
            Get Directions
          </Button>
          <SecondaryButton 
            onClick={() => onShowProgram && onShowProgram()}
            as="button"
            type="button"
          >
            <Download size={20} />
            Show Program
          </SecondaryButton>
        </ButtonGroup>
      )}

      {!isMain && event.address?.full && (
        <ButtonGroup>
          <Button 
            onClick={() => handleGetDirections(event.address.full)} 
            as="button" 
            type="button"
          >
            <Navigation size={20} />
            Get Directions
          </Button>
        </ButtonGroup>
      )}
    </EventSection>
  )
}

export default function EventDetailsCard() {
  const [showProgramModal, setShowProgramModal] = useState(false)

  const handleShowProgram = () => {
    setShowProgramModal(true)
  }

  const handleCloseProgram = () => {
    setShowProgramModal(false)
  }

  useEffect(() => {
    if (showProgramModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showProgramModal])

  const mainEvent = {
    name: "Funeral Service",
    date: EVENT_DATA.displayDate,
    time: EVENT_DATA.displayTime,
    venueName: EVENT_DATA.venueName,
    address: EVENT_DATA.address
  }

  return (
    <>
      <Card id="event-details">
        <Title>
          <Calendar size={28} />
          Event Details
        </Title>

        {renderEventDetails(mainEvent, true, handleShowProgram)}

        {EVENT_DATA.additionalEvents && EVENT_DATA.additionalEvents.length > 0 && (
          <>
            {EVENT_DATA.additionalEvents.map((event) => renderEventDetails(event, false))}
          </>
        )}
      </Card>

      {showProgramModal && (
        <ModalOverlay onClick={handleCloseProgram}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalCloseButton onClick={handleCloseProgram} aria-label="Close">
              <X />
            </ModalCloseButton>
            <ModalImage 
              src={EVENT_DATA.programPdfUrl} 
              alt="Program" 
            />
            <ModalCancelButton onClick={handleCloseProgram}>
              Close
            </ModalCancelButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  )
}
