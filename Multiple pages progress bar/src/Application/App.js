import React from 'react';
import { Routes, Route, Outlet, NavLink, useParams, useResolvedPath } from 'react-router-dom';
import './App.scss';
import ProgressBar from './components/ProgressBar';

const App = () => {

	const Layout = () => {

		return (
			<>
				<Header />
				<Body />
			</>
		)
	}

	const Header = () => {
		return (
			<h2>Header</h2>
		)
	}

	return (
		<>
			<Layout />
		</>
	)
};

export default App;

const Body = () => {

	const Layout = () => {
		return (
			<>
				<div className='body-nav'>
					<NavLink to='/'>Home</NavLink>
					<NavLink to='/inner-pages'>Inner Pages</NavLink>
				</div>
				<Outlet />
			</>
		)
	}

	const Home = () => {
		return (
			<h2>Home</h2>
		)
	}

	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="inner-pages/*" element={<InnerPages />} />
				</Route>
			</Routes>
		</>
	)
}

const InnerPages = () => {

	const booksPath = {
		lotr: '/inner-pages/lotr/',
		slime: '/inner-pages/slime/',
		isekaiOjisan: '/inner-pages/isekaiOjisan/',
	};

	const Layout = () => {
		return (
			<>
				<h2>Inner Pages</h2>
				<div className='inner-pages-nav'>
					<NavLink to='/inner-pages/lotr/1'>Lord Of The Rings</NavLink>
					<NavLink to='/inner-pages/slime/1'>Life Of a Slime</NavLink>
					<NavLink to='/inner-pages/isekaiOjisan/1'>Isekai Ojisan</NavLink>
				</div>
				<Outlet />
			</>
		)
	}
	const Book = ({name, totalPages }) => {

		const Layout = () => {

			return (
				<>
					<h1>Book title: {name}</h1>
					<h3>Total pages: {totalPages}</h3>
				</>
			)
		}

		return (
			<>
				<Layout />
				<Outlet />
			</>
		)
	}
	const Page = ({ bookPath, totalPages }) => {
		const { page } = useParams();

		return (
			<>
				{(parseInt(page) < totalPages) ? <NavLink to={`${bookPath}${parseInt(page) + 1}`}>Next Page</NavLink> : null}
				<h2>Current page: {page}</h2>
				{(parseInt(page) > 1) ? <NavLink to={`${bookPath}${parseInt(page) - 1}`}>Previous Page</NavLink> : null}
				<ProgressBar bookPath={bookPath} totalPages={totalPages} currentPage={parseInt(page)} />
			</>
		)
	}

	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/lotr" element={<Book name='Lord Of The Rings' totalPages={35} />}>
						<Route path="/lotr/:page" element={<Page bookPath={booksPath.lotr} totalPages={35} />} />
					</Route>
					<Route path="/slime" element={<Book name='Life Of a Slime' totalPages={14} />}>
						<Route path="/slime/:page" element={<Page bookPath={booksPath.slime} totalPages={14} />} />
					</Route>
					<Route path="/isekaiOjisan" element={<Book name='Isekai Ojisan' totalPages={28} />}>
						<Route path="/isekaiOjisan/:page" element={<Page bookPath={booksPath.isekaiOjisan} totalPages={28} />} />
					</Route>
				</Route>
			</Routes>
		</>
	)
}
