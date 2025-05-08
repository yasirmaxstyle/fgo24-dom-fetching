const baseUrl = 'https://rickandmortyapi.com/api/character'

async function fetchData() {
    try {
        const response = await fetch(baseUrl)
        if (!response.ok) throw new Error(response.statusText);
        const { results } = await response.json();
        const data = []
        results.forEach(element => {
            data[data.length] = { image: element.image, name: element.name }
        });

        const container = document.getElementById('container')
        data.forEach(element => {
            const img = document.createElement('img')
            const name = document.createElement('p')
            const div = document.createElement('div')
            img.src = element.image
            img.alt = element.name
            name.textContent = element.name
            div.append(img, name)
            container.append(div)
        })
    } catch (error) {
        if (error instanceof Error) console.log(error.message)
    }
}

fetchData()