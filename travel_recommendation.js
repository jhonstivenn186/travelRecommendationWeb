const searchButton = document.getElementById('search');
const clearButton = document.getElementById('clear');


var Data;


const connectData = () => {
    fetch('https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBMSkillsNetwork-JS0101EN-SkillsNetwork/travel1.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Hi I am Error');
            }
            return response.json();
        })
        .then(data => {
            Data = data;
        })
        .catch(error => {
            console.log('error appear in here', error);
        })
}

const searchClick = () => {
    const card_content = document.getElementById('card-content');
    card_content.innerHTML = '';
    const sText = document.getElementById('searchText');

    if (!sText.value) {
        sText.value = 'Input Search Query';
        return;
    }
    if (!Data[sText.value]) {
        if (!Data.countries.find(item => item.name === sText.value)) {
            sText.value = 'Input exactly value.';
        }else {
            const card = Data.countries.find(item => item.name === sText.value);
            card.cities.forEach((item) => {
                cardMake(item.imageUrl , item.name, item.description);
            });
        }
    } else {
        const card = Data[sText.value];
        card.forEach((item) => {
            cardMake(item.imageUrl, item.name, item.description);
        });
    }
}

const clearClick = () => {
    const card_content = document.getElementById('card-content');
    const sText = document.getElementById('searchText');
    card_content.innerHTML = '';
    sText.value = '';
}

function cardMake(img, title, content) {
    const card_content = document.getElementById('card-content');
    const card = document.createElement('div');
    const str = `<img src = '../img/brand-meeting.jpeg'><h2>${title}</h2><p>${content}</p> <input type = 'button' value = 'VISIT'>`;
    card.innerHTML = str;
    card.className = 'card';
    card_content.appendChild(card);
    console.log(str);
}

connectData();

searchButton.addEventListener('click', searchClick);
clearButton.addEventListener('click', clearClick);