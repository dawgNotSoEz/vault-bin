import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import AboutFeatures from '../pages/AboutFeatures.jsx'

function renderWithRouter(component) {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('AboutFeatures', () => {
  it('renders about page with features and security sections', () => {
    renderWithRouter(<AboutFeatures />)
    
    expect(screen.getByText('VaultBin')).toBeInTheDocument()
    expect(screen.getByText('Zero-knowledge, privacy-first secure sharing for text, code, and files')).toBeInTheDocument()
    
    // Check section headings
    expect(screen.getByText('Features')).toBeInTheDocument()
    expect(screen.getByText('Security')).toBeInTheDocument()
    
    // Check some feature items
    expect(screen.getByText('Secure text sharing')).toBeInTheDocument()
    expect(screen.getByText('Zero-knowledge encryption')).toBeInTheDocument()
  })

  it('shows end-to-end encrypted badge', () => {
    renderWithRouter(<AboutFeatures />)
    
    expect(screen.getByText('End-to-end encrypted')).toBeInTheDocument()
  })

  it('renders call-to-action buttons', () => {
    renderWithRouter(<AboutFeatures />)
    
    expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /view demo/i })).toBeInTheDocument()
  })
})
