import React, { useCallback, useMemo, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { BookLayout } from './components/BookLayout';
import { VoicePage, VoiceProvider, VoiceToggleButton } from './components/Voice';
import {
  Spread1Left,
  Spread1Right,
  Spread2Left,
  Spread2Right,
  Spread3Left,
  Spread3Right,
  Spread4Left,
  Spread4Right,
  Spread5ModuleLeft,
  Spread5ModuleRight,
  Spread5Left,
  Spread5Right,
  Spread6Left,
  Spread6Right,
  Spread7Left,
  Spread7Right,
} from './components/Contents';

type SlideComponent = React.ComponentType;

interface SpreadPair {
  left: SlideComponent;
  right: SlideComponent;
}

interface PdfSlide {
  key: string;
  side: 'left' | 'right';
  Component: SlideComponent;
}

const spreadPairs: SpreadPair[] = [
  { left: Spread1Left, right: Spread1Right },
  { left: Spread2Left, right: Spread2Right },
  { left: Spread3Left, right: Spread3Right },
  { left: Spread4Left, right: Spread4Right },
  { left: Spread5ModuleLeft, right: Spread5ModuleRight },
  { left: Spread5Left, right: Spread5Right },
  { left: Spread6Left, right: Spread6Right },
  { left: Spread7Left, right: Spread7Right },
];

const PDF_EXPORT_PAGE_SIZE = 700;
const PDF_EXPORT_WINDOW_WIDTH = 1440;
const PDF_EXPORT_WINDOW_HEIGHT = 900;

const waitForNextPaint = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });

const waitForAssetsReady = async (container: HTMLElement) => {
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  const images = Array.from(container.querySelectorAll<HTMLImageElement>('img'));
  await Promise.all(
    images.map(
      (image) =>
        new Promise<void>((resolve) => {
          if (image.complete && image.naturalWidth > 0) {
            resolve();
            return;
          }

          const done = () => resolve();
          image.addEventListener('load', done, { once: true });
          image.addEventListener('error', done, { once: true });
        }),
    ),
  );
};

