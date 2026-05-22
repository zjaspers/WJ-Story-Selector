import React, { useMemo, useState, useEffect } from "react";
import {
  Search,
  Check,
  Copy,
  Users,
  Briefcase,
  Clock,
  Target,
  Moon,
  Sun,
  Folder,
  Sparkles,
  Inbox,
  Bookmark,
  Shield,
  TrendingUp,
  FileText,
  X,
  Layers,
  AlertTriangle,
  Gauge,
  MessageSquare,
  HelpCircle,
  Wand2,
  Star
} from "lucide-react";

/**
 * HOW TO USE
 * 1. Move your existing STORIES_DATA array into ./storiesData.js
 * 2. Export it:
 *    export const STORIES_DATA = [ ...your current 30 stories... ];
 * 3. Keep this file as App.jsx.
 */
import { STORIES_DATA as RAW_STORIES_DATA } from "./storiesData";

/**
 * Optional metadata layer.
 * This lets you improve the selector without rewriting every story.
 * Add or override story-level fields here over time.
 */
const STORY_ENRICHMENTS = {
  "story-02": {
    proofLevel: "Hard ROI",
    proofTheme: "Labor Savings",
    useWhen:
      "Use when a prospect says they already complete most tasks, but cannot prove the work is done on time.",
    avoidWhen:
      "Avoid as the first story if the buyer only cares about communications adoption.",
    openingProblem:
      "High completion rates can hide late execution that misses the business window.",
    recommendedQuestion:
      "Do you measure whether work is completed on time, or only whether it eventually gets completed?",
    personaAngles: {
      ops: "This shows Operations how WorkJam exposes late work, not just completed work.",
      hr: "This connects manager routines and store execution to frontline enablement.",
      it: "This shows how a single execution layer creates cleaner operational telemetry.",
      wfm: "This connects task timing to labor windows and manager workload."
    }
  },
  "story-03": {
    proofLevel: "Operational Metric",
    proofTheme: "Field Coaching",
    duplicateGroup: "ulta-store-variability",
    variantLabel: "Executive version",
    useWhen:
      "Use when a field or operations leader needs to see how averages hide store-level execution risk.",
    avoidWhen:
      "Avoid if you need a cleaner ROI story; use Ulta on-time execution instead.",
    openingProblem:
      "Corporate averages often hide massive variance across stores and districts.",
    recommendedQuestion:
      "When a region looks healthy on average, how do you know which stores are actually creating risk?",
    personaAngles: {
      ops: "This helps Ops move from broad scorecards to precise field intervention.",
      hr: "This frames coaching as a support mechanism, not a discipline mechanism.",
      it: "This shows why granular data needs to sit in one operating layer.",
      wfm: "This can be paired with scheduling data to understand whether labor timing is contributing to variance."
    }
  },
  "story-04": {
    proofLevel: "Operational Metric",
    proofTheme: "Task Design",
    duplicateGroup: "ulta-task-design",
    variantLabel: "Executive version",
    useWhen:
      "Use when a prospect blames employees for poor execution, but the real issue may be task design, timing, or instructions.",
    avoidWhen:
      "Avoid if the buyer is not responsible for task design or operational process ownership.",
    openingProblem:
      "Different task types can perform very differently with the exact same store teams.",
    recommendedQuestion:
      "How do you know whether missed work is a people issue, a timing issue, or an instruction design issue?",
    personaAngles: {
      ops: "This proves that better task design can improve execution without blaming stores.",
      hr: "This positions WorkJam as a coaching and enablement layer.",
      it: "This shows the value of structured workflow metadata.",
      wfm: "This connects work design to labor availability and task windows."
    }
  },
  "story-05": {
    proofLevel: "Operational Metric",
    proofTheme: "Maturity Model",
    useWhen:
      "Use when a prospect is overwhelmed by platform breadth and needs a phased adoption path.",
    avoidWhen:
      "Avoid if the buyer needs a single hard ROI number immediately.",
    openingProblem:
      "Large frontline organizations rarely transform all at once; they mature from communication to orchestration.",
    recommendedQuestion:
      "Where would you want to start: communication reach, employee voice, execution, or scheduling?",
    personaAngles: {
      ops: "This frames WorkJam as a crawl-walk-run operating model.",
      hr: "This shows how communication and employee voice can mature into behavior change.",
      it: "This supports a phased platform consolidation argument.",
      wfm: "This creates a path toward connecting schedules with work execution."
    }
  },
  "story-07": {
    proofLevel: "Scale Proof",
    proofTheme: "Enterprise Scale",
    useWhen:
      "Use when IT or Operations worries whether WorkJam can scale to very large distributed workforces.",
    avoidWhen:
      "Avoid if the buyer is only asking for a narrow point-solution workflow.",
    openingProblem:
      "Enterprise frontline teams need one mobile operating layer over many legacy systems.",
    recommendedQuestion:
      "How many different tools does a frontline employee need to touch today to start, manage, and complete their day?",
    personaAngles: {
      ops: "This proves WorkJam can become the daily operating interface at enterprise scale.",
      hr: "This shows that adoption improves when the platform gives employees daily utility.",
      it: "This is the strongest scale and consolidation proof point.",
      wfm: "This connects mobile schedule access and punching to workforce experience."
    }
  },
  "story-13": {
    proofLevel: "Hard ROI",
    proofTheme: "Cost Savings",
    useWhen:
      "Use when the buyer cares about tool consolidation, LMS cost, safety, or compliance training.",
    avoidWhen:
      "Avoid if the prospect is not ready to discuss learning, safety, or platform consolidation.",
    openingProblem:
      "Training scattered across too many systems creates cost, friction, and inconsistent completion.",
    recommendedQuestion:
      "How many systems do frontline employees currently use for training, safety content, and compliance sign-off?",
    personaAngles: {
      ops: "This connects training completion to safety outcomes.",
      hr: "This is a strong learning transformation and completion story.",
      it: "This is a direct consolidation story with a clear software savings angle.",
      wfm: "This is less WFM-specific, but useful if training readiness affects labor deployment."
    }
  },
  "story-17": {
    proofLevel: "Hard ROI",
    proofTheme: "Adoption + Shift Fill",
    useWhen:
      "Use when the buyer doubts employees will voluntarily adopt another app.",
    avoidWhen:
      "Avoid if scheduling is completely out of scope.",
    openingProblem:
      "Frontline employees adopt tools faster when the tool gives them direct control over hours and income.",
    recommendedQuestion:
      "What reason does an associate have today to open your frontline app every week?",
    personaAngles: {
      ops: "This connects adoption to operational reach.",
      hr: "This frames flexibility as an engagement and retention lever.",
      it: "This shows how a high-utility workflow can drive adoption of the broader platform.",
      wfm: "This is a core shift marketplace and labor flexibility story."
    }
  },
  "story-22": {
    proofLevel: "Adoption Proof",
    proofTheme: "Manufacturing Adoption",
    useWhen:
      "Use when manufacturing, union, plant, or hourly workforce leaders believe digital adoption will be low.",
    avoidWhen:
      "Avoid if the buyer needs task-management proof rather than communications and adoption proof.",
    openingProblem:
      "Hourly manufacturing teams often ignore corporate apps unless rollout is localized and plant-led.",
    recommendedQuestion:
      "What has historically prevented hourly workers from trusting or adopting digital communication tools?",
    personaAngles: {
      ops: "This shows how plant-level launch strategy creates operational reach.",
      hr: "This supports culture, employee experience, and localized engagement conversations.",
      it: "This shows how to introduce a standard platform without forcing a cold corporate rollout.",
      wfm: "This is not primarily a scheduling story, but it establishes adoption required for later workforce workflows."
    }
  },
  "story-23": {
    proofLevel: "Adoption Proof",
    proofTheme: "Daily Stickiness",
    useWhen:
      "Use when the buyer worries adoption will spike at launch and then fade.",
    avoidWhen:
      "Avoid if the buyer wants a hard dollar ROI story.",
    openingProblem:
      "Frontline apps fail when they feel like corporate megaphones instead of daily local utilities.",
    recommendedQuestion:
      "What content would make an hourly employee open the app every day, even when corporate has nothing urgent to say?",
    personaAngles: {
      ops: "This connects local relevance to sustained operational reach.",
      hr: "This is a strong culture and plant engagement story.",
      it: "This shows that adoption depends on governance and content strategy, not just deployment.",
      wfm: "This can be used as a foundation for future schedule or labor workflows."
    }
  },
  "story-26": {
    proofLevel: "Operational Metric",
    proofTheme: "Field Coaching",
    duplicateGroup: "ulta-store-variability",
    variantLabel: "Field coaching version",
    useWhen:
      "Use when you want a more field-leader-oriented version of the Ulta store variability story.",
    avoidWhen:
      "Avoid using alongside Story 03 unless you intentionally want both versions.",
    openingProblem:
      "Regional averages can look healthy while individual stores are failing badly.",
    recommendedQuestion:
      "How do your field leaders decide which stores need intervention this week?",
    personaAngles: {
      ops: "This is a field coaching and execution segmentation story.",
      hr: "This frames coaching as targeted enablement.",
      it: "This shows why store-level analytics matter.",
      wfm: "This can be paired with labor analysis to explain performance variance."
    }
  },
  "story-27": {
    proofLevel: "Operational Metric",
    proofTheme: "Task Design",
    duplicateGroup: "ulta-task-design",
    variantLabel: "Planogram version",
    useWhen:
      "Use when the buyer owns merchandising, planograms, or store execution process design.",
    avoidWhen:
      "Avoid using alongside Story 04 unless you intentionally want both versions.",
    openingProblem:
      "The same workforce can execute some work perfectly and fail other work because the task design is broken.",
    recommendedQuestion:
      "Which work types are chronically late, and how do you know whether the issue is design, timing, or ownership?",
    personaAngles: {
      ops: "This is a strong merchandising and execution quality story.",
      hr: "This supports training and instruction clarity.",
      it: "This highlights the value of structured workflow analytics.",
      wfm: "This connects task timing to labor allocation."
    }
  },
  "story-28": {
    proofLevel: "Operational Metric",
    proofTheme: "Engagement to Execution",
    useWhen:
      "Use when a communications leader needs to prove engagement is connected to operational performance.",
    avoidWhen:
      "Avoid if the buyer dislikes correlation stories and only wants direct ROI.",
    openingProblem:
      "Digital engagement is often treated as soft, even when it predicts store execution quality.",
    recommendedQuestion:
      "Can you currently show whether engaged locations execute better than disengaged locations?",
    personaAngles: {
      ops: "This proves that communication behavior can predict execution performance.",
      hr: "This is a strong culture and engagement-to-outcome story.",
      it: "This shows how cross-module data becomes more valuable in one platform.",
      wfm: "This is less WFM-specific, but useful when engagement affects shift reliability."
    }
  },
  "story-29": {
    proofLevel: "Operational Metric",
    proofTheme: "Scheduling Intelligence",
    useWhen:
      "Use when workforce management or operations wants to align task drops with labor availability.",
    avoidWhen:
      "Avoid if scheduling is not in scope.",
    openingProblem:
      "Tasks fail when work is assigned without understanding when labor is actually available.",
    recommendedQuestion:
      "Do you align task deadlines to actual staffing patterns, or are task drops planned separately from labor coverage?",
    personaAngles: {
      ops: "This connects execution performance to labor structure.",
      hr: "This is useful for workload fairness and manager experience.",
      it: "This supports integration between WFM and execution systems.",
      wfm: "This is a direct scheduling intelligence story."
    }
  }
};

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
    name: "Operations / Store Ops VP",
    focus: "Execution rates, field visibility, and labor hour protection",
    icon: Briefcase
  },
  {
    id: "hr",
    name: "HR / Learning / Communications",
    focus: "Adoption, culture, employee voice, training, and retention",
    icon: Users
  },
  {
    id: "it",
    name: "CIO / IT / Digital Lead",
    focus: "System consolidation, governance, integrations, and shadow IT",
    icon: Shield
  },
  {
    id: "wfm",
    name: "Workforce Management",
    focus: "Shift fill velocity, labor pools, schedule adoption, and coverage",
    icon: Clock
  }
];

