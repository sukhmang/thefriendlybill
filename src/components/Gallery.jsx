import { useState, useEffect, useRef, useMemo } from 'react'
import styled from 'styled-components'
import { Images, Play, Image, Video } from 'lucide-react'
import Lightbox from './Lightbox'

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
`

const MediaItem = styled.div`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: pointer;
  background-color: ${props => props.theme.colors.border};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: ${props => props.theme.shadows.md};
  }
`

const MediaThumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${props => props.$loaded ? 1 : 0};
  transition: opacity 0.3s ease;
`

const MediaVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    ${props => props.theme.colors.border} 0%, 
    ${props => props.theme.colors.background} 50%, 
    ${props => props.theme.colors.border} 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`

const SkeletonItem = styled.div`
  aspect-ratio: 1;
  background: linear-gradient(90deg, 
    ${props => props.theme.colors.border} 0%, 
    ${props => props.theme.colors.background} 50%, 
    ${props => props.theme.colors.border} 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: ${props => props.theme.borderRadius.sm};
  
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  transition: background 0.2s ease;

  ${MediaItem}:hover & {
    background: rgba(0, 0, 0, 0.2);
  }
`

const PlayIcon = styled.div`
  width: 3rem;
  height: 3rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.accent};

  svg {
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 0.25rem;
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.typography.sizes.base};
`

const LoadingState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.typography.sizes.base};
`

const LoadMoreTrigger = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: ${props => props.theme.colors.accent}15;
  border: 1px solid ${props => props.theme.colors.accent}40;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.sizes.xs};
  font-weight: ${props => props.theme.typography.weights.semibold};
  color: ${props => props.theme.colors.accent};
  margin-bottom: 1rem;
`

const ToggleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`

const ToggleLabel = styled.label`
  font-size: ${props => props.theme.typography.sizes.sm};
  font-weight: ${props => props.theme.typography.weights.semibold};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 0.25rem;
`

const ToggleWrapper = styled.div`
  position: relative;
  display: flex;
  background-color: ${props => props.theme.colors.background};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 0.25rem;
  overflow: hidden;
`

const ToggleSlider = styled.div`
  position: absolute;
  top: 0.25rem;
  left: ${props => {
    if (props.$value === 'both') return '0.25rem'
    if (props.$value === 'images') return 'calc(33.333% + 0.125rem)'
    return 'calc(66.666% + 0.125rem)'
  }};
  width: calc(33.333% - 0.5rem);
  height: calc(100% - 0.5rem);
  background-color: ${props => props.theme.colors.accent};
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
`

const ToggleOption = styled.button`
  position: relative;
  flex: 1;
  padding: 0.75rem 1rem;
  font-size: ${props => props.theme.typography.sizes.sm};
  font-weight: ${props => props.theme.typography.weights.semibold};
  color: ${props => props.$active ? props.theme.colors.cardBackground : props.theme.colors.text.secondary};
  background: transparent;
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: pointer;
  transition: color 0.2s ease;
  z-index: 1;

  &:hover {
    color: ${props => props.$active ? props.theme.colors.cardBackground : props.theme.colors.text.primary};
  }
`

const ResultsCount = styled.div`
  text-align: center;
  font-size: ${props => props.theme.typography.sizes.sm};
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 1.5rem;
`

const ITEMS_PER_BATCH = 24

// Lazy loaded image component with Intersection Observer and thumbnail fallback
function LazyImage({ src, alt, thumbnail, onLoad }) {
  const [loaded, setLoaded] = useState(false)
  const [inView, setInView] = useState(false)
  const [useThumbnail, setUseThumbnail] = useState(true)
  const [imageSrc, setImageSrc] = useState(thumbnail || src)
  const imgRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (imgRef.current) {
        observer.disconnect()
      }
    }
  }, [])

  const handleLoad = () => {
    setLoaded(true)
    if (onLoad) onLoad()
  }

  const handleError = () => {
    // If thumbnail fails to load, fallback to full image
    if (useThumbnail && thumbnail && thumbnail !== src) {
      setUseThumbnail(false)
      setImageSrc(src)
    } else {
      // If full image also fails, just show placeholder
      setLoaded(true) // Stop showing loading state
    }
  }

  return (
    <div ref={imgRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      {!loaded && <Placeholder />}
      {inView && (
        <MediaThumbnail
          src={imageSrc}
          alt={alt}
          $loaded={loaded}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
        />
      )}
    </div>
  )
}

