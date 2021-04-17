import React, { useState } from 'react';
import { useSnackbar } from '../../src'
import { capitalise, isEmpty } from '../../src/helpers';
import './style.scss';


const variants = ['default', 'success', 'error', 'info', 'warning'];

const vertical = ['top', 'bottom']
const horizontal = ['center', 'right', 'left']

function Example() {
    const { enqueueSnackbar } = useSnackbar()
    const [config, setConfig] = useState({
        title: "Snackbar title",
        body: "Message body",
        subTitle: "11 min ago",
        variant: "info",
        hide: 5000,
        autoHide: true,
        preventDuplicate: false,
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
        }
    })

    const handleClick = () => {
        const { title, hide, autoHide, ...options } = config
        enqueueSnackbar(isEmpty(title) ? "Default title" : title, {
            ...options,
            hide: autoHide ? hide : null
        })
    }

    const handleChange = (name, value) => {
        let anchorOrigin = config.anchorOrigin;
        if (['vertical', 'horizontal'].includes(name)) {
            anchorOrigin = {
                ...anchorOrigin,
                [name]: value
            }
        }
        setConfig(existing => ({
            ...existing,
            [name]: value,
            anchorOrigin
        }))
    }

    return (
        <div className="example">
            <h1>React Snackbar</h1>
            <div className="flex">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" value={config.title} onChange={(event) => handleChange('title', event.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="sub-title">Sub Title</label>
                    <input type="text" id="sub-title" value={config.subTitle} onChange={(event) => handleChange('subTitle', event.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="body">Body</label>
                    <input type="text" id="body" value={config.body} onChange={(event) => handleChange('body', event.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="variant">Variant</label>
                    <select id="variant" value={config.variant} onChange={(event) => handleChange('variant', event.target.value)}>
                        {variants.map(item => <option key={item} value={item}>{capitalise(item)}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="vertical">Vertical Position</label>
                    <select id="vertical" value={config.anchorOrigin.vertical} onChange={(event) => handleChange('vertical', event.target.value)}>
                        {vertical.map(item => <option key={item} value={item}>{capitalise(item)}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="horizontal">Horizontal Position</label>
                    <select id="horizontal" value={config.anchorOrigin.horizontal} onChange={(event) => handleChange('horizontal', event.target.value)}>
                        {horizontal.map(item => <option key={item} value={item}>{capitalise(item)}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="hide">Hide <input type="checkbox" checked={config.autoHide} value={true} onChange={() => handleChange('autoHide', !config.autoHide)} /></label>
                    <input type="number" step={1000} id="hide" value={config.hide} onChange={(event) => handleChange('hide', event.target.value)} />
                </div>
                <div className="form-group" style={{ justifyContent: 'center' }}>
                    <label htmlFor="preventDuplicate"><input id="preventDuplicate" type="checkbox" checked={config.preventDuplicate} value={true} onChange={() => handleChange('preventDuplicate', !config.preventDuplicate)} /> <span style={{ marginLeft: 10 }}>Prevent Duplicate</span> </label>
                </div>
            </div>
            <div className="action">
                <button className="show-btn" onClick={handleClick}>Show Toast</button>
            </div>
        </div>
    );
}
export default Example;