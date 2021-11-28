const root = 'http://127.0.0.1:5000';

$('#action_post').on('click', async () => {
	post($('#input_post').val()?.toString());
	get(updateOutput);
});

$('#action_get').on('click', async () => {
	get(updateOutput);
});

$('#action_login').on('click', async () => {
	login(prompt("Enter username") ?? "", prompt("Enter password") ?? "", alert);
});

$('#action_register').on('click', async () => {
	register(prompt("Enter new username") ?? "", prompt("Enter new password") ?? "", alert);
});

function updateOutput(data: string[]): void {
	$('#output').replaceWith(generateListElementFromArray(data));
}

function get(onSuccess: (data: string[]) => void): void {
	fetch(`${root}/get`)
		.then(res => res.json())
		.then(res => res.response)
		.then(onSuccess);
}


function post(
	body: string | undefined,
	onSuccess?: (status: number) => void
): void {
	if (!body) return;
	fetch(`${root}/post?body=${encodeURIComponent(body)}`)
		.then(res => res.status)
		.then(onSuccess);
}

function login(
	username: string,
	password: string,
	onSuccess: (status: number) => void = () => { }
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
		.then(res => res.json())
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
