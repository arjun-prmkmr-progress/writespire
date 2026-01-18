import { useState } from 'react';
import type { Template, GeneratedContent, Document } from './types';
import { generateContent } from './utils/aiSimulator';
import { saveDocument, exportDocument } from './utils/storage';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { TemplateForm } from './components/TemplateForm';
import { OutputDisplay } from './components/OutputDisplay';
import './App.css';

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVariations, setGeneratedVariations] = useState<string[]>([]);
  const [currentDocument, setCurrentDocument] = useState<Document>({
    id: crypto.randomUUID(),
    title: 'Untitled Document',
    contents: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  const [showToast, setShowToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setGeneratedVariations([]);
  };

  const handleGenerate = async (inputs: Record<string, string>) => {
    if (!selectedTemplate) return;

    setIsGenerating(true);
    setGeneratedVariations([]);

    try {
      const variations = await generateContent(selectedTemplate, inputs);
      setGeneratedVariations(variations);

      // Add to document
      const newContent: GeneratedContent = {
        id: crypto.randomUUID(),
        templateId: selectedTemplate.id,
        templateName: selectedTemplate.name,
        content: variations[0], // Save first variation
        inputs,
        timestamp: Date.now(),
      };

      setCurrentDocument((prev) => ({
        ...prev,
        contents: [...prev.contents, newContent],
        updatedAt: Date.now(),
      }));

      showToastMessage('Content generated successfully!', 'success');
    } catch (error) {
      console.error('Error generating content:', error);
      showToastMessage('Failed to generate content', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = () => {
    // Trigger regeneration with the same inputs
    const lastContent = currentDocument.contents[currentDocument.contents.length - 1];
    if (lastContent) {
      handleGenerate(lastContent.inputs);
    }
  };

  const handleSave = () => {
    saveDocument(currentDocument);
    showToastMessage('Document saved!', 'success');
  };

  const handleExport = () => {
    if (currentDocument.contents.length === 0) {
      showToastMessage('No content to export', 'error');
      return;
    }
    exportDocument(currentDocument);
    showToastMessage('Document exported!', 'success');
  };

  const handleTitleChange = (title: string) => {
    setCurrentDocument((prev) => ({
      ...prev,
      title,
      updatedAt: Date.now(),
    }));
  };

  const showToastMessage = (message: string, type: 'success' | 'error') => {
    setShowToast({ message, type });
    setTimeout(() => setShowToast(null), 3000);
  };

  return (
    <div className="app">
      <Header
        documentTitle={currentDocument.title}
        onTitleChange={handleTitleChange}
        onSave={handleSave}
        onExport={handleExport}
      />
      <div className="main-layout">
        <Sidebar
          selectedTemplate={selectedTemplate}
          onTemplateSelect={handleTemplateSelect}
        />
        <div className="editor-area">
          <div className="editor-container">
            {selectedTemplate ? (
              <>
                <TemplateForm
                  template={selectedTemplate}
                  onGenerate={handleGenerate}
                  isGenerating={isGenerating}
                />
                {isGenerating && (
                  <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">
                      Generating amazing content for you...
                    </p>
                  </div>
                )}
                {!isGenerating && generatedVariations.length > 0 && (
                  <OutputDisplay
                    variations={generatedVariations}
                    onRegenerate={handleRegenerate}
                  />
                )}
              </>
            ) : (
              <div className="editor-empty">
                <div className="editor-empty-icon">✨</div>
                <h2 className="editor-empty-title">
                  Welcome to WriteSpire
                </h2>
                <p className="editor-empty-text">
                  Select a template from the sidebar to start creating amazing
                  content with AI
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showToast && (
        <div className={`toast toast-${showToast.type}`}>
          <span className="toast-icon">
            {showToast.type === 'success' ? '✅' : '❌'}
          </span>
          <span className="toast-message">{showToast.message}</span>
        </div>
      )}
    </div>
  );
}

export default App;
