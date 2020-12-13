import React, { useState, useEffect } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { 
    Button, 
    Container, 
    CssBaseline, 
    Grid, 
    Link as LinkButton, 
    makeStyles, 
    TextField, 
    ThemeProvider, 
    Typography 
} from '@material-ui/core';
import validator from 'validator'
import { amber } from '@material-ui/core/colors';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/authActions'
import { Link, useHistory } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: amber,
  },
});

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(4),
    },
    submit: {
        margin: theme.spacing(1, 0, 2),
    },
    footer: {
        marginTop: theme.spacing(4)
    },
    onAccountBtn: {
        cursor: "pointer",
    },
    container: {
        padding: theme.spacing(0, 4)
    },
    alert: {
        width: '100%',
        marginTop: theme.spacing(4)
    }
}))

export default function LoginPage() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const error = useSelector(state => state.error)
    const [ errorMessage, setErrorMessage ] = useState({ name: "", status: false})

    const authed = useSelector(state => state.auth.isAuthed)
    const history = useHistory()

    useEffect(() => {
        if (authed) {
            setEmail("")
            setPassword("")
            history.push("/")

        } else if (error.name === "LOGIN_FAIL") {
            setErrorMessage({ name: error.msg.message, status: true })
        }

    }, [error, authed, history])

    const [ emailError, setEmailError ] = useState({ name: "", status: false })

    const [ emailToAdd, setEmail ] = useState("")
    const [ passwordToAdd, setPassword ] = useState("")

    function handleSubmitLogin(event) {
        event.preventDefault()

        const logData = {
            email: emailToAdd,
            password: passwordToAdd
        }

        //  clearing prev errors
        setEmailError({ name: "", status: false})

        if (!validator.isEmail(logData.email)) {
           return setEmailError({ name: "Invalid email", status: true})
        }

        dispatch(login(logData))
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
                <Container className={classes.container} maxWidth="xs">
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>

                        { errorMessage.status && 
                            <Alert severity="error" className={classes.alert}>
                                <AlertTitle>Error</AlertTitle>
                                <strong>{errorMessage.name}</strong>
                            </Alert>
                        }

                        <form onSubmit={handleSubmitLogin} className={classes.form}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                <TextField
                                    error={emailError.status}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    helperText={emailError.name}
                                    value={emailToAdd}
                                    onChange={(e) => setEmail(e.target.value)}
                                    label="Email Address"
                                    name="email"
                                    // autoComplete="email"
                                    autoComplete="off"
                                    autoFocus
                                />
                                </Grid>

                                <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    value={passwordToAdd}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    id="password"
                                    // autoComplete="current-password"
                                    autoComplete="off"
                                />
                                </Grid>

                                <Grid item xs={12}>
                                    <Button
                                        size="large"
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        disabled={ !emailToAdd || !passwordToAdd }
                                    >
                                        Sign In
                                    </Button>
                                </Grid>
                            </Grid>

                            <Link to="/register" style={{ textDecoration: 'none' }}>
                                <LinkButton variant="body2" color="primary" className={classes.onAccountBtn}>
                                    Don't have an account? Sign Up
                                </LinkButton>
                            </Link>
                        </form>
      
                        <Typography variant="body2" color="textSecondary" align="center" className={classes.footer}>
                            {'Copyright © Mark Terris '}
                            {new Date().getFullYear()}
                            {'.'}
                        </Typography>
                    </div>
                </Container>
        </ThemeProvider>
    );
}
