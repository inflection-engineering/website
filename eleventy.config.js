import markdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import markdownItContainer from "markdown-it-container";
import markdownItAnchor from "markdown-it-anchor";

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
    .use(markdownItAnchor)
    .use(markdownItContainer, 'info')
    .use(markdownItContainer, 'warning')
    .use(markdownItContainer, 'success');
  
  // Override default renderer for common elements
  markdownLib.renderer.rules.heading_open = function (tokens, idx) {
    const token = tokens[idx];
    const level = token.tag;

    // Get existing id attribute if it exists (from markdown-it-anchor)
    const idAttr = token.attrGet('id');
    const idAttribute = idAttr ? ` id="${idAttr}"` : '';

    const classes = {
      h1: 'text-4xl font-bold mb-6 mt-8 text-base-content',
      h2: 'text-3xl font-bold mb-4 mt-8 text-base-content',
      h3: 'text-2xl font-bold mb-3 mt-6 text-base-content',
      h4: 'text-xl font-bold mb-2 mt-4 text-base-content',
      h5: 'text-lg font-bold mb-2 mt-3 text-base-content',
      h6: 'text-md font-bold mb-2 mt-2 text-base-content'
    };
    return `<${level}${idAttribute} class="${classes[level] || ''}">`;
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
    return '<hr class="my-8 border-base-300">';
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
  
  // Add limit filter for arrays
  eleventyConfig.addFilter("limit", function(array, limit) {
    return array.slice(0, limit);
  });

  // Remove numeric prefix from slugs
  eleventyConfig.addFilter("removeNumberPrefix", function(slug) {
    return slug.replace(/^\d+-/, '');
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