interface LoginCredentials {
	username: string,
	password: string;
}

interface RequestedCredentials {
	username: string,
	sid: string;
}

const root = 'http://127.0.0.1:5000';
let sessionID: string;

$('#action_post').on('click', async () => {
	if (!sessionID) return;
	post($('#input_post').val()?.toString()).then(() => {
		get(updateOutput);
	});
});

$('#action_get').on('click', async () => {
	if (!sessionID) return;
	get(updateOutput);
});

$('#action_login').on('click', async (): Promise<void> => {
	let username: string = prompt("Enter username") ?? "";
	let password: string = prompt("Enter password") ?? "";
	login(
		username, password,
		res => {
			sessionID = res.sid;
			$('#session_id').replaceWith($('<div>', {
				text: `${res.username}:   ${res.sid}`,
				id: "session_id"
			}));
			get(updateOutput);
		}
	);
});

$('#action_logout').on('click', async (): Promise<void> => {
	logout(sessionID);
	$('#session_id').replaceWith($('<div>', {
		text: `Logged out: {sid}`,
		id: "session_id"
	}));
});

$('#action_register').on('click', async (): Promise<void> => {
	register(prompt("Enter new username") ?? "", prompt("Enter new password") ?? "", alert);
});

function updateOutput(data: string[]): void {
	$('#output').replaceWith(generateListElementFromArray(data));
}

function get(onSuccess: (data: string[]) => void): void {
	fetch(`${root}/get?sid=${sessionID}`)
		.then(res => res.json())
		.then(res => res.response)
		.then(onSuccess);
}


function post(
	body?: string,
	onSuccess?: (status: number) => void
): Promise<void> {
	if (!body) return emptyPromise();
	return fetch(`${root}/post?body=${encodeURIComponent(body)}`)
		.then(res => res.status)
		.then(onSuccess);
}

function login(
	username: string,
	password: string,
	onSuccess: (req: RequestedCredentials) => void = () => { }
): void {
	fetch(`${root}/login`, {
		headers: { 'Content-Type': 'application/json' },
		method: 'POST',
		body: JSON.stringify({
			username: username,
			password: password
		})
	})
		.then(res => res.json())
		.then(res => res.response)
		.then(onSuccess);

}

function logout(sessionID: string) {
	fetch(`${root}/logout`, {
		headers: { 'Content-Type': 'application/json' },
		method: 'POST',
		body: JSON.stringify({ sid: sessionID })
	});
}



function register(
	username: string,
	password: string,
	onSuccess: (status: number) => void = () => { }
): void {
	fetch(`${root}/register`, {
		headers: { 'Content-Type': 'application/json' },
		method: 'POST',
		body: JSON.stringify({
			username: username,
			password: password
		})
	})
		.then(res => res.json(), alert)
		.then(res => res.response)
		.then(onSuccess);

}

function generateListElementFromArray(array: string[]): JQuery<HTMLUListElement> {
	let list = $('<ul>') as JQuery<HTMLUListElement>;
	list.attr("id", "output");

	for (const elt of array) {
		$('<li>', {
			text: elt,
		}).appendTo(list).fadeIn();
	}

	return list;
}

function emptyPromise(): Promise<void> {
	return Promise.resolve();
}