import React, { useEffect, useState } from 'react';
import { Icon, VerticalText } from './UI';
import { AnimatePresence, motion } from 'framer-motion';
import coverSlide1 from '../anh/Adjust_your_posture_4k_202602121104.jpeg';
import coverSlide2 from '../anh/Remove_unnecessary_details_4k_202602121052.jpeg';
import coverSlide3 from '../anh/Image_202602121135.jpeg';
import cardCornerImage2 from '../anh/Sharpen_and_adjust_4k_202602121137.jpeg';
import ceoPortrait from '../Character/Reduce_the_number_2k_202602121231.jpeg';

const LeftPageShell: React.FC<{
  topText?: string;
  mainTitle?: string;
  bottomText?: string;
  children: React.ReactNode;
  bgImage?: string;
  bgImageClassName?: string;
  bgOverlayClassName?: string;
}> = ({
  topText = 'TRANG 01',
  mainTitle = 'MỤC',
  bottomText = 'TRANG',
  children,
  bgImage,
  bgImageClassName,
  bgOverlayClassName,
}) => (
  <div className="w-full h-full flex flex-row">
    <div className="absolute inset-0 bg-paper-texture opacity-30 pointer-events-none z-20 mix-blend-overlay" />
    <div className="w-16 h-full border-r border-white/10 flex flex-col items-center justify-center py-12 relative z-10 bg-slate-900/50 backdrop-blur-sm shrink-0">
      <VerticalText top={topText} main={mainTitle} bottom={bottomText} />
      <div className="absolute left-2 top-10 bottom-10 w-px bg-primary/30" />
    </div>
    <div className="flex-1 relative h-full flex flex-col">
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt="Nền minh họa"
            className={`w-full h-full object-cover ${bgImageClassName ?? 'opacity-30 mix-blend-luminosity'}`}
          />
          <div
            className={bgOverlayClassName ?? 'absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/90 to-slate-900/40'}
          />
        </div>
      )}
      <div className="relative z-10 flex flex-col h-full px-10 pt-7 pb-10 lg:px-14 lg:pt-10 lg:pb-14 justify-between">{children}</div>
    </div>
  </div>
);

const COVER_SLIDES = [coverSlide1, coverSlide2, coverSlide3];

const JiraLogoIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M11.9 3.2a.9.9 0 0 0 0 1.28l3.34 3.34-3.34 3.34a.9.9 0 0 0 1.28 1.28l4.26-4.26a.9.9 0 0 0 0-1.28l-4.26-4.26a.9.9 0 0 0-1.28 0z" fill="#2684FF" />
    <path d="M7.57 7.53a.9.9 0 0 0 0 1.28l3.34 3.34-3.34 3.34a.9.9 0 1 0 1.28 1.28l4.26-4.26a.9.9 0 0 0 0-1.28L8.85 7.53a.9.9 0 0 0-1.28 0z" fill="#0052CC" />
    <path d="M3.24 11.86a.9.9 0 0 0 0 1.28l3.34 3.34-3.34 3.34a.9.9 0 0 0 1.28 1.28l4.26-4.26a.9.9 0 0 0 0-1.28l-4.26-4.26a.9.9 0 0 0-1.28 0z" fill="#2684FF" />
  </svg>
);

const GitHubLogoIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
    <path d="M12 .5C5.65.5.5 5.66.5 12.02c0 5.1 3.3 9.42 7.9 10.95.58.1.78-.24.78-.55 0-.27-.01-.98-.02-1.92-3.2.7-3.87-1.36-3.87-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.04-.72.08-.71.08-.71 1.15.08 1.76 1.2 1.76 1.2 1.03 1.75 2.68 1.25 3.34.95.1-.74.4-1.24.73-1.53-2.55-.3-5.31-1.3-5.31-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.2 1.18.93-.26 1.94-.39 2.92-.39 1 0 2 .13 2.93.39 2.22-1.5 3.2-1.18 3.2-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.4-2.76 5.37-5.39 5.66.42.36.8 1.05.8 2.13 0 1.54-.02 2.78-.02 3.16 0 .3.2.66.79.55 4.59-1.54 7.89-5.85 7.89-10.95C23.5 5.66 18.35.5 12 .5z" />
  </svg>
);

const GeminiBrandIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="52%" stopColor="#818cf8" />
        <stop offset="100%" stopColor="#c084fc" />
      </linearGradient>
    </defs>
    <path
      d="M12 2.2c.53 3.9 1.86 5.35 5.8 5.8-3.94.45-5.27 1.9-5.8 5.8-.53-3.9-1.86-5.35-5.8-5.8 3.94-.45 5.27-1.9 5.8-5.8z"
      fill="url(#gemini-grad)"
    />
    <path
      d="M18.1 11.8c.25 1.84.88 2.52 2.74 2.74-1.86.22-2.49.9-2.74 2.74-.25-1.84-.88-2.52-2.74-2.74 1.86-.22 2.49-.9 2.74-2.74z"
      fill="#93c5fd"
      opacity="0.95"
    />
  </svg>
);

const OpenAIBrandIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <g fill="#f8fafc">
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <rect
          key={angle}
          x="10.6"
          y="3.2"
          width="2.8"
          height="8.2"
          rx="1.4"
          transform={`rotate(${angle} 12 12)`}
        />
      ))}
      <circle cx="12" cy="12" r="2.2" fill="#0f172a" />
    </g>
  </svg>
);

const ClaudeBrandIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="9" fill="#fb923c" opacity="0.25" />
    <path
      d="M15.7 7.4a5.4 5.4 0 1 0 0 9.2"
      fill="none"
      stroke="#fdba74"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RightPageShell: React.FC<{
  pageNumber: string;
  footerText?: string;
  children: React.ReactNode;
}> = ({ pageNumber, footerText = 'Hồ sơ DeepCode Tập 4', children }) => {
  const lockScrollPages = ['02', '04', '06', '08'];
  const shouldLockScroll = lockScrollPages.includes(pageNumber);
  const lockedPageZoom: Record<string, number> = {
    '02': 0.98,
    '04': 0.94,
    '06': 0.94,
    '08': 0.94,
  };
  const pageZoom = lockedPageZoom[pageNumber];

  return (
    <div className="flex-grow flex flex-col h-full relative">
      <div className={`flex-grow flex flex-col px-6 pt-4 pb-5 lg:px-8 lg:pt-5 lg:pb-6 relative z-10 ${shouldLockScroll ? 'overflow-hidden' : 'overflow-y-auto no-scrollbar'}`}>
        <div className="h-full origin-top-left" style={pageZoom ? { zoom: pageZoom } : undefined}>
          {children}
        </div>
      </div>
      <div className="p-4 md:px-8 flex justify-between items-center border-t border-slate-200/60 bg-white/50 relative z-10 shrink-0">
        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">{footerText}</span>
        <span className="font-headline font-bold text-slate-800 text-xl">{pageNumber}</span>
      </div>
    </div>
  );
};

export const Spread1Left = () => (
  <div className="w-full h-full bg-slate-900 flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
    <div className="relative z-10 text-center px-8">
      <div className="inline-block px-4 py-1 border border-primary/50 rounded-full text-primary text-xs font-bold uppercase tracking-widest mb-6">Giải pháp doanh nghiệp</div>
      <h1 className="text-6xl lg:text-8xl font-headline font-bold text-white mb-2 tracking-tight">DEEPCODE</h1>
      <h1 className="text-6xl lg:text-8xl font-headline font-bold text-primary mb-8 tracking-tight">DOANH NGHIỆP</h1>
      <p className="text-slate-400 max-w-md mx-auto text-sm leading-relaxed mb-10">Đào tạo Full-stack + AI + DevOps theo định hướng doanh nghiệp thực chiến.</p>
      <button className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-slate-200 transition-colors flex items-center gap-2 mx-auto">
        Khám phá Catalog <Icon name="arrow_forward" className="text-sm" />
      </button>
    </div>
  </div>
);

