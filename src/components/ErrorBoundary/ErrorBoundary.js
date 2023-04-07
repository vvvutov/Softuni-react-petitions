import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ErrorBoundary = (props) => {

    const handleError = (error, errorInfo) => {
        console.error(error, errorInfo);
        toast.error('Възникна грешка. Моля опитайте по-късно!');
    };

    return (
        <>
            {React.Children.map(props.children, (child) => {
                return React.cloneElement(child, {
                    onError: handleError,
                });
            })}
        </>
    );
};

