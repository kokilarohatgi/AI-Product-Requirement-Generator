# AI Product Requirement Generator

An AI-powered Product Requirement Document (PRD) Generator that transforms a product idea and business context into a structured, validated, and actionable Product Requirements Document.

The system uses an AI-powered n8n workflow to generate the PRD, validate its quality, revise it when necessary, and return the final structured output to the React frontend.

---

## Features

- AI-powered PRD generation
- Product idea and business context input
- Industry and target-market specification
- Structured Target Users & Personas
- Product goals and measurable metrics
- User stories
- Functional requirements
- Non-functional requirements
- Feature prioritization
- MVP scope definition
- Technical requirements
- Acceptance criteria
- Risks and assumptions
- Future enhancements
- Automated PRD validation
- Automatic revision when validation identifies issues
- Structured JSON response
- React-based web interface
- n8n workflow integration
- Responsive interface
- Copy generated JSON
- Generate multiple PRDs from different product ideas

---

## System Architecture

```text
                    +----------------------+
                    |        User          |
                    | Product Idea +       |
                    | Business Context     |
                    +----------+-----------+
                               |
                               v
                    +----------------------+
                    |    React Frontend    |
                    |      Vite + TS       |
                    +----------+-----------+
                               |
                               | HTTP POST
                               v
              +----------------------------------+
              |           n8n Workflow            |
              |                                  |
              |  1. Ingest / Prepare Input       |
              |              |                   |
              |              v                   |
              |  2. Generate PRD                 |
              |              |                   |
              |              v                   |
              |  3. Validate PRD                 |
              |              |                   |
              |              v                   |
              |       Needs Revision?             |
              |          /        \               |
              |        YES        NO              |
              |         |          |              |
              |         v          v              |
              |   Revise PRD    Finalize          |
              |         |          |              |
              |         v          |              |
              |   Validate Again   |              |
              |         |          |              |
              |         +----+-----+              |
              |              |                    |
              |              v                    |
              |        Return Final PRD           |
              +---------------+------------------+
                              |
                              v
                    +----------------------+
                    |    React Frontend    |
                    |                      |
                    | Structured PRD +     |
                    | Validation Results   |
                    +----------------------+
```

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- HTML5
- CSS3

### AI & Automation
- n8n
- Large Language Model (LLM)
- Structured JSON generation
- Automated validation
- Automated revision loop

### Backend / Workflow
- n8n Cloud
- Webhook API
- HTTP POST requests
- JSON-based communication

### Development Tools
- VS Code
- Git
- GitHub
- npm

---

## Project Structure

```text
AI-Product-Requirement-Generator/
|
+-- public/
|
+-- src/
|   +-- App.tsx
|   +-- main.tsx
|   +-- index.css
|   +-- ...
|
+-- .gitignore
+-- index.html
+-- package.json
+-- package-lock.json
+-- tsconfig.json
+-- vite.config.ts
+-- README.md
```

### Important Files

| File | Purpose |
|------|---------|
| `src/App.tsx` | Main React application and PRD interface |
| `src/main.tsx` | React application entry point |
| `src/index.css` | Application styling |
| `package.json` | Project dependencies and scripts |
| `vite.config.ts` | Vite configuration |
| `README.md` | Project documentation |

---

## How It Works

### 1. User Input

The user provides:

- Product Idea
- Industry
- Target Market
- Additional Requirements

Example:

```text
Product Idea:
AI-powered sprint retrospective tool for distributed engineering teams

Industry:
B2B SaaS / Developer Tools

Target Market:
Engineering teams of 5-50 at technology companies using Agile/Scrum

Additional Requirements:
Must integrate with Jira and Slack. Mobile-friendly. GDPR compliant.
```

### 2. Frontend Request

The React application sends the input to the n8n webhook using an HTTP POST request.

```text
React
  |
  v
HTTP POST
  |
  v
n8n Webhook
```

### 3. Input Preparation

The n8n workflow validates and normalizes the incoming information. Missing optional fields are given default values so that the AI pipeline receives a consistent input structure.

### 4. AI PRD Generation

The LLM processes the product context and generates a structured PRD containing:

- Product Overview & Vision
- Problem Statement
- Target Users & Personas
- Goals
- User Stories
- Functional Requirements
- Non-Functional Requirements
- Feature Prioritization
- MVP Scope
- Technical Requirements
- Acceptance Criteria
- Risks & Assumptions
- Future Enhancements

