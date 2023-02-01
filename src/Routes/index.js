import express from 'express';
import user from './user.route.js'
import news from './news.route.js';
import category from './category.route.js';


const Routes = (app) => {
    app.use(
        express.json(),
        category,
        user,
        news
       
    )
};

export default Routes;