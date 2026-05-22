import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Copy,
  Check,
  Moon,
  Sun,
  Folder,
  Inbox,
  Bookmark,
  Sparkles,
  Users,
  Briefcase,
  Shield,
  Clock,
  Target,
  TrendingUp,
  FileText,
  X,
  Star,
  Layers,
  MessageSquare,
  GitBranch,
  SlidersHorizontal,
  ChevronRight,
  Wand2,
  Link2
} from "lucide-react";

import { STORIES_DATA as RAW_STORIES_DATA } from "./storiesData";

const PAINS_LIST = [
  { id: "p1", name: "Disconnected frontline systems" },
  { id: "p2", name: "Low digital tool adoption" },
  { id: "p3", name: "Late task completion / execution timing" },
  { id: "p4", name: "Store-to-store execution variability" },
  { id: "p5", name: "Fragmented corporate communications" },
  { id: "p6", name: "Manager administrative overhead" },
  { id: "p7", name: "Compliance & food safety / product recall risk" },
  { id: "p8", name: "Frontline staff turnover & engagement" },
  { id: "p9", name: "LMS costs & training completion" },
  { id: "p10", name: "Labor shortages & shift coverage friction" },
  { id: "p11", name: "External gig economy competition" }
];

const PERSONAS = [
  {
    id: "ops",
    name: "Operations",
    fullName: "Operations / Store Ops / Field Leadership",
    focus: "Execution, store consistency, operating rhythm, field coaching",
    icon: Briefcase,
    keywords: ["operations", "store operations", "store ops", "field", "district", "regional", "manufacturing", "plant", "enterprise operations", "food safety", "compliance"]
  },
  {
    id: "hr",
    name: "HR / EX",
    fullName: "HR / Learning / Communications / Employee Experience",
    focus: "Adoption, engagement, learning, culture, retention",
    icon: Users,
    keywords: ["hr", "learning", "training", "communications", "employee", "experience", "retention", "culture", "preboarding"]
  },
  {
    id: "it",
    name: "IT",
    fullName: "IT / Digital Transformation / CIO",
    focus: "Tool consolidation, governance, integrations, shadow IT",
    icon: Shield,
    keywords: ["it", "digital", "technology", "cio", "security", "integration", "governance", "systems"]
  },
  {
    id: "wfm",
    name: "WFM",
    fullName: "Workforce Management / Labor Planning",
    focus: "Scheduling, shift fill, labor flexibility, coverage",
    icon: Clock,
    keywords: ["workforce", "wfm", "scheduling", "labor", "planning", "open shift", "shift", "coverage"]
  }
];

const STORY_FAMILIES = [
  "Adoption / Daily Hub",
  "Engagement → Execution",
  "Manager Productivity",
  "Labor Flexibility / Shift Marketplace",
  "Safety / Compliance",
  "Workflow / Systems / Orchestration",
  "Learning / Training",
  "Customer Experience / Feedback",
  "Analytics / AI Opportunity"
];

const FAMILY_RULES = [
  { family: "Labor Flexibility / Shift Marketplace", keywords: ["open shift", "shift marketplace", "shift swaps", "shift fill", "labor flexibility", "scheduling", "agency labor", "gig", "coverage"] },
  { family: "Safety / Compliance", keywords: ["safety", "compliance", "recall", "red alert", "food safety", "risk", "regulatory", "agreement"] },
  { family: "Learning / Training", keywords: ["learning", "training", "lms", "scorm", "preboarding", "pos training", "micro-learning"] },
  { family: "Adoption / Daily Hub", keywords: ["adoption", "daily hub", "daily", "frontline hub", "digital workplace", "single pane", "one app", "stickiness", "dau"] },
  { family: "Engagement → Execution", keywords: ["engagement", "execution", "communications", "channels", "comments", "sentiment", "voice", "collaboration"] },
  { family: "Manager Productivity", keywords: ["manager", "hours", "admin", "approvals", "labor savings", "productivity"] },
  { family: "Workflow / Systems / Orchestration", keywords: ["orchestration", "task connect", "integration", "erp", "qualtrics", "ukg", "dailypay", "shadow it", "systems", "tool sprawl", "governance"] },
  { family: "Customer Experience / Feedback", keywords: ["customer", "cx", "feedback", "survey", "remediation", "cleanliness"] },
  { family: "Analytics / AI Opportunity", keywords: ["analytics", "ai", "pattern", "prioritization", "segmentation", "coaching map", "root cause"] }
];

const TIER_RULES = {
  "Tier 1": ["Ulta Beauty", "General Motors", "Shell", "Woolworths", "Marks & Spencer", "Metro AG", "Circle K", "Midcounties Co-op", "American Eagle", "American Eagle Outfitters", "JCPenney", "TJX Europe"],
  "Tier 2": ["Aramark", "Avis Budget Group", "Murphy USA", "Ross Stores", "DGS / Unifi", "Delta Global Services / Unifi", "Marmax", "Panda Express", "Panda Restaurant Group", "Team Washington", "Domino's", "Domino’s", "City Beach", "KIKO", "Kiko Milano", "Young Guns", "Reject Shop Australia", "7-Eleven"]
};

const PROOF_LEVEL_STYLES = {
  "Hard ROI": "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30",
  "Operational Metric": "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/30",
  "Adoption Proof": "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/30",
  "Scale Proof": "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30",
  "Directional / Narrative": "bg-neutral-50 text-neutral-600 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700"
};

const DEMO_FIT_SCORE = {
  "Extremely Strong": 12,
  "Very Strong": 10,
  Strong: 8,
  Light: 4
};

const VOICE_MODES = [
  { id: "workjam", label: "WorkJam Voice", description: "Plain-spoken, executive, practical, credible" },
  { id: "executive", label: "Executive Brief", description: "Short, strategic, outcome-first" },
  { id: "discovery", label: "Discovery", description: "Question-led and buyer-centered" },
  { id: "roi", label: "ROI / Value", description: "Value levers and conservative business case" },
  { id: "competitive", label: "Competitive", description: "Contrast without trashing competitors" }
];

