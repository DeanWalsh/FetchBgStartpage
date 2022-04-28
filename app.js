// Fetch Unsplash JSON 

setInterval(fetchExternal, 60000 * 10); // Update 10 minutes later

function fetchExternal() {
  // Fetch the external data
  fetch('https://api.unsplash.com/search/photos?query=landscape&page=1&order_by=relevant&orientation=landscape&per_page=30&client_id=YOUR CLIENT ID HERE')
    // Parse the response
    .then(response => response.json())
    // Update the content using mapping
    .then(data => {
      const dataUsernames = data.results.map(b => b.user.username);
      const dataDescriptions = data.results.map(b => b.description);
      const dataAltDescriptions = data.results.map(b => b.alt_description);
      const dataUrls = data.results.map(b => b.urls.full);
      // combine the arrays
      const combinedArrays = dataUrls.map((b, i) => {
        return {
          url: b,
          username: dataUsernames[i],
          description: dataDescriptions[i],
          alt_description: dataAltDescriptions[i]
        }
      });

      // Shuffle the array
      function shuffle(c) {
        for (var i = c.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var e = c[i];
          c[i] = c[j];
          c[j] = e;
        }
      }
      shuffle(combinedArrays);

      // Update wrapper Background Image with new image from shuffled urls
      document.getElementById('bg').style.backgroundImage = "url(" + combinedArrays[0].url + ")";
      // Create and append username (of the current img) <a> tag to container
      const userName = document.getElementById('usernames');
      userName.innerHTML = `<span>Taken by: </span><a target="_blank" href="https://unsplash.com/${combinedArrays[0].username}">
    ${combinedArrays[0].username}</a>`;
      // Create and append description (of the current img) <span> tag to container if available
      const userNameDescription = document.getElementById('usernames-description');
      if (combinedArrays[0].description !== null) {
        userNameDescription.innerHTML = `<span">"${combinedArrays[0].description}"</span>`;
      } else if (combinedArrays[0].alt_description !== null) {
        userNameDescription.innerHTML = `<span>"...${combinedArrays[0].alt_description}."</span>`;
      } else {
        userNameDescription.innerHTML = "";
      }
    });
}
fetchExternal();


// Toggle content button 

toggleContent = () => {
  const content = document.getElementById('container');
  const toggleButton = document.querySelector('#hide-content');
  const toggleImg = document.querySelector('#hide-content i');
  const bg = document.querySelector('#bg');
  // Hide content
  toggleButton.addEventListener('click', () => content.classList.toggle('hide'));
  // toggle blur
  toggleButton.addEventListener('click', () => bg.classList.toggle('blur'));
  //Change button image on click
  toggleImg.addEventListener('click', () => {
    if (toggleImg.classList.contains('fa-eye-slash')) {
      toggleImg.classList.remove('fa-eye-slash');
      toggleImg.classList.add('fa-eye');
    } else {
      toggleImg.classList.remove('fa-eye');
      toggleImg.classList.add('fa-eye-slash');
    }
  });
}
toggleContent();


// Current time Clock
// Old code from a previous browser start page that I just copied and updated vars -> const & let
const showTime = document.getElementById('time');
time = () => {
  let d = new Date();
  let s = d.getSeconds();
  let m = d.getMinutes();
  let h = d.getHours();
  if (s < 10) {
    s = "0" + s;
  }
  if (m < 10) {
    m = "0" + m;
  }
  if (h < 10) {
    h = "0" + h;
  }
  showTime.textContent = h + ":" + m + ":" + s;
}
time();
setInterval(time, 1000);