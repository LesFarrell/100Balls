/**
 * Created by Les Farrell on 19/11/13.
 */
var canSurface;
var context;
var blnFirstMove = false;
var intMouseX, intMouseY;
var Board = new Array(10);
var imgBalls = new Image();
var sndBadMove = new Audio("badmove.wav");
var sndMove = new Audio("move.wav");

imgBalls.ready = false;
imgBalls.onload = setAssetReady;
imgBalls.src = "Balls.png";

var preloader = setInterval(preload, 250);


function setAssetReady()
{
    this.ready = true;
}


function preload()
{
    if (imgBalls.ready)
    {
        clearInterval(preloader);
        InitialiseGame();
    }
}


/*
 function getMousePos(canvas, evt)
 {
 var rect = canvas.getBoundingClientRect();
 return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
 }
 */

function getMousePosition(e)
{
    var x;
    var y;

    if (e.pageX != undefined && e.pageY != undefined) {
        x = e.pageX;
        y = e.pageY;
    }
    else {
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    x -= canSurface.offsetLeft;
    y -= canSurface.offsetTop;

    return { x: x, y: y };
}


function InitialiseGame()
{
    for (var i = 0; i < 10; i++)
    {
        Board[i] = [0,0,0,0,0,0,0,0,0,0];
    }

    canSurface = document.getElementById("surface");
    context = canSurface.getContext("2d");

    ResetBoard();
    DrawScreen();
    canSurface.addEventListener('click', function(evt)
    {
        var mousePos = getMousePosition(evt);
        intMouseX = parseInt(mousePos.x / 32);
        intMouseY = parseInt(mousePos.y / 32);
        CheckMove();
    }, false);

}


function CheckMove()
{
    if ((Board[intMouseX][intMouseY] === 0 && blnFirstMove === true) || Board[intMouseX][intMouseY] === 2)
    {
        blnFirstMove = false;
        Board[intMouseX][intMouseY] = 1;
        sndMove.play();
        ShowValidMoves();
        DrawScreen();
    }
    else
    {
	sndBadMove.play();
    }
}


function ResetBoard()
{
    blnFirstMove = true;

    for ( var x = 0; x < 10; x++)
    {
        for ( var y = 0; y < 10; y++)
        {
            Board[x][y] = 0;
        }
    }
}


function DrawScreen()
{
    var x , y;
    var blnGameOver = true;
    var intBallsFilled = 0;

    context.fillStyle = 'black';
    context.fillRect(0, 0, 320, 320);

    for(x = 0; x < 10; x++)
    {
        for( y = 0; y < 10; y++)
        {
            if (Board[x][y] === 0)
            {
               context.drawImage(imgBalls, 0,0,32,32,x * 32, y * 32,32,32);
            }

            if (Board[x][y] === 1)
            {
                context.drawImage(imgBalls, 32,0,32,32,x * 32, y * 32,32,32);
                intBallsFilled++;
            }

            if (Board[x][y] === 2)
            {
                context.drawImage(imgBalls, 64,0,32,32,x * 32, y * 32,32,32);
                blnGameOver = false;
            }
        }
    }

    if (intBallsFilled === 100)
    {
        alert("Congratulations you did it, but can you do it again?");
        ResetBoard();
        DrawScreen();
    }

    if (blnGameOver === true && blnFirstMove === false)
    {
        alert("Sorry no moves left!");
        ResetBoard();
        DrawScreen();
    }
}


function ShowValidMoves()
{
    for (var x = 0; x < 10; x++)
    {
        for (var y = 0; y < 10; y++)
        {
            if (Board[x][y] === 2) Board[x][y] = 0;
        }
    }

    if (intMouseX - 3 >= 0)
    {
        if (Board[intMouseX - 3][intMouseY] === 0)
        {
            Board[intMouseX - 3][intMouseY] = 2;
        }
    }

    if (intMouseX + 3 <= 9)
    {
        if (Board[intMouseX + 3][intMouseY] === 0)
        {
            Board[intMouseX + 3][intMouseY] = 2;
        }
    }

    if (intMouseY - 3 >= 0)
    {
        if (Board[intMouseX][intMouseY - 3] === 0)
        {
            Board[intMouseX][intMouseY - 3] = 2;
        }
    }

    if (intMouseY + 3 <= 9)
    {
        if (Board[intMouseX][intMouseY + 3] === 0)
        {
            Board[intMouseX][intMouseY + 3] = 2;
        }
    }

    if (intMouseX + 2 <= 9 && intMouseY - 2 >= 0)
    {
        if (Board[intMouseX + 2][intMouseY - 2] === 0)
        {
            Board[intMouseX + 2][intMouseY - 2] = 2;
        }
    }

    if (intMouseX - 2 >= 0 && intMouseY + 2 <=9)
    {
        if (Board[intMouseX - 2][intMouseY + 2] === 0)
        {
            Board[intMouseX - 2][intMouseY + 2] = 2;
        }
    }

    if (intMouseX - 2 >= 0 && intMouseY - 2 >= 0)
    {
        if (Board[intMouseX - 2][intMouseY - 2] === 0)
        {
            Board[intMouseX - 2][intMouseY - 2] = 2;
        }
    }

    if (intMouseX + 2 <= 9 && intMouseY + 2 <= 9)
    {
        if (Board[intMouseX + 2][intMouseY + 2] === 0)
        {
            Board[intMouseX + 2][intMouseY + 2] = 2;
        }
    }
}



