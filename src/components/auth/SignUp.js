import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { Button, Container, Stack, Typography, TextField, Box, TextareaAutosize, InputLabel, Select, MenuItem, FormLabel, FormControl, Card, CardContent, Chip, FormControlLabel, IconButton } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { registerUser } from '../../managers/AuthManager';
import { useRef, useState, useEffect } from 'react'
import { getSchoolsForRegister } from '../../managers/SchoolManager';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Scholar Squad
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const defaultTheme = createTheme();

export const SignUp = ({ setToken }) => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();
  const grade = useRef()
  const school = useRef(1);
  const verifyPassword = useRef();
  const passwordDialog = useRef();
  const account_type = useRef(1);
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);


const handleRegister = (event) => {
    event.preventDefault();

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        school: school.current.value,
        account_type: account_type.current.value,
        grade: grade.current.value
      };

      registerUser(newUser).then((response) => {
        if (response.token) {
          setToken('')
          navigate("/");
        }
      });
    } else {
      passwordDialog.current.showModal();
    }
  };

  useEffect(() => {
    getSchoolsForRegister().then((data) => {
      setSchools(data);
    });
  }, []);


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleRegister} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  inputRef={firstName}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  inputRef={lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  inputRef={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  inputRef={password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="verify-password"
                  label="Verify Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  inputRef={verifyPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="grade"
                  label="Grade"
                  type="number"
                  inputRef={grade}
                />
              </Grid>
              <InputLabel>School</InputLabel>
              <Select
              size="small"
              fullWidth
              id="school-select"
              inputRef={school}>
                {schools.map((school) => {
                    return (
                <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
                    )
                })}
              </Select>
              <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
              <Select id="account-type"
              inputRef={account_type}
              fullWidth>
                <MenuItem key={1} value={'teacher'}>{"Teacher"}
                </MenuItem>
                <MenuItem key={2} value={'student'}>{"Student"}
                </MenuItem>
              </Select>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}