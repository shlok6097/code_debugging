/**
 * Code Debugger - Beginner Starter Questions (30 Challenges)
 * Intuitive challenges for absolute beginners with zero coding experience.
 */

const BEGINNER_STARTERS_BANK = [
  {
    id: "beg-01-typo-print",
    mode: "bug_hunt",
    language: "Python",
    difficulty: 1,
    isBeginner: true,
    title: "The Misspelled Word",
    description: "The computer says this command is unknown. Can you spot the spelling typo?",
    code: `prnt("Welcome to the game!")`,
    options: [
      "The message text inside the brackets must be written in capital letters",
      "The command word 'prnt' has a typo and must be corrected to 'print'",
      "Text strings displayed on screen must be enclosed inside square brackets",
      "Exclamation mark characters '!' are not supported inside string text"
    ],
    correctOption: 1,
    explanation: "WHAT: Spelling mistake. WHY: The computer only recognizes the exact word `print`. HOW: Fix the spelling to `print(\"Welcome to the game!\")`.",
    basePoints: 60,
    tags: ["beginner", "spelling", "intro"]
  },
  {
    id: "beg-02-missing-quote",
    mode: "bug_hunt",
    language: "JavaScript",
    difficulty: 1,
    isBeginner: true,
    title: "The Unclosed Text Quote",
    description: "In computer code, text must start and end with quotation marks. What is missing below?",
    code: `let greeting = "Hello World;`,
    options: [
      "The variable declaration must use 'make' instead of 'let' for greeting",
      "The closing quotation mark \" is missing before the final semicolon",
      "The text words 'Hello' and 'World' must be joined with a hyphen character",
      "The string literal requires an opening and closing curly brace wrapper"
    ],
    correctOption: 1,
    explanation: "WHAT: Missing quotation mark. WHY: Text in quotes must always have both an opening quote and a closing quote. HOW: Add the closing quote: `\"Hello World\";`.",
    basePoints: 60,
    tags: ["beginner", "syntax", "quotes"]
  },
  {
    id: "beg-03-fruit-math-addition",
    mode: "output_detective",
    language: "Python",
    difficulty: 1,
    isBeginner: true,
    title: "Basket Math Mistake",
    description: "You have 5 apples and 3 oranges. We want to find the TOTAL number of fruits (8), but the code outputs 2.",
    code: `apples = 5\noranges = 3\ntotal_fruits = apples - oranges\nprint(total_fruits)`,
    expectedOutput: "8",
    actualOutput: "2",
    options: [
      "The variable apples must be converted to a floating-point decimal first",
      "The arithmetic used subtraction (-) instead of addition (+) for total count",
      "The print function cannot output numbers calculated from named variables",
      "The result variable total_fruits must be multiplied by 10 to display"
    ],
    correctOption: 1,
    explanation: "WHAT: Wrong arithmetic sign. WHY: To find the total combined amount, you must add (`+`), not subtract (`-`). HOW: Change `apples - oranges` to `apples + oranges`.",
    basePoints: 60,
    tags: ["beginner", "math", "logic"]
  },
  {
    id: "beg-04-capitalization-mismatch",
    mode: "bug_hunt",
    language: "Python",
    difficulty: 1,
    isBeginner: true,
    title: "Capital Letter Confusion",
    description: "Computers treat lowercase and uppercase letters as completely different things. Why does this fail?",
    code: `player_name = "Alex"\nprint(Player_name)`,
    options: [
      "The print statement must be written in all-capital letters as PRINT()",
      "Variable name was defined as 'player_name', but printed with capital 'Player_name'",
      "The string 'Alex' must be assigned using double colons rather than equals",
      "Variable names cannot contain underscore characters between two words"
    ],
    correctOption: 1,
    explanation: "WHAT: Uppercase vs lowercase mismatch. WHY: `player_name` and `Player_name` are treated as two different names by the computer. HOW: Use lowercase `print(player_name)`.",
    basePoints: 60,
    tags: ["beginner", "variables", "casing"]
  },
  {
    id: "beg-05-discount-addition-bug",
    mode: "output_detective",
    language: "JavaScript",
    difficulty: 1,
    isBeginner: true,
    title: "The Reverse Discount",
    description: "A shirt costs $50 with a $10 discount coupon. The price should be $40, but the receipt says $60!",
    code: `let price = 50;\nlet discount = 10;\nlet finalPrice = price + discount;\nconsole.log(finalPrice);`,
    options: [
      "The discount coupon must be subtracted (-) from price rather than added (+)",
      "Variable price must include currency symbol formatting before computation",
      "The console.log statement requires passing a string label before finalPrice",
      "Numeric discount values must be converted to percentages before addition"
    ],
    correctOption: 0,
    explanation: "WHAT: Added instead of subtracted. WHY: Discounts reduce the price. Adding them makes the item more expensive. HOW: Change `price + discount` to `price - discount`.",
    basePoints: 60,
    tags: ["beginner", "math", "logic"]
  },
  {
    id: "beg-06-traffic-light-action",
    mode: "bug_hunt",
    language: "Python",
    difficulty: 1,
    isBeginner: true,
    title: "Dangerous Traffic Light",
    description: "Look at the logic below. What is wrong with what the computer tells the car to do on a Red light?",
    code: `light_color = "red"\n\nif light_color == "red":\n    print("Speed up and Go!")\nelse:\n    print("Stop!")`,
    options: [
      "Traffic light colors must be stored as integer codes rather than text strings",
      "When light is 'red', the code should print 'Stop!' instead of 'Speed up and Go!'",
      "The if condition must specify both red and yellow lights in the same clause",
      "The else block requires an explicit comparison condition before printing"
    ],
    correctOption: 1,
    explanation: "WHAT: Inverted action logic. WHY: A red traffic light means cars must stop. HOW: Change the red light message to `print(\"Stop!\")`.",
    basePoints: 60,
    tags: ["beginner", "logic", "conditions"]
  },
  {
    id: "beg-07-missing-parenthesis",
    mode: "bug_hunt",
    language: "Python",
    difficulty: 1,
    isBeginner: true,
    title: "The Unclosed Parenthesis",
    description: "Every opening bracket ( must have a matching closing bracket ). What is missing below?",
    code: `print("Game Over"`,
    options: [
      "The closing parenthesis ')' is missing at the end of the print statement",
      "The string text must be translated into uppercase letters to print correctly",
      "The word 'print' must be repeated twice for game over screen notifications",
      "String literals passed to print must be wrapped with square brackets instead"
    ],
    correctOption: 0,
    explanation: "WHAT: Missing closing parenthesis. WHY: Every `(` requires a matching `)` to close the instruction. HOW: Change to `print(\"Game Over\")`.",
    basePoints: 60,
    tags: ["beginner", "punctuation", "syntax"]
  },
  {
    id: "beg-08-spelling-true",
    mode: "bug_hunt",
    language: "JavaScript",
    difficulty: 1,
    isBeginner: true,
    title: "Misspelled True Keyword",
    description: "The programmer tried to set the game sound to ON using the word true, but made a typo.",
    code: `let soundEnabled = ture;`,
    options: [
      "Variable name soundEnabled must be enclosed in double quotation marks",
      "The boolean value 'ture' is misspelled and must be corrected to 'true'",
      "Boolean flags in JavaScript can only be assigned numeric digits 0 or 1",
      "The semicolon at the end of variable assignment lines is not allowed"
    ],
    correctOption: 1,
    explanation: "WHAT: Typo in keyword. WHY: The computer only recognizes the exact spelling `true`. HOW: Correct the spelling to `let soundEnabled = true;`.",
    basePoints: 60,
    tags: ["beginner", "spelling", "boolean"]
  },
  {
    id: "beg-09-win-loss-message-swap",
    mode: "output_detective",
    language: "Python",
    difficulty: 1,
    isBeginner: true,
    title: "Swapped Victory Messages",
    description: "A player scored 95 points (passing score is 50), but the game told them 'You Failed! Try Again'.",
    code: `score = 95\nif score >= 50:\n    print("You Failed! Try Again")\nelse:\n    print("You Passed! Congratulations!")`,
    options: [
      "Score value 95 is treated as text string instead of numeric integer",
      "Comparison operator >= is not supported on integers greater than 50",
      "The pass and fail messages inside the if and else blocks are inverted",
      "The print function cannot display punctuation marks like exclamation"
    ],
    correctOption: 2,
    explanation: "WHAT: Inverted messages. WHY: Scoring 95 triggers the `>= 50` branch, which currently prints the failure message. HOW: Swap the two print messages.",
    basePoints: 60,
    tags: ["beginner", "logic", "conditions"]
  },
  {
    id: "beg-10-multiply-by-zero",
    mode: "output_detective",
    language: "Python",
    difficulty: 1,
    isBeginner: true,
    title: "The Vanishing Score",
    description: "A player had 100 points and earned a 2x multiplier, but their final score became 0!",
    code: `base_score = 100\nmultiplier = 0\nfinal_score = base_score * multiplier\nprint(final_score)`,
    options: [
      "The base_score variable must be declared as float before multiplication",
      "Multiplier is set to 0, which zeroes the score; it should be set to 2",
      "The multiplication asterisk symbol * must be replaced with the letter x",
      "The print statement must explicitly cast final_score to a string object"
    ],
    correctOption: 1,
    explanation: "WHAT: Multiplied by zero. WHY: Any number times 0 becomes 0. A 2x multiplier means multiplying by 2. HOW: Set `multiplier = 2`.",
    basePoints: 60,
    tags: ["beginner", "math", "logic"]
  },
  {
    id: "beg-11-equal-sign-in-check",
    mode: "bug_hunt",
    language: "Python",
    difficulty: 1,
    isBeginner: true,
    title: "One Equal Sign vs Two Equal Signs",
    description: "To compare if two things are equal, computers require '==' (double equal). What is wrong below?",
    code: `user_answer = "Paris"\nif user_answer = "Paris":\n    print("Correct!")`,
    options: [
      "The city string 'Paris' must be provided in all lowercase letters",
      "Single '=' is assignment; equality comparison in if requires '=='",
      "The variable user_answer cannot store string text in Python script",
      "The print message string must be enclosed within curly brackets {}"
    ],
    correctOption: 1,
    explanation: "WHAT: Used `=` instead of `==`. WHY: Single `=` sets a value, while double `==` tests if two values match. HOW: Use `if user_answer == \"Paris\":`.",
    basePoints: 60,
    tags: ["beginner", "syntax", "comparison"]
  },
  {
    id: "beg-12-name-order-space",
    mode: "output_detective",
    language: "JavaScript",
    difficulty: 1,
    isBeginner: true,
    title: "Glued Together Name",
    description: "We want to combine first name 'John' and last name 'Doe' with a space ('John Doe'), but it prints 'JohnDoe'.",
    code: `let firstName = "John";\nlet lastName = "Doe";\nlet fullName = firstName + lastName;\nconsole.log(fullName);`,
    options: [
      "String concatenation must include a space string: firstName + ' ' + lastName",
      "The variables firstName and lastName must be combined inside square brackets",
      "JavaScript strings cannot be concatenated using standard addition plus operator",
      "The console.log function requires template backticks for all string logging"
    ],
    correctOption: 0,
    explanation: "WHAT: Missing space separator. WHY: Adding two strings directly pastes them with no space in between. HOW: Add a space string: `firstName + \" \" + lastName`.",
    basePoints: 60,
    tags: ["beginner", "strings", "output"]
  },
  {
    id: "beg-13-underage-check",
    mode: "bug_hunt",
    language: "Python",
    difficulty: 1,
    isBeginner: true,
    title: "Who Can Ride The Rollercoaster?",
    description: "To ride the coaster, height must be AT LEAST 120 cm. A kid with height 100 cm is allowed on. Why?",
    code: `rider_height = 100\nif rider_height <= 120:\n    print("You can ride the rollercoaster!")`,
    options: [
      "The condition used '<=' (less than); it should check '>=' (greater than or equal)",
      "Height values in amusement park software must be converted to inches first",
      "Number 100 is too large to compare against threshold values in Python",
      "The print message string must be written in uppercase capital letters"
    ],
    correctOption: 0,
    explanation: "WHAT: Inverted comparison sign. WHY: `<= 120` checks if height is 120 or LESS. HOW: Change to `rider_height >= 120`.",
    basePoints: 60,
    tags: ["beginner", "comparisons", "logic"]
  },
  {
    id: "beg-14-missing-colon",
    mode: "bug_hunt",
    language: "Python",
    difficulty: 1,
    isBeginner: true,
    title: "The Missing Colon",
    description: "In Python, every 'if' and 'else' line MUST end with a colon (:). What is missing on line 2?",
    code: `age = 20\nif age >= 18\n    print("Adult")`,
    options: [
      "The integer 20 must be wrapped inside double quotation marks as text",
      "The if condition header line is missing a required colon ':' at the end",
      "The word 'Adult' must be printed inside parentheses with curly brackets",
      "Variable age cannot be compared against integer constants like 18"
    ],
    correctOption: 1,
    explanation: "WHAT: Missing colon. WHY: Python syntax requires a colon `:` after `if` conditions. HOW: Change to `if age >= 18:`.",
    basePoints: 60,
    tags: ["beginner", "syntax", "punctuation"]
  },
  {
    id: "beg-15-coin-spending-math",
    mode: "output_detective",
    language: "Python",
    difficulty: 1,
    isBeginner: true,
    title: "Buying Game Potions",
    description: "You have 10 coins and buy a health potion costing 4 coins. You should have 6 coins left, but code says 40!",
    code: `my_coins = 10\npotion_cost = 4\ncoins_left = my_coins * potion_cost\nprint(coins_left)`,
    options: [
      "Initial coin balance 10 is too low to purchase a 4 coin potion item",
      "The remaining coins must be calculated using division rather than minus",
      "The calculation used multiplication (*) instead of subtracting (-) potion cost",
      "Variable potion_cost must be initialized with negative numeric values"
    ],
    correctOption: 2,
    explanation: "WHAT: Multiplication instead of subtraction. WHY: Spending coins reduces your total. HOW: Use subtraction `my_coins - potion_cost`.",
    basePoints: 60,
    tags: ["beginner", "math", "logic"]
  },
  {
    id: "beg-16-battery-zero-check",
    mode: "bug_hunt",
    language: "JavaScript",
    difficulty: 1,
    isBeginner: true,
    title: "Phone Battery Warning",
    description: "The phone battery has 0% charge, but the screen says 'Battery is Full!'. Why?",
    code: `let batteryPercent = 0;\nif (batteryPercent === 0) {\n  console.log("Battery is Full!");\n} else {\n  console.log("Battery is Empty!");\n}`,
    options: [
      "The console messages are swapped; 0% charge corresponds to an empty battery",
      "The variable batteryPercent cannot be compared against integer zero in JS",
      "Checking equality with 0 requires loose equality == instead of strict ===",
      "The else statement requires an explicit percentage check condition block"
    ],
    correctOption: 0,
    explanation: "WHAT: Reversed message logic. WHY: 0% battery is empty, not full. HOW: When `batteryPercent === 0`, print `\"Battery is Empty!\"`.",
    basePoints: 60,
    tags: ["beginner", "logic", "conditions"]
  },
  {
    id: "beg-17-spelling-color-green",
    mode: "bug_hunt",
    language: "Python",
    difficulty: 1,
    isBeginner: true,
    title: "Typo in Color List",
    description: "Spot the spelling error in the list of rainbow colors below.",
    code: `favorite_colors = ["red", "blue", "gren", "yellow"]`,
    options: [
      "Color arrays cannot contain more than three elements in basic Python",
      "The color entry 'gren' is misspelled and should be corrected to 'green'",
      "List items must be enclosed in round parentheses rather than brackets",
      "The element 'yellow' is not a recognized color constant in the parser"
    ],
    correctOption: 1,
    explanation: "WHAT: Spelling typo. WHY: `\"gren\"` is missing an 'e'. HOW: Change to `\"green\"`.",
    basePoints: 60,
    tags: ["beginner", "spelling", "lists"]
  },
  {
    id: "beg-18-ice-temperature-logic",
    mode: "bug_hunt",
    language: "Python",
    difficulty: 1,
    isBeginner: true,
    title: "Freezing Temperature Logic",
    description: "Water freezes into ice at temperatures 0 degrees or BELOW. What is wrong with the code below?",
    code: `temperature = 30\nif temperature > 0:\n    print("Water is frozen solid into ice!")`,
    options: [
      "Temperature must be represented as a floating-point number with decimals",
      "The condition checks '> 0' (warm); freezing occurs at '<= 0' (cold)",
      "The comparison operator > is not supported on positive integer values",
      "The print statement must specify temperature units in Celsius scale"
    ],
    correctOption: 1,
    explanation: "WHAT: Inverted temperature condition. WHY: Freezing occurs at `temperature <= 0`, not `> 0`. HOW: Change condition to `temperature <= 0`.",
    basePoints: 60,
    tags: ["beginner", "logic", "science"]
  },
  {
    id: "beg-19-pizza-slice-division",
    mode: "output_detective",
    language: "Python",
    difficulty: 1,
    isBeginner: true,
    title: "Sharing Pizza Slices",
    description: "8 pizza slices shared equally among 4 friends. Each friend should get 2 slices, but code prints 32 slices each!",
    code: `slices = 8\nfriends = 4\nslices_per_friend = slices * friends\nprint(slices_per_friend)`,
    options: [
      "Equal distribution requires division (/), but code used multiplication (*)",
      "Variable friends must be stored in a list collection before computation",
      "The slices count 8 is not divisible by 4 in integer arithmetic pipelines",
      "The print function requires converting slices_per_friend to a fraction"
    ],
    correctOption: 0,
    explanation: "WHAT: Multiplication instead of division. WHY: Splitting items equally means dividing total slices by friends (`8 / 4 = 2`). HOW: Change `slices * friends` to `slices / friends`.",
    basePoints: 60,
    tags: ["beginner", "math", "division"]
  },
  {
    id: "beg-20-sound-mute-logic",
    mode: "bug_hunt",
    language: "JavaScript",
    difficulty: 1,
    isBeginner: true,
    title: "Muted Game Plays Loud Music",
    description: "The player pressed the MUTE button (isMuted = true), but the game plays loud music anyway. Why?",
    code: `let isMuted = true;\nif (isMuted === true) {\n  playLoudMusic();\n} else {\n  silenceAllAudio();\n}`,
    options: [
      "Variable isMuted must be set to string 'yes' rather than boolean true",
      "When isMuted is true, sound should be silenced rather than playing music",
      "Calling playLoudMusic requires passing audio volume level as parameter",
      "The boolean value true must be enclosed in single quotation marks 'true'"
    ],
    correctOption: 1,
    explanation: "WHAT: Inverted audio actions. WHY: If mute is ON (`true`), sound must be stopped. HOW: Call `silenceAllAudio()` when `isMuted === true`.",
    basePoints: 60,
    tags: ["beginner", "logic", "conditions"]
  },
  {
    id: "beg-21-password-length-check",
    mode: "bug_hunt",
    language: "JavaScript",
    difficulty: 1,
    isBeginner: true,
    title: "Short Password Accepted",
    description: "A secure password must be AT LEAST 8 characters long. The code below accepts a 3-letter password. Why?",
    code: `let password = "123";\nif (password.length < 8) {\n  console.log("Password Accepted!");\n}`,
    options: [
      "The password string variable cannot contain numeric digits in JavaScript",
      "Condition '< 8' accepts short passwords; it should require length '>= 8'",
      "Accessing password.length requires calling it as a function with ()",
      "The console logging statement must use console.warn for short inputs"
    ],
    correctOption: 1,
    explanation: "WHAT: Inverted length condition. WHY: `< 8` means less than 8 letters. HOW: Require `password.length >= 8` to accept.",
    basePoints: 60,
    tags: ["beginner", "strings", "comparison"]
  },
  {
    id: "beg-22-swapping-variables-overwrite",
    mode: "output_detective",
    language: "Python",
    difficulty: 1,
    isBeginner: true,
    title: "The Accidental Value Overwrite",
    description: "We want to swap glass A (Milk) and glass B (Juice). But both glasses end up with 'Juice'!",
    code: `glass_a = "Milk"\nglass_b = "Juice"\nglass_a = glass_b\nglass_b = glass_a\nprint(glass_a, glass_b)`,
    options: [
      "Assigning glass_a = glass_b overwrote 'Milk' before copying it to glass_b",
      "String values cannot be exchanged between variables in Python functions",
      "Variable glass_b must be assigned a numeric identifier for swap operations",
      "The print statement cannot display two comma-separated variables together"
    ],
    correctOption: 0,
    explanation: "WHAT: Overwriting variable before copying. WHY: Once `glass_a` is set to `\"Juice\"`, the original `\"Milk\"` value is lost. HOW: Use a temporary variable `temp = glass_a` or Python's `glass_a, glass_b = glass_b, glass_a`.",
    basePoints: 60,
    tags: ["beginner", "variables", "logic"]
  },
  {
    id: "beg-23-speed-limit-fine",
    mode: "bug_hunt",
    language: "Python",
    difficulty: 1,
    isBeginner: true,
    title: "Speed Limit Enforcement",
    description: "The highway speed limit is 60 mph. A driver going 45 mph receives a speeding ticket. Why?",
    code: `driver_speed = 45\nif driver_speed < 60:\n    print("Issue Speeding Ticket!")`,
    options: [
      "Speed values must be converted to kilometers per hour before evaluation",
      "The condition '< 60' penalizes safe drivers; tickets occur when speed > 60",
      "Integer 45 cannot be compared against speed thresholds in Python code",
      "The print statement cannot contain the word 'Ticket' without quotes"
    ],
    correctOption: 1,
    explanation: "WHAT: Inverted speed condition. WHY: Drivers going under the limit (`< 60`) are driving legally. Speeding happens when `driver_speed > 60`. HOW: Change condition to `driver_speed > 60`.",
    basePoints: 60,
    tags: ["beginner", "logic", "conditions"]
  },
  {
    id: "beg-24-countdown-starting-point",
    mode: "bug_hunt",
    language: "Python",
    difficulty: 1,
    isBeginner: true,
    title: "Rocket Launch Countdown",
    description: "A rocket countdown should count down from 10 to 1, but the countdown starts at -10 and never launches.",
    code: `countdown = -10\nwhile countdown > 0:\n    print(countdown)\n    countdown -= 1`,
    options: [
      "While loops cannot decrement numeric variables using operator -= syntax",
      "countdown starts at negative -10; it must start at positive 10 to count down",
      "The print function requires passing string formatted countdown text",
      "The loop condition countdown > 0 must be written as countdown >= 100"
    ],
    correctOption: 1,
    explanation: "WHAT: Negative starting number. WHY: Since `-10` is not greater than 0, the loop never runs at all. HOW: Start with positive `countdown = 10`.",
    basePoints: 60,
    tags: ["beginner", "numbers", "loops"]
  },
  {
    id: "beg-25-even-odd-labeling",
    mode: "output_detective",
    language: "Python",
    difficulty: 1,
    isBeginner: true,
    title: "Even or Odd Labeling",
    description: "Checking number 4 (which is Even) prints 'The number is ODD'. Why?",
    code: `num = 4\nif num % 2 == 0:\n    print("The number is ODD")\nelse:\n    print("The number is EVEN")`,
    options: [
      "Remainder 0 when divided by 2 signifies EVEN numbers, but message says ODD",
      "Number 4 is treated as floating-point value that fails modulo operations",
      "Modulo operator % is not supported for integer parity checks in Python",
      "The print statement cannot display strings containing all-capital words"
    ],
    correctOption: 0,
    explanation: "WHAT: Inverted Even/Odd labels. WHY: When a number is divisible by 2 with 0 remainder (`num % 2 == 0`), it is an EVEN number. HOW: Change the first branch to print `\"The number is EVEN\"`.",
    basePoints: 60,
    tags: ["beginner", "math", "even_odd"]
  },
  {
    id: "beg-26-volume-percent-overflow",
    mode: "bug_hunt",
    language: "JavaScript",
    difficulty: 1,
    isBeginner: true,
    title: "Max Volume Setting",
    description: "The speaker volume goes from 0% to 100%. The user set it to 150%, and the speaker blew out. Why did the check fail?",
    code: `let volume = 150;\nif (volume > 100) {\n  setVolume(volume); // should cap at 100!\n}`,
    options: [
      "Volume variable must be constrained using string percentage units '150%'",
      "When volume exceeds 100, it should be capped to 100 instead of passing 150",
      "The setVolume function cannot accept numeric parameters higher than 50",
      "JavaScript if conditions cannot evaluate comparisons on integer numbers"
    ],
    correctOption: 1,
    explanation: "WHAT: Missing upper cap. WHY: Volume over 100% must be limited to 100%. HOW: Set `setVolume(100)` when `volume > 100`.",
    basePoints: 60,
    tags: ["beginner", "math", "clamp"]
  },
  {
    id: "beg-27-door-lock-logic",
    mode: "bug_hunt",
    language: "Python",
    difficulty: 1,
    isBeginner: true,
    title: "Smart Door Lock",
    description: "You typed the correct PIN code (1234), but the door remained locked. Look at the code below.",
    code: `entered_pin = 1234\ncorrect_pin = 1234\nif entered_pin != correct_pin:\n    unlock_door()`,
    options: [
      "The != operator means 'NOT equal'; it only unlocks when PIN is incorrect",
      "PIN code values must be four-character string words rather than numbers",
      "Calling unlock_door requires passing security credentials as parameters",
      "The if condition requires comparing against binary encrypted hash codes"
    ],
    correctOption: 0,
    explanation: "WHAT: Inverted not-equal operator. WHY: `!=` tests if pins do NOT match. HOW: Use `if entered_pin == correct_pin: unlock_door()`.",
    basePoints: 60,
    tags: ["beginner", "logic", "security"]
  },
  {
    id: "beg-28-thermostat-hot-cold",
    mode: "output_detective",
    language: "Python",
    difficulty: 1,
    isBeginner: true,
    title: "Thermostat Action Error",
    description: "Room temperature is 90°F (Hot). The thermostat was supposed to turn on AC, but turned on the HEATER!",
    code: `room_temp = 90\nif room_temp >= 75:\n    turn_on_heater()\nelse:\n    turn_on_ac()`,
    options: [
      "Room temperature must be measured in Celsius scale for thermostat checks",
      "When room_temp >= 75 (hot), it should turn on AC cooling, not the heater",
      "The turn_on_heater function cannot be invoked from inside if statements",
      "The else clause requires an explicit temperature range check parameter"
    ],
    correctOption: 1,
    explanation: "WHAT: Inverted appliance trigger. WHY: Hot rooms require AC cooling. HOW: Call `turn_on_ac()` when `room_temp >= 75`.",
    basePoints: 60,
    tags: ["beginner", "logic", "output"]
  },
  {
    id: "beg-29-shopping-cart-empty",
    mode: "bug_hunt",
    language: "JavaScript",
    difficulty: 1,
    isBeginner: true,
    title: "Empty Shopping Cart Checkout",
    description: "A customer with 0 items in their cart is allowed to proceed to payment. Why?",
    code: `let itemCount = 0;\nif (itemCount >= 0) {\n  allowCheckout();\n}`,
    options: [
      "Variable itemCount must be declared with const keyword in ecommerce apps",
      "The condition '>= 0' allows 0 items; cart checkout requires itemCount > 0",
      "The allowCheckout function cannot be called without payment token inputs",
      "Numeric zero is not a valid integer in JavaScript conditional evaluations"
    ],
    correctOption: 1,
    explanation: "WHAT: Allowed 0 items. WHY: `>= 0` is true when items = 0. HOW: Require `itemCount > 0`.",
    basePoints: 60,
    tags: ["beginner", "logic", "conditions"]
  },
  {
    id: "beg-30-game-level-advancement",
    mode: "output_detective",
    language: "Python",
    difficulty: 1,
    isBeginner: true,
    title: "Game Level Down",
    description: "Player completed Level 1 and should advance to Level 2, but the game sent them to Level 0!",
    code: `current_level = 1\nnext_level = current_level - 1\nprint(next_level)`,
    options: [
      "Advancing game levels requires adding 1 (+ 1), but code subtracted 1 (- 1)",
      "Variable current_level must be initialized as string '1' for level tracking",
      "The print function cannot output numbers calculated from level variables",
      "Level progression requires multiplying current_level by next level index"
    ],
    correctOption: 0,
    explanation: "WHAT: Subtracted level. WHY: Advancing to next level increases level by 1. HOW: Use `current_level + 1`.",
    basePoints: 60,
    tags: ["beginner", "math", "levels"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BEGINNER_STARTERS_BANK };
}
