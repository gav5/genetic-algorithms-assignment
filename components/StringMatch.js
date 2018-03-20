import { Component } from 'react'
import { Table, Statistic } from 'semantic-ui-react'
import { split, map } from 'lodash'

class StringMatch extends Component {
  render() {
    return (
      <Table celled fixed textAlign='center' color={this.props.color}>
        <Table.Body>
          <Table.Row>
            {map(split(this.props.value, ''), (x, i) => (
              <Table.Cell
                key={i}
                content={x}
              />
            ))}
          </Table.Row>
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='10'>
              <Statistic horizontal size='mini'>
                <Statistic.Value>{this.props.fitness}</Statistic.Value>
                <Statistic.Label>fitness</Statistic.Label>
              </Statistic>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  }
}

export default StringMatch
