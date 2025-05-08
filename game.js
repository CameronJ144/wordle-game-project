// starter variables needed for game to work
let group = 0; // section selected, and section they are on.
let guess = 0; // box selected, and the letter they are on.
let finished = false;
let validWord = false;
let attempts = 0;
let done = false;
let pause = false;
let active = false;
let finishedScreen = false;
//words needed for this game 
let keyboardLetter = ["Q","W","E","R","T","Y","U","I","O","P"
,"A","S","D","F","G","H","J","K","L","ENTER","Z","X","C","V","B","N","M","DELETE"]; //alphabet for buttons
let maybeWords = [
"apple", "bread", "chair", "dance", "eagle", "flour", "green", "house", "irony", "jelly",
"kneed", "light", "mirth", "night", "olive", "party", "quilt", "round", "score", "taste",
"union", "vivid", "water", "xyloh", "zebra", "brave", "cloud", "dream", "earth", "frost",
"glove", "happy", "ideal", "juicy", "knots", "laugh", "magic", "north", "ocean", "peace", 
"river", "sheep", "tiger", "unity", "voice", "world", "xerox", "youth", "zesty", "quiet"
]; //all words for this wordle game

let container = document.getElementById("container");
let randomNum = Math.floor(Math.random() * 49); //randomizer to pick a word
let selectedWord = maybeWords[randomNum]; //selected word for the game
console.log(selectedWord);

// This section is for everything needed to create textboxs 

for(let i=0;i<6;i++){ //for loop to create sections for each guess
    let div = document.createElement("div"); //create a new div each loop
    div.id = "section" + [i]; //gives that div a id for that section
    div.className = "section-divs" //class to style every div
    container.appendChild(div)
    for(let j=0;j<5;j++){ // for loop to create a div for each letter
        let section = document.getElementById("section"+ [i]);
        let div = document.createElement("div"); // creating a new div every loop
        div.className = "textbox-divs" //class to style divs
        div.id = "section" + [i] + "-box" + [j];
        section.appendChild(div);
        if(j == 4 && i == 5){ //if both loops are on the last run it adds additional space on the bottom
            section5.style.marginBottom = "1%"
        }
        if(j == 0 && i == 0){ // if both loops are just beginning it adds additional space on top
            section0.style.marginTop = "3%"
        }
    }
}





// This section is to create the keyboard section of the game
let keyboard = document.getElementById("keyboard");
for(let i=0;i<3;i++){
    let div = document.createElement("div");
    div.id = "board" + [i];
    keyboard.appendChild(div);
    let board = document.getElementById("board" + [i]);
    if(i == 0){
        for(let i=0;i<10;i++){
            let button = document.createElement("button");
            button.innerHTML = keyboardLetter[i];
            button.className = "buttons";
            button.addEventListener("click",addLetter);
            board.appendChild(button);

        }
    }else if(i == 1){
        for(let i=10;i<19;i++){
            let button = document.createElement("button");
            button.innerHTML = keyboardLetter[i];
            button.className = "buttons";
            button.addEventListener("click",addLetter);
            board.appendChild(button);
        }
    }else{
        for(let i=19;i<28;i++){
            let button = document.createElement("button");
            button.innerHTML = keyboardLetter[i];
            button.className = "buttons";
            if(i == 19 || i == 27){
                button.id = "wordButton";
            }
            button.addEventListener("click",addLetter);
            board.appendChild(button);
        }
    }
}
for(let i=0;i<3;i++){
    let board = document.getElementById("board" + [i]);
    board.style.display = "flex";
}



