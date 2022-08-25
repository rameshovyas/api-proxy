const express = require('express');
const cors = require('cors');
const url = require('url');

require('dotenv').config();

const needle = require('needle');

const app = new express();

const PORT = process.env.PORT || 4000;

//Enable CORS
app.use(cors())

// Enviornment variable 
const API_URL = process.env.API_URL
const API_KEY_VARIABLE = process.env.API_KEY_VARIABLE
const API_KEY_VALUE = process.env.API_KEY_VALUE

//create the route
app.get("/api", async (req,res) => {
    try{  
        
         
        const params = new URLSearchParams({
            [API_KEY_VARIABLE] : API_KEY_VALUE,
            ...url.parse(req.url,true).query //Query parameters passed to the proxy e.g city here
        })    
        //Call the actual api here using needle
        const apiResponse = await needle('get',`${API_URL}?${params}`);
        const data = apiResponse.body;
        res.status(200).json(data);
    }
    catch(ex) {
        res.status(500).json({ex});
    }
    

});
app.listen(PORT , () => console.log(`Proxy server listening at port ${PORT}`));
