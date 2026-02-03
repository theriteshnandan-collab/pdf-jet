"use client";

import { useState, useEffect } from "react";
import { Loader2, Play, Download } from "lucide-react";

export default function Laboratory() {
    const [html, setHtml] = useState(`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 40px; }
    .header { border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
    .title { color: #FF4F00; font-size: 24px; font-weight: bold; }
    .content { font-size: 14px; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="header">
    <div class="title">PDF-JET TEMPLATE</div>
  </div>
  <div class="content">
    <h1>Hello World</h1>
    <p>This is a live preview of your PDF-Jet template.</p>
    <ul>
      <li>Fast</li>
      <li>Minimal</li>
      <li>Industrial</li>
    </ul>
  </div>
</body>
</html>`);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const generatePreview = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/v1/pdf", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ html }),
            });

            if (!response.ok) throw new Error("Preview Generation Failed");

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            setPdfUrl(url);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = () => {
        if (!pdfUrl) return;
        const a = document.createElement("a");
        a.href = pdfUrl;
        a.download = "template-preview.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    // Generate initial preview on mount
    useEffect(() => {
        generatePreview();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex-1 flex flex-col h-full bg-background overflow-hidden font-mono">
            <header className="h-14 border-b border-[var(--border)] flex items-center justify-between px-6 shrink-0">
                <div className="flex items-center gap-4">
                    <h2 className="font-bold text-lg">The Laboratory</h2>
                    <span className="text-[10px] bg-muted px-2 py-0.5 border border-[var(--border)] text-muted-foreground uppercase">Draft</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={generatePreview}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs border border-[var(--border)] hover:bg-muted transition-colors disabled:opacity-50"
                    >
                        {isLoading ? <Loader2 size={12} className="animate-spin" /> : <Play size={12} />}
                        RUN RENDER
                    </button>
                    <button
                        onClick={handleDownload}
                        disabled={!pdfUrl || isLoading}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs border border-[var(--border)] bg-foreground text-background font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                        <Download size={12} />
                        EXPORT
                    </button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Editor Panel */}
                <div className="w-1/2 border-r border-[var(--border)] flex flex-col">
                    <div className="h-8 bg-muted border-b border-[var(--border)] flex items-center px-4 shrink-0">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">template.html</span>
                    </div>
                    <textarea
                        value={html}
                        onChange={(e) => setHtml(e.target.value)}
                        className="flex-1 w-full bg-input p-6 text-sm outline-none resize-none font-mono text-foreground focus:ring-1 focus:ring-primary/20 leading-relaxed"
                        spellCheck={false}
                    />
                </div>

                {/* Preview Panel */}
                <div className="w-1/2 bg-[#121212] flex flex-col">
                    <div className="h-8 bg-muted border-b border-[var(--border)] flex items-center px-4 shrink-0">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Live Preview</span>
                    </div>
                    <div className="flex-1 p-8 flex items-center justify-center overflow-auto">
                        {isLoading ? (
                            <div className="flex flex-col items-center gap-4 text-muted-foreground">
                                <Loader2 size={32} className="animate-spin text-primary" />
                                <span className="text-xs uppercase tracking-[0.2em]">Processing Signal...</span>
                            </div>
                        ) : pdfUrl ? (
                            <iframe
                                src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                                className="w-full h-full bg-white shadow-2xl border border-[var(--border)]"
                                style={{ aspectRatio: '1 / 1.414' }}
                            />
                        ) : (
                            <div className="text-xs text-muted-foreground uppercase tracking-[0.2em]">Awaiting Render Signal</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
