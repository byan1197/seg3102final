
import Dropzone from 'react-dropzone';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Button, ListItemAvatar, Avatar } from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';
import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Fetcher from '../helpers/fetcher';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Grid } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },

    main: {
        height: '100vh',
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 700,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
    },
    gridItem: {
    },
    gridContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const locations = [
    {
        value: 'TORONTO, ON',
    },
    {
        value: 'OTTAWA, ON',
    },
    {
        value: 'MONTREAL, QC',
    }
];

const types = [
    {
        value: 'HOUSE',
    },
    {
        value: 'APARTMENT',
    }
];

class CreateProperty extends Component {

    constructor(props) {
        super(props)
        this.state = {
            files: [],
            error: null,
            success: null,
            location: 'TORONTO, ON',
            type: 'HOUSE',
            yo: false
        }

        this.changeState = this.changeState.bind(this);
    }



    getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    onDrop(files) {
        // TODO: ERROR CHECKING MAX 5 FILES

        var prevFiles = this.state.files;

        if (prevFiles.length === 5)
            return;
        console.log(files);
        prevFiles = prevFiles.concat(files);
        if (prevFiles > 5)
            prevFiles = prevFiles.slice(0, 5);
        this.setState({
            files: prevFiles
        });
    }

    onCancel() {
        this.setState({
            files: []
        });
    }

    onSubmit = (e) => {

        var base64Arr = [];
        var data = {
            rent: e.target.rent.value,
            numWashrooms: e.target.washroom.value,
            numBedrooms: e.target.bedroom.value,
            numOtherRooms: e.target.otherRooms.value,
            type: e.target.type.value,
            location: e.target.location.value,
            address: e.target.address.value

        }
        this.state.files.forEach(f => {
            this.getBase64(f, res => {
                base64Arr.push(res);
                if (base64Arr.length === 5) {
                    data.images = base64Arr;
                    console.log('about to make request')
                    Fetcher.addProperty(data, this.changeState)
                }
            })
        });
    }
    removeFile(i) {
        console.log("here", i);
        let files = this.state.files;
        files.splice(i, 1);
        console.log(files.length, "inside remove file");
        this.setState({ files: files });
    }
    changeState(status, msg) {

        if (status === 'success') {
            console.log("status", status, msg);
            this.setState({
                success: msg,
                error: null,
                yo: true
            })
        } else {
            this.setState({ error: msg })
        }
    }
    handleChange = name => event => {
        console.log([name]);
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const error = this.state.error;
        const successMsg = this.state.success;
        const { classes } = this.props;

        console.log('this.state.files', this.state.files)

        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <Add />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add Property
          </Typography>
                    <Typography component="p" variant="b" style={error ? { color: 'red' } : { color: 'green' }}>
                        {
                            error ?
                                error :
                                successMsg
                        }
                    </Typography>
                    <div>

                        <form className={classes.form} onSubmit={e => { e.preventDefault(); this.onSubmit(e) }}>

                            <Grid container spacing={16} className={classes.gridContainer}>
                                <Grid item md={4} className={classes.gridItem}>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="username">Address</InputLabel>
                                        <Input id="address" name="address" autoFocus />
                                    </FormControl>
                                </Grid>

                                <Grid item md={4} className={classes.gridItem}>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="username">Washrooms</InputLabel>
                                        <Input type="number" id="washroom" name="washroomNum" autoFocus />
                                    </FormControl>
                                </Grid>

                                <Grid item md={4} className={classes.gridItem}>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="username">Bedrooms</InputLabel>
                                        <Input id="bedroom" type="number" name="numBedrooms" autoFocus />
                                    </FormControl>
                                </Grid>

                                <Grid item md={4} className={classes.gridItem}>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="username">Other Rooms</InputLabel>
                                        <Input type="number" id="other" name="otherRooms" autoFocus />
                                    </FormControl>
                                </Grid>

                                <Grid item md={4} className={classes.gridItem}>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="rent">Rent</InputLabel>
                                        <Input type="number" id="rent" name="rent" autoFocus />
                                    </FormControl>
                                </Grid>

                                <Grid item md={4} className={classes.gridItem}>
                                    <TextField
                                        id="location"
                                        select
                                        className={classes.textField}
                                        value={this.state.location}
                                        onChange={this.handleChange('location')}
                                        SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                        margin="normal"
                                    >
                                        {locations.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.value}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item md={4} className={classes.gridItem}>
                                    <TextField
                                        id="type"
                                        select
                                        className={classes.textField}
                                        value={this.state.type}
                                        onChange={this.handleChange('type')}
                                        SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                        margin="normal"
                                    >
                                        {types.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.value}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item md={4} className={classes.gridItem}>

                                    <Dropzone
                                        onDrop={this.onDrop.bind(this)}
                                    // onFileDialogCancel={this.onCancel.bind(this)}
                                    >
                                        <p>Add Pictures here</p>
                                    </Dropzone>
                                </Grid>
                                <Grid item md={12} className={classes.gridItem}>
                                    <List>
                                        {this.state.files.map((f, i) => {
                                            return <ListItem button key={i}>
                                                <ListItemAvatar>
                                                    <Avatar src={URL.createObjectURL(f)} />
                                                </ListItemAvatar>
                                                <ListItemText>
                                                    {f.name}
                                                </ListItemText>
                                                <ListItemSecondaryAction>
                                                    <IconButton>
                                                        <CloseIcon onClick={() => this.removeFile(i)} />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        })}
                                    </List>
                                </Grid>
                                <Grid item md={8}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        margin='normal'
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        CREATE PROPERTY
                </Button>

                                </Grid>



                            </Grid>

                        </form>

                    </div>
                </Paper>
            </main>
        )
    }

}
export default withStyles(styles)(CreateProperty);