const PROOF_LEVEL_STYLES = {
  "Hard ROI": "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30",
  "Operational Metric": "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/30",
  "Adoption Proof": "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/30",
  "Scale Proof": "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30",
  "Directional / Narrative": "bg-neutral-50 text-neutral-600 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700"
};

function inferProofLevel(story) {
  const joined = story.outcomes?.join(" ").toLowerCase() || "";
  if (joined.includes("$") || joined.includes("saving") || joined.includes("savings") || joined.includes("roi")) return "Hard ROI";
  if (joined.includes("%") || joined.includes("million") || joined.includes("hours") || joined.includes("tasks") || joined.includes("shifts")) return "Operational Metric";
  if (joined.includes("adoption") || joined.includes("dau")) return "Adoption Proof";
  return "Directional / Narrative";
}

function inferProofTheme(story) {
  const tags = story.tags || [];
  if (tags.includes("roi")) return "ROI";
  if (tags.includes("adoption")) return "Adoption";
  if (tags.includes("scheduling")) return "Scheduling";
  if (tags.includes("compliance")) return "Compliance";
  if (tags.includes("engagement")) return "Engagement";
  if (tags.includes("task_management")) return "Task Execution";
  return story.capabilities?.[0] || "Customer Proof";
}

function enrichStory(story) {
  const enrichment = STORY_ENRICHMENTS[story.id] || {};
  return {
    ...story,
    proofLevel: enrichment.proofLevel || inferProofLevel(story),
    proofTheme: enrichment.proofTheme || inferProofTheme(story),
    useWhen:
      enrichment.useWhen ||
      `Use when the prospect is dealing with ${story.primaryPains?.[0]?.toLowerCase() || "a similar frontline operating challenge"}.`,
    avoidWhen:
      enrichment.avoidWhen ||
      "Avoid if this story does not match the buyer's industry, pain, or proof requirement.",
    openingProblem:
      enrichment.openingProblem ||
      story.primaryPains?.[0] ||
      "The prospect has a frontline operating challenge that needs measurable execution.",
    recommendedQuestion:
      enrichment.recommendedQuestion ||
      `How are you currently addressing ${story.primaryPains?.[0]?.toLowerCase() || "this challenge"} across the frontline?`,
    personaAngles: {
      ops:
        enrichment.personaAngles?.ops ||
        `For Operations, this story connects ${story.capabilities?.[0] || "WorkJam"} to execution consistency.`,
      hr:
        enrichment.personaAngles?.hr ||
        "For HR and Communications, this story connects adoption, enablement, and employee experience.",
      it:
        enrichment.personaAngles?.it ||
        "For IT, this story supports a simpler, governed frontline technology layer.",
      wfm:
        enrichment.personaAngles?.wfm ||
        "For WFM, use this story when labor coverage, scheduling, or shift execution is part of the conversation."
    },
    duplicateGroup: enrichment.duplicateGroup || null,
    variantLabel: enrichment.variantLabel || null
  };
}

