import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html>
			<Head>
				<link
					href="https://api.fontshare.com/v2/css?f[]=satoshi@1,900,700,500,301,701,300,501,401,901,400,2&display=swap"
					rel="stylesheet"
				/>
				<link
					href="https://api.fontshare.com/v2/css?f[]=britney@400,1,700,300&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<body className="font-Satoshi">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
