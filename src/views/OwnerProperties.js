import { Card, CardContent, CardMedia, Grid, Typography, Fab, Tooltip, Button, InputLabel, MenuItem, Select } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import { Component, default as React } from 'react';
import 'react-image-gallery/styles/css/image-gallery.css';
import Fetcher from '../helpers/fetcher';
import { Redirect } from 'react-router-dom';

const styles = theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'column',
    },
    ptyCard: {
        margin: '10px',
        display: 'flex',
        width: '80%'
    },
    details: {
        display: 'block',
        width: '100%',
    },
    cardImg: {
        width: '100px',
        height: '100px'
    },
    actionButton: {
        margin: '0px 5px'
    }
});

class OwnerProperties extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: 'NO_MESSAGE',
            properties: [],
            startCursor: 0,
            numVisible: 25,
            messageType: '',
            toUpdatePage: false,
            propertyToUpdate: null,
            sortBy: ''
        }

        this.refreshProperties = this.refreshProperties.bind(this);
        this.onLoadMore = this.onLoadMore.bind(this);
        this.onLoadLess = this.onLoadLess.bind(this);
    }

    componentDidMount() {
        this.refreshProperties()
    }

    refreshProperties() {
        Fetcher.getOwnerProperties().then(res => {
            if (res.error || res.err) {
                this.setState({
                    message: res.error.message
                })
                return;
            } else if (res.length === 0) {
                this.setState({
                    message: "You have no listed properties."
                })
            }
            this.setState({ properties: res });
        });
    }
    deleteProperty = pid => {
        Fetcher.deleteProperty(pid)
            .then(res => {

                console.log('res', res)

                if (res.error || res.err)
                    this.setState({
                        messageType: 'ERROR',
                        message: res.message
                    })
                else
                    this.setState({
                        messageType: 'SUCCESS',
                        message: res.message
                    })

                this.refreshProperties();

                setTimeout(() => {
                    this.setState({
                        message: 'NO_MESSAGE'
                    })
                }, 3000)

            })
    }
    updateProperty(p) {
        this.setState({ toUpdatePage: true, propertyToUpdate: p })
    }
    onLoadMore() {
        this.setState({
            startCursor: this.state.startCursor + 25,
            numVisible: this.state.numVisible + 25
        });
    }
    onLoadLess() {
        this.setState({
            startCursor: this.state.startCursor - 25,
            numVisible: this.state.numVisible - 25
        });
    }
    // onLoadMore(){
    //   this.setState({ numVisible: this.state.numVisible + 5 });
    // }

    sortProperties = (e) => {
        var key = '';
        var newProperties = this.state.properties;

        if (e.target.value.includes('_A')) {
            key = e.target.value.replace('_A', '')
            newProperties.sort((a, b) => b[key] - a[key]);
        }
        else {
            key = e.target.value.replace('_D', '')
            newProperties.sort((a, b) => a[key] - b[key]);
        }
        this.setState({
            properties: newProperties
        })
    }

    render() {
        const { classes } = this.props;

        if (this.state.toUpdatePage)
            return <Redirect push to={{
                pathname: '/update_property',
                state: this.state.propertyToUpdate
            }} />

        return (
            <div style={{
                width: '100%',
                height: '200em',
                background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)'
            }}>
                <div className={classes.container}>

                    <Grid container spacing={0} style={{ marginTop: '1.5em', marginBottom: '1.5em', width: '100%', justifyContent: 'center' }}>
                        <Grid item md={2}>
                        </Grid>
                        <Grid item md={4}>
                            <Typography variant='h3' style={{ fontWeight: '100', marginLeft: '-3.3em', color: '#fff' }}>
                                Owned Properties
                          </Typography>
                        </Grid>
                        <Grid item md={2}>
                            <Typography variant='p' style={{ color: '#fff' }}>
                                Sort By:
                            </Typography>
                            <Select
                                variant='filled'
                                value={this.state.sortBy}
                                onChange={this.sortProperties}
                                inputProps={{
                                    name: 'age',
                                    id: 'age-simple',
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'rent_D'}>Rent (Low to High)</MenuItem>
                                <MenuItem value={'rent_A'}>Rent (High to Low)</MenuItem>
                                <MenuItem value={'numBedrooms_D'}>Bedrooms (Low to High)</MenuItem>
                                <MenuItem value={'numBedrooms_A'}>Bedrooms (High to Low)</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item md={1}>
                            {
                                this.state.message !== 'NO_MESSAGE' &&
                                <Card style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'absolute'
                                }}>
                                    <CardContent>
                                        <Typography>
                                            <b>{this.state.message}</b>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            }
                        </Grid>
                    </Grid>

                    {this.state.properties.slice(this.state.startCursor, this.state.numVisible).map((p, i) => (
                        <Card key={i} className={classes.ptyCard} >
                            <CardMedia className={classes.cardImg} image={p.images[0]} />
                            <div className={classes.details}>
                                <CardContent>
                                    <Grid container spacing={0}>
                                        <Grid item md={3}>
                                            <Typography>
                                                <b>Address</b>: {p.address}
                                            </Typography>
                                            <Typography>
                                                <b>Location</b>: {p.location}
                                            </Typography>
                                        </Grid>
                                        <Grid item md={3}>
                                            <Typography>
                                                <b>Rent</b>: ${p.rent}
                                            </Typography>
                                            <Typography>
                                                <b>Availabile</b>: {p.isAvailable ? "Yes" : "No"}
                                            </Typography>
                                        </Grid>
                                        <Grid item md={3}>
                                            <Typography>
                                                <b>Bedroom(s)</b>: {p.numBedrooms}
                                            </Typography>
                                            <Typography>
                                                <b>Washroom(s)</b>: {p.numWashrooms}
                                            </Typography>
                                            <Typography>
                                                <b>Other Room(s)</b>: {p.numOtherRooms}
                                            </Typography>
                                        </Grid>
                                        <Grid item md={3} style={
                                            {
                                                display: 'flex',
                                                alignContent: 'flex-end',
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                justifyContent: 'center'
                                            }
                                        }>
                                            <Tooltip title='Edit Property Data'>
                                                <Fab
                                                    onClick={() => this.updateProperty(p)}
                                                    color='primary'
                                                    size='small'>
                                                    <EditIcon />
                                                </Fab>
                                            </Tooltip>
                                            <Tooltip title='Delete Property'>
                                                <Fab
                                                    style={{ marginLeft: '10px' }}
                                                    onClick={() => this.deleteProperty(p._id)}
                                                    color='secondary'
                                                    size='small'>
                                                    <DeleteIcon />
                                                </Fab>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </div>
                        </Card>
                    ))
                    }
                    <Grid container spacing={0} style={{}}>
                        <Grid item md={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {/*{
                          this.state.startCursor > 1 ?
                          <Button style={{ marginTop: '1.5em', marginBottom: '1.5em', color: 'grey' }} type='button' onClick={this.onLoadLess}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/></svg>
                          </Button> : <div style={{ marginTop: '1.5em'}}></div>
                        }*/}
                            <Button disabled={!(this.state.startCursor > 1)} style={{ marginTop: '1.5em', marginBottom: '1.5em', marginRight: '1.5em', color: 'grey' }} type='button' onClick={this.onLoadLess}>
                                <p style={!(this.state.startCursor > 1) ? { color: 'grey' } : { color: '#fff' }}>Prev</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#000" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" /></svg>
                            </Button>
                            <p style={{ color: 'green' }}>
                                {this.state.startCursor + 1} - {this.state.numVisible} of {this.state.properties.length}
                            </p>
                            {/*{(this.state.numVisible >= this.state.properties.length) ?
                          <div style={{ marginTop: '1.5em'}}></div> :
                          <Button style={{ marginTop: '1.5em', marginBottom: '1.5em', marginLeft: '1.5em', color: 'grey' }} type='button' onClick={this.onLoadMore}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#000" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/></svg>
                            <p style={(this.state.numVisible >= this.state.properties.length) ? {color: 'grey'} : {color: 'blue'} }>Next</p>
                          </Button>
                        }*/}
                            <Button disabled={this.state.numVisible >= this.state.properties.length} style={{ marginTop: '1.5em', marginBottom: '1.5em', marginLeft: '1.5em', color: 'grey' }} type='button' onClick={this.onLoadMore}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#000" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" /></svg>
                                <p style={(this.state.numVisible >= this.state.properties.length) ? { color: 'grey' } : { color: '#fff' }}>Next</p>
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

OwnerProperties.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OwnerProperties);
