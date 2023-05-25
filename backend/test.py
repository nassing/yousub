def formatString(string):
    allowedCharacters = "abcdefghijklmnopqrstuvwxyz"
    formatedString = ""
    for letter in string.lower():
        if letter in allowedCharacters:
            formatedString += letter
    return formatedString

def findOriginalIndex(string, index):
    allowedCharacters = "abcdefghijklmnopqrstuvwxyz"
    count = 0
    for i in range(len(string)):
        if string[i] in allowedCharacters:
            count += 1
        if count == index:
            return i + 1
    return len(string)



def compareAnswers(userInput, correctAnswer):
    formatedUserInput = formatString(userInput)
    correctAnswer = formatString(correctAnswer)
    match_index = 0
    for i in range(min(len(formatedUserInput), len(correctAnswer))):
        if formatedUserInput[i] != correctAnswer[i]:
            print("formatedUserInput[i]", formatedUserInput[i])
            print("correctAnswer[i]", correctAnswer[i])
            if i == 0:
                return "", userInput
            match_index = i - 1
            break
        elif i == min(len(formatedUserInput), len(correctAnswer)) - 1:
            match_index = i + 1
    print("u input", formatedUserInput)
    print("c input", correctAnswer)
    print("match_index", match_index)
    print("cropped", formatedUserInput[:match_index])
    match_index = findOriginalIndex(userInput, match_index)
    if userInput[match_index:] == "" and len(formatedUserInput) < len(correctAnswer):
        return userInput[:match_index], " ..."
    return userInput[:match_index], userInput[match_index:]