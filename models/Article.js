// Article.js

class Article {
    constructor(data) {
        this.link = data.link;
        this.providerPublishTime = data.providerPublishTime;
        this.publisher = data.publisher;
        this.relatedTickers = data.relatedTickers;
        this.thumbnail = this.getBestResolution(data.thumbnail.resolutions);
        this.title = data.title;
        this.type = data.type;
        this.uuid = data.uuid;
    }

    // Method to get the best resolution image URL
    getBestResolution(resolutions) {
        return resolutions.find(res => res.tag === 'original').url;
    }
}

export default Article;
