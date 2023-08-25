

function generateFile(classname, subject, chapter) {

    if (subject=="evs") {
        var filename = "evs_" + classname + "_" + chapter + ".md";
    }
}


// Classname array is an array of strings containing values Class-1, Class-2, Class-3, Class-4, Class-5, Class-6, Class-7, Class-8, Class-9, Class-10
// Subject array is an array of strings containing values evs, maths, science, english, hindi, sanskrit
let Classname = ["Class-1", "Class-2", "Class-3", "Class-4", "Class-5", "Class-6", "Class-7", "Class-8", "Class-9", "Class-10"];
let Subject = ["evs", "maths", "science", "english", "hindi", "sanskrit"];

let pathbase = "~/Projects/SchoolDoc/SchoolDoc/Generated/"
// iterate over classname array to create folder of classname
for (let i = 0; i < Classname.length; i++) {
    // create a folder of classname using fs module
    fs.mkdirSync(pathbase + Classname[i]);
    // iterate over subject array to create folder of subject inside classname folder
    for (let j = 0; j < Subject.length; j++) {
        // create a folder of subject inside classname folder
        fs.mkdirSync(pathbase + Classname[i] + '/' + Subject[j]);

    }
}