import React from 'react'
import ReactDOM from 'react-dom'
import SnackbarProvider from '../../src/SnackbarProvider'
import Example from './Example'

ReactDOM.render(
    <SnackbarProvider maxSnack={2} anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
    }}>
        <Example />
    </SnackbarProvider>,
    document.getElementById('root')
)