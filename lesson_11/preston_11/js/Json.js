// script for json on index page
const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })

    .then(function (jsonObject) {
        // console.table(jsonObject); // temporary checking for valid response and data parsing
        const towns = jsonObject['towns'];
        towns.forEach(town => {
            if (town.name == "Fish Haven" || town.name == "Preston" || town.name == "Soda Springs") {
                let card = document.createElement('section');
                let div = document.createElement('div');
                let h3 = document.createElement('h3');
                let p1 = document.createElement('p');
                let p2 = document.createElement('p');
                let p3 = document.createElement('p');
                let p4 = document.createElement('p');
                let image = document.createElement('img');

                card.setAttribute('class', town.name)
                div.setAttribute('class', 'data');
                h3.innerHTML = `<strong>${town.name}</strong>`;
                if(town.name == "Fish Haven" || town.name == "Preston"){
                    p1.innerHTML = `<em>${town.motto}</em><br><br> `;
                }
                else{
                    p1.innerHTML = `<em>${town.motto}</em>`;
                }     
                p2.textContent = `Year Founded: ${town.yearFounded}`;
                p3.textContent = `Population: ${town.currentPopulation}`;
                p4.textContent = `Annual Rain Fall ${town.averageRainfall}`;
                image.setAttribute('src', `images/index_page/${town.photo}`);
                image.setAttribute('alt', town.name);

                div.appendChild(h3);
                div.appendChild(p1);
                div.appendChild(p2);
                div.appendChild(p3);
                div.appendChild(p4);
                card.appendChild(div);
                card.appendChild(image);

                document.querySelector('div.cards').appendChild(card);

            }
        })
    });