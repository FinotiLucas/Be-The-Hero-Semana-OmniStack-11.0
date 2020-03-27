import React from 'react';
import './styles.css'

import {Link} from 'react-router-dom'


export default function BackLink({children ,...props}) {
    return (
        <Link {...props} className="back-link">
            {children}
        </Link>
    );
  }
