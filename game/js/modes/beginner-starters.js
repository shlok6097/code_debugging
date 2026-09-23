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
      "The message should be inside square brackets",
      "The word 'prnt' is misspelled; it should be 'print'",
      "Exclamation mark '!' is not allowed in text",
      "Welcome must be written in capital letters"
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
      "The number 10 is missing",
      "The closing quotation mark \" is missing before the semicolon",
      "let greeting should be make greeting",
      "Hello and World must be combined into one word"
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
      "apples and oranges cannot be numbers",
      "The code used subtraction (-) instead of addition (+)",
      "total_fruits should be multiplied by 10",
      "print() cannot display fruit counts"
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
      "Alex is not a valid player name",
      "The variable was created with lowercase 'player_name', but printed with capital 'Player_name'",
      "print must be in ALL CAPS",
      "Quotation marks are not allowed around names"
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
    expectedOutput: "40",
    actualOutput: "60",
    options: [
      "A discount should be subtracted from the price, not added to it",
      "console.log should be console.receipt",
      "50 cannot have 10 subtracted from it",
      "let price must be written in dollars $50"
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
      "light_color must be a number",
      "When the light is 'red', the computer should print 'Stop!', not 'Speed up and Go!'",
      "if statement is not allowed to use colors",
      "else must have a color name next to it"
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
      "The closing parenthesis ')' is missing at the end of print",
      "Game Over should be written in Spanish",
      "print should be typed three times",
      "The quotation marks should be removed"
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
      "soundEnabled must be wrapped in quotes",
      "The word 'ture' is a typo; it should be spelled 'true'",
      "Numbers must be used instead of words",
      "The semicolon at the end is forbidden"
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
    expectedOutput: "You Passed! Congratulations!",
    actualOutput: "You Failed! Try Again",
    options: [
      "The success and failure messages inside the if/else blocks are swapped",
      "95 is less than 50",
      "score should be written as 'ninety-five'",
      "print cannot have exclamation marks"
    ],
    correctOption: 0,
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
    expectedOutput: "200",
    actualOutput: "0",
    options: [
      "Multiplying any number by 0 equals 0; the multiplier should be 2",
      "100 cannot be multiplied",
      "print(final_score) should be print(100)",
      "Multiplication sign * is not supported"
    ],
    correctOption: 0,
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
      "Single '=' is for assigning values; checking equality in 'if' requires '==' (double equals)",
      "Paris must be typed in lowercase",
      "user_answer cannot be text",
      "Correct! must be inside curly brackets"
    ],
    correctOption: 0,
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
    expectedOutput: "John Doe",
    actualOutput: "JohnDoe",
    options: [
      "There is no space character added between firstName and lastName (use firstName + ' ' + lastName)",
      "John and Doe are not allowed in JavaScript",
      "fullName must be a number",
      "console.log cannot print names"
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
      "The comparison used '<=' (less than), which allows shorter riders; it should be '>=' (greater than or equal)",
      "rider_height must be in inches",
      "100 is too large a number for computers",
      "print must say 'Rollercoaster' in all caps"
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
      "A colon ':' is missing at the end of the 'if age >= 18' line",
      "20 must be enclosed in quotes '20'",
      "Adult should be printed 18 times",
      "age cannot be greater than 18"
    ],
    correctOption: 0,
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
    expectedOutput: "6",
    actualOutput: "40",
    options: [
      "The code multiplied (*) coins by price instead of subtracting (-) the price",
      "10 coins is not enough to buy a 4 coin potion",
      "coins_left should be divided by 100",
      "Potion prices must be negative numbers"
    ],
    correctOption: 0,
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
      "The messages are reversed; 0% means empty, not full",
      "batteryPercent cannot equal 0",
      "console.log only works when battery is > 50%",
      "0 should be written as 'zero'"
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
      "The word 'gren' has a spelling typo; it should be 'green'",
      "blue must come before red",
      "Lists cannot contain four colors",
      "yellow is not a valid color"
    ],
    correctOption: 0,
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
      "The condition checks '> 0' (warm) instead of '<= 0' (freezing cold)",
      "temperature must be measured in Kelvin only",
      "30 is not a valid number",
      "print cannot mention ice"
    ],
    correctOption: 0,
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
    expectedOutput: "2",
    actualOutput: "32",
    options: [
      "Sharing equally requires division (/), not multiplication (*)",
      "Friends must be converted to an array",
      "8 cannot be divided by 4",
      "Pizza slices cannot be numbers"
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
      "When isMuted is true, audio should be silenced, not played loudly",
      "isMuted must be set to 'yes'",
      "playLoudMusic cannot be inside if statement",
      "true should be in quotes 'true'"
    ],
    correctOption: 0,
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
      "Checking '< 8' (less than 8) accepts short passwords; it should check '>= 8' (at least 8)",
      "Password cannot be numbers",
      "password.length is invalid in JavaScript",
      "console.log must be console.warn"
    ],
    correctOption: 0,
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
    expectedOutput: "Juice Milk",
    actualOutput: "Juice Juice",
    options: [
      "Setting glass_a = glass_b immediately overwrote 'Milk' before it could be saved into glass_b",
      "Milk and Juice cannot be swapped in Python",
      "glass_b must be a number",
      "print() cannot print two things at once"
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
      "The condition '< 60' tickets slow/safe drivers; speeding tickets are given when driver_speed > 60",
      "driver_speed must be in kilometers only",
      "45 is not an integer",
      "print cannot use the word 'Ticket'"
    ],
    correctOption: 0,
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
      "countdown starts at -10 (negative); it must start at positive 10 to count down to 0",
      "while loops cannot count backwards",
      "print(countdown) requires quotes 'countdown'",
      "countdown -= 1 is forbidden"
    ],
    correctOption: 0,
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
    expectedOutput: "The number is EVEN",
    actualOutput: "The number is ODD",
    options: [
      "Dividing by 2 with remainder 0 means the number is EVEN, but the code prints ODD",
      "4 is mathematically an odd number",
      "num % 2 is not valid arithmetic",
      "print cannot contain capital letters"
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
      "When volume exceeds 100%, it should be capped to 100 instead of allowing 150%",
      "volume cannot be an integer",
      "setVolume is forbidden in JavaScript",
      "150 should be spelled in words"
    ],
    correctOption: 0,
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
      "!= means 'NOT equal'; it only unlocks when the PIN is WRONG (should be ==)",
      "PIN numbers cannot have 4 digits",
      "unlock_door() requires quotation marks",
      "entered_pin must be a word"
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
    expectedOutput: "turn_on_ac()",
    actualOutput: "turn_on_heater()",
    options: [
      "When temperature is hot (>= 75), it should turn on AC, not the heater",
      "room_temp cannot exceed 50",
      "Heater can only be used in winter",
      "turn_on_heater must take two arguments"
    ],
    correctOption: 0,
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
      "Checking '>= 0' allows 0 items; cart must have at least 1 item (itemCount > 0) to checkout",
      "itemCount must be a string",
      "allowCheckout cannot be called without items",
      "0 is not allowed in JavaScript"
    ],
    correctOption: 0,
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
    expectedOutput: "2",
    actualOutput: "0",
    options: [
      "Advancing levels requires adding 1 (+ 1), but the code subtracted 1 (- 1)",
      "current_level cannot be 1",
      "print cannot output level numbers",
      "next_level should be multiplied by 10"
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
