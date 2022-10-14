exports.checkCsrfError = (err, req, res, next) => {
    if(err) {
      return res.render('404');
    }
    next();
};

exports.csrfMiddleware = (req , res , next) =>{
    res.locals.csrfToken = req.csrfToken();
    next();
}

exports.middlewareGlobal = (req , res , next) =>{
    res.locals.errors = req.flash('errors');
    res.locals.succes = req.flash('succes');
    res.locals.user = req.session.user;
    next();
}