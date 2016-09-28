import React from 'react';
import { Component } from 'react';
import Greetings from './Greetings';
import NavigationBar from './NavigationBar';

class App extends Component {
    render(){
        return (
            <div className='container'>
                <NavigationBar />
                {this.props.children}
            </div>
        )
    }
}

export default App;
