class Card {
    constructor(id, name, provider, src, desc) {
        this.id = id;
        this.name = name;
        this.provider = provider;
        this.src = src;
        this.desc = desc;
    }
}


function renderCards() {
    let cardsArray = JSON.parse(window.localStorage.getItem("cards"));

    if (cardsArray === null)
        return;

    for (let card of cardsArray) {
        const cardDiv = document.createElement("div");
        cardDiv.id = `card${card.id}`;
        cardDiv.setAttribute('class', "card flex align-start col");
        document.getElementsByClassName("cards-list flex align-start")[0].appendChild(cardDiv);

        const idEditDiv = document.createElement("div");
        idEditDiv.id = `idEdit${card.id}`;
        idEditDiv.setAttribute('class', "row width-100 flex space-between");
        document.getElementById(`card${card.id}`).appendChild(idEditDiv);

        const cardId = document.createElement("span");
        cardId.id = `cardId${card.id}`;
        cardId.textContent = `id: ${card.id}`;
        cardId.setAttribute('class', "roboto font-15px height-28px dark-main");
        document.getElementById(`idEdit${card.id}`).appendChild(cardId);

        const cardEdit = document.createElement("span");
        cardEdit.id = `cardEdit${card.id}`;
        cardEdit.textContent = "Изменить";
        cardEdit.addEventListener('click', preEdit);
        cardEdit.setAttribute('class', "roboto font-15px height-28px dark-main pointer card__edit");
        document.getElementById(`idEdit${card.id}`).appendChild(cardEdit);

        const cardContentDiv = document.createElement("div");
        cardContentDiv.id = `cardContent${card.id}`;
        cardContentDiv.setAttribute('class', "flex row card__img-text-wrap");
        document.getElementById(`card${card.id}`).appendChild(cardContentDiv);

        const cardImg = document.createElement("img");
        cardImg.id = `cardImg${card.id}`;
        cardImg.src = `${card.src}`;
        cardImg.alt = `${card.name}`;
        document.getElementById(`cardContent${card.id}`).appendChild(cardImg);

        const cardSubContentDiv = document.createElement("div");
        cardSubContentDiv.id = `cardSubContent${card.id}`;
        cardSubContentDiv.setAttribute('class', "flex col");
        document.getElementById(`cardContent${card.id}`).appendChild(cardSubContentDiv);

        const cardName = document.createElement("span");
        cardName.id = `cardName${card.id}`;
        cardName.textContent = card.name;
        cardName.setAttribute('class', "roboto card__title height-28px dark-main");
        document.getElementById(`cardSubContent${card.id}`).appendChild(cardName);

        const cardProvider = document.createElement("span");
        cardProvider.id = `cardName${card.id}`;
        cardProvider.textContent = card.provider;
        cardProvider.setAttribute('class', "roboto font-15px dark-main card__provider");
        document.getElementById(`cardSubContent${card.id}`).appendChild(cardProvider);

        const cardDescription = document.createElement("span");
        cardDescription.id = `cardDescription${card.id}`;
        cardDescription.textContent = card.desc;
        cardDescription.setAttribute('class', "roboto font-15px height-28px dark-main");
        document.getElementById(`card${card.id}`).appendChild(cardDescription);
    }
}


function preEdit(event) {
    let id = event.target.id.substring(8);
    let cardsArray = JSON.parse(window.localStorage.getItem("cards"));
    let card = cardsArray.find(x => Number(x.id) === Number(id));
    document.getElementsByName('id')[0].value = card.id;
    document.getElementsByName('id')[0].classList.add('hide');
    document.getElementsByName('name')[0].value = card.name;
    document.getElementsByName('provider')[0].value = card.provider;
    document.getElementsByName('imgLink')[0].value = card.src;
    document.getElementsByName('description')[0].value = card.desc;
    document.getElementById("approveBtn").idx = cardsArray.findIndex(x => Number(x.id) === Number(id));
    document.getElementById("deleteBtn").idx = cardsArray.findIndex(x => Number(x.id) === Number(id));
}


