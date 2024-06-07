/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react";

const fallbackImage = '../../../file-not-found.jpg'

const Card = ({movie, updateFavorites}) => {
    const [backgroundImage, setBackgroundImage] = useState(fallbackImage);

    useEffect(() => {
      const img = new Image();
      img.src = movie?.banner_image;
      img.onload = () => setBackgroundImage(movie?.banner_image);
      img.onerror = () => setBackgroundImage(fallbackImage);
    }, [movie?.banner_image]);

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('myFavorites')) || [];
        setIsFavorite(favorites.some(fav => fav.id === movie.id));
      }, [movie.id]);
    
    const addToFavorites = () => {
        let favorites = JSON.parse(localStorage.getItem('myFavorites')) || [];
        if (!isFavorite) {
            favorites.push(movie);
        } else {
            favorites = favorites.filter(fav => fav.id !== movie.id);
        }
        localStorage.setItem('myFavorites', JSON.stringify(favorites));
        setIsFavorite(!isFavorite);
        updateFavorites(favorites);
    };
    

  return (
    <div className="row ">
        <div className="">
            <div className="" key={movie?.id}>
                <div className="w-full h-[25rem] rounded-md flex justify-end items-start p-2" style={{backgroundImage:`url(${backgroundImage})`,backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                    <div className="rounded-full border" style={{backgroundColor: 'rgba(255, 255, 255, .5)'}}>
                        <FontAwesomeIcon icon={faHeart} size="sm" 
                        className='px-1 justify-self-end cursor-pointer' 
                        color={isFavorite? 'red' : 'rgba(255, 255, 255)'}
                        onClick={addToFavorites}/>
                    </div>
                </div>
                <div className="" >
                    <p className="text-sm font-semibold text-gray-600 pt-2"> {movie?.year}</p>
                    <p className="font-bold text-lg"> {movie?.title} </p>
                    <p className="text-xs font-medium text-gray-600 py-1"> {movie?.genre} </p>
                </div>       
            </div>
        </div>
    </div>
  )
}

export default Card
