import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { MapPin, Calendar, Users, ArrowLeft } from 'lucide-react'
import { HOME_VIDEOS } from '../constants'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 100vh;
`

const Header = styled.div`
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
`

const BackLink = styled(Link)`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: ${props => props.theme.typography.sizes.sm};
  font-weight: ${props => props.theme.typography.weights.semibold};
  color: ${props => props.theme.colors.text.primary};
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: all 0.2s ease;
  background-color: ${props => props.theme.colors.background};

  &:hover {
    color: ${props => props.theme.colors.accent};
    background-color: ${props => props.theme.colors.cardBackground};
  }

  svg {
    width: 1rem;
    height: 1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    position: static;
    transform: none;
    display: inline-flex;
    margin-bottom: 1rem;
  }
`

const Title = styled.h1`
  font-size: ${props => props.theme.typography.sizes['4xl']};
  font-weight: ${props => props.theme.typography.weights.bold};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 1rem;
`

const Subtitle = styled.p`
  font-size: ${props => props.theme.typography.sizes.lg};
  color: ${props => props.theme.colors.text.secondary};
`

const VideosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

const CollectionCard = styled.div`
  background-color: ${props => props.theme.colors.cardBackground};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.lg};
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  grid-column: 1 / -1; /* Span full width */

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`

const CollectionVideosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1.5rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const CollectionVideoWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  background-color: #000;
  overflow: hidden;
  border-radius: ${props => props.theme.borderRadius.sm};

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`

const VideoCard = styled.div`
  background-color: ${props => props.theme.colors.cardBackground};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.lg};
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  background-color: #000;
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`

const CardContent = styled.div`
  padding: 1.5rem;
`

const CardTitle = styled.h3`
  font-size: ${props => props.theme.typography.sizes.xl};
  font-weight: ${props => props.theme.typography.weights.bold};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 0.75rem;
  line-height: 1.3;
`

const CardDescription = styled.p`
  font-size: ${props => props.theme.typography.sizes.base};
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 1rem;
  line-height: 1.6;
`

const MetadataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.border};
`

const MetadataItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: ${props => props.theme.typography.sizes.sm};
  color: ${props => props.theme.colors.text.tertiary};

  svg {
    width: 1.125rem;
    height: 1.125rem;
    flex-shrink: 0;
    margin-top: 0.125rem;
    color: ${props => props.theme.colors.text.secondary};
  }
`

const MetadataLabel = styled.span`
  font-weight: ${props => props.theme.typography.weights.semibold};
  margin-right: 0.25rem;
`

const AppearancesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.25rem;
`

const AppearanceTag = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.sizes.xs};
  color: ${props => props.theme.colors.text.tertiary};
`

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${props => props.theme.colors.text.secondary};
`

const EmptyStateTitle = styled.h2`
  font-size: ${props => props.theme.typography.sizes['2xl']};
  font-weight: ${props => props.theme.typography.weights.bold};
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text.primary};
`

const EmptyStateText = styled.p`
  font-size: ${props => props.theme.typography.sizes.base};
  line-height: 1.6;
`

// Helper function to get YouTube embed URL
const getYouTubeEmbedUrl = (videoId) => {
  return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`
}

