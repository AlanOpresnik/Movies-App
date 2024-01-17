// pages/about/index.js
import { useRef } from "react";
import { getScrapedData } from "../api/scrape";
export async function getStaticProps() {
  const { url } = await getScrapedData();
console.log(url)
  return {
    props: {
      video: url,
    },
  };
}


export default function About({ video }) {
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
      <div
        style={{ width: "100%", height: "100%" }}
        ref={refContainer}
        dangerouslySetInnerHTML={renderVideoContent()}
      ></div>
    </div>
  );
}