import Link from "next/link";
import { useState } from "react";

import {
	BigCloseSvg,
	DoneSvg,
	LessonFastForwardEndFailSvg,
	LessonFastForwardEndPassSvg,
	LessonFastForwardStartSvg,
} from "~/components/Svgs";

import { useBoundStore } from "~/hooks/useBoundStore";
import { QuestionResult } from "~/pages/lesson";

export function ReviewLesson({
	reviewLessonShown,
	setReviewLessonShown,
	questionResults,
}: {
	reviewLessonShown: boolean;
	setReviewLessonShown: React.Dispatch<React.SetStateAction<boolean>>;
	questionResults: QuestionResult[];
}) {
	const [selectedQuestionResult, setSelectedQuestionResult] = useState<null | QuestionResult>(null);
	return (
		<div
			className={[
				"fixed inset-0 flex items-center justify-center p-5 transition duration-300",
				reviewLessonShown ? "" : "pointer-events-none opacity-0",
			].join(" ")}
		>
			<div
				className={[
					"absolute inset-0 bg-black",
					reviewLessonShown ? "opacity-75" : "pointer-events-none opacity-0",
				].join(" ")}
				onClick={() => setReviewLessonShown(false)}
			></div>
			<div className="relative flex w-full max-w-4xl flex-col gap-5 rounded-2xl border-2 border-gray-200 bg-white p-8">
				<button
					className="absolute -right-5 -top-5 rounded-full border-2 border-gray-200 bg-gray-100 p-1 text-gray-400 hover:brightness-90"
					onClick={() => setReviewLessonShown(false)}
				>
					<BigCloseSvg className="h-8 w-8" />
					<span className="sr-only">Close</span>
				</button>
				<h2 className="text-center text-3xl">Check out your scorecard!</h2>
				<p className="text-center text-xl text-gray-400">
					Click the tiles below to reveal the solutions
				</p>
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{questionResults.map((questionResult, i) => {
						return (
							<button
								key={i}
								className={[
									"relative flex flex-col items-stretch gap-3 rounded-xl p-5 text-left",
									questionResult.yourResponse === questionResult.correctResponse
										? "bg-yellow-100 text-yellow-600"
										: "bg-red-100 text-red-500",
								].join(" ")}
								onClick={() =>
									setSelectedQuestionResult((selectedQuestionResult) =>
										selectedQuestionResult === questionResult
											? null
											: questionResult
									)
								}
							>
								<div className="flex justify-between gap-2">
									<h3 className="font-bold">{questionResult.question}</h3>
									<div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white">
										{questionResult.yourResponse ===
											questionResult.correctResponse ? (
											<DoneSvg className="h-5 w-5" />
										) : (
											<BigCloseSvg className="h-5 w-5" />
										)}
									</div>
								</div>
								<div>{questionResult.yourResponse}</div>
								{selectedQuestionResult === questionResult && (
									<div className="absolute left-1 right-1 top-20 z-10 rounded-2xl border-2 border-gray-200 bg-white p-3 text-sm tracking-tighter">
										<div
											className="absolute -top-2 h-3 w-3 rotate-45 border-l-2 border-t-2 border-gray-200 bg-white"
											style={{ left: "calc(50% - 6px)" }}
										></div>
										<div className="font-bold uppercase text-gray-400">
											Your response:
										</div>
										<div className="mb-3 text-gray-700">
											{questionResult.yourResponse}
										</div>
										<div className="font-bold uppercase text-gray-400">
											Correct response:
										</div>
										<div className="text-gray-700">
											{questionResult.correctResponse}
										</div>
									</div>
								)}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export function LessonFastForwardStart({
	unitNumber,
	setIsStartingLesson,
}: {
	unitNumber: number;
	setIsStartingLesson: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<div className="flex min-h-screen flex-col px-5 py-8 text-center">
			<div className="flex grow flex-col items-center justify-center gap-5">
				<LessonFastForwardStartSvg />
				<h1 className="text-lg font-bold">
					Want to jump to Unit {unitNumber}?
				</h1>
				<p className="text-sm text-gray-400">
					{`Pass the test to jump ahead. We won't make it easy for you though.`}
				</p>
			</div>
			<div className="flex flex-col gap-5"></div>
			<section className="border-gray-200 sm:border-t-2 sm:p-10">
				<div className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-5 sm:flex-row sm:justify-between">
					<Link
						href="/learn"
						className="font-bold uppercase text-blue-400 transition hover:brightness-110"
					>
						Maybe later
					</Link>
					<button
						className="w-full rounded-2xl border-b-4 border-blue-500 bg-blue-400 p-3 font-bold uppercase text-white transition hover:brightness-110 sm:min-w-[150px] sm:max-w-fit"
						onClick={() => setIsStartingLesson(false)}
					>
						{`Let's go`}
					</button>
				</div>
			</section>
		</div>
	);
};

export function LessonFastForwardEndFail({
	unitNumber,
	reviewLessonShown,
	setReviewLessonShown,
	questionResults,
}: {
	unitNumber: number;
	reviewLessonShown: boolean;
	setReviewLessonShown: React.Dispatch<React.SetStateAction<boolean>>;
	questionResults: QuestionResult[];
}) {
	return (
		<div className="flex min-h-screen flex-col px-5 py-8 text-center">
			<div className="flex grow flex-col items-center justify-center gap-5">
				<LessonFastForwardEndFailSvg />
				<h1 className="text-2xl font-bold">
					{`You didn't unlock Unit ${unitNumber}`}
				</h1>
				<p className="text-lg text-gray-500">
					{`Don't worry! Practice makes perfect.`}
				</p>
			</div>
			<section className="border-gray-200 sm:border-t-2 sm:p-10">
				<div className="mx-auto flex max-w-5xl sm:justify-between">
					<button
						className="hidden rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-3 font-bold uppercase text-gray-400 transition hover:border-gray-300 hover:bg-gray-200 sm:block sm:min-w-[150px] sm:max-w-fit"
						onClick={() => setReviewLessonShown(true)}
					>
						Review lesson
					</button>
					<Link
						className="flex w-full items-center justify-center rounded-2xl border-b-4 border-green-600 bg-green-500 p-3 font-bold uppercase text-white transition hover:brightness-105 sm:min-w-[150px] sm:max-w-fit"
						href="/learn"
					>
						Continue
					</Link>
				</div>
			</section>
			<ReviewLesson
				reviewLessonShown={reviewLessonShown}
				setReviewLessonShown={setReviewLessonShown}
				questionResults={questionResults}
			/>
		</div>
	);
};

export function LessonFastForwardEndPass({
	unitNumber,
	reviewLessonShown,
	setReviewLessonShown,
	questionResults,
}: {
	unitNumber: number;
	reviewLessonShown: boolean;
	setReviewLessonShown: React.Dispatch<React.SetStateAction<boolean>>;
	questionResults: QuestionResult[];
}) {
	const jumpToUnit = useBoundStore((x) => x.jumpToUnit);
	return (
		<div className="flex min-h-screen flex-col px-5 py-8 text-center">
			<div className="flex grow flex-col items-center justify-center gap-5">
				<LessonFastForwardEndPassSvg />
				<h1 className="text-2xl font-bold">You unlocked Unit {unitNumber}!</h1>
				<p className="text-lg text-gray-500">
					Way to go! You’re making great strides!
				</p>
			</div>
			<section className="border-gray-200 sm:border-t-2 sm:p-10">
				<div className="mx-auto flex max-w-5xl sm:justify-between">
					<button
						className="hidden rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-3 font-bold uppercase text-gray-400 transition hover:border-gray-300 hover:bg-gray-200 sm:block sm:min-w-[150px] sm:max-w-fit"
						onClick={() => setReviewLessonShown(true)}
					>
						Review lesson
					</button>
					<Link
						className="flex w-full items-center justify-center rounded-2xl border-b-4 border-green-600 bg-green-500 p-3 font-bold uppercase text-white transition hover:brightness-105 sm:min-w-[150px] sm:max-w-fit"
						href="/learn"
						onClick={() => jumpToUnit(unitNumber)}
					>
						Continue
					</Link>
				</div>
			</section>
			<ReviewLesson
				reviewLessonShown={reviewLessonShown}
				setReviewLessonShown={setReviewLessonShown}
				questionResults={questionResults}
			/>
		</div>
	);
};
