import markdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import markdownItContainer from "markdown-it-container";
import { twMerge } from 'tailwind-merge';

export default function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("assets");
  
  // Watch CSS files for changes
  eleventyConfig.addWatchTarget("src/**/*.css");
  
  // Configure markdown processor with Tailwind classes
  const markdownLib = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAttrs)
    .use(markdownItContainer, 'info')
    .use(markdownItContainer, 'warning')
    .use(markdownItContainer, 'success');
  
  // Override default renderer for common elements
  markdownLib.renderer.rules.heading_open = function (tokens, idx) {
    const token = tokens[idx];
    const level = token.tag;

    // Get existing id and class attributes
    let idAttr = token.attrGet('id');
    const classAttr = token.attrGet('class');

    // If no id is set, generate one from the heading text
    if (!idAttr) {
      // Look ahead to the next token to get the heading text
      const nextToken = tokens[idx + 1];
      if (nextToken && nextToken.type === 'inline' && nextToken.content) {
        // Convert heading text to a URL-friendly slug
        idAttr = nextToken.content
          .toLowerCase()
          .replace(/[^\w\s-]/g, '') // Remove special characters
          .replace(/\s+/g, '-')      // Replace spaces with hyphens
          .replace(/-+/g, '-')       // Replace multiple hyphens with single hyphen
          .trim();
      }
    }

    const idAttribute = idAttr ? ` id="${idAttr}"` : '';

    const defaultClasses = {
      h1: 'text-4xl mb-6 mt-8 scroll-mt-24',
      h2: 'text-3xl mb-4 mt-8 scroll-mt-24',
      h3: 'text-2xl mb-3 mt-6 scroll-mt-24',
      h4: 'text-xl mb-2 mt-4 scroll-mt-24',
      h5: 'text-lg mb-2 mt-3 scroll-mt-24',
      h6: 'text-md mb-2 mt-2 scroll-mt-24'
    };

    const allClasses = twMerge(
      'font-bold text-base-content',
      defaultClasses[level],
      classAttr
    );
    return `<${level}${idAttribute} class="${allClasses}">`;
  };
  
  markdownLib.renderer.rules.paragraph_open = function () {
    return '<p class="mb-4 text-base-content leading-relaxed">';
  };
  
  markdownLib.renderer.rules.bullet_list_open = function () {
    return '<ul class="list-disc list-inside mb-4 space-y-2 text-base-content">';
  };
  
  markdownLib.renderer.rules.ordered_list_open = function () {
    return '<ol class="list-decimal list-inside mb-4 space-y-2 text-base-content">';
  };
  
  markdownLib.renderer.rules.blockquote_open = function () {
    return '<blockquote class="border-l-4 border-primary pl-4 py-2 mb-4 bg-base-200 rounded-r-lg italic text-base-content">';
  };
  
  markdownLib.renderer.rules.hr = function () {
    return '<hr class="my-24 w-4 mx-auto border-base-100">';
  };
  
  markdownLib.renderer.rules.code_inline = function (tokens, idx) {
    const token = tokens[idx];
    return `<code class="bg-base-200 text-accent px-2 py-1 rounded text-sm font-mono">${token.content}</code>`;
  };
  
  markdownLib.renderer.rules.fence = function (tokens, idx) {
    const token = tokens[idx];
    const langClass = token.info ? ` language-${token.info.trim()}` : '';
    return `<pre class="bg-base-300 rounded-lg p-4 mb-4 overflow-x-auto"><code class="text-sm font-mono text-base-content${langClass}">${token.content}</code></pre>`;
  };

  eleventyConfig.setLibrary("md", markdownLib);

  /* Collections */

  const bySlug = (a, b) => a.inputPath.localeCompare(b.inputPath)
  const temporally = (a, b) => b.date - a.date;
  
  eleventyConfig.addCollection("caseStudies", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/case-studies/*.md").sort(temporally);
  });

  eleventyConfig.addCollection("pages", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/pages/*.md").sort(temporally);
  });

  eleventyConfig.addCollection("homepageCarousel", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/homepage-carousel/*.md").sort(bySlug);
  });
  
  // Add date filter for formatting
  eleventyConfig.addFilter("dateDisplay", function(date) {
    return new Date(date).toLocaleDateString("en-GB", {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  // Add date filter for current year
  eleventyConfig.addFilter("date", function(date, format) {
    const d = date === "now" ? new Date() : new Date(date);
    if (format === "YYYY") {
      return d.getFullYear();
    }
    return d;
  });
  
  // Add limit filter for arrays
  eleventyConfig.addFilter("limit", function(array, limit) {
    return array.slice(0, limit);
  });

  // Remove numeric prefix from slugs
  eleventyConfig.addFilter("removeNumberPrefix", function(slug) {
    return slug.replace(/^\d+-/, '');
  });

  eleventyConfig.addFilter("markdown", function(content) {
    return markdownLib.render(content);
  });

  // Theme labels helper
  eleventyConfig.addFilter("themeLabel", function(themeKey) {
    const themeLabels = {
      tech: '🛠️ Deep Tech & Systems',
      strategy: '🎯 Strategy & Prioritisation',
      org: '👥 Org Design & Leadership',
      culture: '🏛️ Culture & Ownership',
      ops: '📈 Inflection & Operating Model'
    };

    if (!themeLabels[themeKey]) {
      throw new Error(`Unknown theme ${themeKey}`)
    }

    return themeLabels[themeKey];
  });

  // Get max theme value
  eleventyConfig.addFilter("maxThemeValue", function(themes) {
    if (!themes) return 0;
    return Math.max(...Object.values(themes));
  });
  
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      layouts: "_layouts"
    },
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};