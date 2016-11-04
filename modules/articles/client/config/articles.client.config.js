'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'My Plans',
      state: 'articles.list',
      
    });

    // // Add the dropdown list item
    // Menus.addSubMenuItem('topbar', 'articles', {
    //   title: 'All My Plans',
    //   state: 'articles.list'
    // });

    // // Add the dropdown create item
    // Menus.addSubMenuItem('topbar', 'articles', {
    //   title: 'Create Plan',
    //   state: 'articles.create'
    // });
  }
]);
