# routeur

[![Build Status][travis-image]][travis-url]
[![GitHub version][github-ver-image]][github-ver-url]
[![License][license-image]][license-url]

Super tiny static url router

```
npm i routeur
```

## Usage

```js
import Router from 'routeur';

import indexAction from './indexAction';
import pageAction from './pageAction';

const routes = {
  '/': indexAction,
  '/index.html': indexAction,
  '/page/': [() => {console.log('/page/')}, pageAction],
  '/page2/index.html': [() => {console.log('/page2/index.html')}, pageAction],
  '/page.html': [() => {console.log('/page.html')}, pageAction],
  ['/page2.html']() {
    console.log('/page2.html');
  }
};

const router = new Router(routes);

router.run();
```

## API

### `.configure()`

### `.run()`

### `.addRoute()`

### `.removeRoute()`

## Contributing

1. Fork it!
2. Create your feature branch: git checkout -b my-new-feature
3. Commit your changes: git commit -am 'Add some feature'
4. Push to the branch: git push origin my-new-feature
5. Submit a pull request :D

## License

[MIT][license-url]

© sugarshin

[npm-image]: http://img.shields.io/npm/v/routeur.svg
[npm-url]: https://www.npmjs.org/package/routeur
[bower-image]: http://img.shields.io/bower/v/routeur.svg
[bower-url]: http://bower.io/search/?q=routeur
[travis-image]: http://img.shields.io/travis/sugarshin/routeur/master.svg?branch=master
[travis-url]: https://travis-ci.org/sugarshin/routeur
[gratipay-image]: http://img.shields.io/gratipay/sugarshin.svg
[gratipay-url]: https://gratipay.com/sugarshin/
[coveralls-image]: https://coveralls.io/repos/sugarshin/routeur/badge.svg
[coveralls-url]: https://coveralls.io/r/sugarshin/routeur
[github-ver-image]: https://badge.fury.io/gh/sugarshin%2Frouteur.svg
[github-ver-url]: http://badge.fury.io/gh/sugarshin%2Frouteur
[license-image]: http://img.shields.io/:license-mit-blue.svg
[license-url]: http://sugarshin.mit-license.org/
[downloads-image]: http://img.shields.io/npm/dm/routeur.svg
[dependencies-image]: http://img.shields.io/david/sugarshin/routeur.svg
