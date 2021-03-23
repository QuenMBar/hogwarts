import React, { Component } from "react";
import "../App.css";
import Nav from "./Nav";
import hogs from "../porkers_data";
import PigContainer from "./PigContainer";
// import "fontsource-roboto";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Nav />
                <PigContainer hogData={hogs} />
            </div>
        );
    }
}

export default App;
