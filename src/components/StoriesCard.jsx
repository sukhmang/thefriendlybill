import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { BookOpen, Mail, ChevronDown } from 'lucide-react'

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

const SubmitBadge = styled.div`
  display: inline-flex;
  align-items: center;
  position: relative;
  margin-left: 0.5rem;
`

const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  background-color: ${props => props.theme.colors.accent}15;
  border: 1px solid ${props => props.theme.colors.accent}40;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.sizes.xs};
  font-weight: ${props => props.theme.typography.weights.semibold};
  color: ${props => props.theme.colors.accent};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.accent}25;
    border-color: ${props => props.theme.colors.accent}60;
  }

  svg {
    width: 0.875rem;
    height: 0.875rem;
    transition: transform 0.2s ease;
  }

  svg:last-child {
    transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  background-color: ${props => props.theme.colors.cardBackground};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.lg};
  min-width: 200px;
  z-index: 100;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease;
`

const DropdownItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: ${props => props.theme.colors.text.primary};
  text-decoration: none;
  font-size: ${props => props.theme.typography.sizes.sm};
  transition: background-color 0.2s ease;
  border-bottom: 1px solid ${props => props.theme.colors.border};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${props => props.theme.colors.background};
  }

  svg {
    width: 1rem;
    height: 1rem;
    color: ${props => props.theme.colors.text.secondary};
  }
`

const ComingSoonBadge = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  background-color: ${props => props.theme.colors.text.secondary}15;
  border: 1px solid ${props => props.theme.colors.text.secondary}40;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.sizes.xs};
  font-weight: ${props => props.theme.typography.weights.semibold};
  color: ${props => props.theme.colors.text.secondary};
  margin-left: 0.5rem;
`

const Content = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.typography.sizes.base};
  line-height: 1.6;
`

export default function StoriesCard() {
  const [submitDropdownOpen, setSubmitDropdownOpen] = useState(false)
  const submitDropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (submitDropdownRef.current && !submitDropdownRef.current.contains(event.target)) {
        setSubmitDropdownOpen(false)
      }
    }

    if (submitDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [submitDropdownOpen])

  const handleEmailSubmit = () => {
    window.location.href = 'mailto:billgrewalpics@gmail.com?subject=Story Submission for Baljit Grewal Memorial'
    setSubmitDropdownOpen(false)
  }

  return (
    <Card id="stories">
      <Title>
        <BookOpen size={28} />
        Stories
        <ComingSoonBadge>Coming soon</ComingSoonBadge>
        <SubmitBadge ref={submitDropdownRef}>
          <SubmitButton
            onClick={() => setSubmitDropdownOpen(!submitDropdownOpen)}
            $isOpen={submitDropdownOpen}
            aria-label="Submit your story"
          >
            Submit your story!
            <ChevronDown size={14} />
          </SubmitButton>
          <Dropdown $isOpen={submitDropdownOpen}>
            <DropdownItem
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handleEmailSubmit()
              }}
            >
              <Mail size={16} />
              Email Us
            </DropdownItem>
          </Dropdown>
        </SubmitBadge>
      </Title>
      <Content>
        Share your memories and stories about Baljit Singh Grewal. Stories will be displayed here soon.
      </Content>
    </Card>
  )
}

