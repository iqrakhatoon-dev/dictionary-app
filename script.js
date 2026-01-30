const btn = document.querySelector("button");
const form = document.querySelector("form");
const input = document.querySelector("input");
const resultCont = document.querySelector(".resultVal");

//Button Function
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  getWordInfo(input.value);
});

//fetching API Data
const getWordInfo = async (word) => {
  try {
    resultCont.innerHTML = "Searching...";
    let response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
    );
    let data = await response.json();
    let definition = data[0].meanings[0].definitions[0];

    //Adding Word, Parts of speech, Meaning and Example
    resultCont.innerHTML = `
   <h2><strong>Word: </strong>${data[0].word}</h2>
   <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
   <p><strong>Meaning: </strong>${definition.definition === undefined ? "Not Found" : definition.definition}</p>
   <p><strong>Example: </strong>${definition.example === undefined ? "Not Found" : definition.example}</p>
   <p><strong>Antonyms: </strong></p>
   `;

    //Adding Antonyms
    if (definition.antonyms.length === 0) {
      resultCont.innerHTML += `<span>Not Found</span>`;
    } else {
      for (let i = 0; i < definition.antonyms.length; i++) {
        resultCont.innerHTML += `<li>${definition.antonyms[i]}</li>`;
      }
    }

    //Adding Synonyms
    resultCont.innerHTML += `<p><strong>Synonyms: </strong></p>`;
    if (definition.synonyms.length === 0) {
      resultCont.innerHTML += `<span>Not Found</span>`;
    } else {
      for (let i = 0; i < definition.synonyms.length; i++) {
        resultCont.innerHTML += `<li>${definition.synonyms[i]}</li>`;
      }
    }

    //Adding Read More Button
    resultCont.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`;
  } catch (error) {
    resultCont.innerHTML = "Sorry, The word could not be found";
  }
};