const WORKJAM_VOICE_RULES = {
  workjam: {
    name: "WorkJam Voice",
    frame: "Use a plain-spoken, strategic, credible voice. Start with the business problem, explain why legacy approaches fall short, then position WorkJam as the operating layer that turns insight into action.",
    avoid: "Avoid hype, canned SaaS language, overused AI phrasing, buzzwords, and positioning WorkJam as just a communications app, task tool, or scheduling add-on."
  },
  executive: {
    name: "Executive Brief",
    frame: "Write for a senior executive. Be concise, commercially aware, and outcome-first. Emphasize business risk, operational leverage, and measurable impact.",
    avoid: "Avoid product walkthrough language, feature dumping, and overly tactical details."
  },
  discovery: {
    name: "Discovery",
    frame: "Write in a way that opens a conversation. Lead with the buyer's operating problem, then ask practical questions that expose the cost of the current process.",
    avoid: "Avoid pitching too early. Do not sound like an SDR sequence."
  },
  roi: {
    name: "ROI / Value",
    frame: "Translate the story into value drivers: manager time saved, labor savings, turnover avoided, compliance lift, safety improvement, training cost avoided, adoption, or speed-to-execution.",
    avoid: "Avoid heroic assumptions. Separate hard proof from modeled value."
  },
  competitive: {
    name: "Competitive",
    frame: "Acknowledge the common alternative, then show where point tools fall short. Position WorkJam as the frontline execution layer that connects communication, tasks, learning, scheduling, targeting, analytics, and integrations.",
    avoid: "Avoid competitor bashing. Do not overclaim replacement of every system."
  }
};

function inferPrimaryValueLever(story) {
  const text = storyText(story);
  if (/manager|hours|admin|approval|labor savings|time saved/.test(text)) return "Manager time saved";
  if (/open shift|shift|scheduling|coverage|labor|agency/.test(text)) return "Labor flexibility";
  if (/training|learning|lms|scorm|preboarding/.test(text)) return "Training efficiency";
  if (/safety|incident|accident/.test(text)) return "Safety improvement";
  if (/compliance|recall|red alert|audit|agreement/.test(text)) return "Compliance lift";
  if (/adoption|daily|dau|hub|active users/.test(text)) return "Adoption and habit formation";
  if (/engagement|sentiment|voice|communications|channels|comments/.test(text)) return "Engagement to execution";
  if (/integration|erp|ukg|qualtrics|dailypay|systems|shadow it|tool sprawl/.test(text)) return "System orchestration";
  if (/customer|cx|feedback|remediation/.test(text)) return "Customer experience lift";
  return "Speed-to-execution";
}

function cleanWorkJamSentence(text) {
  return String(text || "")
    .replace(/digital transformation/gi, "frontline execution")
    .replace(/leverage/gi, "use")
    .replace(/utilize/gi, "use")
    .replace(/synergy/gi, "coordination")
    .replace(/seamless/gi, "simple")
    .replace(/robust/gi, "strong");
}

function buildVoiceSummary(story, voiceMode = "workjam") {
  const valueLever = inferPrimaryValueLever(story);
  const outcome = story.outcomes?.[0] || "measurable frontline improvement";
  const pain = story.primaryPains?.[0] || "frontline execution was harder than it needed to be";
  const moduleList = (story.modules || story.capabilities || []).slice(0, 4).join(", ");

  if (voiceMode === "executive") {
    return cleanWorkJamSentence(`${story.company} faced a familiar frontline problem: ${pain.toLowerCase()}.

The value of the story is not the feature set alone. It is the operating change: ${story.solution}

The proof point is simple: ${outcome}.

Strategic takeaway: this is a ${valueLever.toLowerCase()} story that shows how WorkJam turns frontline intent into measurable execution.`);
  }

  if (voiceMode === "discovery") {
    return cleanWorkJamSentence(`This story is useful when the buyer is describing ${pain.toLowerCase()}.

A strong way to open the conversation:
"How are you handling this today, and where does it break down between corporate intent and site-level execution?"

Follow-up:
"What do managers have to do manually to make sure the work actually happens?"

Story to use:
${story.company} used WorkJam to ${story.solution.toLowerCase()}

Proof:
${outcome}`);
  }

  if (voiceMode === "roi") {
    return cleanWorkJamSentence(`Value lens: ${valueLever}

Customer example:
${story.company} used WorkJam to address ${pain.toLowerCase()}.

Operational mechanism:
${story.solution}

Proof:
${(story.outcomes || []).slice(0, 4).map((o) => `- ${o}`).join("\n")}

How to frame the business case:
Start with the current volume of work, the time spent managing it, and the cost of delay. Then show how WorkJam improves execution, adoption, or manager capacity.`);
  }

  if (voiceMode === "competitive") {
    return cleanWorkJamSentence(`Competitive angle:
This story helps when the buyer is comparing WorkJam to a point solution.

The issue is not whether a tool can send a message, assign a task, or show a schedule. The issue is whether the organization can connect the right audience, the right workflow, the right proof, and the right follow-through.

${story.company} shows the broader WorkJam value:
${story.solution}

Modules involved:
${moduleList}

Proof:
${outcome}`);
  }

  return cleanWorkJamSentence(`${story.company} had a practical frontline problem: ${pain.toLowerCase()}.

WorkJam helped by creating a clearer operating layer for the frontline. The important part is not just that the work moved into an app. The important part is that communication, workflow, targeting, and proof came together in one place.

What changed:
${story.solution}

Proof:
${(story.outcomes || []).slice(0, 3).map((o) => `- ${o}`).join("\n")}

Why it matters:
${story.whyItMatters}`);
}

function storyText(story) {
  return [
    story.name,
    story.company,
    story.industry,
    story.profile,
    story.solution,
    story.narrative,
    story.whyItMatters,
    story.demoAngle,
    story.demoFit,
    ...(story.primaryBuyers || []),
    ...(story.secondaryBuyers || []),
    ...(story.primaryPains || []),
    ...(story.secondaryPains || []),
    ...(story.capabilities || []),
    ...(story.modules || []),
    ...(story.outcomes || []),
    ...(story.tags || []),
    ...(story.triggerPhrases || [])
  ].filter(Boolean).join(" ").toLowerCase();
}

