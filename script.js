
let board;
let score=0;
let rows=4;
let cols=4;

window.onload = function(){
    startGame();
}

function startGame(){
    board=[
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]
    for(let i=0; i<rows; i++){
        for(let j=0; j<cols; j++){
            let tiles=document.createElement("div"); // <div></div>
            tiles.id=i.toString()+"-"+j.toString(); // <div id="0-0"></div> for {0,0}
            let num=board[i][j];
            updateTile(tiles,num);
            document.getElementById("board").append(tiles)
        }
    }
}

function updateTile(tiles,num){
    tiles.innerText="";
    tiles.classList.value="";
    tiles.classList.add("tiles");
    if(num>0){
        tiles.innerText=num;
        if(num<=4096){
            tiles.classList.add("x"+num.toString());
        }
        else{
            tiles.classList.add("x8192");
        }
    }
}

document.addEventListener("keyup", (e)=>{
    if(e.code=="ArrowLeft"){
        leftKey();
        insertTwo();
    }
    else if(e.code=="ArrowRight"){
        rightKey();
        insertTwo();
    }
    else if(e.code=="ArrowUp"){
        upKey();
        insertTwo();
    }
    else if(e.code=="ArrowDown"){
        downKey();
        insertTwo();
    }
    document.getElementById("score").innerText = score;
})

function slide(row){
    row=row.filter(num=>num!=0);
    for(let i=0; i<row.length-1; i++){
        if(row[i]==row[i+1]){
            row[i]*=2;
            row[i+1]=0;
            score+=row[i];
        }
    }
    row=row.filter(num => num!=0);
    while(row.length<cols){
        row.push(0);
    }
    return row;
}

function leftKey(){
    for(let i=0; i<rows; i++){
        let row=board[i];
        row=slide(row);
        board[i]=row;
        for(let j=0; j<cols; j++){
            let tiles=document.getElementById(i.toString()+"-"+j.toString());
            let num=board[i][j];
            updateTile(tiles,num);
        }
    }
}

function rightKey(){
    for(let i=0; i<rows; i++){
        let row=board[i];
        row.reverse();
        row=slide(row);
        row.reverse();
        board[i]=row;
        for(let j=0; j<cols; j++){
            let tiles=document.getElementById(i.toString()+"-"+j.toString());
            let num=board[i][j];
            updateTile(tiles,num);
        }
    }
}
function transpose(){
    for(let i=0; i<rows; i++){
        for(let j=0; j<i; j++){
            const temp = board[i][j];
            board[i][j] = board[j][i];
            board[j][i] = temp;
        }
    }
    console.log(board);
}
function upKey(){
    transpose();
    for(let i=0; i<rows; i++){
        let row=board[i];
        row=slide(row);
        board[i]=row;
    }
    transpose();
    for(let i=0; i<rows; i++){
        for(let j=0; j<cols; j++){
            let tiles=document.getElementById(i.toString()+"-"+j.toString());
            let num=board[i][j];
            updateTile(tiles,num);
        }
    }
}
function downKey(){
    transpose();
    for(let i=0; i<rows; i++){
        let row=board[i];
        row.reverse();
        row=slide(row);
        row.reverse();
        board[i]=row;
    }
    transpose();
    for(let i=0; i<rows; i++){
        for(let j=0; j<cols; j++){
            let tiles=document.getElementById(i.toString()+"-"+j.toString());
            let num=board[i][j];
            updateTile(tiles,num);
        }
    }
}

function isEmpty(){
    for(let i=0; i<rows; i++){
        for(let j=0; j<cols; j++){
            if(board[i][j]==0){
                return true;
            }
        }
    }
    return false;
}
function check(){
    let flag=0;
    for(let i=0; i<rows; i++){
        for(let j=0; j<cols; j++){
            if(board[i][j]>=2048){
                flag=1;
                break;
            }
        }
    }
    if(flag===1){

        alert("your socre is "+score+". you won the game.");
    }
    else{
        alert("you lost the game");
    }
}


function insertTwo(){
    if(!isEmpty()){
        check();
    }
    while(true){
        let i=Math.floor(Math.random()*rows);
        let j=Math.floor(Math.random()*cols);
        if(board[i][j]==0){
            board[i][j]=2;
            let tiles=document.getElementById(i.toString()+"-"+j.toString());
            tiles.innerText=2;
            tiles.classList.add("x2");
            break;
        }
    }
}