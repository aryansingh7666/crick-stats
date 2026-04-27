import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CricketBall } from "./CricketBall";
import { Button } from "./ui/button";
import { Timer, CheckCircle2, XCircle, Share2, RotateCcw } from "lucide-react";

const QUESTIONS = [
  {
    question: "Who holds the record for the most runs in a single IPL season?",
    options: ["Chris Gayle", "Virat Kohli", "David Warner", "Jos Buttler"],
    answer: 1,
    explanation: "Virat Kohli scored a staggering 973 runs in the 2016 season, including 4 hundreds."
  },
  {
    question: "Which team won the first ever IPL in 2008?",
    options: ["Mumbai Indians", "Chennai Super Kings", "Rajasthan Royals", "Deccan Chargers"],
    answer: 2,
    explanation: "Rajasthan Royals, led by Shane Warne, defeated CSK in the final to win the inaugural title."
  },
  {
    question: "Who is the only player to have won 5 IPL titles as captain?",
    options: ["MS Dhoni", "Rohit Sharma", "Hardik Pandya", "Gautam Gambhir"],
    answer: 1,
    explanation: "Rohit Sharma led Mumbai Indians to titles in 2013, 2015, 2017, 2019, and 2020."
  }
];

export const Quiz = () => {
  const [step, setStep] = useState<"start" | "quiz" | "results">("start");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  const handleStart = () => {
    setStep("quiz");
    setCurrentIdx(0);
    setScore(0);
    setTimeLeft(15);
  };

  const handleOptionSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === QUESTIONS[currentIdx].answer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(15);
    } else {
      setStep("results");
    }
  };

  useEffect(() => {
    if (step === "quiz" && !isAnswered && timeLeft > 0) {
      const t = setInterval(() => setTimeLeft(l => l - 1), 1000);
      return () => clearInterval(t);
    } else if (timeLeft === 0 && !isAnswered) {
      setIsAnswered(true);
    }
  }, [step, timeLeft, isAnswered]);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-0">
      <AnimatePresence mode="wait">
        {step === "start" && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-primary blur-[80px] opacity-30" />
              <CricketBall size={window.innerWidth < 768 ? 80 : 120} />
            </div>
            <h1 className="font-display text-[2.5rem] md:text-[4rem] text-gradient-orange leading-none mb-4">
              IPL MASTERMIND
            </h1>
            <p className="text-muted-foreground text-sm md:text-lg max-w-md mx-auto mb-10">
              Test your knowledge of the world's most exciting T20 league. Are you a true fan?
            </p>
            <Button 
              onClick={handleStart}
              className="w-full md:w-auto h-14 px-12 bg-gradient-orange text-white font-bold text-lg rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
            >
              START QUIZ
            </Button>
          </motion.div>
        )}

        {step === "quiz" && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative w-[60px] h-[60px] md:w-[80px] md:h-[80px] grid place-items-center">
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle 
                      cx="50%" cy="50%" r="45%" 
                      className="fill-none stroke-white/5 stroke-[4]" 
                    />
                    <motion.circle 
                      cx="50%" cy="50%" r="45%" 
                      className="fill-none stroke-primary stroke-[4]"
                      strokeDasharray="283"
                      animate={{ strokeDashoffset: 283 - (timeLeft / 15) * 283 }}
                    />
                  </svg>
                  <span className="font-mono text-xl md:text-2xl font-bold text-primary">{timeLeft}</span>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Question</div>
                  <div className="font-display text-2xl text-foreground">{currentIdx + 1} / {QUESTIONS.length}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Current Score</div>
                <div className="font-display text-2xl text-success">{score}</div>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-glass rounded-3xl border border-white/10 p-6 md:p-10">
              <h3 className="text-lg md:text-2xl font-bold text-foreground mb-8 leading-tight">
                {QUESTIONS[currentIdx].question}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {QUESTIONS[currentIdx].options.map((option, i) => {
                  const isCorrect = i === QUESTIONS[currentIdx].answer;
                  const isSelected = i === selectedOption;
                  const showCorrect = isAnswered && isCorrect;
                  const showWrong = isAnswered && isSelected && !isCorrect;

                  return (
                    <button
                      key={i}
                      disabled={isAnswered}
                      onClick={() => handleOptionSelect(i)}
                      className={`relative w-full h-14 md:h-16 flex items-center px-6 rounded-2xl border transition-all text-left ${
                        showCorrect ? "bg-success/20 border-success text-success" :
                        showWrong ? "bg-destructive/20 border-destructive text-destructive" :
                        isSelected ? "bg-primary/20 border-primary text-primary" :
                        "bg-white/5 border-white/5 text-foreground/80 hover:bg-white/10"
                      }`}
                    >
                      <span className="text-sm md:text-lg font-medium">{option}</span>
                      {showCorrect && <CheckCircle2 className="ml-auto h-5 w-5" />}
                      {showWrong && <XCircle className="ml-auto h-5 w-5" />}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/5 text-sm md:text-base text-muted-foreground leading-relaxed"
                >
                  <span className="text-primary font-bold mr-2 italic">Fact Check:</span>
                  {QUESTIONS[currentIdx].explanation}
                </motion.div>
              )}
            </div>

            <Button
              disabled={!isAnswered}
              onClick={handleNext}
              className="w-full h-14 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-2xl"
            >
              {currentIdx < QUESTIONS.length - 1 ? "NEXT QUESTION" : "SEE RESULTS"}
            </Button>
          </motion.div>
        )}

        {step === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-12 text-center"
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-success blur-[80px] opacity-20" />
              <div className="font-display text-[6rem] md:text-[8rem] text-success leading-none">
                {Math.round((score / QUESTIONS.length) * 100)}%
              </div>
            </div>
            
            <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4">
              {score === QUESTIONS.length ? "GOD-TIER FAN! 🏏" : score >= 1 ? "GREAT JOB! 👏" : "BETTER LUCK NEXT TIME 😢"}
            </h2>
            
            <div className="grid grid-cols-3 gap-4 md:gap-8 mb-12 w-full max-w-md">
              <StatItem label="Correct" value={score} color="text-success" />
              <StatItem label="Wrong" value={QUESTIONS.length - score} color="text-destructive" />
              <StatItem label="Rank" value={score === QUESTIONS.length ? "PRO" : "ROOKIE"} color="text-primary" />
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
              <Button 
                onClick={handleStart}
                className="flex-1 h-14 bg-white/5 border border-white/10 text-white gap-2 rounded-2xl hover:bg-white/10"
              >
                <RotateCcw size={20} /> PLAY AGAIN
              </Button>
              <Button 
                className="flex-1 h-14 bg-gradient-orange text-white gap-2 rounded-2xl shadow-lg shadow-primary/20"
              >
                <Share2 size={20} /> SHARE SCORE
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StatItem = ({ label, value, color }: { label: string; value: string | number; color: string }) => (
  <div className="flex flex-col items-center">
    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-black mb-1">{label}</div>
    <div className={`text-2xl md:text-3xl font-display ${color}`}>{value}</div>
  </div>
);
