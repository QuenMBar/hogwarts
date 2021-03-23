import React, { Component } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";

import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Select from "@material-ui/core/Select";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

export default class SortBar extends Component {
    render() {
        return (
            <FormGroup className="formGroup" row>
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.props.parentState.onlyGreased}
                            onChange={this.props.switchCallback}
                            name="greasedCheck"
                            color="primary"
                        />
                    }
                    label="Show Only Greased Pigs"
                />
                <form onSubmit={this.props.searchCallback} noValidate autoComplete="off" className="searchForm">
                    <TextField
                        onChange={this.props.textChange}
                        value={this.props.parentState.tempSearchString}
                        id="standard-search"
                        label="Search Pigs"
                        type="search"
                        name="searchName"
                        className="searchFeild"
                    />
                    <IconButton type="submit">
                        <SearchIcon />
                    </IconButton>
                </form>
                <div className="sliderClass">
                    <Typography id="range-slider" gutterBottom>
                        Pigs Weight
                    </Typography>
                    <Slider
                        value={this.props.parentState.searchWeightRange}
                        valueLabelDisplay="auto"
                        onChange={this.props.weightChange}
                        min={0}
                        max={6}
                        step={1}
                        marks
                    />
                </div>
                <FormControl className="selectorClass">
                    <InputLabel>Sort by</InputLabel>
                    <Select value={this.props.parentState.sortBy} onChange={this.props.changeSort}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="name">by Name</MenuItem>
                        <MenuItem value="weight">by Weight</MenuItem>
                    </Select>
                </FormControl>
            </FormGroup>
        );
    }
}
