import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from '../app/App.jsx'

function renderWithRouter(component) {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('App', () => {
  it('renders without crashing', () => {
    renderWithRouter(<App />)
    expect(screen.getByText('VaultBin')).toBeInTheDocument()
  })

  it('renders navbar and sidebar', () => {
    renderWithRouter(<App />)
    
    // Check navbar elements
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Create')).toBeInTheDocument()
    
    // Check main content
    expect(screen.getByText('My Secure Pastes')).toBeInTheDocument()
  })

  it('shows correct number of pastes in All Pastes', () => {
    renderWithRouter(<App />)
    
    // Should show 4 pastes in "All Pastes" folder
    const allPastesButton = screen.getByRole('button', { name: /all pastes/i })
    expect(allPastesButton).toBeInTheDocument()
    expect(allPastesButton).toHaveTextContent('4')
  })
})
