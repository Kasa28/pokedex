async function init() {
  const data = await fetchList(0, First_Loading_Pokemons);
  if (!data) return;
  await loadPokemons(data.results);
  showPokemons();
}
async function loadMore() {
  const numer = allPokemons.length;
  const data = await fetchList(numer);
  if (!data || data.results.length === 0) {
    document.getElementById("loadMoreBtn").style.display = "none";
    return;
  }
  await loadPokemons(data.results);
  showPokemons();
}
