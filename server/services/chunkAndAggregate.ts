import OpenAI from 'openai';

/**
 * Chunks rows and aggregates insights from OpenAI.
 * @param rows Array of review rows (arrays of strings)
 * @param headers Array of column headers
 * @param openai OpenAI instance
 * @param chunkSize Number of rows per chunk (default: 50)
 * @returns Aggregated insights string
 */
export async function chunkAndAggregateInsights({
  rows,
  headers,
  openai,
  chunkSize = 50,
}: {
  rows: string[][],
  headers: string[],
  openai: OpenAI,
  chunkSize?: number,
}): Promise<string> {
  // 1. Chunk rows
  const chunks: string[][][] = [];
  for (let i = 0; i < rows.length; i += chunkSize) {
    chunks.push(rows.slice(i, i + chunkSize));
  }

  // 2. Analyze each chunk
  const chunkInsights: string[] = [];
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const csvChunk = headers.join(',') + '\n' + chunk.map(r => r.join(',')).join('\n');
    // Dynamically find the review column name
    const reviewColIdx = headers.findIndex(h => /review|feedback|comment|testimonial/i.test(h));
    const reviewColName = reviewColIdx !== -1 ? headers[reviewColIdx] : headers[1] || 'review';
    // Sample data for clarity
    const sampleRows = [headers].concat(chunk.slice(0, 3));
    const sampleCsv = sampleRows.map(r => r.join(',')).join('\n');
    const prompt = `You are an expert in DTC marketing and customer insights.\n\nStep-by-Step: How to Analyze Brand Reviews\n1. Input Gathering: Collect review content (brand name, review text, ratings, etc.)\n2. Text Preprocessing: Clean and normalize the review text for clarity.\n3. Natural Language Understanding: Analyze sentiment, extract topics, and identify key entities and emotions.\n4. Clustering & Insight Extraction: Group reviews by theme, emotion, and intent, and summarize each group.\n5. Key Insight Generation: Produce benefits, pain points, objections, quotes, persona clues, and marketing angles.\n\nBelow is a CSV. The column labeled '${reviewColName}' contains the actual customer review text.\nAnalyze ONLY the '${reviewColName}' column for insights, using other columns as context if helpful.\n\nHere is a sample of the data:\n${sampleCsv}\n\nNow, analyze the full chunk of data below:\n${csvChunk}`;
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are an expert in DTC marketing and customer insights.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 600,
      temperature: 0.3,
    });
    chunkInsights.push(completion.choices[0]?.message?.content || '');
  }

  // 3. Aggregate all chunk insights
  const aggregatePrompt = `You are an expert strategist. Synthesize and merge all insights from the following customer review batches into a single, unified summary for a creative brief.\n\nPresent your output using these sections (with numbered lists where appropriate):\n\n- Benefits\n- Pain points\n- Objections\n- Quotes to reuse in ads\n- Persona clues (e.g., “fashion-conscious parents”)\n- Marketing angles (e.g., trust, transformation)\n\nRemove duplicates, renumber all lists starting from 1, and ensure each section is concise and actionable.\n\nHere are the insights from all batches:\n---\n${chunkInsights.join('\n---\n')}\n---`;
  const aggregateCompletion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are an expert in DTC marketing and customer insights.' },
      { role: 'user', content: aggregatePrompt },
    ],
    max_tokens: 800,
    temperature: 0.3,
  });
  return aggregateCompletion.choices[0]?.message?.content || '';
}
