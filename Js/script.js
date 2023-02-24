const pokemonName = document.querySelector('.poke_name');
const pokeID = document.querySelector('.poke_id');

const pokeType1 = document.querySelector('.poke_type1');
const pokeType2 = document.querySelector('.poke_type2');

const nextPoke = document.querySelector('.btn-next');
const prevPoke = document.querySelector('.btn-prev');
const pokeIMG = document.querySelector('.poke_image');
const formPoke = document.querySelector('.poke_form');
const pokeInput = document.querySelector('.poke_search');

let pokeAtual = 1;
const fetchPokemon = async (pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data; 
    }
    
}

const renderPoke = async (pokemon) =>{
    pokemonName.innerHTML = "LOADING...";
    pokeID.innerHTML = ''
    
    const data = await fetchPokemon(pokemon);
    
    if (data) {
        pokemonName.innerHTML = data.name;
        pokeID.innerHTML = data.id

        pokeIMG.src = data['sprites']['front_default'];
        pokeType1.innerHTML = data['types']['0']['type']['name'];
        if (data.types[1]) {
            pokeType2.innerHTML = data['types']['1']['type']['name'];
        }else{
            pokeType2.innerHTML = data['types']['0']['type']['name'];
        }
        
    }else{
        pokemonName.innerHTML = "ERROR";
        pokeID.innerHTML = '';
        pokeIMG.style.display =  'none';
    }
    
}
function Next(){
    pokeAtual = pokeAtual + 1;
    if (pokeAtual>1008) {
        pokeAtual = 1;
        
    }
    renderPoke(pokeAtual);
}
function Prev(){
    pokeAtual = pokeAtual - 1;
    if (pokeAtual < 1) {
        pokeAtual = 1008;
        
    }
    renderPoke(pokeAtual);
}
renderPoke(pokeAtual);
nextPoke.addEventListener('click', Next);
prevPoke.addEventListener('click', Prev);
formPoke.addEventListener('submit', (event)=>{
    event.preventDefault();
    
    renderPoke(pokeInput.value.toLowerCase());
});