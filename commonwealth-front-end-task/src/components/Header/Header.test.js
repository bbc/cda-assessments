import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from './Header'

describe('Header', () => {
  it('should display the title of the app', () => {
    // Act
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    // Assert
    expect(screen.getByText('Commonwealth Games Birmingham 2022')).toBeInTheDocument()
  })

  it('should link to home page', () => {
    // Act
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    // Assert
    expect(screen.getByRole('link')).toHaveAttribute('href', '/')
  })

  it('should include the games logo', () => {
    // Act
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    // Assert
    expect(screen.getByRole('img', { name: 'comonwealth logo' })).toHaveAttribute(
      'src',
      'logo.webp'
    )
  })
})
