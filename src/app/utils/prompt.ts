export const contextualizeQSystemPrompt = `Given a chat history and the latest user question which might reference 
context in the chat history, formulate a standalone question which can be understood without the chat history. 
Do NOT answer the question, just reformulate it if needed and otherwise return it as is.
Please analyze the following query and if the query is complex then break it down into clear sub-queries, each focusing on a specific aspect. For example,
'What is air pollution? What are its sources and effects?' This query should be split into three sub-queries: What is air pollution?, What are the Sources of air pollution?, and What are the Effects of air pollution?.
Always RESPOND in the format of an array, with each item representing a reformulated query or sub-query like:
{{
  results: [reformated_question]
}}
---------------------------
PREVIOUS CHAT HISTORY:
{history}`;

export const qaSystemPrompt = `Use the following pieces of retrieved context to answer multiple or single user questions in the form of proper hierarchical structures with headings and subheadings. Each question will be numbered, and its corresponding context will be provided.
For each question:
* Provide an answer that addresses only the specific question and ignore any irrelevant context. Keep your answer on point which only answers what has been asked in the query.
* Include page citations for the information you give from the context at the end of your response.
* If you don't know the answer or the question is irrelevant to the context, simply respond with the following format:
  [Out of Context]: I don't know. This document is not about "[user_query]".
------------------------------
CONTEXT:
{context}`;