// This section is to add letters to those textboxes
function addLetter(){
    let section = document.getElementById("section" + [group] + "-box" + [guess]);
    if(finished == false){
        if(group == 6){
            finished = true;
        }else{
            if(this.innerHTML == "ENTER" || this.innerHTML == "DELETE"){
                if(this.innerHTML == "ENTER"){
                    if(guess != 5){
                        console.log("must fill ever box");
                    }else{
                        if(group == 6){
                            finished = true;
                        }else{
                            let word = "";
                            for(let i=0;i<5;i++){
                                section = document.getElementById("section" + [group] + "-box" + [i]);
                                word += section.innerHTML
                            }
                            for(let i=0;i<validWords.length;i++){
                                if(word == validWords[i].toUpperCase()){
                                    attempts += 1;
                                    guess = 0;
                                    validWord = true;
                                }
                            }
                            if(validWord == true){
                                let correct = 0;
                                    let selectedWordDict = {};
                                    let wordDict = {};
                                    selectedWord = selectedWord.toUpperCase();
                                    for(let i=0;i<word.length;i++){
                                        selectedWordDict[selectedWord[i]] = 0;
                                        wordDict[word[i]] = 0;
                                    }
                                    for(let i=0;i<word.length;i++){
                                        selectedWordDict[selectedWord[i]] += 1;
                                        wordDict[word[i]] += 1;
                                    }
                                    for(let i=word.length-1;i>=0;i--){
                                        if(word[i] != selectedWord[i]){
                                            if(selectedWord.includes(word[i])){
                                                if(wordDict[word[i]] != selectedWordDict[word[i]]){
                                                    wordDict[word[i]] -= 1;
                                                    section = document.getElementById("section" + [group] + "-box" + [i]);
                                                    section.style.backgroundColor = "rgb(64,64,64)";
                                                    section.style.border = "2.2px solid rgb(64,64,64)";
                                                }else{
                                                    section = document.getElementById("section" + [group] + "-box" + [i]);
                                                    section.style.backgroundColor = "#b59f3b";
                                                    section.style.border = "2.2px solid #b59f3b";
                                                }
                                            }else{
                                                section = document.getElementById("section" + [group] + "-box" + [i]);
                                                section.style.backgroundColor = "rgb(64,64,64)";
                                                section.style.border = "2.2px solid rgb(64,64,64)";
                                            }
                                        }else{
                                            section = document.getElementById("section" + [group] + "-box" + [i]);
                                            section.style.backgroundColor = "#538d4e";
                                            section.style.border = "2.2px solid #538d4e"
                                            correct += 1;
                                            if(correct == 5){
                                                if(group != 6){
                                                    let timer = setInterval(function(){
                                                        let div = document.createElement("div");
                                                        div.id = "finished-div";
                                                        body.insertBefore(div,document.getElementsByTagName("nav")[0]);
                                                        h2 = document.createElement("h2");
                                                        h2.innerHTML = "Thanks for Playing!\n \tYou have finished!";
                                                        let div1 = document.createElement("div");
                                                        div1.id = "div1"
                                                        div1.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg>'
                                                        div1.addEventListener("click",function(){
                                                            document.getElementById("finished-div").remove();
                                                            body.style.backgroundColor = "rgb(16,16,16)";
                                                        })
                                                        div.appendChild(div1);
                                                        div.appendChild(h2);
                                                        body.style.backgroundColor = "black";
                                                        clearInterval(timer);
                                                    },"1000");
                                                    let div2 = document.createElement("div");
                                                    div2.id = "selectedWord"
                                                    let p = document.createElement("p");
                                                    p.innerHTML = selectedWord.toUpperCase();
                                                    div2.appendChild(p);
                                                    body.insertBefore(div2,document.getElementsByTagName("nav")[0]);
                                                    let timer1 = setInterval(function(){
                                                        //document.getElementById("selectedWord").remove();
                                                        clearInterval(timer1)
                                                    },"2000")
                                                }
                                            }
                                            finished = true;
                                            finishedScreen = true;
                                        }
                                    }
                                group += 1;
                                if(group == 6){
                                    if(finishedScreen != true){
                                        finished = true;
                                        let timer = setInterval(function(){
                                            let div = document.createElement("div");
                                            div.id = "finished-div";
                                            body.insertBefore(div,document.getElementsByTagName("nav")[0]);
                                            h2 = document.createElement("h2");
                                            h2.innerHTML = "Thanks for Playing!\n \tYou have finished!";
                                            let div1 = document.createElement("div");
                                            div1.id = "div1"
                                            div1.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg>'
                                            div1.addEventListener("click",function(){
                                                document.getElementById("finished-div").remove();
                                                body.style.backgroundColor = "rgb(16,16,16)";
                                            })
                                            div.appendChild(div1);
                                            div.appendChild(h2);
                                            body.style.backgroundColor = "black";
                                            clearInterval(timer);
                                        },"1000");
                                        let div2 = document.createElement("div");
                                        div2.id = "selectedWord"
                                        let p = document.createElement("p");
                                        p.innerHTML = selectedWord.toUpperCase();
                                        div2.appendChild(p);
                                        body.insertBefore(div2,document.getElementsByTagName("nav")[0]);
                                        let timer1 = setInterval(function(){
                                            //document.getElementById("selectedWord").remove();
                                            clearInterval(timer1)
                                        },"2000")
                                    }
                                }
                            }
                            if(validWord == false){
                                let div = document.createElement("div");
                                div.id = "validWord"
                                let p = document.createElement("p");
                                p.innerHTML = "NOT A WORD";
                                div.appendChild(p);
                                body.insertBefore(div,document.getElementsByTagName("nav")[0]);
                                let timer = setInterval(function(){
                                    document.getElementById("validWord").remove();
                                    clearInterval(timer)
                                },"1000")
                            }
                            validWord = false;
                        }
                    }
                }else{
                    if(guess <= 0){
                        console.log("Enter a letter first");
                    }else if(guess == 5){
                        guess -= 1;
                        section = document.getElementById("section" + [group] + "-box" + [guess]);
                        section.innerHTML = "";
                    }else{
                        guess -= 1;
                        section = document.getElementById("section" + [group] + "-box" + [guess]);
                        section.innerHTML = "";
                    }
                }
            }else{
                if(guess != 5){
                    section.innerHTML = this.innerHTML;
                    guess += 1
                }else{
                    console.log("MAX BOXES");
                }
            }
        }
    }
}
let body = document.getElementsByTagName("body")[0];
body.addEventListener("keydown",keyBoard);
let keyOnArray = false
// keyboard function for utilizing keyboard when using letters
function keyBoard(e){
    let section = document.getElementById("section" + [group] + "-box" + [guess]);
    if(finished == false){
        if(pause == false){
            for(let i=0;i<keyboardLetter.length;i++){
                if(e.key.toUpperCase() != keyboardLetter[i]){
                    if(e.key.toUpperCase() == "BACKSPACE"){
                        keyOnArray = true
                    }
                }else{
                    keyOnArray = true
                }
            }
            if(keyOnArray == true){
                if(e.key.toUpperCase() == "ENTER" || e.key.toUpperCase() == "BACKSPACE"){
                    if(e.key.toUpperCase() == "ENTER"){
                        if(guess != 5){
                            console.log("must fill ever box");
                        }else{
                            if(group == 6){
                                finished = true;
                            }else{
                                let word = "";
                                for(let i=0;i<5;i++){
                                    section = document.getElementById("section" + [group] + "-box" + [i]);
                                    word += section.innerHTML
                                }
                                for(let i=0;i<validWords.length;i++){
                                    if(word == validWords[i].toUpperCase()){
                                        attempts += 1;
                                    if(group == 6){
                                        finished = true;
                                    }
                                        guess = 0;
                                        validWord = true;
                                    }
                                }
                                if(validWord == true){
                                    let correct = 0;
                                    let selectedWordDict = {};
                                    let wordDict = {};
                                    selectedWord = selectedWord.toUpperCase();
                                    for(let i=0;i<word.length;i++){
                                        selectedWordDict[selectedWord[i]] = 0;
                                        wordDict[word[i]] = 0;
                                    }
                                    for(let i=0;i<word.length;i++){
                                        selectedWordDict[selectedWord[i]] += 1;
                                        wordDict[word[i]] += 1;
                                    }
                                    for(let i=word.length-1;i>=0;i--){
                                        if(word[i] != selectedWord[i]){
                                            if(selectedWord.includes(word[i])){
                                                if(wordDict[word[i]] != selectedWordDict[word[i]]){
                                                    wordDict[word[i]] -= 1;
                                                    section = document.getElementById("section" + [group] + "-box" + [i]);
                                                    section.style.backgroundColor = "rgb(64,64,64)";
                                                    section.style.border = "2.2px solid rgb(64,64,64)";
                                                }else{
                                                    section = document.getElementById("section" + [group] + "-box" + [i]);
                                                    section.style.backgroundColor = "#b59f3b";
                                                    section.style.border = "2.2px solid #b59f3b";
                                                }
                                            }else{
                                                section = document.getElementById("section" + [group] + "-box" + [i]);
                                                section.style.backgroundColor = "rgb(64,64,64)";
                                                section.style.border = "2.2px solid rgb(64,64,64)";
                                            }
                                        }else{
                                            section = document.getElementById("section" + [group] + "-box" + [i]);
                                            section.style.backgroundColor = "#538d4e";
                                            section.style.border = "2.2px solid #538d4e"
                                            correct += 1;
                                            if(correct == 5){
                                                if(group == 6){
                                                    
                                                }else{
                                                    let timer = setInterval(function(){
                                                        let div = document.createElement("div");
                                                        div.id = "finished-div";
                                                        body.insertBefore(div,document.getElementsByTagName("nav")[0]);
                                                        h2 = document.createElement("h2");
                                                        h2.innerHTML = "Thanks for Playing!\n \tYou have finished!";
                                                        let div1 = document.createElement("div");
                                                        div1.id = "div1"
                                                        div1.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg>'
                                                        div1.addEventListener("click",function(){
                                                            document.getElementById("finished-div").remove();
                                                            body.style.backgroundColor = "rgb(16,16,16)";
                                                        })
                                                        div.appendChild(div1);
                                                        div.appendChild(h2);
                                                        body.style.backgroundColor = "black";
                                                        clearInterval(timer);
                                                    },"1000");
                                                    finished = true;
                                                    finishedScreen = true;
                                                    let div2 = document.createElement("div");
                                                    div2.id = "selectedWord"
                                                    let p = document.createElement("p");
                                                    p.innerHTML = selectedWord.toUpperCase();
                                                    div2.appendChild(p);
                                                    body.insertBefore(div2,document.getElementsByTagName("nav")[0]);
                                                    let timer1 = setInterval(function(){
                                                        //document.getElementById("selectedWord").remove();
                                                        clearInterval(timer1)
                                                    },"2000")
                                                }
                                            }
                                        }
                                    }
                                    group += 1;
                                    if(group == 6){
                                        if(finishedScreen != true){
                                            finished = true;
                                            let timer = setInterval(function(){
                                                let div = document.createElement("div");
                                                div.id = "finished-div";
                                                body.insertBefore(div,document.getElementsByTagName("nav")[0]);
                                                h2 = document.createElement("h2");
                                                h2.innerHTML = "Thanks for Playing!\n \tYou have finished!";
                                                let div1 = document.createElement("div");
                                                div1.id = "div1"
                                                div1.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg>'
                                                div1.addEventListener("click",function(){
                                                    document.getElementById("finished-div").remove();
                                                    body.style.backgroundColor = "rgb(16,16,16)";
                                                })
                                                div.appendChild(div1);
                                                div.appendChild(h2);
                                                body.style.backgroundColor = "black";
                                                clearInterval(timer);
                                            },"1000");
                                            finished = true;
                                            let div2 = document.createElement("div");
                                            div2.id = "selectedWord"
                                            let p = document.createElement("p");
                                            p.innerHTML = selectedWord.toUpperCase();
                                            div2.appendChild(p);
                                            body.insertBefore(div2,document.getElementsByTagName("nav")[0]);
                                            let timer1 = setInterval(function(){
                                                //document.getElementById("selectedWord").remove();
                                                clearInterval(timer1)
                                            },"2000")
                                        }
                                    }
                                }
                                if(validWord == false){
                                    let div = document.createElement("div");
                                    div.id = "validWord"
                                    let p = document.createElement("p");
                                    p.innerHTML = "NOT A WORD";
                                    div.appendChild(p);
                                    body.insertBefore(div,document.getElementsByTagName("nav")[0]);
                                    console.log("Enter a Valid Word");
                                    let timer = setInterval(function(){
                                        document.getElementById("validWord").remove();
                                        clearInterval(timer)
                                    },"1000")
                                }
                                validWord = false;
                            }
                        }
                    }else{
                        if(guess <= 0){
                            console.log("Enter a letter first");
                        }else if(guess == 5){
                            guess -= 1;
                            section = document.getElementById("section" + [group] + "-box" + [guess]);
                            section.className = "textbox-divs"
                            section.innerHTML = "";
                        }else{
                            guess -= 1;
                            section = document.getElementById("section" + [group] + "-box" + [guess]);
                            section.className = "textbox-divs"
                            section.innerHTML = "";
                        }
                    }
                }else{
                    if(guess != 5){
                        section.className = "textbox-divs-has-letter";
                        section.innerHTML = e.key.toUpperCase();
                        guess += 1
                    }else{
                        console.log("MAX BOXES");
                    }
                }
            }
        }
    }
    keyOnArray = false
}
let hints = document.getElementById("hints");
let htp = document.getElementById("how-to-play");
hints.addEventListener("click",hintsPopUp);
htp.addEventListener("click",htpPopUp);
function hintsPopUp(){
    if(active == true){
        
    }else{
        let vowels = 0;
        let consonant = 0;
        pause = true
        let div = document.createElement("div");
        let div1 = document.createElement("div");
        
        for(let i=0;i<5;i++){
            if(selectedWord[i] == "a" || selectedWord[i] == "e" || selectedWord[i] == "i" || selectedWord[i] == "o" || selectedWord[i] == "u" || selectedWord[i] == "A" || selectedWord[i] == "E" || selectedWord[i] == "I" || selectedWord[i] == "O" || selectedWord[i] == "U"){
                vowels += 1
            }else{
                consonant += 1
            }
        }
        div.id = "hint"
        body.insertBefore(div,document.getElementsByTagName("nav")[0]);
        let hTwo1 = document.createElement("h2");
        if(vowels == 1){
            hTwo1.innerHTML = "There is " + vowels + " vowel.";
        }else{
            hTwo1.innerHTML = "There are " + vowels + " vowels.";
        }
        let hTwo2 = document.createElement("h2")
        if(consonant == 1){
            hTwo2.innerHTML = "There is " + consonant + " consonant.";
        }else{
            hTwo2.innerHTML = "There are " + consonant + " consonants.";
        }
        let hTwo3 = document.createElement("h2");
        hTwo3.innerHTML = "The first letter is " + selectedWord[0].toUpperCase();
        body.style.backgroundColor = "black";
        div1.id = "div1"
        div1.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg>'
        div1.addEventListener("click",function(){
            document.getElementById("hint").remove();
            body.style.backgroundColor = "rgb(16,16,16)";
            pause = false;
            active = false;
        });
        div.appendChild(div1);
        div.appendChild(hTwo1);
        div.appendChild(hTwo2);
        div.appendChild(hTwo3);
        pause = true;
        active = true;
    }
}
function htpPopUp(){
        if(active == true){
            
        }else{
            let div = document.createElement("div");
            let div1 = document.createElement("div");
            let div2 = document.createElement("div");
            let title = document.createElement("h2");
            let textDiv = document.createElement("div");
            let exampleText = document.createElement("h2");
            let exampleDiv = document.createElement("div");
            exampleText.innerHTML = "Examples"
            exampleText.style.marginLeft = "0%";
            exampleDiv.className = "htpstyle";
            exampleDiv.appendChild(exampleText);
            textDiv.className = "htpstyle";
            for(let i=0;i<3;i++){
                let p = document.createElement("p");
                switch(i){
                    case 0:
                        p.innerHTML = "Guess the word in 6 tries.";
                        p.style.marginTop = "0%";
                        textDiv.appendChild(p);
                        break
                    case 1:
                        p.innerHTML = "Each guess must be a valid 5 real letter word found on the dictionary. Hit the enter button to submit.";
                        textDiv.appendChild(p);
                        break
                    case 2:
                        p.innerHTML = "After each guess, the color of the tiles will change to show how close your guess was to the word.";
                        textDiv.appendChild(p);
                        break
                }
            }
            title.innerHTML = "How To Play";
            
            title.style.letterSpacing = "-1.5px";
            title.style.marginLeft = "0px";
            //title.style.
            div2.className = "htpstyle"
            div.id = "how-to-plays";
            body.insertBefore(div,document.getElementsByTagName("nav")[0]);
            body.style.backgroundColor = "black";
            div1.id = "div1"
            div1.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg>'
            div1.addEventListener("click",function(){
                document.getElementById("how-to-plays").remove();
                body.style.backgroundColor = "rgb(16,16,16)";
                pause = false;
                active = false;
            });
            let ewDivContainer1 = document.createElement("div");
            ewDivContainer1.className = "ewDivContainer";
            let ewDivContainer2 = document.createElement("div");
            ewDivContainer2.className = "ewDivContainer";
            let ewDivContainer3 = document.createElement("div");
            ewDivContainer3.className = "ewDivContainer";
            for(let i=0;i<3;i++){
                switch(i){
                    case 0:
                        for(let j=0;j<5;j++){
                            switch(j){
                                case 0:
                                    let ewDiv0 = document.createElement("div");
                                    ewDiv0.className = "ewDiv";
                                    ewDiv0.style.backgroundColor = "#538d4e";
                                    ewDiv0.style.border = "2.2px solid #538d4e";
                                    ewDiv0.innerHTML = "W";
                                    ewDivContainer1.appendChild(ewDiv0);
                                    break
                                case 1:
                                    let ewDiv1 = document.createElement("div");
                                    ewDiv1.className = "ewDiv";
                                    ewDiv1.innerHTML = "O";
                                    ewDivContainer1.appendChild(ewDiv1);
                                    break;
                                case 2:
                                    let ewDiv2 = document.createElement("div");
                                    ewDiv2.className = "ewDiv";
                                    ewDiv2.innerHTML = "R";
                                    ewDivContainer1.appendChild(ewDiv2);
                                    break;
                                case 3:
                                    let ewDiv3 = document.createElement("div");
                                    ewDiv3.className = "ewDiv";
                                    ewDiv3.innerHTML = "D";
                                    ewDivContainer1.appendChild(ewDiv3);
                                    break;
                                case 4:
                                    let ewDiv4 = document.createElement("div");
                                    ewDiv4.className = "ewDiv";
                                    ewDiv4.innerHTML = "S";
                                    ewDivContainer1.appendChild(ewDiv4);
                                    break;
                            }
                        }
                        break;
                    case 1:
                        for(let j=0;j<5;j++){
                            switch(j){
                                case 0:
                                    let ewDiv5 = document.createElement("div");
                                    ewDiv5.className = "ewDiv";
                                    ewDiv5.innerHTML = "V";
                                    ewDivContainer2.appendChild(ewDiv5);
                                    break
                                case 1:
                                    let ewDiv6 = document.createElement("div");
                                    ewDiv6.className = "ewDiv";
                                    ewDiv6.style.backgroundColor = "#b59f3b";
                                    ewDiv6.style.border = "2.2px solid #b59f3b";
                                    ewDiv6.innerHTML = "I";
                                    ewDivContainer2.appendChild(ewDiv6);
                                    break;
                                case 2:
                                    let ewDiv7 = document.createElement("div");
                                    ewDiv7.className = "ewDiv";
                                    ewDiv7.innerHTML = "V";
                                    ewDivContainer2.appendChild(ewDiv7);
                                    break;
                                case 3:
                                    let ewDiv8 = document.createElement("div");
                                    ewDiv8.className = "ewDiv";
                                    ewDiv8.innerHTML = "I";
                                    ewDivContainer2.appendChild(ewDiv8);
                                    break;
                                case 4:
                                    let ewDiv9 = document.createElement("div");
                                    ewDiv9.className = "ewDiv";
                                    ewDiv9.innerHTML = "D";
                                    ewDivContainer2.appendChild(ewDiv9);
                                    break;
                            }
                        }
                        break;
                    case 2:
                        for(let j=0;j<5;j++){
                            switch(j){
                                case 0:
                                    let ewDiv10 = document.createElement("div");
                                    ewDiv10.className = "ewDiv";
                                    ewDiv10.innerHTML = "S";
                                    ewDivContainer3.appendChild(ewDiv10);
                                    break
                                case 1:
                                    let ewDiv11 = document.createElement("div");
                                    ewDiv11.className = "ewDiv";
                                    ewDiv11.innerHTML = "O";
                                    ewDivContainer3.appendChild(ewDiv11);
                                    break;
                                case 2:
                                    let ewDiv12 = document.createElement("div");
                                    ewDiv12.className = "ewDiv";
                                    ewDiv12.innerHTML = "L";
                                    ewDivContainer3.appendChild(ewDiv12);
                                    break;
                                case 3:
                                    let ewDiv13 = document.createElement("div");
                                    ewDiv13.className = "ewDiv";
                                    ewDiv13.style.backgroundColor = "rgb(64,64,64)";
                                    ewDiv13.style.border = "2.2px solid rgb(64,64,64)";
                                    ewDiv13.innerHTML = "U";
                                    ewDivContainer3.appendChild(ewDiv13);
                                    break;
                                case 4:
                                    let ewDiv14 = document.createElement("div");
                                    ewDiv14.className = "ewDiv";
                                    ewDiv14.innerHTML = "S";
                                    ewDivContainer3.appendChild(ewDiv14);
                                    break;
                            }
                        }
                        break;
                }
            }
            let ewText1 = document.createElement("div");
            ewText1.className = "htpstyle";
            let ewText2 = document.createElement("div");
            ewText2.className = "htpstyle";
            let ewText3 = document.createElement("div");
            ewText3.className = "htpstyle";
            let p1 = document.createElement("p");
            p1.innerHTML = "Green means correct letter & position."
            p1.className = "ewP"
            ewText1.appendChild(p1);
            let p2 = document.createElement("p");
            p2.innerHTML = "Yellow means correct letter wrong position."
            p2.className = "ewP"
            ewText2.appendChild(p2);
            let p3 = document.createElement("p");
            p3.innerHTML = "Grey means letter not involved."
            p3.className = "ewP"
            ewText3.appendChild(p3);
            div.appendChild(div1);
            div2.appendChild(title);
            div.appendChild(div2);
            div.appendChild(textDiv)
            div.appendChild(exampleDiv)
            div.appendChild(ewDivContainer1);
            div.appendChild(ewText1);
            div.appendChild(ewDivContainer2);
            div.appendChild(ewText2);
            div.appendChild(ewDivContainer3);
            div.appendChild(ewText3);
            pause = true;
            active = true;
        }
}
htpPopUp();
