import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import MedalsTable from './MedalsTable'

describe('MedalsTable', () => {
  it('should render a row for each medal', () => {
    // Arrange
    const medals = [
      { countryId: 1, gold: 1, silver: 2, bronze: 2 },
      { countryId: 2, gold: 4, silver: 7, bronze: 13 },
      { countryId: 3, gold: 6, silver: 4, bronze: 5 },
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

  it('should render gold, silver and bronze medal values', () => {
    // Arrange
    const medals = [
      { countryId: 1, gold: 1, silver: 2, bronze: 2 }
    ]

    // Act
    render(
      <MemoryRouter>
        <MedalsTable medals={medals} />
      </MemoryRouter>
    )

    // Assert
    const firstRow = screen.getAllByRole('row')[1]
    expect(within(firstRow).getAllByRole('cell')[1]).toHaveTextContent(1)
    expect(within(firstRow).getAllByRole('cell')[2]).toHaveTextContent(2)
    expect(within(firstRow).getAllByRole('cell')[3]).toHaveTextContent(2)
  })
})
