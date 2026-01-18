import type { Template } from '../types';

export const templates: Template[] = [
    // Blog Templates
    {
        id: 'blog-post-outline',
        name: 'Blog Post Outline',
        description: 'Generate a comprehensive outline for your blog post',
        category: 'blog',
        icon: '📝',
        inputs: [
            { id: 'topic', label: 'Blog Topic', type: 'text', placeholder: 'e.g., Benefits of Remote Work', required: true },
            { id: 'keywords', label: 'Keywords', type: 'text', placeholder: 'e.g., remote work, productivity, work-life balance' },
            { id: 'tone', label: 'Tone', type: 'select', options: ['Professional', 'Casual', 'Friendly', 'Authoritative'], required: true },
        ],
    },
    {
        id: 'blog-post-intro',
        name: 'Blog Post Introduction',
        description: 'Create an engaging introduction for your blog post',
        category: 'blog',
        icon: '✍️',
        inputs: [
            { id: 'topic', label: 'Blog Topic', type: 'text', placeholder: 'e.g., AI in Healthcare', required: true },
            { id: 'hook', label: 'Hook/Angle', type: 'textarea', placeholder: 'What makes this topic interesting?' },
            { id: 'tone', label: 'Tone', type: 'select', options: ['Professional', 'Casual', 'Friendly', 'Authoritative'], required: true },
        ],
    },
    {
        id: 'seo-meta-description',
        name: 'SEO Meta Description',
        description: 'Generate SEO-optimized meta descriptions',
        category: 'blog',
        icon: '🔍',
        inputs: [
            { id: 'topic', label: 'Page Topic', type: 'text', placeholder: 'e.g., Best Coffee Makers 2024', required: true },
            { id: 'keywords', label: 'Target Keywords', type: 'text', placeholder: 'e.g., coffee maker, best coffee machine' },
            { id: 'length', label: 'Max Length', type: 'number', placeholder: '160' },
        ],
    },

    // Marketing Templates
    {
        id: 'product-description',
        name: 'Product Description',
        description: 'Write compelling product descriptions that sell',
        category: 'marketing',
        icon: '🛍️',
        inputs: [
            { id: 'product', label: 'Product Name', type: 'text', placeholder: 'e.g., Wireless Headphones Pro', required: true },
            { id: 'features', label: 'Key Features', type: 'textarea', placeholder: 'List main features and benefits', required: true },
            { id: 'audience', label: 'Target Audience', type: 'text', placeholder: 'e.g., Music enthusiasts, professionals' },
            { id: 'tone', label: 'Tone', type: 'select', options: ['Professional', 'Casual', 'Luxurious', 'Playful'], required: true },
        ],
    },
    {
        id: 'value-proposition',
        name: 'Value Proposition',
        description: 'Craft a clear and compelling value proposition',
        category: 'marketing',
        icon: '💎',
        inputs: [
            { id: 'product', label: 'Product/Service', type: 'text', placeholder: 'e.g., Project Management Software', required: true },
            { id: 'problem', label: 'Problem It Solves', type: 'textarea', placeholder: 'What pain point does it address?', required: true },
            { id: 'benefit', label: 'Main Benefit', type: 'text', placeholder: 'e.g., Save 10 hours per week' },
        ],
    },
    {
        id: 'landing-page-copy',
        name: 'Landing Page Copy',
        description: 'Generate high-converting landing page copy',
        category: 'marketing',
        icon: '🎯',
        inputs: [
            { id: 'product', label: 'Product/Service', type: 'text', placeholder: 'e.g., Email Marketing Platform', required: true },
            { id: 'audience', label: 'Target Audience', type: 'text', placeholder: 'e.g., Small business owners', required: true },
            { id: 'benefit', label: 'Main Benefit', type: 'textarea', placeholder: 'What will users achieve?' },
        ],
    },

    // Social Media Templates
    {
        id: 'instagram-caption',
        name: 'Instagram Caption',
        description: 'Create engaging Instagram captions with hashtags',
        category: 'social',
        icon: '📸',
        inputs: [
            { id: 'topic', label: 'Post Topic', type: 'text', placeholder: 'e.g., New product launch', required: true },
            { id: 'context', label: 'Context/Details', type: 'textarea', placeholder: 'What is the post about?' },
            { id: 'tone', label: 'Tone', type: 'select', options: ['Casual', 'Professional', 'Inspirational', 'Fun'], required: true },
            { id: 'hashtags', label: 'Include Hashtags', type: 'select', options: ['Yes', 'No'], required: true },
        ],
    },
    {
        id: 'twitter-thread',
        name: 'Twitter Thread',
        description: 'Generate an engaging Twitter/X thread',
        category: 'social',
        icon: '🐦',
        inputs: [
            { id: 'topic', label: 'Thread Topic', type: 'text', placeholder: 'e.g., 5 Tips for Better Productivity', required: true },
            { id: 'points', label: 'Key Points', type: 'textarea', placeholder: 'List main points to cover', required: true },
            { id: 'tweets', label: 'Number of Tweets', type: 'number', placeholder: '5' },
        ],
    },
    {
        id: 'linkedin-post',
        name: 'LinkedIn Post',
        description: 'Create professional LinkedIn posts',
        category: 'social',
        icon: '💼',
        inputs: [
            { id: 'topic', label: 'Post Topic', type: 'text', placeholder: 'e.g., Career advice, industry insights', required: true },
            { id: 'message', label: 'Key Message', type: 'textarea', placeholder: 'What do you want to communicate?', required: true },
            { id: 'cta', label: 'Call to Action', type: 'text', placeholder: 'e.g., Share your thoughts, Visit our website' },
        ],
    },

    // Email Templates
    {
        id: 'email-subject-lines',
        name: 'Email Subject Lines',
        description: 'Generate attention-grabbing email subject lines',
        category: 'email',
        icon: '📧',
        inputs: [
            { id: 'purpose', label: 'Email Purpose', type: 'text', placeholder: 'e.g., Product launch, Newsletter', required: true },
            { id: 'audience', label: 'Audience', type: 'text', placeholder: 'e.g., Existing customers, Prospects' },
            { id: 'tone', label: 'Tone', type: 'select', options: ['Professional', 'Casual', 'Urgent', 'Friendly'], required: true },
        ],
    },
    {
        id: 'email-body',
        name: 'Email Body',
        description: 'Write persuasive email body copy',
        category: 'email',
        icon: '✉️',
        inputs: [
            { id: 'purpose', label: 'Email Purpose', type: 'text', placeholder: 'e.g., Sales pitch, Follow-up', required: true },
            { id: 'context', label: 'Context', type: 'textarea', placeholder: 'Provide background information', required: true },
            { id: 'cta', label: 'Call to Action', type: 'text', placeholder: 'e.g., Schedule a demo, Buy now' },
            { id: 'tone', label: 'Tone', type: 'select', options: ['Professional', 'Casual', 'Friendly', 'Formal'], required: true },
        ],
    },
    {
        id: 'cold-outreach',
        name: 'Cold Outreach Email',
        description: 'Craft effective cold outreach emails',
        category: 'email',
        icon: '🎣',
        inputs: [
            { id: 'recipient', label: 'Recipient Type', type: 'text', placeholder: 'e.g., Marketing Director, CEO', required: true },
            { id: 'offer', label: 'Your Offer', type: 'textarea', placeholder: 'What are you offering?', required: true },
            { id: 'value', label: 'Value Proposition', type: 'text', placeholder: 'Why should they care?' },
        ],
    },

    // Ad Templates
    {
        id: 'google-ad',
        name: 'Google Ad Copy',
        description: 'Create effective Google Ads copy',
        category: 'ads',
        icon: '🎪',
        inputs: [
            { id: 'product', label: 'Product/Service', type: 'text', placeholder: 'e.g., Cloud Storage Solution', required: true },
            { id: 'benefit', label: 'Main Benefit', type: 'text', placeholder: 'e.g., Secure & Unlimited Storage', required: true },
            { id: 'keywords', label: 'Target Keywords', type: 'text', placeholder: 'e.g., cloud storage, file backup' },
            { id: 'cta', label: 'Call to Action', type: 'text', placeholder: 'e.g., Try Free, Get Started' },
        ],
    },
    {
        id: 'facebook-ad',
        name: 'Facebook Ad Primary Text',
        description: 'Generate engaging Facebook ad copy',
        category: 'ads',
        icon: '📱',
        inputs: [
            { id: 'product', label: 'Product/Service', type: 'text', placeholder: 'e.g., Fitness App', required: true },
            { id: 'audience', label: 'Target Audience', type: 'text', placeholder: 'e.g., Busy professionals', required: true },
            { id: 'benefit', label: 'Main Benefit', type: 'textarea', placeholder: 'What problem does it solve?' },
            { id: 'tone', label: 'Tone', type: 'select', options: ['Casual', 'Professional', 'Exciting', 'Urgent'], required: true },
        ],
    },
    {
        id: 'ad-headlines',
        name: 'Ad Headlines',
        description: 'Create compelling ad headlines',
        category: 'ads',
        icon: '💥',
        inputs: [
            { id: 'product', label: 'Product/Service', type: 'text', placeholder: 'e.g., Online Course Platform', required: true },
            { id: 'benefit', label: 'Main Benefit', type: 'text', placeholder: 'e.g., Learn at your own pace', required: true },
            { id: 'length', label: 'Max Length', type: 'number', placeholder: '30' },
        ],
    },
];

export const getTemplateById = (id: string): Template | undefined => {
    return templates.find(t => t.id === id);
};

export const getTemplatesByCategory = (category: string): Template[] => {
    return templates.filter(t => t.category === category);
};
