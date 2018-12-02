import { Card, CardContent, CardMedia, Grid, Typography, Fab, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { Component, default as React } from 'react';
import 'react-image-gallery/styles/css/image-gallery.css';
import Fetcher from '../helpers/fetcher';

const styles = theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'column',
        marginTop: '4em',
        height: 'calc(100%-4em)'
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

class VistiingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            visitingListItems: []
        }
    }

    componentDidMount() {
        Fetcher.getVL()
            .then(res => {
                if (res.message) {
                    this.setState({
                        message: res.message + ' Go look for some properties!'
                    })
                    return;
                }
                this.setState({ visitingListItems: res.list });
            });
    }



    render() {

        const { classes } = this.props;

        return (
            <div style={{ width: '100%' }}>
                <div className={classes.container}>
                    {
                        this.state.visitingListItems.length === 0 &&
                        <Card style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '4em',
                            position: 'absolute'
                        }}>
                            <div className={classes.details}>
                                <CardContent>
                                    <Typography>
                                        {this.state.message}
                                    </Typography>
                                </CardContent>
                            </div>
                        </Card>
                    }
                    {
                        this.state.visitingListItems.map((v, i) => (
                            <Card className={classes.ptyCard} >
                                <CardMedia className={classes.cardImg} image={v.images[0]} />
                                <div className={classes.details}>
                                    <CardContent>
                                        <Grid container spacing={0}>
                                            <Grid item md={3}>
                                                <Typography>
                                                    <b>Address</b>: {v.address}
                                                </Typography>
                                                <Typography>
                                                    <b>Location</b>: {v.location}
                                                </Typography>
                                            </Grid>
                                            <Grid item md={3}>
                                                <Typography>
                                                    <b>Rent</b>: ${v.rent}
                                                </Typography>
                                                <Typography>
                                                    <b>Bedroom(s)</b>: {v.numBedrooms}
                                                </Typography>
                                            </Grid>
                                            <Grid item md={3}>
                                                <Typography>
                                                    <b>Washroom(s)</b>: {v.numWashrooms}
                                                </Typography>
                                                <Typography>
                                                    <b>Other Room(s)</b>: {v.numOtherRooms}
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
                                                <Tooltip title='Remove from visiting list'>
                                                    <Fab
                                                        onClick={() => this.remove}
                                                        color='primary'
                                                        size='small'>
                                                        <CloseIcon />
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

VistiingList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VistiingList);
