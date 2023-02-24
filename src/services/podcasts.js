export const searchPodcasts = async () => {
  try {
    const response = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
    const json = await response.json()
    const podcasts = json.feed.entry

    return podcasts.map((podcast) => {
      return {
        id: podcast.id.attributes['im:id'],
        title: podcast['im:name'].label,
        author: podcast['im:artist'].label,
        image: podcast['im:image'][2].label,
        description: podcast.summary.label
      }
    })
  } catch (e) {
    console.warn('Error getting podcasts')
  }
}
// fetch XML get information of podcasts
export const detailPodcast = async (id) => {
  try {
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${id}`)}`)
    const data = await response.json()
    const json = JSON.parse(data?.contents)
    const feedUrl = json.results[0].feedUrl
    const feed = await fetch(`https://cors-anywhere.herokuapp.com/${feedUrl}`)
    const text = await feed.text()
    const parser = new window.DOMParser()
    const xml = parser.parseFromString(text, 'application/xml')
    const itemsSelector = Array.from(xml.querySelectorAll('item'))

    const items = itemsSelector.map((item) => {
      const title = item.querySelector('title').textContent
      const duration = item.querySelector('itunes\\:duration, duration') ? item.querySelector('itunes\\:duration, duration').textContent : '00:00'
      const date = item.querySelector('pubDate').textContent
      // format date to YYYY/MM/DD
      const dateFormated = new Date(date).toISOString().split('T')[0].split('-').reverse().join('/')

      const id = item.querySelector('guid').textContent

      return {
        title,
        duration,
        date: dateFormated,
        id
      }
    })
    return items
  } catch (e) {
    console.warn(e)
  }
}
