const singaporeCoordinates = [1.3521, 103.8198];
const boundsSW = L.latLng(0.4284, 103.2138);
const boundsNE = L.latLng(2.2735, 104.4250);
const singaporeBounds = L.latLngBounds(boundsSW, boundsNE);

function createSingaporeMap() {
  const map = L.map("map");
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    minZoom: 11,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  map.setMaxBounds(singaporeBounds);
  map.setView(singaporeCoordinates, 11);
  map.removeControl(map.zoomControl);
  return map;
}

async function loadMapData(filePath) {
  const readData = await axios.get(filePath);
  return readData.data;
}

function renderMapGeoJSON(mapData, layerGroup) {
  const layerData = L.geoJSON(mapData, {
    onEachFeature: function(feature, layer){
      const dataContainer = document.createElement('div');
      dataContainer.innerHTML = feature.properties.Description;
      const allData = dataContainer.querySelectorAll('td');
      
      const museumName = allData[9].innerHTML;
      const museumDescription = allData[5].innerHTML;
      const photoURL = allData[10].innerHTML;

      const addressBlockNo = allData[0].innerHTML;
      const addressStreet = allData[3].innerHTML;
      const addressPost = allData[2].innerHTML;

      const museumWebsite = allData[6].innerHTML;

      layer.bindPopup(`<section class="popup-section">
        <h1 class="popup-museumName">${museumName}</h1>
        <div>
          <p>&#128204 ${addressBlockNo} ${addressStreet}, ${addressPost}</p>
          <p>${museumDescription}</p>
          <a href="${museumWebsite}">Website</a>
        </div>
        <div class="popup-imagePlaceholder">
          <img class="popup-photo" src="${photoURL}" alt="${museumName}"/>
        </div>
      </section>
      `);
    }
  });
    layerData.addTo(layerGroup);
}