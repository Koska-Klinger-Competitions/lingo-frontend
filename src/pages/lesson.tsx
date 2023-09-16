import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import {
	AppleSvg,
	BoySvg,
	CloseSvg,
	LessonTopBarEmptyHeart,
	LessonTopBarHeart,
	WomanSvg,
} from "~/components/Svgs";
import { useBoundStore } from "~/hooks/useBoundStore";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { heartAtom } from "~/stores/definitions_jotai";
import { useQuery } from "react-query";
import { backendPath } from "~/utils/definitions";
import ProblemTypeInForeign from "~/components/lesson/ProblemTypeInForeign";
import { LessonFastForwardEndFail, LessonFastForwardEndPass, LessonFastForwardStart } from "~/components/lesson/LessonFastForward";
import { ProgressBar, QuitMessage } from "~/components/lesson/ProgressBar";
import LessonComplete from "~/components/lesson/LessonComplete";
import { ProblemSelect1Of3 } from "~/components/lesson/ProblemSelect1Of3";
import ProblemWriteInEnglish from "~/components/lesson/ProblemWriteInEnglish";
import ProblemTranscribeEasy from "~/components/lesson/ProblemTranscribeEasy";
import { compareText, simplifyText } from "~/utils/comparisons";

// MARK: Types
export type QuestionResult = {
	question: string;
	yourResponse: string;
	correctResponse: string;
};

interface LessonProblem {
	question: string,
}

type LessonProblems = Select_1_of_3 | Translate_to_English | Type_in_Foreign | Transcribe_Easy

export interface Select_1_of_3 extends LessonProblem {
    type: 'SELECT_1_OF_3',
	answers: readonly [{
		icon: JSX.Element, 
		name: string
	}],
	correctAnswer: number
}

export interface Translate_to_English extends LessonProblem {
    type: 'TRANSLATE_TO_ENGLISH'
	answerTiles: readonly string[], 
	correctAnswer: readonly number[]
}

export interface Type_in_Foreign extends LessonProblem {
    type: "TYPE_IN_FOREIGN"
    correctAnswer: string
}

export interface Transcribe_Easy extends LessonProblem {
    type: "TRANSCRIBE_EASY"
    audio: string
    answerTiles: readonly string[], 
	correctAnswer: readonly number[]
}


// MARK: Functions
function numbersEqual(a: readonly number[], b: readonly number[], values: string): boolean {
	return a.length === b.length && a.every((_, i) => values[a[i]!] === values[b[i]!]);
}