function includesAny(text, keywords) {
  return keywords.some((keyword) => text.includes(keyword.toLowerCase()));
}

function inferModules(story) {
  const base = [...(story.modules || []), ...(story.capabilities || [])];
  const text = storyText(story);
  const inferred = [];

  const rules = [
    ["Communications", ["communication", "communications", "channels", "messaging", "chat", "rooms"]],
    ["Task Management", ["task", "tasks", "execution", "red alert", "recall"]],
    ["Scheduling / WFM", ["scheduling", "wfm", "workforce", "shift", "schedule", "labor"]],
    ["Open Shift Marketplace", ["open shift", "marketplace", "shift swaps", "shift pickup", "auto-approval"]],
    ["Learning / SCORM", ["learning", "training", "lms", "scorm", "preboarding"]],
    ["Surveys / Employee Voice", ["survey", "surveys", "voice", "sentiment", "feedback"]],
    ["Reporting & Analytics", ["reporting", "analytics", "dashboard", "segmentation", "score", "pattern"]],
    ["Integrations", ["integration", "integrated", "ukg", "qualtrics", "dailypay", "erp", "task connect"]],
    ["Earned Wage Access", ["earned wage", "ewa", "dailypay"]],
    ["Digital Workplace", ["digital workplace", "frontline hub", "daily hub", "single pane"]]
  ];

  rules.forEach(([module, keywords]) => {
    if (includesAny(text, keywords)) inferred.push(module);
  });

  return Array.from(new Set([...base, ...inferred])).sort();
}

function inferFamily(story) {
  if (story.storyFamily) return story.storyFamily;
  const text = storyText(story);
  const scored = FAMILY_RULES.map((rule) => ({
    family: rule.family,
    score: rule.keywords.reduce((sum, keyword) => sum + (text.includes(keyword) ? 1 : 0), 0)
  })).sort((a, b) => b.score - a.score);

  return scored[0]?.score > 0 ? scored[0].family : "Workflow / Systems / Orchestration";
}

function inferTier(story) {
  if (story.tier) return story.tier;

  if (TIER_RULES["Tier 1"].some((name) => story.company?.toLowerCase() === name.toLowerCase())) return "Tier 1";
  if (TIER_RULES["Tier 2"].some((name) => story.company?.toLowerCase() === name.toLowerCase())) return "Tier 2";

  const text = storyText(story);
  const hasHardProof = /[$£]|\d+%|\d{1,3},\d{3}|million|hours|shifts|adoption|savings/.test(text);
  return hasHardProof ? "Tier 2" : "Tier 3";
}

function inferProofLevel(story) {
  if (story.proofLevel) return story.proofLevel;
  const text = storyText(story);
  if (/[$£]|savings|saved|roi|cost/.test(text)) return "Hard ROI";
  if (/adoption|dau|active users|weekly adoption/.test(text)) return "Adoption Proof";
  if (/150,000|500,000|95,000|650 stores|global|enterprise scale|6,000 punches/.test(text)) return "Scale Proof";
  if (/\d+%|\d{1,3},\d{3}|hours|shifts|tasks|views|surveys|sessions|messages|chats/.test(text)) return "Operational Metric";
  return "Directional / Narrative";
}

function inferProofTheme(story) {
  if (story.proofTheme) return story.proofTheme;
  const family = inferFamily(story);
  if (family.includes("Labor")) return "Labor Flexibility";
  if (family.includes("Compliance")) return "Compliance";
  if (family.includes("Learning")) return "Training";
  if (family.includes("Adoption")) return "Adoption";
  if (family.includes("Engagement")) return "Engagement";
  if (family.includes("Analytics")) return "Analytics";
  if (family.includes("Customer")) return "CX";
  return "Execution";
}

function inferTriggerPhrases(story) {
  const existing = story.triggerPhrases || [];
  const fields = [
    ...(story.tags || []),
    ...(story.primaryPains || []),
    ...(story.secondaryPains || []),
    ...(story.capabilities || []),
    story.storyFamily,
    story.demoAngle,
    story.proofTheme
  ].filter(Boolean);

  const generated = fields
    .flatMap((item) => String(item).split(/[;/,→]+/))
    .map((item) => item.trim())
    .filter((item) => item.length > 2)
    .slice(0, 12);

  return Array.from(new Set([...existing, ...generated]));
}

function inferConfidenceScore(story) {
  if (typeof story.confidenceScore === "number") return story.confidenceScore;

  let score = 55;
  const proof = inferProofLevel(story);
  const tier = inferTier(story);

  if (tier === "Tier 1") score += 20;
  if (tier === "Tier 2") score += 10;
  if (proof === "Hard ROI") score += 15;
  if (proof === "Operational Metric") score += 10;
  if (proof === "Adoption Proof") score += 10;
  if ((story.outcomes || []).length >= 3) score += 5;
  if ((story.narrative || "").length > 150) score += 5;

  return Math.min(98, score);
}

function enrichStory(story) {
  const modules = inferModules(story);
  const storyFamily = inferFamily(story);
  const tier = inferTier(story);
  const proofLevel = inferProofLevel(story);
  const proofTheme = inferProofTheme(story);
  const triggerPhrases = inferTriggerPhrases({ ...story, storyFamily, proofTheme });
  const confidenceScore = inferConfidenceScore({ ...story, proofLevel, tier });

  return { ...story, modules, storyFamily, tier, proofLevel, proofTheme, triggerPhrases, confidenceScore };
}

const STORIES_DATA = RAW_STORIES_DATA.map(enrichStory);

function personaMatches(story, personaId) {
  if (personaId === "All") return true;
  const persona = PERSONAS.find((p) => p.id === personaId);
  if (!persona) return true;
  return includesAny(storyText(story), persona.keywords);
}

function storyHasPain(story, pain) {
  if (!pain || pain === "All") return true;
  return [...(story.primaryPains || []), ...(story.secondaryPains || [])].includes(pain);
}

function getDemoFitScore(story) {
  return DEMO_FIT_SCORE[story.demoFit] || 5;
}

