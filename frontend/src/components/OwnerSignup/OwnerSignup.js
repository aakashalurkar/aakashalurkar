import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Grid, Paper } from '@material-ui/core';
import Navbar from '../Navbar/navbar';
import Image from '../../login.jpeg';

import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ownerSignupDetails } from "../../actions";

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit * 13,

    direction: "column",
    justify: "space-evenly",
    alignItems: "center",
    borderTopWidth: 1, borderColor: 'black', borderStyle: 'solid', borderBottomWidth: 3,

  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },

  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 5,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});




class OwnerSignup extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      name: '',
      age: '',
      phoneno: '',
      city: '',
      password: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }
  handleClick = (e) => {
    // console.log(this.state)
    const data = {
      name: this.state.name,
      age: this.state.age,
      phoneno: this.state.phoneno,
      city: this.state.city,
      password: this.state.password,
    }

    axios.defaults.withCredentials = true;
    console.log(data);
    axios.post('http://localhost:3001/ownersignup', data)
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            authFlag: true

          })
          window.location = '/ownerlogin'
        } else {
          this.setState({
            authFlag: false
          })
        }
      });

  }

  //change
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }
  //end change

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      //  <form className={classes.container} noValidate autoComplete="off">
      <Grid container className={classes.container}>
        <Navbar />
        <Grid item xs={12}>
          <Grid
            container
            direction="column"
            justify="space-evenly"
            alignItems="center">

            <Field
            // <TextField
              id="standard-name"
              label="Username"
              className={classes.textField}
              value={this.state.name}
              name="name"
              component={this.renderField}
              onChange={this.usernameChangeHandler}
              // onChange={this.handleChange('name')}
              margin="normal"
            />
            <Field
            // <TextField
              id="standard-password-input"
              label="Password"
              className={classes.textField}
              type="password"
              value={this.state.password}
              name="password"
              component={this.renderField}
              onChange={this.usernameChangeHandler}
              // onChange={this.handleChange('password')}
              margin="normal"
            />
            <Field
            // <TextField
              id="standard-phoneno"
              label="Phone Number"
              className={classes.textField}
              value={this.state.phoneno}
              name="phoneno"
              component={this.renderField}
              onChange={this.usernameChangeHandler}
              // onChange={this.handleChange('phoneno')}
              margin="normal"
            />
            <Field
            // <TextField
              id="standard-city"
              label="City"
              className={classes.textField}
              value={this.state.city}
              name="city"
              component={this.renderField}
              onChange={this.usernameChangeHandler}
              // onChange={this.handleChange('city')}
              margin="normal"
            />
            <Field
            // <TextField
              id="standard-age"
              label="Age"
              value={this.state.age}
              name="age"
              component={this.renderField}
              // onChange={this.usernameChangeHandler}
              onChange={this.handleChange('age')}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
            <Button variant="contained" color="primary" size="medium" className={classes.button} onClick={this.handleClick}>
              Submit
      </Button>

          </Grid></Grid></Grid>
      //</form>
    );
  }



}

OwnerSignup.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default (OwnerSignup);

export default reduxForm({
  destroyOnUnmount: false,
  form: "NewOwnerCreate"
})(connect(null, { ownerSignupDetails })(withStyles(styles)(OwnerSignup)));