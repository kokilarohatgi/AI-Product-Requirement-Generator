import { FormEvent, useMemo, useState } from "react";

const API_URL =
  "https://selenablanc.app.n8n.cloud/webhook/prd-generate";

type FormData = {
  productIdea: string;
  industry: string;
  targetMarket: string;
  additionalRequirements: string;
};

type Validation = {
  passed: boolean;
  revised: boolean;
  scores?: {
    completeness?: number;
    clarity?: number;
    consistency?: number;
    grounding?: number;
    testability?: number;
  };
  issues?: Array<{
    criterion?: string;
    description?: string;
    suggestedFix?: string;
  }>;
};

type PRD = {
  productOverviewAndVision?: {
    overview?: string;
    vision?: string;
  };
  problemStatement?: string;
  targetUsersPersonas?: Array<{
    name?: string;
    description?: string;
    needs?: string[];
    painPoints?: string[];
  }>;
  goals?: Array<{
    goal?: string;
    metric?: string;
  }>;
  userStories?: Array<{
    id?: string;
    asA?: string;
    iWant?: string;
    soThat?: string;
  }>;
  functionalRequirements?: Array<{
    id?: string;
    requirement?: string;
  }>;
  nonFunctionalRequirements?: Array<{
    id?: string;
    category?: string;
    requirement?: string;
  }>;
  featurePrioritization?: Array<{
    feature?: string;
    priority?: string;
    rationale?: string;
  }>;
  mvpScope?: {
    included?: string[];
    excluded?: string[];
    summary?: string;
  };
  technicalRequirements?: Array<{
    area?: string;
    requirement?: string;
  }>;
  acceptanceCriteria?: Array<{
    relatedTo?: string;
    criteria?: string[];
  }>;
  risksAndAssumptions?: {
    risks?: Array<{
      risk?: string;
      mitigation?: string;
    }>;
    assumptions?: string[];
  };
  futureEnhancements?: string[];
};

type ApiResponse = {
  success?: boolean;
  data?: {
    prd?: PRD;
    validation?: Validation;
    meta?: {
      generatedAt?: string;
      inputs?: FormData;
    };
  };
};

const EXAMPLE: FormData = {
  productIdea:
    "AI-powered sprint retrospective tool for distributed engineering teams",
  industry: "B2B SaaS / Developer Tools",
  targetMarket:
    "Engineering teams of 5-50 at technology companies using Agile/Scrum methodologies",
  additionalRequirements:
    "Must integrate with Jira and Slack. Mobile-friendly. GDPR compliant.",
};

const initialForm: FormData = {
  productIdea: "",
  industry: "",
  targetMarket: "",
  additionalRequirements: "",
};

function asArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter(Boolean).map((item) => String(item));
  }

  // Some LLM/n8n responses may return arrays as JSON strings.
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed)
        ? parsed.filter(Boolean).map((item) => String(item))
        : [];
    } catch {
      return value.trim() ? [value.trim()] : [];
    }
  }

  return [];
}

type PersonaView = {
  name: string;
  description: string;
  needs: string[];
  painPoints: string[];
};

function normalizePersonas(value: unknown): PersonaView[] {
  let raw: unknown = value;

  // Handle a JSON-stringified targetUsersPersonas array.
  if (typeof raw === "string") {
    try {
      raw = JSON.parse(raw);
    } catch {
      return [];
    }
  }

  // Handle wrapper objects such as { personas: [...] }.
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const obj = raw as Record<string, unknown>;
    raw =
      obj.personas ??
      obj.targetUsersPersonas ??
      obj.target_users_personas ??
      [];
  }

  if (!Array.isArray(raw)) return [];

  return raw
    .filter((item) => item && typeof item === "object")
    .map((item) => {
      const persona = item as Record<string, unknown>;

      return {
        name: String(
          persona.name ??
            persona.role ??
            persona.persona ??
            "Persona",
        ),
        description: String(
          persona.description ??
            persona.profile ??
            persona.summary ??
            "",
        ),
        needs: asArray(persona.needs ?? persona.goals ?? []),
        painPoints: asArray(
          persona.painPoints ??
            persona.pain_points ??
            persona.painPointsAndProblems ??
            [],
        ),
      };
    });
}

