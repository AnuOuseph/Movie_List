import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { Instance } from "../App";
import Card from "../components/card/Card";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('title');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await Instance.get('/api/movies/');
        setMovies(response?.data?.data);
      } catch (error) {
        console.error('Error fetching', error);
      }
    };

    const fetchSearchResults = async () => {
      try {
        const response = await Instance.get(`/api/movies/search?title=${encodeURIComponent(searchQuery)}`);
        setSearchResults(response?.data?.data);
        setIsSearchActive(true);
      } catch (error) {
        console.error('Error searching', error);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    } else {
      fetchMovies();
      setIsSearchActive(false);
    }
  }, [searchQuery]);

  const displayedMovies = isSearchActive ? searchResults : movies;

  return (
    <>{!isSearchActive && (
      <div className="w-full" style={{ height: 'calc(100vh - 80px)', backgroundColor: '#f2f2f2' }}>
        <div className="px-[1rem] md:px-[6rem] py-[2rem] h-full w-full object-fit-cover">
          <div style={{ backgroundImage: 'url(https://i.abcnewsfe.com/a/ee137d2f-8438-4875-9fd0-7594ac617ce2/spiderman-2-ht-er-230530_1685474847370_hpMain_12x5.jpg)', backgroundSize: 'cover' }} className='h-full w-full rounded-xl relative'>
            <div className="p-[4rem] absolute bottom-0 left-0 ">
              <p className="md:text-5xl text-white py-2 font-semibold stroke-1 stroke-black md:w-[40%]">
                Spider-Man: Into The Spider-Verse
              </p>
              <p className="text-sm text-white md:w-[50%] py-2">
                Spider-Man: Into the Spider-Verse introduces Brooklyn teen Miles Morales, and the limitless possibilities of the Spider-Verse, where more than one can wear the mask.
              </p>
              <button className='flex items-center justify-center px-2 py-2 my-2 rounded w-[10rem] bg-white' >
                <FontAwesomeIcon icon={faPlus} size="xs" className='p-0.5 rounded-full' color='white' style={{ backgroundColor: '#fe0059', border: '1px solid #fe0059' }} />
                <p className='px-2 text-black font-bold'>Watch Later</p>
              </button>
            </div>
          </div>
        </div>
      </div> )}
      <div className="w-full" style={{ backgroundColor: '#f2f2f2' }}>
        <div className="px-[1rem] md:px-[6rem] pb-[3rem] w-full">
        {isSearchActive? 
            <div className="py-[3rem] px-2">
                <div className="flex items-center">
                    <p className="text-2xl text-black font-bold">Search</p>
                </div>
                <p className="pt-3">{searchResults?.length} Results Found.</p>
            </div>:
          <p className="text-2xl text-black pb-[2rem] font-bold">Movies</p>
        }
          <div className="grid md:grid-cols-4 gap-20">
            {displayedMovies.map((item) => (
              <Card key={item.id} movie={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Movies;
