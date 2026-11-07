import React, { useState, useEffect } from 'react';
import { 
  X, 
  Terminal, 
  Copy, 
  Check, 
  FileCode, 
  ShieldAlert, 
  Cpu, 
  ExternalLink,
  Download,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Stethoscope
} from 'lucide-react';
import { useI18n } from '../i18n';
import type { Incident } from '../types';
import type { SreConfigFile, PrescriptionItem } from '../i18n/types';

interface SrePrescriptionModalProps {
  incident: Incident | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SrePrescriptionModal: React.FC<SrePrescriptionModalProps> = ({
  incident,
  isOpen,
  onClose
}) => {
  const { t } = useI18n();
  const dict = t?.prescription;

  const [activeTab, setActiveTab] = useState<number>(0);
  const [copiedFileIndex, setCopiedFileIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);

  // Pobieramy dane recepty bezpośrednio ze słownika dla danego incydentu
  const activePrescription: PrescriptionItem | undefined = incident?.id && dict?.items
    ? dict.items[incident.id]
    : undefined;

  // Reset aktywnej zakładki przy otwarciu nowego incydentu
  useEffect(() => {
    setActiveTab(0);
    setCopiedFileIndex(null);
    setCopiedAll(false);
  }, [incident?.id, isOpen]);

  // Obsługa klawisza ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Blokada scrolla body przy otwartym modalu
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !incident || !dict) return null;

  const files: SreConfigFile[] = activePrescription?.files || [];
  const currentFile: SreConfigFile | undefined = files[activeTab];

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedFileIndex(index);
    setTimeout(() => setCopiedFileIndex(null), 2000);
  };

  const handleCopyAll = () => {
    if (!files.length) return;
    const bundle = files
      .map((f) => `### FILE: ${f.filename} (${f.language}) ###\n${f.description}\n\n${f.content}`)
      .join('\n\n' + '='.repeat(60) + '\n\n');

    navigator.clipboard.writeText(bundle);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleDownloadAll = () => {
    if (!files.length) return;
    files.forEach((f) => {
      const blob = new Blob([f.content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = f.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl my-auto bg-stone-950 border border-amber-600/40 rounded-xl shadow-2xl shadow-amber-950/40 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* NAGŁÓWEK MODALA */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-500">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {dict.badge}
                </span>
                <span className="text-xs font-mono text-stone-300">
                  {incident.code || incident.id}
                </span>
              </div>
              <h2 id="modal-headline" className="text-lg font-bold text-stone-100 flex items-center gap-2 mt-0.5">
                {activePrescription?.title || dict.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label={dict.close}
            className="p-1.5 rounded-lg text-stone-300 hover:text-stone-200 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PODTYTUŁ DIAGNOSTYCZNY */}
        <div className="px-6 py-3 bg-stone-900/30 border-b border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-300">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              <strong className="text-stone-300">{dict.diagnosisLabel}: </strong>
              {activePrescription?.diagnosis || incident.title}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Cpu className="w-4 h-4 text-emerald-500" />
            <span className="text-stone-300">{dict.readyToApply}</span>
          </div>
        </div>

        {/* GŁÓWNA TREŚĆ MODALA */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* PASEK BOCZNY / LISTA PLIKÓW */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-stone-800 bg-stone-950/60 p-3 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto">
            <div className="hidden md:flex items-center justify-between px-2 py-1 text-[11px] font-mono text-stone-300 uppercase tracking-wider">
              <span>{dict.fileListTitle}</span>
              <span className="bg-stone-800 text-stone-300 px-1.5 py-0.2 rounded text-[10px]">
                {files.length}
              </span>
            </div>

            {files.map((file, idx) => (
              <button
                key={file.filename}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono text-left transition-all shrink-0 md:shrink ${
                  activeTab === idx
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900 border border-transparent'
                }`}
              >
                <FileCode className={`w-4 h-4 shrink-0 ${activeTab === idx ? 'text-amber-400' : 'text-stone-300'}`} />
                <div className="flex flex-col min-w-0">
                  <span className="truncate font-medium">{file.filename}</span>
                  <span className="text-[10px] text-stone-300 truncate">{file.language}</span>
                </div>
              </button>
            ))}

            {files.length === 0 && (
              <div className="p-4 text-center text-xs text-stone-300 flex flex-col items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500/60" />
                <span>{dict.noFilesAvailable}</span>
              </div>
            )}
          </div>

          {/* OBSZAR KODU I INSTRUKCJI */}
          <div className="flex-1 flex flex-col min-w-0 bg-stone-950 overflow-hidden">
            {currentFile ? (
              <>
                {/* Pasek narzędziowy pliku */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-stone-900/40 border-b border-stone-800 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <Terminal className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="font-mono text-stone-200 font-semibold truncate">
                      {currentFile.filename}
                    </span>
                    <span className="text-[10px] font-mono text-stone-300 bg-stone-800/80 px-2 py-0.5 rounded">
                      {currentFile.language}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopyCode(currentFile.content, activeTab)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition-colors"
                  >
                    {copiedFileIndex === activeTab ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">{dict.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-400" />
                        <span>{dict.copyCode}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Opis pliku i dlaczego zapobiega awarii */}
                {currentFile.description && (
                  <div className="px-4 py-2 bg-amber-500/5 border-b border-amber-500/10 text-xs text-amber-200/90 flex items-start gap-2">
                    <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{currentFile.description}</span>
                  </div>
                )}

                {/* Okno podglądu kodu */}
                <div className="flex-1 p-4 overflow-auto font-mono text-xs text-stone-300 bg-stone-950/90 leading-relaxed selection:bg-amber-500/30 selection:text-amber-200">
                  <pre className="whitespace-pre">
                    <code>{currentFile.content}</code>
                  </pre>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-xs text-stone-300">
                {dict.selectFile}
              </div>
            )}
          </div>
        </div>

        {/* STOPKA MODALA Z AKCJAMI */}
        <div className="px-6 py-3.5 bg-stone-900/70 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{dict.testedWithEngines}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-stone-400" />
              <span>{dict.downloadAll}</span>
            </button>

            <button
              onClick={handleCopyAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs transition-colors shadow-sm shadow-amber-900/20"
            >
              {copiedAll ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{dict.allCopied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{dict.copyAll}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
