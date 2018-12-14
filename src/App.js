import React, { Component } from 'react';
import './App.css';
import { Search, Grid } from 'semantic-ui-react';
import _ from 'lodash';
import PokemonCard from './PokemonCard';

class App extends Component {
  state = {
    input: '',
    pokemon: []
  };

  componentDidMount() {
    fetch('https://pokeapi.co/api/v2/pokemon/')
      .then(resp => resp.json())
      .then(data => data.results)
      .then(pokemon => this.setState({ pokemon: pokemon }));
  }

  // componentDidMount() {
  //   fetch('https://pokeapi.co/api/v2/pokemon/')
  //     .then(resp => resp.json())
  //     .then(data => data.results)
  //     .then(pokemonList =>
  //       pokemonList.map(pokemon =>
  //         fetch(pokemon.url)
  //           .then(resp => resp.json())
  //           .then(pokemon =>
  //             this.setState(state => {
  //               return { pokemon: [...state.pokemon, pokemon] };
  //             })
  //           )
  //       )
  //     );
  // }

  // componentDidMount() {
  //   fetch('https://pokeapi.co/api/v2/pokemon/')
  //     .then(resp => resp.json())
  //     .then(data => data.results)
  //     .then(pokemonList => {
  //       return Promise.all(
  //         pokemonList.map(pokemon => {
  //           return fetch(pokemon.url).then(resp => resp.json());
  //         })
  //       );
  //     })
  //     .then(pokemon => {
  //       this.setState({ pokemon });
  //     });
  // }

  handleSearchChange = (e, { value }) => {
    this.setState({
      input: value
    });
  };
  //57 no image
  render() {
    const pokemon = this.state.pokemon.slice(0, 200).map(pokemon => (
      <Grid.Column key={pokemon.url}>
        <PokemonCard {...pokemon} />
      </Grid.Column>
    ));
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="ui">Pokemon Searcher</h1>
        </header>
        <Search
          onSearchChange={_.debounce(this.handleSearchChange, 500)}
          showNoResults={false}
        />
        <br />
        <Grid doubling columns={5}>
          {pokemon}
        </Grid>
      </div>
    );
  }
}

export default App;
