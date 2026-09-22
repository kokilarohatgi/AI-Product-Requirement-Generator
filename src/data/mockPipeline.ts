export const MOCK_INPUT = {
  product_idea: "AI-powered sprint retrospective tool for distributed engineering teams",
  industry: "B2B SaaS / Developer Tools",
  target_market: "Engineering teams of 5-50 at technology companies using Agile/Scrum methodologies",
  additional_requirements: "Must integrate with Jira and Slack. Mobile-friendly. GDPR compliant.",
}

export const MOCK_BA_OUTPUT = {
  problem_statement: {
    current_problem:
      "Distributed engineering teams struggle to run effective sprint retrospectives. Async participation is low, facilitation is a manual bottleneck, and action items rarely survive beyond the meeting they were raised in.",
    affected_users:
      "Engineering managers and developers at companies with remote or hybrid teams across multiple time zones.",
    pain_points: [
      "Low async participation — team members in different time zones frequently miss synchronous retros",
      "Facilitator bottleneck — retros require a dedicated person to run them consistently each sprint",
      "Action item tracking — insights from retros rarely translate into follow-through or measurable change",
      "Tool fragmentation — teams use ad-hoc Miro boards, sticky notes, or plain docs with no persistent structure",
    ],
    business_impact:
      "Teams ship slower, accumulate process debt, and experience higher turnover when retrospective learnings are not captured and acted on systematically.",
    why_it_matters:
      "The retrospective is the highest-leverage Agile ceremony for continuous improvement; making it accessible to async-first teams unlocks compounding productivity gains across every sprint.",
  },
  business_goals: {
    primary: [
      "Increase retrospective participation rates in distributed teams from an industry average of ~60% to 90%+",
      "Reduce facilitation overhead by automating AI-driven summaries and action-item extraction",
    ],
    secondary: [
      "Establish a data moat by capturing team health trends over time",
      "Drive Jira and Slack integration adoption to deepen workflow lock-in",
    ],
  },
  personas: [
    {
      name: "Maya",
      role: "Engineering Manager",
      background:
        "Manages a team of 8-12 engineers across 3 time zones. Runs bi-weekly sprints. Responsible for team health and velocity. (Assumption: uses Jira for project tracking)",
      goals: [
        "Run meaningful retrospectives without spending 2+ hours facilitating",
        "Surface recurring blockers before they become attrition risks",
        "Show stakeholders that process improvement is happening",
      ],
      pain_points: [
        "Half the team is always async and skips retros",
        "Action items get written down and immediately forgotten",
        "Manual synthesis of feedback takes 45+ minutes after each session",
      ],
      behaviors: [
        "Uses Slack for team communication, Jira for sprint management",
        "Prefers async-first workflows",
        "Reviews team metrics weekly",
      ],
      needs: [
        "Automated feedback collection with minimal friction for contributors",
        "AI-generated summaries and prioritized action items",
        "Integration with existing toolchain",
      ],
      assumptions_used: ["Assumption: team size 8-12", "Assumption: bi-weekly sprint cadence"],
    },
    {
      name: "Kai",
      role: "Senior Software Engineer",
      background:
        "Individual contributor on a distributed team. Participates in retros but often feels feedback does not lead to change. (Assumption: works primarily async)",
      goals: [
        "Submit retrospective feedback quickly, without sitting in a synchronous meeting",
        "See that feedback influenced decisions and action items",
        "Reduce overall meeting time",
      ],
      pain_points: [
        "Retro meetings scheduled at inconvenient times due to time zone differences",
        "No visibility into whether previous action items were completed",
        "Hesitant to raise sensitive issues without guaranteed anonymity",
      ],
      behaviors: [
        "Prefers written async communication",
        "Checks Slack throughout the day",
        "Skeptical of new tools that add overhead",
      ],
      needs: [
        "Frictionless async feedback submission (< 5 minutes)",
        "Confidence that submissions are anonymous or pseudonymous",
        "Closed-loop visibility on action item status",
      ],
      assumptions_used: [
        "Assumption: primarily async worker",
        "Assumption: values anonymity in feedback",
      ],
    },
  ],
  stakeholders: [
    { name: "Engineering Manager (Maya)", interest: "Operational efficiency and team health" },
    { name: "VP of Engineering", interest: "Aggregate team health metrics and process ROI" },
    { name: "Jira / Atlassian", interest: "External integration partner — API dependency" },
    { name: "Slack Technologies", interest: "External integration partner — notification delivery" },
  ],
  assumptions: [
    "Teams are using Agile/Scrum with 1-2 week sprints",
    "Jira and Slack are the primary tools; other integrations are future scope",
    "GDPR compliance is required due to European team members",
    "Mobile-friendly means responsive web, not a native app (TBD)",
  ],
  constraints: [
    "GDPR compliance required",
    "Must integrate with Jira and Slack APIs at launch",
    "No budget or timeline provided — TBD",
  ],
}

