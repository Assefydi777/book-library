import React from 'react';
import "./About.css";
import aboutImg from "../../images/about-img.jpg";

const About = () => {
  return (
    <section className='about'>
      <div className='container'>
        <div className='section-title'>
          <h2>About</h2>
        </div>

        <div className='about-content grid'>
          <div className='about-img'>
            <img src = {aboutImg} alt = "" />
          </div>
          <div className='about-text'>
            <h2 className='about-title fs-26 ls-1'>About iShelf</h2>
            <p className='fs-17'>Welcome to iShelf, your ultimate destination for discovering and organizing your favorite books! Whether you're a voracious reader or just getting started, BookFinder makes it easy to find new books and keep track of your personal library. Explore our extensive database to find books that match your interests. With detailed descriptions, reviews, and recommendations, you can discover new favorites across all genres. Create a personalized database of your favorite books, easily adding them to your favorites, organizing them into custom lists, and accessing your collection anytime, anywhere. Our user-friendly interface ensures a seamless experience, allowing you to effortlessly browse, search, and manage your book collection. With BookFinder, your next great read is just a click away. Find books by title, author, genre, or keywords with our advanced search, get personalized recommendations based on your reading history and preferences, save and categorize your favorite books, read reviews from other book lovers to help you choose your next read, and create and manage custom lists to organize your book collection.</p>
            <p className='fs-17'>Join the BookFinder community today and embark on a journey of literary discovery and organization. Happy reading!</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
