'use client';

import { useState, useRef } from 'react';
import { Upload, X, ScanLine, Image as ImageIcon, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ScreenshotExtractor({ onExtracted }) {
  const [images, setImages] = useState([]); // [{ file, preview }]
  const [extracting, setExtracting] = useState(false);
  const [message, setMessage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFiles = (files) => {
    const fileArray = Array.from(files).slice(0, 2 - images.length);
    if (fileArray.length === 0) return;

    const newImages = [];
    let processed = 0;

    fileArray.forEach((file) => {
      if (!file.type.startsWith('image/')) {
        setMessage({ type: 'error', text: 'Only image files allowed.' });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        newImages.push({ file, preview: e.target.result });
        processed++;
        if (processed === fileArray.length) {
          setImages(prev => [...prev, ...newImages].slice(0, 2));
          setMessage(null);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (extracting) return;
    handleFiles(e.dataTransfer.files);
  };

  const handlePaste = (e) => {
    if (extracting) return;
    const files = Array.from(e.clipboardData?.files || []);
    if (files.length > 0) {
      e.preventDefault();
      handleFiles(files);
    }
  };

  const removeImage = (idx) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  };

  const handleExtract = async () => {
    if (images.length === 0) return;
    setExtracting(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/extract-picks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: images.map(i => i.preview) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Extraction failed');
      setMessage({ type: 'success', text: 'Extracted — form filled below. Review before posting.' });
      onExtracted(data.extracted);
      // Clear images after successful extraction
      setTimeout(() => setImages([]), 800);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setExtracting(false);
    }
  };

  return (
    <div
      style={{
        borderRadius: 20,
        background: '#111418',
        border: '1px solid rgba(255,107,53,0.18)',
        marginBottom: 20,
        overflow: 'hidden',
      }}
      onPaste={handlePaste}
      tabIndex={0}
    >
      <div style={{
        height: 2,
        background: 'linear-gradient(90deg, transparent, #ff6b35 40%, #ff6b35 60%, transparent)',
      }} />

      <div style={{ padding: '18px 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 9, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            background: 'rgba(255,107,53,0.15)',
            color: '#ff6b35',
            border: '1px solid rgba(255,107,53,0.3)',
          }}>
            <ScanLine size={15} />
          </div>
          <div>
            <div style={{
              fontSize: 14, fontWeight: 600, color: '#e8ecf0',
              fontFamily: "'Inter', sans-serif",
            }}>
              Auto-Extract from Screenshots
            </div>
            <div style={{
              fontSize: 11, color: '#5a6474', marginTop: 2,
              fontFamily: "'DM Mono', monospace",
            }}>
              Upload 1–2 screenshots · AI fills the form for you
            </div>
          </div>
        </div>

        {/* Drop zone or thumbnails */}
        {images.length === 0 ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            style={{
              border: '1.5px dashed rgba(255,107,53,0.3)',
              borderRadius: 14,
              padding: '32px 16px',
              textAlign: 'center',
              cursor: 'pointer',
              background: 'rgba(255,107,53,0.025)',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(255,107,53,0.5)';
              e.currentTarget.style.background = 'rgba(255,107,53,0.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,107,53,0.3)';
              e.currentTarget.style.background = 'rgba(255,107,53,0.025)';
            }}
          >
            <Upload size={20} style={{ color: '#ff6b35', margin: '0 auto 10px' }} />
            <div style={{
              fontSize: 13, fontWeight: 600, color: '#e8ecf0',
              fontFamily: "'DM Sans', sans-serif", marginBottom: 4,
            }}>
              Drop screenshots, paste, or click to upload
            </div>
            <div style={{
              fontSize: 11, color: '#5a6474',
              fontFamily: "'DM Mono', monospace",
            }}>
              First: regular view · Second: H2H view (optional)
            </div>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 10,
            marginBottom: 12,
          }}>
            {images.map((img, idx) => (
              <div key={idx} style={{
                position: 'relative',
                borderRadius: 10,
                overflow: 'hidden',
                border: '1px solid #1e242c',
                background: '#181c22',
                aspectRatio: '9 / 16',
              }}>
                <img
                  src={img.preview}
                  alt={`Screenshot ${idx + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                />
                <div style={{
                  position: 'absolute', top: 6, left: 6,
                  padding: '2px 8px', borderRadius: 999,
                  background: 'rgba(0,0,0,0.7)',
                  color: idx === 0 ? '#ff6b35' : '#4da6ff',
                  fontSize: 10, fontWeight: 700,
                  fontFamily: "'DM Mono', monospace",
                  letterSpacing: '0.08em',
                  border: `1px solid ${idx === 0 ? 'rgba(255,107,53,0.3)' : 'rgba(77,166,255,0.3)'}`,
                }}>
                  {idx === 0 ? 'MAIN' : 'H2H'}
                </div>
                <button
                  onClick={() => removeImage(idx)}
                  disabled={extracting}
                  style={{
                    position: 'absolute', top: 6, right: 6,
                    width: 22, height: 22, borderRadius: 6,
                    background: 'rgba(0,0,0,0.7)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: extracting ? 'not-allowed' : 'pointer',
                  }}
                >
                  <X size={12} />
                </button>
              </div>
            ))}

            {images.length < 2 && (
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={extracting}
                style={{
                  border: '1.5px dashed rgba(255,255,255,0.1)',
                  background: 'transparent',
                  borderRadius: 10,
                  cursor: extracting ? 'not-allowed' : 'pointer',
                  aspectRatio: '9 / 16',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#5a6474',
                  fontSize: 11,
                  fontFamily: "'DM Mono', monospace",
                  gap: 6,
                }}
              >
                <ImageIcon size={18} />
                Add H2H
              </button>
            )}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          style={{ display: 'none' }}
        />

        {/* Message */}
        {message && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 12px', borderRadius: 8,
            marginTop: 10,
            fontSize: 12,
            background: message.type === 'success' ? 'rgba(0,229,160,0.08)' : 'rgba(255,71,87,0.08)',
            border: `1px solid ${message.type === 'success' ? 'rgba(0,229,160,0.25)' : 'rgba(255,71,87,0.25)'}`,
            color: message.type === 'success' ? '#00e5a0' : '#ff4757',
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {message.type === 'success' ? <CheckCircle2 size={13} /> : <AlertCircle size={13} />}
            {message.text}
          </div>
        )}

        {/* Extract button */}
        {images.length > 0 && (
          <button
            onClick={handleExtract}
            disabled={extracting}
            style={{
              width: '100%',
              marginTop: 12,
              padding: '11px 0',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 13,
              cursor: extracting ? 'not-allowed' : 'pointer',
              border: 'none',
              background: extracting ? 'rgba(255,107,53,0.4)' : '#ff6b35',
              color: '#0a0c0f',
              fontFamily: "'DM Sans', sans-serif",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'all 0.2s',
              boxShadow: extracting ? 'none' : '0 4px 20px rgba(255,107,53,0.3)',
            }}
          >
            {extracting ? (
              <>
                <div style={{
                  width: 14, height: 14, borderRadius: '50%',
                  border: '2px solid rgba(10,12,15,0.3)',
                  borderTopColor: '#0a0c0f',
                  animation: 'spinExtract 0.7s linear infinite',
                }} />
                Extracting...
              </>
            ) : (
              <>
                <ScanLine size={14} />
                Extract &amp; Fill Form
              </>
            )}
          </button>
        )}

        <style>{`@keyframes spinExtract { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}
