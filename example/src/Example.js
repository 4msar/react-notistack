import React, { useState } from 'react';
import { useSnackbar } from '../../src'

const messages = ['Sample notification.', 'Example of Toast.', 'Snackbar is awesome', 'Alert for web', 'Welcome to JS.'];
const variants = ['default', 'success', 'error', 'info', 'warning'];
const body = ['This is the snackbar body!', null];
const hide = [Math.round(Math.random() * (10000 - 3000) + 3000), null];

const vertical = ['top', 'bottom']
const horizontal = ['center', 'right', 'left']

function Example() {
    const { enqueueSnackbar } = useSnackbar()
    const [config, setConfig] = useState()

    const handleClick = () => {
        const newConfig = {
            body: body[Math.round(Math.random() * 1)],
            variant: variants[Math.round(Math.random() * 4)],
            hide: hide[Math.round(Math.random() * 1)],
            anchorOrigin: {
                vertical: vertical[Math.round(Math.random() * 1)],
                horizontal: horizontal[Math.round(Math.random() * 2)],
            }
        };
        setConfig(newConfig);
        enqueueSnackbar(messages[Math.round(Math.random() * 4)], newConfig)
    }
    return (
        <div style={{
            display: 'grid',
            placeContent: 'center',
            height: '100vh'
        }}>
            <div className="action">
                <button style={{
                    border: 'none',
                    padding: 10,
                    backgroundColor: '#4c535a',
                    border: 0,
                    color: '#fff',
                    borderRadius: 5
                }} onClick={handleClick}>Show Toast</button>
            </div>
        </div>
    );
}
export default Example;