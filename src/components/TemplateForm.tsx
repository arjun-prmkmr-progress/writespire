import { useState, useEffect } from 'react';
import type { Template, Document } from '../types';
import { getAllDocuments } from '../utils/storage';

interface TemplateFormProps {
    template: Template;
    onGenerate: (inputs: Record<string, string>) => void;
    isGenerating: boolean;
}

export const TemplateForm: React.FC<TemplateFormProps> = ({
    template,
    onGenerate,
    isGenerating,
}) => {
    const [inputs, setInputs] = useState<Record<string, string>>({});
    const [availableOutlines, setAvailableOutlines] = useState<Document[]>([]);

    useEffect(() => {
        if (template.inputs.some(input => input.type === 'outline-select')) {
            const docs = getAllDocuments();
            // Filter documents that contain blog outlines
            const outlineDocs = docs.filter(doc =>
                doc.contents.some(content => content.templateId === 'blog-post-outline')
            );
            setAvailableOutlines(outlineDocs);
        }
    }, [template]);

    const handleInputChange = (id: string, value: string) => {
        setInputs((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate required fields
        const missingFields = template.inputs
            .filter((input) => input.required && !inputs[input.id]?.trim())
            .map((input) => input.label);

        if (missingFields.length > 0) {
            alert(`Please fill in required fields: ${missingFields.join(', ')}`);
            return;
        }

        onGenerate(inputs);
    };

    const handleReset = () => {
        setInputs({});
    };

    return (
        <form className="template-form" onSubmit={handleSubmit}>
            <div className="template-form-header">
                <h1 className="template-form-title">
                    {template.icon} {template.name}
                </h1>
                <p className="template-form-description">{template.description}</p>
            </div>

            <div className="form-fields">
                {template.inputs.map((input) => (
                    <div key={input.id} className="form-field">
                        <label htmlFor={input.id} className="form-label">
                            {input.label}
                            {input.required && <span className="form-label-required">*</span>}
                        </label>

                        {input.type === 'text' && (
                            <input
                                id={input.id}
                                type="text"
                                className="form-input"
                                placeholder={input.placeholder}
                                value={inputs[input.id] || ''}
                                onChange={(e) => handleInputChange(input.id, e.target.value)}
                                maxLength={input.maxLength}
                            />
                        )}

                        {input.type === 'textarea' && (
                            <textarea
                                id={input.id}
                                className="form-textarea"
                                placeholder={input.placeholder}
                                value={inputs[input.id] || ''}
                                onChange={(e) => handleInputChange(input.id, e.target.value)}
                                maxLength={input.maxLength}
                            />
                        )}

                        {input.type === 'select' && (
                            <select
                                id={input.id}
                                className="form-select"
                                value={inputs[input.id] || ''}
                                onChange={(e) => handleInputChange(input.id, e.target.value)}
                            >
                                <option value="">Select {input.label}</option>
                                {input.options?.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        )}

                        {input.type === 'number' && (
                            <input
                                id={input.id}
                                type="number"
                                className="form-input"
                                placeholder={input.placeholder}
                                value={inputs[input.id] || ''}
                                onChange={(e) => handleInputChange(input.id, e.target.value)}
                            />
                        )}

                        {input.type === 'outline-select' && (
                            <div className="outline-select-container">
                                <select
                                    id={input.id}
                                    className="form-select"
                                    value={inputs[input.id] || ''}
                                    onChange={(e) => handleInputChange(input.id, e.target.value)}
                                >
                                    <option value="">{input.placeholder || 'Select an outline'}</option>
                                    {availableOutlines.length > 0 ? (
                                        availableOutlines.map((doc) => {
                                            const outlineContent = doc.contents.find(c => c.templateId === 'blog-post-outline');
                                            return (
                                                <option key={doc.id} value={outlineContent?.content || ''}>
                                                    {doc.title} ({new Date(doc.updatedAt).toLocaleDateString()})
                                                </option>
                                            );
                                        })
                                    ) : (
                                        <option value="" disabled>No outlines found. Generate one first!</option>
                                    )}
                                </select>
                                {inputs[input.id] && (
                                    <div className="outline-preview">
                                        <p className="outline-preview-label">Selected Outline Preview:</p>
                                        <div className="outline-preview-content">
                                            {inputs[input.id].substring(0, 150)}...
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="form-actions">
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isGenerating}
                >
                    {isGenerating ? (
                        <>
                            <span className="loading-spinner" style={{ width: 20, height: 20, borderWidth: 2 }}></span>
                            <span>Generating...</span>
                        </>
                    ) : (
                        <>
                            <span>✨</span>
                            <span>Generate Content</span>
                        </>
                    )}
                </button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleReset}
                    disabled={isGenerating}
                >
                    <span>🔄</span>
                    <span>Reset</span>
                </button>
            </div>
        </form>
    );
};
