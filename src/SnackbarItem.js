import React from 'react';
import { useCallback, useEffect, useRef, useState } from "react";
import { Timer } from './helpers';
import * as icons from './icons';

function SnackbarItem({ snack, onClose }) {
    const itemRef = useRef();
    const [timer, setTimer] = useState(null);
    const [show, toggleShow] = useState(false);
    const {
        key,
        open,
        onClick,
        variant,
        subTitle,
        body,
        message,
        autoHideDuration,
        template
    } = snack;

    const handleClose = useCallback(() => {
        toggleShow(false);
        setTimeout(() => {
            typeof (onClose) === 'function' && onClose(key)
        }, 500)
    }, [key, onClose])

    const clickable = typeof (onClick) === 'function';
    const handleItemClick = () => {
        clickable && onClick(snack)
        handleClose()
    }

    useEffect(() => {
        if (itemRef.current) {
            itemRef.current.style.display = open ? "inherit" : "none"
        }
        setTimeout(() => {
            toggleShow(open)
        }, 300);
    }, [open, snack])

    useEffect(() => {
        if (autoHideDuration) {
            setTimer(new Timer(() => {
                handleClose()
            }, autoHideDuration));
        }
    }, [autoHideDuration, handleClose])

    const Icon = () => icons[variant] ?? <img src={"/favicon.ico"} className="icon" alt="Icon" />;

    const snackbarClassName = ['snack', 'fade-in', `snack-${variant || 'default'}`];
    if (clickable) { snackbarClassName.push('clickable') }
    if (show) { snackbarClassName.push('show') }
    if (!body) { snackbarClassName.push('no-body') }

    const defaultTemplate = (
        <>
            <div className="snack-header">
                <Icon />
                <strong>{message}</strong>
                {subTitle && <small>{subTitle}</small>}
                <button onClick={handleClose} type="button" className="close-btn" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            {body && <div className="snack-body">{body}</div>}
        </>
    )

    return (
        <div className='snackbar' ref={itemRef}>
            <div
                onMouseOver={() => timer && timer.pause()}
                onMouseLeave={() => timer && timer.resume()}
                onClick={handleItemClick}
                className={snackbarClassName.join(' ')}
                role="alert" aria-live="assertive" aria-atomic="true">
                {template ? template : defaultTemplate}
            </div>
        </div >
    )
}

export default SnackbarItem
