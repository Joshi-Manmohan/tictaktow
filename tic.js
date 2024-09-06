console.log("Welcome Enter The Game");
let music= new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let Gameover= new Audio("Gameover.mp3");
let turn = "X";
let isGameover = false;

//function to change the turn
const changeTurn = ()=>{
    return turn === "X"? "0" : "X";
};

//function to check for win
const checkwin =()=>{
    let boxtext=document.getElementsByClassName('boxtext');
    let wins=[
        [0,1,2, 5,5,0],
        [3,4,5, 5,15,0],
        [6,7,8, 5,25,0],
        [0,3,6, -5,15,90],
        [1,4,7, 5,15,90],
        [2,5,8, 15,15,90],
        [0,4,8, 5,15,45],
        [2,4,6, 5,15,135],
    ];

    wins.forEach(e =>{
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && ((boxtext[e[2]].innerText===boxtext[e[1]].innerText)) &&(boxtext[e[0]].innerText !=="")){
            document.querySelector('.info').innerText=boxtext[e[0]].innerText + "Won";
            isGameover = true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width="200px";
            Gameover.play();
            music.pause();
            document.querySelector(".line").style.transform = `translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "20vw";
        }
    });
};

// function to play the turn of sound
const playTurnSound = () => {
    return new Promise(resolve => {
        audioTurn.currentTime =0;
        audioTurn.play();
        audioTurn.onended = resolve; //resolve the promice when sound finish
    })
}

//Game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click',()=>{
        if(boxtext.innerText ===''  && !isGameover) {
            boxtext.innerText = turn; 
            boxtext.style.color = turn === "X" ? "yellow" : "green";
            playTurnSound();
            turn=changeTurn();
            audioTurn.play();
            checkwin();
            if(!isGameover){
                music.play()
                document.getElementsByClassName("info")[0].innerText = "Turn For " + turn;
                
            }
        }
    });
});

//all onclick listener to reset button
reset.addEventListener('click',()=>{
    let boxtexts = document.querySelectorAll('.boxtext'); 
    Array.from(boxtexts).forEach(element =>{
        element.innerText=""
        element.style.color= "black";
    });
    turn = "X";
    isGameover = false;
    document.getElementsByClassName("info")[0].innerText = "Turn For " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width="0px";
    document.querySelector(".line").style.width = "0vw";
    
    music.pause();
    music.currentTime = 0;
    playTurnSound.pause();
    
  
});