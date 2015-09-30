import Router from 'routeur';

import indexAction from './indexAction';
import pageAction from './pageAction';

const routes = {
  '/': indexAction,
  '/page/': [() => {console.log('/page/')}, pageAction],
  '/page2/index.html': [() => {console.log('/page2/index.html')}, pageAction],
  '/page.html': [() => {console.log('/page.html')}, pageAction],
  ['/page2.html']() {
    console.log('/page2.html');
  }
};

const router = new Router(routes);

router.run();
