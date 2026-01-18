import { useState, useEffect, useMemo } from 'react';
import type { Template, GeneratedContent, Document } from './types';
import { generateContent } from './utils/aiSimulator';
import { saveAllDocuments, getAllDocuments, exportDocument } from './utils/storage';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { TemplateForm } from './components/TemplateForm';
import { OutputDisplay } from './components/OutputDisplay';
import './App.css';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const [documents, setDocuments] = useState<Document[]>([]);
  const [currentDocumentId, setCurrentDocumentId] = useState<string>('');

  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVariations, setGeneratedVariations] = useState<string[]>([]);
  const [showToast, setShowToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const createNewDocument = (): Document => ({
    id: crypto.randomUUID(),
    title: 'Untitled Document',
    contents: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  useEffect(() => {
    const docs = getAllDocuments();
    if (docs.length > 0) {
      setDocuments(docs);
      const mostRecent = docs.sort((a, b) => b.updatedAt - a.updatedAt)[0];
      setCurrentDocumentId(mostRecent.id);
    } else {
      const newDoc = createNewDocument();
      setDocuments([newDoc]);
      setCurrentDocumentId(newDoc.id);
      saveAllDocuments([newDoc]);
    }
  }, []);

  useEffect(() => {
    if (documents.length > 0) {
      saveAllDocuments(documents);
    }
  }, [documents]);

  const currentDocument = useMemo(() => {
    return documents.find(d => d.id === currentDocumentId) || (documents.length > 0 ? documents[0] : null);
  }, [documents, currentDocumentId]);

  const safeCurrentDocument = currentDocument || {
    id: 'temp',
    title: 'Loading...',
    contents: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const handleNewDocument = () => {
    const newDoc = createNewDocument();
    setDocuments(prev => [...prev, newDoc]);
    setCurrentDocumentId(newDoc.id);
    setSelectedTemplate(null);
    setGeneratedVariations([]);
  };

  const handleSwitchDocument = (id: string) => {
    setCurrentDocumentId(id);
    setSelectedTemplate(null);
    setGeneratedVariations([]);
  };

  const handleDeleteDocument = (id: string) => {
    if (documents.length <= 1) {
      showToastMessage('Cannot delete the last document', 'error');
      return;
    }

    const newDocs = documents.filter(d => d.id !== id);
    setDocuments(newDocs);

    if (currentDocumentId === id) {
      const mostRecent = newDocs.sort((a, b) => b.updatedAt - a.updatedAt)[0];
      setCurrentDocumentId(mostRecent.id);
    }
    showToastMessage('Document deleted', 'success');
  };

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

      const newContent: GeneratedContent = {
        id: crypto.randomUUID(),
        templateId: selectedTemplate.id,
        templateName: selectedTemplate.name,
        content: variations[0],
        inputs,
        timestamp: Date.now(),
      };

      setDocuments(prev => prev.map(doc => {
        if (doc.id === currentDocumentId) {
          return {
            ...doc,
            contents: [...doc.contents, newContent],
            updatedAt: Date.now()
          };
        }
        return doc;
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
    const lastContent = safeCurrentDocument.contents[safeCurrentDocument.contents.length - 1];
    if (lastContent) {
      handleGenerate(lastContent.inputs);
    }
  };

  const handleSave = () => {
    saveAllDocuments(documents);
    showToastMessage('All documents saved!', 'success');
  };

  const handleExport = async () => {
    if (safeCurrentDocument.contents.length === 0) {
      showToastMessage('No content to export', 'error');
      return;
    }
    try {
      await exportDocument(safeCurrentDocument);
      showToastMessage('Document exported!', 'success');
    } catch (error) {
      console.error('Export error:', error);
      showToastMessage('Failed to export document', 'error');
    }
  };

  const handleTitleChange = (title: string) => {
    setDocuments(prev => prev.map(doc => {
      if (doc.id === currentDocumentId) {
        return { ...doc, title, updatedAt: Date.now() };
      }
      return doc;
    }));
  };

  const showToastMessage = (message: string, type: 'success' | 'error') => {
    setShowToast({ message, type });
    setTimeout(() => setShowToast(null), 3000);
  };

  return (
    <div className="app">
      <Header
        documentTitle={safeCurrentDocument.title}
        onTitleChange={handleTitleChange}
        onSave={handleSave}
        onExport={handleExport}
        theme={theme}
        onToggleTheme={toggleTheme}
        documents={documents}
        currentDocumentId={currentDocumentId}
        onNewDocument={handleNewDocument}
        onSwitchDocument={handleSwitchDocument}
        onDeleteDocument={handleDeleteDocument}
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
