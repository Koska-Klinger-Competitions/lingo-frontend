import Link from "next/link";
import { CloseSvg } from "./Svgs";
import type { ComponentProps } from "react";
import React, { useEffect, useRef, useState } from "react";
import { useBoundStore } from "~/hooks/useBoundStore";
import { useRouter } from "next/router";
import { backendPath, thingus_bingus_name } from "~/utils/definitions";

export type LoginScreenState = "HIDDEN" | "LOGIN" | "SIGNUP";

export const useLoginScreen = () => {
	const router = useRouter();
	const loggedIn = useBoundStore((x) => x.loggedIn);
	const queryState: LoginScreenState = (() => {
		if (loggedIn) return "HIDDEN";
		if ("login" in router.query) return "LOGIN";
		if ("sign-up" in router.query) return "SIGNUP";
		return "HIDDEN";
	})();
	const [loginScreenState, setLoginScreenState] = useState(queryState);
	useEffect(() => setLoginScreenState(queryState), [queryState]);
	return { loginScreenState, setLoginScreenState };
};

export const LoginScreen = ({
	loginScreenState,
	setLoginScreenState,
}: {
	loginScreenState: LoginScreenState;
	setLoginScreenState: React.Dispatch<React.SetStateAction<LoginScreenState>>;
}) => {
	const router = useRouter();
	const loggedIn = useBoundStore((x) => x.loggedIn);
	const logIn = useBoundStore((x) => x.logIn);
	const setUsername = useBoundStore((x) => x.setUsername);
	const setName = useBoundStore((x) => x.setName);
    const setTotalXp = useBoundStore((x) => x.setTotalXp);
    const setStreak = useBoundStore((x) => x.setStreak);

	const [ageTooltipShown, setAgeTooltipShown] = useState(false);

    const [name, _setName] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')

	const nameInputRef = useRef<null | HTMLInputElement>(null);

	useEffect(() => {
		if (loginScreenState !== "HIDDEN" && loggedIn) {
			setLoginScreenState("HIDDEN");
		}
	}, [loginScreenState, loggedIn, setLoginScreenState]);

	const logInAndSetUserProperties = async () => {
        console.log({ name, emailAddress, password })

        if (loginScreenState == 'SIGNUP') {
            await fetch(`${backendPath}/users`, {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    email: emailAddress,
                    password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((resp) => resp.json())
        }

        const loginResponse = await fetch(`${backendPath}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
                username: emailAddress,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())

        localStorage.setItem('access_token', loginResponse['access_token'])

        const profile = await fetch(`${backendPath}/users/me`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')!}`
            }
        })
        .then((resp) => resp.json())

        localStorage.setItem("user", JSON.stringify(profile))

        setUsername(profile['id'].toString())
        setName(profile['name'])
        setTotalXp(profile['xp'])
        setStreak(profile['streak'])

		logIn();
		void router.push("/learn");
	};

	return (
		<article
			className={[
				"fixed inset-0 z-30 flex flex-col bg-white p-7 transition duration-300",
				loginScreenState === "HIDDEN"
					? "pointer-events-none opacity-0"
					: "opacity-100",
			].join(" ")}
			aria-hidden={!loginScreenState}
		>
			<header className="flex flex-row-reverse justify-between sm:flex-row">
				<button
					className="flex text-gray-400"
					onClick={() => setLoginScreenState("HIDDEN")}
				>
					<CloseSvg />
					<span className="sr-only">Close</span>
				</button>
				<button
					className="hidden rounded-2xl border-2 border-b-4 border-gray-200 px-4 py-3 text-sm font-bold uppercase text-blue-400 transition hover:bg-gray-50 hover:brightness-90 sm:block"
					onClick={() =>
						setLoginScreenState((x) => (x === "LOGIN" ? "SIGNUP" : "LOGIN"))
					}
				>
					{loginScreenState === "LOGIN" ? "Sign up" : "Login"}
				</button>
			</header>
			<div className="flex grow items-center justify-center">
				<div className="flex w-full flex-col gap-5 sm:w-96">
					<h2 className="text-center text-2xl font-bold text-gray-800">
						{loginScreenState === "LOGIN" ? "Log in" : "Create your profile"}
					</h2>
					<div className="flex flex-col gap-2 text-black">
                        {
                            loginScreenState == "SIGNUP" ? (
                                <input
                                    className="grow rounded-2xl border-2 border-gray-200 bg-gray-50 px-4 py-3"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => _setName(e.target.value)}
                                />
                            ) : null
                        }
						<input
							className="grow rounded-2xl border-2 border-gray-200 bg-gray-50 px-4 py-3"
							placeholder={"Email"}
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
						/>
						<div className="relative flex grow">
							<input
								className="grow rounded-2xl border-2 border-gray-200 bg-gray-50 px-4 py-3"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
								placeholder="Password"
								type="password"
							/>
							{loginScreenState === "LOGIN" && (
								<div className="absolute bottom-0 right-0 top-0 flex items-center justify-center pr-5">
									<Link
										className="font-bold uppercase text-gray-400 hover:brightness-75"
										href="/forgot-password"
									>
										Forgot?
									</Link>
								</div>
							)}
						</div>
					</div>
					<button
						className="rounded-2xl border-b-4 border-blue-500 bg-blue-500 py-3 font-bold uppercase text-white transition hover:brightness-110 disabled:hover:brightness-100"
						onClick={logInAndSetUserProperties}
                        disabled={!(emailAddress.length > 0 && password.length > 0 && (loginScreenState == "SIGNUP" ? password.length > 0 : true))}
					>
						{loginScreenState === "LOGIN" ? "Log in" : "Create account"}
					</button>
					<p className="text-center text-xs leading-5 text-gray-400">
						By signing in to {thingus_bingus_name}, you agree to our (very much existant) {" "}
						<Link
							className="font-bold"
							href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
						>
							Terms
						</Link>{" "}
						and{" "}
						<Link
							className="font-bold"
							href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
						>
							Privacy Policy
						</Link>
						.
					</p>
					<p className="block text-center sm:hidden">
						<span className="text-sm font-bold text-gray-700">
							{loginScreenState === "LOGIN"
								? "Don't have an account?"
								: "Have an account?"}
						</span>{" "}
						<button
							className="text-sm font-bold uppercase text-blue-400"
							onClick={() =>
								setLoginScreenState((x) => (x === "LOGIN" ? "SIGNUP" : "LOGIN"))
							}
						>
							{loginScreenState === "LOGIN" ? "sign up" : "log in"}
						</button>
					</p>
				</div>
			</div>
		</article>
	);
};
