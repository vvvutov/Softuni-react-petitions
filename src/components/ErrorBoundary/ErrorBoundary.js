import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ErrorBoundary = (props) => {

    const handleError = (error, errorInfo) => {
        console.error(error, errorInfo);
        toast.error('An error has occurred. Please try again later.');
    };

    const handleApiError = (error) => {
        console.error(error);
        toast.error('An error has occurred while making a request to the server.');
    };

    return (
        <>
            {React.Children.map(props.children, (child) => {
                return React.cloneElement(child, {
                    onError: handleError,
                    onApiError: handleApiError,
                });
            })}
        </>
    );
};
export default ErrorBoundary;