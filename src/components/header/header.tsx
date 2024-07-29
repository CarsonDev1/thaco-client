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
import AdbIcon from '@mui/icons-material/Adb';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaBell, FaCartShopping } from 'react-icons/fa6';
import useAuth from '@/hook/useAuth';
import envConfig from '@/utils/config';
import { useAppContext } from '@/context/AuthProvider';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { Badge, BadgeProps } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Image from 'next/image';

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
			width: '10ch',
		},
	},
}));

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
	'& .MuiBadge-badge': {
		right: -3,
		top: 0,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: '0 4px',
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

				console.log('Using session token:', sessionToken);

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
			<div className='p-4 bg-[#00529C] flex items-center justify-center text-center text-white text-xs font-semibold'>
				<h3 className='flex-1 text-right'>THACO TP HỒ CHÍ MINH</h3>
				<div className='w-[50%]'>
					<span className='inline-block p-2 rounded-full bg-slate-500 hover:bg-[#20466D] cursor-pointer'>
						📶 <a href='tel: 0739989099'>0739 989 099</a>
					</span>
				</div>
			</div>
			<AppBar
				position='static'
				sx={{ backgroundColor: 'transparent' }}
				className='relative p-2 z-20 text-[#00529C]'
			>
				<Container maxWidth='xl'>
					<Toolbar disableGutters className='container flex justify-between items-center'>
						<Link href='/'>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<Image src='/logo.png' width={200} height={100} alt='logo' />
							</Box>
						</Link>

						<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size='large'
								aria-label='account of current user'
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
									display: { xs: 'block', md: 'none' },
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

						<Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
							{pages.map((page, index) => (
								<Link key={page.name} href={page.href}>
									<Button
										onClick={handleCloseNavMenu}
										sx={{
											my: 2,
											color: '#00529C',
											display: 'block',
											fontWeight: 'bold',
											fontSize: 16,
										}}
									>
										{page.name}
									</Button>
								</Link>
							))}
						</Box>

						<Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
							<Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
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
							</Box>

							<Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
											<Button variant='contained' color='info'>
												Sign In
											</Button>
										</Link>
										<Link href='/register'>
											<Button variant='contained' color='info'>
												Sign Up
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
