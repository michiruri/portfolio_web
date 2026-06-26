import * as React from "react";
import { Metadata } from "next";
import { Download, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Resume | Railey Mitchell Q. Capitis",
  description: "Curriculum Vitae of Railey Mitchell Q. Capitis",
};

export default function ResumePage() {
  return (
    <div className="w-screen h-screen flex flex-col bg-[#07070a] text-foreground font-sans overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#0a0a16]/40 border-b border-white/5 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center p-2.5 rounded-xl border border-white/5 bg-primary/5 text-primary">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight">Railey Mitchell Q. Capitis</h1>
            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Curriculum Vitae / Resume</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/raileymitchellcapitis.pdf"
            download="raileymitchellcapitis.pdf"
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-primary text-white rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/15"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Download PDF</span>
            <span className="inline sm:hidden">Download</span>
          </a>
        </div>
      </div>

      {/* PDF View Container */}
      <div className="flex-grow w-full h-full relative bg-[#07070a]">
        <iframe
          src="/raileymitchellcapitis.pdf"
          className="w-full h-full border-0 absolute inset-0"
          title="Railey Mitchell Q. Capitis - Resume"
        />
        
        {/* Mobile helper notice */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:hidden bg-[#07070a]/90 backdrop-blur-md border border-white/5 px-4 py-2.5 rounded-2xl flex items-center gap-2 text-[10px] font-semibold text-muted-foreground shadow-2xl z-30">
          <FileText className="h-4.5 w-4.5 text-primary animate-pulse" />
          <span>Multi-page PDF. Use Download if display is restricted.</span>
        </div>
      </div>
    </div>
  );
}
