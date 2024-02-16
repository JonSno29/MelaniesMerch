fetch(
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCb3BgkDN-QVBc-HoW7XdPbA&maxResults=5&order=date&key=AIzaSyDzcGkZMyzZt6EBn8jlGBRjexwGkW_m-Zo"
)
  .then((result) => {
    return result.json();
  })
  .then((data) => {
    console.log(data);
    let video = data.items;
    let videoContainer = document.querySelector(".youtube-container");
    for (video of video) {
      videoContainer.innerHTML += `
            <img src="${video.snippet.thumbnails.medium.url}"/>
            `;
    }
  });