// Lazy loaded video component for grid view (muted, looped, autoplay)
function LazyVideo({ src, alt }) {
  const [inView, setInView] = useState(false)
  const videoRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '50px',
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    if (inView && videoRef.current) {
      // Try to play the video (muted, looped, autoplay)
      videoRef.current.play().catch(err => {
        console.log('Video autoplay prevented:', err)
      })
    }
  }, [inView])

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      {!inView && <Placeholder />}
      {inView && (
        <MediaVideo
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
        />
      )}
    </div>
  )
}

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_BATCH)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [filter, setFilter] = useState('both') // 'both', 'images', 'videos'
  const loadMoreRef = useRef(null)

  // Load images from JSON file
  useEffect(() => {
    const loadGalleryData = async () => {
      try {
        const response = await fetch('/images/images.json')
        const imageList = await response.json()
        
        // Convert filenames/URLs to gallery items
        // Supports both local paths (e.g., "image.jpg") and CDN URLs (e.g., "https://res.cloudinary.com/...")
        const items = imageList.map((item) => {
          // Check if it's a CDN URL or local filename
          const isUrl = item.startsWith('http://') || item.startsWith('https://')
          
          let filename, url, thumbnail
          if (isUrl) {
            // It's a CDN URL
            url = item
            thumbnail = item
            // Extract filename from URL for display
            filename = item.split('/').pop().split('?')[0] // Get last part of URL, remove query params
          } else {
            // It's a local filename
            filename = item
            url = `/images/${item}`
          }
          
          const lowerFilename = filename.toLowerCase()
          const isGif = lowerFilename.endsWith('.gif')
          const isVideo = lowerFilename.match(/\.(mp4|webm|mov)$/i)
          
          // Generate thumbnail path for images
          if (!isUrl && !isVideo && !isGif) {
            // For images, use thumbnail (always .jpg, regardless of original format)
            const baseName = filename.replace(/\.[^/.]+$/, '')
            thumbnail = `/images/thumbnails/${baseName}.jpg`
          } else {
            // For videos/GIFs, use the file itself
            thumbnail = url
          }
          
          return {
            filename,
            url,
            thumbnail,
            type: isGif ? 'gif' : isVideo ? 'video' : 'image',
            alt: filename.replace(/\.[^/.]+$/, '') // Remove extension for alt text
          }
        })
        
        setGalleryItems(items)
      } catch (error) {
        console.error('Error loading gallery images:', error)
        setGalleryItems([])
      } finally {
        setLoading(false)
      }
    }

    loadGalleryData()
  }, [])

  // Filter items based on selected filter
  const filteredItems = useMemo(() => {
    if (filter === 'both') {
      return galleryItems
    } else if (filter === 'images') {
      return galleryItems.filter(item => item.type === 'image')
    } else if (filter === 'videos') {
      return galleryItems.filter(item => item.type === 'gif' || item.type === 'video')
    }
    return galleryItems
  }, [galleryItems, filter])

  // Reset visible items when filter changes
  useEffect(() => {
    setVisibleItems(ITEMS_PER_BATCH)
  }, [filter])

  // Infinite scroll - observe when user scrolls near bottom
  useEffect(() => {
    if (loading || visibleItems >= filteredItems.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && !isLoadingMore) {
          setIsLoadingMore(true)
          
          // Simulate a small delay for better UX (shows loading skeletons)
          setTimeout(() => {
            setVisibleItems(prev => Math.min(prev + ITEMS_PER_BATCH, filteredItems.length))
            setIsLoadingMore(false)
          }, 300) // Small delay to show loading state
        }
      },
      {
        rootMargin: '200px', // Start loading when 200px before trigger
        threshold: 0.1
      }
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => {
      if (loadMoreRef.current) {
        observer.disconnect()
      }
    }
  }, [loading, visibleItems, filteredItems.length, isLoadingMore])

  // Get items to display
  const displayedItems = filteredItems.slice(0, visibleItems)
  const hasMore = visibleItems < filteredItems.length

  const openLightbox = (index) => {
    // Find the actual index in the filtered items array
    const actualIndex = filteredItems.findIndex(
      item => item === displayedItems[index]
    )
    setCurrentIndex(actualIndex)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const goToNext = () => {
    if (currentIndex < filteredItems.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  if (loading) {
    return (
      <Card id="gallery">
        <Title>
          <Images size={28} />
          Gallery
        </Title>
        <LoadingState>Loading gallery...</LoadingState>
      </Card>
    )
  }

  if (galleryItems.length === 0) {
    return (
      <Card id="gallery">
        <Title>
          <Images size={28} />
          Gallery
        </Title>
        <EmptyState>
          Gallery images will be added soon. Please add images to the <code>public/images/</code> folder and update <code>public/images/images.json</code>.
        </EmptyState>
      </Card>
    )
  }

  return (
    <>
      <Card id="gallery">
        <Title>
          <Images size={28} />
          Gallery
        </Title>

        <Badge>More pictures coming soon!</Badge>

        <ToggleContainer>
          <ToggleLabel>Media Type</ToggleLabel>
          <ToggleWrapper>
            <ToggleSlider $value={filter} />
            <ToggleOption
              $active={filter === 'both'}
              onClick={() => setFilter('both')}
              aria-label="Show all media"
            >
              Both
            </ToggleOption>
            <ToggleOption
              $active={filter === 'images'}
              onClick={() => setFilter('images')}
              aria-label="Show images only"
            >
              Images
            </ToggleOption>
            <ToggleOption
              $active={filter === 'videos'}
              onClick={() => setFilter('videos')}
              aria-label="Show videos only"
            >
              Videos
            </ToggleOption>
          </ToggleWrapper>
        </ToggleContainer>

        <ResultsCount>
          Showing {displayedItems.length} of {filteredItems.length} {filter === 'both' ? 'items' : filter === 'images' ? 'images' : 'videos'}
        </ResultsCount>

        <Grid>
          {displayedItems.map((item, index) => (
            <MediaItem
              key={`${item.filename}-${index}`}
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openLightbox(index)
                }
              }}
              aria-label={`View ${item.alt || item.filename}`}
            >
              {item.type === 'video' ? (
                <LazyVideo
                  src={item.url}
                  alt={item.alt || item.filename}
                />
              ) : item.type === 'gif' ? (
                <LazyImage
                  src={item.url}
                  thumbnail={item.thumbnail}
                  alt={item.alt || item.filename}
                />
              ) : (
                <LazyImage
                  src={item.url}
                  thumbnail={item.thumbnail}
                  alt={item.alt || item.filename}
                />
              )}
            </MediaItem>
          ))}

          {/* Loading skeletons when loading more */}
          {isLoadingMore && hasMore && Array.from({ length: ITEMS_PER_BATCH }).map((_, i) => (
            <SkeletonItem key={`skeleton-${i}`} />
          ))}
        </Grid>

        {/* Trigger element for infinite scroll */}
        {hasMore && (
          <LoadMoreTrigger ref={loadMoreRef}>
            {isLoadingMore && (
              <LoadingState style={{ padding: '1rem' }}>
                Loading more images...
              </LoadingState>
            )}
          </LoadMoreTrigger>
        )}

        {!hasMore && displayedItems.length > 0 && (
          <ResultsCount style={{ marginTop: '2rem' }}>
            All images loaded
          </ResultsCount>
        )}
      </Card>

      {lightboxOpen && filteredItems.length > 0 && (
        <Lightbox
          item={filteredItems[currentIndex]}
          items={filteredItems}
          currentIndex={currentIndex}
          onClose={closeLightbox}
          onNext={goToNext}
          onPrevious={goToPrevious}
        />
      )}
    </>
  )
}
