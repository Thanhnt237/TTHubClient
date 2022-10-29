export function createQueryUrl(url: any, query?: any){
  if(query && JSON.stringify(query) !== "{}") {
    url = url + "?"
    for (const [key, value] of Object.entries(query)) {
      url = url + `${key}=${value}&`
    }
    url = url.substring(0, url.length - 1);
  }
  return url
}