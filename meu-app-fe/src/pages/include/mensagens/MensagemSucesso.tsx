import React, { useState } from 'react';

const MensagemSucesso = ({ message }) => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div
            role="alert"
            // Tailwind classes for styling (green background, padding, rounded corners, etc.)
            className="relative flex w-full p-4 text-sm text-green-700 bg-green-100 border border-green-400 rounded-lg"
        >


            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-circle m-1" viewBox="0 0 16 16">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
            </svg>

            <span className="p-0 m-1">{message}</span>
        </div>
    );
};

export default MensagemSucesso;
