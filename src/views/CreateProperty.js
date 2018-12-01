import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Button } from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';

class CreateProperty extends Component {

    constructor() {
        super()
        this.state = { files: [] }
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

    onSubmit = () => {
        console.log('heu',  this.state.files)
        var base64Arr = [];
        this.state.files.forEach(f => {
            this.getBase64(f, res => {
                base64Arr.push(res);
                if (base64Arr.length === 5)
                    console.log(base64Arr)
            })
        });
    }

    render() {

        return (
            <div>
                <Dropzone
                    onDrop={this.onDrop.bind(this)}
                    onFileDialogCancel={this.onCancel.bind(this)}
                >
                    <p>Add Pictures here</p>
                </Dropzone>

                <List>
                    {this.state.files.map((f, i) => {
                        return <ListItem button key={i}>
                            <ListItemText>
                                {f.name}
                            </ListItemText>
                            <ListItemSecondaryAction>
                                <IconButton>
                                    <CloseIcon onClick={() => console.log('dosomething')} />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    })}
                </List>

                <Button onClick={this.onSubmit}>
                    DELETE ME
                </Button>

            </div>
        )
    }

}
export default CreateProperty;
