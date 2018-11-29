import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import Fetcher from '../helpers/fetcher';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { Button, Typography } from '@material-ui/core';

const styles = theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
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
            values: {}
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

    showFields = () => {
        this.setState({ fields: true })
    }

    hideFields = () => {
        this.setState({ fields: false })
    }

    handleSelect = (e) => {
        this.setState({
            selectedLocation: e.target.value || " "
        })
    }

    updateFields = (name, value) => {

        var regex = /^\d+$/;
        var newValue = {};
        if (name.includes('Rent'))
            regex = /^[0-9]+([,.][0-9]+)?$/g;

        if (!regex.test(value))
            newValue[name] = ''

        newValue[name] = value;

        this.setState({
            values: {
                ...this.state.values,
                ...newValue
            }
        })
    }

    search = () => {
        var properties = [];
        var query = this.state.values;
        if (this.state.selectedLocation)
            query.location = this.state.selectedLocation;
        Fetcher.getProperties(query)
            .then(x => {
                properties = x;
            })
    }

    render() {

        const { classes } = this.props;
        const fields = this.state.fields;
        const selectedLocation = this.state.selectedLocation;

        return (
            <div className={classes.container} style={
                {
                    backgroundImage: 'url("https://i.imgur.com/mZw0ElZ.png")',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }
            }>
                <Paper
                    onFocus={() => this.showFields()}
                    style={{
                        width: '60vw',
                        margin: 'auto',
                        marginTop: '20vh',
                        padding: '10px',
                        display: fields ? 'hidden' : 'block'
                    }}>
                    <TextField
                        fullWidth
                        id="outlined-dense"
                        onChange={e => { this.updateFields('address', e.target.value) }}
                        label="Search Properties Now! (Address)"
                        className={classNames(classes.dense)}
                        variant="outlined"
                    />
                    {
                        fields &&
                        <div>
                            <Grid container spacing={16}>
                                <Grid item sm={12} md={12} className={classes.gridSpacing}>
                                    <Typography>
                                        Only numbers and decimals allowed
                                    </Typography>
                                </Grid>
                                <Grid item sm={12} md={4} className={classes.gridSpacing}>
                                    <TextField
                                        id="location"
                                        value={selectedLocation}
                                        select
                                        fullWidth
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
                                        onChange={e => { this.updateFields('numOtherRooms', e.target.value) }}
                                        className={classes.textField}
                                        margin="normal"
                                    ></TextField>
                                </Grid>
                                <Grid item sm={12} md={4} className={classes.gridSpacing}>
                                    <TextField
                                        id="min-p"
                                        label="Min Rent"
                                        fullWidth
                                        onChange={e => { this.updateFields('minRent', e.target.value) }}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        }}
                                    ></TextField>
                                </Grid>
                                <Grid item sm={12} md={4} className={classes.gridSpacing}>
                                    <TextField
                                        id="max-p"
                                        label="Max Rent"
                                        fullWidth
                                        onChange={e => { this.updateFields('maxRent', e.target.value) }}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        }}
                                    ></TextField>
                                </Grid>
                                <Grid item sm={12} md={12} className={classes.gridSpacing}>
                                    <Button color="primary"
                                        variant="contained"
                                        onClick={() => { this.search() }}
                                        fullWidth>
                                        GO
                                        </Button>
                                </Grid>
                            </Grid>
                        </div>
                    }
                </Paper>
            </div>
        )

    }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);