const Lesson: NextPage = () => {
	const router = useRouter();

	const [lessonProblem, setLessonProblem] = useState(0);
	const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
	const [incorrectAnswerCount, setIncorrectAnswerCount] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState<null | number>(null);
	const [correctAnswerShown, setCorrectAnswerShown] = useState(false);
	const [quitMessageShown, setQuitMessageShown] = useState(false);

	const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

	const startTime = useRef(Date.now());
	const endTime = useRef(startTime.current + 1000 * 60 * 3 + 1000 * 33);

	const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);
	const [reviewLessonShown, setReviewLessonShown] = useState(false);

	const [isStartingLesson, setIsStartingLesson] = useState(true);

	const skipLesson = "fast-forward" in router.query && !isNaN(Number(router.query["fast-forward"])); 

    const lang = router.query.lang as string
    const unit = router.query.unit as string
    const lesson = router.query.lesson as string
    const level = router.query.level as string

    const query = useQuery<LessonProblems[] | null>(`tasks-${lang}-${unit}-${lesson}-${level}`, () => getTasks(lang, unit, lesson, level))

    if (query.isLoading) return <h1>Is Loading....</h1>
    if (!query.isSuccess) {
        return <h1>Loading failed... please try again!</h1>
    }

    if (query.data == null) return null

    const lessonProblems = query.data as LessonProblems[]
    const totalCorrectAnswersNeeded = lessonProblems.length;

	if (!lessonProblems[lessonProblem]) 
		throw "[SIGSEG] Array out of bounds access: Lesson counter not inside valid range"
	
	const problem = lessonProblems[lessonProblem]!;

	// @TODO Fix hearts
	let hearts = skipLesson ? 3 - incorrectAnswerCount : null; 

	const { correctAnswer } = problem;
	const isAnswerCorrect = Array.isArray(correctAnswer)
		? numbersEqual(selectedAnswers, correctAnswer, (problem as any)['answerTiles'])
		: compareText(selectedAnswer as any, correctAnswer as any);

	const onCheckAnswer = () => {
        console.log(isAnswerCorrect)

		setCorrectAnswerShown(true);
		if (isAnswerCorrect) {
			setCorrectAnswerCount((x) => x + 1);
		} else {
			setIncorrectAnswerCount((x) => x + 1);
		}
		// setQuestionResults((questionResults) => [
		// 	...questionResults,
		// 	{
		// 		question: problem.question,
		// 		yourResponse:
		// 			problem.type === "SELECT_1_OF_3"
		// 				? problem.answers[selectedAnswer ?? 0]?.name ?? ""
		// 				: selectedAnswers.map((i) => problem.answerTiles[i]).join(" "),
		// 		correctResponse:
		// 			problem.type === "SELECT_1_OF_3"
		// 				? problem.answers[problem.correctAnswer].name
		// 				: problem.correctAnswer
		// 					.map((i) => problem.answerTiles[i])
		// 					.join(" "),
		// 	},
		// ]);
	};

	const onFinish = () => {
		setSelectedAnswer(null);
		setSelectedAnswers([]);
		setCorrectAnswerShown(false);
		setLessonProblem((x) => (x + 1) % lessonProblems.length);
		endTime.current = Date.now();
	};

	const onSkip = () => {
		setSelectedAnswer(null);
		setCorrectAnswerShown(true);
	};

	const unitNumber = Number(router.query["fast-forward"]);

	if (hearts !== null && hearts < 0 && !correctAnswerShown) {
		return (
			<LessonFastForwardEndFail
				unitNumber={unitNumber}
				reviewLessonShown={reviewLessonShown}
				setReviewLessonShown={setReviewLessonShown}
				questionResults={questionResults}
			/>
		);
	}

	if (
		hearts !== null &&
		hearts >= 0 &&
		!correctAnswerShown &&
		correctAnswerCount >= totalCorrectAnswersNeeded
	) {
		return (
			<LessonFastForwardEndPass
				unitNumber={unitNumber}
				reviewLessonShown={reviewLessonShown}
				setReviewLessonShown={setReviewLessonShown}
				questionResults={questionResults}
			/>
		);
	}

	if (hearts !== null && isStartingLesson) {
		return (
			<LessonFastForwardStart
				unitNumber={unitNumber}
				setIsStartingLesson={setIsStartingLesson}
			/>
		);
	}

	if (correctAnswerCount >= totalCorrectAnswersNeeded && !correctAnswerShown) {
		return (
			<LessonComplete
				correctAnswerCount={correctAnswerCount}
				incorrectAnswerCount={incorrectAnswerCount}
				startTime={startTime}
				endTime={endTime}
				reviewLessonShown={reviewLessonShown}
				setReviewLessonShown={setReviewLessonShown}
				questionResults={questionResults}
			/>
		);
	}

    var problemView: any = null

	switch (problem.type) {
		case "SELECT_1_OF_3": {
			problemView = (
				<ProblemSelect1Of3
					problem={problem}
					correctAnswerCount={correctAnswerCount}
					totalCorrectAnswersNeeded={totalCorrectAnswersNeeded}
					selectedAnswer={selectedAnswer}
					setSelectedAnswer={setSelectedAnswer}
					quitMessageShown={quitMessageShown}
					correctAnswerShown={correctAnswerShown}
					setQuitMessageShown={setQuitMessageShown}
					isAnswerCorrect={isAnswerCorrect}
					onCheckAnswer={onCheckAnswer}
					onFinish={onFinish}
					onSkip={onSkip}
					hearts={hearts}
				/>
			);
            break
		}

		case "TRANSLATE_TO_ENGLISH": {
			problemView = (
				<ProblemWriteInEnglish
					problem={problem}
					selectedAnswers={selectedAnswers}
					setSelectedAnswers={setSelectedAnswers}
					correctAnswerShown={correctAnswerShown}
					isAnswerCorrect={isAnswerCorrect}
					onCheckAnswer={onCheckAnswer}
					onFinish={onFinish}
					onSkip={onSkip}
				/>
			);
            break
		}

        case "TYPE_IN_FOREIGN":
            problemView = (
				<ProblemTypeInForeign
					problem={problem}
					selectedAnswer={selectedAnswer as unknown as string}
					setSelectedAnswer={setSelectedAnswer as unknown as React.Dispatch<React.SetStateAction<string>>}
					correctAnswerShown={correctAnswerShown}
					isAnswerCorrect={isAnswerCorrect}
					onCheckAnswer={onCheckAnswer}
					onFinish={onFinish}
					onSkip={onSkip}
				/>
			);
            break

        case "TRANSCRIBE_EASY":
            problemView = (
                <ProblemTranscribeEasy
                    problem={problem}
					selectedAnswers={selectedAnswers}
					setSelectedAnswers={setSelectedAnswers}
					correctAnswerShown={correctAnswerShown}
					isAnswerCorrect={isAnswerCorrect}
					onCheckAnswer={onCheckAnswer}
					onFinish={onFinish}
					onSkip={onSkip}
                />
            )
	}

    return (
        <div className="flex min-h-screen flex-col gap-5 px-4 py-5 sm:px-0 sm:py-0">
			<div className="flex grow flex-col items-center gap-5">
				<div className="w-full max-w-5xl sm:mt-8 sm:px-5">
					<ProgressBar
						correctAnswerCount={correctAnswerCount}
						totalCorrectAnswersNeeded={totalCorrectAnswersNeeded}
						setQuitMessageShown={setQuitMessageShown}
						hearts={hearts}
					/>
				</div>
				<section className="mt-4 flex max-w-3xl w-full flex-col gap-4">
                    {problemView}
                </section>
            </div>

			<QuitMessage
				quitMessageShown={quitMessageShown}
				setQuitMessageShown={setQuitMessageShown}
			/>
        </div>
    )
};

