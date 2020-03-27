import React from 'react';
import './styles.css'

export default function Input({ children, ...props}) {
  return (
    <input {...props}
      placeholder={children}
    />
  );
}

export function TextArea({ children, ...props }) {
  return (
    <textarea {...props}
      placeholder={children}
    >

    </textarea>
  );
}
