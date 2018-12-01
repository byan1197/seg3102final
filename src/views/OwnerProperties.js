import { Card, CardContent, CardMedia, Grid, Typography, Fab, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
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

class OwnerProperties extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            properties: []
        }
    }


    componentDidMount() {
        Fetcher.getOwnerProperties()
            .then(res => {

                console.log('res', res)

                if (res.error || res.err) {
                    this.setState({
                        message: res.error.message
                    })
                    return;
                }
                this.setState({ properties: res });
            });
    }

    render() {

        const { classes } = this.props;

        return (
            <div style={{ width: '100%' }}>
                <div className={classes.container}>
                    {
                        this.state.properties.length === 0 &&
                        <Card style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '4em'
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
                        this.state.properties.map((p, i) => (
                            <Card className={classes.ptyCard} >
                                <CardMedia className={classes.cardImg} image='https://sofriendsofhospice.org/wp-content/uploads/2017/05/014-300x300.jpg' />
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
                                                <Tooltip title='Remove from visiting list'>
                                                    <Fab
                                                        color='primary'
                                                        size='small'>
                                                        <EditIcon />
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