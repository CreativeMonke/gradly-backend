import { handleAiRequest } from "../utils/ai-handler.js";

export async function generateSubjectDescription(req, res) {
  try {
    const { name, subjectCategory } = req.body;

    // Validation
    if (!name || !subjectCategory) {
      return res.status(400).json({
        status: "error",
        message: "Name and subjectCategory are required.",
        data: null,
      });
    }

    // Create a specific prompt for the AI model
    const prompt = `Provide a concise and engaging definition (max 10 words) for "${name}". Focus on the essence of the subject. Context: It belongs to the category "${subjectCategory}".`;

    // Send prompt + context to the AI handlerand
    const aiResponse = await handleAiRequest(prompt, { name, subjectCategory });
    let description =
      aiResponse?.choices?.[0]?.message?.content?.trim() ||
      "No description available";
    description = description.replace(/^"|"$/g, "").replace(/\.$/, ""); // Remove trailing period // Remove surrounding quotes
    return res.status(200).json({
      status: "success",
      message: "Subject description generated successfully.",
      data: description,
    });
  } catch (error) {
    console.error(`Error generating subject description: ${error.message}`);

    return res.status(500).json({
      status: "error",
      message: error.message || "Failed to generate subject description.",
      data: null,
    });
  }
}
