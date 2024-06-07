# Movie List

A backend service for retrieving and searching movies, and a frontend application that displays movies and allows users to add their favorites.

## Live Demo

- **Frontend**: [Live Demo on Vercel](https://movie-list-psi-three.vercel.app/)

### Backend APIs

- **Get Movies** `[GET /api/movies]`: An endpoint to retrieve the list of all movies.
- **Search Movies** `[GET /api/movies/search?title={title}]`: An endpoint to search for movies by title.

### Data

- **Movies Data**: The list of movies is provided in a file named `movie.json`.

### Running the Project Locally

1.  Clone the Repository:   git clone https://github.com/AnuOuseph/Movie_List
2.  Navigate to the Project Directory:  cd Movie_List
3.  Navigate to Server Directory : cd server
4.  Install Dependencies: npm install
5.  Run Server Side: npm start
6.  Open another terminal & Navigate to Client Directory : cd movie-list
7.  Install dependencies npm install
8.  Run Client side: npm run dev