### 5. PRD Validation

The generated PRD is evaluated against:

- Completeness
- Clarity
- Consistency
- Grounding
- Testability

### 6. Revision Loop

If the PRD does not satisfy the validation requirements:

```text
Generated PRD
     |
     v
Validation
     |
     v
Needs Revision?
     |
    YES
     |
     v
Revise PRD
     |
     v
Validate Again
```

If the PRD passes validation:

```text
Validation
    |
    v
PASSED
    |
    v
Finalize
    |
    v
Return PRD
```

### 7. Frontend Display

The final structured PRD is returned to the React application and displayed in a readable interface.

The user can review:

- Product vision
- Personas
- Goals
- Requirements
- User stories
- MVP scope
- Technical requirements
- Acceptance criteria
- Risks
- Future enhancements
- Validation scores

---

## Key Technical Concepts

### 1. Large Language Models

The project uses an LLM to transform unstructured product ideas into structured product requirements.

### 2. Structured JSON Output

The AI output follows a predefined JSON structure.

```json
{
  "problemStatement": "...",
  "targetUsersPersonas": [],
  "goals": [],
  "userStories": [],
  "functionalRequirements": [],
  "nonFunctionalRequirements": [],
  "featurePrioritization": [],
  "mvpScope": {},
  "technicalRequirements": [],
  "acceptanceCriteria": []
}
```

This makes the AI response predictable and easier for the frontend to render.

### 3. AI Validation

The generated PRD is evaluated before being accepted as the final output.

```text
Generate
   |
   v
Validate
   |
   v
Revise if necessary
   |
   v
Validate
   |
   v
Finalize
```

### 4. Human-to-AI Workflow

```text
Human Input
     +
AI Processing
     +
Structured Output
     +
Automated Validation
     +
Revision
     =
Structured PRD
```

### 5. Webhook-Based Integration

The React frontend communicates with the n8n workflow through an HTTP webhook.

```text
React Application
       |
       | POST
       v
   n8n Workflow
       |
       v
      LLM
       |
       v
  Structured PRD
```

---

## Installation

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/AI-Product-Requirement-Generator.git
cd AI-Product-Requirement-Generator
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure the n8n Webhook

The frontend communicates with the n8n workflow using the configured webhook endpoint.

```typescript
const API_URL =
  "https://selenablanc.app.n8n.cloud/webhook/prd-generate";
```

If you deploy your own n8n workflow, replace this URL with your webhook endpoint.

### 4. Start the Development Server

```bash
npm run dev
```

Vite will provide a local development URL.

### 5. Build for Production

```bash
npm run build
```

---

## API Flow

### Request

```json
{
  "productIdea": "AI-powered sprint retrospective tool",
  "industry": "B2B SaaS / Developer Tools",
  "targetMarket": "Engineering teams using Agile/Scrum",
  "additionalRequirements": "Jira and Slack integration"
}
```

### Response

```json
{
  "success": true,
  "data": {
    "prd": {},
    "validation": {},
    "meta": {}
  }
}
```

---

## Security

The frontend communicates with the n8n workflow through a webhook.

Do not commit confidential credentials or API keys to GitHub.

Never store credentials such as:

```text
OPENAI_API_KEY
SUPABASE_SERVICE_ROLE_KEY
AWS_SECRET_ACCESS_KEY
GITHUB_TOKEN
```

directly in frontend source code.

Sensitive credentials should remain in the backend/workflow environment.

---

## Future Enhancements

- User authentication
- PRD history and version control
- Save generated PRDs to a database
- Export PRD as PDF
- Export PRD as DOCX
- Markdown export
- Custom PRD templates
- Multiple LLM provider support
- Advanced AI evaluation
- PRD comparison and version diff
- Team collaboration
- Comments and approvals
- Jira integration
- Slack integration
- GitHub integration
- AI-powered requirement refinement
- Requirement traceability
- Analytics dashboard
- Custom validation rules
- Industry-specific PRD generation

---

## Project Objective

The objective of this project is to reduce the manual effort required to create Product Requirement Documents by combining:

```text
User Input
    +
LLM Generation
    +
Structured Output
    +
Automated Validation
    +
Revision
    =
Structured PRD
```

---

## Author

**Kokila Rohatgi**

B.Tech Computer Science Engineering
