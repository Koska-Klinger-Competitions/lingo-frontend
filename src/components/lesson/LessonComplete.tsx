import Link from "next/link";
import { useRouter } from "next/router";
import { useBoundStore } from "~/hooks/useBoundStore";
import { QuestionResult } from "~/pages/lesson";
import { ReviewLesson } from "./LessonFastForward";

function formatTime(timeMs: number): string {
	const seconds = Math.floor(timeMs / 1000) % 60;
	const minutes = Math.floor(timeMs / 1000 / 60) % 60;
	const hours = Math.floor(timeMs / 1000 / 60 / 60);
	if (hours === 0)
		return [minutes, seconds]
			.map((x) => x.toString().padStart(2, "0"))
			.join(":");
	return [hours, minutes, seconds]
		.map((x) => x.toString().padStart(2, "0"))
		.join(":");
};


export default function LessonComplete({
	correctAnswerCount,
	incorrectAnswerCount,
	startTime,
	endTime,
	reviewLessonShown,
	setReviewLessonShown,
	questionResults,
}: {
	correctAnswerCount: number;
	incorrectAnswerCount: number;
	startTime: React.MutableRefObject<number>;
	endTime: React.MutableRefObject<number>;
	reviewLessonShown: boolean;
	setReviewLessonShown: React.Dispatch<React.SetStateAction<boolean>>;
	questionResults: QuestionResult[];
}) {
	const router = useRouter();

	const increaseXp = useBoundStore((x) => x.increaseXp);
	const increaseLingots = useBoundStore((x) => x.increaseLingots);
	const increaseLessonsCompleted = useBoundStore(
		(x) => x.increaseLessonsCompleted
	);
	return (
		<div className="flex min-h-screen flex-col gap-5 px-4 py-5 sm:px-0 sm:py-0">
			<div className="flex grow flex-col items-center justify-center gap-8 font-bold">
				<h1 className="text-center text-3xl text-blue-500">
					Lesson Complete!
				</h1>
				<div className="flex flex-wrap justify-center gap-5">
					<div className="min-w-[110px] rounded-xl border-2 border-yellow-500 bg-yellow-500">
						<h2 className="py-1 text-center text-white">Total XP</h2>
						<div className="flex justify-center rounded-xl bg-white py-4 text-yellow-500">
							{correctAnswerCount}
						</div>
					</div>
					<div className="min-w-[110px] rounded-xl border-2 border-blue-500 bg-blue-500">
						<h2 className="py-1 text-center text-white">Committed</h2>
						<div className="flex justify-center rounded-xl bg-white py-4 text-blue-500">
							{formatTime(endTime.current - startTime.current)}
						</div>
					</div>
					<div className="min-w-[110px] rounded-xl border-2 border-green-500 bg-green-500">
						<h2 className="py-1 text-center text-white">Amazing</h2>
						<div className="flex justify-center rounded-xl bg-white py-4 text-green-500">
							{Math.round(
								(correctAnswerCount /
									(correctAnswerCount + incorrectAnswerCount)) *
								100
							)}
							%
						</div>
					</div>
				</div>
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
						className={
							"flex w-full items-center justify-center rounded-2xl border-b-4 border-blue-600 bg-blue-500 p-3 font-bold uppercase text-white transition hover:brightness-105 sm:min-w-[150px] sm:max-w-fit"
						}
						href="/learn"
						onClick={() => {
							increaseXp(correctAnswerCount);
							// addToday();
							increaseLingots(1);
                            increaseLessonsCompleted();
						}}
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