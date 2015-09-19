import assert from 'power-assert';

import Router from '../';

before(done => {
  global.location = global.location || {};
  done();
});

describe('Router', () => {

  describe('constructor', () => {
    it('case1', () => {
      const routes = {
        ['/']() {console.log('/')},
        '/page/': [
          () => {console.log('/page/')},
          () => {console.log('/page/ 2')}
        ],
        '/page.html': [
          () => {console.log('/page.html 1')},
          () => {console.log('/page.html 2')}
        ]
      };

      const router = new Router(routes);

      assert(router instanceof Router);
      assert.deepEqual(router.routes, routes);
      assert.deepEqual(router.config, {rootPath: ''});
    });
  });

  describe('configure', () => {
    it('case1', () => {
      const config = {
        rootPath: '/path/to'
      };
      const router = new Router();
      router.configure(config);
      assert.deepEqual(router.config, config);
    });
  });

  describe('run', () => {
    it('case /', () => {
      global.location.pathname = '/';

      let expected = false;

      const routes = {
        ['/']() {
          expected = true
        },
        '/page/': [
          () => {console.log('/page/')},
          () => {console.log('/page/ 2')}
        ],
        ['/page.html']() {
          console.log('/page.html 1');
        }
      };
      const router = new Router(routes);
      router.run();
      assert(expected);
    });

    it('case /page/', () => {
      global.location.pathname = '/page/';

      let expected1 = false, expected2 = false;

      const routes = {
        '/page/': [
          () => {expected1 = true;},
          () => {expected2 = true;}
        ],
      };
      const router = new Router(routes);
      router.run();
      assert(expected1 && expected2);
    });

    it('case /page.html', () => {
      global.location.pathname = '/page.html';

      let expected = false;

      const routes = {
        ['/page.html']() {
          expected = true;
        }
      };
      const router = new Router(routes);
      router.run();
      assert(expected);
    });
  });

  describe('addRoute', () => {
    it('case1', () => {
      global.location.pathname = '/';

      let expected = false;
      const router = new Router();

      router.addRoute({
        ['/']() {
          expected = true;
        }
      });

      router.run();
      assert(expected);
    });
  });

  describe('removeRoute', () => {
    it('case1', () => {
      global.location.pathname = '/';

      let expected = true;
      const router = new Router({
        ['/']() {
          expected = false;
        }
      });

      router.removeRoute('/');

      router.run();
      assert(expected);
    });
  });

});
