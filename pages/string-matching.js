import { Component } from 'react'
import { Container, Header } from 'semantic-ui-react'
import App from '../components/App'

export default class extends Component {
  render() {
    return (
      <App>
        <Container text>
          <Header size='huge'>
            String Matching
            <Header.Subheader>
              via Genetic Algorithm
            </Header.Subheader>
          </Header>
        </Container>
      </App>
    )
  }
}
