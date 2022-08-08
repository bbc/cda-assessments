import { render, screen } from '@testing-library/react'
import MedalsTable from './MedalsTable'

describe('MedalsTable', () => {
  it('should render a row for each medal', () => {
    // Arrange
    const medals = [
      { id: '1', gold: 1, silver: 2, bronze: 2 },
      { id: '2', gold: 4, silver: 7, bronze: 13 },
      { id: '3', gold: 6, silver: 4, bronze: 5 },
    ]

    // Act
    render(<MedalsTable medals={medals} />)

    // Assert
    expect(screen.getAllByRole('row')).toHaveLength(4)
  })
})
