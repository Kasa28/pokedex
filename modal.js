async function showModal(id) {
  pokeIndex = -1;
  for (let i = 0; i < shown.length; i++) {
    if (shown[i].id === id) { pokeIndex = i; break; }
  }
  if (pokeIndex < 0) return;
  let p = shown[pokeIndex];
  setModalBackground(p);
  fillInfo(p); fillStats(p); fillMoves(p);
  await fillEvolution(p);

  cardTab("info");
  document.getElementById("pokemonModal").classList.remove("hidden");
}

function setModalBackground(p) {
  let bg = "#4caf50";
  if (p.types[0]) {
    let t = p.types[0].type.name;
    if (typeColors[t]) bg = typeColors[t];
  }
  document.querySelector("#pokemonModal .modal-content").style.background = bg;
}

function fillInfo(p) {
  document.getElementById("modalName").innerHTML = p.name.toUpperCase();
  let img = p.sprites.other["official-artwork"].front_default;
  document.getElementById("modalImage").src = img ? img : "img/icon.png";
  let typeText = "";
  for (let i = 0; i < p.types.length; i++) {
    typeText += p.types[i].type.name;
    if (i < p.types.length - 1) typeText += ", ";
  }
  document.getElementById("modalType").innerHTML = typeText;
  document.getElementById("modalHeight").innerHTML = p.height;
  document.getElementById("modalWeight").innerHTML = p.weight;
}

function fillStats(p) {
  let box = document.getElementById("modalStats");
  box.innerHTML = "";
  for (let i = 0; i < p.stats.length; i++) {
    let s = p.stats[i];
    box.innerHTML +=
      "<div class='info-row'>" +
        "<span class='label'>" + s.stat.name.toUpperCase() + "</span>" +
        "<span class='value'>" + s.base_stat + "</span>" +
      "</div>";
  }
}

function fillMoves(p) {
  let box = document.getElementById("modalMoves")
  box.innerHTML = ""

  if (p.moves.length == 0) {
    box.innerHTML = "<p>Keine Moves</p>"
  } else {
    for (let i = 0; i < p.moves.length; i++) {
      let m = p.moves[i].move.name
      box.innerHTML += "<div class='move-box'>" + m + "</div>"
      if (i == 9) break
    }
  }
}

async function fillEvolution(p) {
  let box = document.getElementById("modalEvolution")
  box.innerHTML = ""
  let sp = await (await fetch(p.species.url)).json()
  let evo = await (await fetch(sp.evolution_chain.url)).json()
  let c = evo.chain
  if (c) await showEvo(box, c.species.name)
  if (c && c.evolves_to[0]) await showEvo(box, c.evolves_to[0].species.name)
  if (c && c.evolves_to[0] && c.evolves_to[0].evolves_to[0]) 
    await showEvo(box, c.evolves_to[0].evolves_to[0].species.name)
}

async function showEvo(box, name) {
  let url; url = "https://pokeapi.co/api/v2/pokemon/" + name
  let res; res = await fetch(url)
  let data; data = await res.json()

  let img; 
  img = data.sprites.other["official-artwork"].front_default
  if (!img) { img = "img/icon.png" }

  box.innerHTML += "<div class='evo-box'><img src='" + img + "'><p>" + name + "</p></div>"
}

function cardTab(tab) {
  let tabs = ["info", "stats", "moves", "evolution"];
  for (let i = 0; i < tabs.length; i++) {
    document.getElementById("tab-" + tabs[i]).classList.remove("active");
  }
  document.getElementById("tab-" + tab).classList.add("active");
}

function closeModal() {
  document.getElementById("pokemonModal").classList.add("hidden");
}

function prevPokemon() {
  pokeIndex = pokeIndex - 1;
  if (pokeIndex < 0) pokeIndex = shown.length - 1;
  showModal(shown[pokeIndex].id);
}
function nextPokemon() {
  pokeIndex = pokeIndex + 1;
  if (pokeIndex >= shown.length) pokeIndex = 0;
  showModal(shown[pokeIndex].id);
}
