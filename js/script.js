const characterList = document.getElementById('character-list');
const nextPage = document.getElementById('next-page');
const prevPage = document.getElementById('prev-page');
const button = document.querySelectorAll('boton');
let paginaActual = 1;

function obtenerPersonajes(pagina){
    fetch("https://rickandmortyapi.com/api/character/?page=" + pagina)
    .then((response)=>{
        if(!response.ok){
            throw new Error('No funciona la página');
        }
        return response.json();
    })
    .then((data) =>{
        mostrarPersonajes(data.results)
    })
    .catch((error)=>{
        characterList.innerText = 'No se pueden extraer personajes';
    });
}

function mostrarPersonajes(personajes){
    characterList.innerHTML = "";
    personajes.forEach((personaje)=>{
        const cuadroPersonaje = document.createElement('div');
        cuadroPersonaje.classList.add('cuadro-personaje');

        cuadroPersonaje.innerHTML =`
        <img src="${personaje.image}" 
        alt="${personaje.name}">
        <h3>${personaje.name}</h3>
        <p>Species: ${personaje.species}</p>
    `;
    characterList.appendChild(cuadroPersonaje);
    });
}

prevPage.addEventListener('click', ()=>{
    if (paginaActual > 1){
        paginaActual--;
        obtenerPersonajes(paginaActual);
    }
})

nextPage.addEventListener('click', ()=>{
    paginaActual++;
    obtenerPersonajes(paginaActual);
})

obtenerPersonajes(paginaActual);