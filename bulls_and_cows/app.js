// syntax 
const readline = require('node:readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

// input:
// lower_limit = 0
// upper_limit = 10000

// 0 <= Math.random() < 1
// Math.floor() chops the decimal
// 0 <= Math.random() * 10000 <= 9999
// 1000 <= 1000 + Math.floor(Math.random() * 10000) <= 10999

// ideally:
// 1000 to 9999

// what I am getting:
// 1000 to 10999

// problem:
// Math.floor(Math.random() * 10000) is generating a range of 0 to 9999
// the range we want = 0 to 8999

// we use % to modify the range
// Math.floor(Math.random() * 10000) % 9000 
// this generates numbers in the range [0, 8999] 
// property of modulus is (x % y) will always give [0, y) y-exclusive, 0 inclusive

// 0 <= 1000 + Math.floor(Math.random() * 10000) % 9000 <= 9999

// problem = we want Math.random() * 10000 to be squeezed into 0 to 999
function get_random(lower_limit, upper_limit) {
    // generates random number between lower_limit inclusive and upper_limit exclusive

    const scaled = Math.floor(Math.random() * upper_limit);
    const squeezed = scaled % (upper_limit - lower_limit);
    const final = lower_limit + squeezed;

    return Math.floor(final);
}

function generate_secret_code() {

    let first_digit, second_digit, third_digit, fourth_digit;
    first_digit = get_random(0, 10);
    second_digit = get_random(0, 10);
    // make sure second digit it not same as first digit:
    while (second_digit == first_digit) {
        second_digit = get_random(0, 10);
    }
    // similarly for the rest
    third_digit = get_random(0, 10);
    while(third_digit == second_digit || third_digit == first_digit) {
        third_digit = get_random(0, 10);
    }
    fourth_digit = get_random(0, 10);
    while(fourth_digit == third_digit || fourth_digit == second_digit || fourth_digit == first_digit) {
        fourth_digit = get_random(0, 10);
    }

    return first_digit.toString() + second_digit.toString() + third_digit.toString() + fourth_digit.toString();
}

const secret = generate_secret_code();
let n_guesses = 0;

function end_game() {
    console.log('You have cracked the code!');
    readline.close(); // otherwise program will not end as readline is running in the background
}

function take_guess(guess) {

    n_guesses++;
    
    let n_bulls = 0;
    let n_cows = 0;

    // calculate the number of bulls
    for (let i = 0; i < 4; i++) {
        if (guess[i] == secret[i]) {
            n_bulls++;
        }
    }

    for (let i = 0; i < 4; i++) {
        // check if guess[i] is a cow

        // loop through secret and check
        for (let j = 0; j < 4; j++) {

            if (i == j) {
                // if guess[i] == secret[j] it would be a bull
                // not cow

                continue; // skip this
            }

            if (guess[i] == secret[j]) {
                n_cows++;
            }
        }
    }

    if (n_bulls == 4) {
        end_game();
        return;
    }

    console.log('Number of bulls:', n_bulls);
    console.log('Number of cows:', n_cows);

    // if n_bulls is 4, it doens't come here
    // because of the return;

    // ask for another guess
    readline.question("Enter your guess: ", take_guess);
}

function take_username(username) {
    console.log('Welcome ' + username + '!');
    readline.question("Enter your guess: ", take_guess);
}

// readline.question calls take_username with what we typed in the terminal as argument
readline.question("Username: ", take_username);