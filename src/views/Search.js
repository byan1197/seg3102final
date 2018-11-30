import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Fetcher from '../helpers/fetcher';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { Button, Typography } from '@material-ui/core';
import { Redirect } from 'react-router-dom'

const styles = theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    gridSpacing: {
        padding: '5px'
    }
});

class Search extends Component {

    constructor() {
        super();
        this.state = {
            fields: false,
            selectedLocation: null,
            values: {
                numBedrooms: null,
                numOtherRooms: null,
                numWashrooms: null,
                maxRent: null,
                minRent: null,
                address: null
            },
            completeSearch: false,
            propertyResults: []
        }
    }

    componentDidMount() {
        Fetcher.getLocations()
            .then(l => l.map(n => { return { label: n, value: n } }))
            .then(l => {
                this.setState({
                    locations: l,
                    selectedLocation: ""
                })
            })
    }

    toggleFields = () => {
        this.setState({ fields: !this.state.fields })
    }

    handleSelect = (e) => {
        this.setState({
            selectedLocation: e.target.value || " "
        })
    }

    updateFields = (name, value) => {

        var regex = name === 'address' ? /.*$/ : /^\d+$/;
        var newValues = this.state.values;
        var newValue = value;

        console.log('regex.test(value)', regex.test(value), regex, value);

        if (!regex.test(value))
            newValue = value.toString().slice(0, -1)

        newValues[name] = newValue

        console.log('newavlues', newValues)

        this.setState({ values: newValues })
    }

    search = () => {
        var query = this.state.values;
        if (this.state.selectedLocation)
            query.location = this.state.selectedLocation;
        Fetcher.getProperties(query)
            .then(x => {
                console.log(x);
                this.setState({ completeSearch: true, propertyResults: x })
            })
    }

    render() {

        const { classes } = this.props;
        const fields = this.state.fields;
        const selectedLocation = this.state.selectedLocation;

        if (this.state.completeSearch)
            return <Redirect
                to={{
                    pathname: "/properties",
                    state: {
                        properties: this.state.propertyResults
                    }
                }} />

        return (
            <div style={{ width: '100%' }}>
                <div className={classes.container} style={
                    {
                        backgroundImage: 'url("https://i.imgur.com/mZw0ElZ.png")',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }
                }>
                    <Paper
                        style={{
                            width: '60vw',
                            margin: 'auto',
                            marginTop: '20vh',
                            padding: '10px',
                            display: fields ? 'hidden' : 'block'
                        }}>
                        <div style={{transitionTimingFunction: 'linear'}}>
                            {
                                fields &&
                                <Grid container spacing={16}>
                                    <Grid item sm={12} md={4} className={classes.gridSpacing}>
                                        <TextField
                                            id="location"
                                            value={selectedLocation}
                                            select
                                            fullWidth
                                            variant="outlined"
                                            label="Location"
                                            className={classes.textField}
                                            SelectProps={{
                                                MenuProps: {
                                                    className: classes.menu,
                                                },
                                            }}
                                            onChange={this.handleSelect}
                                            margin="normal"
                                        > {this.state.locations &&
                                            this.state.locations.map(l => {
                                                return <MenuItem key={l.value} value={l.value}>
                                                    {l.label}
                                                </MenuItem>
                                            })
                                            }
                                        </TextField>
                                    </Grid>
                                    <Grid item sm={12} md={4} className={classes.gridSpacing}>
                                        <TextField
                                            id="num-wash"
                                            label="Num Washrooms"
                                            fullWidth
                                            variant="outlined"
                                            value={this.state.values.numWashrooms}
                                            onChange={e => { this.updateFields('numWashrooms', e.target.value) }}
                                            className={classes.textField}
                                            margin="normal"
                                        ></TextField>
                                    </Grid>
                                    <Grid item sm={12} md={4} className={classes.gridSpacing}>
                                        <TextField
                                            id="num-bed"
                                            label="Num Bedrooms"
                                            fullWidth
                                            variant="outlined"
                                            value={this.state.values.numBedrooms}
                                            onChange={e => { this.updateFields('numBedrooms', e.target.value) }}
                                            className={classes.textField}
                                            margin="normal"
                                        ></TextField>
                                    </Grid>
                                    <Grid item sm={12} md={4} className={classes.gridSpacing}>
                                        <TextField
                                            id="num-other"
                                            label="Num Other Rooms"
                                            fullWidth
                                            variant="outlined"
                                            value={this.state.values.numOtherRooms}
                                            onChange={e => { this.updateFields('numOtherRooms', e.target.value) }}
                                            className={classes.textField}
                                            margin="normal"
                                        ></TextField>
                                    </Grid>
                                    <Grid item sm={12} md={4} className={classes.gridSpacing}>
                                        <TextField
                                            id="min-p"
                                            label="Min Rent ($)"
                                            fullWidth
                                            variant="outlined"
                                            value={this.state.values.minRent}
                                            onChange={e => { this.updateFields('minRent', e.target.value) }}
                                            className={classes.textField}
                                            margin="normal"
                                        ></TextField>
                                    </Grid>
                                    <Grid item sm={12} md={4} className={classes.gridSpacing}>
                                        <TextField
                                            id="max-p"
                                            label="Max Rent ($)"
                                            fullWidth
                                            variant="outlined"
                                            value={this.state.values.maxRent}
                                            onChange={e => { this.updateFields('maxRent', e.target.value) }}
                                            className={classes.textField}
                                            margin="normal"
                                        ></TextField>
                                    </Grid>
                                    <Grid item sm={12} md={12} className={classes.gridSpacing}>
                                        <Typography>
                                            Only numbers and decimals allowed
                                    </Typography>
                                    </Grid>
                                </Grid>
                            }
                        </div>
                        <Button color="primary"
                            style={{ margin: '10px 0px' }}
                            variant="contained"
                            fullWidth
                            onClick={e => { e.preventDefault(); this.search() }}
                            fullWidth>
                            {
                                selectedLocation || Object.keys(this.state.values).map(v => typeof (this.state.values[v])).includes('string') ?
                                    'Search' :
                                    'Get all properties!'
                            }
                        </Button>

                        <Button color="secondary"
                            style={{ marginTop: '10px' }}
                            fullWidth
                            onClick={this.toggleFields}
                            fullWidth>
                            {
                                fields ?
                                    'Hide' :
                                    'Show options'
                            }
                        </Button>
                    </Paper>
                </div>
            </div>
        )

    }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);
