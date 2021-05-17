import './styles.css';
import './views/project/factor1-config-view.js';
import './views/data/factor1-data-view.js';


import { Router } from '@vaadin/router';

window.addEventListener('load', () => {
  initRouter();
});

function initRouter() {
  const router = new Router(document.querySelector('main'));

  router.setRoutes([
    {
      path: '/',
      component: 'project-view',
      action: () => import('./views/project/project-view')    },
    {
      path: '/project',
      component: 'project-view',
      action: () => import('./views/project/project-view')
    },
    {
      path: '/factor1Config/:projectId',
      component: 'factor1-config-view',
      action: () => import('./views/project/factor1-config-view')
    },
    {
      path: '/factor1Data/:projectId',
      component: 'factor1-data-view',
      action: () => import('./views/data/factor1-data-view')
    },
    {
      path: '(.*)',
      component: 'not-found-view',
      action: () =>
        import('./views/not-found-view')
    }
  ]);
}
