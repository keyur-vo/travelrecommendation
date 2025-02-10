let searchResults = document.getElementById('searchResults');
let maxCount;
let searchBtn = document.getElementById('searchBtn');
let resestBtn = document.getElementById('resetBtn');

function displayTravelRecommendation() {
  searchResults.innerHTML = "";
  maxCount = 0;
  let inputVal = document.getElementById('search').value.toLowerCase().trim();
  if(inputVal !== ""){
    fetch("./travel_recomm.json")
  .then(response => response.json())
  .then(data => {
    for(let key in data){
     
     
    if((key.toLowerCase().startsWith(inputVal)) && key !== "countries"){
          for(let i = 0; i < data[key].length; i++){
            let div = document.createElement('div');
            div.classList.add("card")
            div.innerHTML = `<img src="${data[key][i].imageUrl}" alt="${data[key][i].name}">
            <h2>${data[key][i].name}</h2>
            <p>${data[key][i].description}</p>
            <button class="btn">View</button>`
            searchResults.appendChild(div);
            if(maxCount === 2){
              return;
            }
           }
    }else if(key === "countries"){

      if(key.toLowerCase().startsWith(inputVal)){
        let div = document.createElement('div');
            div.classList.add("cancel-card")
            div.innerHTML = `Please enter valid country name <button onclick="clearTab()"><i class="fa-solid fa-xmark"></i></button>`
            searchResults.appendChild(div);
            return;
      }


        for(let i = 0; i < data[key].length; i++){
          if(data[key][i].name.toLowerCase().startsWith(inputVal)){
            for (let j = 0; j < data[key][i].cities.length; j++){
              let div = document.createElement('div');
              div.classList.add("card")
              div.innerHTML = `<img src="${data[key][i].cities[j].imageUrl}" alt="${data[key][i].cities[j].name}">
              <h2>${data[key][i].cities[j].name}</h2>
              <p>${data[key][i].cities[j].description}</p>
              <button class="btn">View</button>`
              searchResults.appendChild(div);
              maxCount++;
              if(maxCount === 2){
                return;
              }
            }
          }
          
          }
      }else{
            if("temples".startsWith(inputVal) || "beaches".startsWith(inputVal) ){
              continue;
            }
            let div = document.createElement('div');
            div.classList.add("cancel-card")
            div.innerHTML = `Please enter valid keywords e.g. beaches, temples <button onclick="clearTab()"><i class="fa-solid fa-xmark"></i></button>`
            searchResults.appendChild(div);
            return;
      }
     
          
   }
  }
)
  .catch(err => console.log(err))

  }
  
}

function clearTab(){
  searchResults.innerHTML = "";
  document.getElementById('search').value = "";
}
searchBtn.addEventListener('click', displayTravelRecommendation);
resestBtn.addEventListener('click', clearTab)




