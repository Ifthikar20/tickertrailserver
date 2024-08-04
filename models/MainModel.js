import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const TopicSchema = new Schema({
  topic: String,
  relevance_score: String,
});

const TickerSentimentSchema = new Schema({
  ticker: String,
  relevance_score: String,
  ticker_sentiment_score: String,
  ticker_sentiment_label: String,
});

const FeedSchema = new Schema({
  title: String,
  url: String,
  time_published: String,
  authors: [String],
  summary: String,
  banner_image: String,
  source: String,
  category_within_source: String,
  source_domain: String,
  topics: [TopicSchema],
  overall_sentiment_score: mongoose.Types.Currency,
  overall_sentiment_label: String,
  ticker_sentiment: [TickerSentimentSchema],
});

const MainSchema = new Schema({
  items: String,
  sentiment_score_definition: String,
  relevance_score_definition: String,
  feed: [FeedSchema],
}, { toJSON: { getters: true } });

const MainModel = mongoose.model("MainModel", MainSchema);

export default MainModel;
