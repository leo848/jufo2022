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

function updateOutput(data: string[]): void {
	$('#output').replaceWith(generateListElementFromArray(data));
}

function get(onSuccess: (data: string[]) => any): void {
	fetch(`${root}/get`)
		.then(res => res.json())
		.then(res => res.response)
		.then(onSuccess);
}


function post(body: string | undefined, onSuccess?: (status: number) => any): void {
	if (!body) return;
	fetch(`${root}/post?body=${encodeURIComponent(body)}`)
		.then(res => res.status)
		.then(onSuccess);
}

function login(username: string,
	password: string,
	onSuccess: (status: number) => any = (_) => { }): void {
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
		.then(res => { if (onSuccess) onSuccess(res); });

}

function generateListElementFromArray(array: string[]): JQuery<HTMLElement> {
	let list = $('<ul>');
	list.attr("id", "output");

	for (const elt of array) {
		$('<li>', {
			text: elt,
		}).appendTo(list).fadeIn();
	}

	return list;
}
