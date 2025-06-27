import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

export async function POST(request: NextRequest) {
  try {
    const { message, history, context } = await request.json();

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    // Build context-aware system prompt
    let systemPrompt = `You are a helpful assistant for startup risk assessment. You help users with:
- Understanding startup costs and financial planning
- Sales forecasting and revenue projections
- COGS (Cost of Goods Sold) calculations
- Salary planning and personnel costs
- Risk assessment and mitigation strategies
- Business model validation
- Market analysis and competitive positioning

Provide clear, actionable advice and help users navigate through the startup risk assessment process. Be concise but thorough in your responses.`;

    // Add page context if available
    if (context) {
      systemPrompt += `\n\n**Current Page Context:**
- Page Title: ${context.pageTitle}
- Current Path: ${context.currentPath}
- Page Content: ${context.visibleText}`;

      if (context.formData) {
        systemPrompt += `\n- Form Data: ${JSON.stringify(context.formData, null, 2)}`;
      }

      if (context.tableData) {
        systemPrompt += `\n- Table Data:\n${context.tableData.join('\n')}`;
      }

      systemPrompt += `\n\nUse this context to provide more relevant and specific help. If the user is asking about data on the current page, refer to the specific information shown above.`;
    }

    // Call Gemini API
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemPrompt}\n\nUser message: ${message}` }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to get response from Gemini API' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      return NextResponse.json(
        { error: 'Invalid response from Gemini API' },
        { status: 500 }
      );
    }

    const responseText = data.candidates[0].content.parts[0].text;

    return NextResponse.json({ response: responseText });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 