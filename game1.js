function load_images() 
{
    enemy_image = new Image;
    enemy_image.src = "bomb.png";
    
    player_image = new Image;
    player_image.src = "player_img.png";
}

function isOverlap(rect1,rect2)
{
   if (rect1.x < rect2.x + rect2.w && rect1.x + rect1.w > rect2.x &&
   rect1.y < rect2.y + rect2.h && rect1.y + rect1.h > rect2.y)
   {
   return true; // collision detected!
   }
   return false;
}

function StartJump()     // properly designed now
{   
    if(player.onGround)
    {
        console.log("Pressed");
        player.velocityY = -40; //acceleration
        player.onGround = false;
    }
}         


function init() 
{
    canvas = document.getElementById("mycanvas");
    console.log(canvas);

    W = 600;
    H = 400;
    
    minHeight = 20;
    maxHeight = 200;
    
    canvas.width = W;
    canvas.height = H;
    game_over = "false";
    
    pen = canvas.getContext('2d');
    console.log(pen);

    e1 = {
        x: 200,
        y: H-55,
        w: 30,
        h: 55,
    };
    
    e2 = {
        x: 500,
        y: H-55,
        w: 30,
        h: 55,
    }; 
   
    
    
    enemy = [e1, e2 ]; // array of enemies
    
    player = {
    
         x : 20,
         y : H-75,
         w : 35,
         h : 90, 
         velocityY : 0,
       // velocityX : 0,
         gravity : 13,
         onGround : true,
         //moving : "false",
         score : 0,
         lives : 3,
    };
}

function draw() 
{
    pen.clearRect(0, 0, W, H);
    pen.fillStyle = "green";
     
    pen.drawImage(player_image,player.x,player.y,player.w,player.h);
      
    for (let i = 0; i < enemy.length; i++) 
    { 
        pen.drawImage(enemy_image, enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h);
    }
    pen.fillStyle = "aqua";
    pen.font = "30px roboto";
    pen.fillText("Score : " + player.score,20,30);
    pen.fillText("lives : " + player.lives,480,30);
    
}

function update() 
{
    
    for( let i = 0; i < enemy.length; i++)
        {
            if(isOverlap(player,enemy[i]))
              {   
                  player.x +=66;
                  player.lives -= 1; 
              }
            if(player.lives < 1)
                {
                    console.log(player.lives);
                    game_over = true;                    
                }
        }
    
    for(let i = 0; i < enemy.length ;i++)
    {
                enemy[i].x -= 10;
    }
    
    for(let i = 0; i < enemy.length ;i++)
    {
                if(enemy[i].x < -50)
                {
                   enemy[i].x = 600;  
                   player.score +=2 ;                    
                }
    }
    
    player.y += player.gravity;
    player.y += player.velocityY;
    if(player.y < 260)
        {
         player.velocityY += 4;  //retardation    
        }
        
    
    if(player.y > 325)
    {
        player.y = 325;
        player.velocityY = 0.0;
        player.onGround = true;
    }
    
}

function gameloop()
{
    if(game_over == true)
        {   
            console.log("In vicky");
            alert( "Game_Over : lives = " + player.lives +"\nHigh Score = " + player.score+2 + "\nYour Score = " + player.score );
            clearInterval(f);
        }
    draw();
    update();
    console.log("In gameloop");
}

load_images();
init();
var f = setInterval(gameloop, 50);
