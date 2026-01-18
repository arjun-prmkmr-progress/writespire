import type { Document } from '../types';

const STORAGE_KEY = 'jasper-clone-documents';

export const saveDocument = (document: Document): void => {
    try {
        const documents = getAllDocuments();
        const index = documents.findIndex(d => d.id === document.id);

        if (index >= 0) {
            documents[index] = document;
        } else {
            documents.push(document);
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
    } catch (error) {
        console.error('Error saving document:', error);
    }
};

export const getAllDocuments = (): Document[] => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error loading documents:', error);
        return [];
    }
};

export const getDocumentById = (id: string): Document | undefined => {
    const documents = getAllDocuments();
    return documents.find(d => d.id === id);
};

export const deleteDocument = (id: string): void => {
    try {
        const documents = getAllDocuments();
        const filtered = documents.filter(d => d.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
        console.error('Error deleting document:', error);
    }
};

export const exportDocument = (doc: Document): void => {
    const content = formatDocumentForExport(doc);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.txt`;
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

const formatDocumentForExport = (doc: Document): string => {
    let content = `${doc.title}\n`;
    content += `Created: ${new Date(doc.createdAt).toLocaleString()}\n`;
    content += `Updated: ${new Date(doc.updatedAt).toLocaleString()}\n`;
    content += `\n${'='.repeat(80)}\n\n`;

    doc.contents.forEach((item, index) => {
        content += `\n--- Content ${index + 1}: ${item.templateName} ---\n\n`;
        content += `${item.content}\n\n`;
    });

    return content;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        console.error('Error copying to clipboard:', error);
        return false;
    }
};
