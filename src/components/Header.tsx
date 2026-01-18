
interface HeaderProps {
    documentTitle: string;
    onTitleChange: (title: string) => void;
    onSave: () => void;
    onExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
    documentTitle,
    onTitleChange,
    onSave,
    onExport,
}) => {
    return (
        <header className="header">
            <div className="header-left">
                <div className="logo">
                    <span className="logo-icon">✨</span>
                    <span>WriteSpire</span>
                </div>
                <input
                    type="text"
                    className="document-title"
                    value={documentTitle}
                    onChange={(e) => onTitleChange(e.target.value)}
                    placeholder="Untitled Document"
                />
            </div>
            <div className="header-actions">
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
