import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
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
    render(
      <MemoryRouter>
        <MedalsTable medals={medals} />
      </MemoryRouter>
    )

    // Assert
    expect(screen.getAllByRole('row')).toHaveLength(4)
  })

  it('should render totals', () => {
    // Arrange
    const medals = [
      { id: '1', gold: 1, silver: 2, bronze: 2 },
      { id: '2', gold: 4, silver: 7, bronze: 13 },
      { id: '3', gold: 6, silver: 4, bronze: 5 },
    ]

    // Act
    render(
      <MemoryRouter>
        <MedalsTable medals={medals} />
      </MemoryRouter>
    )

    // Assert
    expect(screen.getAllByRole('row')[2]).toHaveTextContent(4713)
  })

  it('should display medals in order of most total medals', () => {
    // Arrange
    const medals = [
      { id: '3', gold: 6, silver: 14, bronze: 8 },
      { id: '2', gold: 4, silver: 7, bronze: 11 },
      { id: '1', gold: 1, silver: 2, bronze: 4 },
    ]

    // Act
    render(
      <MemoryRouter>
        <MedalsTable medals={medals} />
      </MemoryRouter>
    )

    // Assert
    expect(screen.getAllByRole('row')[1]).toHaveTextContent(/6148/)
    expect(screen.getAllByRole('row')[2]).toHaveTextContent(/4711/)
    expect(screen.getAllByRole('row')[3]).toHaveTextContent(/124/)
  })
})