function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const pdfPageSize = useMemo(
    () => ({ width: PDF_EXPORT_PAGE_SIZE, height: PDF_EXPORT_PAGE_SIZE }),
    [],
  );

  const spreads = useMemo(
    () =>
      spreadPairs.map(({ left: Left, right: Right }, index) => {
        const leftId = `spread-${index + 1}-left`;
        const rightId = `spread-${index + 1}-right`;

        const baseUrl = import.meta.env.BASE_URL.endsWith('/')
          ? import.meta.env.BASE_URL
          : `${import.meta.env.BASE_URL}/`;

        // Put audio files under `public/voice/` and name them like: `spread-1-left.mp3`
        const leftSrc = `${baseUrl}voice/${leftId}.mp3`;
        const rightSrc = `${baseUrl}voice/${rightId}.mp3`;

        return {
          left: (
            <VoicePage id={leftId} src={leftSrc} side="left">
              <Left />
            </VoicePage>
          ),
          right: (
            <VoicePage id={rightId} src={rightSrc} side="right">
              <Right />
            </VoicePage>
          ),
        };
      }),
    [],
  );

  const pdfSlides = useMemo<PdfSlide[]>(
    () =>
      spreadPairs.flatMap(({ left: Left, right: Right }, index) => [
        { key: `spread-${index + 1}-left`, side: 'left', Component: Left },
        { key: `spread-${index + 1}-right`, side: 'right', Component: Right },
      ]),
    [],
  );

  const handleDownloadPdf = useCallback(async () => {
    if (!exportRef.current || isExportingPdf) return;

    try {
      setIsExportingPdf(true);
      await waitForNextPaint();

      const exportNode = exportRef.current;
      await waitForAssetsReady(exportNode);

      const slideNodes = Array.from(exportNode.querySelectorAll<HTMLElement>('[data-pdf-slide]'));
      if (!slideNodes.length) {
        throw new Error('No slides found for PDF export');
      }

      const captureScale = Math.max(1.8, Math.min(2.2, window.devicePixelRatio || 2));
      let pdf: jsPDF | null = null;

      for (const slideNode of slideNodes) {
        const width = slideNode.clientWidth;
        const height = slideNode.clientHeight;

        const canvas = await html2canvas(slideNode, {
          backgroundColor: null,
          useCORS: true,
          scale: captureScale,
          width,
          height,
          windowWidth: Math.max(PDF_EXPORT_WINDOW_WIDTH, window.innerWidth),
          windowHeight: Math.max(PDF_EXPORT_WINDOW_HEIGHT, window.innerHeight),
          scrollX: 0,
          scrollY: 0,
          onclone: (clonedDocument) => {
            const animationNodes = clonedDocument.querySelectorAll<HTMLElement>('*');
            animationNodes.forEach((node) => {
              node.style.animation = 'none';
              node.style.transition = 'none';
            });
          },
        });

        const imageData = canvas.toDataURL('image/jpeg', 0.95);
        const orientation = canvas.width >= canvas.height ? 'landscape' : 'portrait';
        const pageFormat: [number, number] = [canvas.width, canvas.height];

        if (!pdf) {
          pdf = new jsPDF({
            orientation,
            unit: 'px',
            format: pageFormat,
            compress: true,
          });
        } else {
          pdf.addPage(pageFormat, orientation);
        }

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        pdf.addImage(imageData, 'JPEG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
      }

      if (!pdf) {
        throw new Error('Could not initialize PDF');
      }

      const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
      pdf.save(`deepcode-catalog-${timestamp}.pdf`);
    } catch (error) {
      console.error('PDF export failed:', error);
      window.alert('Kh\u00f4ng th\u1ec3 xu\u1ea5t PDF. Vui l\u00f2ng th\u1eed l\u1ea1i.');
    } finally {
      setIsExportingPdf(false);
    }
  }, [isExportingPdf]);

  return (
    <VoiceProvider>
      <div
        ref={appRef}
        className="h-screen bg-gradient-to-r from-orange-600 via-orange-400 to-orange-200 font-sans text-slate-800 overflow-hidden flex flex-col"
      >
        {/* Navbar */}
        <nav className="w-full h-14 bg-white/95 backdrop-blur-sm border-b border-slate-200/80 flex items-center justify-between px-4 md:px-6 z-50">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center text-white font-bold shadow-lg">
              <span className="material-symbols-outlined text-[18px]">code</span>
            </div>
            <span className="text-lg md:text-xl font-extrabold tracking-tight uppercase">
              <span className="text-slate-900">Deep</span>
              <span className="text-primary">Code</span>
            </span>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <button className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors">
              <span className="material-symbols-outlined text-[18px]">info</span>
              {'Gi\u1edbi thi\u1ec7u'}
            </button>
            <VoiceToggleButton />
            <button
              onClick={handleDownloadPdf}
              disabled={isExportingPdf}
              className="flex items-center gap-2 px-3.5 md:px-4 py-1.5 md:py-2 bg-primary hover:bg-orange-600 disabled:opacity-70 disabled:cursor-wait text-white text-xs md:text-sm font-semibold rounded-full transition-colors shadow-lg shadow-orange-500/30"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              {isExportingPdf ? '\u0110ang t\u1ea1o PDF...' : 'T\u1ea3i PDF'}
            </button>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 min-h-0 flex items-center justify-center px-3 pt-2 pb-4 md:px-4 md:pt-3 md:pb-5 lg:px-6 lg:pt-3 lg:pb-6 relative w-full overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-gradient-to-r from-orange-600 via-orange-400 to-orange-200">
            <div className="absolute top-1/2 left-[10%] -translate-y-1/2 w-[520px] h-[520px] bg-orange-700/25 rounded-full blur-[130px]" />
            <div className="absolute top-1/2 right-[8%] -translate-y-1/2 w-[680px] h-[680px] bg-amber-100/50 rounded-full blur-[140px]" />
            <div className="absolute inset-0 opacity-30 bg-[linear-gradient(90deg,rgba(194,65,12,0.45)_0%,rgba(249,115,22,0.2)_45%,rgba(255,237,213,0)_100%)]" />
          </div>

          {/* The 3D Book */}
          <BookLayout spreads={spreads} />
        </main>

        {/* Hidden export surface: each half-page becomes one PDF page */}
        <div
          ref={exportRef}
          aria-hidden="true"
          className="pointer-events-none"
          style={{ position: 'fixed', top: 0, left: '-100000px' }}
        >
          <div className="flex flex-col gap-4">
            {pdfSlides.map((slide) => {
              const SlideContent = slide.Component;

              return (
                <div
                  key={slide.key}
                  data-pdf-slide
                  className="relative overflow-hidden"
                  style={{ width: `${pdfPageSize.width}px`, height: `${pdfPageSize.height}px` }}
                >
                  {slide.side === 'left' ? (
                    <div className="w-full h-full bg-slate-900 relative overflow-hidden page-left">
                      <SlideContent />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-paper-light text-slate-800 relative overflow-hidden page-right flex flex-col border-l border-slate-200/50">
                      <div className="absolute inset-0 bg-paper-texture opacity-40 pointer-events-none z-20 mix-blend-multiply" />
                      <div className="w-full h-full relative z-10">
                        <SlideContent />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </VoiceProvider>
  );
}

export default App;
