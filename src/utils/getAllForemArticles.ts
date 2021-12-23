
import {ForemPublishedArticles} from "../types";


const DEVTO_KEY = import.meta.env.PUBLIC_DEVTO as string;
const FLOWSTATE_KEY = import.meta.env.PUBLIC_FLOWSTATE as string;

const ARTICLES_PER_PAGE = 1000;
const page = 1;

const devToResponse = await fetch(
  `https://dev.to/api/articles/me/published?page=${page}&per_page=${ARTICLES_PER_PAGE}`,
  {
    headers: { "api-key": DEVTO_KEY },
  }
);

export const devToArticles: ForemPublishedArticles[] =
  await devToResponse.json();

const flowStateResponse = await fetch(
  `https://flowstate.to/api/articles/me/published?page=${page}&per_page=${ARTICLES_PER_PAGE}`,
  {
    headers: { "api-key": FLOWSTATE_KEY },
  }
);

export const flowStateArticles: ForemPublishedArticles[] =
  await flowStateResponse.json();


export const flowStateArticlesWithSource = flowStateArticles.map(resp => {
  return Object.assign(resp, {source: "flowstate"});
  
})

export const devToArticlesWithSource = devToArticles.map(resp => {
  return Object.assign(resp, {source: "devto"});
  
})

export const allForemArticles =  [...flowStateArticlesWithSource, ...devToArticlesWithSource];