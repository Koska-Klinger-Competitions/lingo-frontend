import Link from "next/link";
import { CloseSvg, LessonTopBarEmptyHeart, LessonTopBarHeart } from "../Svgs";

export function ProgressBar({
	correctAnswerCount,
	totalCorrectAnswersNeeded,
	setQuitMessageShown,
	hearts,
}: {
	correctAnswerCount: number;
	totalCorrectAnswersNeeded: number;
	setQuitMessageShown: (isShown: boolean) => void;
	hearts: null | number;
}) {
	return (
		<header className="flex items-center gap-4">
			{correctAnswerCount === 0 ? (
				<Link href="/learn" className="text-gray-400">
					<CloseSvg />
					<span className="sr-only">Exit lesson</span>
				</Link>
			) : (
				<button
					className="text-gray-400"
					onClick={() => setQuitMessageShown(true)}
				>
					<CloseSvg />
					<span className="sr-only">Exit lesson</span>
				</button>
			)}
			<div
				className="h-4 grow rounded-full bg-gray-200"
				role="progressbar"
				aria-valuemin={0}
				aria-valuemax={1}
				aria-valuenow={correctAnswerCount / totalCorrectAnswersNeeded}
			>
				<div
					className={
						"h-full rounded-full bg-blue-500 transition-all duration-700 " +
						(correctAnswerCount > 0 ? "px-2 pt-1 " : "")
					}
					style={{
						width: `${(correctAnswerCount / totalCorrectAnswersNeeded) * 100}%`,
					}}
				>
					<div className="h-[5px] w-full rounded-full bg-blue-400"></div>
				</div>
			</div>
			{hearts !== null &&
				[1, 2, 3].map((heart) => {
					if (heart <= hearts) {
						return <LessonTopBarHeart key={heart} />;
					}
					return <LessonTopBarEmptyHeart key={heart} />;
				})}
		</header>
	);
};

export function QuitMessage({
	quitMessageShown,
	setQuitMessageShown,
}: {
	quitMessageShown: boolean;
	setQuitMessageShown: (isShown: boolean) => void;
}) {
	return (
		<>
			<div
				className={
					quitMessageShown
						? "fixed bottom-0 left-0 right-0 top-0 z-30 bg-black bg-opacity-60 transition-all duration-300"
						: "pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-30 bg-black bg-opacity-0 transition-all duration-300"
				}
				onClick={() => setQuitMessageShown(false)}
				aria-label="Close quit message"
				role="button"
			></div>

			<article
				className={
					quitMessageShown
						? "fixed bottom-0 left-0 right-0 z-40 flex flex-col gap-4 bg-white px-5 py-12 text-center transition-all duration-300 sm:flex-row"
						: "fixed -bottom-96 left-0 right-0 z-40 flex flex-col bg-white px-5 py-12 text-center transition-all duration-300 sm:flex-row"
				}
				aria-hidden={!quitMessageShown}
			>
				<div className="flex grow flex-col gap-4">
					<h2 className="text-lg font-bold sm:text-2xl">
						Are you sure you want to quit?
					</h2>
					<p className="text-gray-500 sm:text-lg">
						All progress for this lesson will be lost.
					</p>
				</div>
				<div className="flex grow flex-col items-center justify-center gap-4 sm:flex-row-reverse">
					<Link
						className="flex w-full items-center justify-center rounded-2xl border-b-4 border-blue-500 bg-blue-400 py-3 font-bold uppercase text-white transition hover:brightness-105 sm:w-48"
						href="/learn"
					>
						Quit
					</Link>
					<button
						className="w-full rounded-2xl py-3 font-bold uppercase text-blue-400 transition hover:brightness-90 sm:w-48 sm:border-2 sm:border-b-4 sm:border-gray-300 sm:text-gray-400 sm:hover:bg-gray-100"
						onClick={() => setQuitMessageShown(false)}
					>
						Stay
					</button>
				</div>
			</article>
		</>
	);
};