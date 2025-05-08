const baseUrl = 'https://rickandmortyapi.com/api/character'

async function fetchData() {
    try {
        const response = await fetch(baseUrl)
        if (!response.ok) throw new Error(response.statusText);
        const { results, info } = await response.json();
        const data = []
        results.forEach(element => {
            data[data.length] = { image: element.image, name: element.name }
        });

        const page2 = await fetch(info.next)
        if (!page2.ok) throw new Error(page2.statusText);
        const { results: results2, info: info2 } = await page2.json();
        results2.forEach(element => {
            data[data.length] = { image: element.image, name: element.name }
        });

        const page3 = await fetch(info2.next)
        if (!page3.ok) throw new Error(page3.statusText);
        const { results: results3, info: info3 } = await page3.json();
        results3.forEach(element => {
            data[data.length] = { image: element.image, name: element.name }
        });

        const page4 = await fetch(info3.next)
        if (!page4.ok) throw new Error(page4.statusText);
        const { results: results4, info: info4 } = await page4.json();
        results4.forEach(element => {
            data[data.length] = { image: element.image, name: element.name }
        });

        const page5 = await fetch(info4.next)
        if (!page5.ok) throw new Error(page3.statusText);
        const { results: results5, info: info5 } = await page5.json();
        results5.forEach(element => {
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

        const arrow = document.querySelector('.arrow')

        window.onscroll = function () { scrollFunction() };

        function scrollFunction() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                arrow.style.display = "block";
            } else {
                arrow.style.display = "none";
            }
        }

        arrow.addEventListener('click', topFunction)

        function topFunction() {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        }


    } catch (error) {
        if (error instanceof Error) console.log(error.message)
    }
}

fetchData()