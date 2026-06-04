//問題
const question = [
    {
        q: "貝",
        a: ["あ", "さ", "り"]
    },
    {
        q: "動物",
        a: ["ア", "シ", "カ"]
    },
    {
        q: "動物",
        a: ["ア", "ヒ", "ル"]
    },
    {
        q: "動物",
        a: ["イ", "タ", "チ"]
    },
];

//top画面
const scenetop = document.querySelector("#start");
//game画面
const scecegame = document.querySelector("#game");
//正解不正解表示画面
const next = document.querySelector("#next");
const field = document.querySelector("#field");
const select = document.querySelectorAll(".select");
const answer = document.querySelectorAll(".answer");

//選択された答えを順番に格納
let answers = [];
//問題番号を管理
let questionnum = 0;


init();
function init() {
    changescene(scecegame, scenetop);
    scenetop.addEventListener('click', gamestart, false);
}

function changescene(hiddenscene, visiblescene) {
    hiddenscene.classList.add("is-hidden");
    hiddenscene.classList.remove("is-visible");
    visiblescene.classList.add("is-visible");
}

function gamestart() {
    changescene(scenetop, scecegame);
    showQuestion()
}

// 【JavaScript】配列の要素をランダムに表示する(ブックマーク)を応用して追加
function shuffle(array) {
    for(let i = (question.length - 1); i > 0; i--) {
        const j = Math.floor(Math.random() * (i - 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// クイズ開始時に選択肢をシャッフル
shuffle(question);

//並べ替えクイズの処理
function showQuestion() {
    //答えを格納している配列を初期化
    answers.length = 0; 
for (let i = 0; i < 3; i++) {
    answer[i].textContent = "";
}

    //問題の解答シャッフル Fisher–Yatesアルゴリズムを用いる
    //値渡しコピーで配列に代入
    let shufflea = question[questionnum].a.concat(); 
    for (let i = shufflea.length - 1; i > 0; i--) {
        let r = Math.floor(Math.random() * (i + 1));
        let tmp = shufflea[i];
        shufflea[i] = shufflea[r];
        shufflea[r] = tmp;
    }

    //問題文挿入
    document.querySelector("h1").textContent = question[questionnum].q;
    //回答選択肢挿入
for (let i = 0; i < shufflea.length; i++) {

    select[i].classList.remove("used");
    select[i].classList.remove("is-hidden");

    select[i].textContent = shufflea[i];
}

let count = 0;

for (let i = 0; i < shufflea.length; i++) {

    select[i].onpointerdown = () => {

        if (select[i].classList.contains("used")) return;

        answer[count].textContent = select[i].textContent;

        answers.push(select[i].textContent);

        select[i].classList.add("used");

        count++;

        if (count === shufflea.length) {
            count = 0;
            Judgment();
        }

    };

}
}

//正解かどうか判定
function Judgment() {
    changescene(scecegame, next);
    if (JSON.stringify(question[questionnum].a) == JSON.stringify(answers)) {
        next.innerHTML = "<p style='font-size:3em;color:#008000;'>バッチリ😄　です！</p><button onclick='nextquestion()'>次に　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　進みます！</button>";

    } else {
        next.innerHTML = "<p style='font-size:3em;color:#008080;'>オーケー😊　です！</p><button onclick='nextquestion()'>次に　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　進みます！</button>";
    }
}

//次の問題ボタンが押された時の処理
function nextquestion() {
    questionnum++
    if (Object.keys(question).length > questionnum) {
        changescene(next, scecegame);
        showQuestion();
    } else {
        questionnum = 0;
        changescene(next, scecegame);
        showQuestion();
    }
}
