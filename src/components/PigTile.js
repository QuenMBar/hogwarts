import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";

export default class RecipeReviewCard extends Component {
    state = {
        expanded: false,
        amHidden: false,
    };

    handleExpandClick = () => {
        this.setState({
            expanded: !this.state.expanded,
        });
    };

    getImage = (hogName) => {
        let formattedName = hogName.replace(/ /g, "_").toLowerCase();
        let pigPics = require(`../hog-imgs/${formattedName}.jpg`);
        return pigPics;
    };

    hideSelf = () => {
        this.setState({
            amHidden: true,
        });
    };

    render() {
        if (this.state.amHidden) {
            return null;
        }
        return (
            <Card className="pigCard" onClick={this.handleExpandClick}>
                <CardHeader title={this.props.hogData.name} />
                <CardMedia className="pigImg" image={this.getImage(this.props.hogData.name)} title="Babe Pig" />
                <div className="cardButton">
                    <Button onClick={this.hideSelf} variant="outlined">
                        Hide Pig
                    </Button>
                </div>

                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Weight: {this.props.hogData.weight}</Typography>
                        <Typography paragraph>specialty: {this.props.hogData.specialty}</Typography>
                        <Typography paragraph>Is it greased: {this.props.hogData.greased.toString()}</Typography>
                        <Typography paragraph>
                            Highest medal achieved: {this.props.hogData["highest medal achieved"]}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}