export const MOCK_PM_OUTPUT = {
  product_vision:
    "A lightweight, AI-native retrospective platform that lets distributed engineering teams submit feedback asynchronously, synthesize insights automatically, and track action items to completion — without needing a dedicated facilitator.",
  core_features: [
    {
      name: "Async Feedback Collection",
      description:
        "Structured forms for Start/Stop/Continue or custom prompts, submitted any time within the retro window",
      related_persona: "Kai",
    },
    {
      name: "AI Summary & Action Item Extraction",
      description:
        "LLM-powered synthesis of raw feedback into themes, sentiment, and prioritized action items",
      related_persona: "Maya",
    },
    {
      name: "Action Item Tracker",
      description:
        "Kanban-style board for retro action items with assignees, due dates, and status — synced to Jira",
      related_persona: "Maya",
    },
    {
      name: "Slack Notifications",
      description:
        "Automated Slack reminders for retro windows, summary delivery, and action item due dates",
      related_persona: "Maya",
    },
    {
      name: "Team Health Dashboard",
      description:
        "Historical trend charts showing participation rates, sentiment scores, and action item completion over time",
      related_persona: "Maya",
    },
  ],
  user_journey: [
    {
      stage: "Discovery",
      description:
        "Engineering Manager learns about the tool via a Slack app directory or word-of-mouth referral",
    },
    {
      stage: "Onboarding",
      description:
        "Maya connects her Jira workspace and Slack workspace, invites her team, and configures the first retro template",
    },
    {
      stage: "Retro Setup",
      description:
        "Maya schedules a retro, selects a template, and sets the submission window (e.g., 48 hours)",
    },
    {
      stage: "Async Feedback",
      description:
        "Kai receives a Slack notification, clicks through, and submits Start/Stop/Continue feedback in under 5 minutes",
    },
    {
      stage: "AI Synthesis",
      description:
        "After the window closes, the AI generates a summary, groups themes, and surfaces 3-5 action items",
    },
    {
      stage: "Review & Action",
      description:
        "Maya reviews the summary in the app, edits action items, assigns owners, and pushes them to Jira",
    },
    {
      stage: "Tracking",
      description:
        "Team sees action item status in the next retro dashboard, creating a closed feedback loop",
    },
  ],
  user_stories: [
    {
      id: "US-001",
      persona: "Maya",
      story:
        "As Maya, I want to schedule an async retrospective with a defined submission window so that my distributed team can participate without a synchronous meeting.",
      priority: "P0",
      acceptance_criteria: [
        "Manager can create a retro with a name, template, start date, and end date",
        "Team members receive a Slack notification when the retro window opens",
        "Submission window closes automatically at the configured end date/time",
        "Manager receives a Slack notification when the window closes",
      ],
    },
    {
      id: "US-002",
      persona: "Kai",
      story:
        "As Kai, I want to submit my retrospective feedback via a simple web form in under 5 minutes so that I do not have to attend a synchronous meeting.",
      priority: "P0",
      acceptance_criteria: [
        "Feedback form loads within 2 seconds of clicking the Slack link",
        "Form supports Start/Stop/Continue format with optional free-text per category",
        "Submission completes in a single click with a confirmation message",
        "Kai can edit their submission until the retro window closes",
      ],
    },
    {
      id: "US-003",
      persona: "Maya",
      story:
        "As Maya, I want the system to automatically generate a summary and action items from raw feedback so that I do not have to spend 45 minutes synthesizing responses.",
      priority: "P0",
      acceptance_criteria: [
        "AI summary is generated within 60 seconds of the retro window closing",
        "Summary groups feedback into at least 3 thematic clusters",
        "Summary surfaces 3-5 prioritized action items",
        "Maya can edit, reassign, or delete AI-generated action items before publishing",
      ],
    },
    {
      id: "US-004",
      persona: "Maya",
      story:
        "As Maya, I want to push approved action items to Jira so that they are tracked alongside sprint work.",
      priority: "P1",
      acceptance_criteria: [
        "Maya can connect a Jira workspace via OAuth",
        "Each action item can be pushed to a selected Jira project as a new issue",
        "Jira issue ID is stored and linked back in the retro action item view",
        "Status changes in Jira are reflected in the retro tool within 5 minutes",
      ],
    },
    {
      id: "US-005",
      persona: "Kai",
      story:
        "As Kai, I want to see the status of action items from previous retros so that I know whether my feedback led to real changes.",
      priority: "P1",
      acceptance_criteria: [
        "A Previous Retros view lists all past retros with action item completion rates",
        "Each action item shows current status: Open, In Progress, or Done",
        "Action items link out to their Jira issue when applicable",
        "View is read-only for non-manager team members",
      ],
    },
    {
      id: "US-006",
      persona: "Maya",
      story:
        "As Maya, I want a team health dashboard showing participation and sentiment trends so that I can identify process deterioration early.",
      priority: "P2",
      acceptance_criteria: [
        "Dashboard shows participation rate per retro over the last 6 sprints",
        "Dashboard shows aggregate sentiment score trend over the last 6 sprints",
        "Dashboard shows action item completion rate per retro",
        "Data updates within 1 hour of a retro window closing",
      ],
    },
  ],
  functional_requirements: [
    {
      id: "FR-001",
      requirement: "Retro Scheduling",
      priority: "P0",
      description:
        "Authenticated managers can create, edit, and cancel retrospective sessions with a name, template selection, team assignment, and time-bounded submission window.",
      acceptance_criteria: [
        "CRUD operations on retro sessions available to manager role",
        "Submission window enforced server-side — late submissions rejected",
        "Cancellation sends Slack notification to all team members",
      ],
      dependencies: ["FR-004 (Auth)", "FR-005 (Slack)"],
      traces_to: "US-001",
    },
    {
      id: "FR-002",
      requirement: "Async Feedback Submission",
      priority: "P0",
      description:
        "Team members access a web form via a unique retro link and submit Start/Stop/Continue feedback. Submissions are editable until the window closes.",
      acceptance_criteria: [
        "Link is unique per user per retro (prevents duplicate submissions)",
        "Submission persisted to database within 1 second",
        "Edit allowed until retro window end time; form shows locked state after",
        "Confirmation screen shown after submission",
      ],
      dependencies: ["FR-001", "FR-004 (Auth)"],
      traces_to: "US-002",
    },
    {
      id: "FR-003",
      requirement: "AI Summary Generation",
      priority: "P0",
      description:
        "After the retro window closes, an LLM pipeline processes all submissions and returns themed clusters, a narrative summary, and 3-5 prioritized action items.",
      acceptance_criteria: [
        "Processing begins automatically within 60 seconds of window close",
        "Output includes: summary paragraph, 3+ thematic clusters, 3-5 action items with suggested owner and priority",
        "Manager notified via Slack when summary is ready",
        "Manager can edit all AI-generated content before publishing to the team",
      ],
      dependencies: ["FR-001", "FR-002", "External: LLM API"],
      traces_to: "US-003",
    },
    {
      id: "FR-004",
      requirement: "Authentication & Authorization",
      priority: "P0",
      description:
        "Users authenticate via Slack OAuth. Roles: Manager (create/edit retros, view all submissions) and Contributor (submit feedback, view published summaries).",
      acceptance_criteria: [
        "Slack OAuth flow completes in under 10 seconds",
        "Manager role granted to workspace admin or explicitly assigned",
        "Contributor cannot access raw individual submissions",
        "Sessions expire after 30 days of inactivity",
      ],
      dependencies: ["External: Slack OAuth API"],
      traces_to: "US-001, US-002",
    },
    {
      id: "FR-005",
      requirement: "Slack Integration",
      priority: "P0",
      description:
        "Bot sends configurable notifications: retro open, retro closing soon (24h warning), retro closed, summary ready, action item due date reminders.",
      acceptance_criteria: [
        "Bot installable via Slack App Directory",
        "All notification types configurable (on/off) per workspace",
        "Retro open notification includes unique per-user submission link",
        "Notifications delivered within 60 seconds of trigger event",
      ],
      dependencies: ["External: Slack API", "FR-004 (Auth)"],
      traces_to: "US-001, US-002",
    },
    {
      id: "FR-006",
      requirement: "Jira Integration",
      priority: "P1",
      description:
        "Manager connects a Jira workspace via OAuth and can push individual action items as Jira issues. Status sync runs every 5 minutes.",
      acceptance_criteria: [
        "Jira OAuth flow available in workspace settings",
        "Manager selects target Jira project per action item push",
        "Jira issue ID stored and displayed as a link in the retro tool",
        "Bidirectional status sync: Done in Jira reflects as Done in retro tool",
      ],
      dependencies: ["External: Jira API (OAuth 2.0)", "FR-003"],
      traces_to: "US-004",
    },
    {
      id: "FR-007",
      requirement: "Previous Retros & Action Item History",
      priority: "P1",
      description:
        "All team members can view a chronological list of past retros, their published summaries, and the current status of each action item.",
      acceptance_criteria: [
        "List view shows retro name, date, participation rate, and action item completion rate",
        "Clicking a retro shows full summary and action item list with current statuses",
        "Jira-linked items show Jira status badge",
        "Individual submission data is never shown to non-managers",
      ],
      dependencies: ["FR-002", "FR-003", "FR-006"],
      traces_to: "US-005",
    },
    {
      id: "FR-008",
      requirement: "Team Health Dashboard",
      priority: "P2",
      description:
        "Manager-only view showing participation rate, sentiment trend, and action item completion rate over the last N retros.",
      acceptance_criteria: [
        "Charts render with data from at least 2 completed retros",
        "Participation, sentiment, and completion rate shown as line charts",
        "Dashboard updates within 1 hour of a retro closing",
        "Export to CSV available for all chart data",
      ],
      dependencies: ["FR-002", "FR-003"],
      traces_to: "US-006",
    },
  ],
  non_functional_requirements: [
    {
      id: "NFR-001",
      category: "Performance",
      requirement: "Feedback form load time",
      measurable_target:
        "Form loads in < 2 seconds on a 4G mobile connection (measured via Lighthouse LCP)",
    },
    {
      id: "NFR-002",
      category: "Security",
      requirement: "Data isolation between workspaces",
      measurable_target:
        "No cross-workspace data leakage — enforced at the database row level via workspace_id scoping on all queries",
    },
    {
      id: "NFR-003",
      category: "Privacy / Compliance",
      requirement: "GDPR compliance",
      measurable_target:
        "Data deletion requests fulfilled within 30 days; data processing agreement available; data stored in EU region by default",
    },
    {
      id: "NFR-004",
      category: "Accessibility",
      requirement: "WCAG 2.1 AA compliance",
      measurable_target:
        "All interactive elements keyboard-navigable; contrast ratio >= 4.5:1 for body text; screen-reader labels on all form inputs",
    },
    {
      id: "NFR-005",
      category: "Availability",
      requirement: "Uptime SLA",
      measurable_target: "99.5% monthly uptime excluding scheduled maintenance windows",
    },
  ],
  feature_prioritization: [
    {
      feature: "Retro Scheduling",
      priority: "Must Have",
      user_value: "High",
      business_value: "High",
      complexity: "Low",
      reason: "Core loop entry point — nothing works without it",
    },
    {
      feature: "Async Feedback Submission",
      priority: "Must Have",
      user_value: "High",
      business_value: "High",
      complexity: "Low",
      reason: "Primary differentiator for distributed teams",
    },
    {
      feature: "AI Summary Generation",
      priority: "Must Have",
      user_value: "High",
      business_value: "High",
      complexity: "High",
      reason: "Core value proposition; defines the product",
    },
    {
      feature: "Slack Integration",
      priority: "Must Have",
      user_value: "High",
      business_value: "High",
      complexity: "Medium",
      reason: "Required for async distribution and onboarding",
    },
    {
      feature: "Authentication (Slack OAuth)",
      priority: "Must Have",
      user_value: "Medium",
      business_value: "High",
      complexity: "Medium",
      reason: "Required for any multi-user product",
    },
    {
      feature: "Jira Integration",
      priority: "Should Have",
      user_value: "High",
      business_value: "High",
      complexity: "Medium",
      reason: "High-value for workflow lock-in; not day-1 blocker",
    },
    {
      feature: "Action Item History View",
      priority: "Should Have",
      user_value: "High",
      business_value: "Medium",
      complexity: "Low",
      reason: "Closes the feedback loop for contributors",
    },
    {
      feature: "Team Health Dashboard",
      priority: "Could Have",
      user_value: "Medium",
      business_value: "High",
      complexity: "Medium",
      reason: "Valuable for retention but not MVP critical",
    },
  ],
  mvp_scope: {
    in_scope: [
      "Retro scheduling with configurable time windows",
      "Async feedback submission via unique per-user links",
      "AI-generated summaries and action items (Start/Stop/Continue template only)",
      "Slack OAuth authentication",
      "Slack bot notifications (open, closing, summary ready)",
      "Action item editing and management by manager",
      "Published summary visible to all team members",
    ],
    out_of_scope: [
      "Jira integration (complex OAuth; prioritized for v1.1)",
      "Custom retro templates beyond Start/Stop/Continue (scope risk)",
      "Team health dashboard (requires data from multiple completed retros)",
      "Mobile native app (responsive web covers mobile use case for MVP)",
      "SSO / SAML (enterprise feature; TBD for enterprise tier)",
      "Multi-workspace admin panel",
    ],
  },
  future_enhancements: [
    "Jira and Linear integration for action item sync",
    "Custom retro template builder",
    "Team health dashboard with trend analysis",
    "Anonymous vs. attributed feedback mode toggle",
    "GitHub PR / commit correlation with team velocity metrics",
    "Enterprise SSO / SAML authentication",
    "Multi-team / organization-level dashboard for VPs of Engineering",
  ],
}

