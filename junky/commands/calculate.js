exports.run = (client, message, args, h) => {
    
    // If there are less than 2 numbers, don't do anything.
    if(!args || args.length < 2) return;

    // Save the numbers to variables.
    firstNumber = parseFloat(args[0]);
    secondNumber = parseFloat(args[2]);

    // If any of those numbers are actually strings (or not a number in general), don't do anything.
    if(isNaN(firstNumber) || isNaN(secondNumber)) return;

    var operator = args[1];

    switch(operator)
    {
        case "+":
            message.reply(firstNumber + secondNumber);
            break;
        case "-":
            message.reply(firstNumber - secondNumber);
            break;
        case "*":
            message.reply(firstNumber * secondNumber);
            break;
        case "/":
            message.reply(firstNumber / secondNumber);
            break;
        case "%":
            message.reply(firstNumber % secondNumber);
            break;
        default:
            break;
    }

}