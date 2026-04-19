let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0; // 🔥 to track draw

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");

    boxes.forEach((box) => {
        box.innerText = "";
        box.classList.remove("O", "X", "win"); // 🔥 remove all styles
    });
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {

        if (box.innerText !== "") return;

        if (turnO) {
            box.innerText = "O";
            box.classList.add("O");
            turnO = false;
        } else {
            box.innerText = "X";
            box.classList.add("X");
            turnO = true;
        }

        box.disabled = true;
        count++;

        checkWinner();
    });
});

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
    });
};

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const showWinner = (winner) => {
    msg.innerText =  `congrats🎉 Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showDraw = () => {
    msg.innerText = "🤝 Match Draw!";
    msgContainer.classList.remove("hide");
};

const checkWinner = () => {
    let isWinner = false;

    for (let pattern of winPatterns) {

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {

                // 🟩 highlight winning boxes
                boxes[pattern[0]].classList.add("win");
                boxes[pattern[1]].classList.add("win");
                boxes[pattern[2]].classList.add("win");

                showWinner(pos1Val);
                isWinner = true;
            }
        }
    }

    // 🤝 draw condition
    if (count === 9 && !isWinner) {
        showDraw();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", () => window.location.reload());