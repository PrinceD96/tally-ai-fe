import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// action goes here

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'center'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '20%'
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
        marginTop: '2%',
        marginBottom: '6%',
        width: '15%'
    },
    input: {
        display: 'none',
    },
}));

function Registration(props) {
    const classes = useStyles();
    const [userCredentials, setCredentials] = useState ({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        company: "",
        city: "",
        state: "",
        zip: "",
    });

        useEffect(() => {
            if(props.loggedUser > 0){
                props.history.push('/home')
            }
        }, []);

    const submitHandler = event => {
        event.preventDefault();
        console.log(userCredentials);
        props.addUser(userCredentials)  //action goes here
    }

    const changeHandler = event => {
        setCredentials({ ...userCredentials, [event.target.name]: event.target.value })
    }

    return (
        <div>
            <h1>Register</h1>
            <form className ={classes.container} onSubmit={submitHandler}>
            
            <TextField
                label="First Name"
                type="text"
                name="first_name"
                className={classes.textField}
                value={userCredentials.first_name}
                onChange={changeHandler}
                placeholder="First Name"
                required
                variant="outlined"
                margine="normal"
                />
            <TextField
                label="Last Name"
                type="text"
                name="last_name"
                className={classes.textField}
                value={userCredentials.last_name}
                onChange={changeHandler}
                placeholder="Last Name"
                required
                variant="outlined"
                margin="normal"
                />
            <TextField
                label="Email"
                type="email"
                name="email"
                className={classes.textField}
                value={userCredentials.email}
                onChange={changeHandler}
                placeholder="Email"
                required
                variant="outlined"
                margin="normal"
                />
            <TextField
                label="Company"
                type="text"
                name="company"
                className={classes.textField}
                value={userCredentials.company}
                onChange={changeHandler}
                placeholder="Company"
                required
                variant="outlined"
                margin="normal"
                />
            <TextField
                label="City"
                type="text"
                name="city"
                className={classes.textField}
                value={userCredentials.city}
                onChange={changeHandler}
                placeholder="City"
                required
                variant="outlined"
                margin="normal"
                />
            <TextField
                label="State"
                type="text"
                name="state"
                className={classes.textField}
                value={userCredentials.state}
                onChange={changeHandler}
                placeholder="State"
                required
                variant="outlined"
                margin="normal"
                />
            <TextField
                type="number"
                name="zip"
                className={classes.textField}
                value={userCredentials.zip}
                onChange={changeHandler}
                placeholder="Zip"
                required
                variant="outlined"
                margin="normal"
                />
            <TextField
                type="password"
                name="password"
                className={classes.textField}
                value={userCredentials.password}
                onChange={changeHandler}
                placeholder="Password"
                required
                variant="outlined"
                margin="normal"
                />

                <Button className={classes.button} variant="outlined" color="black" type="submit">Register</Button>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isFetching: state.isFetching,
        error: state.error,
        loggedUser: state.loggedUser
    };
};

export default connect(
    mapStateToProps,
    { }  //action goes here
)(Registration)

