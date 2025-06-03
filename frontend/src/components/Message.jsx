
import { Box } from '@mui/material'
import React from 'react'

function MyMessage({ text }) {
  return (
    <div>
          <Box sx={{backgroundColor:"#69C9AB", color:'#ffffff', width:"80%", height:"40px", position:"absolute", top:'20px',display:"flex",justifyContent:"center", alignItems:'center'}}>
              {text}
      </Box>
    </div>
  )
}

export default MyMessage
