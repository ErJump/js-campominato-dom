const gridParent = document.getElementById('grid-parent');
const startButton = document.getElementById('start-button');
const difficulty = document.getElementById('difficulty');
//creo una funzione per generare un nuovo div con classe box
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

//creo l'evento per il quale si genera la griglia
startButton.addEventListener('click', function(){
    const difficultyValue = difficulty.value
    console.log(difficultyValue);
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