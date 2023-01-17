import { render, screen, within } from '@testing-library/react'
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

    const secondRow = screen.getAllByRole('row')[2]

    // Assert
    expect(within(secondRow).getAllByRole('cell')[1]).toHaveTextContent(4)
    expect(within(secondRow).getAllByRole('cell')[2]).toHaveTextContent(7)
    expect(within(secondRow).getAllByRole('cell')[3]).toHaveTextContent(13)
  })

  it('should display medals in order of most medals', () => {
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

    // Row 0 is the header
    const rows = screen.getAllByRole('row')

    // Assert
    // Col 0 is the country
    expect(within(rows[1]).getAllByRole('cell')[1]).toHaveTextContent(6)
    expect(within(rows[1]).getAllByRole('cell')[2]).toHaveTextContent(14)
    expect(within(rows[1]).getAllByRole('cell')[3]).toHaveTextContent(8)

    expect(within(rows[2]).getAllByRole('cell')[1]).toHaveTextContent(4)
    expect(within(rows[2]).getAllByRole('cell')[2]).toHaveTextContent(7)
    expect(within(rows[2]).getAllByRole('cell')[3]).toHaveTextContent(11)

    expect(within(rows[3]).getAllByRole('cell')[1]).toHaveTextContent(1)
    expect(within(rows[3]).getAllByRole('cell')[2]).toHaveTextContent(2)
    expect(within(rows[3]).getAllByRole('cell')[3]).toHaveTextContent(4)
  })
})
