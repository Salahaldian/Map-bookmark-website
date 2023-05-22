const api = "http://localhost:8800/api";

export default function fetcher(pathname, options = {}) {
  return fetch(api + pathname, options).then((res) => {
    //if response is json parse it
    if (res.headers.get("content-type")?.includes("application/json")) {
      return res.json();
    }
  });
}