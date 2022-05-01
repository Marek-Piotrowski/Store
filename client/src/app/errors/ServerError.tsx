import { Container, Paper, Typography } from '@mui/material'
import React from 'react'

export default function ServerError() {
  return (
    <Container component={Paper}>
        <Typography variant='h5' gutterBottom>
            Server Error
        </Typography>
    </Container>
  )
}

