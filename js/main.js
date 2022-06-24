const gridParent = document.getElementById('grid-parent');
const startButton = document.getElementById('start-button');
const difficulty = document.getElementById('difficulty');
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
    const difficultyValue = difficulty.value
    //inizializzo il numero di bombe
    const newBombsNumber = 16;

    console.log(getNewRandomBombsArray(newBombsNumber, 1, difficultyValue));

    //aggiungo un reset per non generare box infiniti
    gridParent.innerHTML = '';
    //ciclo for per popolare la griglia con i nuovi box
    //il valore limite è dato dal value di select, impostato sul numero di caselle in base alla difficoltà
    for (let i = 1; i < difficultyValue; i++){
        let newDiv = generateNewBox(difficultyValue);
        newDiv.innerHTML = i;
        gridParent.append(newDiv);

        //creo l'evento per il quale al click dell'elemento viene aggiunta la classe active e viene rimossa pointer
        newDiv.addEventListener('click', function(){
            newDiv.classList.add('active');
            newDiv.classList.remove('pointer');
            console.log(`La casella clickata è la numero: ${i}`);
        })
    }
})