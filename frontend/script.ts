const root = 'http://127.0.0.1:5000';
$('#action_post').on('click', async () => {
	post($('#input_post').val().toString());
	get();
});

$('#action_get').on('click', async () => {
	get();
});

function get (): void{
	fetch(root + '/get')
		.then(res => res.json())
		.then(res =>
			$('#output').replaceWith(generateListElementFromArray(res.response)),
		);
}

function post (body: string): void{
	fetch(root + '/post?body=' + encodeURIComponent(body))
		.then(res => res.json())
		.then(res => $('#output').html(res.response));
}

function generateListElementFromArray (array: string[]): JQuery<HTMLElement>{
	console.log(array);
	let list = $('<ul>');
	array.forEach((elt: string) =>
		$('<div>', {
			text: elt,
		}).appendTo(list),
	);
	return list;
}
