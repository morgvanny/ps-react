import React, { Component } from 'react';
import { Card, Dimmer, Loader, Image, Segment } from 'semantic-ui-react';

export default class PokemonCard extends Component {
  state = {
    pokemon: {}
  };

  componentDidMount() {
    fetch(this.props.url)
      .then(r => r.json())
      .then(p => this.setState({ pokemon: p }));
  }

  render() {
    return (
      <Card>
        {this.state.pokemon.sprites ? (
          <Image src={this.state.pokemon.sprites.front_default} alt="" fluid />
        ) : (
          <Segment>
            <Dimmer active>
              <Loader />
            </Dimmer>
            <Image
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
              fluid
            />
          </Segment>
        )}
        <div>{this.props.name}</div>
      </Card>
    );
  }
}
