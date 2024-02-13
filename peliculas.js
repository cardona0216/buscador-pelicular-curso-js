//primero cuadno le damos al boton buscar debemos de llamr esta funcion

document.getElementById('searchButton').addEventListener('click', searchMovies);
let api_key = '66470bdfa967be102875304fe4aa7223';
let urbBase = 'https://api.themoviedb.org/3/search/movie';
let urlImagen = 'https://image.tmdb.org/t/p/w500';

let resultContainer = document.getElementById('results');

function searchMovies() {
    // Muestra el mensaje de "Cargando..." inmediatamente
    resultContainer.innerHTML = 'Cargando...';

    let searchInput = document.getElementById('searchInput').value;

    // Agrega un retraso de 500 milisegundos (0.5 segundos) antes de realizar la búsqueda
    setTimeout(function() {
        fetch(`${urbBase}?query=${searchInput}&api_key=${api_key}`)
            .then(response => response.json())
            .then(response => {
                // Después de recibir la respuesta, muestra las películas
                displaymovies(response.results);
            })
            .catch(error => {
                // Maneja errores si ocurren
                console.error('Se produjo un error al buscar películas:', error);
                resultContainer.innerHTML = 'Error al cargar películas.';
            });
    }, 200); // Puedes ajustar este valor según la duración del retraso que desees
}



//hacemos una funcion para cuando se haga la busqueda

function displaymovies(movies) {
    resultContainer.innerHTML = '';
  

    if (movies.length === 0) {
        resultContainer.innerHTML = '<p> No se encontraron resultados para tu busqueda </p>'
        return
    }

    movies.forEach(movie => {
        let movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');


        let titulo = document.createElement('h2');
        titulo.textContent = movie.title

        let releaseDate = document.createElement('p');
        releaseDate.textContent = 'la fecha de lanzamiento fue' + movie.release_date;

        let overview = document.createElement('p');
        overview.textContent = movie.overview;

        let posterPath = urlImagen + movie.poster_path;
        let poster = document.createElement('img');
        poster.src= posterPath

        movieDiv.appendChild(poster)
        movieDiv.appendChild(titulo)
        movieDiv.appendChild(releaseDate)
        movieDiv.appendChild(overview)
        resultContainer.appendChild(movieDiv)

    });

}