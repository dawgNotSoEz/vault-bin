import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Dashboard from '../pages/Dashboard.jsx'

function renderWithRouter(component) {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Dashboard', () => {
  it('renders dashboard with pastes', () => {
    renderWithRouter(<Dashboard />)
    
    expect(screen.getByText('My Secure Pastes')).toBeInTheDocument()
    expect(screen.getByText('Manage your encrypted pastes and collaborations')).toBeInTheDocument()
    
    // Should show pastes
    expect(screen.getByText('API Configuration')).toBeInTheDocument()
    expect(screen.getByText('Meeting Notes - Q4 Planning')).toBeInTheDocument()
  })

  it('filters pastes by folder', () => {
    renderWithRouter(<Dashboard />)
    
    // Click on Work folder
    const workFolder = screen.getByRole('button', { name: /work/i })
    fireEvent.click(workFolder)
    
    // Should show only work pastes
    expect(screen.getByText('API Configuration')).toBeInTheDocument()
    expect(screen.getByText('Meeting Notes - Q4 Planning')).toBeInTheDocument()
    expect(screen.queryByText('Personal Todo List')).not.toBeInTheDocument()
  })

  it('toggles between list and grid view', () => {
    renderWithRouter(<Dashboard />)
    
    const listButton = screen.getByRole('button', { name: /list/i })
    const gridButton = screen.getByRole('button', { name: /grid/i })
    
    expect(listButton).toHaveAttribute('aria-pressed', 'true')
    expect(gridButton).toHaveAttribute('aria-pressed', 'false')
    
    fireEvent.click(gridButton)
    
    expect(listButton).toHaveAttribute('aria-pressed', 'false')
    expect(gridButton).toHaveAttribute('aria-pressed', 'true')
  })
})
