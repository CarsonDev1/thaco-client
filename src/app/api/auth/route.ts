export async function POST(request: Request) {
	const res = await request.json();

	const sessionToken = res?.sessionToken?.payload?.access_token
	console.log('sessionToken', sessionToken);

	if (!sessionToken) {
		return Response.json({ message: 'Khong nhan duoc session token' }, {
			status: 400,
		})
	}
	return Response.json({ res }, {
		status: 200,
		headers: {
			'Set-Cookie': `sessionToken=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Secure`
		}
	})
}