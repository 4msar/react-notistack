import React, { Component } from 'react';
import { isEmpty, capitalise } from './helpers';
import SnackbarItem from './SnackbarItem';
import SnackbarContext from './SnackbarContext';
import './style.scss';

class SnackbarProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            snacks: [],
            contextValue: {
                enqueueSnackbar: this.enqueueSnackbar.bind(this),
                closeSnackbar: this.closeSnackbar.bind(this),
            },
        };
    }

    /**
     * Adds a new snackbar to the queue to be presented.
     * Returns generated or user defined key referencing the new snackbar or null
     */
    enqueueSnackbar(message, opts = {}) {
        const { children, maxSnack = 5, ...props } = this.props;
        const {
            key,
            body,
            preventDuplicate,
            variant,
            hide = null,
            onClick,
            ...options
        } = opts;

        const hasSpecifiedKey = !isEmpty(key);
        const id = hasSpecifiedKey ? (key) : new Date().getTime() + Math.random();

        const snack = {
            key: id,
            ...props,
            ...options,
            message,
            variant,
            body,
            open: true,
            onClick,
            autoHideDuration: hide,
        };

        if (options.persist) {
            snack.autoHideDuration = undefined;
        }

        if (preventDuplicate || props.preventDuplicate === true) {
            const hasItem = this.state.snacks.find(item => item.key === key || item.message === message);
            if (hasItem) {
                this.setState(state => ({
                    snacks: state.snacks.map(item => {
                        if (item.key === hasItem.key) {
                            item.open = true;
                        }
                        return item;
                    })
                }))
                return hasItem.key;
            }
        }

        if (this.state.snacks.length >= maxSnack) {
            this.setState(state => {
                const snacks = [...state.snacks]
                snacks.shift()
                return {
                    snacks: snacks.concat(snack)
                }
            })
        } else {
            this.setState(state => ({
                snacks: [snack].concat(state.snacks)
            }))
        }
        return id;
    };

    closeSnackbar(key) {
        if (key) {
            this.setState(state => ({
                snacks: state.snacks.filter(item => item.key !== key)
            }))
        } else {
            this.setState(state => ({
                snacks: []
            }))
        }
    }

    getOriginClass(origin) {
        const { vertical = "bottom", horizontal = "right" } = origin;
        return `anchorOrigin${capitalise(vertical)}${capitalise(horizontal)}`
    }

    getSnackbars() {
        if (this.state.snacks.length <= 0) { return };

        const categories = this.state.snacks.reduce((acc, current) => {
            const category = this.getOriginClass(current.anchorOrigin);
            const existingOfCategory = acc[category] || [];
            return {
                ...acc,
                [category]: [...existingOfCategory, current],
            };
        }, {});

        return Object.keys(categories).map((origin) => {
            const snacks = categories[origin];
            return (
                <div key={origin} className={['__snackbar_container', origin].join(' ')}>
                    {snacks.map(item => (
                        <SnackbarItem onClose={this.closeSnackbar.bind(this)} key={item.key} snack={item} />
                    ))}
                </div>
            )
        });

    }

    render() {
        const { contextValue } = this.state;
        const { children } = this.props;

        return (
            <SnackbarContext.Provider value={contextValue}>
                {children}
                {this.getSnackbars()}
            </SnackbarContext.Provider>
        );
    }
}

export default SnackbarProvider;