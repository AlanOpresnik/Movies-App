import { useRef } from 'react'
import { getURLVideoFromFlixHQ } from '@/scrapping/videoscrap';

export async function getStaticProps() {
  const videoUrl = await getURLVideoFromFlixHQ('https://flixhq.ws/movie/napoleon-43049/');
  
  return { props: { video: `<iframe src="${videoUrl}" width="100%" height="100%"></iframe>` } }
}

export default function Home( {video}) {
  const refContainer = useRef(null);

  const renderVideoContent = () => {
      return { __html: video };
  };
  return (
  <div>
    <style global jsx>{`
      html,
      body,
      body > div:first-child,
      div#__next,
      div#__next > div {
        height: 100%;
      }
    `}</style>
   <div style={{width: "100%", height: "100%"}} ref={refContainer} dangerouslySetInnerHTML={renderVideoContent()}>

   </div>
   </div>
  )
}
