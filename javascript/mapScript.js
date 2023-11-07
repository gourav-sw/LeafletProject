document.addEventListener('DOMContentLoaded', async function(){
  const map = createSingaporeMap();
  renderMuseumCluster();
  
  async function renderMuseumCluster(){
    const mapData = await loadMapData("data/json/museums.geojson");
    const museumLayer = L.layerGroup();
      museumLayer.addTo(map);
    renderMapGeoJSON(mapData, museumLayer);
  }
})

