let activeType = "all";
let searchTxt = "";

function searchPokemon() {
  searchTxt = document.getElementById("searchInput").value.toLowerCase();
  showPokemons();
}

function okType(p) {
  if (activeType === "all") return true;
  if (searchTxt.length >= 3) return true;
  return p.types.some(t => t.type.name === activeType);
}

function okSearchPokemons(p) {
  if (searchTxt.length < 3) return true;
  return p.name.toLowerCase().includes(searchTxt);
}

function filterByType(btn, type) {
  activeType = type;
  showPokemons();
  document.querySelectorAll(".type-filters button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

function showAllPokemon(btn) {
  activeType = "all";
  showPokemons();
  document.querySelectorAll(".type-filters button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}
