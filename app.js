const express = require("express");
const morgan = require("morgan");
const app = express();
const store = require("./playstore.js");
app.use(morgan('common'));



app.get('/apps', (req,res)=>{
    const {search = "", sort} = req.query;
    if(sort){
        if(!['Rating','App'].includes(sort)) {
            return res.status(400).send("Sort must be either rating or app");
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

    
    
    
    res.json(results);
})

app.listen(3000);