const STORIES_DATA = RAW_STORIES_DATA.map(enrichStory);

function buyerText(story) {
  return [...(story.primaryBuyers || []), ...(story.secondaryBuyers || [])]
    .join(" ")
    .toLowerCase();
}

function matchesPersona(story, personaId) {
  const buyers = buyerText(story);

  if (personaId === "ops") {
    return /operations|ops|field|store|district|regional|manufacturing|plant/.test(buyers);
  }

  if (personaId === "hr") {
    return /hr|learning|training|communications|comms|employee|culture|retention/.test(buyers);
  }

  if (personaId === "it") {
    return /it|digital|technology|security|cio/.test(buyers);
  }

  if (personaId === "wfm") {
    return /workforce|scheduling|labor|wfm|planning/.test(buyers);
  }

  return true;
}

function hasHardStat(story) {
  return story.outcomes?.some((o) => /[$%]|\d/.test(o)) || false;
}

function demoFitScore(demoFit) {
  const fit = (demoFit || "").toLowerCase();
  if (fit.includes("extremely")) return 10;
  if (fit.includes("very")) return 8;
  if (fit.includes("strong")) return 6;
  return 3;
}

function getStoryScore(story, { searchText, selectedIndustry, activePainName, activePersonaFilter, activeFolder }) {
  let score = 0;
  const text = searchText.trim().toLowerCase();

  if (activePainName) {
    const painMatch =
      story.primaryPains?.includes(activePainName) ||
      story.secondaryPains?.includes(activePainName);
    if (painMatch) score += 40;
  }

  if (activeFolder === "playbook" && matchesPersona(story, activePersonaFilter)) {
    score += 30;
  }

  if (selectedIndustry !== "All" && story.industry === selectedIndustry) {
    score += 20;
  }

  if (story.proofLevel === "Hard ROI") score += 15;
  if (story.proofLevel === "Operational Metric") score += 10;
  if (hasHardStat(story)) score += 10;

  score += demoFitScore(story.demoFit);

  if (text) {
    const searchable = [
      story.name,
      story.company,
      story.industry,
      story.narrative,
      story.whyItMatters,
      story.solution,
      story.demoAngle,
      story.proofTheme,
      story.proofLevel,
      ...(story.tags || []),
      ...(story.primaryPains || []),
      ...(story.capabilities || [])
    ]
      .join(" ")
      .toLowerCase();

    if (searchable.includes(text)) score += 25;
  }

  return score;
}

