import { render, screen } from '@testing-library/react'

import CountryDetails from './CountryDetails'

describe('CountryDetails', () => {
  it('should display all given details about the country', () => {
    // Arrange
    const country = {
      name: 'Scotland',
      id: 1,
      code: 'SCO',
      flagUrl: 'sample-website.com/image/scotland.png',
    }

    // Act
    render(<CountryDetails country={country} />)

    // Assert
    expect(screen.getByText('Country: Scotland')).toBeInTheDocument()
    expect(screen.getByText('Id: 1')).toBeInTheDocument()
    expect(screen.getByText('Code: SCO')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', 'sample-website.com/image/scotland.png')
  })
})
