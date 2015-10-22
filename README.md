# jazzon-format

> Format strings using `util.format`

## Usage

Here is an example where we're using it together with [jazzon-faker](https://github.com/tornqvist/jazzon-faker) to wrap a lipsum text in `p` tags.

```
const jazzon = require('jazzon');
const faker = require('jazzon-faker');
const format = require('jazzon-format');
const json = { title: '@{ lorem.sentences(3) | format(<p>%s</p>) }' };

jazzon
  .use(faker())
  .use(format())
  .compile(json)
  .then((result) => {
    console.log(result); // => { "title": "<p>Lorem ipsum dolor sit…</p>" }
  });
```

## Licence

MIT
