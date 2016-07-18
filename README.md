# jQuery plugin - dropdown with search

### Custom dropdown with search

## Usage

1. Include jQuery:

	```html
	<script src="https://cdn.bootcss.com/jquery/2.1.4/jquery.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="src/jquery.wanli.select.js"></script>
	```

3. Call the plugin:

	```javascript
	$("#element").wanliSelect({
		source: "",
		nodeText: "text",
		nodeValue: "value"
	});
	```
4. Available methods:
	```javascript
	//for nested dropdown
	$("#element").trigger("update", dataArray);

	//manually change value
	$("#element").trigger("valueChange", [{name: "name", value: "value"}]);
	```

## Demo

A live [demo](https://jquery-plugin-arpeggie.c9users.io/demo/index.html) hosted on cloud9. or just preview the [code](https://github.com/Arpeggie/jquery-boilerplate/blob/master/demo/index.html).

## Todo
- enrich default value
- add some tests