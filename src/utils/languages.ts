export type Language = {
    name: string,
    nativeName: string,
    viewBox: string,
    code: string
}

const languages = [
    { name: "German", nativeName: "Deutsch", viewBox: "0 198 82 66", code: "de" },
    { name: "Spanish", nativeName: "Español", viewBox: "0 66 82 66", code: "es" },
	{ name: "English", nativeName: "English", viewBox: "0 0 82 66", code: "en" },
	{
		name: "French",
		nativeName: "Français",
		viewBox: "0 132 82 66",
		code: "fr",
	},
	{
		name: "Italian",
		nativeName: "Italiano",
		viewBox: "0 330 82 66",
		code: "it",
	},
	{
		name: "Dutch",
		nativeName: "Nederlands",
		viewBox: "0 726 82 66",
		code: "code-NL",
	},
    { name: "Korean", nativeName: "한국어", viewBox: "0 396 82 66", code: "ko" },
	{ name: "Turkish", nativeName: "Türkçe", viewBox: "0 660 82 66", code: "tr" },
] as Language[];

export default languages;
