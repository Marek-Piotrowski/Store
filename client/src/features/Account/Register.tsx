
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { Alert, AlertTitle, List, ListItem, ListItemText, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import agent from '../../app/api/agent';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../../app/store/configureStore';
import { signInUser } from './AccountSlice';
import { useState } from 'react';
import { toast } from 'react-toastify';


//const theme = createTheme();

export default function Register() {
    const navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState([]);
    const {register, handleSubmit, setError, formState: {isSubmitting, errors, isValid}} = useForm({
        mode: "all"
    })

    function handleApiErrors(errors: any){
      if(errors){
        errors.forEach((error: string) => {
          if(error.includes("Password")){
            setError("password", {message: error})
          }
          else if(error.includes("Email")){
            setError("email", {message: error})
          }
          else if(error.includes("Username")){
            setError("username", {message: error})
          }
        } )
      }
    }

  return (

      <Container component={Paper} maxWidth="sm" sx={{display: "flex", flexDirection: "column", alignItems: "center", p: 4}}>

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form"
          onSubmit={handleSubmit((data)=> agent.Account
            .register(data)
            .then(()=>{
              toast.success("Registration successful");
              navigate("/login");
            })
            .catch(error => handleApiErrors(error)))}
          noValidate
          sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Username"
              autoFocus
              {...register("username", {required: "Username is required"})}
              error={!!errors.username}
              helperText={errors?.username?.message}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Email address"
              {...register("email",
               {required: "Email is required",
                pattern: {
                  value: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
                  message: "Not a valid email"
                }
              }
               )}
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
            <TextField
              margin="normal"

              fullWidth
            //   name="password"
              label="Password"
              type="password"
              {...register("password",{
                required: "Password is required",
                pattern: {
                  value: /^.{4,8}$/, // regexLib
                  message: "Not a valid password"
                }
              })}
              error={!!errors.password}
              helperText={errors?.password?.message}
            //   onChange={handleInputChange}
            //   value={values.password}
            />

            <LoadingButton
              loading={isSubmitting}
              disabled={!isValid}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </LoadingButton>
            <Grid container>

              <Grid item>
                <Link to="/login">
                  {"Already got an account? Login in"}
                </Link>
              </Grid>
            </Grid>
          </Box>

      </Container>

  );
}


