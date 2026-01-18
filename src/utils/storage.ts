import type { Document } from '../types';
import { Document as DocxDocument, Packer, Paragraph, TextRun, HeadingLevel, Table, TableCell, TableRow, WidthType } from 'docx';

export const STORAGE_KEY = 'jasper-clone-documents';

export const saveAllDocuments = (documents: Document[]): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
    } catch (error) {
        console.error('Error saving all documents:', error);
    }
};

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

export const exportDocument = async (doc: Document): Promise<void> => {
    try {
        // Create document sections
        const sections = [];

        // Title
        sections.push(
            new Paragraph({
                text: doc.title,
                heading: HeadingLevel.HEADING_1,
                spacing: { after: 200 }
            })
        );

        // Metadata table
        sections.push(
            new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({ children: [new TextRun({ text: 'Created:', bold: true })] })],
                                width: { size: 25, type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph(new Date(doc.createdAt).toLocaleString())],
                                width: { size: 75, type: WidthType.PERCENTAGE }
                            })
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({ children: [new TextRun({ text: 'Updated:', bold: true })] })],
                                width: { size: 25, type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph(new Date(doc.updatedAt).toLocaleString())],
                                width: { size: 75, type: WidthType.PERCENTAGE }
                            })
                        ]
                    })
                ],
                margins: {
                    top: 100,
                    bottom: 100,
                    left: 100,
                    right: 100
                }
            })
        );

        // Spacing after metadata
        sections.push(new Paragraph({ text: '', spacing: { after: 400 } }));

        // Content sections
        doc.contents.forEach((item, index) => {
            // Section heading
            sections.push(
                new Paragraph({
                    text: `${item.templateName}`,
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 300, after: 200 }
                })
            );

            // Content paragraphs
            const contentLines = item.content.split('\n');
            contentLines.forEach(line => {
                sections.push(
                    new Paragraph({
                        children: [new TextRun(line || ' ')],
                        spacing: { after: 100 }
                    })
                );
            });

            // Add spacing between sections
            if (index < doc.contents.length - 1) {
                sections.push(new Paragraph({ text: '', spacing: { after: 300 } }));
            }
        });

        // Create the Word document
        const docxDoc = new DocxDocument({
            sections: [{
                properties: {},
                children: sections
            }]
        });

        // Generate and download the document
        const blob = await Packer.toBlob(docxDoc);
        const url = URL.createObjectURL(blob);
        const a = window.document.createElement('a');
        a.href = url;
        a.download = `${doc.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.docx`;
        window.document.body.appendChild(a);
        a.click();
        window.document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error exporting document:', error);
        throw error;
    }
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
