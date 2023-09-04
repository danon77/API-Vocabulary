const word = document.querySelector(".word")
const meaning = document.querySelector(".meaning")
const example = document.querySelector(".sentence")
const input = document.querySelector(".input")
const button = document.querySelector(".button")
const volume = document.querySelector(".fa-volume-high")
const span = document.querySelector("span")
const transcription = document.querySelector(".transcription")
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
            span.textContent = item[0].meanings[0].partOfSpeech
            transcription.textContent = item[0].phonetic
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