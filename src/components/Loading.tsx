export function Loading({ text }: { text: string }) {
	return (
		<>
		<div className="flex w-full h-screen justify-center items-center" >
			<h1 className="text-4xl font-bold">{text}</h1>
		</div>
		</>
	); 
}