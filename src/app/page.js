"use client";
import { useEffect, useRef } from 'react'

if (!String.prototype.endsWithVideoFormat) {
  String.prototype.endsWithVideoFormat = function() {
      return /\.(mp4|ts|mkv)$/.test(this);
  };
}


export default function Home() {
  const refContainer = useRef(null);
  let webTorrentWasLoaded = false;

  useEffect(() => {
    function scriptLoaded() {
      if (webTorrentWasLoaded) return;

      webTorrentWasLoaded = true;

      console.log("Webtorrent script was loaded!");

      const client = new WebTorrent()

      const torrentId = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent'
      
      client.add(torrentId, function (torrent) {
        // Torrents can contain many files. Let's use the .mp4 file
        const file = torrent.files.find(function (file) {
          return file.name.endsWithVideoFormat()
        })
        console.log(file);
        // Display the file by adding it to the DOM. Supports video, audio, image, etc. files
        file.appendTo(refContainer.current)
      })
    }
    
    var script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/webtorrent/1.5.4/webtorrent.min.js';
    script.onload = scriptLoaded;
    document.head.appendChild(script);
  }, []);
  return (
   <div ref={refContainer}>
    PEPE
   </div>
  )
}
