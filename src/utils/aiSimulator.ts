import type { Template } from '../types';

// Simulated AI content generation with realistic delays
export const generateContent = async (
    template: Template,
    inputs: Record<string, string>
): Promise<string[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    const variations: string[] = [];

    switch (template.id) {
        case 'blog-post-outline':
            variations.push(generateBlogOutline(inputs));
            variations.push(generateBlogOutline(inputs, true));
            break;
        case 'blog-post-intro':
            variations.push(generateBlogIntro(inputs));
            variations.push(generateBlogIntro(inputs, true));
            break;
        case 'seo-meta-description':
            variations.push(generateMetaDescription(inputs));
            variations.push(generateMetaDescription(inputs, true));
            variations.push(generateMetaDescription(inputs, false, true));
            break;
        case 'product-description':
            variations.push(generateProductDescription(inputs));
            variations.push(generateProductDescription(inputs, true));
            break;
        case 'value-proposition':
            variations.push(generateValueProp(inputs));
            variations.push(generateValueProp(inputs, true));
            break;
        case 'landing-page-copy':
            variations.push(generateLandingPage(inputs));
            break;
        case 'instagram-caption':
            variations.push(generateInstagramCaption(inputs));
            variations.push(generateInstagramCaption(inputs, true));
            break;
        case 'twitter-thread':
            variations.push(generateTwitterThread(inputs));
            break;
        case 'linkedin-post':
            variations.push(generateLinkedInPost(inputs));
            variations.push(generateLinkedInPost(inputs, true));
            break;
        case 'email-subject-lines':
            variations.push(generateEmailSubjects(inputs));
            break;
        case 'email-body':
            variations.push(generateEmailBody(inputs));
            variations.push(generateEmailBody(inputs, true));
            break;
        case 'cold-outreach':
            variations.push(generateColdOutreach(inputs));
            break;
        case 'google-ad':
            variations.push(generateGoogleAd(inputs));
            variations.push(generateGoogleAd(inputs, true));
            break;
        case 'facebook-ad':
            variations.push(generateFacebookAd(inputs));
            variations.push(generateFacebookAd(inputs, true));
            break;
        case 'ad-headlines':
            variations.push(generateAdHeadlines(inputs));
            break;
        default:
            variations.push(`Generated content for ${inputs.topic || inputs.product || 'your request'}`);
    }

    return variations;
};

// Helper functions for each template type
function generateBlogOutline(inputs: Record<string, string>, alt = false): string {
    const topic = inputs.topic || 'Your Topic';
    if (alt) {
        return `# ${topic}: A Comprehensive Guide

## Introduction
- Hook: Why ${topic.toLowerCase()} matters now more than ever
- Brief overview of what readers will learn
- Personal anecdote or statistic

## Section 1: Understanding ${topic}
- Definition and background
- Current landscape and trends
- Why it's important

## Section 2: Key Benefits and Advantages
- Benefit #1: [Specific advantage]
- Benefit #2: [Another key benefit]
- Benefit #3: [Additional value]
- Real-world examples

## Section 3: Common Challenges and Solutions
- Challenge #1 and how to overcome it
- Challenge #2 and practical solutions
- Expert tips and best practices

## Section 4: Getting Started
- Step-by-step action plan
- Tools and resources needed
- Timeline and expectations

## Conclusion
- Recap of key points
- Final thoughts and encouragement
- Call to action`;
    }
    return `# ${topic}: Everything You Need to Know

## Introduction
- Attention-grabbing opening
- Why this topic matters
- What readers will gain

## Main Points

### 1. The Fundamentals
- Core concepts explained
- Background information
- Key terminology

### 2. Deep Dive into ${topic}
- Detailed exploration
- Case studies and examples
- Data and research

### 3. Practical Applications
- How to implement
- Step-by-step guide
- Common mistakes to avoid

### 4. Advanced Strategies
- Expert-level tips
- Optimization techniques
- Future trends

## Conclusion
- Summary of key takeaways
- Next steps for readers
- Resources for further learning`;
}

