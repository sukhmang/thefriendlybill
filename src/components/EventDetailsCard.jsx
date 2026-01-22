import styled from 'styled-components'
import { Calendar, Clock, MapPin, Navigation, Download } from 'lucide-react'
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

const renderEventDetails = (event, isMain = false) => {
  const handleGetDirections = (address) => {
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank')
  }

  return (
    <EventSection key={event.name || 'main'}>
      {!isMain && (
        <EventTitle>
          {event.name}
          {event.isPast && <PastEventLabel>Past Event</PastEventLabel>}
        </EventTitle>
      )}
      
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
                  <br />
                </>
              )}
              {event.address?.street || EVENT_DATA.address.street}
              <br />
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
          <SecondaryButton href={EVENT_DATA.programPdfUrl} download>
            <Download size={20} />
            Download Program
          </SecondaryButton>
        </ButtonGroup>
      )}

      {!isMain && (
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
  const mainEvent = {
    name: "Funeral Service",
    date: EVENT_DATA.displayDate,
    time: EVENT_DATA.displayTime,
    venueName: EVENT_DATA.venueName,
    address: EVENT_DATA.address
  }

  return (
    <Card id="event-details">
      <Title>
        <Calendar size={28} />
        Event Details
      </Title>

      {renderEventDetails(mainEvent, true)}

      {EVENT_DATA.additionalEvents && EVENT_DATA.additionalEvents.length > 0 && (
        <>
          {EVENT_DATA.additionalEvents.map((event) => renderEventDetails(event, false))}
        </>
      )}
    </Card>
  )
}
