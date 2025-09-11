import axios from "axios";

const GEMINI_API_KEY = "AIzaSyCtuMoqszvl0tyjtf8tkTfLn4XhFJ0vPE0";

export async function verifyCodeWithGemini(code: string, input: string, expectedOutput: string) {
  const prompt = `
You are "Dev Agent AI". Check if the following JavaScript code produces the expected output.

Code:
${code}

Input:
${input}

Expected Output:
${expectedOutput}

Respond ONLY with "correct" if it produces the expected output, otherwise "incorrect".
`;

  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { "Content-Type": "application/json" } }
    );

    const reply = res.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim().toLowerCase() || "incorrect";
    return reply.includes("correct");
  } catch (err) {
    console.error("Gemini verification error:", err);
    return false;
  }
}