function generateBlogIntro(inputs: Record<string, string>, alt = false): string {
    const topic = inputs.topic || 'this topic';
    if (alt) {
        return `Picture this: You're struggling with ${topic.toLowerCase()}, feeling overwhelmed and unsure where to start. You're not alone. Thousands of people face this same challenge every single day.

But here's the good news: ${topic} doesn't have to be complicated. In fact, with the right approach and understanding, it can be surprisingly straightforward—and even enjoyable.

In this comprehensive guide, we're going to break down everything you need to know about ${topic.toLowerCase()}. Whether you're a complete beginner or looking to refine your existing knowledge, you'll discover practical insights and actionable strategies that you can implement immediately.

Ready to transform your understanding of ${topic.toLowerCase()}? Let's dive in.`;
    }
    return `Have you ever wondered why ${topic.toLowerCase()} has become such a hot topic lately? The answer might surprise you.

${topic} is revolutionizing the way we think about [industry/field], and if you're not paying attention, you're already falling behind. But don't worry—that's exactly why we've created this guide.

In the next few minutes, you're going to discover the essential insights about ${topic.toLowerCase()} that most people overlook. We'll explore the key benefits, common pitfalls, and proven strategies that actually work.

By the end of this article, you'll have a clear roadmap for mastering ${topic.toLowerCase()} and achieving the results you've been looking for. Let's get started.`;
}

function generateMetaDescription(inputs: Record<string, string>, alt = false, short = false): string {
    const topic = inputs.topic || 'this topic';
    const keywords = inputs.keywords || '';

    if (short) {
        return `Discover everything about ${topic}. Expert insights, tips & strategies. ${keywords ? `Learn about ${keywords} today!` : 'Read now!'}`;
    }
    if (alt) {
        return `Looking for information on ${topic}? Our comprehensive guide covers everything you need to know${keywords ? `, including ${keywords}` : ''}. Get expert insights and actionable tips now.`;
    }
    return `Learn about ${topic} with our complete guide. ${keywords ? `Discover ${keywords} and more.` : ''} Expert advice, proven strategies, and practical tips to help you succeed. Read more!`;
}

function generateProductDescription(inputs: Record<string, string>, alt = false): string {
    const product = inputs.product || 'Our Product';
    const features = inputs.features || 'amazing features';

    if (alt) {
        return `Introducing ${product} – the solution you've been waiting for.

${features}

Designed with you in mind, ${product} combines cutting-edge technology with intuitive design to deliver an unparalleled experience. Whether you're a professional or enthusiast, you'll appreciate the attention to detail and quality craftsmanship.

What sets ${product} apart:
• Premium materials and construction
• Thoughtful design that just works
• Backed by our satisfaction guarantee

Don't settle for less. Experience the difference with ${product}.

Order now and discover why thousands of customers trust ${product} for their needs.`;
    }
    return `Meet ${product} – where innovation meets excellence.

${features}

${product} isn't just another option on the market. It's a carefully crafted solution designed to exceed your expectations. Every detail has been thoughtfully considered to ensure you get the best possible experience.

Key highlights:
✓ Superior quality and performance
✓ User-friendly and intuitive
✓ Built to last

Join the growing community of satisfied customers who have made ${product} their go-to choice. Experience the difference today.`;
}

function generateValueProp(inputs: Record<string, string>, alt = false): string {
    const product = inputs.product || 'Our Solution';
    const problem = inputs.problem || 'common challenges';
    const benefit = inputs.benefit || 'better results';

    if (alt) {
        return `${product}: ${benefit}

Tired of ${problem}? We understand. That's exactly why we created ${product}.

${product} helps you overcome ${problem} so you can focus on what really matters. No more frustration, no more wasted time – just ${benefit}.

Simple. Effective. Proven.`;
    }
    return `${product} – ${benefit}

Stop struggling with ${problem}. ${product} provides the solution you need to achieve ${benefit} without the hassle.

Why choose ${product}?
• Solves ${problem} effectively
• Delivers ${benefit}
• Easy to use and implement

Transform the way you work. Try ${product} today.`;
}

function generateLandingPage(inputs: Record<string, string>): string {
    const product = inputs.product || 'Our Product';
    const audience = inputs.audience || 'professionals';
    const benefit = inputs.benefit || 'achieve more';

    return `# ${product}: Built for ${audience}

## ${benefit} – Starting Today

Are you ready to transform the way you work? ${product} is designed specifically for ${audience} who want to ${benefit} without the complexity.

### Why ${product}?

**Simple Yet Powerful**
No steep learning curve. No complicated setup. Just results.

**Built for ${audience}**
Every feature is designed with your needs in mind. We understand your challenges because we've been there.

**Proven Results**
Join thousands of ${audience} who are already using ${product} to ${benefit}.

### How It Works

1. **Get Started in Minutes** – Quick and easy setup
2. **Customize to Your Needs** – Flexible and adaptable
3. **See Results Immediately** – Start achieving ${benefit} right away

### Ready to Get Started?

Join the ${audience} who are already transforming their workflow with ${product}.

[Start Your Free Trial] [See Pricing]

No credit card required. Cancel anytime.`;
}

