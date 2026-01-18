import { useState, useMemo } from 'react';
import type { Template } from '../types';
import { templates } from '../templates';

interface SidebarProps {
    selectedTemplate: Template | null;
    onTemplateSelect: (template: Template) => void;
}

const categoryInfo = {
    blog: { icon: '📝', label: 'Blog Content' },
    marketing: { icon: '🎯', label: 'Marketing' },
    social: { icon: '📱', label: 'Social Media' },
    email: { icon: '📧', label: 'Email' },
    ads: { icon: '💥', label: 'Advertising' },
};

export const Sidebar: React.FC<SidebarProps> = ({
    selectedTemplate,
    onTemplateSelect,
}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTemplates = useMemo(() => {
        if (!searchQuery.trim()) return templates;

        const query = searchQuery.toLowerCase();
        return templates.filter(
            (t) =>
                t.name.toLowerCase().includes(query) ||
                t.description.toLowerCase().includes(query) ||
                t.category.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    const templatesByCategory = useMemo(() => {
        const grouped: Record<string, Template[]> = {
            blog: [],
            marketing: [],
            social: [],
            email: [],
            ads: [],
        };

        filteredTemplates.forEach((template) => {
            grouped[template.category].push(template);
        });

        return grouped;
    }, [filteredTemplates]);

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2 className="sidebar-title">Content Templates</h2>
                <div className="search-box">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search templates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            <div className="template-categories">
                {Object.entries(categoryInfo).map(([category, info]) => {
                    const categoryTemplates = templatesByCategory[category];
                    if (categoryTemplates.length === 0) return null;

                    return (
                        <div key={category} className="category-section">
                            <div className="category-header">
                                <span className="category-icon">{info.icon}</span>
                                <span>{info.label}</span>
                            </div>
                            <div className="template-grid">
                                {categoryTemplates.map((template) => (
                                    <div
                                        key={template.id}
                                        className={`template-card ${selectedTemplate?.id === template.id ? 'active' : ''
                                            }`}
                                        onClick={() => onTemplateSelect(template)}
                                    >
                                        <div className="template-card-header">
                                            <span className="template-icon">{template.icon}</span>
                                            <span className="template-name">{template.name}</span>
                                        </div>
                                        <p className="template-description">
                                            {template.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </aside>
    );
};
