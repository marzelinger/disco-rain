var game_state = false
var currTime = 0
var numRain = 5
var sizeRange = 30
var speedRange = 0
function setup(){
    createCanvas(windowWidth, windowHeight)
    time()
}

function ball(){
    this.radius = Math.floor(Math.random()*20 + sizeRange)
    this.xloc = Math.random()*windowWidth
    this.yloc = 0
    this.speed = Math.random() + speedRange
    this.r = Math.random()*255
    this.g = Math.random()*255
    this.b = Math.random()*255
    this.display = function(){
        fill(this.r,this.g,this.b)
        ellipse(this.xloc,this.yloc,this.radius,this.radius)
    }
}
var a1 = Math.random()*255
var a2 = Math.random()*255
var a3 = Math.random()*255
var rain = []
function draw(){
    if(!game_state){
    clear()
    if (frameCount % 60 == 0){
        if(rain.length==0){
        console.log("won")
        }
        for(var i = 0; i <numRain; i ++){
            rain.push(new ball())
        }
    }
    var finished = rain.length
    for(var i = 0; i< finished;i++){
        rain[i].display()
        rain[i].yloc += rain[i].speed
        if(rain[i].yloc > windowHeight+ 25){
            rain.splice(i,1)
            i = i-1
            lose()
            break
        }
        // console.log("mouse is at" + mouseX + " ball is at: " + rain[i].xloc)
        if(Math.abs(mouseX - Math.round(rain[i].xloc))<= rain[i].radius && Math.abs(mouseY - Math.round(rain[i].yloc)) <= rain[i].radius){
            rain.splice(i,1)
             i = i-1
        }
        finished = rain.length
    }
    textAlign(CENTER);
    textSize(60)
    fill(255)
    rect(15, 53, 70, 50)
    fill(0)
    text(`${currTime}`, 50, 100)
    
    }
    else{
    for(var i = 0; i < rain.length; i ++){
        rain[i].display()
    }
    fill(a1,a2,a3)
    rect(windowWidth/2-190, windowHeight/2-100, 400, 100)
    fill(255-a1, 255-a2, 255-a3)
    textSize(60)
    text("YOU LOST", windowWidth/2, windowHeight/2-25)
    
    
    }
}


function lose(){
    // for(var i = 0; i < rain.length; i ++){
    //     rain[i].speed = 0
    // }
    game_state = true
    
}
function time(){
console.log("here")
    var timer = setInterval(function(){
    currTime = currTime + 1
    checkLevel(currTime)
    },1000)
}

function checkLevel(time){
    if(time>=10 && time < 20){
        sizeRange = 27
        numRain = 10
    }
    else if(time >=20 && time < 30){
        numRain = 13
        sizeRange = 25
    }
    else if(time >= 20 && time < 30){
        numRain = 11
        sizeRange = 23
    }
    else if(time >= 40 && time < 50){
        numRain = 9
        sizeRange = 21
    }
    else if(time >= 20){
        speedRange = speedRange + .01
    }
    
}