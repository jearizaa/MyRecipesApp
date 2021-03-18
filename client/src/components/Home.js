import React from 'react';
import {Link} from 'react-router-dom'
import './Home.css';

export function Home() {
  return (
    <div className='container'>
        <Link to='/recipes'>
          <button className='homeButton'>Henry Food</button>
        </Link>       
    </div>
  )
};

export default Home;