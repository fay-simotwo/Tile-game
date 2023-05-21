const  boxes = document.querySelectorAll('.box');
let boxOne, boxTwo;

function flipBox(e){
    let clickedBox = e.target;
    
    if(clickedBox== boxOne){
        clickedBox.classList.add('flip');

        if(!boxOne){
            return boxOne = clickedBox;
        }

        boxTwo = clickedBox;
    }
}
boxes.forEach(box=>{
    box.addEventListener('click', flipcard);
})