export const MOCK_VALIDATOR_OUTPUT = {
  validation_results: {
    completeness: { pass: true, issues: [] },
    consistency: { pass: true, issues: [] },
    testability: {
      pass: false,
      issues: [
        "NFR-003 GDPR requirement does not specify how data deletion is initiated by users — acceptance criteria needs a mechanism (e.g., in-app request form, email to DPA)",
      ],
    },
    hallucination_control: {
      pass: true,
      issues: [
        "Minor: BA output references ~60% industry average participation rate — this is labeled as an assumption, which is correct",
      ],
    },
    duplication: { pass: true, issues: [] },
    prioritization_sanity: {
      pass: true,
      issues: [
        "Note: FR-006 (Jira) is P1 but US-004 is also P1 — MVP scope correctly defers both to v1.1, which is consistent",
      ],
    },
    traceability: { pass: true, issues: [] },
  },
  scores: {
    completeness_score: 95,
    clarity_score: 88,
    consistency_score: 97,
    rag_grounding_score: 82,
    testability_score: 79,
    overall_quality_score: 88,
  },
  status: "APPROVED",
  revision_notes: [
    {
      target_agent: "Product Manager",
      issue:
        "NFR-003 GDPR measurable_target does not specify a user-facing mechanism for data deletion requests",
      suggested_fix:
        "Add: Users can request data deletion via an in-app settings page; request fulfilled within 30 days with email confirmation",
    },
  ],
  key_strengths: [
    "All P0 user stories have corresponding P0 functional requirements",
    "Every FR traces cleanly to a user story",
    "MVP scope is realistic and well-bounded — no P0/Must-Have features excluded",
    "Personas are grounded in the product idea with assumptions clearly labeled",
    "Acceptance criteria are specific and testable for all P0 requirements",
  ],
  key_gaps: [
    "GDPR deletion mechanism not specified in NFR-003",
    "No risk analysis provided by upstream agents — dedicated risk review recommended before implementation",
    "Mobile-friendliness requirement not fully reflected in NFRs (only mentioned in out-of-scope note)",
  ],
}
