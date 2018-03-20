import { Component } from 'react'
import { Table, Statistic } from 'semantic-ui-react'
import { pick, defaults } from 'lodash'
import fitness from '../lib/8puzzle_fitness'

class EightPuzzleBoard extends Component {
  constructor(props) {
    super(defaults(props, {size: 'small'}))
  }

  evalColor(fitval) {
    if (fitval === 0) {
      return 'red'
    }
    if (fitval === 9) {
      return 'green'
    }
    if (fitval >= this.props.threshold) {
      return 'blue'
    }
    return 'yellow'
  }

  render() {
    const tableProps = pick(this.props, 'size', 'padded')
    const fitval = fitness(this.props.value)
    tableProps.color = this.evalColor(fitval)

    return (
      <Table celled textAlign="center" {...tableProps} fixed>
        <Table.Body>
          {[0,1,2].map(y => (
            <Table.Row key={y}>
              {[0, 1, 2].map(x => {
                const index = x + (y * 3)
                const value = this.props.value[index]
                const isBlank = (value === '-')
                return (
                  <Table.Cell
                    key={x}
                    content={isBlank ? '' : value}
                    icon={isBlank && {
                      name: 'square',
                      size: 'large',
                      fitted: true,
                      disabled: true
                    }}
                  />
                )
              })}
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='3'>
              <Statistic horizontal size='mini'>
                <Statistic.Value>{fitval}</Statistic.Value>
                <Statistic.Label>fitness</Statistic.Label>
              </Statistic>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  }
}
export default EightPuzzleBoard
