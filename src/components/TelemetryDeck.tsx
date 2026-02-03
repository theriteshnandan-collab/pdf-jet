"use client";

import { Activity, Server, Clock, BarChart3 } from "lucide-react";

export default function TelemetryDeck() {
    return (
        <div className="grid grid-cols-4 gap-4 mb-8">
            {/* Card 1: Total Volume */}
            <div className="border border-[var(--border)] p-4 bg-background relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-50">
                    <Activity size={16} className="text-muted-foreground" />
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-2">Total Generated</div>
                <div className="text-3xl font-mono font-bold tracking-tighter">8,492</div>
                <div className="flex items-center gap-1 mt-2 text-[10px] text-success font-bold uppercase tracking-wider">
                    <span>▲ 14%</span>
                    <span className="text-muted-foreground opacity-50">/ 24h</span>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-muted">
                    <div className="h-full bg-primary w-[65%]" />
                </div>
            </div>

            {/* Card 2: Average Latency */}
            <div className="border border-[var(--border)] p-4 bg-background relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-50">
                    <Clock size={16} className="text-muted-foreground" />
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-2">Avg Latency</div>
                <div className="text-3xl font-mono font-bold tracking-tighter">142<span className="text-sm ml-1 text-muted-foreground">ms</span></div>
                <div className="flex items-center gap-1 mt-2 text-[10px] text-primary font-bold uppercase tracking-wider">
                    <span>● Stable</span>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-muted">
                    <div className="h-full bg-primary w-[92%]" />
                </div>
            </div>

            {/* Card 3: Success Rate */}
            <div className="border border-[var(--border)] p-4 bg-background relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-50">
                    <BarChart3 size={16} className="text-muted-foreground" />
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-2">Success Rate</div>
                <div className="text-3xl font-mono font-bold tracking-tighter">99.9<span className="text-sm ml-1 text-muted-foreground">%</span></div>
                <div className="flex items-center gap-1 mt-2 text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                    <span>0.1% Err</span>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-muted">
                    <div className="h-full bg-success w-[99.9%]" />
                </div>
            </div>

            {/* Card 4: System Load */}
            <div className="border border-[var(--border)] p-4 bg-background relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-50">
                    <Server size={16} className="text-muted-foreground" />
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-2">Worker Load</div>
                <div className="text-3xl font-mono font-bold tracking-tighter">12<span className="text-sm ml-1 text-muted-foreground">%</span></div>
                <div className="flex items-center gap-1 mt-2 text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                    <span>Idle</span>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-muted">
                    <div className="h-full bg-primary w-[12%]" />
                </div>
            </div>
        </div>
    );
}