export default Lesson;


async function getTasks(lang: string, unit: string, lesson: string, level: string): Promise<LessonProblems[] | null> {
    if (lang == null || unit == null || lesson == null || level == null) return null

    // @TODO: store the course
    return await fetch(`${backendPath}/tasks/${lang}-beginner-basic/${unit}/${lesson}/tasks/${level}`)
        .then(res => res.json())
		.then((res: any[]) => {
            return res.map((task) => {
                switch (task.type) {
                    case 'vocab':
                        return {
                            type: 'TYPE_IN_FOREIGN',
                            question: task.new_word,
                            correctAnswer: task.translation
                        } as Type_in_Foreign

                    case 'transcribe_easy': {
                        const tiles: string[] = task.options.sort((a: any, b: any) => 0.5 - Math.random())

                        return {
                            type: 'TRANSCRIBE_EASY',
                            question: task.sentence,
                            answerTiles: tiles,
                            correctAnswer: task.sentence.split(" ").map((x: string) => tiles.map((t) => simplifyText(t)).indexOf(simplifyText(x))),
                            audio: task.spoken_id
                        } as Transcribe_Easy
                    }

                    // case 'transcribe_easy': {
                    //     const tiles: string[] = task.options.sort((a: any, b: any) => 0.5 - Math.random())
                    //     return {
                    //         type: 'TRANSCRIBE_EASY',
                    //         question: task.sentence,
                    //         answerTiles: task.options.sort((a: any, b: any) => 0.5 - Math.random()),
                    //         correctAnswer: task.sentence.split(" ").map((x: string) => tiles.map((t) => t.toLowerCase()).indexOf(x)),
                    //         audio: task.spoken_id
                    //     } as Transcribe_Easy
                    // }
                }

                console.log(task)

                return null as unknown as LessonProblems
            }).filter((x) => x != null)
        })
}
