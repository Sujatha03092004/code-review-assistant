import * as vscode from "vscode";

const API_URL = "https://code-review-assistant-api.onrender.com";

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand(
        "code-review-assistant.reviewCode",
        async () => {
            const editor = vscode.window.activeTextEditor;

            if (!editor) {
                vscode.window.showErrorMessage("No active editor found.");
                return;
            }

            const selection = editor.selection;
            const code = editor.document.getText(
                selection.isEmpty ? undefined : selection
            );

            if (!code.trim()) {
                vscode.window.showErrorMessage("No code to review.");
                return;
            }

            // Detect language from file type
            const languageMap: Record<string, string> = {
                python: "python",
                javascript: "javascript",
                typescript: "typescript",
                java: "java",
                cpp: "cpp",
                go: "go",
                rust: "rust",
            };

            const fileLanguage = editor.document.languageId;
            const language = languageMap[fileLanguage] || "python";

            // Show progress
            vscode.window.withProgress(
                {
                    location: vscode.ProgressLocation.Notification,
                    title: "Reviewing your code with AI...",
                    cancellable: false,
                },
                async () => {
                    try {
                        const response = await fetch(`${API_URL}/api/review`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ code, language }),
                        });

                        if (!response.ok) {
                            throw new Error("API request failed");
                        }

                        const data = await response.json() as { review: string };
                        showReviewPanel(data.review, language);

                    } catch (err) {
                        vscode.window.showErrorMessage(
                            "Review failed. Is your backend running?"
                        );
                    }
                }
            );
        }
    );

    context.subscriptions.push(disposable);
}

function showReviewPanel(review: string, language: string) {
    const panel = vscode.window.createWebviewPanel(
        "codeReview",
        "AI Code Review",
        vscode.ViewColumn.Beside,
        {}
    );

    panel.webview.html = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { 
                    font-family: -apple-system, sans-serif; 
                    padding: 20px; 
                    line-height: 1.6;
                    color: #cdd6f4;
                    background: #1e1e2e;
                }
                h1 { 
                    font-size: 18px; 
                    color: #89b4fa;
                    border-bottom: 1px solid #313244;
                    padding-bottom: 10px;
                }
                pre { 
                    background: #313244; 
                    padding: 16px; 
                    border-radius: 8px; 
                    white-space: pre-wrap;
                    font-size: 13px;
                    color: #cdd6f4;
                }
                .tag {
                    display: inline-block;
                    background: #313244;
                    color: #89dceb;
                    padding: 2px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                    margin-bottom: 16px;
                }
            </style>
        </head>
        <body>
            <h1>AI Code Review</h1>
            <span class="tag">${language}</span>
            <pre>${review}</pre>
        </body>
        </html>
    `;
}

export function deactivate() {}