// string-matching.js
// by Gavin Smith
// CS4242 Assignment 03
import { Component } from 'react'
import { Grid, Input, Button, Container, Header, List } from 'semantic-ui-react'
import { first, isNull, isObject, chunk, truncate } from 'lodash'
import App from '../components/App'
import StringMatch from '../components/StringMatch'
import solve from '../lib/match_solve'
import fitness from '../lib/match_fitness'
import generate from '../lib/match_generate'

const NUM_COLS = 4

function fitnessColor(val) {
  switch (val) {
    case 10:
      return 'green'
    case 0:
      return 'red'
    default:
      return 'yellow'
  }
}

export default class extends Component {
  state = {
    goal: generate(),
    solution: null,
    data: null,
    best: null,
    bestFitness: null,
    runTimer: false,
  }

  handleGoalRegenerate = () => {
    this.setState({goal: generate()})
  }

  handleSolve = () => {
    const goal = this.state.goal
    const newData = solve(this.state.data, goal)
    const best = first(newData.population)

    let solution = null
    const bestFitness = fitness(best, goal)
    if (bestFitness === 10) {
      solution = best
    }
    this.setState({
      solution: solution,
      data: newData,
      best: best,
      bestFitness: bestFitness,
      runTimer: isNull(solution),
    })
    setTimeout(()=> {
      if (this.state.runTimer) {
        this.handleSolve({})
      }
    }, 0.25)
  }

  handleStop = () => this.setState({runTimer: false})

  handleReset = () => this.setState({
    solution: null,
    data: null,
    best: null,
    runTimer: false,
  })

  render() {
    return (
      <App>
        <Grid columns={NUM_COLS} centered padded stretched>
          <Grid.Row>
            <Grid.Column width={16}>
              <Container text fluid>
                <Header>Goal</Header>
                <StringMatch
                  value={this.state.goal}
                  fitness={10}
                  color='green'
                />
                {isNull(this.state.best) && (
                  <Button.Group fluid size='huge'>
                    <Button
                      content='Regenerate'
                      color='black'
                      onClick={this.handleGoalRegenerate}
                    />
                    <Button
                      content='Solve'
                      color='blue'
                      onClick={this.handleSolve}
                    />
                  </Button.Group>
                )}
              </Container>
            </Grid.Column>
          </Grid.Row>
          {this.state.best && (
            <Grid.Row>
              <Grid.Column width={16}>
                <Container text fluid>
                  <Header>
                    {isNull(this.state.solution) ? 'Best So Far' : 'Solution'}
                    <Header.Subheader>
                      {isNull(this.state.solution) ? 'of ' : 'after '}
                      {this.state.data.generation} generations
                    </Header.Subheader>
                  </Header>
                  <StringMatch
                    value={this.state.best}
                    color={fitnessColor(this.state.bestFitness)}
                    fitness={this.state.bestFitness}
                  />
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
          )}
          {this.state.best && (
            <Grid.Row>
              {chunk(this.state.data.population, 20/NUM_COLS).map((col, i)=> (
                <Grid.Column key={i}>
                  <Container text fluid textAlign='center'>
                    <List>
                      {col.map((b, j)=> (
                        <List.Item key={j}>{b}</List.Item>
                      ))}
                    </List>
                  </Container>
                </Grid.Column>
              ))}
            </Grid.Row>
          )}
        </Grid>
      </App>
    )
  }
}
