const news = require("../../model/adminModels/newsModel.js");
const { unlinkSync } = require('node:fs');


module.exports.getNews = async(req, res) => {
    try{
        newsRes = await news.find().sort({_id: -1});
        res.render('news/news-list', {newsRes, data: req.cookies});
    }catch(err){
        res.render('news/news-list', {error: err.message, data: req.cookies});
    }
};
module.exports.addNewsForm = async(req, res) => {
    try{
        res.render('news/news-add', {data: req.cookies});
    }catch(err){
        res.render('news/news-add', {error: err.message, data: req.cookies});
    }
    
};

module.exports.editNewsForm = async(req, res) => {
    try{
        newsDetail = await news.findOne({ _id: req.params.newsId });
        res.render('news/news-edit', {prodDetail,data: req.cookies});
    }catch(err){
        res.render('news/news-edit', {error: err.message, data: req.cookies});
    }
    
};

module.exports.submitNews = async(req, res) => {
    try{
       const newNews = new news({
            title: req.body.title,
            description: req.body.description,
            bigimage: req.files.bigimage[0].filename,
            smallimage: req.files.smallimage[0].filename,
            });
        await newNews.save(); 

        res.send("<p style='text-align:center; font-weight:bold;'>News added successfully.</p>")
    }catch(err){
        res.send("<p style='text-align:center; font-weight:bold; padding:5px; color: red;'>An error occurred while saving. " + err.message + "</p>");      
    }
};

module.exports.updateNews = async(req, res) => {
    let updateNews= '';
    try{
    if(req.file) 
    { 
        updateNews = {
            title: req.body.title,
            description: req.body.description,
            bigmage: req.files.bigimage[0].filename,
            smallimage: req.files.smallimage[0].filename,
            
        };
    }
    else{
        updateNews = {
            title: req.body.title,
            description: req.body.description,
            bigimage: req.body.bigimage_old,
            smallimage: req.body.smallimage_old,
            
        };
    }
        const filter = { _id: req.body.news_id }
        await news.findOneAndUpdate(filter, updateNews, {
            returnOriginal: false
          }); 

        
        res.send("<p style='text-align:center; font-weight:bold;'>News updated successfully.</p>")
    }catch(err){
        res.send("<p style='text-align:center; font-weight:bold; padding:5px; color: red;'>An error occurred while updating. " + err.message + "</p>");      
    }
};

module.exports.deleteNews = async(req, res) => {
    try{
        newsImage = await news.findOne({ _id: req.params.newsId });
        if(newsImage.bigimage) unlinkSync('./././public/img/blog/' + newsImage.bigimage);
        if(newsImage.smallimage) unlinkSync('./././public/img/blog/' + newsImage.smallimage);
        await news.deleteOne({ _id: req.params.newsId })
        res.status(200).json();
    }catch(err){
        res.send("<p style='text-align:center; font-weight:bold; padding:5px; color: red;'>An error occurred. " + err.message + "</p>");
    }
    
};
