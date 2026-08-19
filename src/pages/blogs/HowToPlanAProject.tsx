import React from 'react';
import BlogLayoutContainer from '../../components/blogs/BlogLayoutContainer';
import {
  BlogTitle,
  BlogHeader,
  BlogDesc,
  BlogParagraph,
  WhiteBoldHighlight,
  BlogTip,
  BlogWarn,
  BlogUnorderedList,
  BlogTerminal,
  BlogCodeBlock,
  BlogAuthor,
} from '../../components/blogs/components';

export const HowToPlanAProject: React.FC = () => {
  return (
    <BlogLayoutContainer>
      <BlogTitle>How to Plan and Architect a Modern Full-Stack AI Project</BlogTitle>
      <BlogDesc>
        Architecting robust AI security middleware and RAG applications requires clean separation between prompt analysis, API layers, and user interface design.
      </BlogDesc>

      <BlogHeader>1. Define the Threat Surface & Data Pipeline</BlogHeader>
      <BlogParagraph>
        Before writing frontend or backend code, outline the precise pipeline. For security tools like <WhiteBoldHighlight>Agentic AI Security Middleware</WhiteBoldHighlight>, a multi-stage filtering strategy ensures high throughput while preserving deep semantic checks.
      </BlogParagraph>

      <BlogTip title="Pro Tip on Multi-Stage Pipelines">
        Use lightweight local/embedding models (like DeBERTa-v3) for fast initial threat filtering, followed by LLM API evaluation (like Claude 3.5 Sonnet) only for suspicious queries.
      </BlogTip>

      <BlogHeader>2. Setup Development Environment</BlogHeader>
      <BlogParagraph>
        Initialize your python environment with isolated dependencies and virtual environments:
      </BlogParagraph>

      <BlogTerminal
        title="Terminal setup"
        commands={[
          'python3 -m venv venv',
          'source venv/bin/activate',
          'pip install fastapi uvicorn langchain faiss-cpu anthropic',
        ]}
      />

      <BlogHeader>3. API Response Structure</BlogHeader>
      <BlogParagraph>
        Ensure all security check responses return clear, typed JSON payloads that frontend dashboards can instantly render:
      </BlogParagraph>

      <BlogCodeBlock
        language="JSON"
        filename="security_audit_response.json"
        code={`{
  "status": "blocked",
  "threat_score": 0.94,
  "detected_vector": "jailbreak_attempt",
  "pipeline_latency_ms": 142
}`}
      />

      <BlogWarn title="Avoid Hardcoding Secrets">
        Never commit API keys or database tokens to your GitHub repository. Always isolate them in `.env` files or environment variables.
      </BlogWarn>

      <BlogHeader>4. Essential Checklist</BlogHeader>
      <BlogUnorderedList
        items={[
          'Define clean TypeScript data interfaces for all state models.',
          'Isolate background workers from fast REST API routes.',
          'Validate prompt inputs using schema validation libraries.',
        ]}
      />

      <BlogAuthor>
        Dhiraj Bhavikatti is an AI & Web developer studying Information Science & Engineering at Sahyadri College, building security tools and open-source applications.
      </BlogAuthor>
    </BlogLayoutContainer>
  );
};

export default HowToPlanAProject;