export default function HomeVideos() {
  if (!HOME_VIDEOS || HOME_VIDEOS.length === 0) {
    return (
      <Container>
        <Header>
          <BackLink to="/">
            <ArrowLeft />
            <span>Back to Memorial</span>
          </BackLink>
          <Title>Home Videos</Title>
          <Subtitle>Family memories and moments</Subtitle>
        </Header>
        <EmptyState>
          <EmptyStateTitle>No videos yet</EmptyStateTitle>
          <EmptyStateText>
            Home videos will appear here once they are added to the constants file.
          </EmptyStateText>
        </EmptyState>
      </Container>
    )
  }

  // Separate collections from individual videos
  // Collections have both 'collection' and 'videos' properties
  // Individual videos have 'id' and 'title' properties (but not 'collection' or 'videos')
  const collections = HOME_VIDEOS.filter(v => v.collection && Array.isArray(v.videos) && v.videos.length > 0)
  const individualVideos = HOME_VIDEOS.filter(v => v.id && v.title && !v.collection)

  return (
    <Container>
      <Header>
        <BackLink to="/">
          <ArrowLeft />
          <span>Back to Memorial</span>
        </BackLink>
        <Title>Home Videos</Title>
        <Subtitle>Family memories and moments</Subtitle>
      </Header>

      <VideosGrid>
        {/* Render collections first */}
        {collections.map((collection, collectionIndex) => (
          <CollectionCard key={`collection-${collectionIndex}`}>
            <CardContent>
              <CardTitle>{collection.collection}</CardTitle>
              {collection.description && (
                <CardDescription>{collection.description}</CardDescription>
              )}
              <CollectionVideosGrid>
                {collection.videos.map((video, videoIndex) => (
                  <div key={videoIndex}>
                    <CollectionVideoWrapper>
                      <iframe
                        src={getYouTubeEmbedUrl(video.id)}
                        title={`${collection.collection} - ${video.title}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                    </CollectionVideoWrapper>
                    <div style={{ 
                      marginTop: '0.5rem', 
                      fontSize: '0.875rem', 
                      color: '#475569',
                      textAlign: 'center'
                    }}>
                      {video.title}
                    </div>
                  </div>
                ))}
              </CollectionVideosGrid>
              <MetadataContainer>
                {collection.location && (
                  <MetadataItem>
                    <MapPin />
                    <span>
                      <MetadataLabel>Location:</MetadataLabel>
                      {collection.location}
                    </span>
                  </MetadataItem>
                )}
                {collection.year && (
                  <MetadataItem>
                    <Calendar />
                    <span>
                      <MetadataLabel>Year:</MetadataLabel>
                      {collection.year}
                    </span>
                  </MetadataItem>
                )}
                {collection.appearances && collection.appearances.length > 0 && (
                  <MetadataItem>
                    <Users />
                    <div>
                      <MetadataLabel>Appearance by:</MetadataLabel>
                      <AppearancesList>
                        {collection.appearances.map((person, idx) => (
                          <AppearanceTag key={idx}>{person}</AppearanceTag>
                        ))}
                      </AppearancesList>
                    </div>
                  </MetadataItem>
                )}
              </MetadataContainer>
            </CardContent>
          </CollectionCard>
        ))}

        {/* Render individual videos */}
        {individualVideos.map((video, index) => (
          <VideoCard key={video.id || index}>
            <VideoWrapper>
              <iframe
                src={getYouTubeEmbedUrl(video.id)}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </VideoWrapper>
            <CardContent>
              <CardTitle>{video.title}</CardTitle>
              {video.description && (
                <CardDescription>{video.description}</CardDescription>
              )}
              <MetadataContainer>
                {video.location && (
                  <MetadataItem>
                    <MapPin />
                    <span>
                      <MetadataLabel>Location:</MetadataLabel>
                      {video.location}
                    </span>
                  </MetadataItem>
                )}
                {video.year && (
                  <MetadataItem>
                    <Calendar />
                    <span>
                      <MetadataLabel>Year:</MetadataLabel>
                      {video.year}
                    </span>
                  </MetadataItem>
                )}
                {video.appearances && video.appearances.length > 0 && (
                  <MetadataItem>
                    <Users />
                    <div>
                      <MetadataLabel>Appearance by:</MetadataLabel>
                      <AppearancesList>
                        {video.appearances.map((person, idx) => (
                          <AppearanceTag key={idx}>{person}</AppearanceTag>
                        ))}
                      </AppearancesList>
                    </div>
                  </MetadataItem>
                )}
              </MetadataContainer>
            </CardContent>
          </VideoCard>
        ))}
      </VideosGrid>
    </Container>
  )
}

