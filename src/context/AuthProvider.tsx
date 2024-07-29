'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';

const AppContext = createContext({
	sessionToken: '',
	setSessionToken: (sessionToken: string) => {},
});

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useAppContext must be used within a AppProvider');
	}
	return context;
};

export default function AuthProvider({
	children,
	initialSessionToken = '',
}: {
	children: React.ReactNode;
	initialSessionToken?: string;
}) {
	const [sessionToken, setSessionToken] = useState(initialSessionToken);
	return <AppContext.Provider value={{ sessionToken, setSessionToken }}>{children}</AppContext.Provider>;
}
