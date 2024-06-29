import React from 'react';
import Navbar from "../Navbar/Navbar";
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";

const Header = () => {
  return (
    <div className='holder'>
        <header className='header'>
            <Navbar />
            <div className='header-content flex flex-c text-center text-Black'>
                <h2 className='header-title text-capitalize'>Immerse Your Self in a great adventure</h2><br />
                <p className='header-text fs-24 fw-5'>Look for a book and dive in</p>
                <SearchForm />
            </div>
        </header>
    </div>
  )
}

export default Header