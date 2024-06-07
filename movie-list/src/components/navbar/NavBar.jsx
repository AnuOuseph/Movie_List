import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClapperboard, faClose, faHeart, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') return;

    try {
      const encodedQuery = encodeURIComponent(searchQuery);
      navigate(`/?title=${encodedQuery}`);
    } catch (error) {
      console.error('Error searching', error);
    }
  };

  const handleClear = async () => {
    try {
        setSearchQuery('')
        navigate(`/`);
      } catch (error) {
        console.error('Error clearing', error);
      }
  }

  return (
    <div className="w-full h-20 bg-white flex items-center sticky top-0 z-50">
      <div className="px-[1rem] md:px-[6rem] w-full flex justify-between items-center">
        <div className="flex items-center">
          <div className='flex items-center justify-center w-6 h-6 mx-2 rounded-full' style={{ backgroundColor: '#fe0059' }}>
            <Link to="/"><FontAwesomeIcon icon={faClapperboard} size='xs' color='white' /></Link>
          </div>
          <Link to="/"><p className='font-bold mx-1 text-lg hidden md:block'>GET MOVIES</p></Link>
          <form onSubmit={handleSearch} className='md:mx-4 py-1 px-2 md:w-[20rem] border border-gray-300 rounded px-2 flex justify-between items-center'>
            <div>
                <FontAwesomeIcon icon={faMagnifyingGlass} size='xs' color='gray' />
                <input
                className='text-sm outline-none px-2'
                type="text"
                placeholder='Search movies and series'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            {searchQuery.length!=0 &&
            <FontAwesomeIcon icon={faClose} size='xs' className='cursor-pointer' color='gray' onClick={() => handleClear()} />}
          </form>
        </div>
        <button className='flex items-center px-2 py-1 rounded-md' style={{ backgroundColor: '#fe0059' }}>
          <Link to="/my-favorites" className='flex items-center' >
            <FontAwesomeIcon icon={faHeart} className='px-1 py-1' color='white' />
            <p className='px-1 text-white hidden md:block'>My favourites</p>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
