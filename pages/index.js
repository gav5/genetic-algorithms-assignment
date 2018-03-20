import { Component } from 'react'
import Link from 'next/link'
import { Container, Header, Button, Grid } from 'semantic-ui-react'
import App from '../components/App'

export default class extends Component {
  render() {
    return (
      <App>
        <Grid columns={1} centered padded stretched>
          <Grid.Row>
            <Grid.Column>
              <Container fluid>
                <Header size='huge'>
                  Project 03
                  <Header.Subheader>
                    Kennesaw State University<br/>
                    CS4242 Spring 2018<br/>
                    By Gavin Smith
                  </Header.Subheader>
                </Header>
                <p>
                  Please select a project to continue.<br/>
                  <Link href='/8-puzzle'>
                    <a>8-Puzzle</a>
                  </Link><br/>
                  <Link href='/string-matching'>
                    <a>String Matching</a>
                  </Link>
                </p>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </App>
    )
  }
}
