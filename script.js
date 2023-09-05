const word = document.querySelector(".word")
const meaning = document.querySelector(".meaning")
const example = document.querySelector(".sentence")
const input = document.querySelector(".input")
const button = document.querySelector(".button")
const volume = document.querySelector(".fa-volume-high")
const info = document.querySelector(".word-info")
const sound = new Audio()

function getWord(str) {
    let url = "https://api.dictionaryapi.dev/api/v2/entries/en/"
    if (input.value === "") {
        url += str
    }
    else {
        url += input.value
    }

    fetch(url)
        .then(data => data.json())
        .then(item => {
            console.log(item)
            word.textContent = item[0].word
            //Виводимо всі мінінгси
            for (let i = 0; i < (item[0].meanings).length; i++) {
                let div = document.createElement("div")
                div.textContent = item[0].meanings[i].partOfSpeech
                div.classList.add("red")
                info.appendChild(div)

                for (let j = 0; j < (item[0].meanings[i].definitions).length; j++) {
                    let div1 = document.createElement("div")
                    div1.textContent = item[0].meanings[i].definitions[j].definition
                    div1.classList.add("green")
                    info.appendChild(div1)
                }
            }
            //span.textContent = item[0].meanings[0].partOfSpeech
            //transcription.textContent = item[0].phonetic
            meaning.textContent = item[0].meanings[0].definitions[0].definition
            example.textContent = item[0].meanings[0].definitions[0].example

            volume.addEventListener("click", function() {
                sound.src = item[0].phonetics[0].audio
                sound.play()
            })
        })
}

getWord("hello")

button.addEventListener("click", getWord)