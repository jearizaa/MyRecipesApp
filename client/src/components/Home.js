import React from 'react';
import {Link} from 'react-router-dom'

export function Home() {
  return (
    <div>
        <Link to='/recipes'>
            <button>Henry Food</button>
        </Link>
    </div>
  )
};

export default Home;