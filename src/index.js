console.log('%c HI', 'color: firebrick')
const imgUrl = 'https://dog.ceo/api/breeds/image/random/4'
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const dogBreeds = breedList()

document.addEventListener('DOMContentLoaded', event => {
 randomDogImages();   
 breedList();
 document.querySelector('#breed-dropdown').addEventListener('change', dropDownHandler)
})
function dropDownHandler(event){
    console.log(event.target.value)
    let newBreed = dogBreeds.filter(breed =>{
        return breed[0] === event.target.value
    })

    renderBreedList(newBreed)
}

function randomDogImages(){
    fetch(imgUrl)
    .then(resp => resp.json())
    .then(json => {
        let container = document.querySelector('#dog-image-container');
        for(randImg of json.message){

            let img = document.createElement('img')
            img.src = randImg;
            container.appendChild(img);
        }
    })
}

function breedList(){
    let arr = []
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(json => {
        for(breed in json.message){

            if (json.message[breed].length === 0){
                arr.push(breed)
            }else {
                for(prefix of json.message[breed]){
                    arr.push(`${prefix} ${breed}`)
                }

            }
        }
        renderBreedList(arr)
    })
    return arr;
}

function renderBreedList(breeds){

    let breeding = document.querySelector('#dog-breeds')
    breeding.textContent = ''
    for(breed of breeds){
        let li = document.createElement('li')
        li.innerText = breed
        li.addEventListener('click', event => {
            li.style.color = "purple"
        })
        breeding.appendChild(li);
    }
}