function App() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const prd = result?.data?.prd;
  const validation = result?.data?.validation;

  const statusText = useMemo(() => {
    if (loading) return "Generating and validating PRD…";
    if (result?.success) {
      return validation?.revised
        ? "PRD generated, revised, and validated"
        : "PRD generated and validated";
    }
    return "Ready to generate";
  }, [loading, result, validation]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.productIdea.trim()) {
      setError("Product Idea is required.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const raw = await response.text();

      let data: ApiResponse;
      try {
        data = JSON.parse(raw) as ApiResponse;
      } catch {
        throw new Error(
          `n8n returned a non-JSON response (HTTP ${response.status}).`,
        );
      }

      if (!response.ok) {
        throw new Error(
          `Request failed with HTTP ${response.status}.`,
        );
      }

      if (!data.success || !data.data?.prd) {
        throw new Error(
          "The workflow completed, but no PRD was returned.",
        );
      }

      // n8n/LLM configurations can return the PRD as a JSON string.
      if (typeof data.data.prd === "string") {
        try {
          data.data.prd = JSON.parse(data.data.prd) as PRD;
        } catch {
          throw new Error(
            "The workflow returned an invalid PRD JSON string.",
          );
        }
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while generating the PRD.",
      );
    } finally {
      setLoading(false);
    }
  }

  function loadExample() {
    setForm(EXAMPLE);
    setError("");
  }

  function reset() {
    setForm(initialForm);
    setResult(null);
    setError("");
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <div className="eyebrow">AI PRODUCT REQUIREMENT GENERATOR</div>
          <h1>From product idea to structured PRD.</h1>
          <p>
            Submit your product context and the n8n AI pipeline will generate,
            validate, revise when needed, and return a structured PRD.
          </p>
        </div>

        <div className={`status-pill ${loading ? "working" : ""}`}>
          <span className="status-dot" />
          {statusText}
        </div>
      </header>

      {!result && (
        <section className="workspace">
          <form className="card input-card" onSubmit={handleSubmit}>
            <div className="section-heading">
              <span>01</span>
              <div>
                <h2>Product input</h2>
                <p>Provide the context the PRD pipeline should use.</p>
              </div>
            </div>

            <label>
              Product Idea <span>*</span>
              <textarea
                required
                rows={5}
                value={form.productIdea}
                onChange={(e) =>
                  setForm({ ...form, productIdea: e.target.value })
                }
                placeholder="Describe the product you want to build…"
              />
            </label>

            <div className="two-column">
              <label>
                Industry
                <input
                  value={form.industry}
                  onChange={(e) =>
                    setForm({ ...form, industry: e.target.value })
                  }
                  placeholder="e.g. B2B SaaS / Developer Tools"
                />
              </label>

              <label>
                Target Market
                <input
                  value={form.targetMarket}
                  onChange={(e) =>
                    setForm({ ...form, targetMarket: e.target.value })
                  }
                  placeholder="Who is the product for?"
                />
              </label>
            </div>

            <label>
              Additional Requirements
              <textarea
                rows={4}
                value={form.additionalRequirements}
                onChange={(e) =>
                  setForm({
                    ...form,
                    additionalRequirements: e.target.value,
                  })
                }
                placeholder="Integrations, compliance, platforms, constraints…"
              />
            </label>

            {error && <div className="error-box">{error}</div>}

            <div className="form-actions">
              <button
                type="button"
                className="button secondary"
                onClick={loadExample}
              >
                Load example
              </button>

              <button
                type="submit"
                className="button primary"
                disabled={loading}
              >
                {loading ? "Generating…" : "Generate PRD →"}
              </button>
            </div>
          </form>

          <aside className="card architecture-card">
            <div className="section-heading">
              <span>02</span>
              <div>
                <h2>Live workflow</h2>
                <p>Your request is processed by the n8n pipeline.</p>
              </div>
            </div>

            <WorkflowStep label="Input" detail="Product context" />
            <WorkflowStep label="Generate PRD" detail="LLM structured output" />
            <WorkflowStep label="Validate PRD" detail="5 quality criteria" />
            <WorkflowStep
              label="Revise if needed"
              detail="Reviewer feedback loop"
            />
            <WorkflowStep label="Finalize" detail="Validated JSON response" />
          </aside>
        </section>
      )}

      {result && prd && (
        <section className="results">
          <div className="results-toolbar">
            <div>
              <div className="eyebrow">GENERATED RESULT</div>
              <h2>Product Requirements Document</h2>
            </div>

            <div className="toolbar-actions">
              <button
                className="button secondary"
                onClick={() =>
                  navigator.clipboard?.writeText(
                    JSON.stringify(result, null, 2),
                  )
                }
              >
                Copy JSON
              </button>
              <button className="button secondary" onClick={reset}>
                ← New PRD
              </button>
            </div>
          </div>

          <div className="result-grid">
            <article className="card prd-card">
              <div className="prd-title">
                <div className="eyebrow">PRODUCT REQUIREMENTS DOCUMENT</div>
                <h1>
                  {form.productIdea || "Generated Product Requirements"}
                </h1>
                <p>
                  {prd.productOverviewAndVision?.overview ||
                    "Structured requirements generated from the submitted product context."}
                </p>
              </div>

              <PrdSection title="Problem Statement">
                <p>{prd.problemStatement || "Not provided."}</p>
              </PrdSection>

              <PrdSection title="Product Vision">
                <p>
                  {prd.productOverviewAndVision?.vision || "Not provided."}
                </p>
              </PrdSection>

              <PrdSection title="Target Users & Personas">
                <div className="persona-grid">
                  {normalizePersonas(prd.targetUsersPersonas).length > 0 ? (
                    normalizePersonas(prd.targetUsersPersonas).map(
                      (persona, index) => (
                        <div
                          className="mini-card"
                          key={`${persona.name}-${index}`}
                        >
                          <h3>{persona.name}</h3>

                          {persona.description && (
                            <p>{persona.description}</p>
                          )}

                          <List
                            title="Needs"
                            items={persona.needs}
                          />

                          <List
                            title="Pain Points"
                            items={persona.painPoints}
                          />
                        </div>
                      ),
                    )
                  ) : (
                    <div className="mini-card">
                      <p className="muted">
                        No target-user personas were returned by the workflow.
                      </p>
                    </div>
                  )}
                </div>
              </PrdSection>

              <PrdSection title="Goals">
                <div className="stack">
                  {(prd.goals ?? []).map((goal, index) => (
                    <div className="requirement-row" key={index}>
                      <strong>{goal.goal}</strong>
                      <span>{goal.metric}</span>
                    </div>
                  ))}
                </div>
              </PrdSection>

              <PrdSection title="User Stories">
                <div className="stack">
                  {(prd.userStories ?? []).map((story, index) => (
                    <div className="mini-card" key={index}>
                      <div className="tag">{story.id || `US${index + 1}`}</div>
                      <p>
                        As a {story.asA}, I want {story.iWant}, so that{" "}
                        {story.soThat}.
                      </p>
                    </div>
                  ))}
                </div>
              </PrdSection>

              <PrdSection title="Functional Requirements">
                <RequirementList items={prd.functionalRequirements} />
              </PrdSection>

              <PrdSection title="Non-Functional Requirements">
                <div className="stack">
                  {(prd.nonFunctionalRequirements ?? []).map((item, index) => (
                    <div className="requirement-row" key={index}>
                      <div>
                        <span className="tag">{item.id}</span>
                        <strong>{item.category}</strong>
                      </div>
                      <p>{item.requirement}</p>
                    </div>
                  ))}
                </div>
              </PrdSection>

              <PrdSection title="Feature Prioritization">
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Feature</th>
                        <th>Priority</th>
                        <th>Rationale</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(prd.featurePrioritization ?? []).map((item, index) => (
                        <tr key={index}>
                          <td>{item.feature}</td>
                          <td>
                            <span className="priority">
                              {item.priority}
                            </span>
                          </td>
                          <td>{item.rationale}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </PrdSection>

              <PrdSection title="MVP Scope">
                <div className="scope-grid">
                  <div>
                    <h3>Included</h3>
                    <List items={prd.mvpScope?.included} />
                  </div>
                  <div>
                    <h3>Excluded</h3>
                    <List items={prd.mvpScope?.excluded} />
                  </div>
                </div>
                <p className="scope-summary">{prd.mvpScope?.summary}</p>
              </PrdSection>

              <PrdSection title="Technical Requirements">
                <div className="stack">
                  {(prd.technicalRequirements ?? []).map((item, index) => (
                    <div className="requirement-row" key={index}>
                      <strong>{item.area}</strong>
                      <p>{item.requirement}</p>
                    </div>
                  ))}
                </div>
              </PrdSection>

              <PrdSection title="Acceptance Criteria">
                <div className="stack">
                  {(prd.acceptanceCriteria ?? []).map((item, index) => (
                    <div className="mini-card" key={index}>
                      <span className="tag">{item.relatedTo}</span>
                      <List items={item.criteria} />
                    </div>
                  ))}
                </div>
              </PrdSection>

              <PrdSection title="Risks & Assumptions">
                <div className="two-column">
                  <div>
                    <h3>Risks</h3>
                    <div className="stack">
                      {(prd.risksAndAssumptions?.risks ?? []).map(
                        (item, index) => (
                          <div className="mini-card" key={index}>
                            <strong>{item.risk}</strong>
                            <p>Mitigation: {item.mitigation}</p>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <div>
                    <h3>Assumptions</h3>
                    <List items={prd.risksAndAssumptions?.assumptions} />
                  </div>
                </div>
              </PrdSection>

              <PrdSection title="Future Enhancements">
                <List items={prd.futureEnhancements} />
              </PrdSection>
            </article>

            <aside className="results-sidebar">
              <div className="card validation-card">
                <div className="eyebrow">VALIDATION</div>
                <div className="validation-status">
                  <span className="success-dot" />
                  {validation?.passed ? "PASSED" : "REVIEW"}
                </div>

                {validation?.revised && (
                  <p className="muted">
                    The initial PRD was revised using validator feedback.
                  </p>
                )}

                <Score label="Completeness" value={validation?.scores?.completeness} />
                <Score label="Clarity" value={validation?.scores?.clarity} />
                <Score label="Consistency" value={validation?.scores?.consistency} />
                <Score label="Grounding" value={validation?.scores?.grounding} />
                <Score label="Testability" value={validation?.scores?.testability} />

                {validation?.issues && validation.issues.length > 0 && (
                  <div className="issues">
                    <h3>Reviewer notes</h3>
                    {validation.issues.map((issue, index) => (
                      <div key={index} className="issue">
                        <strong>{issue.criterion}</strong>
                        <p>{issue.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="card input-summary">
                <div className="eyebrow">SOURCE INPUT</div>
                <p><strong>Industry</strong>{form.industry || "Not specified"}</p>
                <p><strong>Target market</strong>{form.targetMarket || "Not specified"}</p>
                <p>
                  <strong>Additional requirements</strong>
                  {form.additionalRequirements || "None"}
                </p>
              </div>
            </aside>
          </div>
        </section>
      )}
    </main>
  );
}

function WorkflowStep({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="workflow-step">
      <span className="workflow-number">✓</span>
      <div>
        <strong>{label}</strong>
        <small>{detail}</small>
      </div>
    </div>
  );
}

function PrdSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="prd-section">
      <div className="section-line">
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function List({
  title,
  items,
}: {
  title?: string;
  items?: string[];
}) {
  const values = asArray(items);

  if (!values.length && !title) return <p className="muted">Not provided.</p>;

  return (
    <div className="list-block">
      {title && <h4>{title}</h4>}
      {values.length ? (
        <ul>
          {values.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="muted">Not provided.</p>
      )}
    </div>
  );
}

function RequirementList({
  items,
}: {
  items?: Array<{ id?: string; requirement?: string }>;
}) {
  return (
    <div className="stack">
      {(items ?? []).map((item, index) => (
        <div className="requirement-row" key={index}>
          <span className="tag">{item.id}</span>
          <p>{item.requirement}</p>
        </div>
      ))}
    </div>
  );
}

function Score({ label, value }: { label: string; value?: number }) {
  return (
    <div className="score">
      <div>
        <span>{label}</span>
        <strong>{value ?? "—"}/5</strong>
      </div>
      <div className="score-bar">
        <span style={{ width: `${((value ?? 0) / 5) * 100}%` }} />
      </div>
    </div>
  );
}

export default App;
