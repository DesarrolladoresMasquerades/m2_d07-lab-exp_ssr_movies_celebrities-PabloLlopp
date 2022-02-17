// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.route("/:id/edit")
.get((req, res)=> {
    const id = req.params.id;
    let data = "";
    Movie.findById(id)
    .then((movie)=> {
        data = movie
        Celebrity.find()
        .then((celebrities)=>res.render("movies/edit-movie", {data, celebrities}))
    })
    .catch(err=> console.log(`There's an error loading a movie: ${err}`));
})
.post((req, res)=> {
    const id = req.params.id;
    const title = req.body.title;
    const genre = req.body.genre;
    const plot = req.body.plot;
    const cast = req.body.cast;
    const movie = {title, genre, plot, cast};
    Movie.findByIdAndUpdate(id, movie, {new: true})
    .then(res.redirect(`/movies/${id}`)
    )
    .catch(err=> console.log(`There's an error updating a movie: ${err}`));
})


router.route("/:id/delete")
.post((req, res)=> {
    const id = req.params.id;
    Movie.findByIdAndDelete(id)
    .then(res.redirect("/movies"))
    .catch(err=> console.log(`There's an error deleting a movie: ${err}`));
})



router.route("/create")
.get((req, res)=> {
    Celebrity.find()
    .then((celebrities)=> res.render("movies/new-movie", {celebrities}))
    .catch(err=> console.log(`There's an error creating a movie: ${err}`));
})
.post((req,res)=> {
    const title = req.body.title;
    const genre = req.body.genre;
    const plot = req.body.plot;
    const cast = req.body.cast;
    const movie = {title, genre, plot, cast};

    Movie.create(movie)
    .then(res.redirect("/movies"))
    .catch(err=> console.log(`There's an error creating a movie: ${err}`));
});

router.route("/:id")
.get((req, res)=> {
    const id = req.params.id;
    Movie.findById(id)
    .populate("cast")
    .then((movie)=> res.render("movies/movie-details", movie))
    .catch(err=> console.log(`There's an error listing a movie: ${err}`));
})

router.route("/")
.get((req,res)=> {
    Movie.find()
    .then((movies)=> res.render("movies/movies", {movies}))
    .catch(err=> console.log(`There's an error listing the movies: ${err}`));
})

module.exports = router;