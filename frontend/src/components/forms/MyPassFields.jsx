import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import '../../App.css'
import { FormHelperText } from '@mui/material';
import {Controller} from 'react-hook-form'


export default function MyPassFields(props) {
    const [showPassword, setShowPassword] = React.useState(false);
    const { label,name,control } = props

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    return (
 
      <>
          <Controller
              name={name}
              control={control}
              render={({
                  field: { onChange, value },
                  fieldState: { error },
                  formState,

              }) => (
                <FormControl sx={{ m: 1, width: '80%' }} variant="standard" id={'passField'} className={"myForm"}>
          <InputLabel htmlFor="standard-adornment-password">{label}</InputLabel>
          <Input
                    id="standard-adornment-password"
                    onChange={onChange}
                    value={value}
                    error={!!error}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
                    label={label}
                    
                  />
                  
                  <FormHelperText sx={{ color: '#d32f2f' }}>{error?.message}</FormHelperText>
        </FormControl>
              )
              
              }





      />
      
      
          </>
        
 
  );
}
