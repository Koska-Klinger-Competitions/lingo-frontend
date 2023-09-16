import React, { useMemo } from 'react'
import { Transcribe_Easy, Translate_to_English } from "~/pages/lesson";
import CheckAnswer from './CheckAnswer';
import { SpeakerIconSvg } from '../Svgs';
import { backendPath } from '~/utils/definitions';
import { useBoundStore } from '~/hooks/useBoundStore';

export default function ProblemTranscribeEasy({
	problem,
	selectedAnswers,
	setSelectedAnswers,
	correctAnswerShown,
	isAnswerCorrect,
	onCheckAnswer,
	onFinish,
	onSkip
}: {
	problem: Transcribe_Easy;
	selectedAnswers: number[];
	setSelectedAnswers: React.Dispatch<React.SetStateAction<number[]>>;
	correctAnswerShown: boolean;
	isAnswerCorrect: boolean;
	onCheckAnswer: () => void;
	onFinish: () => void;
	onSkip: () => void;
}) {
	const { question, correctAnswer, answerTiles } = problem;

    const language = useBoundStore((x) => x.language);
    const audio = useMemo(() => new Audio(`${backendPath}/audio/${language.code}/${problem.audio}`), [problem.audio])

	return (
		<>
            <h1 className="mb-2 text-2xl font-bold sm:text-3xl">
                Tap what you hear
            </h1>

            <div className="flex items-center gap-2 px-2">
                <button
                    onClick={() => audio.play()}
                    className="rounded-2xl border-b-4 border-blue-600 bg-blue-500 text-white transition hover:brightness-110 p-4"
                >
                    <SpeakerIconSvg className="w-16 h-16" />
                </button>
            </div>

            <div className="w-full">
                <div className="flex min-h-[60px] flex-wrap gap-1 border-b-2 border-t-2 border-gray-200 py-1">
                    {selectedAnswers.map((i) => {
                        return (
                            <button
                                key={i}
                                className="rounded-2xl border-2 border-b-4 border-gray-200 p-2 text-gray-700"
                                onClick={() => {
                                    setSelectedAnswers((selectedAnswers) => {
                                        return selectedAnswers.filter((x) => x !== i);
                                    });
                                }}
                            >
                                {answerTiles[i]}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-1">
                {answerTiles.map((answerTile, i) => {
                    return (
                        <button
                            key={i}
                            className={
                                selectedAnswers.includes(i)
                                    ? "rounded-2xl border-2 border-b-4 border-gray-200 bg-gray-200 p-2 text-gray-200"
                                    : "rounded-2xl border-2 border-b-4 border-gray-200 p-2 text-gray-700"
                            }
                            disabled={selectedAnswers.includes(i)}
                            onClick={() =>
                                setSelectedAnswers((selectedAnswers) => {
                                    if (selectedAnswers.includes(i)) {
                                        return selectedAnswers;
                                    }
                                    return [...selectedAnswers, i];
                                })
                            }
                        >
                            {answerTile}
                        </button>
                    );
                })}
            </div>

            <CheckAnswer
				correctAnswer={correctAnswer.map((i) => answerTiles[i]).join(" ")}
				correctAnswerShown={correctAnswerShown}
				isAnswerCorrect={isAnswerCorrect}
				isAnswerSelected={selectedAnswers.length > 0}
				onCheckAnswer={onCheckAnswer}
				onFinish={onFinish}
				onSkip={onSkip}
			/>
        </>
	);
};
