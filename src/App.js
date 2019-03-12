import React, { Component } from 'react';


import './App.css';
import '@material/elevation/dist/mdc.elevation.css';
import '@material/fab/dist/mdc.fab.css';
import '@material/dialog/dist/mdc.dialog.css';
import '@material/textfield/dist/mdc.textfield.css';
import '@material/floating-label/dist/mdc.floating-label.css';
import '@material/snackbar/dist/mdc.snackbar.css';

import { Elevation } from '@rmwc/elevation';
import { Fab } from '@rmwc/fab';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton
} from '@rmwc/dialog';
import {
  Card,
  CardPrimaryAction,

} from '@rmwc/card';
import { TextField } from '@rmwc/textfield';

import { Typography } from '@rmwc/typography';
import { Snackbar, SnackbarAction } from '@rmwc/snackbar';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      elevation: 16,
      standardDialogOpen: false,
      imageUrl: '',
      title: '',
      feed: [],
      snackbarIsOpen: false,
      snackbarMessage: ''
    };

    this.handleImageUrlChange = this.handleImageUrlChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
  }

  handleImageUrlChange(event) {
    this.setState({imageUrl: event.target.value});
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  onModalClose(evt) {
    let state = this.state;
    state.snackbarMessage = 'Unable to add to feed, Please Try Again!';
    if(evt.detail.action === 'accept' && this.state.imageUrl.length > 0 && this.state.title.length > 0) {
      let newFeed = {
        url: this.state.imageUrl,
        title: this.state.title
      };
      state.feed.push(newFeed);
      state.snackbarMessage = 'New Feed Added Successfully.';
    }
    state.imageUrl = '';
    state.title = '';
    state.standardDialogOpen = false;
    if(evt.detail.action === 'accept') {
      state.snackbarIsOpen = true;
    }

    this.setState(state)
  }

  render() {
    return (
      <div className="App">
        <Fab className="fab" icon="+" onClick={evt => this.setState({standardDialogOpen: true}) } />
        <Snackbar
          open={this.state.snackbarIsOpen}
          onClose={evt => this.setState({snackbarIsOpen: false})}
          message={this.state.snackbarMessage}
          action={
            <SnackbarAction
              label="Dismiss"
              onClick={() => console.log('Click Me')}
            />}
        />
        <Dialog
          open={this.state.standardDialogOpen}
          onClose={this.onModalClose}
        >
          <DialogTitle>Add New Feed</DialogTitle>
          <DialogContent>
            <TextField fullwidth placeholder="Image Url" value={this.state.imageUrl} onChange={this.handleImageUrlChange} />
            <TextField fullwidth placeholder="Title" value={this.state.title} onChange={this.handleTitleChange} />
          </DialogContent>
          <DialogActions>
            <DialogButton action="close">Cancel</DialogButton>
            <DialogButton action="accept" isDefaultAction>Sweet!</DialogButton>
          </DialogActions>
        </Dialog>
        <Elevation
          className="main-container"
          z={this.state.elevation || 0}
          transition
          onMouseOver={() => this.setState({elevation: 24})}
          onMouseOut={() => this.setState({elevation: 0})}
        >
          {this.state.feed.map((val, i) => (
            <Card style={{ width: '90%', backgroundColor: 'yellow', margin: '10px', display: 'inline-block' }} key={i}>
              <CardPrimaryAction>
                <div>
                  <img alt={val.title} className="image-class" src={val.url} />
                </div>
                <div style={{ padding: '0 1rem 1rem 1rem' }}>
                  <Typography use="headline6" tag="h2">
                    {val.title}
                  </Typography>
                </div>
              </CardPrimaryAction>
            </Card>
          ))}

        </Elevation>

      </div>
    );
  }
}

export default App;
