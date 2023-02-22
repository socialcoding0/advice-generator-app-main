// 1-224

const turn = document.querySelector("#turn");
const adviceLine = document.querySelector(".advice-line");
const adviceId = document.querySelector(".advice-id");
const content = document.querySelector(".content");

turn.addEventListener("click", function () {
    let rand = Math.random(1);
    let totalLenght = 224;
    let randIndex = Math.floor(rand * totalLenght);
    // console.log(randIndex);
    turn.classList.add("turn-effect");
    content.classList.add("content-effect");


    setTimeout(() => {
        turn.classList.remove("turn-effect");
        content.classList.remove("content-effect");
    }, 6000);

    setTimeout(() => {
        getAdvice(randIndex);
    }, 5000);
});



async function getAdvice(randIndex) {


    try {
        let url = await fetch(`https://api.adviceslip.com/advice/${randIndex}`);
        // console.log(url);

        if (url.ok) {
            let data = await url.json();
            if (data.hasOwnProperty("slip")) {
                let slip = data.slip;
                // console.log(slip);
                return displayAdvice(slip.advice, slip.id);
            }



            let message = data.message.text;
            throw message;
        }
    }
    catch (err) {
        // console.log(err);
        adviceLine.textContent = ` ❝ ${err} ❞`;
        adviceId.textContent = "# ---";
    }


    // displayAdvice(data.slip.advice, data.slip.id);
}



function displayAdvice(advice, dataId) {
    adviceLine.textContent = "";
    let p = `<p class="advice">❝ ${advice} ❞</p>`;
    adviceLine.insertAdjacentHTML("beforeend", p);

    adviceId.textContent = ""
    let span = `<span> #${dataId} </span>`;
    adviceId.insertAdjacentHTML("beforeend", span);

}