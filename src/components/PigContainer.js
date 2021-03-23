import React, { Component } from "react";
import PigTile from "./PigTile";
import Grid from "@material-ui/core/Grid";
import SortBar from "./SortBar";

import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

export default class PigContainer extends Component {
    state = {
        currentPigs: this.props.hogData,
        onlyGreased: false,
        searchString: "",
        tempSearchString: "",
        searchWeightRange: [0, 6],
        error: false,
        sortBy: "",
    };

    filterElements = () => {
        let pigsData = [...this.props.hogData];
        if (this.state.onlyGreased) {
            pigsData = pigsData.filter((pig) => pig.greased);
        }
        if (this.state.searchWeightRange !== [0, 6]) {
            pigsData = pigsData.filter(
                (pig) => this.state.searchWeightRange[0] <= pig.weight && pig.weight <= this.state.searchWeightRange[1]
            );
        }
        if (this.state.searchString !== "") {
            console.log(this.state.searchString);
            let filterTry = pigsData.find((pig) => pig.name.toLowerCase() === this.state.searchString.toLowerCase());
            if (filterTry !== undefined) {
                pigsData = [filterTry];
            } else {
                this.callAlert();
                this.setState({
                    searchString: "",
                });
            }
        }
        if (this.state.sortBy !== "") {
            if (this.state.sortBy === "name") {
                pigsData.sort((a, b) => {
                    if (a.name < b.name) {
                        return -1;
                    } else {
                        return 1;
                    }
                });
            } else {
                pigsData.sort((a, b) => a.weight - b.weight);
            }
        }
        this.setState({
            currentPigs: pigsData,
        });
    };

    switchCallback = (e) => {
        this.setState(
            {
                onlyGreased: e.target.checked,
            },
            () => this.filterElements()
        );
    };

    searchCallback = (e) => {
        e.preventDefault();
        this.setState(
            (state) => {
                return { searchString: state.tempSearchString, tempSearchString: "" };
            },
            () => this.filterElements()
        );
    };

    textChange = (e) => {
        this.setState({
            tempSearchString: e.target.value,
        });
    };

    weightChange = (e, newVal) => {
        this.setState(
            {
                searchWeightRange: newVal,
            },
            () => this.filterElements()
        );
    };

    callAlert = () => {
        this.setState({
            error: true,
        });
    };

    handleClose = () => {
        this.setState({
            error: false,
        });
    };

    changeSort = (e) => {
        this.setState(
            {
                sortBy: e.target.value,
            },
            () => this.filterElements()
        );
    };

    render() {
        return (
            <div>
                <SortBar
                    switchCallback={this.switchCallback}
                    searchCallback={this.searchCallback}
                    textChange={this.textChange}
                    weightChange={this.weightChange}
                    changeSort={this.changeSort}
                    parentState={this.state}
                />
                <Grid container justify="center" className="gridContain" spacing={5}>
                    {this.state.currentPigs.map((pigData, index) => (
                        <Grid item>
                            <PigTile key={pigData.name} hogData={pigData} />
                        </Grid>
                    ))}
                </Grid>
                <Snackbar open={this.state.error} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="error" elevation={6} variant="filled">
                        The Name You Have Entered Does Not Exist
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}
