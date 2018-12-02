import { Card, CardContent, CardMedia, Dialog, DialogTitle, Fab, Tooltip, Grid, Typography, DialogContent, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import CollectionsIcon from '@material-ui/icons/Collections';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import Fetcher from '../helpers/fetcher';
import { Redirect } from 'react-router-dom';

const styles = theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'column',
        paddingBottom: '3em',
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

class Properties extends Component {

    constructor(props) {
        super(props);
        this.state = {
            properties: this.props.location.state.properties,
            dialogOpen: false,
            selectedProperty: {
                images: [],
                type: '',
                address: ''
            },
            message: 'NO_MESSAGE',
            messageIsError: false,
            toSearch: false
        }
    }

    componentDidMount() {
        if (this.props.location.state.properties.length === 0)
            this.setState({ message: 'No Properties Found', messageIsError: true })
    }

    handleClose = () => {
        this.setState({
            dialogOpen: false
        })
    }

    openDialog = (i, t, a) => {
        this.setState({
            dialogOpen: true,
            selectedProperty: {
                images: i,
                type: t,
                address: a
            }
        })
    }

    addToVisitingList = pid => {
        Fetcher.postAddToVL(pid)
            .then(res => {
                if (res.error || res.err)
                    this.setState({
                        message: res.message,
                        messageIsError: true
                    })
                else
                    this.setState({
                        message: "Successfully added to your visiting list",
                        messageIsError: false
                    })
            })
        setTimeout(() => {
            this.setState({
                message: "NO_MESSAGE"
            })
        }, 3000)
    }

    goToSearch = () => {
        this.setState({
            toSearch: true
        })
    }

    render() {

        const { classes } = this.props;

        if (this.state.toSearch)
            return (<Redirect push to='/search'></Redirect>)

        return (
            <div style={{ width: '100%' }}>

                <Dialog onClose={this.handleClose} open={this.state.dialogOpen}>
                    <DialogTitle id="simple-dialog-title">Images for <b>{this.state.selectedProperty.type} at {this.state.selectedProperty.address}</b> </DialogTitle>
                    <DialogContent>
                        <ImageGallery items={
                            this.state.selectedProperty.images.map(i => {
                                return {
                                    original: i,
                                    alt: i,
                                }
                            })
                        }></ImageGallery>
                    </DialogContent>
                </Dialog>

                <Grid container spacing={0} style={{ marginTop: '10px' }}>
                    <Grid item md={1}>
                    </Grid>
                    <Grid item md={1}>
                        <Button onClick={this.goToSearch}>
                            <KeyboardBackspaceIcon />
                            Back to Search
                        </Button>
                    </Grid>
                    <Grid item md={9}>
                        {
                            this.state.message !== 'NO_MESSAGE' &&
                            <Card style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute'
                            }}>
                                <CardContent>
                                    <Typography style={this.state.messageIsError ? { color: 'red' } : { color: 'green' }}>
                                        <b>{this.state.message}</b>
                                    </Typography>
                                </CardContent>
                            </Card>
                        }
                    </Grid>
                </Grid>

                <div className={classes.container}>
                    {
                        this.state.properties.map((p, i) => (
                            <Card className={classes.ptyCard} >
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
                                                    <b>Bedroom(s)</b>: {p.numBedrooms}
                                                </Typography>
                                            </Grid>
                                            <Grid item md={3}>
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
                                                <Tooltip title='View images' >
                                                    <Fab
                                                        className={classes.actionButton}
                                                        color='primary'
                                                        size='small'
                                                        onClick={() => this.openDialog(p.images, p.type, p.address)}>
                                                        <CollectionsIcon />
                                                    </Fab>
                                                </Tooltip>
                                                <Tooltip title='Add to visiting list'>
                                                    <Fab
                                                        size='small'
                                                        color='secondary'
                                                        onClick={() => this.addToVisitingList(p._id)}>
                                                        <AddIcon />
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

Properties.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Properties);
