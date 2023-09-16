import { Type_in_Foreign } from "~/pages/lesson";
import CheckAnswer from "./CheckAnswer";

export default function ProblemTypeInForeign({
    problem,
    selectedAnswer,
    setSelectedAnswer,
    correctAnswerShown,
    isAnswerCorrect,
    onCheckAnswer,
    onFinish,
    onSkip
}: {
    problem: Type_in_Foreign;
    selectedAnswer: string;
    setSelectedAnswer: React.Dispatch<React.SetStateAction<string>>;
	correctAnswerShown: boolean;
	isAnswerCorrect: boolean;
	onCheckAnswer: () => void;
	onFinish: () => void;
	onSkip: () => void;
}) {
    return (
        <>
            <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24pt" height="24pt" viewBox="0 0 24 24">
                    <path className="fill-blue-500" transform="matrix(1,0,0,-1,0,24)" d="M12 0C18.627417 0 24 5.372583 24 12 24 18.627417 18.627417 24 12 24 5.372583 24 0 18.627417 0 12 0 5.372583 5.372583 0 12 0ZM7.318019 15.762546C6.829864 15.27439 6.829864 14.482934 7.318019 13.994779L9.616117 11.696682C10.104272 11.208527 10.895728 11.208527 11.383883 11.696682L13.68198 13.994779C14.170135 14.482934 14.170135 15.27439 13.68198 15.762546L11.383883 18.060643C10.895728 18.548798 10.104272 18.548798 9.616117 18.060643L7.318019 15.762546ZM14.085769 10.171556C13.695245 10.562079 13.695245 11.195245 14.085769 11.585769L15.146429 12.646429C15.536953 13.036953 16.170119 13.036953 16.560643 12.646429L17.621304 11.585769C18.011828 11.195245 18.011828 10.562079 17.621304 10.171556L16.560643 9.110895C16.170119 8.720371 15.536953 8.720371 15.146429 9.110895L14.085769 10.171556ZM10.435603 7.435604C10.142711 7.14271 10.142711 6.667837 10.435603 6.374943L11.142711 5.667837C11.435603 5.374943 11.910478 5.374943 12.20337 5.667837L12.910478 6.374943C13.20337 6.667837 13.20337 7.14271 12.910478 7.435604L12.20337 8.142711C11.910478 8.435603 11.435603 8.435603 11.142711 8.142711L10.435603 7.435604Z" fill-rule="evenodd"/>
                </svg>

                <h2 className="text-blue-500 font-bold">New Word</h2>
            </div>

            <h1 className="text-2xl font-bold sm:text-3xl">
                Translate this Word
            </h1>

            <div className="flex flex-col gap-12 items-center mt-20">
                <span className="border-2 border-gray-200 px-6 py-3 rounded-2xl min-w-[5rem] text-center">
                    {problem.question}
                </span>

                <input
                    value={selectedAnswer ?? ""}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    placeholder="Write in English"
                    className="bg-[#f7f7f7] max-w-lg w-full block px-3 py-2.5 rounded-xl border-2 border-[#e5e5e5]"
                />
            </div>

            <CheckAnswer
				correctAnswer={problem.correctAnswer}
				correctAnswerShown={correctAnswerShown}
				isAnswerCorrect={isAnswerCorrect}
				isAnswerSelected={(selectedAnswer?.length ?? 0) > 0}
				onCheckAnswer={onCheckAnswer}
				onFinish={onFinish}
				onSkip={onSkip}
			/>
        </>
    )
}