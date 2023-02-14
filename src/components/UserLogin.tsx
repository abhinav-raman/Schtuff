import { signIn } from "next-auth/react";

const UserLogin = () => {
	return (
		<section
			className="bg- m-auto h-max w-1/3 rounded-xl bg-[var(--secondary-bg-color)] bg-opacity-10 p-2 text-[var(--secondary-text-color)] 
        dark:bg-[var(--primary-bg-color)] dark:text-[var(--primary-text-color)]
        sm:w-5/6"
		>
			<h3 className="text-center text-xl font-bold">
				There&apos;s something cool lies ahead
			</h3>
			<h2 className="text-center text-2xl font-bold">Login to take a look!</h2>
			<div className="mt-4 flex justify-center">
				<button
					className="mx-auto w-fit rounded-lg border-2 border-stone-500 p-2 outline-none"
					onClick={() => signIn("google")}
				>
					Continue with Google
				</button>
			</div>
		</section>
	);
};

export default UserLogin;
