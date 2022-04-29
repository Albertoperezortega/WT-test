
//changes to start the questions
const play_btn = document.querySelector(".play_btn");
play_btn.onclick = ()=>{
    start_play();
}

//displays the start page
function start_play(){
    document.querySelector(".intro").style.display = 'none';
    document.querySelector(".inter").style.display = 'inline';
    document.querySelector(".quest").style.display = 'inline';
    document.querySelector(".next").style.display = 'inline';
    document.querySelector(".final").style.display = 'none';
    document.querySelector(".error").style.display = 'none';
    clearInterval(interval);
    show_quest(0);
    display_score(0);
    time_start(12);
}


//some needed values 
var total_score = 0;
let quest_count = 0;
let interval;
const quest_timer = document.querySelector(".time_amount");
const next_btn = document.querySelector(".next_btn");
document.querySelector(".error").style.display = 'inline';

//When the button confirm answer is pressed 
//This joins most of the functions and basically controls what and how the question is. 
next_btn.onclick = ()=>{
    let quest_points = questions[quest_count].points;
    var a = document.getElementById("quest1_input_a").value;
    var b = document.getElementById("quest1_input_b").value;
    if(test_nums(quest_points, a, b)){
        if (right_answer(quest_count)){
            total_score = Number(change_score(total_score, Number(a)));
        }
        else{
            total_score = Number(change_score(total_score, Number(b)));
        }
        if (quest_count == 5){
            final_page(total_score);
        }
        display_score(total_score);
        quest_count++;
        document.querySelector(".error").style.display = 'none';
        show_quest(quest_count); 
        clearInterval(interval);
        time_start(12);

    }
    else{
        document.querySelector(".error").style.display = 'inline';
    }
}


//shows the question 
function show_quest(count){
    const quest_text = document.querySelector(".quest1_question");
    const quest_points = document.querySelector(".quest1_points");
    const quest_a = document.querySelector(".quest1_a");
    const quest_b = document.querySelector(".quest1_b");
    let text = '<p>'+ questions[count].question +'</p>';
    let points_quest = '<p> (' + questions[count].points + ')</p>';
    let a = '<li>'+ questions[count].options[0] +'</li>';
    let b = '<li>'+ questions[count].options[1] +'</li>';
    quest_text.innerHTML = text;
    quest_points.innerHTML = points_quest;
    quest_a.innerHTML = a;
    quest_b.innerHTML = b;
}

//tests if numbers inputed are valid
function test_nums(answer_points, a, b){
    if (Number(answer_points) == Number(a) + Number(b)){
        return true;
    }
}

//checks which answer is correct 
function right_answer(count){
    if(Number(questions[count].answer) == Number(questions[count].options[0])){
        return true;
    }
}

//adds values to the score
function change_score(total_score, add){
    total_score = Number(total_score) + Number(add);
    return total_score;
}

//displays the score 
function display_score(total_score){
    const quest_score_text = document.querySelector(".inter_score");
    let score = '<p> SCORE : '+ Number(total_score) +'</p>';
    quest_score_text.innerHTML = score;
}

//sets up the timer and changes question when time runs out
function time_start(time){
    interval = setInterval(timer, 1000);
    function timer(){
        quest_timer.textContent = time;
        time--;
        if (time == -1){
            if (quest_count == 5){
                final_page(total_score);
            }
            quest_count++;
            show_quest(quest_count);
            clearInterval(interval);
            time_start(12);
            document.querySelector(".error").style.display = 'none';
        }
    }
}

//displays final page

function final_page(total_score){
    const show_score = document.querySelector(".final_score_num");
    show_score.innerHTML = total_score;
    document.querySelector(".intro").style.display = 'none';
    document.querySelector(".inter").style.display = 'none';
    document.querySelector(".quest").style.display = 'none';
    document.querySelector(".next").style.display = 'none';
    document.querySelector(".final").style.display = 'inline';
    document.querySelector(".error").style.display = 'none';
}

const main_menu = document.querySelector(".return_btn");
main_menu.onclick = ()=>{
    total_score = 0;
    quest_count = 0;
    document.querySelector(".intro").style.display = 'inline';
    document.querySelector(".inter").style.display = 'none';
    document.querySelector(".quest").style.display = 'none';
    document.querySelector(".next").style.display = 'none';
    document.querySelector(".final").style.display = 'none';
    document.querySelector(".error").style.display = 'none';
}

