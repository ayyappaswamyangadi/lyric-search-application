const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = 'https://api.lyrics.ovh';// https://api.lyrics.ovh/suggest/rihanna

async function searchSongs(term){
    const res = await fetch(`${apiURL}/suggest/${term}`);
    const data = await res.json();

    showData(data);
}

function showData(data){
    result.innerHTML = `
    <ul class="songs">
    ${data.data.map((song) => `<li><span><strong>${song.artist.name}</strong> - ${song.title}</span><button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}"> Get lyrics</li>`).join("")}</ul>`;
    if(data.prev || data.next){
        more.innerHTML = `
        ${
            data.prev
            ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
            :""
        }

        ${
            data.next
            ?`<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
            :""
        }`;
    }else{
        more.innerHTML = "";
    }
}


async function getMoreSongs(url){
    const res = await fetch(`${apiURL}/suggest/${url}`); //https://api.lyrics.ovh/suggest/rihanna
    const data = await res.json();

    showData(data);
}


async function getLyrics(artist, songTitle){
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);//https://api.lyrics.ovh/v1/${artist}/${songTitle}
    const data = await res.json();

    if(data.error){
        result.innerHTML = data.error;
    }

    else{
        const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

        result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2><span>${lyrics}</span>`;
    }
    more.innerHTML = "";
}

form.addEventListener('submit', e =>{
    e.preventDefault()
    const searchTerm = search.value.trim();

    if(!searchTerm){
        alert('enter something to search')
    }
//     else if(searchTerm != searchSongs()){
// alert("nothing")
//     }
    else{
        searchSongs(searchTerm);
    }
});

result.addEventListener('click', e =>{
    const clickedEl = e.target;
    if(clickedEl.tagName === 'BUTTON'){
    const artist = clickedEl.getAttribute('data-artist');
    const songTitle = clickedEl.getAttribute('data-songtitle');

    getLyrics(artist, songTitle);
}
});













































// //event listener in get lyrics button
// result.addEventListener('click', e=>{
//     const clickedElement = e.target;

//     //checking clicked elemet is button or not
//     if (clickedElement.tagName === 'SPAN'){
//         const artist = clickedElement.getAttribute('data-artist');
//         const songTitle = clickedElement.getAttribute('data-songtitle');
        
//         getLyrics(artist, songTitle)
//     }
// })

// // Get lyrics for song
// async function getLyrics(artist, songTitle) {
  
//     const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);

//     const data = await res.json();
//     const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
//     result.innerHTML = ` 
//     <h4 style="margin-bottom:30px;"><strong>${artist}</strong> - ${songTitle}</h4><ul>
//     <div data-artist="${artist}" data-songtitle="${songTitle}"> get lyrics</div>
//     <p style="margin-top:20px;">${lyrics}</p>
// `    
    
// }

// //event listener in get song button
// result.addEventListener('click', e=>{
//     const clickedElement = e.target;

//     //checking clicked elemet is button or not
//     if (clickedElement.tagName === 'DIV'){
//         const artist = clickedElement.getAttribute('data-artist');
//         const songTitle = clickedElement.getAttribute('data-songtitle');
        
//         execute(artist, songTitle);
//     }
    
// })

// /*************************************************
//  * 
//  * 
//  * 
//  * 
//  * 
//  * ************************************************
//  */
// const execute = (artist, songTitle)=>{
//     var pageToken = '';

//     var arr_search = {
//         "part": 'snippet',
//         "type": 'video',
//         "order": 'relevance',
//         "maxResults": 1,
//         "q": songTitle + artist
//     };
 
//     if (pageToken != '') {
//         arr_search.pageToken = pageToken;
//     }
 
//     return gapi.client.youtube.search.list(arr_search)
//     .then(function(response) {
//         // Handle the results here (response.result has the parsed body).
//         const listItems = response.result.items;
//         if (listItems) {
//             let output = `<h4 style="margin-bottom:30px;"><strong>${artist}</strong> - ${songTitle}</h4><ul>`;
 
//             listItems.forEach(item => {
//                 const videoId = item.id.videoId;
//                 const videoTitle = item.snippet.title;
//                 output += `
//                     <li><a data-fancybox href="https://www.youtube.com/watch?v=${videoId}"><img src="http://i3.ytimg.com/vi/${videoId}/hqdefault.jpg" /></li>
//                 `;
//             });
//             output += '</ul>';
 
//             // Output list
//             document.getElementById('video').innerHTML = output
           
//         }
//     },
//     function(err) { console.error("Execute error", err); });
    
// }