import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";

import "~/styles/globals.css";
import { thingus_bingus_name } from "~/utils/definitions";

const queryClient = new QueryClient()

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<>
			<div className="transition-all">

				<QueryClientProvider client={queryClient}>

					<Head>
						<title>{thingus_bingus_name}</title>
						<meta
							name="description"
							content="A new and innovative multi purpose learning app"
						/>
						<link rel="icon" href="/favicon.svg" />
					</Head>
					<Component {...pageProps} />

				</QueryClientProvider>
			</div>
		</>
	);
};

export default MyApp;
