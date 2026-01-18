# WriteSpire - AI Content Writing Tool

A premium, AI-powered content writing application to inspire and create amazing content. Built with React, TypeScript, and Vite, featuring a stunning dark theme with glassmorphism effects and 18 professional content templates.

![WriteSpire](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Vite](https://img.shields.io/badge/Vite-7-purple)

## ✨ Features

- **18 Content Templates** across 5 categories (Blog, Marketing, Social Media, Email, Ads)
- **Premium Dark Theme** with glassmorphism and gradient effects
- **AI Content Generation** with realistic simulated responses
- **Document Management** with save and export functionality
- **Responsive Design** that works on all screen sizes
- **Smooth Animations** and micro-interactions
- **Copy to Clipboard** for generated content
- **Search & Filter** templates easily

## 🎨 Design Highlights

- Modern purple/blue gradient color palette
- Glassmorphism effects with backdrop blur
- Google Fonts (Inter & Merriweather)
- Smooth transitions and hover effects
- Custom scrollbar styling
- Toast notifications

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Navigate to project directory
cd writespire

# Install dependencies (if not already installed)
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
npm run preview
```

## 📝 Available Templates

### Blog Content
- Blog Post Outline
- Blog Post Introduction
- SEO Meta Description

### Marketing
- Product Description
- Value Proposition
- Landing Page Copy

### Social Media
- Instagram Caption
- Twitter Thread
- LinkedIn Post

### Email
- Email Subject Lines
- Email Body
- Cold Outreach Email

### Advertising
- Google Ad Copy
- Facebook Ad Primary Text
- Ad Headlines

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Vanilla CSS** - Styling (no frameworks)
- **LocalStorage** - Document persistence

## 📁 Project Structure

```
src/
├── components/       # React components
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── TemplateForm.tsx
│   └── OutputDisplay.tsx
├── templates/        # Template definitions
│   └── index.ts
├── utils/           # Utility functions
│   ├── aiSimulator.ts
│   └── storage.ts
├── types/           # TypeScript types
│   └── index.ts
├── App.tsx          # Main application
└── App.css          # Design system
```

## 🎯 Usage

1. **Select a Template** - Browse templates in the sidebar or use the search
2. **Fill the Form** - Enter your content requirements
3. **Generate** - Click "Generate Content" to create AI-powered content
4. **Copy & Use** - Copy variations to your clipboard
5. **Save** - Save your document for later
6. **Export** - Download as a text file

## 🔮 Future Enhancements

- Real AI integration (OpenAI GPT-4, Anthropic Claude)
- User authentication and accounts
- Cloud storage and sync
- Custom template creation
- Team collaboration features
- Advanced export formats (PDF, DOCX)
- Usage analytics

## 📄 License

This is a demo project created for educational purposes.

## 🙏 Acknowledgments

Inspired by modern AI writing tools and content creation platforms.

---

**Note**: This is a demo application with simulated AI responses. For production use, integrate with a real AI API like OpenAI or Anthropic.
# writespire
