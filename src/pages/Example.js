class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count : 0 }
  }

  componentDidMount(){

  }
  componentDidUpdate(){

  }
  
  render() {
    return <div>
          <p>Вы нажали {this.state.count} раз</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Нажми на меня
        </button>
    </div>;
  }
}
