import type { Document } from '../types';
import { useState, useRef, useEffect } from 'react';

interface HeaderProps {
    documentTitle: string;
    onTitleChange: (title: string) => void;
    onSave: () => void;
    onExport: () => void;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
    documents: Document[];
    currentDocumentId: string;
    onNewDocument: () => void;
    onSwitchDocument: (id: string) => void;
    onDeleteDocument: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
    documentTitle,
    onTitleChange,
    onSave,
    onExport,
    theme,
    onToggleTheme,
    documents,
    currentDocumentId,
    onNewDocument,
    onSwitchDocument,
    onDeleteDocument,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSwitch = (id: string) => {
        onSwitchDocument(id);
        setIsDropdownOpen(false);
    };

    const handleNew = () => {
        onNewDocument();
        setIsDropdownOpen(false);
    };

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this document?')) {
            onDeleteDocument(id);
        }
    };

    return (
        <header className="header">
            <div className="header-left">
                <div className="logo">
                    <span className="logo-icon">✨</span>
                    <span>WriteSpire</span>
                </div>

                <div className="document-switcher" ref={dropdownRef}>
                    <div
                        className="document-selector"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <span className="current-doc-title">
                            {documents.find(d => d.id === currentDocumentId)?.title || 'Untitled Document'}
                        </span>
                        <span className="dropdown-arrow">▼</span>
                    </div>

                    {isDropdownOpen && (
                        <div className="document-dropdown">
                            <div className="dropdown-header">
                                <span>My Documents</span>
                                <button className="btn-text" onClick={handleNew}>+ New</button>
                            </div>
                            <div className="document-list">
                                {documents.sort((a, b) => b.updatedAt - a.updatedAt).map(doc => (
                                    <div
                                        key={doc.id}
                                        className={`document-item ${doc.id === currentDocumentId ? 'active' : ''}`}
                                        onClick={() => handleSwitch(doc.id)}
                                    >
                                        <span className="doc-item-title">{doc.title}</span>
                                        <span className="doc-item-date">
                                            {new Date(doc.updatedAt).toLocaleDateString()}
                                        </span>
                                        {documents.length > 1 && (
                                            <button
                                                className="delete-doc-btn"
                                                onClick={(e) => handleDelete(e, doc.id)}
                                                title="Delete document"
                                            >
                                                🗑️
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <input
                    type="text"
                    className="document-title"
                    value={documentTitle}
                    onChange={(e) => onTitleChange(e.target.value)}
                    placeholder="Document Title"
                />
            </div>
            <div className="header-actions">
                <button
                    className="btn btn-secondary btn-icon"
                    onClick={onToggleTheme}
                    title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
                <button className="btn btn-secondary btn-sm" onClick={onSave}>
                    <span>💾</span>
                    <span>Save</span>
                </button>
                <button className="btn btn-primary btn-sm" onClick={onExport}>
                    <span>📥</span>
                    <span>Export</span>
                </button>
            </div>
        </header>
    );
};
