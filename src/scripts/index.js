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

        const container = document.getElementById('container-grid')
        data.forEach(element => {
            const img = document.createElement('img')
            const name = document.createElement('p')
            const div = document.createElement('div')
            img.src = element.image
            img.alt = element.name
            name.textContent = element.name
            div.append(img, name)
            div.classList.add('char-container')
            container.append(div)

        })

        const search = document.querySelector('#search')
        const charList = document.querySelectorAll('.char-container')

        function searchChar(event) {
            const searchCharName = event.target.value.toLowerCase()

            charList.forEach(char => {
                const singleChar = char.children[1] //children [0]: img, [1]: <p>
                const charName = singleChar.textContent.toLowerCase() //content of <p>

                charName.includes(searchCharName) ? char.style.display = 'flex' : char.style.display = 'none' //display the container if match search value, hide if not
            })
        }

        search.addEventListener('keyup', searchChar)


    } catch (error) {
        if (error instanceof Error) console.log(error.message)
    }
}

fetchData()