export const Spread1Right = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const coreWords = ['Commitment', 'Ownership', 'Real-world', 'Efficiency'];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveSlide((prev) => (prev + 1) % COVER_SLIDES.length);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [activeSlide]);

  return (
    <div className="h-full flex flex-col justify-start items-center relative overflow-hidden bg-white">
      <div className="absolute right-0 top-0 h-full w-24 bg-slate-900 transform skew-x-[-10deg] translate-x-12 z-0" />
      <div className="z-10 px-10 pt-6 pb-4 relative w-full h-full flex flex-col justify-start">
        <div className="border-l-4 border-primary pl-6 mb-3">
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 mb-2">2026</p>
          <p className="text-xs font-bold tracking-[0.45em] text-primary mb-3">C . O . R . E</p>
          <div className="space-y-0.5">
            {coreWords.map((word) => (
              <h2 key={word} className="font-headline font-bold text-slate-900 leading-[0.92] tracking-[0.005em]">
                <span className="text-4xl lg:text-5xl">{word.charAt(0)}</span>
                <span className="text-3xl lg:text-4xl">{word.slice(1)}</span>
              </h2>
            ))}
          </div>
          <p className="mt-3 max-w-[28rem] text-[13px] leading-[1.45] text-slate-600 italic font-sans">
            "Tại đây, chúng ta không chỉ học code, chúng ta xây dựng CORE năng lực thích ứng với thời đại AI đang tới: Cam kết – Làm chủ – Thực chiến – Hiệu suất".
          </p>
        </div>
        <div className="w-full h-[190px] md:h-[220px] lg:h-[230px] bg-slate-200 relative overflow-hidden mt-2 shadow-xl shrink-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeSlide}
              src={COVER_SLIDES[activeSlide]}
              alt={`cover-slide-${activeSlide + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -60, opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
            <p className="text-white text-xs font-mono">THÀNH LẬP 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Spread2Left = () => (
  <LeftPageShell topText="TRANG 01" mainTitle="BÁO CÁO NĂM" bottomText="DEEPCODE" bgImage="https://picsum.photos/id/48/1000/1000">
    <div className="flex justify-between items-start border-t border-white/20 pt-6">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 border border-white/20 flex items-center justify-center rounded-sm rotate-45"><Icon name="code" className="text-white/80 -rotate-45 text-sm" /></div>
        <span className="text-xs font-bold tracking-[0.2em] text-white/60 uppercase">CHƯƠNG TRÌNH 2026</span>
      </div>
      <div className="text-right"><span className="block text-[10px] text-white/40 uppercase tracking-widest mb-1">Loại tài liệu</span><span className="block text-xs font-bold text-white/80">PDF-X14</span></div>
    </div>
    <div className="space-y-8 pl-4 border-l-2 border-primary/50">
      <h1 className="text-5xl lg:text-7xl font-display font-bold leading-[0.9] text-white">BÁO CÁO<br /><span className="text-primary italic font-serif text-4xl lg:text-5xl block mt-2 font-normal">Tổng quan</span></h1>
      <p className="text-slate-300 max-w-sm text-sm leading-relaxed font-light border-l border-white/10 pl-4 py-2">Khám phá chiều sâu kiến trúc phần mềm, thuật toán và thiết kế hệ thống cho kỹ sư thế hệ mới.</p>
    </div>
    <div className="flex justify-between items-end">
      <div><p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Đơn vị biên soạn</p><p className="font-bold text-lg text-white">DeepCode Academy</p></div>
      <p className="text-6xl font-headline font-bold text-white/10 select-none">2026</p>
    </div>
  </LeftPageShell>
);

export const Spread2Right = () => (
  <RightPageShell pageNumber="02">
    <div className="w-full h-px bg-slate-200 mb-6 flex items-center justify-between"><span className="bg-primary h-1 w-12 block" /><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trang 02</span></div>
    <div className="mb-7">
      <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Thông điệp từ</h4>
      <h2 className="text-3xl lg:text-4xl font-headline font-bold text-slate-900 uppercase mb-6">GIÁM ĐỐC ĐIỀU HÀNH</h2>
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        <div className="w-32 h-32 lg:w-36 lg:h-36 bg-slate-200 shrink-0 relative overflow-hidden shadow-inner">
          <img alt="CEO Portrait" className="w-full h-full object-cover" src={ceoPortrait} />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-primary" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-headline font-bold text-xl uppercase text-slate-800">Mr.Van Dong</h3>
          <p className="text-xs font-mono text-slate-500 mb-2">Nhà sáng lập & CEO</p>
          <p className="text-sm text-slate-600 leading-relaxed font-sans italic border-l-2 border-primary/30 pl-4">"Chúng tôi không chỉ dạy code; chúng tôi đang nuôi dưỡng những kiến trúc sư của tương lai số."</p>
        </div>
      </div>
    </div>
    <div className="flex-1 border-t border-slate-200 pt-6 mt-3 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1"><h3 className="font-headline font-bold text-2xl uppercase text-slate-900 leading-[1.14]">Tầm nhìn,<br /><span className="text-primary">Sứ mệnh</span> và<br />Giá trị</h3><div className="mt-4 w-12 h-1 bg-slate-900" /></div>
      <div className="lg:col-span-2 space-y-5">
        <p className="text-xs lg:text-sm text-slate-600 leading-relaxed text-justify">DeepCode là hệ sinh thái đào tạo tập trung vào chiều sâu học thuật và khả năng ứng dụng thực tiễn.</p>
        <ul className="space-y-1.5 mt-3">{['Ứng dụng thực tiễn', 'Chiều sâu học thuật', 'Tăng tốc sự nghiệp'].map((item) => <li key={item} className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-slate-700"><span className="w-1.5 h-1.5 bg-primary rounded-full" />{item}</li>)}</ul>
      </div>
    </div>
  </RightPageShell>
);
export const Spread3Left = () => (
  <LeftPageShell topText="TRANG 01" mainTitle="TƯ DUY" bottomText="DOANH NGHIỆP">
    <div className="flex justify-between items-start border-t border-white/20 pt-6">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 border border-white/20 flex items-center justify-center rounded-sm"><Icon name="psychology" className="text-white/80 text-xl" /></div>
        <span className="text-xs font-bold tracking-[0.2em] text-white/60 uppercase">NỀN TẢNG</span>
      </div>
      <div className="text-right"><span className="block text-[10px] text-white/40 uppercase tracking-widest mb-1">Thời lượng</span><span className="block text-xs font-bold text-white/80">2 tuần</span></div>
    </div>
    <div className="space-y-6 pl-4 border-l-2 border-primary/50 mt-8">
      <h1 className="text-4xl lg:text-6xl font-display font-bold leading-[0.9] text-white">DỰ ÁN<br /><span className="text-primary italic font-serif text-3xl lg:text-5xl block mt-2 font-normal">Tư duy</span></h1>
      <h2 className="text-xl font-headline uppercase tracking-wide text-white/70">Tư duy dự án & Quy trình</h2>
      <p className="text-slate-400 max-w-sm text-sm leading-relaxed font-light mt-4">Hiểu cốt lõi phát triển phần mềm vượt ra ngoài code và cách dự án được tổ chức trong doanh nghiệp.</p>
    </div>
    <div className="mt-8 space-y-4">
      {[
        { id: '01', title: 'SDLC tổng quan', sub: 'Vòng đời phát triển phần mềm' },
        { id: '02', title: 'Agile & Scrum', sub: 'Phương pháp lặp' },
        { id: '03', title: 'Tư duy sản phẩm', sub: 'Lấy người dùng làm trung tâm' }
      ].map((item) => (
        <div key={item.id} className="flex items-center gap-4 group">
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors"><span className="text-xs font-mono text-primary font-bold">{item.id}</span></div>
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">{item.title}</h4>
            <p className="text-[10px] text-slate-500 uppercase">{item.sub}</p>
          </div>
        </div>
      ))}
    </div>
  </LeftPageShell>
);

export const Spread3Right = () => (
  <RightPageShell pageNumber="03">
    <div className="w-full h-px bg-slate-200 mb-8 flex items-center justify-between"><span className="bg-slate-800 h-1 w-12 block" /><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">TRANG 02</span></div>
    <div className="flex justify-between items-start mb-6">
      <div>
        <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Quản lý & Hợp tác</h4>
        <h2 className="text-4xl lg:text-5xl font-headline font-bold text-slate-900 uppercase leading-none">LÀM VIỆC<br />NHÓM</h2>
      </div>
      <div className="w-16 h-16 border-2 border-slate-200 rounded-full flex items-center justify-center opacity-50"><Icon name="groups" className="text-3xl text-slate-400" /></div>
    </div>
    <div className="mb-8">
      <h3 className="font-serif italic text-xl text-slate-600 border-l-4 border-primary pl-4 py-1">Quản lý dự án & Làm việc nhóm</h3>
      <p className="text-sm text-slate-500 mt-4 leading-relaxed">Làm chủ Jira và GitHub workflow để hợp tác trơn tru trong đội dự án.</p>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
      <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm relative overflow-hidden">
        <motion.div
          className="absolute top-3 right-3 w-16 h-16 rounded-xl overflow-hidden border border-slate-200/80"
          animate={{ y: [0, -2, 0], scale: [1, 1.015, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img src={coverSlide2} alt="Ảnh góc Jira" className="w-full h-full object-cover" />
        </motion.div>
        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4 border border-blue-100"><JiraLogoIcon className="w-5 h-5" /></div>
        <h4 className="font-headline font-bold text-xl text-slate-800 mb-1">JIRA</h4>
        <p className="text-xs text-slate-500 uppercase tracking-wide mb-3">Quản lý dự án</p>
        <ul className="text-xs text-slate-600 space-y-2">{['Backlog & Sprint', 'Vòng đời ticket', 'Báo cáo'].map((i) => <li key={i} className="flex items-center gap-2"><span className="w-1 h-1 bg-blue-400 rounded-full" />{i}</li>)}</ul>
      </div>
      <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm relative overflow-hidden">
        <motion.div
          className="absolute top-3 right-3 w-16 h-16 rounded-xl overflow-hidden border border-slate-200/80"
          animate={{ y: [0, -2, 0], scale: [1, 1.015, 1] }}
          transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img src={cardCornerImage2} alt="Ảnh góc GitHub" className="w-full h-full object-cover" />
        </motion.div>
        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-4 border border-slate-200 text-slate-900"><GitHubLogoIcon className="w-5 h-5" /></div>
        <h4 className="font-headline font-bold text-xl text-slate-800 mb-1">GITHUB</h4>
        <p className="text-xs text-slate-500 uppercase tracking-wide mb-3">Quản lý phiên bản</p>
        <ul className="text-xs text-slate-600 space-y-2">{['Chiến lược nhánh', 'Xung đột merge', 'Pull request'].map((i) => <li key={i} className="flex items-center gap-2"><span className="w-1 h-1 bg-orange-400 rounded-full" />{i}</li>)}</ul>
      </div>
    </div>
  </RightPageShell>
);

export const Spread4Left = () => (
  <LeftPageShell topText="TRANG 03" mainTitle="KIẾN TRÚC HỆ THỐNG" bottomText="BACKEND">
    <div className="flex items-center gap-3 mb-6"><span className="px-2 py-1 rounded bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/30">Kỹ thuật backend</span><span className="h-px flex-1 bg-white/10" /></div>
    <h1 className="text-4xl lg:text-5xl font-display font-bold leading-tight text-white mb-2">Kiến trúc &<br /><span className="text-primary italic font-display font-normal tracking-normal block mt-1.5 lg:mt-2">Thiết kế hệ thống</span></h1>
    <h3 className="text-lg font-light text-slate-400 mb-8 font-sans">Monolithic, Modular, Microservices</h3>
    <div className="relative w-full aspect-video bg-slate-800 rounded-lg border border-white/10 p-3 mb-8 shadow-inner overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <svg
        viewBox="0 0 620 280"
        className="relative z-10 w-full h-full"
        role="img"
        aria-label="Sơ đồ kiến trúc hệ thống: Client đến API Gateway và các dịch vụ"
      >
        <g stroke="#94a3b8" strokeOpacity="0.6" strokeWidth="2" fill="none">
          <line x1="205" y1="64" x2="205" y2="82" />
          <line x1="415" y1="64" x2="415" y2="82" />
          <line x1="205" y1="82" x2="415" y2="82" />
          <line x1="310" y1="82" x2="310" y2="95" />

          <line x1="310" y1="151" x2="310" y2="176" />
          <line x1="125" y1="176" x2="495" y2="176" />
          <line x1="125" y1="176" x2="125" y2="196" />
          <line x1="310" y1="176" x2="310" y2="196" />
          <line x1="495" y1="176" x2="495" y2="196" />
        </g>

        <g fill="#e2e8f0" fillOpacity="0.9">
          <circle cx="310" cy="82" r="3.5" />
          <circle cx="310" cy="176" r="3.5" />
        </g>

        <g>
          <rect x="139" y="18" width="132" height="46" rx="8" fill="#0f172a" fillOpacity="0.45" stroke="#94a3b8" strokeOpacity="0.5" />
          <rect x="349" y="18" width="132" height="46" rx="8" fill="#0f172a" fillOpacity="0.45" stroke="#94a3b8" strokeOpacity="0.5" />

          <rect x="200" y="95" width="220" height="56" rx="8" fill="#7c2d12" fillOpacity="0.18" stroke="#f97316" strokeWidth="2.5" />

          <rect x="47" y="196" width="156" height="52" rx="8" fill="#0f172a" fillOpacity="0.45" stroke="#94a3b8" strokeOpacity="0.55" />
          <rect x="232" y="196" width="156" height="52" rx="8" fill="#0f172a" fillOpacity="0.45" stroke="#94a3b8" strokeOpacity="0.55" />
          <rect x="417" y="196" width="156" height="52" rx="8" fill="#0f172a" fillOpacity="0.45" stroke="#94a3b8" strokeOpacity="0.55" />
        </g>

        <g fill="#cbd5e1" fontSize="14" fontWeight="800" textAnchor="middle" fontFamily="Inter, Segoe UI, Arial, sans-serif">
          <text x="205" y="46">WEB CLIENT</text>
          <text x="415" y="46">MOBILE CLIENT</text>

          <text x="310" y="128" fill="#fdba74" fontSize="22" fontWeight="800">API Gateway</text>

          <text x="125" y="227">AUTH SERVICE</text>
          <text x="310" y="227">COURSE SERVICE</text>
          <text x="495" y="227">AI SERVICE</text>
        </g>
      </svg>
    </div>
    <div className="grid grid-cols-2 gap-6">
      <div><h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary" />Đơn khối</h4><p className="text-xs text-slate-400 leading-relaxed pl-4 border-l border-white/10">Hiểu hệ thống kế thừa và chiến lược ghép nối chặt.</p></div>
      <div><h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary" />Vi dịch vụ</h4><p className="text-xs text-slate-400 leading-relaxed pl-4 border-l border-white/10">Phân rã ứng dụng thành các dịch vụ liên kết lỏng.</p></div>
    </div>
  </LeftPageShell>
);

export const Spread4Right = () => (
  <RightPageShell pageNumber="04">
    <div className="w-full h-px bg-slate-200 mb-4 flex items-center justify-between"><span className="bg-primary h-1 w-12 block" /><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">TRANG 04</span></div>
    <div className="flex items-start justify-between mb-5">
      <div><h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Phát triển Frontend</h4><h2 className="text-3xl lg:text-4xl font-headline font-bold text-slate-900 uppercase">REACT + TS</h2></div>
      <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center"><Icon name="data_object" className="text-blue-500" /></div>
    </div>
    <div className="w-full bg-[#1e1e1e] rounded-lg shadow-xl overflow-hidden mb-5 border border-slate-800/10 font-mono text-[11px] leading-relaxed relative p-3 text-slate-300">
      <div className="flex mb-3 gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" /><div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" /><div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" /></div>
      <div className="space-y-1">
        <p><span className="text-blue-400">interface</span> Props {'{'}</p>
        <p className="pl-4">isDangHoatDong: <span className="text-blue-400">boolean</span>;</p>
        <p>{'}'}</p>
        <p className="pl-4"><span className="text-green-600">// Làm chủ Hooks & State</span></p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-5">
      <div><h3 className="font-bold text-slate-800 text-xs mb-2 uppercase tracking-wide border-b-2 border-primary/20 pb-1 w-fit">Nội dung cốt lõi</h3><ul className="space-y-1.5">{['React Hooks', 'Context API', 'Vòng đời component'].map((i) => <li key={i} className="flex items-start gap-2 text-[11px] text-slate-600"><Icon name="check_circle" className="text-primary text-[13px]" /> {i}</li>)}</ul></div>
      <div><h3 className="font-bold text-slate-800 text-xs mb-2 uppercase tracking-wide border-b-2 border-primary/20 pb-1 w-fit">TypeScript nâng cao</h3><ul className="space-y-1.5">{['Generic Types', 'Utility Types', 'Type Guards'].map((i) => <li key={i} className="flex items-start gap-2 text-[11px] text-slate-600"><Icon name="check_circle" className="text-primary text-[13px]" /> {i}</li>)}</ul></div>
    </div>
  </RightPageShell>
);
export const Spread5ModuleLeft = () => (
  <LeftPageShell topText="TRANG 05" mainTitle="BACKEND" bottomText="TẦNG API">
    <div className="flex justify-between items-start border-t border-white/20 pt-6">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 border border-white/20 flex items-center justify-center rounded-sm bg-slate-800/70"><Icon name="dns" className="text-primary text-xl" /></div>
        <span className="text-xs font-bold tracking-[0.2em] text-white/60 uppercase">TRANG 05</span>
      </div>
      <div className="text-right"><span className="block text-[10px] text-white/40 uppercase tracking-widest mb-1">Lộ trình</span><span className="block text-xs font-bold text-white/80">NodeJS / Spring Boot</span></div>
    </div>
    <div className="space-y-6 pl-4 border-l-2 border-primary/50 mt-8">
      <h1 className="text-4xl lg:text-6xl font-display font-bold leading-[0.95] text-white">Backend<br /><span className="text-primary italic font-serif text-3xl lg:text-5xl block mt-2 font-normal">Phát triển</span></h1>
      <p className="text-slate-300 max-w-sm text-sm leading-relaxed font-light border-l border-white/10 pl-4 py-2">Xây dựng API sẵn sàng production với xác thực chặt chẽ, validation rõ ràng và dữ liệu an toàn.</p>
    </div>
    <div className="grid grid-cols-2 gap-4 mt-8">
      <div className="bg-white/5 border border-white/10 p-4 rounded-lg backdrop-blur-sm"><h3 className="text-primary font-bold text-sm uppercase tracking-wider mb-2">Cốt lõi API</h3><ul className="space-y-2 text-xs text-slate-300">{['Thiết kế REST API', 'Luồng xác thực JWT', 'Xử lý ngoại lệ'].map((item) => <li key={item} className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary" />{item}</li>)}</ul></div>
      <div className="bg-white/5 border border-white/10 p-4 rounded-lg backdrop-blur-sm"><h3 className="text-primary font-bold text-sm uppercase tracking-wider mb-2">Tầng dữ liệu</h3><ul className="space-y-2 text-xs text-slate-300">{['Schema MongoDB', 'Đánh chỉ mục', 'Bảo mật cơ bản'].map((item) => <li key={item} className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary" />{item}</li>)}</ul></div>
    </div>
  </LeftPageShell>
);

export const Spread5ModuleRight = () => (
  <RightPageShell pageNumber="06">
    <div className="w-full h-px bg-slate-200 mb-5 flex items-center justify-between"><span className="bg-primary h-1 w-12 block" /><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">TRANG 06</span></div>
    <div className="mb-5">
      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Tích hợp Full-stack</h4>
      <h2 className="text-3xl lg:text-4xl font-headline font-bold text-slate-900 uppercase mb-3">Full-stack<br /><span className="text-primary block mt-1 lg:mt-1.5">Tích hợp</span></h2>
      <p className="text-xs lg:text-sm text-slate-600 leading-relaxed font-sans italic border-l-2 border-primary/30 pl-3">Kết nối frontend và backend bằng contract ổn định, token an toàn và xử lý lỗi bền vững.</p>
    </div>
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">{[{ label: 'CORS', icon: 'shield' }, { label: 'Token', icon: 'key' }, { label: 'Vai trò', icon: 'admin_panel_settings' }, { label: 'Lỗi', icon: 'error' }].map((item) => <div key={item.label} className="bg-white rounded border border-slate-200 py-3 px-2"><Icon name={item.icon} className="text-primary text-xl mb-1" /><p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">{item.label}</p></div>)}</div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div><h3 className="font-bold text-slate-800 text-xs mb-2 uppercase tracking-wide border-b-2 border-primary/20 pb-1 w-fit">Chủ đề tích hợp</h3><ul className="space-y-1.5">{['CORS và token', 'Vai trò và phân quyền', 'Phân trang, tìm kiếm, lọc'].map((i) => <li key={i} className="flex items-start gap-2 text-[11px] text-slate-600"><Icon name="check_circle" className="text-primary text-[13px]" /> {i}</li>)}</ul></div>
      <div><h3 className="font-bold text-slate-800 text-xs mb-2 uppercase tracking-wide border-b-2 border-primary/20 pb-1 w-fit">Gia cố frontend</h3><ul className="space-y-1.5">{['Timeout + thử lại', 'Màn lỗi thống nhất', 'Fallback xác thực'].map((i) => <li key={i} className="flex items-start gap-2 text-[11px] text-slate-600"><Icon name="check_circle" className="text-primary text-[13px]" /> {i}</li>)}</ul></div>
    </div>
  </RightPageShell>
);

export const Spread5Left = () => (
  <LeftPageShell topText="TRANG 07" mainTitle="MÔ-ĐUN AI" bottomText="TRÍ TUỆ" bgImage="https://picsum.photos/id/532/1000/1000">
    <div className="flex justify-between items-start border-t border-white/20 pt-6">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 border border-white/20 flex items-center justify-center rounded-sm bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-md"><Icon name="smart_toy" className="text-white/90 text-xl" /></div>
        <span className="text-xs font-bold tracking-[0.2em] text-white/60 uppercase">TRANG 07</span>
      </div>
      <div className="text-right"><span className="block text-[10px] text-white/40 uppercase tracking-widest mb-1">Trọng tâm</span><span className="block text-xs font-bold text-white/80">LLMs & Chatbots</span></div>
    </div>
    <div className="space-y-6 pl-4 border-l-2 border-primary/50 relative mt-8">
      <div className="grid grid-cols-4 gap-3 max-w-sm">
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-10 h-10 rounded-lg bg-slate-900/70 border border-blue-300/30 flex items-center justify-center shadow-sm">
            <GeminiBrandIcon className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold text-slate-300 tracking-wide">Gemini</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-10 h-10 rounded-lg bg-slate-900/70 border border-white/20 flex items-center justify-center shadow-sm">
            <OpenAIBrandIcon className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold text-slate-300 tracking-wide">OpenAI</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-10 h-10 rounded-lg bg-slate-900/70 border border-orange-300/30 flex items-center justify-center shadow-sm">
            <ClaudeBrandIcon className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold text-slate-300 tracking-wide">Claude</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-10 h-10 rounded-lg bg-slate-900/70 border border-slate-300/25 flex items-center justify-center shadow-sm text-slate-200">
            <Icon name="add" className="text-lg" />
          </div>
          <span className="text-[10px] font-semibold text-slate-300 tracking-wide">Khác</span>
        </div>
      </div>
      <h1 className="text-5xl lg:text-6xl font-display font-bold leading-[0.9] text-white tracking-tight">TRỢ LÝ CHAT<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-primary font-serif italic text-4xl lg:text-5xl block mt-2 font-normal">Agent AI Tích hợp</span></h1>
      <p className="text-slate-300 max-w-sm text-sm leading-relaxed font-light border-l border-white/10 pl-4 py-2">Làm chủ kiến trúc chatbot, từ prompt cơ bản đến tích hợp trong dự án thực tế.</p>
      <div className="flex gap-2 mt-4">{['RAG', 'Embeddings', 'LangChain'].map((tag) => <span key={tag} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] uppercase tracking-wider text-slate-400">{tag}</span>)}</div>
    </div>
  </LeftPageShell>
);

export const Spread5Right = () => (
  <RightPageShell pageNumber="08">
    <div className="w-full h-px bg-slate-200 mb-5 flex items-center justify-between"><span className="bg-primary h-1 w-12 block shadow-sm" /><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trang 08</span></div>
    <div className="mb-5">
      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2"><Icon name="rocket_launch" className="text-primary text-base" /> TRANG 08</h4>
      <h2 className="text-3xl lg:text-4xl font-headline font-bold text-slate-900 uppercase mb-3">DevOps & CI/CD</h2>
      <p className="text-xs lg:text-sm text-slate-600 leading-relaxed font-sans italic border-l-2 border-primary/30 pl-3 mb-4">"Thu hẹp khoảng cách giữa phát triển và vận hành bằng pipeline tự động hóa."</p>
    </div>
    <div className="flex-1 bg-slate-50 rounded-lg border border-slate-200 p-4 relative overflow-hidden mb-3 shadow-inner flex flex-col justify-center">
      <div className="flex items-center justify-between w-full relative z-10">
        <div className="flex flex-col items-center gap-2"><div className="w-12 h-12 bg-white rounded border border-primary text-primary flex items-center justify-center shadow-sm"><Icon name="code" /></div><span className="text-[10px] font-bold text-slate-600">ĐẨY</span></div>
        <div className="h-0.5 flex-1 bg-slate-300 mx-2" />
        <div className="flex flex-col items-center gap-2"><div className="w-12 h-12 bg-white rounded border border-primary/50 text-primary flex items-center justify-center shadow-sm"><Icon name="build" /></div><span className="text-[10px] font-bold text-slate-600">XÂY DỰNG</span></div>
        <div className="h-0.5 flex-1 bg-slate-300 mx-2" />
        <div className="flex flex-col items-center gap-2"><div className="w-12 h-12 bg-white rounded border border-primary/50 text-primary flex items-center justify-center shadow-sm"><Icon name="deployed_code" /></div><span className="text-[10px] font-bold text-slate-600">TRIỂN KHAI</span></div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-white p-3 rounded border border-slate-100 shadow-sm"><h4 className="text-xs font-bold text-slate-800 uppercase mb-1">Công cụ học</h4><p className="text-[10px] text-slate-500 leading-tight">Docker, Kubernetes, Jenkins, GitHub Actions</p></div>
        <div className="bg-white p-3 rounded border border-slate-100 shadow-sm"><h4 className="text-xs font-bold text-slate-800 uppercase mb-1">Kết quả đạt được</h4><p className="text-[10px] text-slate-500 leading-tight">Triển khai microservice có khả năng mở rộng trên AWS.</p></div>
      </div>
    </div>
  </RightPageShell>
);
export const Spread6Left = () => (
  <LeftPageShell topText="TRANG 09" mainTitle="BẢO MẬT" bottomText="DEEPCODE">
    <div className="flex justify-between items-start border-t border-white/20 pt-6">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 border border-white/20 flex items-center justify-center rounded-sm bg-slate-800"><Icon name="shield" className="text-primary text-xl" /></div>
        <span className="text-xs font-bold tracking-[0.2em] text-white/60 uppercase">Gia cố</span>
      </div>
      <div className="text-right"><span className="block text-[10px] text-white/40 uppercase tracking-widest mb-1">Trạng thái</span><span className="block text-xs font-bold text-green-400 flex items-center justify-end gap-1"><span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Đang hoạt động</span></div>
    </div>
    <div className="space-y-6 pl-4 border-l-2 border-primary/50 mt-8">
      <h1 className="text-4xl lg:text-5xl font-display font-bold leading-[1.1] text-white">Giám sát,<br /><span className="text-primary italic font-serif font-normal">Logging</span> &<br />Bảo mật</h1>
      <p className="text-slate-400 max-w-md text-sm leading-relaxed font-light">Từ rate limit đến chống DDoS. Học cách bảo vệ endpoint với ELK stack và giám sát thời gian thực.</p>
    </div>
    <div className="grid grid-cols-2 gap-4 mt-8">
      <div className="bg-white/5 border border-white/10 p-4 rounded-lg backdrop-blur-sm"><div className="flex justify-between items-start mb-2"><Icon name="cloud" className="text-orange-400 text-3xl" /><span className="text-[10px] text-white/30 font-mono">CDN</span></div><h3 className="text-white font-bold text-lg mb-1">Cloudflare</h3></div>
      <div className="bg-white/5 border border-white/10 p-4 rounded-lg backdrop-blur-sm"><div className="flex justify-between items-start mb-2"><Icon name="lock" className="text-blue-400 text-3xl" /><span className="text-[10px] text-white/30 font-mono">AUTH</span></div><h3 className="text-white font-bold text-lg mb-1">Header bảo mật</h3></div>
    </div>
  </LeftPageShell>
);

export const Spread6Right = () => (
  <RightPageShell pageNumber="10">
    <div className="w-full h-px bg-slate-200 mb-8 flex items-center justify-between"><span className="bg-primary h-1 w-12 block" /><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">TRANG 10</span></div>
    <div className="mb-8">
      <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Bàn giao & Go-live</h4>
      <h2 className="text-4xl lg:text-5xl font-headline font-bold text-slate-900 uppercase mb-4 leading-[1.08] lg:leading-[1.1]">Triển khai, SEO<br /><span className="text-primary block mt-1.5 lg:mt-2">&amp; Bàn giao</span></h2>
      <p className="text-sm text-slate-600 leading-relaxed font-sans italic border-l-2 border-primary/30 pl-4">Đưa hệ thống lên production cùng bộ tài liệu bàn giao rõ ràng để đội khách hàng vận hành và mở rộng tự tin.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm"><h3 className="font-bold text-slate-800 text-sm mb-2 uppercase tracking-wide">Hạ tầng</h3><ul className="space-y-2 text-xs text-slate-600">{['Thiết lập VPS', 'Nginx reverse proxy', 'HTTPS + gia hạn SSL'].map((item) => <li key={item} className="flex items-start gap-2"><Icon name="check_circle" className="text-primary text-[14px]" /> {item}</li>)}</ul></div>
      <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm"><h3 className="font-bold text-slate-800 text-sm mb-2 uppercase tracking-wide">Bàn giao khách</h3><ul className="space-y-2 text-xs text-slate-600">{['Luồng demo sản phẩm', 'Source + hướng dẫn triển khai', 'Checklist bàn giao'].map((item) => <li key={item} className="flex items-start gap-2"><Icon name="check_circle" className="text-primary text-[14px]" /> {item}</li>)}</ul></div>
    </div>
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-5"><h3 className="font-bold text-slate-800 text-sm mb-3 uppercase tracking-wide">Chuẩn SEO cơ bản</h3><div className="grid grid-cols-1 md:grid-cols-3 gap-3">{['Tiêu đề / mô tả meta', 'Cấu trúc heading ngữ nghĩa', 'Thẻ chia sẻ Open Graph'].map((item) => <div key={item} className="bg-white border border-slate-200 rounded p-3 text-xs text-slate-600">{item}</div>)}</div></div>
  </RightPageShell>
);

export const Spread7Left = () => (
  <LeftPageShell
    topText="TRANG 11"
    mainTitle="THÀNH CÔNG"
    bottomText="DEEPCODE"
    bgImage={coverSlide1}
    bgImageClassName="opacity-40 mix-blend-luminosity"
    bgOverlayClassName="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/85 to-slate-900/35"
  >
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center">
          <Icon name="groups" className="text-primary text-lg" />
        </div>
        <span className="text-xs font-bold tracking-[0.18em] text-white/60 uppercase">Community</span>
      </div>

      <div className="space-y-3 pl-4 border-l-2 border-primary/50">
        <h1 className="text-3xl lg:text-4xl font-display font-bold leading-[1.03] text-white">
          Gia Nhập<br />
          <span className="text-primary italic font-display font-normal block mt-1 lg:mt-1.5">Cộng Đồng Elite</span>
        </h1>
        <p className="text-slate-300 max-w-sm text-xs lg:text-sm leading-relaxed font-light">
          Không chỉ học code, bạn sẽ dẫn dắt đội ngũ, thiết kế hệ thống và xây dựng sản phẩm thật trong môi trường doanh nghiệp.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2.5 mt-3">
        {[
          { icon: 'search', label: 'Google' },
          { icon: 'cloud_queue', label: 'AWS' },
          { icon: 'window', label: 'Microsoft' },
          { icon: 'movie', label: 'Netflix' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-md px-2.5 py-1.5">
            <Icon name={item.icon} className="text-base text-white/70" />
            <span className="font-headline text-sm lg:text-base text-white/80">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 p-3 rounded-lg backdrop-blur-sm mt-3 flex-1 min-h-0 flex flex-col overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex gap-1 text-primary text-[12px] leading-none">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index}>★</span>
            ))}
          </div>
          <span className="text-xs font-bold text-primary">5+</span>
        </div>

        <div className="space-y-1.5 flex-1 min-h-0 overflow-y-auto no-scrollbar pr-0.5">
          {[
            { name: 'Nguyễn Minh Anh', role: 'Frontend Intern', quote: 'Lộ trình rõ ràng, áp dụng tốt vào dự án thật.' },
            { name: 'Trần Quốc Bảo', role: 'Backend Developer', quote: 'Phần bảo mật và DevOps giúp mình tự tin đi làm.' },
            { name: 'Lê Hoàng Nam', role: 'Content Creator', quote: 'Học xong biết dùng AI để tăng tốc công việc.' },
          ].map((item) => (
            <div key={item.name} className="bg-white/[0.03] border border-white/10 rounded-md px-2 py-1.5">
              <p className="text-[10px] text-slate-300 italic leading-snug">"{item.quote}"</p>
              <p className="text-[10px] font-bold text-white mt-0.5">{item.name}</p>
              <p className="text-[9px] text-slate-500">{item.role}</p>
            </div>
          ))}
        </div>

        <div className="mt-2 pt-1.5 border-t border-white/10 flex items-center justify-center gap-3 shrink-0">
          <div className="flex gap-1">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="w-[18px] h-[18px] rounded-full bg-slate-600/60 border border-white/20 flex items-center justify-center">
                <Icon name="person" className="text-[9px] text-slate-200/90" />
              </div>
            ))}
          </div>
          <span className="text-[9px] text-slate-400 whitespace-nowrap leading-none">Cộng đồng người dùng</span>
        </div>
      </div>
    </div>
  </LeftPageShell>
);

export const Spread7Right = () => (
  <RightPageShell pageNumber="12" footerText="Trang Cuối">
    <div className="w-full h-px bg-slate-200 mb-5 flex items-center justify-between">
      <span className="bg-primary h-1 w-12 block" />
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">TRANG 12</span>
    </div>

    <div className="text-center mb-4">
      <h2 className="text-3xl lg:text-4xl font-headline font-bold text-slate-900 uppercase mb-1">Đăng Ký Ngay</h2>
      <p className="text-slate-500 text-xs lg:text-sm">Hoàn tất thông tin để mở khóa toàn bộ chương trình.</p>
    </div>

    <div className="bg-white p-4 rounded-sm shadow-sm border border-slate-200 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-14 h-14 bg-primary/10 rounded-bl-full" />
      <div className="relative z-10 space-y-3">
        <div>
          <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Họ và tên</label>
          <input className="w-full border border-slate-300 rounded-sm focus:border-primary focus:ring-primary text-xs py-2 bg-slate-50 px-2" placeholder="Ví dụ: Alex Dev" />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Email</label>
          <input className="w-full border border-slate-300 rounded-sm focus:border-primary focus:ring-primary text-xs py-2 bg-slate-50 px-2" placeholder="alex@example.com" />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Số điện thoại</label>
          <input className="w-full border border-slate-300 rounded-sm focus:border-primary focus:ring-primary text-xs py-2 bg-slate-50 px-2" placeholder="+84 000 000 000" />
        </div>
        <button className="w-full bg-primary hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-sm shadow-lg shadow-orange-500/20 transition-transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group text-[11px] tracking-wide leading-tight">
          <span className="text-center">
            Đăng ký nhận voucher sale khủng
            <br />
            + Tài khoản AI Utral free
          </span>
          <Icon name="arrow_forward" className="text-base group-hover:translate-x-1 transition-transform shrink-0" />
        </button>
      </div>
    </div>

    <div className="mt-4 text-center space-y-2">
      <div className="text-primary font-bold text-xl leading-snug">
        Một 1 ngày đi làm đổi được 1 khoá học! Đăng ký ngay
      </div>
      <p className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 inline-block px-3 py-1 rounded-full">
        Ưu đãi giới hạn
      </p>
      <div className="mt-1 bg-slate-50 border border-slate-200 rounded-lg p-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { icon: 'edit_square', label: 'Content Creator' },
            { icon: 'play_circle', label: 'YouTuber' },
            { icon: 'local_shipping', label: 'Logistics' },
            { icon: 'campaign', label: 'Marketing' },
            { icon: 'palette', label: 'Designer' },
            { icon: 'storefront', label: 'Kinh doanh' },
            { icon: 'engineering', label: 'Kỹ sư' },
            { icon: 'school', label: 'Giáo dục' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5 bg-white border border-slate-200 rounded px-2 py-1">
              <Icon name={item.icon} className="text-primary text-sm" />
              <span className="text-[10px] font-semibold text-slate-600 leading-none">{item.label}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-xs font-bold text-primary">+ 99 ngành đang cần bạn</p>
      </div>
    </div>
  </RightPageShell>
);
