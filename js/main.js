const gridParent = document.getElementById('grid-parent');
const startButton = document.getElementById('start-button');
const difficulty = document.getElementById('difficulty');
const clickCounter = document.getElementById('click-counter');

const victoryElement = document.getElementById('victory-element');
const defeatElement = document.getElementById('defeat-element');
const victoryCounter = document.getElementById('victory-counter');
const defeatCounter = document.getElementById('defeat-counter');

//generara un nuovo div con classe box e classe basata sulla difficoltà
function generateNewBox (difficultySelection){
    let item = document.createElement('div');
    item.classList.add('box' , 'pointer');
    //stabilisco le condizioni per assegnare le dimensione dei box tramite diverse classi
    if (difficultySelection == 101){
        item.classList.add('easy-box');
    } else if (difficultySelection == 82){
        item.classList.add('medium-box');
    } else if (difficultySelection == 50){
        item.classList.add('hard-box');
    }
    return item;
}

//ritorna un array di numeri randomici unici dati la lunghezza desiderata dell'array, un minimo e un massimo
function getNewRandomBombsArray (bombsNumber, min, max){
    let blackList = [];
    console.log(blackList);
    let arrayBombs = [];
    for (let i = 0; i < bombsNumber; i++ ){
        let newBomb = generateUniqueRandomNumber(blackList, min, max);
        arrayBombs.push(newBomb);
    }
    return arrayBombs;
}

//controlla se il numero randomico generato è unico nell'array
function generateUniqueRandomNumber (blackList, min, max){
    let newRandomNumber; 
    let isNumberValid = false;
    //finchè il numero non è valido
    while(isNumberValid === false){
        //creiamo un nuovo numero
        newRandomNumber = getRandomNumber(min, max)
        //se non è presente
        if (!blackList.includes(newRandomNumber)){
            isNumberValid = true;
            blackList.push(newRandomNumber);
        }
    }
    return newRandomNumber;
}

//genera un numero randomico
function getRandomNumber (min , max){
    randomNumber = Math.floor(Math.random() * (max - min) + min);
    return randomNumber;
}

//creo l'evento per il quale si genera la griglia
startButton.addEventListener('click', function(){
    //aggiungo i reset
    gridParent.innerHTML = '';
    clickCounter.innerHTML = '';

    //reset schermata di vittoria e sconfitta
    victoryElement.classList.add('hidden');
    defeatElement.classList.add('hidden');

    //inizializzo il contatore punteggio
    let clickCounterValue = 0;
    const difficultyValue = difficulty.value
    const newBombsNumber = 16;

    let bombsArray = getNewRandomBombsArray(newBombsNumber, 1, difficultyValue);
    console.log(bombsArray);

    //ciclo for per popolare la griglia con i nuovi box
    //il valore limite è dato dal value di select, impostato sul numero di caselle in base alla difficoltà
    for (let i = 1; i < difficultyValue; i++){
        let newDiv = generateNewBox(difficultyValue);
        newDiv.innerHTML = i;
        gridParent.append(newDiv);

        //creo l'evento per il quale al click dell'elemento viene aggiunta la classe active e viene rimossa pointer
        newDiv.addEventListener('click', function(){
            //ad ogni click il contatore aumenta di uno
            clickCounterValue += 1;
            clickCounter.innerHTML = clickCounterValue;
            newDiv.classList.add('active');
            newDiv.classList.remove('pointer');
            console.log(`La casella clickata è la numero: ${i}`);

            //condizione di sconfitta
            if (bombsArray.includes(i)){
                newDiv.classList.add('bomb');
                setTimeout(function(){ 
                    defeatElement.classList.remove('hidden');
                    gridParent.innerHTML = '';
                    defeatCounter.innerHTML = clickCounterValue; 
                    clickCounter.innerHTML = '';
                }, 1000); 
                defeatCounter.innerHTML = clickCounterValue; 
            }

            //condizione di vittoria
            if (clickCounterValue == (gridParent.children.length - bombsArray.length)){
                victoryElement.classList.remove('hidden');
                gridParent.innerHTML = '';
                victoryCounter.innerHTML = clickCounterValue;
            }
        })
    }
})

