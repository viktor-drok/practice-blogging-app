const Header = () => {
	return (
		<header className="flex items-center my-10 px-5">
			<h1 className="font-bold text-3xl grow text-center">Blogging App</h1>

			<div className="flex justify-center items-center float-right gap-4">
				<button>Sign In</button>
				<button>Log In</button>
			</div>
		</header>
	);
};
export default Header;
