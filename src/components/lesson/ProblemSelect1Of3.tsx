import { Select_1_of_3 } from "~/pages/lesson";
import { ProgressBar } from "./ProgressBar";

export function ProblemSelect1Of3({
	problem,
	correctAnswerCount,
	totalCorrectAnswersNeeded,
	selectedAnswer,
	setSelectedAnswer,
	quitMessageShown,
	correctAnswerShown,
	setQuitMessageShown,
	isAnswerCorrect,
	onCheckAnswer,
	onFinish,
	onSkip,
	hearts,
}: {
	problem: Select_1_of_3;
	correctAnswerCount: number;
	totalCorrectAnswersNeeded: number;
	selectedAnswer: number | null;
	setSelectedAnswer: React.Dispatch<React.SetStateAction<number | null>>;
	correctAnswerShown: boolean;
	quitMessageShown: boolean;
	setQuitMessageShown: React.Dispatch<React.SetStateAction<boolean>>;
	isAnswerCorrect: boolean;
	onCheckAnswer: () => void;
	onFinish: () => void;
	onSkip: () => void;
	hearts: number | null;
}) {
	const { question, answers, correctAnswer } = problem;

	return (
		<>
            <h1 className="self-start text-2xl font-bold sm:text-3xl">
                {question}
            </h1>
            <div
                className="grid grid-cols-2 gap-2 sm:grid-cols-3"
                role="radiogroup"
            >
                {answers.map((answer, i) => {
                    return (
                        <div
                            key={i}
                            className={
                                i === selectedAnswer
                                    ? "cursor-pointer rounded-xl border-2 border-b-4 border-blue-300 bg-blue-100 p-4 text-blue-400"
                                    : "cursor-pointer rounded-xl border-2 border-b-4 border-gray-200 p-4 hover:bg-gray-100"
                            }
                            role="radio"
                            aria-checked={i === selectedAnswer}
                            tabIndex={0}
                            onClick={() => setSelectedAnswer(i)}
                        >
                            {answer.icon}
                            <h2 className="text-center">{answer.name}</h2>
                        </div>
                    );
                })}
            </div>
        </>
	);
};