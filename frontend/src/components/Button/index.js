import React from 'react';
import './styles.css'


export default function ButtonComponents({ children, ...props }) {
  return (
    <button {...props} className="button" type="submit">
        {children}
    </button>
  );
}