function isFormEmpty() {
    return isInputEmpty("id") || isInputEmpty("name") || isInputEmpty("provider") || isInputEmpty("imgLink") || isInputEmpty("description");
}


function isInputEmpty(key) {
    return document.getElementsByName(key)[0].value === "";
}


function validateForm(cardsArray, isCreate) {
    if (isFormEmpty()) {
        alert("У Вас остались незаполненные поля!");
        return false;
    }

    let id = document.getElementsByName("id")[0].value;

    if (isNaN(id) || isNaN(parseInt(id))) {
        alert("Идентификатор должен быть числом!");
        return false;
    }

    if (cardsArray.some(x => Number(x.id) === Number(id)) && isCreate) {
        alert("Идентификатор должен быть уникальным!");
        return false;
    }

    return true;
}


function editCard(event) {
    let cardsArray = JSON.parse(window.localStorage.getItem("cards"));

    if (cardsArray === null) {
        cardsArray = [];
    }

    let isCreate = !isFormEmpty() && document.getElementById("approveBtn").idx === undefined;

    if (!validateForm(cardsArray, isCreate))
        return;

    if (isCreate) {
        cardsArray[cardsArray.length] = serializeCard();
    } else {
        cardsArray[event.target.idx] = serializeCard();
    }

    updateLocalStorage(cardsArray);

}


function serializeCard() {
    return new Card(
        document.getElementsByName('id')[0].value,
        document.getElementsByName('name')[0].value,
        document.getElementsByName('provider')[0].value,
        document.getElementsByName('imgLink')[0].value,
        document.getElementsByName('description')[0].value
    );
}


function deleteCard(event) {
    if (document.getElementById("deleteBtn").idx === undefined)
        return;

    let cardsArray = JSON.parse(window.localStorage.getItem("cards"));
    cardsArray.splice(event.target.idx, 1);

    updateLocalStorage(cardsArray);
}


function clearForm() {
    document.getElementsByName('id')[0].value = "";
    document.getElementsByName('id')[0].classList.remove('hide');
    document.getElementsByName('name')[0].value = "";
    document.getElementsByName('provider')[0].value = "";
    document.getElementsByName('imgLink')[0].value = "";
    document.getElementsByName('description')[0].value = "";
    document.getElementById("approveBtn").idx = undefined;
    document.getElementById("deleteBtn").idx = undefined;
}


function handOutCards() {
    updateLocalStorage(
        [
            new Card(1, "Глаз Одина", "Этническая группа", "https://avatars.mds.yandex.net/i?id=9095f1046a41a475dcda4611875a8d33_l-5233563-images-thumbs&n=27&h=480&w=480", "Оч красивые камни"),
            new Card(2, "Котяя", "Яндекс", "https://i.ucrazy.ru/files/pics/2023.10/2023-10-17-21-53-072.webp", "Какой он чудо"),
            new Card(3, "Чаппи и ко", "Hi-News", "https://hi-news.ru/wp-content/uploads/2023/03/bing_gpt_19-750x588.jpg", "Пишут"),
            new Card(4, "SnakePh", "VoltMax", "https://volt.max-demo.ru/upload/iblock/936/936db5d4f91b46e3a601c8c64db6fbdf.jpg", "В змейку?"),
            new Card(5, "Пппринтер", "Canon", "https://silikonmold.ru/image/cache/catalog/2020/Iyli/1098.970-1200x1200.jpg", "Что печатаем?"),
            new Card(6, "Лачуга", "ООО Заповедник", "https://m.terem-pro.ru/upload/iblock/f50/f503b998a14db71227b0382f06b00c0a.jpg", "Мистер Старк?")
        ]
    );
}


function updateLocalStorage(cardsArray) {
    window.localStorage.clear();
    window.localStorage.setItem('cards', JSON.stringify(cardsArray));
    location.reload();
}


const handOutBtn = document.getElementById('handOutBtn');
handOutBtn.addEventListener('click', handOutCards);

window.onload = renderCards;