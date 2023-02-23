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
        image: podcast['im:image'][2].label
      }
    })
  } catch (e) {
    console.warn('Error getting podcasts')
  }
}
