var { jStat } = require("jstat");

import { DocumentInterface } from "@langchain/core/documents";
import { BaseDocumentCompressor } from "@langchain/core/retrievers/document_compressors";
import { getEnvironmentVariable } from "@langchain/core/utils/env";
import { VoyageAIClient } from "voyageai";

export interface VoyageRerankArgs {
  /**
   * The API key to use.
   * @default {process.env.VoyageAI_API_KEY}
   */
  apiKey?: string;
  /**
   * The name of the model to use.
   * @default {"rerank-1"}
   */
  model?: string;
  /**
   * How many documents to return.
   * @default {3}
   */
  topN?: number;
  /**
   * What will be the percentage value for dynamic threshold based on max_relevency_score.
   * @default {0}
   */
  scoreThresholdPer?: number;
}

/**
 * Document compressor that uses `VoyageAI Rerank API`.
 */
export class VoyageAIRerank extends BaseDocumentCompressor {
  model: string | undefined;

  topN = 3;

  client: VoyageAIClient;

  scoreThresholdPer = 0;

  constructor(fields?: VoyageRerankArgs) {
    super();
    const apiKey = fields?.apiKey ?? getEnvironmentVariable("VoyageAI_API_KEY");
    if (!apiKey) {
      throw new Error("No API key provided for VoyageAIRerank.");
    }

    this.client = new VoyageAIClient({
      apiKey,
    });

    this.model = fields?.model ?? this.model;

    if (!this.model) {
      throw new Error(
        "Model not specified for VoyageAIRerank instance. Please provide a model name from the options here: https://docs.VoyageAI.com/reference/rerank"
      );
    }

    this.topN = fields?.topN ?? this.topN;

    this.scoreThresholdPer =
      fields?.scoreThresholdPer || this.scoreThresholdPer;
  }

  /**
   * Compress documents using VoyageAI's rerank API.
   *
   * @param {Array<DocumentInterface>} documents A sequence of documents to compress.
   * @param {string} query The query to use for compressing the documents.
   *
   * @returns {Promise<Array<DocumentInterface>>} A sequence of compressed documents.
   */
  async compressDocuments(
    documents: Array<DocumentInterface>,
    query: string
  ): Promise<Array<DocumentInterface>> {
    const _docs = documents.map((doc) => doc.pageContent);

    const results = await this.rerank(_docs, query, {
      model: this.model!,
      topN: this.topN,
    });

    if (!results)
      throw new Error(
        "There was some error in reranking documents using VoyageAIRerank"
      );

    const finalResults: Array<DocumentInterface> = [];

    const maxRelevencyScore = Math.max(...results.map((r) => r.relevanceScore));
    const maxThreshold = maxRelevencyScore * this.scoreThresholdPer;

    for (let i = 0; i < results.length; i += 1) {
      const result = results[i];
      if (result.index === undefined) continue;

      if (result.relevanceScore < maxThreshold) continue;

      const doc = documents[result.index];
      doc.metadata.relevanceScore = result.relevanceScore;
      finalResults.push(doc);
    }

    return finalResults;
  }

  /**
   * Returns an ordered list of documents ordered by their relevance to the provided query.
   *
   * @param {Array<DocumentInterface | string | Record<string, string>>} documents A list of documents as strings, DocumentInterfaces or objects with a `pageContent` key.
   * @param {string} query The query to use for reranking the documents.
   * @param options
   * @param {string} options.model The name of the model to use.
   * @param {number} options.topN How many documents to return.
   * @param {number} options.maxChunksPerDoc The maximum number of chunks per document.
   *
   * @returns {Promise<Array<{ index: number; relevanceScore: number }>>} An ordered list of documents with relevance scores.
   */
  async rerank(
    documents: Array<DocumentInterface | string | Record<string, string>>,
    query: string,
    options?: {
      model?: string;
      topN?: number;
      maxChunksPerDoc?: number;
    }
  ): Promise<Array<{ index: number; relevanceScore: number }>> {
    const docs = documents.map((doc) => {
      if (typeof doc === "string") {
        return doc;
      }
      return doc.pageContent;
    });

    const model = options?.model ?? this.model;
    const topN = options?.topN ?? this.topN;

    const { data: results } = await this.client.rerank({
      model: model!,
      query,
      documents: docs,
      topK: topN,
    });

    if (!results)
      throw new Error(
        "There was some error in reranking documents using VoyageAIRerank"
      );

    const resultObjects = results.map((result) => ({
      index: result.index || 0,
      relevanceScore: this.transform(result.relevanceScore || 0),
    }));

    return resultObjects;
  }

  transform(x: number) {
    // transformation function to map the absolute relevance value to a value that is more uniformly distributed between 0 and 1
    // - this is critical for the new version of RSE to work properly, because it utilizes the absolute relevance values to calculate the similarity scores
    let a = 0.5; // These can be adjusted to change the distribution shape
    let b = 1.8;

    return jStat.beta.cdf(x, a, b);
  }
}