function getMatchReasons(story, context) {
  const reasons = [];
  const { selectedIndustry, activePainName, activePersonaFilter, activeFolder } = context;
  const persona = PERSONAS.find((p) => p.id === activePersonaFilter);

  if (selectedIndustry !== "All" && story.industry === selectedIndustry) {
    reasons.push(`Industry match: ${story.industry}`);
  }

  if (
    activePainName &&
    (story.primaryPains?.includes(activePainName) || story.secondaryPains?.includes(activePainName))
  ) {
    reasons.push(`Pain match: ${activePainName}`);
  }

  if (activeFolder === "playbook" && persona && matchesPersona(story, activePersonaFilter)) {
    reasons.push(`Persona match: ${persona.name}`);
  }

  if (story.proofLevel === "Hard ROI") {
    reasons.push("Strong proof: hard ROI");
  } else if (hasHardStat(story)) {
    reasons.push("Strong proof: quantified outcome");
  }

  if (story.demoFit?.toLowerCase().includes("extremely")) {
    reasons.push("Demo fit: extremely strong");
  }

  return reasons.slice(0, 4);
}

function buildCopyPayload(story, personaId, type) {
  const persona = PERSONAS.find((p) => p.id === personaId);
  const angle = story.personaAngles?.[personaId] || story.whyItMatters;
  const topOutcomes = story.outcomes?.slice(0, 3).map((o) => `- ${o}`).join("\n");

  if (type === "talkTrack") {
    return `${story.company} — ${story.name}

30-second talk track:
${story.openingProblem}

WorkJam helped by: ${story.solution}

Proof:
${topOutcomes}

Why this matters:
${angle}

Best discovery question:
${story.recommendedQuestion}`;
  }

  if (type === "discovery") {
    return `Discovery question for ${persona?.name || "buyer"}:

${story.recommendedQuestion}

Follow-up:
If you found a similar issue, who would own fixing it: Operations, HR, IT, Workforce Management, or field leadership?`;
  }

  if (type === "proof") {
    return `${story.company} proof points:

${topOutcomes}

Proof level: ${story.proofLevel}
Proof theme: ${story.proofTheme}
Demo angle: ${story.demoAngle}`;
  }

  if (type === "demoSetup") {
    return `Demo setup using ${story.company}:

1. Start with the business pain:
${story.openingProblem}

2. Show the WorkJam capability:
${story.capabilities?.join(", ")}

3. Connect to the proof:
${story.outcomes?.[0]}

4. Ask:
${story.recommendedQuestion}`;
  }

  return `${story.company} — ${story.name}
${story.narrative}

Key outcome: ${story.outcomes?.[0]}

Use when: ${story.useWhen}`;
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeFolder, setActiveFolder] = useState("all");
  const [selectedStory, setSelectedStory] = useState(STORIES_DATA[0]);
  const [searchText, setSearchText] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [activePainFilter, setActivePainFilter] = useState("p1");
  const [activePersonaFilter, setActivePersonaFilter] = useState("ops");
  const [playbookViewMode, setPlaybookViewMode] = useState("talkTrack");
  const [copiedId, setCopiedId] = useState(null);
  const [mobileView, setMobileView] = useState("list");
  const [showDuplicateVariants, setShowDuplicateVariants] = useState(false);

  const industries = useMemo(() => {
    const list = new Set();
    STORIES_DATA.forEach((s) => list.add(s.industry));
    return ["All", ...Array.from(list).sort()];
  }, []);

  const activePainName = useMemo(() => {
    return PAINS_LIST.find((p) => p.id === activePainFilter)?.name;
  }, [activePainFilter]);

  const context = {
    searchText,
    selectedIndustry,
    activePainName,
    activePersonaFilter,
    activeFolder
  };

  const filteredStories = useMemo(() => {
    const text = searchText.trim().toLowerCase();

    let results = STORIES_DATA.filter((story) => {
      const searchable = [
        story.name,
        story.company,
        story.industry,
        story.narrative,
        story.whyItMatters,
        story.solution,
        story.demoAngle,
        story.proofTheme,
        story.proofLevel,
        ...(story.tags || []),
        ...(story.primaryPains || []),
        ...(story.capabilities || [])
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = !text || searchable.includes(text);
      const matchesIndustry = selectedIndustry === "All" || story.industry === selectedIndustry;

      if (activeFolder === "matcher") {
        const matchesPain =
          story.primaryPains?.includes(activePainName) ||
          story.secondaryPains?.includes(activePainName);
        return matchesSearch && matchesIndustry && matchesPain;
      }

      if (activeFolder === "playbook") {
        return matchesSearch && matchesIndustry && matchesPersona(story, activePersonaFilter);
      }

      return matchesSearch && matchesIndustry;
    });

    if (!showDuplicateVariants) {
      const seenGroups = new Set();
      results = results.filter((story) => {
        if (!story.duplicateGroup) return true;
        if (seenGroups.has(story.duplicateGroup)) return false;
        seenGroups.add(story.duplicateGroup);
        return true;
      });
    }

    return results
      .map((story) => ({
        ...story,
        matchScore: getStoryScore(story, context),
        matchReasons: getMatchReasons(story, context)
      }))
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [
    searchText,
    selectedIndustry,
    activeFolder,
    activePainName,
    activePersonaFilter,
    showDuplicateVariants
  ]);

  const topRecommendations = useMemo(() => filteredStories.slice(0, 5), [filteredStories]);

  useEffect(() => {
    if (filteredStories.length > 0) {
      const stillExists = filteredStories.some((s) => s.id === selectedStory?.id);
      if (!stillExists) setSelectedStory(filteredStories[0]);
    } else {
      setSelectedStory(null);
    }
  }, [filteredStories, selectedStory]);

  const handleCopyText = async (text, id) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch (err) {
      console.error("Clipboard copy failed", err);
    }
  };

  const generatedPlaybookText = useMemo(() => {
    if (!selectedStory) return "No story selected.";
    return buildCopyPayload(selectedStory, activePersonaFilter, playbookViewMode);
  }, [selectedStory, activePersonaFilter, playbookViewMode]);

  const selectedPersona = PERSONAS.find((p) => p.id === activePersonaFilter);
  const SelectedPersonaIcon = selectedPersona?.icon || Users;

  return (
    <div
      className={`min-h-screen font-sans antialiased selection:bg-blue-500/20 transition-colors duration-200 ${
        darkMode ? "bg-[#121212] text-neutral-100" : "bg-[#F2F2F7] text-neutral-950"
      }`}
    >
      <header
        className={`px-4 py-3 flex items-center justify-between border-b sticky top-0 z-40 ${
          darkMode ? "bg-[#1C1C1E] border-neutral-800" : "bg-white border-neutral-200"
        }`}
      >
        <div className="flex items-center gap-3">
          <Folder size={16} className="text-blue-500" />
          <span className="text-xs font-semibold tracking-tight text-neutral-400 font-mono">
            WORKJAM STORY SELECTOR v7.0
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex text-[10px] font-mono text-neutral-400">
            {STORIES_DATA.length} stories · ranked by fit
          </span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-1.5 rounded-lg transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
              darkMode ? "text-amber-400" : "text-neutral-500"
            }`}
            title="Toggle theme"
          >
            {darkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 min-h-[calc(100vh-50px)]">
        <aside
          className={`md:col-span-3 border-r p-4 flex flex-col gap-5 ${
            darkMode ? "bg-[#1C1C1E] border-neutral-800" : "bg-[#F2F2F7] border-neutral-300"
          } ${mobileView !== "sidebar" ? "hidden md:flex" : "flex"}`}
        >
          <div>
            <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-2 mb-2">
              Smart Folders
            </h3>

            <div className="flex flex-col gap-1">
              <SidebarButton
                active={activeFolder === "all"}
                icon={Inbox}
                label="All Verified Stories"
                count={STORIES_DATA.length}
                onClick={() => {
                  setActiveFolder("all");
                  setMobileView("list");
                }}
              />

              <SidebarButton
                active={activeFolder === "matcher"}
                icon={Bookmark}
                label="Filter by Client Pain"
                count={PAINS_LIST.length}
                onClick={() => {
                  setActiveFolder("matcher");
                  setMobileView("list");
                }}
              />

              <SidebarButton
                active={activeFolder === "playbook"}
                icon={Sparkles}
                label="Interactive Playbooks"
                count="Active"
                onClick={() => {
                  setActiveFolder("playbook");
                  setMobileView("list");
                }}
              />
            </div>
          </div>

          {activeFolder === "matcher" && (
            <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
              <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-2 mb-2">
                Active Pain Point
              </h3>
              <div className="flex flex-col gap-1 max-h-[280px] overflow-y-auto pr-1">
                {PAINS_LIST.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActivePainFilter(p.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-all truncate leading-snug ${
                      activePainFilter === p.id
                        ? darkMode
                          ? "bg-neutral-800 text-blue-300"
                          : "bg-white text-blue-600 shadow-sm"
                        : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                    }`}
                    title={p.name}
                  >
                    • {p.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeFolder === "playbook" && (
            <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
              <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-2 mb-2">
                Buyer Persona Focus
              </h3>
              <div className="flex flex-col gap-1">
                {PERSONAS.map((p) => {
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActivePersonaFilter(p.id)}
                      className={`w-full text-left p-2 rounded-lg text-[11px] transition-all border ${
                        activePersonaFilter === p.id
                          ? darkMode
                            ? "bg-neutral-800 border-neutral-700 text-white"
                            : "bg-white border-neutral-200 text-neutral-900 shadow-sm"
                          : "border-transparent text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-semibold">
                        <Icon size={12} className="text-blue-500" />
                        <span>{p.name}</span>
                      </div>
                      <p className="text-[10px] text-neutral-400 mt-0.5 leading-snug">
                        {p.focus}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <label className="flex items-center gap-2 text-[11px] text-neutral-500 cursor-pointer">
              <input
                type="checkbox"
                checked={showDuplicateVariants}
                onChange={(e) => setShowDuplicateVariants(e.target.checked)}
                className="rounded"
              />
              Show duplicate story variants
            </label>
          </div>

          <div className="mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-800 px-2 text-[10px] text-neutral-400 leading-snug font-mono">
            Story recommendation engine · scores by pain, persona, proof, industry, and demo fit.
          </div>
        </aside>

        <section
          className={`md:col-span-4 border-r flex flex-col ${
            darkMode ? "bg-[#18181B] border-neutral-800" : "bg-white border-neutral-200"
          } ${
            mobileView === "sidebar" || (mobileView === "detail" && selectedStory)
              ? "hidden md:flex"
              : "flex"
          }`}
        >
          <div className="p-3 border-b border-neutral-200 dark:border-neutral-800 flex flex-col gap-2 shrink-0">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 text-neutral-400" size={13} />
              <input
                type="text"
                placeholder="Search by company, pain, proof, capability..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className={`w-full pl-8 pr-6 py-1.5 rounded-lg text-xs transition-colors focus:outline-none ${
                  darkMode
                    ? "bg-neutral-800 text-white placeholder-neutral-500"
                    : "bg-neutral-100 text-neutral-950 placeholder-neutral-500"
                }`}
              />
              {searchText && (
                <button
                  onClick={() => setSearchText("")}
                  className="absolute right-2 top-2 text-neutral-400 hover:text-neutral-600"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            <div className="flex gap-1.5 items-center justify-between text-[11px] text-neutral-500">
              <span className="font-mono font-bold text-[9px] uppercase tracking-wider">
                Sector Match
              </span>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="py-0.5 px-1.5 rounded bg-transparent border border-neutral-200 dark:border-neutral-800 text-xs font-semibold focus:outline-none max-w-[160px] text-neutral-700 dark:text-neutral-300"
              >
                {industries.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind === "All" ? "All Sectors" : ind}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="md:hidden p-2 bg-neutral-100 dark:bg-neutral-900 flex items-center justify-between shrink-0">
            <button
              onClick={() => setMobileView("sidebar")}
              className="text-xs text-blue-500 font-semibold flex items-center gap-1"
            >
              ← Folders & Persona
            </button>
            <span className="text-[10px] font-mono text-neutral-400">
              {filteredStories.length} matched
            </span>
          </div>

          {topRecommendations.length > 0 && (
            <div className="p-3 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-1.5 mb-2">
                <Star size={12} className="text-amber-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 font-mono">
                  Best-fit recommendations
                </span>
              </div>
              <div className="flex flex-col gap-1">
                {topRecommendations.slice(0, 3).map((story, idx) => (
                  <button
                    key={story.id}
                    onClick={() => {
                      setSelectedStory(story);
                      setMobileView("detail");
                    }}
                    className="text-left rounded-lg p-2 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-neutral-800 dark:text-neutral-100 truncate">
                        {idx + 1}. {story.company}: {story.name}
                      </span>
                      <span className="text-[10px] font-mono text-blue-500 shrink-0">
                        {story.matchScore}
                      </span>
                    </div>
                    <p className="text-[10px] text-neutral-500 mt-0.5 line-clamp-1">
                      {story.matchReasons?.[0] || story.useWhen}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800">
            {filteredStories.length === 0 ? (
              <div className="p-8 text-center text-neutral-400">
                <p className="text-xs">No customer stories found matching active rules.</p>
              </div>
            ) : (
              filteredStories.map((story) => {
                const isSelected = selectedStory?.id === story.id;
                const badgeClass =
                  PROOF_LEVEL_STYLES[story.proofLevel] ||
                  PROOF_LEVEL_STYLES["Directional / Narrative"];

                return (
                  <button
                    key={story.id}
                    onClick={() => {
                      setSelectedStory(story);
                      setMobileView("detail");
                    }}
                    className={`w-full p-3.5 text-left transition-colors cursor-pointer ${
                      isSelected
                        ? darkMode
                          ? "bg-neutral-800 text-white"
                          : "bg-blue-50 text-neutral-900"
                        : darkMode
                          ? "hover:bg-neutral-900 text-neutral-300"
                          : "hover:bg-neutral-50 text-neutral-800"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-1">
                      <span className="text-[10px] font-mono tracking-tight text-neutral-400 font-semibold">
                        {story.company}
                      </span>
                      <span className="text-[9px] font-mono font-bold text-blue-500 shrink-0 bg-blue-500/10 px-1 rounded">
                        SCORE {story.matchScore}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold leading-tight tracking-tight mt-1 line-clamp-1 text-neutral-800 dark:text-neutral-100">
                      {story.name}
                    </h4>

                    <div className="flex flex-wrap gap-1 mt-2">
                      <span className={`text-[9px] px-1.5 py-0.5 rounded border ${badgeClass}`}>
                        {story.proofLevel}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 text-neutral-500">
                        {story.proofTheme}
                      </span>
                      {story.variantLabel && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded border border-amber-200 text-amber-700 dark:border-amber-500/30 dark:text-amber-300">
                          {story.variantLabel}
                        </span>
                      )}
                    </div>

                    <p
                      className={`text-[11px] mt-1.5 italic truncate ${
                        isSelected
                          ? "text-neutral-700 dark:text-neutral-300 font-medium"
                          : "text-neutral-500 dark:text-neutral-400"
                      }`}
                    >
                      → {story.outcomes?.[0]}
                    </p>
                  </button>
                );
              })
            )}
          </div>
        </section>

        <main
          className={`md:col-span-5 p-6 flex flex-col overflow-y-auto max-h-[calc(100vh-50px)] ${
            darkMode ? "bg-[#121212]" : "bg-white"
          } ${mobileView !== "detail" ? "hidden md:flex" : "flex"}`}
        >
          {selectedStory ? (
            <div className="flex flex-col gap-6 text-left max-w-2xl mx-auto w-full">
              <div className="md:hidden flex items-center justify-between border-b pb-3 border-neutral-200 dark:border-neutral-800 shrink-0">
                <button
                  onClick={() => setMobileView("list")}
                  className="text-xs text-blue-500 font-bold flex items-center gap-1"
                >
                  ← Back to List
                </button>
                <span className="text-[10px] font-mono text-neutral-400 font-bold">
                  Story {selectedStory.num}
                </span>
              </div>

              <div className="border-b border-neutral-100 dark:border-neutral-800 pb-4">
                <div className="flex items-center gap-2 mb-2 text-[10px] font-mono font-bold text-blue-500 tracking-wider">
                  <span>STORY RECOMMENDATION</span>
                  <span>•</span>
                  <span>{selectedStory.industry}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
                  {selectedStory.company} — {selectedStory.name}
                </h2>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  <Badge label={`Score ${selectedStory.matchScore ?? getStoryScore(selectedStory, context)}`} />
                  <Badge label={selectedStory.proofLevel} tone={selectedStory.proofLevel} />
                  <Badge label={selectedStory.proofTheme} />
                  {selectedStory.variantLabel && <Badge label={selectedStory.variantLabel} tone="warning" />}
                </div>
              </div>

              {selectedStory.duplicateGroup && (
                <div className="p-3 rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-500/10 dark:border-amber-500/30">
                  <div className="flex gap-2">
                    <AlertTriangle size={14} className="text-amber-600 dark:text-amber-300 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                      This is part of a duplicate/variant group. Use one version unless you intentionally want multiple angles from the same customer proof.
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard title="Target Audiences">
                  <p>
                    <strong>Primary:</strong> {selectedStory.primaryBuyers?.join("; ")}
                  </p>
                  {selectedStory.secondaryBuyers && (
                    <p className="text-neutral-400 mt-1">
                      <strong>Secondary:</strong> {selectedStory.secondaryBuyers.join("; ")}
                    </p>
                  )}
                </InfoCard>

                <InfoCard title="Profile Characteristics">
                  <p>{selectedStory.profile}</p>
                </InfoCard>
              </div>

              <div>
                <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono mb-2">What Actually Happened</h4>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {selectedStory.narrative}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Callout
                  icon={Gauge}
                  title="Use This When"
                  body={selectedStory.useWhen}
                  tone="blue"
                />
                <Callout
                  icon={HelpCircle}
                  title="Avoid / Use Carefully When"
                  body={selectedStory.avoidWhen}
                  tone="neutral"
                />
              </div>

              <div
                className={`p-4 rounded-xl border ${
                  darkMode ? "bg-emerald-500/10 border-emerald-500/30" : "bg-emerald-50 border-emerald-200"
                }`}
              >
                <h4 className="text-[10px] text-emerald-600 dark:text-emerald-300 font-extrabold uppercase tracking-widest font-mono mb-2.5 flex items-center gap-1.5">
                  <TrendingUp size={12} />
                  <span>Key Outcomes / Verified Proof</span>
                </h4>
                <ul className="flex flex-col gap-2">
                  {selectedStory.outcomes?.map((outcome, idx) => (
                    <li key={idx} className="text-xs text-neutral-800 dark:text-neutral-200 flex items-start gap-2">
                      <span className="text-emerald-500 font-bold mt-0.5">•</span>
                      <span className="font-medium">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={`p-4 rounded-xl border ${
                  darkMode ? "bg-blue-500/10 border-blue-500/30" : "bg-blue-50 border-blue-100"
                }`}
              >
                <h4 className="text-[10px] text-blue-500 font-extrabold uppercase tracking-widest font-mono mb-2 flex items-center gap-1">
                  <Target size={12} />
                  <span>Recommended Value Angle</span>
                </h4>
                <p className="text-xs text-neutral-800 dark:text-neutral-200 font-semibold">
                  {selectedStory.demoAngle}
                </p>
              </div>

              <div className="border-t border-neutral-100 dark:border-neutral-800 pt-4">
                <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono mb-2">Buyer-Specific Framing</h4>
                <div className="flex items-start gap-2 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <SelectedPersonaIcon size={15} className="text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-neutral-800 dark:text-neutral-100">
                      {selectedPersona?.name}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                      {selectedStory.personaAngles?.[activePersonaFilter]}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-neutral-100 dark:border-neutral-800 pt-4">
                <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono mb-2">Sales Discovery Context</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {selectedStory.whyItMatters}
                </p>
                <div className="mt-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                    Recommended Question
                  </p>
                  <p className="text-xs text-neutral-800 dark:text-neutral-200 font-semibold">
                    {selectedStory.recommendedQuestion}
                  </p>
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border ${
                  darkMode ? "bg-neutral-900 border-neutral-800" : "bg-neutral-50 border-neutral-200 shadow-sm"
                } mt-2`}
              >
                <div className="flex items-center justify-between border-b pb-2.5 mb-3 border-neutral-200 dark:border-neutral-800">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
                    <Wand2 size={12} />
                    Copy Builder
                  </span>
                  <div className="flex gap-1.5 flex-wrap justify-end">
                    <ModeButton mode="talkTrack" label="Talk Track" active={playbookViewMode} setActive={setPlaybookViewMode} />
                    <ModeButton mode="discovery" label="Question" active={playbookViewMode} setActive={setPlaybookViewMode} />
                    <ModeButton mode="proof" label="Proof" active={playbookViewMode} setActive={setPlaybookViewMode} />
                    <ModeButton mode="demoSetup" label="Demo" active={playbookViewMode} setActive={setPlaybookViewMode} />
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-lg max-h-[260px] overflow-y-auto font-mono text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-300 whitespace-pre-wrap">
                  {generatedPlaybookText}
                </div>

                <button
                  onClick={() => handleCopyText(generatedPlaybookText, "gen-playbook")}
                  className={`w-full py-1.5 rounded-lg text-xs font-semibold mt-3 flex items-center justify-center gap-1.5 transition-all ${
                    copiedId === "gen-playbook"
                      ? "bg-emerald-500 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white shadow-sm"
                  }`}
                >
                  {copiedId === "gen-playbook" ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedId === "gen-playbook" ? "Copied!" : "Copy Active Draft"}</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-1 pb-6">
                {selectedStory.capabilities?.map((cap) => (
                  <span
                    key={cap}
                    className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 text-[10px] font-semibold border border-neutral-200 dark:border-transparent"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-neutral-400 flex flex-col items-center justify-center h-full max-w-sm mx-auto">
              <FileText className="text-neutral-300 dark:text-neutral-700 mb-2" size={32} />
              <p className="text-xs">
                No customer story matches these filter settings. Adjust sector, pain filters, or search terms.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function SidebarButton({ active, icon: Icon, label, count, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
        active
          ? "bg-blue-500 text-white"
          : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800"
      }`}
    >
      <div className="flex items-center gap-2">
        <Icon size={13} />
        <span>{label}</span>
      </div>
      <span className={`text-[10px] font-mono ${active ? "text-white/80" : "text-neutral-400"}`}>
        {count}
      </span>
    </button>
  );
}

function Badge({ label, tone }) {
  let cls = "bg-neutral-50 text-neutral-600 border-neutral-200 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-800";
  if (tone && PROOF_LEVEL_STYLES[tone]) cls = PROOF_LEVEL_STYLES[tone];
  if (tone === "warning") cls = "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30";

  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cls}`}>{label}</span>;
}

function InfoCard({ title, children }) {
  return (
    <div className="p-4 rounded-xl border bg-neutral-50/70 border-neutral-200 dark:bg-neutral-900/40 dark:border-neutral-800">
      <span className="block text-[9px] font-bold text-neutral-400 uppercase tracking-widest font-mono">
        {title}
      </span>
      <div className="mt-1.5 text-xs text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function Callout({ icon: Icon, title, body, tone }) {
  const toneClass =
    tone === "blue"
      ? "bg-blue-50 border-blue-100 dark:bg-blue-500/10 dark:border-blue-500/30"
      : "bg-neutral-50 border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800";

  return (
    <div className={`p-4 rounded-xl border ${toneClass}`}>
      <h4 className="text-[10px] font-extrabold uppercase tracking-widest font-mono mb-2 flex items-center gap-1.5 text-neutral-500 dark:text-neutral-300">
        <Icon size={12} />
        <span>{title}</span>
      </h4>
      <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">{body}</p>
    </div>
  );
}

function ModeButton({ mode, label, active, setActive }) {
  return (
    <button
      onClick={() => setActive(mode)}
      className={`px-2 py-0.5 text-[10px] rounded font-semibold transition-colors ${
        active === mode
          ? "bg-blue-500 text-white"
          : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
      }`}
    >
      {label}
    </button>
  );
}

/**
 * Add this to your global CSS if you are not already using a Tailwind plugin.
 *
 * .SectionLabel {
 *   @apply text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono mb-2;
 * }
 */
