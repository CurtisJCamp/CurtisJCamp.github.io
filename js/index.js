// Get API for twitch streaming
// client ID for Twitch m6we5w16hlf1rzc66w42alkfoycwoc

/* Example Request                         

https://api.twitch.tv/kraken/streams  /"STREAMERS_NAME"?client_id=m6we5w16hlf1rzc66w42alkfoycwoc

Top 100 Streamers List http://twitchstats.net/gamedetails.php?id=280721&sort=w

*/

$(function() {
  //27 streamers (26 Destiny, 1FCC)
  var streamer = [
    "bungie",
    "kinggothalion",
    "guardiancon",
    "professorbroman",
    "ign",
    "mym_alkapone",
    "pierredunn",
    "realkraftyy",
    "mehvsgame",
    "drlupo",
    "datto",
    "meloonie",
    "triplewreck",
    "gernaderjake",
    "luckyy_and_bw",
    "luminosity",
    "spicylogcutter",
    "mapador_legend",
    "wwwzirotv",
    "charionna",
    "gigz",
    "mynameisbyf",
    "lasqa",
    "malloy2",
    "freecodecamp",
    "wishyouluckk"
  ];

  var frontUrl = "https://api.twitch.tv/kraken/";
  var channels = "channels/";
  var streams = "streams/";
  var users = "users/";
  var callback = "?client_id=m6we5w16hlf1rzc66w42alkfoycwoc";
  //Users bio for streamer-set as hover
  //Channels: status, display_name, game, logo, url
  //Streams: stream, stream.viewers, stream.preview.medium,

  for (let i = 0; i <= streamer.length; i++) {
    $.ajax({
      type: "GET",
      url: frontUrl + channels + streamer[i],
      headers: {
        "client-ID": "m6we5w16hlf1rzc66w42alkfoycwoc"
      },
      success: function(dataChannels) {
        $.getJSON(
          frontUrl + streams + dataChannels.name + callback
        ).done(function(dataStreams) {
          console.log(dataStreams);
          if (dataStreams.stream === null) {
            $("#offlineStreamer").append(
              '<div><a href="' +
                dataChannels.url +
                '"target="_blank"><h4 class="offlineText"><img class="logo" src = ' +
                dataChannels.logo +
                ' alt="Streamer Logo"> ' +
                dataChannels.display_name +
                "</h4></a></div></br>"
            );
            //append what ever you want from channels and from streams, make it look good in html
          } else {
            $("#onlineStreamerCard").append(
              '<div class="card  streamerCard"><div class="card-block"><h4 class ="text-center"><a href="' +
                dataChannels.url +
                '"target="_blank"><img class="logo" src = ' +
                dataChannels.logo +
                ' alt="Streamer Logo"></a><a href="' +
                dataChannels.url +
                '"target="_blank">   ' +
                dataChannels.display_name +
                '</h4></a><div class="bannerContainer"><p class="text-center">Followers: ' +
                dataChannels.followers +
                '</p><a href="' +
                dataChannels.url +
                '"target="_blank"><img class="bannerImage" src = ' +
                dataChannels.profile_banner +
                ' alt="profile banner"><div class="middle"><div class="hoverText"><h4 class="status">' +
                dataChannels.display_name +
                ": " +
                dataChannels.status +
                '</h4></div></div></div></a><a href="https://www.twitch.tv/directory/game/' +
                dataChannels.game +
                '"target="_blank"><h6 class ="game">   Game: ' +
                dataChannels.game +
                '</a><p class = "viewers"><i class="fa fa-circle dotIcon" aria-hidden="true"></i> Viewers: ' +
                dataStreams.stream.viewers +
                '</p><a href="' +
                dataChannels.url +
                '"target="_blank"><p class="text-center previewText">Preview of LiveStream <i class="fa fa-level-down" aria-hidden="true"></i></p></a><a href="' +
                dataChannels.url +
                '"target="_blank"><img class=" preview" src=' +
                dataStreams.stream.preview.large +
                'alt="Preview of Stream"></a></h6></a></div></div><br/>'
            );
          }
        });
      },
      error: function(error) {
        // alert("Error on API Request from Twtitch")
      }
    });
  }
});