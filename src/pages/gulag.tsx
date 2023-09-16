import { LanguageHeader } from "~/components/LanguageHeader";
import _bgSnow from "../../public/bg-snow.svg";

import { GlobeSvg } from "~/components/Svgs";
import { StaticImageData } from "next/image";
import { useQuery } from "react-query";
import { backendPath, thingus_bingus_name } from "~/utils/definitions";
import { Loading } from "~/components/Loading";
import Link from "next/link";
import { useBoundStore } from "~/hooks/useBoundStore";

const bgSnow = _bgSnow as StaticImageData;

function Gulag() {
	const gulagReason = useBoundStore((x) => x.language)

	return (
		<>
			<main
				className="flex min-h-screen flex-col items-center justify-center bg-[#235390] text-white"
				style={{ backgroundImage: `url(${bgSnow.src})` }}
			>
				<LanguageHeader />
				<div className="flex w-full flex-col items-center justify-center gap-3 px-4 py-16 md:flex-row md:gap-36">
					<GlobeSvg className="h-fit w-7/12 md:w-[360px]" />
					
					<div className="bg-[#2555AA] p-12 rounded-3xl">
						<h2 className="text-center text-4xl font-bold">
							Oops!
						</h2>
						<p className="mb-6 max-w-[600px] text-center text-3xl font-bold md:mb-12 mt-8">
							The current course on <span className="italic">{gulagReason.name}</span> isn't available just yet, rest assured the {thingus_bingus_name} team is working hard on bringing the best learning content to you
						</p>
						<div className="mx-auto mt-4 flex w-fit flex-col items-center gap-3">
							<Link
								href="/register"
								className="w-full rounded-2xl border-b-4 border-green-700 bg-green-600 px-10 py-3 text-center font-bold uppercase transition hover:border-green-600 hover:bg-green-500 md:min-w-[320px]"
							>
								Get started
							</Link>
						</div>
					</div>
				</div>
			</main>
		</>

	)
}

export default Gulag;