function getStoryScore(story, filters) {
  let score = 0;

  if (filters.searchText.trim()) {
    const query = filters.searchText.trim().toLowerCase();
    const text = storyText(story);
    if (text.includes(query)) score += 25;
    const queryTokens = query.split(/\s+/).filter(Boolean);
    score += queryTokens.filter((token) => text.includes(token)).length * 4;
  }

  if (filters.selectedPain !== "All" && storyHasPain(story, filters.selectedPain)) score += 40;
  if (filters.selectedPersona !== "All" && personaMatches(story, filters.selectedPersona)) score += 25;
  if (filters.selectedIndustry !== "All" && story.industry === filters.selectedIndustry) score += 15;
  if (filters.selectedFamily !== "All" && story.storyFamily === filters.selectedFamily) score += 25;
  if (filters.selectedTier !== "All" && story.tier === filters.selectedTier) score += 10;
  if (filters.selectedModule !== "All" && story.modules.includes(filters.selectedModule)) score += 25;

  if (story.proofLevel === "Hard ROI") score += 15;
  if (story.proofLevel === "Operational Metric") score += 10;
  if (story.proofLevel === "Adoption Proof") score += 9;
  if (story.proofLevel === "Scale Proof") score += 8;

  score += getDemoFitScore(story);
  score += Math.round((story.confidenceScore || 60) / 20);

  return score;
}

function getMatchReasons(story, filters) {
  const reasons = [];

  if (filters.selectedPain !== "All" && storyHasPain(story, filters.selectedPain)) reasons.push(`Pain match: ${filters.selectedPain}`);
  if (filters.selectedPersona !== "All" && personaMatches(story, filters.selectedPersona)) {
    const persona = PERSONAS.find((p) => p.id === filters.selectedPersona);
    reasons.push(`Buyer match: ${persona?.fullName || persona?.name}`);
  }
  if (filters.selectedIndustry !== "All" && story.industry === filters.selectedIndustry) reasons.push(`Industry match: ${story.industry}`);
  if (filters.selectedFamily !== "All" && story.storyFamily === filters.selectedFamily) reasons.push(`Story family match: ${story.storyFamily}`);
  if (filters.selectedModule !== "All" && story.modules.includes(filters.selectedModule)) reasons.push(`Module match: ${filters.selectedModule}`);

  if (story.proofLevel === "Hard ROI") reasons.push("Strong proof: hard ROI or savings");
  if (story.proofLevel === "Operational Metric") reasons.push("Strong proof: quantified operating metric");
  if (story.proofLevel === "Adoption Proof") reasons.push("Strong proof: adoption or recurring use");
  if (story.proofLevel === "Scale Proof") reasons.push("Strong proof: enterprise scale");
  if (story.tier === "Tier 1") reasons.push("Tier 1 strategic proof story");
  if (story.demoFit?.toLowerCase().includes("very") || story.demoFit?.toLowerCase().includes("extremely")) reasons.push(`Demo fit: ${story.demoFit}`);

  return reasons.slice(0, 6);
}

function findRelatedStories(selectedStory, allStories) {
  if (!selectedStory) return [];

  if (selectedStory.relatedStories?.length) {
    const byId = new Map(allStories.map((s) => [s.id, s]));
    return selectedStory.relatedStories.map((id) => byId.get(id)).filter(Boolean).slice(0, 4);
  }

  return allStories
    .filter((story) => story.id !== selectedStory.id)
    .map((story) => {
      let score = 0;
      if (story.storyFamily === selectedStory.storyFamily) score += 30;
      if (story.industry === selectedStory.industry) score += 15;
      if (story.tier === selectedStory.tier) score += 5;

      const sharedModules = story.modules.filter((m) => selectedStory.modules.includes(m));
      score += sharedModules.length * 10;

      const selectedPains = [...(selectedStory.primaryPains || []), ...(selectedStory.secondaryPains || [])];
      const storyPains = [...(story.primaryPains || []), ...(story.secondaryPains || [])];
      const sharedPain = storyPains.filter((p) => selectedPains.includes(p));
      score += sharedPain.length * 12;

      return { ...story, relatedScore: score };
    })
    .filter((story) => story.relatedScore > 0)
    .sort((a, b) => b.relatedScore - a.relatedScore)
    .slice(0, 4);
}

function buildCopyPayload(story, mode, personaId, voiceMode = "workjam") {
  const persona = PERSONAS.find((p) => p.id === personaId);
  const voiceRule = WORKJAM_VOICE_RULES[voiceMode] || WORKJAM_VOICE_RULES.workjam;
  const proof = (story.outcomes || []).slice(0, 4).map((outcome) => `- ${outcome}`).join("\n");
  const moduleList = (story.modules || story.capabilities || []).slice(0, 6).join(", ");
  const valueLever = inferPrimaryValueLever(story);
  const voiceSummary = buildVoiceSummary(story, voiceMode);

  if (mode === "talkTrack") {
    return `${voiceRule.name} talk track

Voice rule:
${voiceRule.frame}

${voiceSummary}

Close:
This is why WorkJam should be positioned as the frontline execution layer, not just another app.`;
  }

  if (mode === "discovery") {
    return `${voiceRule.name} discovery guide

Voice rule:
${voiceRule.frame}

Buyer focus:
${persona?.fullName || "General buyer"}

Use this story when the buyer is dealing with:
${story.primaryPains?.map((p) => `- ${p}`).join("\n") || "- Frontline execution friction"}

Questions:
1. How does this work today?
2. Where does the current process slow down between HQ, managers, and frontline teams?
3. What has to happen manually for the work to get done?
4. What would leadership need to see to trust that execution improved?
5. If this improved, would the value show up as time saved, risk reduced, adoption, retention, or faster execution?

Relevant story:
${story.company} — ${story.name}

Proof:
${proof}`;
  }

  if (mode === "proof") {
    return `${voiceRule.name} proof summary

Customer:
${story.company}

Business problem:
${story.primaryPains?.[0] || story.storyFamily}

Operational change:
${story.solution}

Primary value lever:
${valueLever}

Proof:
${proof}

Strategic takeaway:
${story.whyItMatters}

Note:
Use customer names and metrics carefully. Validate externally before using in press, analyst, legal, or investor materials.`;
  }

  if (mode === "demo") {
    return `${voiceRule.name} demo setup

1. Start with the operating problem:
${story.primaryPains?.[0] || story.storyFamily}

2. Show why the legacy approach falls short:
Messages, tasks, training, schedules, and data often live in separate places. That makes execution harder to see and harder to manage.

3. Introduce WorkJam as the operating layer:
WorkJam connects targeting, communication, workflow, learning, scheduling, analytics, and integrations so frontline intent becomes completed action.

4. Show the relevant capabilities:
${moduleList}

5. Anchor in proof:
${story.outcomes?.[0] || "Measurable frontline improvement"}

6. Close with the strategic lesson:
${story.demoAngle}`;
  }

  return voiceSummary;
}


