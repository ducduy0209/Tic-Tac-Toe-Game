const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Select all required elements
const selectBox = $('.select-box');
const selectXBtn = $('.playerX');
const selectOBtn = $('.playerO');
const playBoard = $('.play-board');
const allBox = $$('.play-area span');
const players = $('.players');

window.onload = () => {
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }

    selectXBtn.onclick = () => {
        selectBox.classList.add('hide');
        playBoard.classList.add('show');
    }
    selectOBtn.onclick = () => {
        selectBox.classList.add('hide');
        playBoard.classList.add('show');
        players.setAttribute("class", "players active player");
    }
}

let playerXIcon = "fas fa-times"; // Class name of fontawesome cross icon
let playerOIcon = "far fa-circle"; // Class name of fontawesome cricle icon
let playerSign = "X";
let runbot = true;

// user click function
const clickedBox = (element) => {
    if (players.classList.contains('player')) {
        element.innerHTML = `<i class="${playerOIcon}"></i>`
        players.classList.add('active');
        // If player select O then we'll change the playerSign value to O
        playerSign = "O";
        element.setAttribute('id', playerSign);
    } else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`
        players.classList.add('active');
        element.setAttribute('id', playerSign);
    }
    selectWinner();
    element.style.pointerEvents = 'none'; // once user select any box
    playBoard.style.pointerEvents = "none";
    let ramdomDelayTime = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(() => {
        bot();
    }, ramdomDelayTime);
}

// bot click function
const bot = () => {
    playerSign = "O";
    let array = [];
    for (let i = 0; i < allBox.length; i++) {
        if (allBox[i].childElementCount == 0) {
            array.push(i);
        }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)]; // Random index from array to bot select random
    if (array.length > 0) {
        if (players.classList.contains('player')) {
            playerSign = "X"; // passing the X value
            allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`
            allBox[randomBox].setAttribute('id', playerSign);
            players.classList.add('active');
        } else {
            allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`
            allBox[randomBox].setAttribute('id', playerSign);
            players.classList.remove('active');
        }
        selectWinner();
    }
    allBox[randomBox].style.pointerEvents = "none";
    playBoard.style.pointerEvents = "auto";
    playerSign = "X"; // passing the X value
}

// Let work on select the winner
const getIdVal = (classname) => {
    return document.querySelector(".box" + classname).id; //return id name
}

const checkIdSign = (val1, val2, val3, sign) => {
    if (getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign) {
        return true;
    }
}

const selectWinner = () => {
    if (checkIdSign(1, 2, 3, playerSign) || checkIdSign(4, 5, 6, playerSign) || checkIdSign(7, 8, 9, playerSign) || checkIdSign(1, 4, 7, playerSign) || checkIdSign(2, 5, 8, playerSign) || checkIdSign(3, 6, 9, playerSign) || checkIdSign(1, 5, 9, playerSign) || checkIdSign(3, 5, 7, playerSign)) {
        console.log(playerSign + " " + " win")
    }
}