function generateInstagramCaption(inputs: Record<string, string>, alt = false): string {
    const topic = inputs.topic || 'this';
    const context = inputs.context || '';
    const includeHashtags = inputs.hashtags === 'Yes';

    const hashtags = includeHashtags ? '\n\n#instagood #photooftheday #inspiration #lifestyle #motivation #success #goals #mindset #growth #community' : '';

    if (alt) {
        return `${context || `Excited to share ${topic} with you all! 🌟`}

This is something I've been working on for a while, and I couldn't be more proud of how it turned out. The journey has been incredible, and I'm grateful for every step.

What do you think? Drop a comment below and let me know your thoughts! 👇

Double tap if you're feeling inspired! ❤️${hashtags}`;
    }
    return `✨ ${topic} ✨

${context || 'Here\'s something special I wanted to share with you today.'}

I believe that moments like these remind us of what truly matters. It's not about perfection—it's about progress, passion, and staying true to yourself.

Tag someone who needs to see this! 💫

What's inspiring you today? Share in the comments! 👇${hashtags}`;
}

function generateTwitterThread(inputs: Record<string, string>): string {
    const topic = inputs.topic || 'Important Topic';
    const points = inputs.points || 'key insights';
    const numTweets = parseInt(inputs.tweets) || 5;

    let thread = `🧵 Thread: ${topic}\n\nLet me break this down for you...\n\n1/${numTweets}\n\n---\n\n`;

    thread += `First, let's talk about why this matters.\n\n${points}\n\nThis is crucial because it affects how we approach the entire situation.\n\n2/${numTweets}\n\n---\n\n`;

    thread += `Here's what most people get wrong:\n\nThey focus on the surface-level stuff instead of understanding the fundamentals.\n\nThe key is to dig deeper and really understand the core principles.\n\n3/${numTweets}\n\n---\n\n`;

    thread += `So what should you do instead?\n\nStart by focusing on the basics. Master the fundamentals before moving to advanced strategies.\n\nThis approach has worked for thousands of people, and it can work for you too.\n\n4/${numTweets}\n\n---\n\n`;

    thread += `Bottom line:\n\n${topic} is more important than ever. Take action today, stay consistent, and you'll see results.\n\nFound this helpful? Retweet the first tweet to share with others!\n\n${numTweets}/${numTweets}`;

    return thread;
}

function generateLinkedInPost(inputs: Record<string, string>, alt = false): string {
    const topic = inputs.topic || 'professional insights';
    const message = inputs.message || 'valuable lessons';
    const cta = inputs.cta || 'Share your thoughts below';

    if (alt) {
        return `I've been thinking a lot about ${topic} lately.

Here's what I've learned:

${message}

This insight has completely changed my perspective on how I approach my work. It's not just about doing more—it's about doing what matters.

Three key takeaways:

1. Focus on impact, not just activity
2. Build genuine relationships, not just connections
3. Stay curious and keep learning

The professionals who thrive aren't necessarily the ones who work the hardest. They're the ones who work the smartest and stay adaptable.

${cta}

#ProfessionalDevelopment #CareerGrowth #Leadership #Success`;
    }
    return `${topic}

After years in this industry, I've come to realize something important:

${message}

This isn't just theory—it's based on real experience and countless conversations with industry leaders.

Here's what this means for you:

→ You don't need to have all the answers
→ You do need to ask the right questions
→ Success comes from consistent action, not perfect planning

The landscape is changing faster than ever. Those who adapt and embrace continuous learning will be the ones who succeed.

${cta}

What's your experience with this? I'd love to hear your perspective.

#Business #Innovation #GrowthMindset #ProfessionalDevelopment`;
}

function generateEmailSubjects(inputs: Record<string, string>): string {
    const purpose = inputs.purpose || 'important update';

    return `Here are 10 compelling subject lines for your ${purpose}:

1. You won't believe what we just launched...
2. [URGENT] Don't miss this opportunity
3. Quick question about your goals
4. This changed everything for us
5. Your exclusive invitation inside 🎁
6. We need to talk about ${purpose}
7. [Name], this is specifically for you
8. The secret to [desired outcome]
9. Last chance: ${purpose}
10. I made a mistake... (and how I fixed it)

Pro tip: Test A/B variations to see which resonates best with your audience!`;
}

function generateEmailBody(inputs: Record<string, string>, alt = false): string {
    const purpose = inputs.purpose || 'reach out';
    const context = inputs.context || 'share something important';
    const cta = inputs.cta || 'learn more';

    if (alt) {
        return `Hi [Name],

I hope this email finds you well.

I wanted to ${purpose} because ${context}

Here's why this matters to you:

• [Benefit 1]: Specific value you'll receive
• [Benefit 2]: Another key advantage
• [Benefit 3]: Additional benefit

I understand you're busy, so I'll keep this brief. The bottom line is that this could make a real difference for you.

Would you be interested in taking the next step? Simply ${cta} and we'll take it from there.

Looking forward to hearing from you.

Best regards,
[Your Name]

P.S. If you have any questions, just hit reply. I'm here to help.`;
    }
    return `Subject: ${purpose}

Hi [Name],

I'm reaching out because ${context}

You might be wondering why this is relevant to you. Here's the thing:

${context}

This is exactly why I thought of you. Based on [specific reason], I believe this could be valuable for your [specific goal/challenge].

Here's what I propose:

${cta}

No pressure—just an opportunity I thought you'd want to know about.

What do you think? Hit reply and let me know.

Best,
[Your Name]`;
}

