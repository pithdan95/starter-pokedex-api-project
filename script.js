$(document).ready(function () {
  $("#search").on("click", function () {
    $(this).toggleClass("rotate rotate-reset");
  });
});

$(document).ready(function () {
  $("#pokemonName").on("search", function () {
    $("#search").toggleClass("rotate rotate-reset");
  });
});

$(document).ready(function () {
  $(".poke-row").on("search", "#pokemonName", getPokemon);
  $(".poke-row").on("click", "#search", getPokemon);
});

function upperCaseName(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getPokemon(e) {
  const name = document.querySelector("#pokemonName").value;
  const lowerName = name.toLowerCase();
  const min = 1;
  const max = 69;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  fetch(`https://pokeapi.co/api/v2/pokemon/${lowerName}`)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(".img-container").innerHTML = `
        <img
          src="${data.sprites.other["official-artwork"].front_default}"
          class="pokedex-img card-img-top"
          alt="..."
        />
        `;

      document.querySelector(".pokedex-lg").innerHTML = `
        <li class="pokedex-li list-group-item">Name: ${upperCaseName(
          data.name
        )}</li>
        <li class="pokedex-li list-group-item">Types: ${data.types
          .map((type) => upperCaseName(type.type.name))
          .join(", ")}</li>
        <div class="stats-row-group">
          <li class="pokedex-li list-group-item stats-col-item">Ht: ${
            data.height
          }ft</li>
          <li class="pokedex-li list-group-item stats-col-item">Wt: ${
            data.weight
          }lbs</li>
        </div>
        <div class="stats-row-group">
          <li class="pokedex-li list-group-item stats-col-item">HP: ${
            data.stats[0].base_stat
          }</li>
          <li class="pokedex-li list-group-item stats-col-item">Speed: ${
            data.stats[5].base_stat
          }</li>
        </div>
        <div class="stats-row-group">
          <li class="pokedex-li list-group-item stats-col-item">
            Attack: ${data.stats[1].base_stat}
          </li>
          <li class="pokedex-li list-group-item stats-col-item">
            Defense: ${data.stats[2].base_stat}
          </li>
        </div>
        <div class="stats-row-group">
          <li class="pokedex-li list-group-item stats-col-item">
            Special-Attack: ${data.stats[3].base_stat}
          </li>
          <li class="pokedex-li list-group-item stats-col-item">
            Special-Defense: ${data.stats[4].base_stat}
          </li>
        </div>
        `;

      document.querySelector(".pokemon-card").innerHTML = `
        <h1 class="pokemon-title">Lvl. ${randomNumber} ${upperCaseName(
        data.name
      )}</h1>
        <img
          src="${data.sprites.other.home.front_default}"
          class="card-img-top"
          alt="..."
        />
            `;
    })
    .catch((err) => {
      console.log("Pokemon not found", err);
    });

  e.preventDefault();
}
