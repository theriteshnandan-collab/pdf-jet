"use client";

import { useState, useEffect } from "react";
import { Loader2, Save, Play, RefreshCw, Code, Eye } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function Laboratory() {
    const [html, setHtml] = useState(`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 40px; color: #333; }
    .header { border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 30px; }
    h1 { margin: 0; text-transform: uppercase; font-size: 24px; letter-spacing: 2px; }
    .invoice-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
    .total { font-weight: bold; font-size: 18px; margin-top: 20px; border-top: 1px solid #ccc; padding-top: 10px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Invoice #001</h1>
    <p>Date: Feb 04, 2026</p>
  </div>
  <div class="invoice-row"><span>Consulting Services</span><span>$1,000.00</span></div>
  <div class="invoice-row"><span>API Optimization</span><span>$500.00</span></div>
  <div class="total invoice-row"><span>TOTAL</span><span>$1,500.00</span></div>
</body>
</html>`);

    const [saving, setSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const supabase = createClient();

    // Auto-save logic
    const handleSave = async () => {
        setSaving(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                alert("Please log in to save templates.");
                return;
            }

            const { error } = await supabase
                .from('templates')
                .insert({
                    user_id: user.id,
                    name: 'My Custom Invoice', // Hardcoded for MVP simplicity 
                    html_content: html
                });

            if (error) throw error;
            setLastSaved(new Date());
        } catch (err) {
            console.error("Save failed:", err);
            // alert("Failed to save template.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <main className="flex-1 flex flex-col h-full overflow-hidden bg-background">
            {/* Toolbar */}
            <header className="flex justify-between items-center p-4 border-b border-[var(--border)] shrink-0 bg-muted/10">
                <div className="flex items-center gap-4">
                    <h2 className="text-lg font-bold uppercase tracking-tight flex items-center gap-2">
                        <Code size={18} />
                        The Laboratory
                    </h2>
                    <span className="text-[10px] border border-[var(--border)] px-2 py-0.5 text-muted-foreground uppercase tracking-widest">
                        Visual Builder v1.0
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    {lastSaved && <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-widest mr-2">Saved {lastSaved.toLocaleTimeString()}</span>}
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-primary text-primary-foreground px-4 py-2 text-xs font-bold uppercase tracking-widest hover:opacity-90 flex items-center gap-2"
                    >
                        {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                        Save_Template
                    </button>
                </div>
            </header>

            {/* Split View */}
            <div className="flex-1 flex overflow-hidden">
                {/* Editor Pane (Left) */}
                <div className="w-1/2 flex flex-col border-r border-[var(--border)]">
                    <div className="px-4 py-2 bg-muted/20 border-b border-[var(--border)] text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex justify-between">
                        <span>HTML Source</span>
                        <span>Editor Mode</span>
                    </div>
                    <textarea
                        value={html}
                        onChange={(e) => setHtml(e.target.value)}
                        className="flex-1 bg-[#09090b] text-white font-mono text-sm p-4 outline-none resize-none leading-relaxed"
                        spellCheck={false}
                    />
                </div>

                {/* Preview Pane (Right) */}
                <div className="w-1/2 flex flex-col bg-white">
                    <div className="px-4 py-2 bg-muted/20 border-b border-[var(--border)] text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex justify-between border-l border-[var(--border)]">
                        <span>Live Preview</span>
                        <span className="flex items-center gap-1"><Eye size={10} /> Render</span>
                    </div>
                    <iframe
                        srcDoc={html}
                        className="flex-1 w-full h-full border-none box-border"
                        title="Preview"
                        sandbox="allow-scripts"
                    />
                </div>
            </div>
        </main>
    );
}
