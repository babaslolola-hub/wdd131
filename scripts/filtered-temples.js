const temples = [{
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
},
{
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
},
{
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
},
{
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
},
{
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
},
{
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
},
{
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
},
{
    templeName: "Salt Lake Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl: "https://www.churchofjesuschrist.org/imgs/42bce5bf1cadd2149285166cdc9ddd52ed00f62b/full/!1200,/0/default"
},
{
    templeName: "Accra Ghana",
    location: "Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 17500,
   imageUrl: "https://www.churchofjesuschrist.org/imgs/ea817531789318cff9d81198cdc39923708b7b79/full/!1200,/0/default"
},
{
    templeName: "Johannesburg South Africa",
    location: "Johannesburg, South Africa",
    dedicated: "1985, August, 24",
    area: 19000,
imageUrl: "https://www.churchofjesuschrist.org/imgs/e44b3c89b3485fa2f2c8aa09791d4334dfe23511/full/!1200,/0/default"
}
];

function displayTemples(templeList) {
    const album = document.querySelector(".album");
    album.innerHTML = "";
    templeList.forEach(temple => {
        const card = document.createElement("figure");

        card.innerHTML = `
            <h2>${temple.templeName}</h2>
            <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy">
           <p>${temple.location}</p>
           <p>Dedicated: ${temple.dedicated}</p>
           <p>Area: ${temple.area} sq ft</p>
        `;

        album.appendChild(card);
    });
}
const oldTemples = temples.filter(temple => parseInt(temple.dedicated) < 1900);
const newTemples = temples.filter(temple => parseInt(temple.dedicated) > 2000);
const largeTemples = temples.filter(temple => temple.area > 90000);
const smallTemples = temples.filter(temple => temple.area < 10000);
const navLinks = document.querySelectorAll("nav a");
navLinks[0].addEventListener("click", () => displayTemples(temples));
navLinks[1].addEventListener("click", () => displayTemples(oldTemples));
navLinks[2].addEventListener("click", () => displayTemples(newTemples));
navLinks[3].addEventListener("click", () => displayTemples(largeTemples));
navLinks[4].addEventListener("click", () => displayTemples(smallTemples));

displayTemples(temples);

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;

