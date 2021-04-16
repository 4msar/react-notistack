import { forwardRef, useContext } from 'react';
import SnackbarContext from './SnackbarContext';

export { default as SnackbarProvider } from './SnackbarProvider';

export const useSnackbar = () => useContext(SnackbarContext);

export const withSnackbar = (Component) => {
    const WrappedComponent = forwardRef((props, ref) => (
        <SnackbarContext.Consumer>
            {context => (
                <Component
                    {...props}
                    ref={ref}
                    enqueueSnackbar={context.enqueueSnackbar}
                    closeSnackbar={context.closeSnackbar}
                />
            )}
        </SnackbarContext.Consumer>
    ));
    return WrappedComponent;
};
