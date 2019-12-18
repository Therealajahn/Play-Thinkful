const express = require("express");
const morgan = require("morgan");
const app = express();
const store = require("./playstore.js");
app.use(morgan('common'));



app.get('/apps', (req,res)=>{
    const { search = "", sort="" } = req.query;
    let { genres = "" } = req.query;

    
    if(sort){
        if(!['Rating','App'].includes(sort)) {
            return res.status(400).send("Sort must be either rating or app");
        }
    }

    if(genres){
        if(!['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(genres.toLowerCase())) {
            return res.status(400).send("Sort must be by approved genres.");
        }
    }
    let results = 
        store.filter(app => 
            app.App
            .toLowerCase()
            .includes(search.toLowerCase())
        );
      
   if(sort === "Rating"){
        results
        .sort((a, b)=>{
            return a["Rating"] - b["Rating"];
        });
    }
    
    if(sort === "App"){
        results
        .sort((a,b)=>{
            return  a["App"] > b["App"] ? 1
                  : a["App"] < b["App"] ? -1
                  : 0;
        })
    }

    if(genres){
        const newArray = results
        .filter(app => {
            genres = req.query.genres.toLowerCase();
            // pull genres and create array for each genre
            const appGenres = app.Genres.toLowerCase().split(';');
            console.log(appGenres);
            if (appGenres.includes(genres)){
                console.log(true)
                return true
            } else {
                console.log(false)
                return false
            }
        })
        results = newArray;
    }
    res.json(results);
})

module.exports = app;