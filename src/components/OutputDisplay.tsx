import { useState } from 'react';
import { copyToClipboard } from '../utils/storage';

interface OutputDisplayProps {
    variations: string[];
    onRegenerate: () => void;
}

export const OutputDisplay: React.FC<OutputDisplayProps> = ({
    variations,
    onRegenerate,
}) => {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleCopy = async (content: string, index: number) => {
        const success = await copyToClipboard(content);
        if (success) {
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        }
    };

    const getWordCount = (text: string): number => {
        return text.trim().split(/\s+/).length;
    };

    const getCharCount = (text: string): number => {
        return text.length;
    };

    return (
        <div className="output-section">
            <div className="output-header">
                <h2 className="output-title">Generated Content</h2>
                <div className="output-actions">
                    <button className="btn btn-secondary btn-sm" onClick={onRegenerate}>
                        <span>🔄</span>
                        <span>Regenerate</span>
                    </button>
                </div>
            </div>

            <div className="output-variations">
                {variations.map((content, index) => (
                    <div key={index} className="output-card">
                        <div className="output-card-header">
                            <span className="output-variation-label">
                                Variation {index + 1}
                            </span>
                            <div className="output-card-actions">
                                <button
                                    className="btn btn-ghost btn-sm"
                                    onClick={() => handleCopy(content, index)}
                                >
                                    {copiedIndex === index ? (
                                        <>
                                            <span>✅</span>
                                            <span>Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>📋</span>
                                            <span>Copy</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="output-content">{content}</div>
                        <div className="output-stats">
                            <span>📊 {getWordCount(content)} words</span>
                            <span>📝 {getCharCount(content)} characters</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
