import { serverGetExternalHTML } from "@/scrapping/videoscrap";

export async function getScrapedData() {
  const url = await serverGetExternalHTML('https://flixhq.ws/search?keyword=cars+2');
  return { url };
}