import { Card, CardContent, CardMedia, Grid, Typography, Fab, Tooltip } from '@material-ui/core';
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
            messageType: '',
            toUpdatePage: false,
            propertyToUpdate: null
        }
    }


    componentDidMount() {
        this.refreshProperties()
    }

    refreshProperties = () => {
        Fetcher.getOwnerProperties()
            .then(res => {
                if (res.error || res.err) {
                    this.setState({
                        message: res.error.message
                    })
                    return;
                }
                else if (res.length === 0) {
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
    render() {

        const { classes } = this.props;
        if (this.state.toUpdatePage)
            return <Redirect push to={{ 
                pathname: '/update_property', 
                state: this.state.propertyToUpdate
             }} />

        return (
            <div style={{ width: '100%' }}>
                <div className={classes.container}>

                    <Grid container spacing={0} style={{ marginTop: '10px' }}>
                        {/* FIX SPACING */}
                        <Grid item md={2}>
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
                        <Grid item md={1}>
                        </Grid>
                        <Grid item md={3}>
                            <Typography variant='display3'>
                                Your Listings
                            </Typography>
                        </Grid>
                    </Grid>

                    {
                        this.state.properties.map((p, i) => (
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
                                                    <b>Availability</b>: {JSON.stringify(p.isAvailable)}
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

                </div>
            </div>
        )
    }
}

OwnerProperties.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OwnerProperties);
