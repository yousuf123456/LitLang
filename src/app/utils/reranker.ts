import { VoyageAIRerank } from "../../lib/voyageai-rerank";

let reranker = new VoyageAIRerank({
  topN: 6,
  model: "rerank-1",
  scoreThresholdPer: 0.2,
  apiKey: process.env.VOYAGE_API_KEY,
});

export default reranker;
