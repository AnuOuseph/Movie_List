import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import Card from "../components/card/Card";

const Favorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchFavoriteMovies = () => {
      const favorites = JSON.parse(localStorage.getItem('myFavorites')) || [];
      setFavoriteMovies(favorites);
      setFilteredMovies(favorites);
    };
    fetchFavoriteMovies();
  }, []);

  useEffect(() => {
    const filterMovies = () => {
      if (searchQuery.trim() === '') {
        setFilteredMovies(favoriteMovies); 
      } else {
        const filtered = favoriteMovies.filter(movie =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredMovies(filtered);
      }
    };
    filterMovies();
  }, [searchQuery, favoriteMovies]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const updateFavorites = (favorites) => {
    setFavoriteMovies(favorites);
    setFilteredMovies(favorites.filter(movie =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  };

  return (
    <div className="w-full px-[1rem] md:px-[6rem] py-[3rem]">
      <div className="flex items-center justify-between pb-[2rem]">
        <div className="flex items-center justify-center">
            <div className="w-6 h-6 flex justify-center items-center border border-gray-600 rounded-full">
                <Link to="/"><FontAwesomeIcon icon={faChevronLeft} size='xs' color='black'/></Link>
            </div>
            <p className="text-2xl font-semibold px-2 hidden md:block">My Favourites</p>
        </div>
        <div>
            <form className='mx-4 py-1 px-2 md:w-[14rem] border border-gray-400 bg-white rounded px-2 flex justify-between items-center'>
                <div>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size='xs' color='gray' />
                    <input
                        className='text-sm outline-none px-2'
                        type="text"
                        placeholder='Search movies and series'
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </form>
        </div> 
      </div>
      <div className="grid md:grid-cols-4 gap-20">
        {filteredMovies.map(movie => (
          <Card key={movie.id} movie={movie} updateFavorites={updateFavorites}/>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
