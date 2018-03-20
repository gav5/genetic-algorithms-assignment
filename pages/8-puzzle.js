import { Component } from 'react'
import { Grid, Header, Button, Container, Menu, List } from 'semantic-ui-react'
import { first, isNull, isObject, chunk } from 'lodash'
import App from '../components/App'
import EightPuzzleBoard from '../components/EightPuzzleBoard'
import solve from '../lib/8puzzle_solve'
import goalval from '../lib/8puzzle_goal'
import fitness from '../lib/8puzzle_fitness'

const NUM_COLS = 5
const NUM_ROWS = 4

export default class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      solution: null,
      data: null,
      best: null,
      runTimer: false,
    }
    this.handleSolve = this.handleSolve.bind(this)
    this.handleStop = this.handleStop.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  handleSolve(e) {
    const newData = solve(this.state.data)
    const best = first(newData.population)

    let solution = null
    if (fitness(best) === 9) {
      solution = best
    }
    this.setState({
      solution: solution,
      data: newData,
      best: best,
      runTimer: isNull(solution),
    })
    setTimeout(()=> {
      if (this.state.runTimer) {
        this.handleSolve({})
      }
    }, 0.25)
  }

  handleStop(e) {
    this.setState({runTimer: false})
  }

  handleReset(e) {
    this.setState({solution: null, data: null, best: null, runTimer: false})
  }

  render() {
    return (
      <App>
        {isNull(this.state.data) && (
          <Grid columns={1} centered padded stretched>
            <Grid.Row>
              <Grid.Column>
                <Container text fluid>
                  <Header>Goal</Header>
                  <EightPuzzleBoard value={goalval}/>
                  <Button fluid size='huge' color='blue' onClick={this.handleSolve}>Solve</Button>
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
        {isObject(this.state.data) && (
          <Grid columns={NUM_COLS} centered padded stretched>
            <Grid.Row>
              <Grid.Column width={NUM_COLS}>
                <Container text fluid textAlign='center'>
                  <Header>
                    {isNull(this.state.solution) ? 'Best So Far' : 'Solution'}
                    <Header.Subheader>
                      {isNull(this.state.solution) ? 'of ' : 'after '}
                      {this.state.data.generation} generations
                    </Header.Subheader>
                  </Header>
                  <EightPuzzleBoard value={this.state.best}/>
                  <Button.Group fluid size='huge'>
                    <Button
                      color='black'
                      content='Reset'
                      onClick={this.handleReset}
                    />
                    {this.state.runTimer && (
                      <Button
                        color='red'
                        content='Stop'
                        onClick={this.handleStop}
                      />
                    )}
                    {(!this.state.runTimer && isNull(this.state.solution)) && (
                      <Button
                        color='blue'
                        content='Resume'
                        onClick={this.handleSolve}
                      />
                    )}
                  </Button.Group>
                </Container>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              {chunk(this.state.data.population, NUM_COLS).map((col, i)=> (
                <Grid.Column key={i}>
                  <List>
                    {col.map((b, j) => (
                      <List.Item key={j}>{b} [{fitness(b)}]</List.Item>
                    ))}
                  </List>
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
        )}
      </App>
    )
  }
}
