const HashRoutes = {
    404: {
        template: 'templates/404.html',
        title: '404 |' + urlPageTitle,
        content: 'Page not found'
    },
    "/": {
        template: 'templates/home.html',
        title: 'Home | ' + urlPageTitle,
        content: 'Welcome to the home page'
    },
    dashboard: {
        template: 'templates/dashboard.html',
        title: 'Dashbaord | ' + urlPageTitle,
        content: 'This is the about page'
    },
    profile: {
        template: 'templates/profile.html',
        title: 'Profile | ' + urlPageTitle,
        content: 'This is the Profile page'
    }
};