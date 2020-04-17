import React, { Component } from 'react';
import './App.css';
import axios from "axios";

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      quotes: []
    }
  };

  componentDidMount(){
    axios
      .get('/api/quotes/')
      .then(res => this.setState({ quotes: res.data}))
      .catch(alert);
  }

  createQuote = () => {
    const quote = prompt('Enter your quote: ');
    if(!quote) return;
    axios
      .post('api/quotes/create', { quote })
      .then(res => this.setState({ quotes: [...this.state.quotes, res.data]}))
      .catch(err => alert(`Failed to create quote\n${JSON.stringify(err)}`))
  }

  deleteQuotes = () => {
    const doDelete = window.confirm('Delete all thoughts');
    if(!doDelete) return;
    axios
      .delete('/api/quotes')
      .then(res => this.setState({quotes: []}))
      .catch(err => alert(`Failed to delete all quotes\n${JSON.stringify(err)}`));
  }

  seedQuotes = () => {
    const doSeed = window.confirm('Do you want to seed random quotes?');
    if(!doSeed) return;
    axios
      .post('api/quotes/seed', {})
      .then(() => {
        axios
          .get('/api/quotes/')
          .then(res => this.setState({ quotes: res.data}))
          .catch(alert)
      })
      .catch(alert);
  }

  render(){
    const { quotes } = this.state;
    return(
    <div className="App">
        <button onClick={this.createQuote}>Create Quote</button>
        <button onClick={this.deleteQuotes}>Delete Quotes</button>
        <button onClick={this.seedQuotes}>Seed Quotes</button>
        <ul>
          {quotes.map(quoteModel => (
            <li
              style={{ listStyleType: 'none', margin: '20px', borderBottom: '1px'}}
              key={quoteModel._id}
            >
              {quoteModel.quote}
            </li>

          ))}
        </ul>
    </div>
        )
  }
}

export default App;
