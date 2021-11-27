const root = 'http://127.0.0.1:5000';
$('#action_post').on('click', async () => {
	post($('#input_post').val()?.toString());
	get();
});

$('#action_get').on('click', async () => {
	get();
});

function get (): void{
	fetch(`${root}/get`)
		.then(res => res.json())
		.then(res => res.response)
		.then(res => {
			$('#output').replaceWith(generateListElementFromArray(res));
			console.log(res);
		});
}

function post (body: string|undefined): void{
	if (!body) return;
	fetch(`${root}/post?body=${encodeURIComponent(body)}`)
		.then(res => res.json())
		.then(res => $('#output').html(res.response));
}

function generateListElementFromArray (array: string[]): JQuery<HTMLElement>{
	console.log(typeof array);
	array = array.join("").split(",");
	
	let list = $('<ul>');
	list.attr("id", "output");

	for (const elt of array) {
		console.log(elt);
		$('<div>', {
			text: elt,
		}).appendTo(list);
	}

	return list;
}
