'use client';
import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import useAuth from '@/hook/useAuth';
import envConfig from '@/utils/config';
import { useAppContext } from '@/context/AuthProvider';

type UserData = {
	fullname: string;
	email: string;
	password: string;
};

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
	[theme.breakpoints.down('lg')]: {
		marginRight: theme.spacing(1),
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
		[theme.breakpoints.down('lg')]: {
			width: '15ch',
		},
	},
}));

const pages = [
	{ name: 'Foton', href: '/foton' },
	{ name: 'Fuso', href: '/fuso' },
	{ name: 'Xe tải kia', href: '/kia' },
	{ name: 'Xe van thaco', href: '/van-thaco' },
	{ name: 'Auman', href: '/auman' },
	{ name: 'Thaco towner', href: '/thaco-towner' },
];

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Header() {
	const user: UserData | null | string = useAuth();
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
	const [searchOpen, setSearchOpen] = useState(false);
	const router = useRouter();
	const [userData, setUserData] = useState<null | UserData>(null);
	const { sessionToken, setSessionToken } = useAppContext();

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogout = () => {
		localStorage.removeItem('user');
		localStorage.removeItem('sessionToken');
		setUserData(null);
		router.push('/login');
	};

	useEffect(() => {
		const fetchRequest = async () => {
			try {
				if (!sessionToken) {
					console.error('No session token found');
					return;
				}

				const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/api/auth/me`, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${sessionToken}`,
					},
				});

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.error || 'Failed to fetch user data');
				}

				const payload = await response.json();
				setUserData(payload);
				localStorage.setItem('user', JSON.stringify(payload));
			} catch (err) {
				console.error('Error fetching user data:', err);
			}
		};

		const storedData = localStorage.getItem('user');
		if (storedData) {
			try {
				const parsedData = JSON.parse(storedData);
				setUserData(parsedData);
			} catch (parseError) {
				console.error('Error parsing stored data:', parseError);
				localStorage.removeItem('user');
				fetchRequest();
			}
		} else {
			fetchRequest();
		}
	}, [sessionToken]);

	return (
		<div>
			<div className='p-4 bg-[#00529C] text-center text-white text-xs font-semibold'>
				<div className='container flex items-center justify-between'>
					<h3 className='text-lg'>THACO TP HỒ CHÍ MINH</h3>
					<div className='flex justify-center w-fit'>
						<span className='inline-block p-2 rounded-full bg-slate-500 hover:bg-[#20466D] cursor-pointer'>
							📶 <a href='tel:0739989099'>0739 989 099</a>
						</span>
					</div>
				</div>
			</div>
			<AppBar
				position='static'
				sx={{ backgroundColor: 'transparent' }}
				className='relative p-2 z-20 text-[#00529C]'
			>
				<Container maxWidth='xl'>
					<Toolbar disableGutters className='flex items-center justify-between container'>
						<Link href='/'>
							<Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
								<Image src='/logo.png' width={150} height={75} alt='logo' />
							</Box>
						</Link>

						<Box sx={{ flexGrow: 1, display: { xs: 'flex', lg: 'none' } }}>
							<IconButton
								size='large'
								aria-label='menu'
								aria-controls='menu-appbar'
								aria-haspopup='true'
								onClick={handleOpenNavMenu}
								color='inherit'
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id='menu-appbar'
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: 'block', lg: 'none' },
								}}
							>
								{pages.map((page) => (
									<MenuItem key={page.name} onClick={handleCloseNavMenu}>
										<Typography textAlign='center'>
											<Link href={page.href}>{page.name}</Link>
										</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>

						<Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 2 }}>
							{pages.map((page) => (
								<Link key={page.name} href={page.href}>
									<Button
										onClick={handleCloseNavMenu}
										sx={{
											my: 2,
											color: '#00529C',
											display: 'block',
											fontWeight: 'bold',
											fontSize: 16,
											textTransform: 'uppercase',
											'&:hover': {
												color: '#fff',
												backgroundColor: '#00529C',
												transition: 'color 0.3s ease, background-color 0.3s ease',
											},
										}}
									>
										{page.name}
									</Button>
								</Link>
							))}
						</Box>

						<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
							{/* Search or Button Toggle */}
							<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'center' }}>
								{searchOpen ? (
									<Search>
										<SearchIconWrapper>
											<SearchIcon />
										</SearchIconWrapper>
										<StyledInputBase
											placeholder='Search…'
											inputProps={{ 'aria-label': 'search' }}
											className='placeholder:text-white'
										/>
									</Search>
								) : (
									<SearchIcon
										sx={{ display: { xs: 'flex', md: 'none' } }}
										onClick={() => setSearchOpen(true)}
									/>
								)}
							</Box>

							{/* Show Sign In Button only on small screens */}
							<Box sx={{ display: { xs: 'flex', lg: 'none' }, gap: 1 }}>
								{user ? (
									<Box sx={{ display: 'flex', alignItems: 'center', gap: '1.4rem' }}>
										<Tooltip title='Open settings'>
											<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
												<Avatar
													alt={(user as unknown as UserData)?.fullname || 'User'}
													src='/static/images/avatar/2.jpg'
												/>
											</IconButton>
										</Tooltip>
										<Menu
											sx={{ mt: '45px' }}
											id='menu-appbar'
											anchorEl={anchorElUser}
											anchorOrigin={{
												vertical: 'top',
												horizontal: 'right',
											}}
											keepMounted
											transformOrigin={{
												vertical: 'top',
												horizontal: 'right',
											}}
											open={Boolean(anchorElUser)}
											onClose={handleCloseUserMenu}
										>
											{settings.map((setting, index) => (
												<MenuItem
													key={setting}
													onClick={
														index === settings.length - 1
															? handleLogout
															: handleCloseUserMenu
													}
												>
													<Typography textAlign='center'>{setting}</Typography>
												</MenuItem>
											))}
										</Menu>
									</Box>
								) : (
									<Link href='/login'>
										<Button
											variant='contained'
											color='info'
											sx={{
												px: 2,
												backgroundColor: '#007BFF',
												'&:hover': {
													backgroundColor: '#0056b3',
													transition: 'background-color 0.3s ease',
												},
												fontWeight: 'bold',
												textTransform: 'none',
											}}
										>
											Sign In
										</Button>
									</Link>
								)}
							</Box>

							{/* Show Sign Up Button only on larger screens */}
							<Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 1 }}>
								{user ? (
									<Box sx={{ display: 'flex', alignItems: 'center', gap: '1.4rem' }}>
										<Tooltip title='Open settings'>
											<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
												<Avatar
													alt={(user as unknown as UserData)?.fullname || 'User'}
													src='/static/images/avatar/2.jpg'
												/>
											</IconButton>
										</Tooltip>
										<Menu
											sx={{ mt: '45px' }}
											id='menu-appbar'
											anchorEl={anchorElUser}
											anchorOrigin={{
												vertical: 'top',
												horizontal: 'right',
											}}
											keepMounted
											transformOrigin={{
												vertical: 'top',
												horizontal: 'right',
											}}
											open={Boolean(anchorElUser)}
											onClose={handleCloseUserMenu}
										>
											{settings.map((setting, index) => (
												<MenuItem
													key={setting}
													onClick={
														index === settings.length - 1
															? handleLogout
															: handleCloseUserMenu
													}
												>
													<Typography textAlign='center'>{setting}</Typography>
												</MenuItem>
											))}
										</Menu>
									</Box>
								) : (
									<>
										<Link href='/login'>
											<Button
												variant='contained'
												color='info'
												sx={{
													px: 2,
													backgroundColor: '#007BFF',
													'&:hover': {
														backgroundColor: '#0056b3',
														transition: 'background-color 0.3s ease',
													},
													fontWeight: 'bold',
													textTransform: 'none',
												}}
											>
												Đăng nhập
											</Button>
										</Link>
										<Link href='/register'>
											<Button
												variant='contained'
												color='info'
												sx={{
													px: 2,
													backgroundColor: '#28A745',
													'&:hover': {
														backgroundColor: '#218838',
														transition: 'background-color 0.3s ease',
													},
													fontWeight: 'bold',
													textTransform: 'none',
												}}
											>
												Đăng ký
											</Button>
										</Link>
									</>
								)}
							</Box>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</div>
	);
}

export default Header;
