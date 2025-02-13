const news = require("../model/adminModels/newsModel");

module.exports.getAllNews = async(req, res) => {
    try{
        newsRes = await news.find();
        res.send(newsRes);
    }catch(err){
        res.send({error: err.message});
    }
};

module.exports.getNewsDetail = async(req, res) => {
    try{
        var news_url = req.query.news_url
        newsDetail = await news.find({news_url});
        res.send(newsDetail);
    }catch(err){
        res.send({error: err.message});
        
    }
}