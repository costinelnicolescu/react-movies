import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow'
import $ from 'jquery'

class App extends Component {
  constructor(props){
    super(props);

    this.state = [];
    this.performSearch("ant-man");
  }

  performSearch(searchTerm) {
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=e3114bbb4cae7554cb052871ce877fa9&query=" + searchTerm;
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        const results = searchResults.results;
        var movieRows = [];
        results.forEach((movie) => {
          movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path;
          const movieRow = <MovieRow key={movie.id} movie = {movie}/>
          movieRows.push(movieRow);
        })

        this.setState({rows: movieRows});
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })
  }
  searchChangeHandler(event){
    const searchTerm = event.target.value;
    this.performSearch(searchTerm);
  }

  render() {
    return (
      <div className="App">
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img width="50" src="green_app_icon.svg" alt="moviesdb logo"></img>
              </td>
              <td width="8"/>
              <td>
                <h1>MoviesDB Search</h1>
              </td>
            </tr>
          </tbody>
        </table>

        <input className="search" onChange={this.searchChangeHandler.bind(this)}
         placeholder="Enter search term"/>
        {this.state.rows}
      </div>
    );
  }
}

export default App;
