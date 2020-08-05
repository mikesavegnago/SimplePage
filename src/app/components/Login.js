import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    TextField
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            width: 400,
            margin: `${theme.spacing(0)} auto`
        },
        loginBtn: {
            marginTop: theme.spacing(2),
            flexGrow: 1
        },
        header: {
            textAlign: 'center',
            background: '#efefef',
            color: '#666'
        },
        card: {
            marginTop: theme.spacing(10)
        }
    }),
);

function Login(props) {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [helperText, setHelperText] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (username.trim() && password.trim()) {
        setIsButtonDisabled(false);
    } else {
        setIsButtonDisabled(true);
    }
  }, [username, password]);

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
        setError(false);
        setHelperText('Logado com sucesso');
        localStorage.setItem('@simple-page/autenticated', true);
        props.history.push('/home');
    } else {
        setError(true);
        setHelperText('Usuário ou senha incorretos')
    }
  };

return (
    <React.Fragment>
        <form className={classes.container} noValidate autoComplete="off">
            <Card className={classes.card}>
                <CardHeader className={classes.header} title="Faça o Login" />
                <CardContent>
                    <div>
                    <TextField
                        error={error}
                        fullWidth
                        id="username"
                        type="email"
                        label="Usuário"
                        placeholder="Username"
                        margin="normal"
                        onChange={(e)=>setUsername(e.target.value)}
                    />
                    <TextField
                        error={error}
                        fullWidth
                        id="password"
                        type="password"
                        label="Senha"
                        placeholder="Password"
                        margin="normal"
                        helperText={helperText}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    </div>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        className={classes.loginBtn}
                        onClick={() => handleLogin()}
                        disabled={isButtonDisabled}
                    >
                    Login
                    </Button>
                </CardActions>
            </Card>
        </form>
    </React.Fragment>
  );
}

export default withRouter(Login);