export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeFolder, setActiveFolder] = useState("recommend");
  const [selectedStory, setSelectedStory] = useState(STORIES_DATA[0]);

  const [searchText, setSearchText] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedPain, setSelectedPain] = useState("All");
  const [selectedPersona, setSelectedPersona] = useState("All");
  const [selectedFamily, setSelectedFamily] = useState("All");
  const [selectedTier, setSelectedTier] = useState("All");
  const [selectedModule, setSelectedModule] = useState("All");
  const [copyMode, setCopyMode] = useState("talkTrack");
  const [voiceMode, setVoiceMode] = useState("workjam");
  const [copiedId, setCopiedId] = useState(null);
  const [mobileView, setMobileView] = useState("list");

  const industries = useMemo(() => ["All", ...Array.from(new Set(STORIES_DATA.map((s) => s.industry).filter(Boolean))).sort()], []);
  const families = useMemo(() => {
    const discovered = Array.from(new Set(STORIES_DATA.map((s) => s.storyFamily).filter(Boolean)));
    return ["All", ...Array.from(new Set([...STORY_FAMILIES, ...discovered])).sort()];
  }, []);
  const tiers = useMemo(() => ["All", "Tier 1", "Tier 2", "Tier 3"], []);
  const modules = useMemo(() => {
    const allModules = STORIES_DATA.flatMap((s) => s.modules || []);
    return ["All", ...Array.from(new Set(allModules)).sort()];
  }, []);

  const filters = { searchText, selectedIndustry, selectedPain, selectedPersona, selectedFamily, selectedTier, selectedModule };

  const filteredStories = useMemo(() => {
    return STORIES_DATA.filter((story) => {
      const text = storyText(story);
      const query = searchText.trim().toLowerCase();

      const matchesSearch = !query || text.includes(query) || (story.triggerPhrases || []).some((phrase) => phrase.toLowerCase().includes(query));
      const matchesIndustry = selectedIndustry === "All" || story.industry === selectedIndustry;
      const matchesPain = storyHasPain(story, selectedPain);
      const matchesPersonaFilter = personaMatches(story, selectedPersona);
      const matchesFamily = selectedFamily === "All" || story.storyFamily === selectedFamily;
      const matchesTier = selectedTier === "All" || story.tier === selectedTier;
      const matchesModule = selectedModule === "All" || story.modules.includes(selectedModule);

      return matchesSearch && matchesIndustry && matchesPain && matchesPersonaFilter && matchesFamily && matchesTier && matchesModule;
    })
      .map((story) => ({ ...story, matchScore: getStoryScore(story, filters), matchReasons: getMatchReasons(story, filters) }))
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [searchText, selectedIndustry, selectedPain, selectedPersona, selectedFamily, selectedTier, selectedModule]);

  const topStories = useMemo(() => filteredStories.slice(0, 5), [filteredStories]);
  const relatedStories = useMemo(() => findRelatedStories(selectedStory, STORIES_DATA), [selectedStory]);

  useEffect(() => {
    if (!filteredStories.length) {
      setSelectedStory(null);
      return;
    }

    const stillExists = filteredStories.some((story) => story.id === selectedStory?.id);
    if (!stillExists) setSelectedStory(filteredStories[0]);
  }, [filteredStories, selectedStory?.id]);

  const generatedCopy = useMemo(() => {
    if (!selectedStory) return "No story selected.";
    return buildCopyPayload(selectedStory, copyMode, selectedPersona, voiceMode);
  }, [selectedStory, copyMode, selectedPersona, voiceMode]);

  async function handleCopy(text, id) {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch (error) {
      console.error("Copy failed", error);
    }
  }

  function resetFilters() {
    setSearchText("");
    setSelectedIndustry("All");
    setSelectedPain("All");
    setSelectedPersona("All");
    setSelectedFamily("All");
    setSelectedTier("All");
    setSelectedModule("All");
  }

  const SelectedPersonaIcon = selectedPersona === "All" ? Users : PERSONAS.find((p) => p.id === selectedPersona)?.icon || Users;

  return (
    <div className={`min-h-screen w-full overflow-x-hidden font-sans antialiased transition-colors duration-200 ${darkMode ? "bg-[#121212] text-neutral-100" : "bg-[#F2F2F7] text-neutral-950"}`}>
      <header className={`h-16 px-5 flex items-center justify-between border-b shrink-0 ${darkMode ? "bg-[#1C1C1E] border-neutral-800" : "bg-white border-neutral-200"}`}>
        <div className="flex items-center gap-3 min-w-0">
          <Folder size={16} className="text-blue-500 shrink-0" />
          <div className="min-w-0">
            <div className="text-xs font-semibold tracking-tight text-neutral-500 dark:text-neutral-300 font-mono truncate">
              WORKJAM STORY SELECTOR
            </div>
            <div className="text-[10px] text-neutral-400 truncate">
              Dynamic presales story matching · {STORIES_DATA.length} stories
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button onClick={resetFilters} className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800">
            <SlidersHorizontal size={13} />
            Reset
          </button>

          <button onClick={() => setDarkMode(!darkMode)} className={`p-1.5 rounded-lg transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 ${darkMode ? "text-amber-400" : "text-neutral-500"}`} title="Toggle theme">
            {darkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </header>

      <div className="w-full max-w-none grid grid-cols-1 md:grid-cols-[320px_minmax(420px,34vw)_1fr] items-start">
        <aside className={`min-h-[calc(100vh-4rem)] md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:overflow-y-auto border-r p-4 flex flex-col gap-5 ${darkMode ? "bg-[#1C1C1E] border-neutral-800" : "bg-[#F2F2F7] border-neutral-300"} ${mobileView !== "sidebar" ? "hidden md:flex" : "flex"}`}>
          <div>
            <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-2 mb-2">Story Modes</h3>
            <div className="flex flex-col gap-1">
              <SidebarButton active={activeFolder === "recommend"} icon={Sparkles} label="Best-fit Recommendations" count={topStories.length} onClick={() => { setActiveFolder("recommend"); setMobileView("list"); }} />
              <SidebarButton active={activeFolder === "all"} icon={Inbox} label="All Stories" count={STORIES_DATA.length} onClick={() => { setActiveFolder("all"); setMobileView("list"); }} />
              <SidebarButton active={activeFolder === "pain"} icon={Bookmark} label="Pain Matcher" count={PAINS_LIST.length} onClick={() => { setActiveFolder("pain"); setMobileView("list"); }} />
            </div>
          </div>

          <FilterSection title="Client Pain">
            <Select value={selectedPain} onChange={setSelectedPain} options={["All", ...PAINS_LIST.map((p) => p.name)]} />
          </FilterSection>

          <FilterSection title="Buyer Persona">
            <div className="grid grid-cols-2 gap-1">
              <PersonaButton active={selectedPersona === "All"} label="All" icon={Users} onClick={() => setSelectedPersona("All")} />
              {PERSONAS.map((persona) => (
                <PersonaButton key={persona.id} active={selectedPersona === persona.id} label={persona.name} icon={persona.icon} onClick={() => setSelectedPersona(persona.id)} />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Story Family"><Select value={selectedFamily} onChange={setSelectedFamily} options={families} /></FilterSection>
          <FilterSection title="Module"><Select value={selectedModule} onChange={setSelectedModule} options={modules} /></FilterSection>
          <FilterSection title="Tier"><Select value={selectedTier} onChange={setSelectedTier} options={tiers} /></FilterSection>

          <div className="mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-800 px-2 text-[10px] text-neutral-400 leading-snug font-mono">
            Score = pain + persona + module + family + proof + confidence.
          </div>
        </aside>

        <section className={`min-h-[calc(100vh-4rem)] border-r flex flex-col ${darkMode ? "bg-[#18181B] border-neutral-800" : "bg-white border-neutral-200"} ${mobileView === "sidebar" || (mobileView === "detail" && selectedStory) ? "hidden md:flex" : "flex"}`}>
          <div className="p-3 border-b border-neutral-200 dark:border-neutral-800 flex flex-col gap-2 shrink-0">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 text-neutral-400" size={13} />
              <input type="text" placeholder="Search by phrase, buyer pain, module, story..." value={searchText} onChange={(event) => setSearchText(event.target.value)} className={`w-full pl-8 pr-7 py-1.5 rounded-lg text-xs transition-colors focus:outline-none ${darkMode ? "bg-neutral-800 text-white placeholder-neutral-500" : "bg-neutral-100 text-neutral-950 placeholder-neutral-500"}`} />
              {searchText && <button onClick={() => setSearchText("")} className="absolute right-2 top-2 text-neutral-400 hover:text-neutral-600"><X size={12} /></button>}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <LabeledSelect label="Industry" value={selectedIndustry} onChange={setSelectedIndustry} options={industries} />
              <LabeledSelect label="Family" value={selectedFamily} onChange={setSelectedFamily} options={families} />
            </div>

            <div className="md:hidden flex items-center justify-between pt-1">
              <button onClick={() => setMobileView("sidebar")} className="text-xs text-blue-500 font-semibold flex items-center gap-1">Filters <ChevronRight size={12} /></button>
              <span className="text-[10px] font-mono text-neutral-400">{filteredStories.length} matched</span>
            </div>
          </div>

          {topStories.length > 0 && activeFolder === "recommend" && (
            <div className="p-3 border-b border-neutral-200 dark:border-neutral-800 shrink-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Star size={12} className="text-amber-500" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 font-mono">Best-fit</span>
                </div>
                <span className="text-[10px] text-neutral-400">{filteredStories.length} matches</span>
              </div>

              <div className="flex flex-col gap-1">
                {topStories.slice(0, 3).map((story, index) => (
                  <button key={story.id} onClick={() => { setSelectedStory(story); setMobileView("detail"); }} className="text-left rounded-lg p-2 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 transition-colors">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-neutral-800 dark:text-neutral-100 truncate">{index + 1}. {story.company}</span>
                      <span className="text-[10px] font-mono text-blue-500 shrink-0">Score {story.matchScore}</span>
                    </div>
                    <p className="text-[10px] text-neutral-500 mt-0.5 line-clamp-1">{story.name}</p>
                    <p className="text-[10px] text-neutral-400 mt-0.5 line-clamp-1">{story.matchReasons?.[0] || story.storyFamily}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex-1 divide-y divide-neutral-100 dark:divide-neutral-800">
            {filteredStories.length === 0 ? (
              <div className="p-8 text-center text-neutral-400">
                <FileText size={28} className="mx-auto mb-2 opacity-40" />
                <p className="text-xs">No customer stories found. Try removing a filter.</p>
              </div>
            ) : (
              filteredStories.map((story) => (
                <StoryRow key={story.id} story={story} selected={selectedStory?.id === story.id} darkMode={darkMode} onClick={() => { setSelectedStory(story); setMobileView("detail"); }} />
              ))
            )}
          </div>
        </section>

        <main className={`min-h-[calc(100vh-4rem)] md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:overflow-y-auto ${darkMode ? "bg-[#121212]" : "bg-white"} ${mobileView !== "detail" ? "hidden md:block" : "block"}`}>
          <div className="min-h-full p-6 lg:p-8 2xl:p-10">
            {selectedStory ? (
              <div className="flex flex-col gap-6 text-left w-full">
                <div className="md:hidden flex items-center justify-between border-b pb-3 border-neutral-200 dark:border-neutral-800 shrink-0">
                  <button onClick={() => setMobileView("list")} className="text-xs text-blue-500 font-bold">← Back to List</button>
                  <span className="text-[10px] font-mono text-neutral-400 font-bold">Story {selectedStory.num}</span>
                </div>

                <div className="border-b border-neutral-100 dark:border-neutral-800 pb-4">
                  <div className="flex items-center gap-2 mb-2 text-[10px] font-mono font-bold text-blue-500 tracking-wider">
                    <span>{selectedStory.tier}</span><span>•</span><span>{selectedStory.storyFamily}</span>
                  </div>
                  <h2 className="text-2xl 2xl:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
                    {selectedStory.company} — {selectedStory.name}
                  </h2>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    <Badge label={`Score ${selectedStory.matchScore ?? getStoryScore(selectedStory, filters)}`} />
                    <Badge label={`${selectedStory.confidenceScore}% confidence`} />
                    <Badge label={selectedStory.proofLevel} tone={selectedStory.proofLevel} />
                    <Badge label={selectedStory.proofTheme} />
                  </div>
                </div>

                <DetailCard title="Why This Matched" icon={Sparkles}>
                  {selectedStory.matchReasons?.length ? (
                    <ul className="space-y-1.5">
                      {selectedStory.matchReasons.map((reason, index) => <li key={index} className="flex gap-2"><span className="text-emerald-500">✓</span><span>{reason}</span></li>)}
                    </ul>
                  ) : <p>This story is currently selected from the full story set.</p>}
                </DetailCard>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  <DetailCard title="Target Audiences" icon={SelectedPersonaIcon}>
                    <p><strong>Primary:</strong> {selectedStory.primaryBuyers?.join("; ")}</p>
                    {selectedStory.secondaryBuyers?.length > 0 && <p className="text-neutral-500 dark:text-neutral-400 mt-1"><strong>Secondary:</strong> {selectedStory.secondaryBuyers.join("; ")}</p>}
                  </DetailCard>
                  <DetailCard title="Profile" icon={Layers}><p>{selectedStory.profile}</p></DetailCard>
                </div>

                <div>
                  <SectionTitle>What Actually Happened</SectionTitle>
                  <p className="text-sm 2xl:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">{selectedStory.narrative}</p>
                </div>

                <div className={`p-4 rounded-xl border ${darkMode ? "bg-emerald-500/10 border-emerald-500/30" : "bg-emerald-50 border-emerald-200"}`}>
                  <h4 className="text-[10px] text-emerald-600 dark:text-emerald-300 font-extrabold uppercase tracking-widest font-mono mb-2.5 flex items-center gap-1.5">
                    <TrendingUp size={12} /><span>Key Outcomes / Proof</span>
                  </h4>
                  <ul className="grid grid-cols-1 xl:grid-cols-2 gap-2">
                    {selectedStory.outcomes?.map((outcome, index) => (
                      <li key={index} className="text-xs 2xl:text-sm text-neutral-800 dark:text-neutral-200 flex items-start gap-2">
                        <span className="text-emerald-500 font-bold mt-0.5">•</span><span className="font-medium">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`p-4 rounded-xl border ${darkMode ? "bg-blue-500/10 border-blue-500/30" : "bg-blue-50 border-blue-100"}`}>
                  <h4 className="text-[10px] text-blue-500 font-extrabold uppercase tracking-widest font-mono mb-2 flex items-center gap-1">
                    <Target size={12} /><span>Best Demo Angle</span>
                  </h4>
                  <p className="text-xs 2xl:text-sm text-neutral-800 dark:text-neutral-200 font-semibold">{selectedStory.demoAngle}</p>
                </div>

                <div className="border-t border-neutral-100 dark:border-neutral-800 pt-4">
                  <SectionTitle>Why It Matters</SectionTitle>
                  <p className="text-xs 2xl:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{selectedStory.whyItMatters}</p>
                </div>

                <DetailCard title="WorkJam Voice Guidance" icon={Wand2}>
                  <div className="space-y-2">
                    <p><strong>Voice:</strong> plain-spoken, strategic, practical, and credible.</p>
                    <p><strong>Frame:</strong> business problem first, product mechanics second, measurable value third.</p>
                    <p><strong>Primary value lever:</strong> {inferPrimaryValueLever(selectedStory)}</p>
                    <p className="text-neutral-500 dark:text-neutral-400">
                      Avoid generic SaaS language. Position WorkJam as the frontline execution layer that connects communication, tasks, learning, scheduling, analytics, and integrations.
                    </p>
                  </div>
                </DetailCard>

                <DetailCard title="Modules & Trigger Phrases" icon={MessageSquare}>
                  <div className="mb-3">
                    <p className="text-[10px] uppercase tracking-widest font-mono text-neutral-400 mb-1">Modules</p>
                    <PillList items={selectedStory.modules} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-mono text-neutral-400 mb-1">Trigger phrases</p>
                    <PillList items={(selectedStory.triggerPhrases || []).slice(0, 10)} />
                  </div>
                </DetailCard>

                {relatedStories.length > 0 && (
                  <DetailCard title="Related Stories" icon={GitBranch}>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
                      {relatedStories.map((story) => (
                        <button key={story.id} onClick={() => setSelectedStory(story)} className="text-left p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs font-bold text-neutral-800 dark:text-neutral-100 truncate">{story.company}</p>
                            <Link2 size={12} className="text-neutral-400 shrink-0" />
                          </div>
                          <p className="text-[11px] text-neutral-500 line-clamp-1">{story.name}</p>
                        </button>
                      ))}
                    </div>
                  </DetailCard>
                )}

                <div className={`p-4 rounded-xl border ${darkMode ? "bg-neutral-900 border-neutral-800" : "bg-neutral-50 border-neutral-200 shadow-sm"}`}>
                  <div className="flex flex-col gap-3 border-b pb-3 mb-3 border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono flex items-center gap-1.5"><Wand2 size={12} />Copy Builder</span>
                      <div className="flex gap-1 flex-wrap justify-end">
                        <ModeButton mode="talkTrack" label="Talk" active={copyMode} setActive={setCopyMode} />
                        <ModeButton mode="discovery" label="Questions" active={copyMode} setActive={setCopyMode} />
                        <ModeButton mode="proof" label="Proof" active={copyMode} setActive={setCopyMode} />
                        <ModeButton mode="demo" label="Demo" active={copyMode} setActive={setCopyMode} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-2 items-center">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono">Voice Mode</label>
                      <select
                        value={voiceMode}
                        onChange={(event) => setVoiceMode(event.target.value)}
                        className="w-full py-1.5 px-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-semibold focus:outline-none text-neutral-700 dark:text-neutral-300"
                      >
                        {VOICE_MODES.map((voice) => (
                          <option key={voice.id} value={voice.id}>
                            {voice.label} — {voice.description}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-950/40 p-2 text-[11px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                      {WORKJAM_VOICE_RULES[voiceMode]?.frame}
                    </div>
                  </div>
                  <div className="p-3 bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-lg max-h-[300px] overflow-y-auto font-mono text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-300 whitespace-pre-wrap">
                    {generatedCopy}
                  </div>
                  <button onClick={() => handleCopy(generatedCopy, "copy-builder")} className={`w-full py-1.5 rounded-lg text-xs font-semibold mt-3 flex items-center justify-center gap-1.5 transition-all ${copiedId === "copy-builder" ? "bg-emerald-500 text-white" : "bg-blue-500 hover:bg-blue-600 text-white shadow-sm"}`}>
                    {copiedId === "copy-builder" ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copiedId === "copy-builder" ? "Copied!" : "Copy Active Draft"}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-neutral-400 flex flex-col items-center justify-center h-full max-w-sm mx-auto">
                <FileText className="text-neutral-300 dark:text-neutral-700 mb-2" size={32} />
                <p className="text-xs">No story matches the current filters.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarButton({ active, icon: Icon, label, count, onClick }) {
  return (
    <button onClick={onClick} className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${active ? "bg-blue-500 text-white" : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800"}`}>
      <div className="flex items-center gap-2"><Icon size={13} /><span>{label}</span></div>
      <span className={`text-[10px] font-mono ${active ? "text-white/80" : "text-neutral-400"}`}>{count}</span>
    </button>
  );
}

function FilterSection({ title, children }) {
  return (
    <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
      <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-2 mb-2">{title}</h3>
      {children}
    </div>
  );
}

function Select({ value, onChange, options }) {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full py-1.5 px-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-semibold focus:outline-none text-neutral-700 dark:text-neutral-300">
      {options.map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
  );
}

function LabeledSelect({ label, value, onChange, options }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[9px] uppercase tracking-widest font-mono font-bold text-neutral-400">{label}</span>
      <Select value={value} onChange={onChange} options={options} />
    </label>
  );
}

function PersonaButton({ active, label, icon: Icon, onClick }) {
  return (
    <button onClick={onClick} className={`p-2 rounded-lg text-[11px] font-semibold border flex items-center gap-1.5 transition-colors ${active ? "bg-blue-500 border-blue-500 text-white" : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"}`}>
      <Icon size={12} /><span>{label}</span>
    </button>
  );
}

function StoryRow({ story, selected, darkMode, onClick }) {
  const badgeClass = PROOF_LEVEL_STYLES[story.proofLevel] || PROOF_LEVEL_STYLES["Directional / Narrative"];
  return (
    <button onClick={onClick} className={`w-full p-3.5 text-left transition-colors cursor-pointer ${selected ? (darkMode ? "bg-neutral-800 text-white" : "bg-blue-50 text-neutral-900") : (darkMode ? "hover:bg-neutral-900 text-neutral-300" : "hover:bg-neutral-50 text-neutral-800")}`}>
      <div className="flex justify-between items-start gap-1">
        <span className="text-[10px] font-mono tracking-tight text-neutral-400 font-semibold truncate">{story.company} · {story.industry}</span>
        <span className="text-[9px] font-mono font-bold text-blue-500 shrink-0 bg-blue-500/10 px-1 rounded">{story.matchScore}</span>
      </div>
      <h4 className="text-xs font-bold leading-tight tracking-tight mt-1 line-clamp-1 text-neutral-800 dark:text-neutral-100">{story.name}</h4>
      <div className="flex flex-wrap gap-1 mt-2">
        <span className={`text-[9px] px-1.5 py-0.5 rounded border ${badgeClass}`}>{story.proofLevel}</span>
        <span className="text-[9px] px-1.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 text-neutral-500">{story.storyFamily}</span>
        <span className="text-[9px] px-1.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 text-neutral-500">{story.tier}</span>
      </div>
      <p className="text-[11px] mt-1.5 italic truncate text-neutral-500 dark:text-neutral-400">→ {story.outcomes?.[0] || story.demoAngle}</p>
    </div>
  );
}

function Badge({ label, tone }) {
  let className = "bg-neutral-50 text-neutral-600 border-neutral-200 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-800";
  if (tone && PROOF_LEVEL_STYLES[tone]) className = PROOF_LEVEL_STYLES[tone];
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${className}`}>{label}</span>;
}

function DetailCard({ title, icon: Icon, children }) {
  return (
    <div className="p-4 rounded-xl border bg-neutral-50/70 border-neutral-200 dark:bg-neutral-900/40 dark:border-neutral-800">
      <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono mb-2 flex items-center gap-1.5"><Icon size={12} /><span>{title}</span></h4>
      <div className="text-xs 2xl:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">{children}</div>
    </div>
  );
}

function SectionTitle({ children }) {
  return <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono mb-2">{children}</h4>;
}

function PillList({ items = [] }) {
  if (!items.length) return <p className="text-xs text-neutral-400">No values available.</p>;
  return (
    <div className="flex flex-wrap gap-1">
      {items.map((item) => (
        <span key={item} className="px-2 py-0.5 rounded-md bg-white dark:bg-neutral-800 text-neutral-500 dark:text-neutral-300 text-[10px] font-semibold border border-neutral-200 dark:border-neutral-700">{item}</span>
      ))}
    </div>
  );
}

function ModeButton({ mode, label, active, setActive }) {
  return (
    <button onClick={() => setActive(mode)} className={`px-2 py-0.5 text-[10px] rounded font-semibold transition-colors ${active === mode ? "bg-blue-500 text-white" : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"}`}>
      {label}
    </button>
  );
}
