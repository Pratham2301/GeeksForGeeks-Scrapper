const cheerio = require("cheerio");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const fetch = require('node-fetch');


const getGfgScores = catchAsyncErrors(async (req, res) => {

    const userName = (req.body.username).trim();

    console.log(userName)


    if (!userName) {

        return res.json({
            "success": false,
            "error": 'UserName not found'
        });

    } else {

        let url = "https://auth.geeksforgeeks.org/user/" + userName + "/practice/";

        const response = await fetch(url);
        const text = await response.text();


        var $ = cheerio.load(text);
        let values = {};
        let problemDificultyTag = ["School", "Basic", "Easy", "Medium", "Hard"];
        let k = 0;

        let data = $('.tabs.tabs-fixed-width.linksTypeProblem');

        if (data.length == 0) {

            return res.json({
                "success": false,
                "error": "userName does not exist or not solved any problem on geeksforgeeks"
            });

        }
        else {

            let totalProblemSolved = 0;

            let rawData = $(data[0]).text();

            for (let i = 0; i < rawData.length; i++) {
                if (rawData[i] == '(') {
                    let tempStart = i + 1;
                    while (rawData[i] != ')') {
                        i++;
                    }

                    let tempProblems = parseInt(rawData.substring(tempStart, i));

                    values[problemDificultyTag[k++]] = tempProblems;

                    totalProblemSolved += tempProblems;

                }
            }

            values["userName"] = userName;
            values["totalProblemsSolved"] = totalProblemSolved;

            return res.json(
                {
                    "success": true,
                    "data": values
                }
            );

        }

    }

    return res.json({
        "success": false
    });

})

module.exports = getGfgScores;


// console.log(getGfgScores("prathamrajbhoj2003"))

// old structure of GFG
// data.each((i, x) => {
//     let temp = $(x).text();
//     let number = 0;
//     console.log(temp);
//     for (let i = temp.length - 1; i > 0; i--) {
//         if (temp[i] == ')') {
//             let j = i - 1;

//             while (temp[j] != '(') {

//                 j--;
//             }
//             number = parseInt(temp.substring(j + 1, i));
//             totalProblemSolved += number;

//             break;
//         }
//     }
//     values[problemDificultyTag[i]] = number;
// })