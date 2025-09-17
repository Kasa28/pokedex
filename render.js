function showPokemons() {
  let grid = document.getElementById("pokemonGrid");
  shown = [];
  let cards = [];

  for (let i = 0; i < allPokemons.length; i++) {
    let p = allPokemons[i];
    if (okType(p) && okSearchPokemons(p)) {
      shown.push(p);
      cards.push(buildCard(p));
    }
  }
  grid.innerHTML = cards.join("");
}



function buildCard(p) {
  let types = "";
  for (let i = 0; i < p.types.length; i++) {
    let t = p.types[i].type.name;
    let emoji = typeEmojis[t] || "";
    types += `<span style="font-size:20px; margin:0 4px">${emoji}</span>`;
  }
  let img = p.sprites.other["official-artwork"].front_default || "img/icon.png";
  let cardColor = typeColors[p.types[0].type.name] || "#ddd";

  return `<div class="pokemonCard" style="background:${cardColor}" onclick="showModal(${p.id})">
            <h3>#${p.id} ${p.name.toUpperCase()}</h3>
            <img src="${img}" loading="lazy">
            <div>${types}</div>
          </div>`;
}

