"use strict";
// This script generates a Bingo card with random questions from a provided list and exports it as a PDF
Object.defineProperty(exports, "__esModule", { value: true });
const jspdf_1 = require("jspdf");
function generateBingoCard(questions) {
    if (questions.length < 25) {
        throw new Error("You need at least 25 questions to generate a full Bingo card.");
    }
    // Shuffle the questions array using Fisher-Yates algorithm
    const shuffledQuestions = [...questions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuestions[i], shuffledQuestions[j]] = [
            shuffledQuestions[j],
            shuffledQuestions[i],
        ];
    }
    // Create a 5x5 Bingo card
    const bingoCard = [];
    for (let i = 0; i < 5; i++) {
        bingoCard.push(shuffledQuestions.slice(i * 5, i * 5 + 5));
    }
    // Add a "FREE" space in the center of the card
    bingoCard[2][2] = "FREE";
    return bingoCard;
}
function exportBingoCardToPDF(bingoCard) {
    const doc = new jspdf_1.jsPDF();
    // Set font and title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Bingo Card", 105, 20, { align: "center" });
    // Draw the Bingo grid
    const startX = 20;
    const startY = 30;
    const cellSize = 40;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const x = startX + col * cellSize;
            const y = startY + row * cellSize;
            // Draw cell border
            doc.rect(x, y, cellSize, cellSize);
            // Add text in the cell
            const text = bingoCard[row][col];
            doc.text(text, x + cellSize / 2, y + cellSize / 2, {
                align: "center",
                baseline: "middle",
            });
        }
    }
    // Save the PDF
    doc.save("bingo_card.pdf");
}
// Example usage
const questions = [
    "What is your favorite color?",
    "What is your dream job?",
    "Name a place you want to visit.",
    "What is your favorite food?",
    "What is your favorite movie?",
    "What is your biggest fear?",
    "Name a hobby you enjoy.",
    "What is your favorite book?",
    "What is your favorite season?",
    "What is your favorite sport?",
    "Name a skill you'd like to learn.",
    "What is your favorite animal?",
    "What is your favorite song?",
    "What is your favorite TV show?",
    "Name a goal you have.",
    "What is your favorite holiday?",
    "Name a historical figure you admire.",
    "What is your favorite dessert?",
    "What is your favorite drink?",
    "What is your favorite childhood memory?",
    "What is your dream car?",
    "What is your favorite game?",
    "Name a language you'd like to learn.",
    "What is your favorite band?",
    "What is your favorite superhero?",
];
const bingoCard = generateBingoCard(questions);
exportBingoCardToPDF(bingoCard);
