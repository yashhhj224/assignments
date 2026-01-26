import { Question, Category, Difficulty } from "./types.js"

export const quizPool: Record<Category, Record<Difficulty, Question[]>> = {
    general: {
        easy: [
            { question: "Which planet is known as the Red Planet?", options: ["Venus","Mars","Jupiter","Mercury"], answer: "Mars" },
            { question: "How many days are in a leap year?", options: ["365","366","364","360"], answer: "366" },
            { question: "What is the largest ocean?", options: ["Atlantic","Indian","Pacific","Arctic"], answer: "Pacific" },
            { question: "How many continents does Earth have?", options: ["5","6","7","8"], answer: "7" },
            { question: "Which animal is known as the King of the Jungle?", options: ["Tiger","Elephant","Lion","Leopard"], answer: "Lion" },
            { question: "Which gas do plants take in?", options: ["Oxygen","Hydrogen","Carbon Dioxide","Nitrogen"], answer: "Carbon Dioxide" },
            { question: "How many colors are in a rainbow?", options: ["5","6","7","8"], answer: "7" }
        ],
        medium: [
            { question: "Who wrote Romeo and Juliet?", options: ["Shakespeare","Dickens","Mark Twain","Oscar Wilde"], answer: "Shakespeare" },
            { question: "What is H2O commonly known as?", options: ["Salt","Water","Sugar","Ice"], answer: "Water" },
            { question: "Which country invented pizza?", options: ["USA","Spain","Italy","France"], answer: "Italy" },
            { question: "Which planet has the most moons?", options: ["Earth","Saturn","Mars","Jupiter"], answer: "Saturn" },
            { question: "Which is the longest river?", options: ["Amazon","Nile","Yangtze","Ganga"], answer: "Nile" },
            { question: "What is the capital of Japan?", options: ["Beijing","Tokyo","Osaka","Seoul"], answer: "Tokyo" },
            { question: "Which metal is liquid at room temperature?", options: ["Gold","Mercury","Silver","Copper"], answer: "Mercury" }
        ],
        hard: [
            { question: "Which gas is highest in Earth’s atmosphere?", options: ["Oxygen","Nitrogen","CO2","Hydrogen"], answer: "Nitrogen" },
            { question: "What is the speed of sound?", options: ["343 m/s","200 m/s","1000 m/s","720 m/s"], answer: "343 m/s" },
            { question: "Who discovered gravity?", options: ["Einstein","Newton","Tesla","Edison"], answer: "Newton" },
            { question: "What is the largest bone in the human body?", options: ["Skull","Femur","Rib","Spine"], answer: "Femur" },
            { question: "Which country has the highest population?", options: ["USA","China","India","Russia"], answer: "India" },
            { question: "What is the chemical symbol for gold?", options: ["Gd","Au","Ag","Go"], answer: "Au" },
            { question: "Which is the coldest place on Earth?", options: ["North Pole","Antarctica","Siberia","Iceland"], answer: "Antarctica" }
        ]
    },

    tech: {
        easy: [
            { question: "HTML stands for?", options: ["Hyper Text Markup Language","Home Tool Markup Language","High Tech Module Layer","Hybrid Text Machine Language"], answer: "Hyper Text Markup Language" },
            { question: "CSS is used for?", options: ["Structure","Styling","Backend","Database"], answer: "Styling" },
            { question: "JS stands for?", options: ["JavaStyle","JavaScript","JustScript","JumboScript"], answer: "JavaScript" },
            { question: "RAM stores?", options: ["Permanent data","Temporary data","Movies","Passwords"], answer: "Temporary data" },
            { question: "Which company owns Android?", options: ["Apple","Samsung","Google","IBM"], answer: "Google" },
            { question: "VS Code is a?", options: ["Browser","Text Editor","Compiler","Search Engine"], answer: "Text Editor" },
            { question: "GitHub is a?", options: ["Hosting service","Movie site","VPN","Game"], answer: "Hosting service" }
        ],
        medium: [
            { question: "CSS stands for?", options: ["Creative Style System","Cascading Style Sheets","Custom Select Script","Color Styling Setup"], answer: "Cascading Style Sheets" },
            { question: "React is a ___?", options: ["Database","Frontend Library","OS","Compiler"], answer: "Frontend Library" },
            { question: "LocalStorage stores data?", options: ["Until tab closes","Until browser closes","Until manually removed","Only in RAM"], answer: "Until manually removed" },
            { question: "Which protocol is secure?", options: ["HTTP","FTP","HTTPS","SMTP"], answer: "HTTPS" },
            { question: "Which is a NoSQL DB?", options: ["MySQL","MongoDB","PostgreSQL","Oracle"], answer: "MongoDB" },
            { question: "setTimeout is?", options: ["Synchronous","Asynchronous","Blocking","Compiler API"], answer: "Asynchronous" },
            { question: "JS was created by?", options: ["Google","Oracle","Netscape","Microsoft"], answer: "Netscape" }
        ],
        hard: [
            { question: "What does API stand for?", options: ["Application Programming Interface","Advanced Programming Input","App Process Integration","Automated Program Index"], answer: "Application Programming Interface" },
            { question: "Which is not a programming paradigm?", options: ["OOP","Functional","Declarative","Modular"], answer: "Modular" },
            { question: "Time complexity of binary search?", options: ["O(n)","O(log n)","O(n log n)","O(1)"], answer: "O(log n)" },
            { question: "Which is a backend language?", options: ["HTML","CSS","Java","Figma"], answer: "Java" },
            { question: "CI/CD stands for?", options: ["Continuous Improvement/Delivery","Continuous Integration/Deployment","Code Integration/Debugging","Compiled Input/Data"], answer: "Continuous Integration/Deployment" },
            { question: "Linux command to list files?", options: ["ls","cat","rm","pwd"], answer: "ls" },
            { question: "Python creator?", options: ["Linus Torvalds","James Gosling","Guido van Rossum","Elon Musk"], answer: "Guido van Rossum" }
        ]
    },

    science: {
        easy: [
            { question: "Chemical formula of water?", options: ["H2O","HO2","O2H","OH"], answer: "H2O" },
            { question: "Plants prepare food by?", options: ["Breathing","Photosynthesis","Digestion","Evaporation"], answer: "Photosynthesis" },
            { question: "Earth is shaped like?", options: ["Flat","Square","Sphere","Cone"], answer: "Sphere" },
            { question: "Human body has how many bones?", options: ["206","208","204","210"], answer: "206" },
            { question: "Which part of plant absorbs water?", options: ["Leaf","Root","Stem","Flower"], answer: "Root" },
            { question: "Sun rises from?", options: ["North","South","East","West"], answer: "East" },
            { question: "Which gas do humans breathe in?", options: ["CO2","H2","Oxygen","Methane"], answer: "Oxygen" }
        ],
        medium: [
            { question: "Heart beats per minute?", options: ["30-40","60-100","120-150","200-300"], answer: "60-100" },
            { question: "Which is not a planet?", options: ["Mars","Venus","Pluto","Jupiter"], answer: "Pluto" },
            { question: "Largest organ?", options: ["Heart","Brain","Skin","Liver"], answer: "Skin" },
            { question: "Human blood is?", options: ["Blue","Red","Green","Yellow"], answer: "Red" },
            { question: "Water freezes at?", options: ["0°C","10°C","50°C","100°C"], answer: "0°C" },
            { question: "The sun is a?", options: ["Planet","Star","Comet","Galaxy"], answer: "Star" },
            { question: "Sound cannot travel through?", options: ["Air","Water","Steel","Vacuum"], answer: "Vacuum" }
        ],
        hard: [
            { question: "Speed of light?", options: ["3×10^8 m/s","3×10^6 m/s","1×10^7 m/s","5×10^8 m/s"], answer: "3×10^8 m/s" },
            { question: "Brain has how many neurons?", options: ["1 million","10 million","100 billion","1 trillion"], answer: "100 billion" },
            { question: "What is the pH of water?", options: ["1","7","14","5"], answer: "7" },
            { question: "What is atomic number?", options: ["Mass","Charge","Protons","Electrons"], answer: "Protons" },
            { question: "Einstein won Nobel Prize for?", options: ["Relativity","Photoelectric Effect","Quantum Theory","Gravity"], answer: "Photoelectric Effect" },
            { question: "Which vitamin is produced in sunlight?", options: ["A","B","C","D"], answer: "D" },
            { question: "Which planet has rings?", options: ["Mars","Earth","Saturn","Neptune"], answer: "Saturn" }
        ]
    }
}