function generateColdOutreach(inputs: Record<string, string>): string {
    const recipient = inputs.recipient || 'professional';
    const offer = inputs.offer || 'valuable solution';
    const value = inputs.value || 'significant results';

    return `Subject: Quick question, [Name]

Hi [Name],

I came across [Company Name] and was impressed by [specific detail about their work].

I'm reaching out because I work with ${recipient}s who are looking to ${value}. Based on what I've seen, I thought this might be relevant to you.

${offer}

I don't want to take up too much of your time, so here's my question:

Would you be open to a brief 15-minute conversation to explore if this could be valuable for [Company Name]?

If it's not a fit, no worries at all. But if it is, it could ${value}.

Are you available for a quick call this week?

Best regards,
[Your Name]
[Your Title]
[Contact Information]

P.S. No sales pitch, I promise. Just a genuine conversation to see if we can help.`;
}

function generateGoogleAd(inputs: Record<string, string>, alt = false): string {
    const product = inputs.product || 'Product';
    const benefit = inputs.benefit || 'Amazing Benefits';
    const cta = inputs.cta || 'Learn More';

    if (alt) {
        return `**Headline 1:** ${product} - ${benefit}
**Headline 2:** Get Started Today | Free Trial
**Headline 3:** Trusted by Thousands

**Description 1:** Discover how ${product} can help you achieve ${benefit}. Easy to use, proven results. Start your free trial today!

**Description 2:** ${benefit} with ${product}. No credit card required. Join thousands of satisfied customers. ${cta} now!

**Display Path:** www.example.com/${product.toLowerCase().replace(/\s+/g, '-')}`;
    }
    return `**Headline 1:** ${benefit} | ${product}
**Headline 2:** Start Free Trial - No Credit Card
**Headline 3:** ${product} - Trusted Solution

**Description 1:** ${product} helps you achieve ${benefit}. Simple, powerful, and effective. Try it free for 14 days!

**Description 2:** Join thousands who trust ${product} for ${benefit}. Easy setup, instant results. ${cta} today!

**Display Path:** www.example.com/get-started`;
}

function generateFacebookAd(inputs: Record<string, string>, alt = false): string {
    const product = inputs.product || 'Product';
    const audience = inputs.audience || 'people';
    const benefit = inputs.benefit || 'solve your problems';

    if (alt) {
        return `Attention ${audience}! 👋

Tired of struggling with [common problem]? You're not alone.

${product} was designed specifically for ${audience} who want to ${benefit} without the hassle.

✅ Easy to use
✅ Proven results
✅ Trusted by thousands

Here's what makes us different:

${benefit}

Ready to see the difference? Click below to get started with our risk-free trial.

No credit card required. Cancel anytime.

[Learn More Button]`;
    }
    return `Hey ${audience}! 

What if you could ${benefit} in half the time?

${product} makes it possible. 

We've helped thousands of ${audience} achieve incredible results, and we can help you too.

Here's how it works:
→ Step 1: Quick & easy setup
→ Step 2: Customize to your needs  
→ Step 3: See results immediately

The best part? You can try it completely free.

Click below to start your free trial today. No credit card needed.

[Get Started Now]

Join the ${audience} who are already transforming their results with ${product}! 🚀`;
}

function generateAdHeadlines(inputs: Record<string, string>): string {
    const product = inputs.product || 'Product';
    const benefit = inputs.benefit || 'Get Results';

    return `Here are 15 compelling ad headlines for ${product}:

1. ${benefit} - Try ${product} Free
2. ${product}: The Smart Choice
3. Get ${benefit} Today
4. ${product} - Trusted by Thousands
5. ${benefit} Made Simple
6. Try ${product} Risk-Free
7. ${benefit} Starts Here
8. ${product} - See Results Fast
9. The Ultimate ${product} Solution
10. ${benefit} Without the Hassle
11. ${product}: Your Success Partner
12. Achieve ${benefit} Easily
13. ${product} - Start Free Trial
14. ${benefit} in Minutes
15. Join Thousands Using ${product}

Mix and match these headlines with your ad copy for maximum impact!`;
}
