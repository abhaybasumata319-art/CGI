'use client';

import { useRef, useState } from 'react';
import { DocumentAnalysisResult } from '@/types/document';
import { DocumentResult } from './DocumentResult';

const acceptedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
const acceptedExtensions = '.pdf,.jpg,.jpeg,.png';
const maxBytes = 10 * 1024 * 1024;

type UploadState = 'empty' | 'uploaded' | 'analyzing' | 'success' | 'error';

function formatSize(bytes: number) { return `${(bytes / 1024 / 1024).toFixed(2)} MB`; }

export function DocumentUploader() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();
  const [state, setState] = useState<UploadState>('empty');
  const [error, setError] = useState('');
  const [result, setResult] = useState<DocumentAnalysisResult>();
  const [description, setDescription] = useState('');

  function chooseFile(candidate?: File) {
    if (!candidate) return;
    setError(''); setResult(undefined);
    if (!acceptedTypes.includes(candidate.type)) { setFile(undefined); setState('error'); setError('Please choose a PDF, JPG, JPEG, or PNG file.'); return; }
    if (candidate.size > maxBytes) { setFile(undefined); setState('error'); setError('That file is larger than 10 MB. Please choose a smaller file.'); return; }
    setFile(candidate); setState('uploaded');
  }

  function onDrop(event: React.DragEvent) { event.preventDefault(); chooseFile(event.dataTransfer.files[0]); }

  async function analyze() {
    if (!file && !description.trim()) { setState('error'); setError('Choose a document or describe what you received first.'); return; }
    setState('analyzing'); setError('');
    try {
      const formData = new FormData();
      if (file) formData.append('file', file);
      if (description.trim()) formData.append('description', description.trim());
      const response = await fetch('/api/explain-document', { method: 'POST', body: formData });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'I could not analyze that document right now.');
      setResult(payload as DocumentAnalysisResult); setState('success');
    } catch (requestError) { setState('error'); setError(requestError instanceof Error ? requestError.message : 'I could not analyze that document right now.'); }
  }

  function removeFile() { setFile(undefined); setResult(undefined); setState('empty'); setError(''); if (inputRef.current) inputRef.current.value = ''; }
  return <div className="document-tool"><div className="privacy-note"><span aria-hidden="true">◌</span><p><strong>Your privacy matters.</strong> Government documents can contain sensitive information. Upload only what you need help understanding.</p></div><div className={`upload-zone ${file ? 'has-file' : ''}`} onDragOver={(event) => event.preventDefault()} onDrop={onDrop}><input ref={inputRef} type="file" accept={acceptedExtensions} onChange={(event) => chooseFile(event.target.files?.[0])} aria-label="Choose a PDF or image document" /><span className="upload-symbol" aria-hidden="true">↑</span>{file ? <><strong>{file.name}</strong><small>{formatSize(file.size)} · {file.type === 'application/pdf' ? 'PDF' : 'Image'}</small><button className="remove-file" type="button" onClick={removeFile}>Remove file</button></> : <><strong>Drop your document here</strong><small>PDF, JPG, JPEG or PNG · up to 10 MB</small><button className="button button-dark choose-button" type="button" onClick={() => inputRef.current?.click()}>Take a photo / choose a file</button></>}</div><div className="describe-option"><label htmlFor="document-description">Or describe what you received</label><textarea id="document-description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="For example: a letter from a government department about my application..." /></div>{error && <div className="upload-error" role="alert">{error}</div>}<div className="upload-actions"><button className="button button-dark" type="button" onClick={analyze} disabled={state === 'analyzing'}>{state === 'analyzing' ? 'Understanding document...' : 'Understand document'} <span aria-hidden="true">→</span></button>{state === 'analyzing' && <span className="analysis-status" aria-live="polite">CivicGuide is checking the document carefully...</span>}</div>{result && <DocumentResult result={result} />}</div>;
}
