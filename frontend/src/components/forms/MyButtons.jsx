import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function MyButtons(props) {
    const { label,type } = props
  return (
    
      <Button type={type} className={"myForm"} variant="contained">{label}</Button>
    
  );
}
