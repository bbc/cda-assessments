import { render, screen } from '@testing-library/react'
import Home from './Home'

describe('Home', () => {
  it('should render the component', () => {
    // Act
    render(<Home />)

    // Assert
    expect(screen.getByTestId('medals-container')).toBeInTheDocument()
  })
})
