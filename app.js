const VERBS_DATA_URL = "./data/kofi-verbs.json";
const NOUNS_DATA_URL = "./data/top-2000-nouns.json";
const BEGINNER_DATA_URL = "./data/beginner-phrases.json";
const DISCOURSE_DATA_URL = "./data/discourse-chunks.json";
const CONVERSION_DATA_URL = "./data/english-spanish-conversion.json";
const GRAMMAR_DATA_URL = "./data/grammar-decks.json";
const SLANG_DATA_URL = "./data/slang.json";
const STORIES_DATA_URL = "./data/stories.json";
const ITALIAN_VERBS_DATA_URL = "./data/kofi-verbs-it.json";
const ITALIAN_NOUNS_DATA_URL = "./data/top-2000-nouns-it.json";
const ITALIAN_BEGINNER_DATA_URL = "./data/beginner-phrases-it.json";
const ITALIAN_DISCOURSE_DATA_URL = "./data/discourse-chunks-it.json";
const ITALIAN_CONVERSION_DATA_URL = "./data/english-italian-conversion.json";
const ITALIAN_GRAMMAR_DATA_URL = "./data/grammar-decks-it.json";
const ITALIAN_SLANG_DATA_URL = "./data/slang-it.json";
const ITALIAN_STORIES_DATA_URL = "./data/stories-it.json";
const BEST_SCORES_STORAGE_KEY = "rapid-spanish-best-scores-v3";
const ADMIN_MODE_STORAGE_KEY = "rapid-spanish-admin-mode-v1";
const USERS_STORAGE_KEY = "rapid-spanish-users-v1";
const SESSION_STORAGE_KEY = "rapid-spanish-session-v1";
const ACTIVITY_STORAGE_KEY = "rapid-spanish-activity-v1";
const ATTEMPT_STATS_STORAGE_KEY = "rapid-spanish-attempt-stats-v1";
const SRS_STORAGE_KEY = "rapid-spanish-srs-v1";
const GAMIFICATION_STORAGE_KEY = "rapid-spanish-gamification-v1";
const SUPABASE_SESSION_STORAGE_KEY = "rapid-spanish-supabase-session-v1";
const LANGUAGE_STORAGE_KEY = "rapid-spanish-language-v1";
const ADMIN_MODE_USERNAME = "jake";
const DEFAULT_LANGUAGE = "es";
const SUPPORTED_LANGUAGES = ["es", "it"];
const STORY_UNLOCK_THRESHOLDS = [2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const QUIZ_TIMER_DURATION_MS = 5 * 60 * 1000;
const TRACK_UNLOCK_THRESHOLD_PERCENT = 90;
const QUIZ_UNLOCK_THRESHOLD_PERCENT = 50;
const SRS_VERSION = 1;
const SRS_DAILY_NEW_LIMIT = 20;
const SRS_LEARNING_STEPS_MINUTES = [1, 10];
const SRS_DEFAULT_EASE = 2.5;
const SRS_MIN_EASE = 1.3;
const SRS_MAX_EASE = 3.3;
const ATTEMPT_SESSION_BREAK_MS = 10 * 60 * 1000;
const MIN_ATTEMPT_ACTIVITY_MS = 4 * 1000;
const MAX_ATTEMPT_ACTIVITY_MS = 2 * 60 * 1000;

const SUPABASE_CONFIG = window.RAPID_SPANISH_SUPABASE_CONFIG || {};
const SUPABASE_ENABLED = Boolean(SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey);
const SUPABASE_USERNAME_DOMAIN = SUPABASE_CONFIG.usernameDomain || "rapidspanish.local";

const ACHIEVEMENT_DEFINITIONS = [
  {
    id: "first-correct",
    title: "First Correct",
    description: "Get your first correct answer.",
  },
  {
    id: "ten-correct",
    title: "Warm Up",
    description: "Reach 10 total correct answers.",
  },
  {
    id: "hundred-correct",
    title: "Centurion",
    description: "Reach 100 total correct answers.",
  },
  {
    id: "streak-3",
    title: "3-Day Streak",
    description: "Study 3 days in a row.",
  },
  {
    id: "streak-7",
    title: "7-Day Streak",
    description: "Study 7 days in a row.",
  },
  {
    id: "story-1",
    title: "Story Starter",
    description: "Read your first story.",
  },
  {
    id: "story-6",
    title: "Story Explorer",
    description: "Read 6 unique stories.",
  },
  {
    id: "srs-20",
    title: "SRS Initiate",
    description: "Complete 20 SRS reviews.",
  },
  {
    id: "srs-200",
    title: "SRS Grinder",
    description: "Complete 200 SRS reviews.",
  },
  {
    id: "progress-10",
    title: "Map Scout",
    description: "Reach 10% overall progress.",
  },
  {
    id: "progress-25",
    title: "Map Climber",
    description: "Reach 25% overall progress.",
  },
  {
    id: "perfect-score",
    title: "Perfect Run",
    description: "Get a perfect best score on any deck.",
  },
];

const TRAINING_MODULES = [
  {
    id: "beginner-phrases",
    title: "Beginner Phrases",
    subtitle: "16 grouped decks (635 items)",
    type: "beginner",
  },
  {
    id: "kofi-verb-training",
    title: "KOFI Verb Training",
    subtitle: "Core tenses (no subjuntivo/imperativo)",
    type: "kofi",
  },
  {
    id: "top-500-nouns",
    title: "Top 500 Nouns",
    subtitle: "10 decks of 50 nouns",
    type: "nouns",
  },
  {
    id: "discourse-chunks",
    title: "Discourse Chunks",
    subtitle: "5 grouped decks (251 items)",
    type: "discourse",
  },
  {
    id: "english-to-spanish-conversion",
    title: "English -> Spanish Conversion",
    subtitle: "14 rule decks (434 items)",
    type: "conversion",
  },
  {
    id: "grammar",
    title: "Grammar",
    subtitle: "18 deck MVP (180 items)",
    type: "grammar",
  },
  {
    id: "slang",
    title: "Slang",
    subtitle: "7 regional decks (350 items)",
    type: "slang",
  },
  {
    id: "kofi-verb-training-additional-tenses",
    title: "KOFI Verb Training Additional Tenses",
    subtitle: "Subjuntivo + imperativo (+ infinitive)",
    type: "kofi-additional",
  },
  {
    id: "top-nouns-501-2000",
    title: "Top Nouns 501 - 2000",
    subtitle: "30 decks of 50 nouns",
    type: "nouns-advanced",
  },
];

const TRAINING_MODULES_ITALIAN = [
  {
    id: "beginner-phrases-it",
    title: "Beginner Phrases",
    subtitle: "16 grouped decks (635 items)",
    type: "beginner",
  },
  {
    id: "italian-verb-training",
    title: "Italian Verb Training",
    subtitle: "Core tenses",
    type: "kofi",
  },
  {
    id: "top-italian-nouns",
    title: "Top Italian Nouns",
    subtitle: "10 decks of 50 nouns",
    type: "nouns",
  },
  {
    id: "italian-discourse-chunks",
    title: "Discourse Chunks",
    subtitle: "High-frequency phrase chunks",
    type: "discourse",
  },
  {
    id: "english-to-italian-conversion",
    title: "English -> Italian Conversion",
    subtitle: "Pattern and conversion drills",
    type: "conversion",
  },
  {
    id: "italian-grammar",
    title: "Grammar",
    subtitle: "Italian grammar prompts",
    type: "grammar",
  },
  {
    id: "italian-slang",
    title: "Slang",
    subtitle: "Regional + modern Italian slang",
    type: "slang",
  },
  {
    id: "italian-verb-training-additional",
    title: "Italian Verb Training Additional Moods",
    subtitle: "Subgiuntivo + imperativo (+ infinitive)",
    type: "kofi-additional",
  },
  {
    id: "top-italian-nouns-advanced",
    title: "Top Italian Nouns Advanced",
    subtitle: "30 decks of 50 nouns",
    type: "nouns-advanced",
  },
];

const TRAINING_MODULES_BY_LANGUAGE = {
  es: TRAINING_MODULES,
  it: TRAINING_MODULES_ITALIAN,
};

const LANGUAGE_DATA_URLS = {
  es: {
    verbs: VERBS_DATA_URL,
    nouns: NOUNS_DATA_URL,
    beginner: BEGINNER_DATA_URL,
    discourse: DISCOURSE_DATA_URL,
    conversion: CONVERSION_DATA_URL,
    grammar: GRAMMAR_DATA_URL,
    slang: SLANG_DATA_URL,
    stories: STORIES_DATA_URL,
  },
  it: {
    verbs: ITALIAN_VERBS_DATA_URL,
    nouns: ITALIAN_NOUNS_DATA_URL,
    beginner: ITALIAN_BEGINNER_DATA_URL,
    discourse: ITALIAN_DISCOURSE_DATA_URL,
    conversion: ITALIAN_CONVERSION_DATA_URL,
    grammar: ITALIAN_GRAMMAR_DATA_URL,
    slang: ITALIAN_SLANG_DATA_URL,
    stories: ITALIAN_STORIES_DATA_URL,
  },
};

const LANGUAGE_UI_COPY = {
  es: {
    appTitle: "Rapid Spanish",
    targetLanguageName: "Spanish",
    targetLanguageAdjective: "Spanish",
    storiesIntro: "Read short stories in Spanish. They unlock as your study progress increases.",
    srsIntro: "Type the Spanish answer, press Enter to check, then grade your recall quality.",
  },
  it: {
    appTitle: "Rapid Italian",
    targetLanguageName: "Italian",
    targetLanguageAdjective: "Italian",
    storiesIntro: "Read short stories in Italian. They unlock as your study progress increases.",
    srsIntro: "Type the Italian answer, press Enter to check, then grade your recall quality.",
  },
};

const TRACK_UNLOCK_TIERS = [
  ["beginner"],
  ["kofi", "nouns"],
  ["discourse", "conversion"],
  ["grammar", "slang"],
  ["kofi-additional", "nouns-advanced"],
];
const TRACK_TIER_LABELS = ["Start", "First Unlock", "Second Unlock", "Third Unlock", "Forth Unlock"];
const STATS_TRACKS = [
  { id: "kofi", label: "KOFI Verbs" },
  { id: "nouns", label: "Top 500 Nouns" },
  { id: "beginner", label: "Beginner Phrases" },
  { id: "discourse", label: "Discourse Chunks" },
  { id: "conversion", label: "English -> Spanish Conversion" },
  { id: "grammar", label: "Grammar" },
  { id: "slang", label: "Slang" },
  { id: "kofi-additional", label: "KOFI Additional Tenses" },
  { id: "nouns-advanced", label: "Top Nouns 501 - 2000" },
];

const DISCOURSE_GROUPS = [
  {
    key: "verb_preposition_chunks",
    id: "verb-preposition-chunks",
    title: "Verb + Preposition Chunks",
  },
  {
    key: "verb_noun_fixed_phrases",
    id: "verb-noun-fixed-phrases",
    title: "Verb + Noun Fixed Phrases",
  },
  {
    key: "light_verb_constructions",
    id: "light-verb-constructions",
    title: "Light Verb Constructions",
  },
  {
    key: "discourse_conversation_chunks",
    id: "discourse-conversation-chunks",
    title: "Discourse Conversation Chunks",
  },
  {
    key: "emotional_reaction_chunks",
    id: "emotional-reaction-chunks",
    title: "Emotional Reaction Chunks",
  },
];

const authView = document.getElementById("authView");
const appContent = document.getElementById("appContent");
const trainingHubView = document.getElementById("trainingHubView");
const dashboardView = document.getElementById("dashboardView");
const quizView = document.getElementById("quizView");
const nounsDashboardView = document.getElementById("nounsDashboardView");
const nounsQuizView = document.getElementById("nounsQuizView");
const beginnerDashboardView = document.getElementById("beginnerDashboardView");
const beginnerQuizView = document.getElementById("beginnerQuizView");
const discourseDashboardView = document.getElementById("discourseDashboardView");
const discourseQuizView = document.getElementById("discourseQuizView");
const conversionDashboardView = document.getElementById("conversionDashboardView");
const conversionQuizView = document.getElementById("conversionQuizView");
const grammarDashboardView = document.getElementById("grammarDashboardView");
const grammarQuizView = document.getElementById("grammarQuizView");
const slangDashboardView = document.getElementById("slangDashboardView");
const slangQuizView = document.getElementById("slangQuizView");
const leaderboardView = document.getElementById("leaderboardView");
const accountView = document.getElementById("accountView");
const storyView = document.getElementById("storyView");
const srsReviewView = document.getElementById("srsReviewView");
const srsManageView = document.getElementById("srsManageView");
const moduleView = document.getElementById("moduleView");
const statusPanel = document.getElementById("statusPanel");

const appViews = [
  trainingHubView,
  dashboardView,
  quizView,
  nounsDashboardView,
  nounsQuizView,
  beginnerDashboardView,
  beginnerQuizView,
  discourseDashboardView,
  discourseQuizView,
  conversionDashboardView,
  conversionQuizView,
  grammarDashboardView,
  grammarQuizView,
  slangDashboardView,
  slangQuizView,
  leaderboardView,
  accountView,
  storyView,
  srsReviewView,
  srsManageView,
  moduleView,
];

const trainingGrid = document.getElementById("trainingGrid");
const appEyebrow = document.getElementById("appEyebrow");
const languageToggle = document.getElementById("languageToggle");
const progressMap = document.getElementById("progressMap");
const trainingHubProgressText = document.getElementById("trainingHubProgressText");
const trainingHubProgressFill = document.getElementById("trainingHubProgressFill");
const adminModeToggle = document.getElementById("adminModeToggle");
const adminModeControl = adminModeToggle?.closest(".admin-mode-toggle");
const storiesUnlockMeta = document.getElementById("storiesUnlockMeta");
const storiesIntroText = document.getElementById("storiesIntroText");
const storiesGrid = document.getElementById("storiesGrid");
const srsHubMeta = document.getElementById("srsHubMeta");
const srsDueNow = document.getElementById("srsDueNow");
const srsNewToday = document.getElementById("srsNewToday");
const srsStartButton = document.getElementById("srsStartButton");
const srsManageButton = document.getElementById("srsManageButton");
const leaderboardHubGlobalList = document.getElementById("leaderboardHubGlobalList");
const leaderboardHubWeeklyList = document.getElementById("leaderboardHubWeeklyList");
const statsOverallAccuracy = document.getElementById("statsOverallAccuracy");
const statsMinutesStudied = document.getElementById("statsMinutesStudied");
const statsWordsPerMinute = document.getElementById("statsWordsPerMinute");
const statsWeeklyTrend = document.getElementById("statsWeeklyTrend");
const statsMasteryPace = document.getElementById("statsMasteryPace");
const statsHardestTrack = document.getElementById("statsHardestTrack");
const statsTrackList = document.getElementById("statsTrackList");
const statsHardestDecksList = document.getElementById("statsHardestDecksList");
const streakCurrentValue = document.getElementById("streakCurrentValue");
const streakBestValue = document.getElementById("streakBestValue");
const achievementsUnlockedValue = document.getElementById("achievementsUnlockedValue");
const streakLastActiveValue = document.getElementById("streakLastActiveValue");
const achievementsList = document.getElementById("achievementsList");
const globalLeaderboardList = document.getElementById("globalLeaderboardList");
const weeklyLeaderboardList = document.getElementById("weeklyLeaderboardList");
const currentUserLabel = document.getElementById("currentUserLabel");
const accountManageButton = document.getElementById("accountManageButton");
const logoutButton = document.getElementById("logoutButton");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");
const loginFeedback = document.getElementById("loginFeedback");
const signupName = document.getElementById("signupName");
const signupUsername = document.getElementById("signupUsername");
const signupPassword = document.getElementById("signupPassword");
const signupPasswordConfirm = document.getElementById("signupPasswordConfirm");
const signupFeedback = document.getElementById("signupFeedback");
const accountBackButton = document.getElementById("accountBackButton");
const accountUsernameMeta = document.getElementById("accountUsernameMeta");
const profileForm = document.getElementById("profileForm");
const profileNameInput = document.getElementById("profileNameInput");
const profileFeedback = document.getElementById("profileFeedback");
const passwordForm = document.getElementById("passwordForm");
const currentPasswordInput = document.getElementById("currentPasswordInput");
const newPasswordInput = document.getElementById("newPasswordInput");
const newPasswordConfirmInput = document.getElementById("newPasswordConfirmInput");
const passwordFeedback = document.getElementById("passwordFeedback");

const backToTrainingButton = document.getElementById("backToTrainingButton");
const backToTrainingFromNounsButton = document.getElementById(
  "backToTrainingFromNounsButton",
);
const backToTrainingFromBeginnerButton = document.getElementById(
  "backToTrainingFromBeginnerButton",
);
const backToTrainingFromDiscourseButton = document.getElementById(
  "backToTrainingFromDiscourseButton",
);
const backToTrainingFromConversionButton = document.getElementById(
  "backToTrainingFromConversionButton",
);
const backToTrainingFromGrammarButton = document.getElementById(
  "backToTrainingFromGrammarButton",
);
const backToTrainingFromSlangButton = document.getElementById(
  "backToTrainingFromSlangButton",
);
const backToTrainingFromLeaderboardButton = document.getElementById(
  "backToTrainingFromLeaderboardButton",
);
const moduleBackButton = document.getElementById("moduleBackButton");
const moduleTitle = document.getElementById("moduleTitle");
const moduleBody = document.getElementById("moduleBody");
const moduleDashboardProgressText = document.getElementById(
  "moduleDashboardProgressText",
);
const moduleDashboardProgressFill = document.getElementById(
  "moduleDashboardProgressFill",
);

const verbSearch = document.getElementById("verbSearch");
const verbCount = document.getElementById("verbCount");
const verbGrid = document.getElementById("verbGrid");
const verbDashboardProgressText = document.getElementById("verbDashboardProgressText");
const verbDashboardProgressFill = document.getElementById("verbDashboardProgressFill");

const backButton = document.getElementById("backButton");
const giveUpButton = document.getElementById("giveUpButton");
const quizVerbTitle = document.getElementById("quizVerbTitle");
const quizMeta = document.getElementById("quizMeta");
const answerInput = document.getElementById("answerInput");
const feedback = document.getElementById("feedback");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const formsList = document.getElementById("formsList");

const nounsDeckCount = document.getElementById("nounsDeckCount");
const nounsDeckGrid = document.getElementById("nounsDeckGrid");
const nounModeToggle = document.getElementById("nounModeToggle");
const nounsDashboardProgressText = document.getElementById(
  "nounsDashboardProgressText",
);
const nounsDashboardProgressFill = document.getElementById(
  "nounsDashboardProgressFill",
);

const nounsBackButton = document.getElementById("nounsBackButton");
const nounsGiveUpButton = document.getElementById("nounsGiveUpButton");
const nounsQuizTitle = document.getElementById("nounsQuizTitle");
const nounsQuizMeta = document.getElementById("nounsQuizMeta");
const nounsAnswerLabel = document.getElementById("nounsAnswerLabel");
const nounsAnswerInput = document.getElementById("nounsAnswerInput");
const nounsFeedback = document.getElementById("nounsFeedback");
const nounsProgressText = document.getElementById("nounsProgressText");
const nounsProgressFill = document.getElementById("nounsProgressFill");
const nounsList = document.getElementById("nounsList");

const beginnerDeckCount = document.getElementById("beginnerDeckCount");
const beginnerDeckGrid = document.getElementById("beginnerDeckGrid");
const beginnerDashboardProgressText = document.getElementById(
  "beginnerDashboardProgressText",
);
const beginnerDashboardProgressFill = document.getElementById(
  "beginnerDashboardProgressFill",
);

const beginnerBackButton = document.getElementById("beginnerBackButton");
const beginnerGiveUpButton = document.getElementById("beginnerGiveUpButton");
const beginnerQuizTitle = document.getElementById("beginnerQuizTitle");
const beginnerQuizMeta = document.getElementById("beginnerQuizMeta");
const beginnerAnswerLabel = document.getElementById("beginnerAnswerLabel");
const beginnerAnswerInput = document.getElementById("beginnerAnswerInput");
const beginnerFeedback = document.getElementById("beginnerFeedback");
const beginnerProgressText = document.getElementById("beginnerProgressText");
const beginnerProgressFill = document.getElementById("beginnerProgressFill");
const beginnerList = document.getElementById("beginnerList");

const discourseDeckCount = document.getElementById("discourseDeckCount");
const discourseDeckGrid = document.getElementById("discourseDeckGrid");
const discourseDashboardProgressText = document.getElementById(
  "discourseDashboardProgressText",
);
const discourseDashboardProgressFill = document.getElementById(
  "discourseDashboardProgressFill",
);

const discourseBackButton = document.getElementById("discourseBackButton");
const discourseGiveUpButton = document.getElementById("discourseGiveUpButton");
const discourseQuizTitle = document.getElementById("discourseQuizTitle");
const discourseQuizMeta = document.getElementById("discourseQuizMeta");
const discourseAnswerLabel = document.getElementById("discourseAnswerLabel");
const discourseAnswerInput = document.getElementById("discourseAnswerInput");
const discourseFeedback = document.getElementById("discourseFeedback");
const discourseProgressText = document.getElementById("discourseProgressText");
const discourseProgressFill = document.getElementById("discourseProgressFill");
const discourseList = document.getElementById("discourseList");

const conversionDeckCount = document.getElementById("conversionDeckCount");
const conversionDeckGrid = document.getElementById("conversionDeckGrid");
const conversionDashboardProgressText = document.getElementById(
  "conversionDashboardProgressText",
);
const conversionDashboardProgressFill = document.getElementById(
  "conversionDashboardProgressFill",
);

const conversionBackButton = document.getElementById("conversionBackButton");
const conversionGiveUpButton = document.getElementById("conversionGiveUpButton");
const conversionQuizTitle = document.getElementById("conversionQuizTitle");
const conversionQuizMeta = document.getElementById("conversionQuizMeta");
const conversionRuleDescription = document.getElementById("conversionRuleDescription");
const conversionAnswerLabel = document.getElementById("conversionAnswerLabel");
const conversionAnswerInput = document.getElementById("conversionAnswerInput");
const conversionFeedback = document.getElementById("conversionFeedback");
const conversionProgressText = document.getElementById("conversionProgressText");
const conversionProgressFill = document.getElementById("conversionProgressFill");
const conversionList = document.getElementById("conversionList");

const grammarDeckCount = document.getElementById("grammarDeckCount");
const grammarDeckGrid = document.getElementById("grammarDeckGrid");
const grammarDashboardProgressText = document.getElementById(
  "grammarDashboardProgressText",
);
const grammarDashboardProgressFill = document.getElementById(
  "grammarDashboardProgressFill",
);
const slangDeckCount = document.getElementById("slangDeckCount");
const slangDeckGrid = document.getElementById("slangDeckGrid");
const slangDashboardProgressText = document.getElementById(
  "slangDashboardProgressText",
);
const slangDashboardProgressFill = document.getElementById(
  "slangDashboardProgressFill",
);

const grammarBackButton = document.getElementById("grammarBackButton");
const grammarGiveUpButton = document.getElementById("grammarGiveUpButton");
const grammarQuizTitle = document.getElementById("grammarQuizTitle");
const grammarQuizMeta = document.getElementById("grammarQuizMeta");
const grammarRuleDescription = document.getElementById("grammarRuleDescription");
const grammarAnswerLabel = document.getElementById("grammarAnswerLabel");
const grammarAnswerInput = document.getElementById("grammarAnswerInput");
const grammarFeedback = document.getElementById("grammarFeedback");
const grammarProgressText = document.getElementById("grammarProgressText");
const grammarProgressFill = document.getElementById("grammarProgressFill");
const grammarList = document.getElementById("grammarList");
const slangBackButton = document.getElementById("slangBackButton");
const slangGiveUpButton = document.getElementById("slangGiveUpButton");
const slangQuizTitle = document.getElementById("slangQuizTitle");
const slangQuizMeta = document.getElementById("slangQuizMeta");
const slangRegionDescription = document.getElementById("slangRegionDescription");
const slangAnswerLabel = document.getElementById("slangAnswerLabel");
const slangAnswerInput = document.getElementById("slangAnswerInput");
const slangFeedback = document.getElementById("slangFeedback");
const slangProgressText = document.getElementById("slangProgressText");
const slangProgressFill = document.getElementById("slangProgressFill");
const slangList = document.getElementById("slangList");

const storyBackButton = document.getElementById("storyBackButton");
const storyTitle = document.getElementById("storyTitle");
const storyMeta = document.getElementById("storyMeta");
const storyBody = document.getElementById("storyBody");
const srsBackButton = document.getElementById("srsBackButton");
const srsManageFromReviewButton = document.getElementById("srsManageFromReviewButton");
const srsReviewMeta = document.getElementById("srsReviewMeta");
const srsDeckLabel = document.getElementById("srsDeckLabel");
const srsPrompt = document.getElementById("srsPrompt");
const srsIntroText = document.getElementById("srsIntroText");
const srsAnswerLabel = document.getElementById("srsAnswerLabel");
const srsAnswerInput = document.getElementById("srsAnswerInput");
const srsFeedback = document.getElementById("srsFeedback");
const srsRevealAnswer = document.getElementById("srsRevealAnswer");
const srsSessionSummary = document.getElementById("srsSessionSummary");
const srsGradeAgainButton = document.getElementById("srsGradeAgainButton");
const srsGradeHardButton = document.getElementById("srsGradeHardButton");
const srsGradeGoodButton = document.getElementById("srsGradeGoodButton");
const srsGradeEasyButton = document.getElementById("srsGradeEasyButton");
const srsManageBackButton = document.getElementById("srsManageBackButton");
const srsSelectUnlockedButton = document.getElementById("srsSelectUnlockedButton");
const srsClearSelectionButton = document.getElementById("srsClearSelectionButton");
const srsManageSummary = document.getElementById("srsManageSummary");
const srsManageDeckList = document.getElementById("srsManageDeckList");
const verbDashboardTitle = dashboardView?.querySelector(".panel-header h2");
const nounsDashboardTitle = nounsDashboardView?.querySelector(".panel-header h2");
const beginnerDashboardTitle = beginnerDashboardView?.querySelector(".panel-header h2");
const discourseDashboardTitle = discourseDashboardView?.querySelector(".panel-header h2");
const conversionDashboardTitle = conversionDashboardView?.querySelector(".panel-header h2");
const grammarDashboardTitle = grammarDashboardView?.querySelector(".panel-header h2");
const slangDashboardTitle = slangDashboardView?.querySelector(".panel-header h2");

function createEmptyBestScores() {
  return {
    verbs: {},
    nouns: {},
    beginner: {},
    discourse: {},
    conversion: {},
    grammar: {},
    slang: {},
  };
}

function normalizeBestScores(rawScores) {
  const safe = createEmptyBestScores();
  if (!rawScores || typeof rawScores !== "object") {
    return safe;
  }

  if (rawScores.verbs && rawScores.nouns) {
    safe.verbs = rawScores.verbs || {};
    safe.nouns = rawScores.nouns || {};
    safe.beginner = rawScores.beginner || {};
    safe.discourse = rawScores.discourse || {};
    safe.conversion = rawScores.conversion || {};
    safe.grammar = rawScores.grammar || {};
    safe.slang = rawScores.slang || {};
    return safe;
  }

  safe.verbs = rawScores;
  return safe;
}

const state = {
  verbs: [],
  verbsAdditional: [],
  nounDecks: [],
  nounDecksAdvanced: [],
  beginnerGroups: [],
  discourseGroups: [],
  conversionGroups: [],
  grammarGroups: [],
  slangGroups: [],
  stories: [],
  activeLanguage: loadPreferredLanguage(),
  nounMode: "singular",
  activeVerbTrack: "core",
  activeNounTrack: "core",
  bestScores: createEmptyBestScores(),
  currentVerb: null,
  foundIndexes: new Set(),
  answerLookup: new Map(),
  quizEnded: false,
  currentNounDeck: null,
  currentNounItems: [],
  nounFoundIndexes: new Set(),
  nounAnswerLookup: new Map(),
  nounQuizEnded: false,
  currentBeginnerGroup: null,
  currentBeginnerItems: [],
  beginnerFoundIndexes: new Set(),
  beginnerAnswerLookup: new Map(),
  beginnerQuizEnded: false,
  currentDiscourseGroup: null,
  currentDiscourseItems: [],
  discourseFoundIndexes: new Set(),
  discourseAnswerLookup: new Map(),
  discourseQuizEnded: false,
  currentConversionGroup: null,
  currentConversionItems: [],
  conversionFoundIndexes: new Set(),
  conversionAnswerLookup: new Map(),
  conversionQuizEnded: false,
  currentGrammarGroup: null,
  currentGrammarItems: [],
  grammarFoundIndexes: new Set(),
  grammarAnswerLookup: new Map(),
  grammarQuizEnded: false,
  currentSlangGroup: null,
  currentSlangItems: [],
  slangFoundIndexes: new Set(),
  slangAnswerLookup: new Map(),
  slangQuizEnded: false,
  currentStory: null,
  quizTimerIntervalId: null,
  quizTimerDeadline: 0,
  quizTimerOnTick: null,
  quizTimerOnExpire: null,
  adminMode: false,
  users: {},
  activityMap: {},
  attemptStats: null,
  gamificationData: null,
  srsData: null,
  supabaseSession: null,
  remoteLeaderboardRows: [],
  srsDeckCatalog: [],
  srsDeckMap: new Map(),
  srsCardMap: new Map(),
  srsQueue: [],
  srsCurrentCard: null,
  srsCurrentSubmitted: false,
  srsCurrentCorrect: false,
  srsCurrentRecommendedGrade: "good",
  srsSessionReviewed: 0,
  srsSessionCorrect: 0,
  currentUser: null,
  dataLoaded: false,
};

const textEncoder = new TextEncoder();

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function generateSalt() {
  return toHex(crypto.getRandomValues(new Uint8Array(16)));
}

function normalizeUsername(value) {
  return value.trim().toLowerCase();
}

function countWords(value) {
  return String(value || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function createEmptyAttemptStats() {
  const byTrack = {};
  STATS_TRACKS.forEach((track) => {
    byTrack[track.id] = { attempts: 0, correct: 0 };
  });
  return {
    totals: { attempts: 0, correct: 0, words: 0, activeMs: 0 },
    byTrack,
    history: [],
    meta: {
      lastAttemptTs: 0,
    },
  };
}

function normalizeAttemptStats(rawStats) {
  const safeStats = createEmptyAttemptStats();
  if (!rawStats || typeof rawStats !== "object") {
    return safeStats;
  }

  safeStats.totals.attempts = Math.max(0, Number(rawStats?.totals?.attempts) || 0);
  safeStats.totals.correct = Math.max(0, Number(rawStats?.totals?.correct) || 0);
  safeStats.totals.words = Math.max(0, Number(rawStats?.totals?.words) || 0);
  safeStats.totals.activeMs = Math.max(0, Number(rawStats?.totals?.activeMs) || 0);

  STATS_TRACKS.forEach((track) => {
    const source = rawStats?.byTrack?.[track.id] || {};
    safeStats.byTrack[track.id] = {
      attempts: Math.max(0, Number(source.attempts) || 0),
      correct: Math.max(0, Number(source.correct) || 0),
    };
  });

  safeStats.history = Array.isArray(rawStats.history)
    ? rawStats.history
        .map((entry) => ({
          ts: Number(entry.ts),
          track: String(entry.track || ""),
          correct: Boolean(entry.correct),
          words: Math.max(0, Number(entry.words) || 0),
          activeMs: Math.max(0, Number(entry.activeMs) || 0),
        }))
        .filter(
          (entry) =>
            Number.isFinite(entry.ts) &&
            STATS_TRACKS.some((track) => track.id === entry.track),
        )
        .slice(-6000)
    : [];

  safeStats.meta.lastAttemptTs = Math.max(0, Number(rawStats?.meta?.lastAttemptTs) || 0);

  return safeStats;
}

function getTodayKey() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dayKeyToUtcMs(dayKey) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dayKey)) {
    return NaN;
  }
  const [year, month, day] = dayKey.split("-").map((value) => Number(value));
  return Date.UTC(year, month - 1, day);
}

function dayKeyDiff(fromDayKey, toDayKey) {
  const fromMs = dayKeyToUtcMs(fromDayKey);
  const toMs = dayKeyToUtcMs(toDayKey);
  if (!Number.isFinite(fromMs) || !Number.isFinite(toMs)) {
    return 0;
  }
  return Math.round((toMs - fromMs) / (24 * 60 * 60 * 1000));
}

function createEmptySrsData() {
  return {
    version: SRS_VERSION,
    initialized: false,
    selectedDecks: {},
    cardStates: {},
    daily: {
      date: getTodayKey(),
      newCount: 0,
    },
    stats: {
      reviews: 0,
      correct: 0,
    },
  };
}

function normalizeSrsCardState(rawState) {
  const now = Date.now();
  return {
    ease: Math.max(SRS_MIN_EASE, Math.min(SRS_MAX_EASE, Number(rawState?.ease) || SRS_DEFAULT_EASE)),
    intervalDays: Math.max(0, Number(rawState?.intervalDays) || 0),
    dueAt: Number.isFinite(Number(rawState?.dueAt)) ? Number(rawState.dueAt) : now,
    reps: Math.max(0, Number(rawState?.reps) || 0),
    lapses: Math.max(0, Number(rawState?.lapses) || 0),
    step: Number.isFinite(Number(rawState?.step)) ? Number(rawState.step) : 0,
    seen: Math.max(0, Number(rawState?.seen) || 0),
    lastGrade: String(rawState?.lastGrade || ""),
    lastReviewedAt: Number.isFinite(Number(rawState?.lastReviewedAt))
      ? Number(rawState.lastReviewedAt)
      : 0,
  };
}

function normalizeSrsData(rawData) {
  const safe = createEmptySrsData();
  if (!rawData || typeof rawData !== "object") {
    return safe;
  }

  safe.initialized = Boolean(rawData.initialized);

  if (rawData.selectedDecks && typeof rawData.selectedDecks === "object") {
    Object.entries(rawData.selectedDecks).forEach(([deckId, selected]) => {
      if (selected) {
        safe.selectedDecks[String(deckId)] = true;
      }
    });
  }

  if (rawData.cardStates && typeof rawData.cardStates === "object") {
    Object.entries(rawData.cardStates).forEach(([cardId, cardState]) => {
      safe.cardStates[String(cardId)] = normalizeSrsCardState(cardState);
    });
  }

  const date = String(rawData?.daily?.date || "");
  safe.daily.date = /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : getTodayKey();
  safe.daily.newCount = Math.max(0, Number(rawData?.daily?.newCount) || 0);

  safe.stats.reviews = Math.max(0, Number(rawData?.stats?.reviews) || 0);
  safe.stats.correct = Math.max(0, Number(rawData?.stats?.correct) || 0);

  return safe;
}

function createEmptyGamificationData() {
  return {
    streak: {
      current: 0,
      best: 0,
      lastActiveDate: "",
    },
    achievements: {},
    storiesRead: {},
  };
}

function normalizeGamificationData(rawData) {
  const safe = createEmptyGamificationData();
  if (!rawData || typeof rawData !== "object") {
    return safe;
  }

  safe.streak.current = Math.max(0, Number(rawData?.streak?.current) || 0);
  safe.streak.best = Math.max(0, Number(rawData?.streak?.best) || 0);
  safe.streak.lastActiveDate = /^\d{4}-\d{2}-\d{2}$/.test(rawData?.streak?.lastActiveDate || "")
    ? rawData.streak.lastActiveDate
    : "";

  if (rawData.achievements && typeof rawData.achievements === "object") {
    Object.entries(rawData.achievements).forEach(([id, value]) => {
      if (!ACHIEVEMENT_DEFINITIONS.some((achievement) => achievement.id === id)) {
        return;
      }
      if (value && typeof value === "object") {
        const unlockedAt = Number(value.unlockedAt);
        safe.achievements[id] = {
          unlockedAt: Number.isFinite(unlockedAt) ? unlockedAt : Date.now(),
        };
      } else if (Boolean(value)) {
        safe.achievements[id] = {
          unlockedAt: Date.now(),
        };
      }
    });
  }

  if (rawData.storiesRead && typeof rawData.storiesRead === "object") {
    Object.entries(rawData.storiesRead).forEach(([storyId, read]) => {
      if (read) {
        safe.storiesRead[String(storyId)] = true;
      }
    });
  }

  return safe;
}

function normalizeLanguageCode(value) {
  const normalized = String(value || "")
    .trim()
    .toLowerCase();
  return SUPPORTED_LANGUAGES.includes(normalized) ? normalized : DEFAULT_LANGUAGE;
}

function loadPreferredLanguage() {
  try {
    return normalizeLanguageCode(localStorage.getItem(LANGUAGE_STORAGE_KEY) || DEFAULT_LANGUAGE);
  } catch (error) {
    console.warn("Unable to load language setting:", error);
    return DEFAULT_LANGUAGE;
  }
}

function savePreferredLanguage(language) {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, normalizeLanguageCode(language));
  } catch (error) {
    console.warn("Unable to persist language setting:", error);
  }
}

function getCurrentLanguage() {
  return normalizeLanguageCode(state?.activeLanguage || DEFAULT_LANGUAGE);
}

function getLanguageUiCopy(language = getCurrentLanguage()) {
  return LANGUAGE_UI_COPY[normalizeLanguageCode(language)] || LANGUAGE_UI_COPY[DEFAULT_LANGUAGE];
}

function getTargetLanguageName() {
  return getLanguageUiCopy().targetLanguageName;
}

function getTargetLanguageAdjective() {
  return getLanguageUiCopy().targetLanguageAdjective;
}

function getDataUrlsForLanguage(language = getCurrentLanguage()) {
  const normalized = normalizeLanguageCode(language);
  return LANGUAGE_DATA_URLS[normalized] || LANGUAGE_DATA_URLS[DEFAULT_LANGUAGE];
}

function getTrainingModules(language = getCurrentLanguage()) {
  const normalized = normalizeLanguageCode(language);
  return TRAINING_MODULES_BY_LANGUAGE[normalized] || TRAINING_MODULES_BY_LANGUAGE[DEFAULT_LANGUAGE];
}

function getTrainingModuleByType(type, language = getCurrentLanguage()) {
  return getTrainingModules(language).find((module) => module.type === type) || null;
}

function getLanguageScopedStorageKey(baseKey) {
  return `${baseKey}::${getCurrentLanguage()}`;
}

function applyLanguageUiText() {
  const copy = getLanguageUiCopy();
  document.title = `${copy.appTitle} | Training Dashboard`;
  if (appEyebrow) {
    appEyebrow.textContent = copy.appTitle;
  }
  if (storiesIntroText) {
    storiesIntroText.textContent = copy.storiesIntro;
  }
  if (srsIntroText) {
    srsIntroText.textContent = copy.srsIntro;
  }
  if (srsAnswerLabel) {
    srsAnswerLabel.textContent = `Type ${copy.targetLanguageAdjective} answer`;
  }
}

function refreshLanguageModuleTitles() {
  if (verbDashboardTitle) {
    verbDashboardTitle.textContent = getVerbTrackTitle(state.activeVerbTrack || "core");
  }
  if (nounsDashboardTitle) {
    nounsDashboardTitle.textContent = getNounTrackTitle(state.activeNounTrack || "core");
  }
  if (beginnerDashboardTitle) {
    beginnerDashboardTitle.textContent = getTrainingModuleByType("beginner")?.title || "Beginner Phrases";
  }
  if (discourseDashboardTitle) {
    discourseDashboardTitle.textContent = getTrainingModuleByType("discourse")?.title || "Discourse Chunks";
  }
  if (conversionDashboardTitle) {
    conversionDashboardTitle.textContent =
      getTrainingModuleByType("conversion")?.title || "English -> Spanish Conversion";
  }
  if (grammarDashboardTitle) {
    grammarDashboardTitle.textContent = getTrainingModuleByType("grammar")?.title || "Grammar";
  }
  if (slangDashboardTitle) {
    slangDashboardTitle.textContent = getTrainingModuleByType("slang")?.title || "Slang";
  }
}

function canUseAdminMode(user = state.currentUser) {
  return normalizeUsername(user?.username || "") === ADMIN_MODE_USERNAME;
}

function refreshAdminModeAccess() {
  const hasUser = Boolean(state.currentUser?.username);
  const isAllowed = canUseAdminMode();

  if (hasUser && !isAllowed) {
    state.adminMode = false;
  }

  if (adminModeToggle) {
    adminModeToggle.disabled = !isAllowed;
    adminModeToggle.checked = isAllowed ? state.adminMode : false;
  }

  if (adminModeControl) {
    adminModeControl.hidden = !isAllowed;
  }
}

function getBestScoresStorageKey() {
  if (!state.currentUser?.username) {
    return `${getLanguageScopedStorageKey(BEST_SCORES_STORAGE_KEY)}::guest`;
  }
  return `${getLanguageScopedStorageKey(BEST_SCORES_STORAGE_KEY)}::${state.currentUser.username}`;
}

function getAttemptStatsStorageKey() {
  if (!state.currentUser?.username) {
    return `${getLanguageScopedStorageKey(ATTEMPT_STATS_STORAGE_KEY)}::guest`;
  }
  return `${getLanguageScopedStorageKey(ATTEMPT_STATS_STORAGE_KEY)}::${state.currentUser.username}`;
}

function getSrsStorageKey() {
  if (!state.currentUser?.username) {
    return `${getLanguageScopedStorageKey(SRS_STORAGE_KEY)}::guest`;
  }
  return `${getLanguageScopedStorageKey(SRS_STORAGE_KEY)}::${state.currentUser.username}`;
}

function getGamificationStorageKey() {
  if (!state.currentUser?.username) {
    return `${getLanguageScopedStorageKey(GAMIFICATION_STORAGE_KEY)}::guest`;
  }
  return `${getLanguageScopedStorageKey(GAMIFICATION_STORAGE_KEY)}::${state.currentUser.username}`;
}

function getActivityStorageKey() {
  return getLanguageScopedStorageKey(ACTIVITY_STORAGE_KEY);
}

let remoteStateSyncTimer = null;

function hasSupabaseConfig() {
  return SUPABASE_ENABLED;
}

function normalizeSupabaseUrl() {
  const url = String(SUPABASE_CONFIG.url || "").trim().replace(/\/+$/, "");
  return url;
}

function usernameToAuthEmail(username) {
  const normalized = normalizeUsername(username);
  const safeLocal = normalized.replace(/[^a-z0-9._-]/g, "");
  return `${safeLocal}@${SUPABASE_USERNAME_DOMAIN}`;
}

function loadSupabaseSession() {
  try {
    const raw = localStorage.getItem(SUPABASE_SESSION_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return null;
    }
    if (!parsed.access_token || !parsed.refresh_token) {
      return null;
    }
    return parsed;
  } catch (error) {
    console.error("Could not load Supabase session:", error);
    return null;
  }
}

function saveSupabaseSession(session) {
  state.supabaseSession = session || null;
  try {
    if (!session) {
      localStorage.removeItem(SUPABASE_SESSION_STORAGE_KEY);
      return;
    }
    localStorage.setItem(SUPABASE_SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch (error) {
    console.error("Could not save Supabase session:", error);
  }
}

function clearSupabaseSession() {
  saveSupabaseSession(null);
}

function getSupabaseHeaders({ auth = true, extra = {} } = {}) {
  const headers = {
    apikey: SUPABASE_CONFIG.anonKey,
    ...extra,
  };
  if (auth && state.supabaseSession?.access_token) {
    headers.Authorization = `Bearer ${state.supabaseSession.access_token}`;
  }
  return headers;
}

async function supabaseRequest(
  path,
  { method = "GET", auth = true, headers = {}, body, retryOnAuthError = true } = {},
) {
  const url = `${normalizeSupabaseUrl()}${path}`;
  const requestHeaders = getSupabaseHeaders({ auth, extra: headers });
  if (body !== undefined && !requestHeaders["Content-Type"]) {
    requestHeaders["Content-Type"] = "application/json";
  }

  const response = await fetch(url, {
    method,
    headers: requestHeaders,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (response.status === 401 && auth && retryOnAuthError && state.supabaseSession?.refresh_token) {
    const refreshed = await refreshSupabaseSession();
    if (refreshed?.access_token) {
      return supabaseRequest(path, {
        method,
        auth,
        headers,
        body,
        retryOnAuthError: false,
      });
    }
  }

  let payload = null;
  const rawText = await response.text();
  if (rawText) {
    try {
      payload = JSON.parse(rawText);
    } catch (_error) {
      payload = rawText;
    }
  }

  if (!response.ok) {
    const message =
      payload?.error_description ||
      payload?.msg ||
      payload?.message ||
      `Supabase request failed (${response.status})`;
    throw new Error(message);
  }

  return payload;
}

async function refreshSupabaseSession() {
  if (!state.supabaseSession?.refresh_token) {
    return null;
  }
  const payload = await supabaseRequest("/auth/v1/token?grant_type=refresh_token", {
    method: "POST",
    auth: false,
    body: {
      refresh_token: state.supabaseSession.refresh_token,
    },
  });
  if (!payload?.access_token) {
    return null;
  }
  saveSupabaseSession(payload);
  return payload;
}

async function fetchSupabaseUser() {
  if (!state.supabaseSession?.access_token) {
    return null;
  }
  try {
    return await supabaseRequest("/auth/v1/user", { method: "GET", auth: true });
  } catch (error) {
    if (!/401|jwt|expired|invalid/i.test(String(error.message || ""))) {
      throw error;
    }
    const refreshed = await refreshSupabaseSession();
    if (!refreshed?.access_token) {
      return null;
    }
    return await supabaseRequest("/auth/v1/user", { method: "GET", auth: true });
  }
}

async function supabaseSignUp({ username, password, name }) {
  const email = usernameToAuthEmail(username);
  const payload = await supabaseRequest("/auth/v1/signup", {
    method: "POST",
    auth: false,
    body: {
      email,
      password,
      data: {
        username: normalizeUsername(username),
        display_name: name.trim(),
      },
    },
  });
  if (payload?.session?.access_token) {
    saveSupabaseSession(payload.session);
  }
  return payload;
}

async function supabaseSignIn({ username, password }) {
  const email = usernameToAuthEmail(username);
  const payload = await supabaseRequest("/auth/v1/token?grant_type=password", {
    method: "POST",
    auth: false,
    body: {
      email,
      password,
    },
  });
  if (payload?.access_token) {
    saveSupabaseSession(payload);
  }
  return payload;
}

async function supabaseSignOut() {
  if (!state.supabaseSession?.access_token) {
    clearSupabaseSession();
    return;
  }
  try {
    await supabaseRequest("/auth/v1/logout", { method: "POST", auth: true });
  } catch (error) {
    console.warn("Supabase sign-out warning:", error.message);
  }
  clearSupabaseSession();
}

async function supabaseUpdatePassword(nextPassword) {
  await supabaseRequest("/auth/v1/user", {
    method: "PUT",
    auth: true,
    body: {
      password: nextPassword,
    },
  });
}

async function fetchProfilesMap() {
  const rows = await supabaseRequest("/rest/v1/profiles?select=user_id,username,display_name", {
    method: "GET",
    auth: true,
  });
  const users = {};
  (Array.isArray(rows) ? rows : []).forEach((row) => {
    const username = normalizeUsername(row.username || "");
    if (!username) {
      return;
    }
    users[username] = {
      username,
      name: row.display_name || username,
      user_id: row.user_id || "",
    };
  });
  return users;
}

async function fetchProfileByUserId(userId) {
  const rows = await supabaseRequest(
    `/rest/v1/profiles?user_id=eq.${encodeURIComponent(userId)}&select=user_id,username,display_name&limit=1`,
    {
      method: "GET",
      auth: true,
    },
  );
  return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
}

async function upsertProfile({ userId, username, name }) {
  const normalized = normalizeUsername(username);
  await supabaseRequest("/rest/v1/profiles", {
    method: "POST",
    auth: true,
    headers: {
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: [
      {
        user_id: userId,
        username: normalized,
        display_name: name.trim(),
      },
    ],
  });
}

async function fetchRemoteUserState(userId) {
  const rows = await supabaseRequest(
    `/rest/v1/user_state?user_id=eq.${encodeURIComponent(
      userId,
    )}&select=user_id,best_scores,attempt_stats,activity_entries,srs_state,gamification_state&limit=1`,
    {
      method: "GET",
      auth: true,
    },
  );
  return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
}

async function upsertRemoteUserState(userId) {
  if (!state.currentUser?.username) {
    return;
  }
  const username = normalizeUsername(state.currentUser.username);
  const profileName = state.currentUser.name || username;
  const userEntries = Array.isArray(state.activityMap[username]) ? state.activityMap[username] : [];
  const payload = {
    user_id: userId,
    best_scores: normalizeBestScores(state.bestScores),
    attempt_stats: normalizeAttemptStats(state.attemptStats),
    activity_entries: normalizeActivityEntries(userEntries),
    srs_state: normalizeSrsData(state.srsData),
    gamification_state: normalizeGamificationData(state.gamificationData),
  };

  await supabaseRequest("/rest/v1/user_state", {
    method: "POST",
    auth: true,
    headers: {
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: [payload],
  });

  const progress = getOverallStudyProgress();
  const weeklyPoints = getWeeklyProgressPoints(username);
  await supabaseRequest("/rest/v1/leaderboard_public", {
    method: "POST",
    auth: true,
    headers: {
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: [
      {
        user_id: userId,
        username,
        display_name: profileName,
        progress_current: progress.current,
        progress_total: progress.total,
        progress_percent: progress.percent,
        weekly_points: weeklyPoints,
      },
    ],
  });
}

async function fetchRemoteLeaderboardRows() {
  const rows = await supabaseRequest(
    "/rest/v1/leaderboard_public?select=username,display_name,progress_current,progress_total,progress_percent,weekly_points",
    {
      method: "GET",
      auth: true,
    },
  );
  state.remoteLeaderboardRows = Array.isArray(rows) ? rows : [];
}

function getUsernameFromSupabaseUser(authUser) {
  const fromMetadata = normalizeUsername(authUser?.user_metadata?.username || "");
  if (fromMetadata) {
    return fromMetadata;
  }
  const email = String(authUser?.email || "");
  const [localPart] = email.split("@");
  return normalizeUsername(localPart || "");
}

function normalizeActivityEntries(entries) {
  if (!Array.isArray(entries)) {
    return [];
  }
  return entries
    .map((entry) => ({
      ts: Number(entry.ts),
      delta: Number(entry.delta),
      bucket: String(entry.bucket || ""),
      key: String(entry.key || ""),
    }))
    .filter((entry) => Number.isFinite(entry.ts) && Number.isFinite(entry.delta))
    .slice(-1200);
}

function applyRemoteUserState(row, username) {
  const normalized = normalizeUsername(username);
  state.bestScores = normalizeBestScores(row?.best_scores);
  state.attemptStats = normalizeAttemptStats(row?.attempt_stats);
  state.srsData = normalizeSrsData(row?.srs_state);
  state.gamificationData = normalizeGamificationData(row?.gamification_state);
  if (!state.activityMap || typeof state.activityMap !== "object") {
    state.activityMap = {};
  }
  state.activityMap[normalized] = normalizeActivityEntries(row?.activity_entries);
}

async function resolveSupabaseIdentity() {
  const authUser = await fetchSupabaseUser();
  if (!authUser?.id) {
    return null;
  }

  const profile = await fetchProfileByUserId(authUser.id);
  const username = normalizeUsername(profile?.username || getUsernameFromSupabaseUser(authUser));
  if (!username) {
    throw new Error("Could not resolve username from your Supabase account.");
  }

  const profileName = String(profile?.display_name || "").trim();
  const metadataName = String(authUser?.user_metadata?.display_name || "").trim();
  const name = profileName || metadataName || username;

  if (
    !profile ||
    normalizeUsername(profile.username || "") !== username ||
    String(profile.display_name || "").trim() !== name
  ) {
    await upsertProfile({
      userId: authUser.id,
      username,
      name,
    });
  }

  return {
    user_id: authUser.id,
    username,
    name,
  };
}

function scheduleRemoteStateSync() {
  if (!hasSupabaseConfig() || !state.currentUser?.user_id || !state.dataLoaded) {
    return;
  }
  if (remoteStateSyncTimer) {
    clearTimeout(remoteStateSyncTimer);
  }
  remoteStateSyncTimer = setTimeout(async () => {
    remoteStateSyncTimer = null;
    const userId = state.currentUser?.user_id;
    if (!userId) {
      return;
    }
    try {
      await upsertRemoteUserState(userId);
      await fetchRemoteLeaderboardRows();
      renderLeaderboardHubTile();
      renderLeaderboards();
    } catch (error) {
      console.error("Remote sync failed:", error);
    }
  }, 220);
}

function loadUsers() {
  if (hasSupabaseConfig()) {
    return {};
  }
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    console.error("Could not load users:", error);
    return {};
  }
}

function saveUsers(users) {
  if (hasSupabaseConfig()) {
    return;
  }
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error("Could not save users:", error);
  }
}

function loadActivityMap() {
  if (hasSupabaseConfig()) {
    return {};
  }
  try {
    let raw = localStorage.getItem(getActivityStorageKey());
    if (!raw && getCurrentLanguage() === DEFAULT_LANGUAGE) {
      raw = localStorage.getItem(ACTIVITY_STORAGE_KEY);
    }
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    console.error("Could not load activity data:", error);
    return {};
  }
}

function saveActivityMap(activityMap) {
  if (hasSupabaseConfig() && state.currentUser?.user_id) {
    scheduleRemoteStateSync();
  }
  try {
    localStorage.setItem(getActivityStorageKey(), JSON.stringify(activityMap));
  } catch (error) {
    console.error("Could not save activity data:", error);
  }
}

function loadAttemptStats() {
  if (hasSupabaseConfig() && state.currentUser?.user_id) {
    return normalizeAttemptStats(state.attemptStats);
  }
  try {
    let raw = localStorage.getItem(getAttemptStatsStorageKey());
    if (!raw && getCurrentLanguage() === DEFAULT_LANGUAGE) {
      const legacyUser = state.currentUser?.username || "guest";
      raw = localStorage.getItem(`${ATTEMPT_STATS_STORAGE_KEY}::${legacyUser}`);
    }
    if (!raw) {
      return createEmptyAttemptStats();
    }
    return normalizeAttemptStats(JSON.parse(raw));
  } catch (error) {
    console.error("Could not load attempt stats:", error);
    return createEmptyAttemptStats();
  }
}

function saveAttemptStats() {
  if (hasSupabaseConfig() && state.currentUser?.user_id) {
    scheduleRemoteStateSync();
  }
  try {
    localStorage.setItem(
      getAttemptStatsStorageKey(),
      JSON.stringify(normalizeAttemptStats(state.attemptStats)),
    );
  } catch (error) {
    console.error("Could not save attempt stats:", error);
  }
}

function loadSrsData() {
  if (hasSupabaseConfig() && state.currentUser?.user_id) {
    return normalizeSrsData(state.srsData);
  }
  try {
    let raw = localStorage.getItem(getSrsStorageKey());
    if (!raw && getCurrentLanguage() === DEFAULT_LANGUAGE) {
      const legacyUser = state.currentUser?.username || "guest";
      raw = localStorage.getItem(`${SRS_STORAGE_KEY}::${legacyUser}`);
    }
    if (!raw) {
      return createEmptySrsData();
    }
    return normalizeSrsData(JSON.parse(raw));
  } catch (error) {
    console.error("Could not load SRS data:", error);
    return createEmptySrsData();
  }
}

function saveSrsData() {
  if (hasSupabaseConfig() && state.currentUser?.user_id) {
    scheduleRemoteStateSync();
  }
  try {
    localStorage.setItem(getSrsStorageKey(), JSON.stringify(normalizeSrsData(state.srsData)));
  } catch (error) {
    console.error("Could not save SRS data:", error);
  }
}

function loadGamificationData() {
  if (hasSupabaseConfig() && state.currentUser?.user_id) {
    return normalizeGamificationData(state.gamificationData);
  }
  try {
    let raw = localStorage.getItem(getGamificationStorageKey());
    if (!raw && getCurrentLanguage() === DEFAULT_LANGUAGE) {
      const legacyUser = state.currentUser?.username || "guest";
      raw = localStorage.getItem(`${GAMIFICATION_STORAGE_KEY}::${legacyUser}`);
    }
    if (!raw) {
      return createEmptyGamificationData();
    }
    return normalizeGamificationData(JSON.parse(raw));
  } catch (error) {
    console.error("Could not load gamification data:", error);
    return createEmptyGamificationData();
  }
}

function saveGamificationData() {
  if (hasSupabaseConfig() && state.currentUser?.user_id) {
    scheduleRemoteStateSync();
  }
  try {
    localStorage.setItem(
      getGamificationStorageKey(),
      JSON.stringify(normalizeGamificationData(state.gamificationData)),
    );
  } catch (error) {
    console.error("Could not save gamification data:", error);
  }
}

function resetSrsDailyCounterIfNeeded() {
  if (!state.srsData) {
    state.srsData = createEmptySrsData();
  }
  const today = getTodayKey();
  if (state.srsData.daily.date === today) {
    return false;
  }
  state.srsData.daily.date = today;
  state.srsData.daily.newCount = 0;
  return true;
}

function refreshStreakStatusForToday() {
  if (!state.gamificationData) {
    state.gamificationData = createEmptyGamificationData();
  }
  const streak = state.gamificationData.streak;
  const today = getTodayKey();
  if (!streak.lastActiveDate) {
    return false;
  }
  const gap = dayKeyDiff(streak.lastActiveDate, today);
  if (gap <= 1) {
    return false;
  }
  streak.current = 0;
  return true;
}

function markGamificationActivity(source = "study") {
  if (!state.currentUser?.username) {
    return;
  }
  if (!state.gamificationData) {
    state.gamificationData = createEmptyGamificationData();
  }

  const changedByDecay = refreshStreakStatusForToday();
  const streak = state.gamificationData.streak;
  const today = getTodayKey();
  let changed = changedByDecay;

  if (streak.lastActiveDate !== today) {
    const gap = streak.lastActiveDate ? dayKeyDiff(streak.lastActiveDate, today) : 0;
    if (!streak.lastActiveDate) {
      streak.current = 1;
    } else if (gap === 1) {
      streak.current += 1;
    } else {
      streak.current = 1;
    }
    streak.best = Math.max(streak.best, streak.current);
    streak.lastActiveDate = today;
    changed = true;
  }

  const unlocked = evaluateAchievementsAndSync({ source, save: false });
  if (changed || unlocked.length > 0) {
    saveGamificationData();
  }
}

function markStoryRead(storyId) {
  if (!state.currentUser?.username || !storyId) {
    return;
  }
  if (!state.gamificationData) {
    state.gamificationData = createEmptyGamificationData();
  }
  const key = String(storyId);
  if (!state.gamificationData.storiesRead[key]) {
    state.gamificationData.storiesRead[key] = true;
    markGamificationActivity("story");
  } else {
    markGamificationActivity("story");
  }
}

function recordAttemptStat(trackId, wasCorrect, answerText = "") {
  if (!state.currentUser?.username) {
    return;
  }
  if (!STATS_TRACKS.some((track) => track.id === trackId)) {
    return;
  }

  const stats = normalizeAttemptStats(state.attemptStats);
  const timestamp = Date.now();
  const words = countWords(answerText);
  const lastAttemptTs = Number(stats.meta?.lastAttemptTs) || 0;
  let activeIncrementMs = MIN_ATTEMPT_ACTIVITY_MS;
  if (lastAttemptTs > 0) {
    const gap = timestamp - lastAttemptTs;
    if (Number.isFinite(gap) && gap > 0 && gap <= ATTEMPT_SESSION_BREAK_MS) {
      activeIncrementMs = Math.max(MIN_ATTEMPT_ACTIVITY_MS, Math.min(gap, MAX_ATTEMPT_ACTIVITY_MS));
    }
  }

  stats.totals.attempts += 1;
  if (wasCorrect) {
    stats.totals.correct += 1;
  }
  stats.totals.words += words;
  stats.totals.activeMs += activeIncrementMs;

  const byTrack = stats.byTrack[trackId] || { attempts: 0, correct: 0 };
  byTrack.attempts += 1;
  if (wasCorrect) {
    byTrack.correct += 1;
  }
  stats.byTrack[trackId] = byTrack;

  stats.history.push({
    ts: timestamp,
    track: trackId,
    correct: Boolean(wasCorrect),
    words,
    activeMs: activeIncrementMs,
  });
  stats.meta.lastAttemptTs = timestamp;

  const ninetyDaysAgo = timestamp - 90 * 24 * 60 * 60 * 1000;
  stats.history = stats.history
    .filter((entry) => Number(entry.ts) >= ninetyDaysAgo)
    .slice(-6000);

  state.attemptStats = stats;
  saveAttemptStats();
  markGamificationActivity("quiz-attempt");
}

function loadSessionUsername() {
  try {
    return normalizeUsername(localStorage.getItem(SESSION_STORAGE_KEY) || "");
  } catch (error) {
    console.error("Could not load session:", error);
    return "";
  }
}

function saveSessionUsername(username) {
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, username);
  } catch (error) {
    console.error("Could not save session:", error);
  }
}

function clearSessionUsername() {
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (error) {
    console.error("Could not clear session:", error);
  }
}

async function hashPassword(password, salt) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    textEncoder.encode(`${salt}::${password}`),
  );
  return toHex(digest);
}

async function verifyPassword(userRecord, password) {
  const hash = await hashPassword(password, userRecord.salt);
  return hash === userRecord.passwordHash;
}

function hydrateCurrentUserFromUsers() {
  if (!state.currentUser?.username) {
    return;
  }
  state.currentUser = state.users[state.currentUser.username] || null;
}

function refreshCurrentUserLabel() {
  if (!currentUserLabel) {
    return;
  }
  if (!state.currentUser) {
    currentUserLabel.textContent = "";
    return;
  }
  const displayName = state.currentUser.name || state.currentUser.username;
  currentUserLabel.textContent = `Signed in as ${displayName}`;
}

function setFeedbackMessage(element, message, kind = "") {
  if (!element) {
    return;
  }
  element.className = kind ? `feedback ${kind}` : "feedback";
  element.textContent = message;
}

function clearAuthFeedback() {
  setFeedbackMessage(loginFeedback, "");
  setFeedbackMessage(signupFeedback, "");
  setFeedbackMessage(profileFeedback, "");
  setFeedbackMessage(passwordFeedback, "");
}

function clearAuthForms() {
  loginForm.reset();
  signupForm.reset();
}

function showAuthScreen() {
  stopQuizTimer();
  document.body.classList.remove("quiz-screen-active");
  authView.hidden = false;
  appContent.hidden = true;
  clearStatus();
  clearAuthFeedback();
}

function showAppShell() {
  authView.hidden = true;
  appContent.hidden = false;
  refreshCurrentUserLabel();
  refreshAdminModeAccess();
}

function normalizeCurrentUserRecord(userOrUsername) {
  if (typeof userOrUsername === "string") {
    const username = normalizeUsername(userOrUsername);
    if (!username) {
      return null;
    }
    const existing = state.users[username];
    if (existing) {
      return {
        username,
        name: existing.name || username,
        user_id: existing.user_id || "",
      };
    }
    return {
      username,
      name: username,
      user_id: "",
    };
  }

  if (!userOrUsername || typeof userOrUsername !== "object") {
    return null;
  }

  const username = normalizeUsername(userOrUsername.username || "");
  if (!username) {
    return null;
  }

  return {
    username,
    name: String(userOrUsername.name || userOrUsername.display_name || username).trim() || username,
    user_id: String(userOrUsername.user_id || userOrUsername.userId || "").trim(),
  };
}

async function setCurrentUser(userOrUsername) {
  const normalizedRecord = normalizeCurrentUserRecord(userOrUsername);
  state.currentUser = normalizedRecord;
  if (state.currentUser) {
    state.users[state.currentUser.username] = {
      username: state.currentUser.username,
      name: state.currentUser.name || state.currentUser.username,
      user_id: state.currentUser.user_id || "",
    };
    saveSessionUsername(state.currentUser.username);
  } else {
    clearSessionUsername();
  }

  if (hasSupabaseConfig() && state.currentUser?.user_id) {
    let remoteState = null;
    try {
      remoteState = await fetchRemoteUserState(state.currentUser.user_id);
    } catch (error) {
      console.error("Could not load remote user state:", error);
    }
    applyRemoteUserState(remoteState, state.currentUser.username);
    try {
      await fetchRemoteLeaderboardRows();
    } catch (error) {
      console.error("Could not load remote leaderboard rows:", error);
      state.remoteLeaderboardRows = [];
    }
  } else {
    state.bestScores = loadBestScores();
    state.attemptStats = loadAttemptStats();
    state.gamificationData = loadGamificationData();
    state.srsData = loadSrsData();
  }

  refreshStreakStatusForToday();
  if (state.dataLoaded) {
    syncSrsDataToCatalog();
    evaluateAchievementsAndSync({ save: true });
  }
  refreshCurrentUserLabel();
  refreshAdminModeAccess();
}

async function ensureDataLoaded() {
  if (state.dataLoaded) {
    return;
  }
  const loaded = await loadData();
  state.dataLoaded = loaded;
  if (!loaded) {
    throw new Error("Could not load training data.");
  }
}

function reloadLanguageScopedLocalState() {
  if (hasSupabaseConfig() && state.currentUser?.user_id) {
    if (!state.activityMap || typeof state.activityMap !== "object") {
      state.activityMap = {};
    }
  } else {
    state.activityMap = loadActivityMap();
  }
  if (!state.currentUser?.username) {
    state.bestScores = createEmptyBestScores();
    state.attemptStats = createEmptyAttemptStats();
    state.gamificationData = createEmptyGamificationData();
    state.srsData = createEmptySrsData();
    return;
  }
  if (hasSupabaseConfig() && state.currentUser?.user_id) {
    state.bestScores = normalizeBestScores(state.bestScores);
    state.attemptStats = normalizeAttemptStats(state.attemptStats);
    state.gamificationData = normalizeGamificationData(state.gamificationData);
    state.srsData = normalizeSrsData(state.srsData);
    return;
  }
  state.bestScores = loadBestScores();
  state.attemptStats = loadAttemptStats();
  state.gamificationData = loadGamificationData();
  state.srsData = loadSrsData();
}

async function switchActiveLanguage(language) {
  const nextLanguage = normalizeLanguageCode(language);
  if (nextLanguage === state.activeLanguage) {
    return;
  }

  const previousLanguage = state.activeLanguage;
  state.activeLanguage = nextLanguage;
  savePreferredLanguage(nextLanguage);
  if (languageToggle) {
    languageToggle.value = nextLanguage;
  }

  try {
    applyLanguageUiText();
    refreshLanguageModuleTitles();
    reloadLanguageScopedLocalState();
    state.dataLoaded = false;

    if (state.currentUser) {
      await ensureDataLoaded();
      refreshProgressViews();
      openTrainingHub();
    } else {
      updateDashboardProgressBars();
      renderTrainingGrid();
    }
    clearStatus();
  } catch (error) {
    console.error(error);
    state.activeLanguage = previousLanguage;
    savePreferredLanguage(previousLanguage);
    if (languageToggle) {
      languageToggle.value = previousLanguage;
    }
    applyLanguageUiText();
    refreshLanguageModuleTitles();
    reloadLanguageScopedLocalState();
    state.dataLoaded = false;
    throw error;
  }
}

function loadAdminMode() {
  try {
    return localStorage.getItem(ADMIN_MODE_STORAGE_KEY) === "true";
  } catch (error) {
    console.warn("Unable to load admin mode setting:", error);
    return false;
  }
}

function saveAdminMode(enabled) {
  try {
    localStorage.setItem(ADMIN_MODE_STORAGE_KEY, String(enabled));
  } catch (error) {
    console.warn("Unable to persist admin mode setting:", error);
  }
}

function setAdminMode(enabled) {
  state.adminMode = canUseAdminMode() ? Boolean(enabled) : false;
  if (adminModeToggle) {
    adminModeToggle.checked = state.adminMode;
  }
  if (canUseAdminMode()) {
    saveAdminMode(state.adminMode);
  }
  refreshAdminModeAccess();
  refreshProgressViews();
}

function isStoryUnlocked(story, studyProgress = getOverallStudyProgress()) {
  if (state.adminMode) {
    return true;
  }
  return studyProgress.percent >= story.unlockPercent;
}

state.users = loadUsers();
state.activityMap = loadActivityMap();
state.attemptStats = loadAttemptStats();
state.gamificationData = loadGamificationData();
state.srsData = loadSrsData();
state.adminMode = loadAdminMode();
if (languageToggle) {
  languageToggle.value = state.activeLanguage;
}
applyLanguageUiText();
refreshLanguageModuleTitles();
if (adminModeToggle) {
  adminModeToggle.checked = state.adminMode;
}
refreshAdminModeAccess();

function showView(activeView) {
  const isQuizScreen =
    activeView === quizView ||
    activeView === nounsQuizView ||
    activeView === beginnerQuizView ||
    activeView === discourseQuizView ||
    activeView === conversionQuizView ||
    activeView === grammarQuizView ||
    activeView === slangQuizView;
  document.body.classList.toggle("quiz-screen-active", isQuizScreen);
  if (!isQuizScreen) {
    stopQuizTimer();
  }
  appViews.forEach((view) => {
    view.hidden = view !== activeView;
  });
}

function normalize(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isSubjuntivoOrImperativoForm(form) {
  const tenseTag = normalize(form?.tenseTag || "");
  const label = normalize(form?.label || "");
  return (
    tenseTag.includes("subjuntivo") ||
    tenseTag.includes("subgiuntivo") ||
    tenseTag.includes("imperativo") ||
    label.includes("subjuntivo") ||
    label.includes("subgiuntivo") ||
    label.includes("imperativo")
  );
}

function copyVerbWithForms(verb, forms) {
  return {
    ...verb,
    forms,
    formCount: forms.length,
  };
}

function splitVerbTracks(verbs) {
  const core = [];
  const additional = [];

  verbs.forEach((verb) => {
    const coreForms = verb.forms.filter((form) => !isSubjuntivoOrImperativoForm(form));
    const additionalForms = verb.forms.filter((form) => {
      const tenseTag = normalize(form?.tenseTag || "");
      return (
        isSubjuntivoOrImperativoForm(form) ||
        tenseTag === "infinitivo" ||
        tenseTag === "infinito" ||
        tenseTag === "infinitive"
      );
    });

    core.push(copyVerbWithForms(verb, coreForms));
    additional.push(copyVerbWithForms(verb, additionalForms));
  });

  return { core, additional };
}

function splitNounTracks(decks) {
  const core = [];
  const advanced = [];
  decks.forEach((deck) => {
    if (Number(deck.start) <= 500) {
      core.push(deck);
    } else {
      advanced.push(deck);
    }
  });
  return { core, advanced };
}

function getActiveVerbList(trackMode = state.activeVerbTrack) {
  return trackMode === "additional" ? state.verbsAdditional : state.verbs;
}

function getActiveNounDecks(trackMode = state.activeNounTrack) {
  return trackMode === "advanced" ? state.nounDecksAdvanced : state.nounDecks;
}

function verbScoreKey(infinitive, trackMode = state.activeVerbTrack) {
  return trackMode === "additional" ? `additional::${infinitive}` : infinitive;
}

function getVerbBestScore(verb, trackMode = state.activeVerbTrack) {
  return getBestScore("verbs", verbScoreKey(verb.infinitive, trackMode), verb.formCount);
}

function getVerbTrackTitle(trackMode = state.activeVerbTrack) {
  const type = trackMode === "additional" ? "kofi-additional" : "kofi";
  return getTrainingModuleByType(type)?.title || (trackMode === "additional"
    ? "KOFI Verb Training Additional Tenses"
    : "KOFI Verb Training");
}

function getNounTrackTitle(trackMode = state.activeNounTrack) {
  const type = trackMode === "advanced" ? "nouns-advanced" : "nouns";
  return getTrainingModuleByType(type)?.title || (trackMode === "advanced"
    ? "Top Nouns 501 - 2000"
    : "Top 500 Nouns");
}

function placeholder(answer) {
  return answer.replace(/[^\s]/g, "•");
}

function formatScore(score, total) {
  return `${score}/${total}`;
}

function formatTimer(remainingMs) {
  const safeMs = Math.max(0, remainingMs);
  const totalSeconds = Math.ceil(safeMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function getQuizTimerText() {
  if (!state.quizTimerDeadline) {
    return `Time left: ${formatTimer(QUIZ_TIMER_DURATION_MS)}`;
  }
  return `Time left: ${formatTimer(state.quizTimerDeadline - Date.now())}`;
}

function stopQuizTimer() {
  if (state.quizTimerIntervalId) {
    clearInterval(state.quizTimerIntervalId);
  }
  state.quizTimerIntervalId = null;
  state.quizTimerDeadline = 0;
  state.quizTimerOnTick = null;
  state.quizTimerOnExpire = null;
}

function startQuizTimer(options) {
  const { onTick, onExpire } = options;
  stopQuizTimer();
  state.quizTimerDeadline = Date.now() + QUIZ_TIMER_DURATION_MS;
  state.quizTimerOnTick = typeof onTick === "function" ? onTick : null;
  state.quizTimerOnExpire = typeof onExpire === "function" ? onExpire : null;

  const tick = () => {
    const remainingMs = state.quizTimerDeadline - Date.now();
    if (remainingMs <= 0) {
      if (state.quizTimerOnTick) {
        state.quizTimerOnTick(0);
      }
      const expire = state.quizTimerOnExpire;
      stopQuizTimer();
      if (expire) {
        expire();
      }
      return;
    }
    if (state.quizTimerOnTick) {
      state.quizTimerOnTick(remainingMs);
    }
  };

  tick();
  state.quizTimerIntervalId = setInterval(tick, 1000);
}

function setQuizActionButton(buttonEl, ended) {
  if (!buttonEl) {
    return;
  }
  buttonEl.disabled = false;
  if (ended) {
    buttonEl.textContent = "Try Again";
    buttonEl.classList.remove("danger-button");
  } else {
    buttonEl.textContent = "Give up";
    buttonEl.classList.add("danger-button");
  }
}

function setProgressBar(textEl, fillEl, label, current, total) {
  const safeTotal = Math.max(0, total);
  const safeCurrent = Math.max(0, Math.min(current, safeTotal));
  const percent = safeTotal === 0 ? 0 : Math.round((safeCurrent / safeTotal) * 100);
  textEl.textContent = `${label}: ${safeCurrent}/${safeTotal} (${percent}%)`;
  fillEl.style.width = `${percent}%`;
}

function loadBestScores() {
  if (hasSupabaseConfig() && state.currentUser?.user_id) {
    return normalizeBestScores(state.bestScores);
  }
  try {
    let raw = localStorage.getItem(getBestScoresStorageKey());
    if (!raw && getCurrentLanguage() === DEFAULT_LANGUAGE) {
      const legacyUser = state.currentUser?.username || "guest";
      raw = localStorage.getItem(`${BEST_SCORES_STORAGE_KEY}::${legacyUser}`);
    }
    if (!raw) {
      return createEmptyBestScores();
    }
    return normalizeBestScores(JSON.parse(raw));
  } catch (error) {
    console.error("Could not load best scores:", error);
  }

  return createEmptyBestScores();
}

function saveBestScores() {
  if (hasSupabaseConfig() && state.currentUser?.user_id) {
    scheduleRemoteStateSync();
  }
  try {
    localStorage.setItem(getBestScoresStorageKey(), JSON.stringify(state.bestScores));
  } catch (error) {
    console.error("Could not save best scores:", error);
  }
}

function getBestScore(bucket, key, total) {
  const store = state.bestScores[bucket] || {};
  const stored = Number(store[key]);
  if (Number.isFinite(stored) && stored >= 0) {
    return Math.min(stored, total);
  }
  return 0;
}

function getScoreFromStore(scoreStore, bucket, key, total) {
  const store = scoreStore?.[bucket] || {};
  const stored = Number(store[key]);
  if (Number.isFinite(stored) && stored >= 0) {
    return Math.min(stored, total);
  }
  return 0;
}

function loadBestScoresForUser(username) {
  if (hasSupabaseConfig()) {
    return createEmptyBestScores();
  }
  try {
    let raw = localStorage.getItem(
      `${getLanguageScopedStorageKey(BEST_SCORES_STORAGE_KEY)}::${username}`,
    );
    if (!raw && getCurrentLanguage() === DEFAULT_LANGUAGE) {
      raw = localStorage.getItem(`${BEST_SCORES_STORAGE_KEY}::${username}`);
    }
    if (!raw) {
      return createEmptyBestScores();
    }
    return normalizeBestScores(JSON.parse(raw));
  } catch (error) {
    console.error("Could not load user best scores:", error);
    return createEmptyBestScores();
  }
}

function getProgressSnapshotFromScores(scoreStore) {
  const verbTotal = state.verbs.reduce((acc, verb) => acc + verb.formCount, 0);
  const verbCurrent = state.verbs.reduce(
    (acc, verb) => acc + getScoreFromStore(scoreStore, "verbs", verb.infinitive, verb.formCount),
    0,
  );
  const additionalVerbTotal = state.verbsAdditional.reduce((acc, verb) => acc + verb.formCount, 0);
  const additionalVerbCurrent = state.verbsAdditional.reduce(
    (acc, verb) =>
      acc + getScoreFromStore(scoreStore, "verbs", `additional::${verb.infinitive}`, verb.formCount),
    0,
  );

  const nounTotal = state.nounDecks.reduce((acc, deck) => acc + deck.count, 0);
  const nounCurrent = state.nounDecks.reduce((acc, deck) => {
    const singular = getScoreFromStore(scoreStore, "nouns", deck.id, deck.count);
    const plural = getScoreFromStore(scoreStore, "nouns", `${deck.id}::plural`, deck.count);
    return acc + Math.max(singular, plural);
  }, 0);
  const advancedNounTotal = state.nounDecksAdvanced.reduce((acc, deck) => acc + deck.count, 0);
  const advancedNounCurrent = state.nounDecksAdvanced.reduce((acc, deck) => {
    const singular = getScoreFromStore(scoreStore, "nouns", deck.id, deck.count);
    const plural = getScoreFromStore(scoreStore, "nouns", `${deck.id}::plural`, deck.count);
    return acc + Math.max(singular, plural);
  }, 0);

  const beginnerTotal = state.beginnerGroups.reduce((acc, group) => acc + group.count, 0);
  const beginnerCurrent = state.beginnerGroups.reduce(
    (acc, group) => acc + getScoreFromStore(scoreStore, "beginner", group.id, group.count),
    0,
  );

  const discourseTotal = state.discourseGroups.reduce((acc, group) => acc + group.count, 0);
  const discourseCurrent = state.discourseGroups.reduce(
    (acc, group) => acc + getScoreFromStore(scoreStore, "discourse", group.id, group.count),
    0,
  );

  const conversionTotal = state.conversionGroups.reduce((acc, group) => acc + group.count, 0);
  const conversionCurrent = state.conversionGroups.reduce(
    (acc, group) => acc + getScoreFromStore(scoreStore, "conversion", group.id, group.count),
    0,
  );

  const grammarTotal = state.grammarGroups.reduce((acc, group) => acc + group.count, 0);
  const grammarCurrent = state.grammarGroups.reduce(
    (acc, group) => acc + getScoreFromStore(scoreStore, "grammar", group.id, group.count),
    0,
  );

  const slangTotal = state.slangGroups.reduce((acc, group) => acc + group.count, 0);
  const slangCurrent = state.slangGroups.reduce(
    (acc, group) => acc + getScoreFromStore(scoreStore, "slang", group.id, group.count),
    0,
  );

  const current =
    verbCurrent +
    additionalVerbCurrent +
    nounCurrent +
    advancedNounCurrent +
    beginnerCurrent +
    discourseCurrent +
    conversionCurrent +
    grammarCurrent +
    slangCurrent;
  const total =
    verbTotal +
    additionalVerbTotal +
    nounTotal +
    advancedNounTotal +
    beginnerTotal +
    discourseTotal +
    conversionTotal +
    grammarTotal +
    slangTotal;
  const percent = total === 0 ? 0 : (current / total) * 100;
  return { current, total, percent };
}

function getWeeklyProgressPoints(username) {
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const entries = Array.isArray(state.activityMap[username]) ? state.activityMap[username] : [];
  return entries.reduce((acc, entry) => {
    const ts = Number(entry.ts);
    const delta = Number(entry.delta);
    if (!Number.isFinite(ts) || !Number.isFinite(delta)) {
      return acc;
    }
    if (ts < weekAgo) {
      return acc;
    }
    return acc + Math.max(0, delta);
  }, 0);
}

function addProgressActivity(delta, bucket, key) {
  if (!state.currentUser?.username || delta <= 0) {
    return;
  }
  const username = state.currentUser.username;
  const entries = Array.isArray(state.activityMap[username]) ? state.activityMap[username] : [];
  entries.push({
    ts: Date.now(),
    delta,
    bucket,
    key,
  });
  const ninetyDaysAgo = Date.now() - 90 * 24 * 60 * 60 * 1000;
  state.activityMap[username] = entries
    .filter((entry) => Number(entry.ts) >= ninetyDaysAgo)
    .slice(-1200);
  saveActivityMap(state.activityMap);
}

function renderLeaderboardList(targetList, rows, formatter) {
  targetList.innerHTML = "";
  rows.forEach((row, index) => {
    const item = document.createElement("li");
    item.className = "leaderboard-row";
    if (row.username === state.currentUser?.username) {
      item.classList.add("current-user");
    }

    const rank = document.createElement("span");
    rank.className = "leaderboard-rank";
    rank.textContent = `#${index + 1}`;

    const name = document.createElement("span");
    name.className = "leaderboard-name";
    name.textContent = row.name;

    const metric = document.createElement("span");
    metric.className = "leaderboard-metric";
    metric.textContent = formatter(row);

    item.append(rank, name, metric);
    targetList.appendChild(item);
  });

  if (rows.length === 0) {
    const empty = document.createElement("li");
    empty.className = "leaderboard-empty";
    empty.textContent = "No ranked users yet.";
    targetList.appendChild(empty);
  }
}

function buildLeaderboardRows() {
  if (hasSupabaseConfig()) {
    const rowsMap = new Map();
    (Array.isArray(state.remoteLeaderboardRows) ? state.remoteLeaderboardRows : []).forEach((row) => {
      const username = normalizeUsername(row?.username || "");
      if (!username) {
        return;
      }
      const total = Math.max(0, Number(row.progress_total) || 0);
      const current = Math.max(0, Math.min(total, Number(row.progress_current) || 0));
      const percentFromRow = Number(row.progress_percent);
      const percent = Number.isFinite(percentFromRow)
        ? Math.max(0, percentFromRow)
        : total === 0
          ? 0
          : (current / total) * 100;
      rowsMap.set(username, {
        username,
        name: String(row.display_name || "").trim() || username,
        current,
        total,
        percent,
        weeklyPoints: Math.max(0, Number(row.weekly_points) || 0),
      });
    });

    if (state.currentUser?.username) {
      const username = state.currentUser.username;
      const progress = getOverallStudyProgress();
      rowsMap.set(username, {
        username,
        name: state.currentUser.name || username,
        current: progress.current,
        total: progress.total,
        percent: progress.percent,
        weeklyPoints: getWeeklyProgressPoints(username),
      });
    }

    const rows = Array.from(rowsMap.values());
    const globalRows = [...rows]
      .sort(
        (a, b) => b.percent - a.percent || b.current - a.current || a.username.localeCompare(b.username),
      )
      .slice(0, 10);

    const weeklyRows = [...rows]
      .sort(
        (a, b) =>
          b.weeklyPoints - a.weeklyPoints ||
          b.percent - a.percent ||
          a.username.localeCompare(b.username),
      )
      .slice(0, 10);

    return { globalRows, weeklyRows };
  }

  const usernames = Object.keys(state.users);
  const rows = usernames.map((username) => {
    const scoreStore =
      state.currentUser?.username === username ? state.bestScores : loadBestScoresForUser(username);
    const progress = getProgressSnapshotFromScores(scoreStore);
    const weeklyPoints = getWeeklyProgressPoints(username);
    return {
      username,
      name: state.users[username].name || username,
      ...progress,
      weeklyPoints,
    };
  });

  const globalRows = [...rows]
    .sort((a, b) => b.percent - a.percent || b.current - a.current || a.username.localeCompare(b.username))
    .slice(0, 10);

  const weeklyRows = [...rows]
    .sort(
      (a, b) =>
        b.weeklyPoints - a.weeklyPoints || b.percent - a.percent || a.username.localeCompare(b.username),
    )
    .slice(0, 10);

  return { globalRows, weeklyRows };
}

function renderLeaderboardHubTile() {
  if (!leaderboardHubGlobalList || !leaderboardHubWeeklyList) {
    return;
  }
  if (!state.dataLoaded) {
    leaderboardHubGlobalList.innerHTML = `<li class="leaderboard-empty">Loading...</li>`;
    leaderboardHubWeeklyList.innerHTML = `<li class="leaderboard-empty">Loading...</li>`;
    return;
  }

  const { globalRows, weeklyRows } = buildLeaderboardRows();
  const hubGlobalRows = globalRows.slice(0, 5);
  const hubWeeklyRows = weeklyRows.slice(0, 5);

  renderLeaderboardList(leaderboardHubGlobalList, hubGlobalRows, (row) => {
    return `${Math.round(row.percent)}%`;
  });
  renderLeaderboardList(leaderboardHubWeeklyList, hubWeeklyRows, (row) => {
    return `${row.weeklyPoints} pts`;
  });
}

function getTrackLabel(trackId) {
  const module = getTrainingModuleByType(trackId);
  if (module?.title) {
    return module.title;
  }
  const match = STATS_TRACKS.find((track) => track.id === trackId);
  return match ? match.label : trackId;
}

function sumProgressPointsInWindow(entries, start, end = Number.POSITIVE_INFINITY) {
  return entries.reduce((acc, entry) => {
    const ts = Number(entry.ts);
    const delta = Number(entry.delta);
    if (!Number.isFinite(ts) || !Number.isFinite(delta)) {
      return acc;
    }
    if (ts < start || ts >= end) {
      return acc;
    }
    return acc + Math.max(0, delta);
  }, 0);
}

function getWeeklyProgressTrend(username) {
  const entries = Array.isArray(state.activityMap[username]) ? state.activityMap[username] : [];
  const now = Date.now();
  const currentStart = now - 7 * 24 * 60 * 60 * 1000;
  const previousStart = now - 14 * 24 * 60 * 60 * 1000;
  const thisWeekPoints = sumProgressPointsInWindow(entries, currentStart, now);
  const lastWeekPoints = sumProgressPointsInWindow(entries, previousStart, currentStart);
  return {
    thisWeekPoints,
    lastWeekPoints,
    delta: thisWeekPoints - lastWeekPoints,
  };
}

function renderStatsList(targetList, rows, emptyText) {
  if (!targetList) {
    return;
  }
  targetList.innerHTML = "";
  if (rows.length === 0) {
    const empty = document.createElement("li");
    empty.className = "stats-empty";
    empty.textContent = emptyText;
    targetList.appendChild(empty);
    return;
  }
  rows.forEach((row) => {
    const item = document.createElement("li");
    item.className = "stats-list-item";

    const label = document.createElement("span");
    label.className = "stats-item-label";
    label.textContent = row.label;

    const metric = document.createElement("span");
    metric.className = "stats-item-metric";
    metric.textContent = row.metric;

    item.append(label, metric);
    targetList.appendChild(item);
  });
}

function buildHardestDeckRows(limit = 3) {
  const rows = [];

  state.verbs.forEach((verb) => {
    const current = getVerbBestScore(verb, "core");
    rows.push({
      label: `KOFI: ${verb.infinitive}`,
      current,
      total: verb.formCount,
      percent: calculatePercent(current, verb.formCount),
      unlocked: getVerbUnlockInfo(verb.infinitive, "core").unlocked,
    });
  });

  state.verbsAdditional.forEach((verb) => {
    const current = getVerbBestScore(verb, "additional");
    rows.push({
      label: `KOFI Additional: ${verb.infinitive}`,
      current,
      total: verb.formCount,
      percent: calculatePercent(current, verb.formCount),
      unlocked: getVerbUnlockInfo(verb.infinitive, "additional").unlocked,
    });
  });

  state.nounDecks.forEach((deck) => {
    const current = getNounCombinedBestScore(deck);
    rows.push({
      label: `Nouns: ${deck.title}`,
      current,
      total: deck.count,
      percent: calculatePercent(current, deck.count),
      unlocked: getNounDeckUnlockInfo(deck.id, "core").unlocked,
    });
  });

  state.nounDecksAdvanced.forEach((deck) => {
    const current = getNounCombinedBestScore(deck);
    rows.push({
      label: `Nouns Advanced: ${deck.title}`,
      current,
      total: deck.count,
      percent: calculatePercent(current, deck.count),
      unlocked: getNounDeckUnlockInfo(deck.id, "advanced").unlocked,
    });
  });

  state.beginnerGroups.forEach((group) => {
    const current = getBeginnerBestScore(group);
    rows.push({
      label: `Beginner: ${group.title}`,
      current,
      total: group.count,
      percent: calculatePercent(current, group.count),
      unlocked: getBeginnerDeckUnlockInfo(group.id).unlocked,
    });
  });

  state.discourseGroups.forEach((group) => {
    const current = getDiscourseBestScore(group);
    rows.push({
      label: `Discourse: ${group.title}`,
      current,
      total: group.count,
      percent: calculatePercent(current, group.count),
      unlocked: getDiscourseDeckUnlockInfo(group.id).unlocked,
    });
  });

  state.conversionGroups.forEach((group) => {
    const current = getConversionBestScore(group);
    rows.push({
      label: `Conversion: ${group.title}`,
      current,
      total: group.count,
      percent: calculatePercent(current, group.count),
      unlocked: getConversionDeckUnlockInfo(group.id).unlocked,
    });
  });

  state.grammarGroups.forEach((group) => {
    const current = getGrammarBestScore(group);
    rows.push({
      label: `Grammar: ${group.title}`,
      current,
      total: group.count,
      percent: calculatePercent(current, group.count),
      unlocked: getGrammarDeckUnlockInfo(group.id).unlocked,
    });
  });

  state.slangGroups.forEach((group) => {
    const current = getSlangBestScore(group);
    rows.push({
      label: `Slang: ${group.title}`,
      current,
      total: group.count,
      percent: calculatePercent(current, group.count),
      unlocked: getSlangDeckUnlockInfo(group.id).unlocked,
    });
  });

  const sortDifficulty = (left, right) =>
    left.percent - right.percent ||
    (left.current > 0 ? 0 : 1) - (right.current > 0 ? 0 : 1) ||
    right.total - left.total ||
    left.label.localeCompare(right.label);

  const started = rows
    .filter((row) => row.unlocked && row.percent < 100 && row.current > 0)
    .sort(sortDifficulty);

  const selected = started.slice(0, limit);

  if (selected.length < limit) {
    const fallback = rows
      .filter(
        (row) =>
          row.unlocked &&
          row.percent < 100 &&
          !selected.some((picked) => picked.label === row.label),
      )
      .sort(sortDifficulty);
    selected.push(...fallback.slice(0, limit - selected.length));
  }

  return selected;
}

function renderStatsHubTile() {
  if (
    !statsOverallAccuracy ||
    !statsMinutesStudied ||
    !statsWordsPerMinute ||
    !statsWeeklyTrend ||
    !statsMasteryPace ||
    !statsHardestTrack ||
    !statsTrackList ||
    !statsHardestDecksList
  ) {
    return;
  }

  if (!state.dataLoaded) {
    statsOverallAccuracy.textContent = "Loading...";
    statsMinutesStudied.textContent = "Loading...";
    statsWordsPerMinute.textContent = "Loading...";
    statsWeeklyTrend.textContent = "Loading...";
    statsMasteryPace.textContent = "Loading...";
    statsHardestTrack.textContent = "Loading...";
    renderStatsList(statsTrackList, [], "Loading...");
    renderStatsList(statsHardestDecksList, [], "Loading...");
    return;
  }

  const stats = normalizeAttemptStats(state.attemptStats);
  state.attemptStats = stats;

  const totalAttempts = stats.totals.attempts;
  const totalCorrect = stats.totals.correct;
  const totalWords = Math.max(0, Number(stats.totals.words) || 0);
  const totalActiveMs = Math.max(0, Number(stats.totals.activeMs) || 0);
  const totalMinutes = totalActiveMs / (60 * 1000);
  const overallPercent = totalAttempts > 0 ? calculatePercent(totalCorrect, totalAttempts) : 0;
  statsOverallAccuracy.textContent =
    totalAttempts > 0 ? `${overallPercent}% (${totalCorrect}/${totalAttempts})` : "No attempts yet";
  statsMinutesStudied.textContent =
    totalAttempts > 0 ? `${totalMinutes.toFixed(1)} min` : "No attempts yet";
  statsWordsPerMinute.textContent =
    totalWords > 0 && totalMinutes > 0 ? `${(totalWords / totalMinutes).toFixed(1)} wpm` : "No data yet";

  const trend = getWeeklyProgressTrend(state.currentUser?.username || "");
  if (trend.thisWeekPoints === 0 && trend.lastWeekPoints === 0) {
    statsWeeklyTrend.textContent = "No movement yet";
  } else if (trend.delta > 0) {
    statsWeeklyTrend.textContent = `+${trend.delta} pts`;
  } else if (trend.delta < 0) {
    statsWeeklyTrend.textContent = `${trend.delta} pts`;
  } else {
    statsWeeklyTrend.textContent = "Flat";
  }

  const masteryPerDay = trend.thisWeekPoints / 7;
  statsMasteryPace.textContent = `${masteryPerDay.toFixed(1)} pts/day`;

  const hardestTrackRow = STATS_TRACKS.map((track) => {
    const trackStats = stats.byTrack[track.id] || { attempts: 0, correct: 0 };
    const percent =
      trackStats.attempts > 0 ? calculatePercent(trackStats.correct, trackStats.attempts) : 0;
    return {
      id: track.id,
      label: getTrackLabel(track.id),
      attempts: trackStats.attempts,
      percent,
      correct: trackStats.correct,
    };
  })
    .filter((row) => row.attempts >= 5)
    .sort((left, right) => left.percent - right.percent || right.attempts - left.attempts)[0];

  statsHardestTrack.textContent = hardestTrackRow
    ? `${hardestTrackRow.label} (${hardestTrackRow.percent}%)`
    : "Need 5 attempts";

  const unlockOrder = TRACK_UNLOCK_TIERS.flat();
  const trackRows = unlockOrder
    .map((trackId) => {
      const track = STATS_TRACKS.find((entry) => entry.id === trackId);
      if (!track) {
        return null;
      }
      const unlockInfo = getTrackUnlockInfo(track.id);
      if (!unlockInfo.unlocked) {
        return null;
      }
      const trackStats = stats.byTrack[track.id] || { attempts: 0, correct: 0 };
      const percent =
        trackStats.attempts > 0 ? calculatePercent(trackStats.correct, trackStats.attempts) : 0;
      const metric =
        trackStats.attempts > 0
          ? `${percent}% (${trackStats.correct}/${trackStats.attempts})`
          : "No attempts";
      return {
        label: getTrackLabel(track.id),
        metric,
      };
    })
    .filter(Boolean);

  renderStatsList(statsTrackList, trackRows, "No attempts yet.");

  const hardestDeckRows = buildHardestDeckRows(3).map((row) => ({
    label: row.label,
    metric: `${row.current}/${row.total} (${row.percent}%)`,
  }));

  renderStatsList(
    statsHardestDecksList,
    hardestDeckRows,
    "No active decks yet. Complete a quiz to start tracking.",
  );
}

function getEffectiveCurrentStreak() {
  if (!state.gamificationData) {
    return 0;
  }
  const streak = state.gamificationData.streak;
  if (!streak.lastActiveDate) {
    return 0;
  }
  const today = getTodayKey();
  const gap = dayKeyDiff(streak.lastActiveDate, today);
  if (gap <= 1) {
    return streak.current;
  }
  return 0;
}

function getCombinedCorrectCount() {
  const attemptCorrect = Number(state.attemptStats?.totals?.correct) || 0;
  const srsCorrect = Number(state.srsData?.stats?.correct) || 0;
  return Math.max(0, attemptCorrect + srsCorrect);
}

function getSrsReviewCount() {
  return Math.max(0, Number(state.srsData?.stats?.reviews) || 0);
}

function getStoriesReadCount() {
  return Object.keys(state.gamificationData?.storiesRead || {}).length;
}

function hasAnyPerfectBestScore() {
  const checkPairs = [];

  state.verbs.forEach((verb) => {
    checkPairs.push({
      score: getVerbBestScore(verb, "core"),
      total: verb.formCount,
    });
  });
  state.verbsAdditional.forEach((verb) => {
    checkPairs.push({
      score: getVerbBestScore(verb, "additional"),
      total: verb.formCount,
    });
  });
  state.nounDecks.forEach((deck) => {
    checkPairs.push({
      score: getNounCombinedBestScore(deck),
      total: deck.count,
    });
  });
  state.nounDecksAdvanced.forEach((deck) => {
    checkPairs.push({
      score: getNounCombinedBestScore(deck),
      total: deck.count,
    });
  });
  state.beginnerGroups.forEach((group) => {
    checkPairs.push({
      score: getBeginnerBestScore(group),
      total: group.count,
    });
  });
  state.discourseGroups.forEach((group) => {
    checkPairs.push({
      score: getDiscourseBestScore(group),
      total: group.count,
    });
  });
  state.conversionGroups.forEach((group) => {
    checkPairs.push({
      score: getConversionBestScore(group),
      total: group.count,
    });
  });
  state.grammarGroups.forEach((group) => {
    checkPairs.push({
      score: getGrammarBestScore(group),
      total: group.count,
    });
  });
  state.slangGroups.forEach((group) => {
    checkPairs.push({
      score: getSlangBestScore(group),
      total: group.count,
    });
  });

  return checkPairs.some((entry) => entry.total > 0 && entry.score >= entry.total);
}

function isAchievementUnlocked(achievementId) {
  return Boolean(state.gamificationData?.achievements?.[achievementId]);
}

function evaluateAchievementRule(achievementId) {
  const totalCorrect = getCombinedCorrectCount();
  const streak = getEffectiveCurrentStreak();
  const storiesRead = getStoriesReadCount();
  const srsReviews = getSrsReviewCount();
  const progressPercent = getOverallStudyProgress().percent;

  switch (achievementId) {
    case "first-correct":
      return totalCorrect >= 1;
    case "ten-correct":
      return totalCorrect >= 10;
    case "hundred-correct":
      return totalCorrect >= 100;
    case "streak-3":
      return streak >= 3;
    case "streak-7":
      return streak >= 7;
    case "story-1":
      return storiesRead >= 1;
    case "story-6":
      return storiesRead >= 6;
    case "srs-20":
      return srsReviews >= 20;
    case "srs-200":
      return srsReviews >= 200;
    case "progress-10":
      return progressPercent >= 10;
    case "progress-25":
      return progressPercent >= 25;
    case "perfect-score":
      return hasAnyPerfectBestScore();
    default:
      return false;
  }
}

function getAchievementProgressText(achievementId) {
  const totalCorrect = getCombinedCorrectCount();
  const streak = getEffectiveCurrentStreak();
  const storiesRead = getStoriesReadCount();
  const srsReviews = getSrsReviewCount();
  const progressPercent = Math.round(getOverallStudyProgress().percent);

  switch (achievementId) {
    case "first-correct":
      return `${Math.min(totalCorrect, 1)}/1`;
    case "ten-correct":
      return `${Math.min(totalCorrect, 10)}/10`;
    case "hundred-correct":
      return `${Math.min(totalCorrect, 100)}/100`;
    case "streak-3":
      return `${Math.min(streak, 3)}/3 days`;
    case "streak-7":
      return `${Math.min(streak, 7)}/7 days`;
    case "story-1":
      return `${Math.min(storiesRead, 1)}/1`;
    case "story-6":
      return `${Math.min(storiesRead, 6)}/6`;
    case "srs-20":
      return `${Math.min(srsReviews, 20)}/20`;
    case "srs-200":
      return `${Math.min(srsReviews, 200)}/200`;
    case "progress-10":
      return `${Math.min(progressPercent, 10)}%/10%`;
    case "progress-25":
      return `${Math.min(progressPercent, 25)}%/25%`;
    case "perfect-score":
      return hasAnyPerfectBestScore() ? "Done" : "Not yet";
    default:
      return "";
  }
}

function formatLastActive(dayKey) {
  if (!dayKey) {
    return "Never";
  }
  const today = getTodayKey();
  const gap = dayKeyDiff(dayKey, today);
  if (gap === 0) {
    return "Today";
  }
  if (gap === 1) {
    return "Yesterday";
  }
  return dayKey;
}

function evaluateAchievementsAndSync({ source = "", save = true } = {}) {
  if (!state.currentUser?.username) {
    return [];
  }
  if (!state.gamificationData) {
    state.gamificationData = createEmptyGamificationData();
  }

  refreshStreakStatusForToday();
  const unlocked = [];

  ACHIEVEMENT_DEFINITIONS.forEach((achievement) => {
    if (isAchievementUnlocked(achievement.id)) {
      return;
    }
    if (!evaluateAchievementRule(achievement.id)) {
      return;
    }
    state.gamificationData.achievements[achievement.id] = {
      unlockedAt: Date.now(),
    };
    unlocked.push(achievement);
  });

  if (unlocked.length > 0) {
    if (save) {
      saveGamificationData();
    }
    const latest = unlocked[0];
    if (source !== "init") {
      setStatus(`Achievement unlocked: ${latest.title}`);
    }
  } else if (save) {
    saveGamificationData();
  }

  return unlocked;
}

function renderAchievementsPanel() {
  if (
    !streakCurrentValue ||
    !streakBestValue ||
    !achievementsUnlockedValue ||
    !streakLastActiveValue ||
    !achievementsList
  ) {
    return;
  }

  if (!state.dataLoaded) {
    streakCurrentValue.textContent = "Loading...";
    streakBestValue.textContent = "Loading...";
    achievementsUnlockedValue.textContent = "Loading...";
    streakLastActiveValue.textContent = "Loading...";
    achievementsList.innerHTML = `<li class="stats-empty">Loading...</li>`;
    return;
  }

  if (!state.gamificationData) {
    state.gamificationData = createEmptyGamificationData();
  }

  refreshStreakStatusForToday();
  evaluateAchievementsAndSync({ source: "init", save: true });

  const currentStreak = getEffectiveCurrentStreak();
  const bestStreak = Math.max(
    Number(state.gamificationData?.streak?.best) || 0,
    currentStreak,
  );
  const unlockedCount = ACHIEVEMENT_DEFINITIONS.filter((achievement) =>
    isAchievementUnlocked(achievement.id),
  ).length;
  const lastActive = state.gamificationData?.streak?.lastActiveDate || "";

  streakCurrentValue.textContent = `${currentStreak} day${currentStreak === 1 ? "" : "s"}`;
  streakBestValue.textContent = `${bestStreak} day${bestStreak === 1 ? "" : "s"}`;
  achievementsUnlockedValue.textContent = `${unlockedCount}/${ACHIEVEMENT_DEFINITIONS.length}`;
  streakLastActiveValue.textContent = formatLastActive(lastActive);

  achievementsList.innerHTML = "";
  const sortedAchievements = [...ACHIEVEMENT_DEFINITIONS].sort((left, right) => {
    const leftUnlock = state.gamificationData.achievements[left.id]?.unlockedAt || 0;
    const rightUnlock = state.gamificationData.achievements[right.id]?.unlockedAt || 0;
    if (leftUnlock && rightUnlock) {
      return rightUnlock - leftUnlock;
    }
    if (leftUnlock) {
      return -1;
    }
    if (rightUnlock) {
      return 1;
    }
    return left.title.localeCompare(right.title);
  });

  sortedAchievements.forEach((achievement) => {
    const unlocked = isAchievementUnlocked(achievement.id);
    const item = document.createElement("li");
    item.className = `achievement-item ${unlocked ? "unlocked" : "locked"}`;

    const main = document.createElement("div");
    main.className = "achievement-main";

    const title = document.createElement("span");
    title.className = "achievement-title";
    title.textContent = achievement.title;

    const description = document.createElement("span");
    description.className = "achievement-description";
    description.textContent = achievement.description;

    const status = document.createElement("span");
    status.className = "achievement-status";
    status.textContent = unlocked ? "Unlocked" : getAchievementProgressText(achievement.id);

    main.append(title, description);
    item.append(main, status);
    achievementsList.appendChild(item);
  });
}

function renderLeaderboards() {
  if (!globalLeaderboardList || !weeklyLeaderboardList) {
    return;
  }
  if (!state.dataLoaded) {
    globalLeaderboardList.innerHTML = `<li class="leaderboard-empty">Loading...</li>`;
    weeklyLeaderboardList.innerHTML = `<li class="leaderboard-empty">Loading...</li>`;
    return;
  }

  const { globalRows, weeklyRows } = buildLeaderboardRows();

  renderLeaderboardList(globalLeaderboardList, globalRows, (row) => {
    return `${Math.round(row.percent)}%`;
  });
  renderLeaderboardList(weeklyLeaderboardList, weeklyRows, (row) => {
    return `${row.weeklyPoints} pts`;
  });
}

function recordBestScore(bucket, key, score, total) {
  const normalizedScore = Math.max(0, Math.min(score, total));
  const currentBest = getBestScore(bucket, key, total);
  if (normalizedScore <= currentBest) {
    return false;
  }
  const delta = normalizedScore - currentBest;
  state.bestScores[bucket][key] = normalizedScore;
  saveBestScores();
  addProgressActivity(delta, bucket, key);
  evaluateAchievementsAndSync({ source: "best-score", save: true });
  return true;
}

function nounScoreKey(deckId, mode = state.nounMode) {
  return mode === "plural" ? `${deckId}::plural` : deckId;
}

function getNounBestScore(deck, mode = state.nounMode) {
  return getBestScore("nouns", nounScoreKey(deck.id, mode), deck.count);
}

function getNounCombinedBestScore(deck) {
  return Math.max(getNounBestScore(deck, "singular"), getNounBestScore(deck, "plural"));
}

function getBeginnerBestScore(group) {
  return getBestScore("beginner", group.id, group.count);
}

function getDiscourseBestScore(group) {
  return getBestScore("discourse", group.id, group.count);
}

function getConversionBestScore(group) {
  return getBestScore("conversion", group.id, group.count);
}

function getGrammarBestScore(group) {
  return getBestScore("grammar", group.id, group.count);
}

function getSlangBestScore(group) {
  return getBestScore("slang", group.id, group.count);
}

function getVerbAggregateProgress(trackMode = "core") {
  const verbs = getActiveVerbList(trackMode);
  const total = verbs.reduce((acc, verb) => acc + verb.formCount, 0);
  const current = verbs.reduce((acc, verb) => acc + getVerbBestScore(verb, trackMode), 0);
  return { current, total };
}

function getNounAggregateProgress(mode = state.nounMode, trackMode = "core") {
  const decks = getActiveNounDecks(trackMode);
  const total = decks.reduce((acc, deck) => acc + deck.count, 0);
  const current = decks.reduce((acc, deck) => acc + getNounBestScore(deck, mode), 0);
  return { current, total };
}

function getNounAggregateCombinedProgress(trackMode = "core") {
  const decks = getActiveNounDecks(trackMode);
  const total = decks.reduce((acc, deck) => acc + deck.count, 0);
  const current = decks.reduce((acc, deck) => acc + getNounCombinedBestScore(deck), 0);
  return { current, total };
}

function getBeginnerAggregateProgress() {
  const total = state.beginnerGroups.reduce((acc, group) => acc + group.count, 0);
  const current = state.beginnerGroups.reduce(
    (acc, group) => acc + getBeginnerBestScore(group),
    0,
  );
  return { current, total };
}

function getDiscourseAggregateProgress() {
  const total = state.discourseGroups.reduce((acc, group) => acc + group.count, 0);
  const current = state.discourseGroups.reduce(
    (acc, group) => acc + getDiscourseBestScore(group),
    0,
  );
  return { current, total };
}

function getConversionAggregateProgress() {
  const total = state.conversionGroups.reduce((acc, group) => acc + group.count, 0);
  const current = state.conversionGroups.reduce(
    (acc, group) => acc + getConversionBestScore(group),
    0,
  );
  return { current, total };
}

function getGrammarAggregateProgress() {
  const total = state.grammarGroups.reduce((acc, group) => acc + group.count, 0);
  const current = state.grammarGroups.reduce(
    (acc, group) => acc + getGrammarBestScore(group),
    0,
  );
  return { current, total };
}

function getSlangAggregateProgress() {
  const total = state.slangGroups.reduce((acc, group) => acc + group.count, 0);
  const current = state.slangGroups.reduce((acc, group) => acc + getSlangBestScore(group), 0);
  return { current, total };
}

function getOverallStudyProgress() {
  const verb = getVerbAggregateProgress("core");
  const verbAdditional = getVerbAggregateProgress("additional");
  const noun = getNounAggregateCombinedProgress("core");
  const nounAdvanced = getNounAggregateCombinedProgress("advanced");
  const beginner = getBeginnerAggregateProgress();
  const discourse = getDiscourseAggregateProgress();
  const conversion = getConversionAggregateProgress();
  const grammar = getGrammarAggregateProgress();
  const slang = getSlangAggregateProgress();
  const current =
    verb.current +
    verbAdditional.current +
    noun.current +
    nounAdvanced.current +
    beginner.current +
    discourse.current +
    conversion.current +
    grammar.current +
    slang.current;
  const total =
    verb.total +
    verbAdditional.total +
    noun.total +
    nounAdvanced.total +
    beginner.total +
    discourse.total +
    conversion.total +
    grammar.total +
    slang.total;
  const percent = total === 0 ? 0 : (current / total) * 100;
  return { current, total, percent };
}

function updateDashboardProgressBars() {
  const verb = getVerbAggregateProgress(state.activeVerbTrack);
  const nounModeLabel =
    state.nounMode === "plural"
      ? "Noun progress (plural mode)"
      : state.activeNounTrack === "advanced"
        ? "Nouns 501-2000 progress"
        : "Top 500 noun progress";
  const noun = getNounAggregateProgress(state.nounMode, state.activeNounTrack);
  const overall = getOverallStudyProgress();
  const beginner = getBeginnerAggregateProgress();
  const discourse = getDiscourseAggregateProgress();
  const conversion = getConversionAggregateProgress();
  const grammar = getGrammarAggregateProgress();
  const slang = getSlangAggregateProgress();

  setProgressBar(
    trainingHubProgressText,
    trainingHubProgressFill,
    "Overall progress",
    overall.current,
    overall.total,
  );
  setProgressBar(
    verbDashboardProgressText,
    verbDashboardProgressFill,
    state.activeVerbTrack === "additional" ? "Additional tense progress" : "Verb progress",
    verb.current,
    verb.total,
  );
  setProgressBar(
    nounsDashboardProgressText,
    nounsDashboardProgressFill,
    nounModeLabel,
    noun.current,
    noun.total,
  );
  setProgressBar(
    beginnerDashboardProgressText,
    beginnerDashboardProgressFill,
    "Beginner progress",
    beginner.current,
    beginner.total,
  );
  setProgressBar(
    discourseDashboardProgressText,
    discourseDashboardProgressFill,
    "Discourse progress",
    discourse.current,
    discourse.total,
  );
  setProgressBar(
    conversionDashboardProgressText,
    conversionDashboardProgressFill,
    "Conversion progress",
    conversion.current,
    conversion.total,
  );
  setProgressBar(
    grammarDashboardProgressText,
    grammarDashboardProgressFill,
    "Grammar progress",
    grammar.current,
    grammar.total,
  );
  setProgressBar(
    slangDashboardProgressText,
    slangDashboardProgressFill,
    "Slang progress",
    slang.current,
    slang.total,
  );
  setProgressBar(
    moduleDashboardProgressText,
    moduleDashboardProgressFill,
    "Module progress",
    0,
    1,
  );
}

function setStatus(message, isError = false) {
  statusPanel.hidden = false;
  statusPanel.textContent = message;
  statusPanel.style.color = isError ? "var(--danger)" : "var(--ink)";
}

function clearStatus() {
  statusPanel.hidden = true;
  statusPanel.textContent = "";
}

function getModuleProgress(moduleType) {
  if (moduleType === "beginner") {
    return getBeginnerAggregateProgress();
  }
  if (moduleType === "discourse") {
    return getDiscourseAggregateProgress();
  }
  if (moduleType === "conversion") {
    return getConversionAggregateProgress();
  }
  if (moduleType === "grammar") {
    return getGrammarAggregateProgress();
  }
  if (moduleType === "slang") {
    return getSlangAggregateProgress();
  }
  if (moduleType === "kofi") {
    return getVerbAggregateProgress("core");
  }
  if (moduleType === "nouns") {
    return getNounAggregateCombinedProgress("core");
  }
  if (moduleType === "kofi-additional") {
    return getVerbAggregateProgress("additional");
  }
  if (moduleType === "nouns-advanced") {
    return getNounAggregateCombinedProgress("advanced");
  }
  return { current: 0, total: 1 };
}

function calculatePercent(current, total) {
  if (total <= 0) {
    return 100;
  }
  return Math.round((Math.max(0, current) / total) * 100);
}

function getSequentialUnlockInfo(previousTitle, previousScore, previousTotal, thresholdPercent) {
  const previousPercent = calculatePercent(previousScore, previousTotal);
  const unlocked = state.adminMode || previousPercent >= thresholdPercent;
  if (unlocked) {
    return {
      unlocked: true,
      previousTitle,
      previousPercent,
      message: "",
    };
  }
  return {
    unlocked: false,
    previousTitle,
    previousPercent,
    message: `Locked. Reach ${thresholdPercent}% on ${previousTitle} (${previousPercent}% now).`,
  };
}

function getTrackUnlockInfo(moduleType) {
  if (state.adminMode) {
    return {
      unlocked: true,
      previousTitle: "",
      previousPercent: 100,
      message: "",
    };
  }
  const tierIndex = TRACK_UNLOCK_TIERS.findIndex((tier) => tier.includes(moduleType));
  if (tierIndex <= 0) {
    return {
      unlocked: true,
      previousTitle: "",
      previousPercent: 100,
      message: "",
    };
  }

  const requiredTypes = TRACK_UNLOCK_TIERS[tierIndex - 1];
  const lockedModules = requiredTypes
    .map((type) => {
      const module = getTrainingModuleByType(type);
      if (!module) {
        return null;
      }
      const progress = getModuleProgress(type);
      const percent = calculatePercent(progress.current, progress.total);
      return {
        title: module.title,
        percent,
      };
    })
    .filter((module) => module && module.percent < TRACK_UNLOCK_THRESHOLD_PERCENT);

  if (lockedModules.length === 0) {
    return {
      unlocked: true,
      previousTitle: "",
      previousPercent: 100,
      message: "",
    };
  }

  const lockSummary = lockedModules
    .map((module) => `${module.title} (${module.percent}% now)`)
    .join(" and ");
  return {
    unlocked: false,
    previousTitle: lockedModules.map((module) => module.title).join(", "),
    previousPercent: lockedModules[0].percent,
    message: `Locked. Reach ${TRACK_UNLOCK_THRESHOLD_PERCENT}% in ${lockSummary}.`,
  };
}

function getVerbUnlockInfo(infinitive, trackMode = state.activeVerbTrack) {
  const verbs = getActiveVerbList(trackMode);
  const index = verbs.findIndex((verb) => verb.infinitive === infinitive);
  if (index <= 0 || state.adminMode) {
    return {
      unlocked: true,
      previousTitle: "",
      previousPercent: 100,
      message: "",
    };
  }
  const previousVerb = verbs[index - 1];
  const previousScore = getVerbBestScore(previousVerb, trackMode);
  return getSequentialUnlockInfo(
    previousVerb.infinitive,
    previousScore,
    previousVerb.formCount,
    QUIZ_UNLOCK_THRESHOLD_PERCENT,
  );
}

function getSequentialDeckUnlockInfo(items, currentId, scoreFn, totalFn, titleFn) {
  const index = items.findIndex((item) => item.id === currentId);
  if (index <= 0 || state.adminMode) {
    return {
      unlocked: true,
      previousTitle: "",
      previousPercent: 100,
      message: "",
    };
  }
  const previousItem = items[index - 1];
  return getSequentialUnlockInfo(
    titleFn(previousItem),
    scoreFn(previousItem),
    totalFn(previousItem),
    QUIZ_UNLOCK_THRESHOLD_PERCENT,
  );
}

function getNounDeckUnlockInfo(deckId, trackMode = state.activeNounTrack) {
  const decks = getActiveNounDecks(trackMode);
  return getSequentialDeckUnlockInfo(
    decks,
    deckId,
    (deck) => getNounBestScore(deck, state.nounMode),
    (deck) => deck.count,
    (deck) => deck.title,
  );
}

function getBeginnerDeckUnlockInfo(groupId) {
  return getSequentialDeckUnlockInfo(
    state.beginnerGroups,
    groupId,
    (group) => getBeginnerBestScore(group),
    (group) => group.count,
    (group) => group.title,
  );
}

function getDiscourseDeckUnlockInfo(groupId) {
  return getSequentialDeckUnlockInfo(
    state.discourseGroups,
    groupId,
    (group) => getDiscourseBestScore(group),
    (group) => group.count,
    (group) => group.title,
  );
}

function getConversionDeckUnlockInfo(groupId) {
  return getSequentialDeckUnlockInfo(
    state.conversionGroups,
    groupId,
    (group) => getConversionBestScore(group),
    (group) => group.count,
    (group) => group.title,
  );
}

function getGrammarDeckUnlockInfo(groupId) {
  return getSequentialDeckUnlockInfo(
    state.grammarGroups,
    groupId,
    (group) => getGrammarBestScore(group),
    (group) => group.count,
    (group) => group.title,
  );
}

function getSlangDeckUnlockInfo(groupId) {
  return getSequentialDeckUnlockInfo(
    state.slangGroups,
    groupId,
    (group) => getSlangBestScore(group),
    (group) => group.count,
    (group) => group.title,
  );
}

function getTrackTierLabel(index) {
  return TRACK_TIER_LABELS[index] || `Tier ${index + 1}`;
}

function openTrackByType(type) {
  if (type === "beginner") {
    openBeginnerDashboard();
    return;
  }
  if (type === "kofi") {
    openVerbDashboard("core");
    return;
  }
  if (type === "nouns") {
    openNounsDashboard("core");
    return;
  }
  if (type === "kofi-additional") {
    openVerbDashboard("additional");
    return;
  }
  if (type === "nouns-advanced") {
    openNounsDashboard("advanced");
    return;
  }
  if (type === "discourse") {
    openDiscourseDashboard();
    return;
  }
  if (type === "conversion") {
    openConversionDashboard();
    return;
  }
  if (type === "grammar") {
    openGrammarDashboard();
    return;
  }
  if (type === "slang") {
    openSlangDashboard();
  }
}

function renderProgressMap() {
  if (!progressMap) {
    return;
  }

  progressMap.innerHTML = "";

  TRACK_UNLOCK_TIERS.forEach((tier, tierIndex) => {
    const tierSection = document.createElement("section");
    tierSection.className = "progress-tier";

    const completedCount = tier.reduce((acc, type) => {
      const moduleProgress = getModuleProgress(type);
      const modulePercent = calculatePercent(moduleProgress.current, moduleProgress.total);
      return acc + (modulePercent >= TRACK_UNLOCK_THRESHOLD_PERCENT ? 1 : 0);
    }, 0);

    const tierHeader = document.createElement("div");
    tierHeader.className = "progress-tier-header";
    tierHeader.innerHTML = `
      <span class="progress-tier-title">${getTrackTierLabel(tierIndex)}</span>
      <span class="progress-tier-meta">${completedCount}/${tier.length} at ${TRACK_UNLOCK_THRESHOLD_PERCENT}%</span>
    `;

    const nodesWrap = document.createElement("div");
    nodesWrap.className = "progress-tier-nodes";

    tier.forEach((type) => {
      const module = getTrainingModuleByType(type);
      if (!module) {
        return;
      }

      const moduleProgress = getModuleProgress(type);
      const modulePercent = calculatePercent(moduleProgress.current, moduleProgress.total);
      const unlockInfo = getTrackUnlockInfo(type);
      const completed = modulePercent >= TRACK_UNLOCK_THRESHOLD_PERCENT;
      const nodeStateClass = completed ? "completed" : unlockInfo.unlocked ? "unlocked" : "locked";

      const node = document.createElement("button");
      node.type = "button";
      node.className = `map-node ${nodeStateClass}`;
      node.disabled = !unlockInfo.unlocked;
      node.title = unlockInfo.unlocked ? `Open ${module.title}` : unlockInfo.message;
      node.innerHTML = `
        <span class="map-node-title">${module.title}</span>
        <span class="map-node-meta">${moduleProgress.current}/${moduleProgress.total} (${modulePercent}%)</span>
        <span class="map-node-status">${completed ? "Tier complete" : unlockInfo.unlocked ? "Unlocked" : "Locked"}</span>
        <div class="mini-progress-track">
          <div class="mini-progress-fill" style="width:${modulePercent}%"></div>
        </div>
      `;

      node.addEventListener("click", () => {
        if (!unlockInfo.unlocked) {
          setStatus(unlockInfo.message, true);
          return;
        }
        openTrackByType(type);
      });

      nodesWrap.appendChild(node);
    });

    tierSection.append(tierHeader, nodesWrap);
    progressMap.appendChild(tierSection);
  });
}

function renderTrainingGrid() {
  if (!trainingGrid) {
    return;
  }
  trainingGrid.innerHTML = "";

  getTrainingModules().forEach((module, index) => {
    const moduleProgress = getModuleProgress(module.type);
    const percent = calculatePercent(moduleProgress.current, moduleProgress.total);
    const unlockInfo = getTrackUnlockInfo(module.type);

    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "training-tile";
    tile.style.setProperty("--stagger", index.toString());
    tile.disabled = !unlockInfo.unlocked;
    tile.title = unlockInfo.unlocked
      ? `Open ${module.title}`
      : unlockInfo.message;
    tile.innerHTML = `
      <span class="tile-title">${module.title}</span>
      <span class="tile-subtitle">${module.subtitle}</span>
      ${unlockInfo.unlocked ? "" : `<span class="tile-lock-text">${unlockInfo.message}</span>`}
      <div class="mini-progress-track">
        <div class="mini-progress-fill" style="width:${percent}%"></div>
      </div>
      <span class="tile-progress-text">${moduleProgress.current}/${moduleProgress.total}</span>
    `;

    tile.addEventListener("click", () => {
      if (!unlockInfo.unlocked) {
        setStatus(unlockInfo.message, true);
        return;
      }
      if (getTrainingModules().some((item) => item.type === module.type)) {
        openTrackByType(module.type);
        return;
      }
      openPlaceholderDashboard(module.title);
    });

    trainingGrid.appendChild(tile);
  });
}

function refreshProgressViews() {
  updateDashboardProgressBars();
  renderTrainingGrid();
  renderProgressMap();
  renderLeaderboardHubTile();
  renderStatsHubTile();
  renderAchievementsPanel();
  renderLeaderboards();
  renderStoriesGrid();
  renderSrsHubTile();
  if (!srsManageView.hidden) {
    renderSrsManageView();
  }

  if (!dashboardView.hidden) {
    filterAndRenderVerbs();
  }
  if (!nounsDashboardView.hidden) {
    renderNounsDeckGrid();
  }
  if (!beginnerDashboardView.hidden) {
    renderBeginnerDeckGrid();
  }
  if (!discourseDashboardView.hidden) {
    renderDiscourseDeckGrid();
  }
  if (!conversionDashboardView.hidden) {
    renderConversionDeckGrid();
  }
  if (!grammarDashboardView.hidden) {
    renderGrammarDeckGrid();
  }
  if (!slangDashboardView.hidden) {
    renderSlangDeckGrid();
  }
}

function openTrainingHub() {
  if (!state.currentUser) {
    showAuthScreen();
    return;
  }
  updateDashboardProgressBars();
  renderTrainingGrid();
  renderProgressMap();
  renderLeaderboardHubTile();
  renderStatsHubTile();
  renderAchievementsPanel();
  renderStoriesGrid();
  renderSrsHubTile();
  showView(trainingHubView);
}

function openPlaceholderDashboard(title) {
  moduleTitle.textContent = title;
  moduleBody.innerHTML = "";
  showView(moduleView);
  updateDashboardProgressBars();
}

function openVerbDashboard(trackMode = "core") {
  const moduleType = trackMode === "additional" ? "kofi-additional" : "kofi";
  const unlockInfo = getTrackUnlockInfo(moduleType);
  if (!unlockInfo.unlocked) {
    setStatus(unlockInfo.message, true);
    showView(trainingHubView);
    return;
  }
  state.activeVerbTrack = trackMode;
  if (verbDashboardTitle) {
    verbDashboardTitle.textContent = getVerbTrackTitle(trackMode);
  }
  filterAndRenderVerbs();
  clearStatus();
  showView(dashboardView);
}

function openNounsDashboard(trackMode = "core") {
  const moduleType = trackMode === "advanced" ? "nouns-advanced" : "nouns";
  const unlockInfo = getTrackUnlockInfo(moduleType);
  if (!unlockInfo.unlocked) {
    setStatus(unlockInfo.message, true);
    showView(trainingHubView);
    return;
  }
  state.activeNounTrack = trackMode;
  if (nounsDashboardTitle) {
    nounsDashboardTitle.textContent = getNounTrackTitle(trackMode);
  }
  renderNounsDeckGrid();
  clearStatus();
  showView(nounsDashboardView);
}

function openBeginnerDashboard() {
  const unlockInfo = getTrackUnlockInfo("beginner");
  if (!unlockInfo.unlocked) {
    setStatus(unlockInfo.message, true);
    showView(trainingHubView);
    return;
  }
  renderBeginnerDeckGrid();
  clearStatus();
  showView(beginnerDashboardView);
}

function openDiscourseDashboard() {
  const unlockInfo = getTrackUnlockInfo("discourse");
  if (!unlockInfo.unlocked) {
    setStatus(unlockInfo.message, true);
    showView(trainingHubView);
    return;
  }
  renderDiscourseDeckGrid();
  clearStatus();
  showView(discourseDashboardView);
}

function openConversionDashboard() {
  const unlockInfo = getTrackUnlockInfo("conversion");
  if (!unlockInfo.unlocked) {
    setStatus(unlockInfo.message, true);
    showView(trainingHubView);
    return;
  }
  renderConversionDeckGrid();
  clearStatus();
  showView(conversionDashboardView);
}

function openGrammarDashboard() {
  const unlockInfo = getTrackUnlockInfo("grammar");
  if (!unlockInfo.unlocked) {
    setStatus(unlockInfo.message, true);
    showView(trainingHubView);
    return;
  }
  renderGrammarDeckGrid();
  clearStatus();
  showView(grammarDashboardView);
}

function openSlangDashboard() {
  const unlockInfo = getTrackUnlockInfo("slang");
  if (!unlockInfo.unlocked) {
    setStatus(unlockInfo.message, true);
    showView(trainingHubView);
    return;
  }
  renderSlangDeckGrid();
  clearStatus();
  showView(slangDashboardView);
}

function openLeaderboardView() {
  renderLeaderboards();
  showView(leaderboardView);
}

function openAccountManagement() {
  if (!state.currentUser) {
    return;
  }
  accountUsernameMeta.textContent = `Username: ${state.currentUser.username}`;
  profileNameInput.value = state.currentUser.name || "";
  currentPasswordInput.value = "";
  newPasswordInput.value = "";
  newPasswordConfirmInput.value = "";
  setFeedbackMessage(profileFeedback, "");
  setFeedbackMessage(passwordFeedback, "");
  showView(accountView);
}

function openStory(storyId) {
  const story = state.stories.find((item) => item.id === storyId);
  if (!story) {
    return;
  }

  const studyProgress = getOverallStudyProgress();
  if (!isStoryUnlocked(story, studyProgress)) {
    return;
  }

  state.currentStory = story;
  storyTitle.textContent = story.title;
  const naturallyUnlocked = studyProgress.percent >= story.unlockPercent;
  const unlockMeta = naturallyUnlocked
    ? `Unlock target: ${story.unlockPercent}% overall progress`
    : `Unlocked by Admin mode (normal unlock: ${story.unlockPercent}%)`;
  storyMeta.textContent = `Level ${story.level} • ${unlockMeta}`;
  storyBody.innerHTML = "";
  story.paragraphs.forEach((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    storyBody.appendChild(p);
  });
  markStoryRead(story.id);
  renderAchievementsPanel();
  showView(storyView);
}

function getModuleTitleByType(moduleType) {
  const module = getTrainingModuleByType(moduleType);
  return module ? module.title : moduleType;
}

function makeSrsCardFromAnswers({
  id,
  prompt,
  displayAnswer,
  answers,
}) {
  const uniqueAnswers = [...new Set((answers || []).filter(Boolean).map((answer) => String(answer)))];
  const normalizedAnswers = [...new Set(uniqueAnswers.map((answer) => normalize(answer)).filter(Boolean))];
  if (!uniqueAnswers.length || !normalizedAnswers.length) {
    return null;
  }
  return {
    id,
    prompt: String(prompt || ""),
    displayAnswer: displayAnswer || uniqueAnswers[0],
    answers: uniqueAnswers,
    normalizedAnswers,
  };
}

function buildSrsDeckCatalog() {
  const decks = [];

  const pushDeck = (deck) => {
    if (!deck.items.length) {
      return;
    }
    decks.push({
      ...deck,
      itemCount: deck.items.length,
    });
  };

  const addVerbDecks = (verbs, moduleType, trackMode) => {
    const trackLabel = getModuleTitleByType(moduleType);
    verbs.forEach((verb) => {
      const deckId = `srs::${moduleType}::${verb.infinitive}`;
      const cards = verb.forms
        .map((form, index) =>
          makeSrsCardFromAnswers({
            id: `${deckId}::${index + 1}`,
            prompt: `${form.label} of ${verb.infinitive}${verb.translation ? ` (${verb.translation})` : ""}`,
            displayAnswer: form.answer,
            answers: [form.answer],
          }),
        )
        .filter(Boolean)
        .map((card) => ({
          ...card,
          deckId,
          deckTitle: verb.infinitive,
          trackLabel,
        }));

      pushDeck({
        id: deckId,
        title: verb.infinitive,
        subtitle: `${verb.formCount} forms`,
        moduleType,
        kind: "verb",
        sourceId: verb.infinitive,
        trackMode,
        items: cards,
      });
    });
  };

  const addNounDecks = (sourceDecks, moduleType, trackMode) => {
    const trackLabel = getModuleTitleByType(moduleType);
    sourceDecks.forEach((deck) => {
      const deckId = `srs::${moduleType}::${deck.id}`;
      const cards = [];
      deck.items.forEach((item, index) => {
        const singularAnswers = item.answers && item.answers.length ? item.answers : [item.answer];
        const singularUnique = [...new Set(singularAnswers)];
        const pluralUnique = getPluralAnswersFromItem(item, singularUnique);
        const baseHint = addEnglishArticle(item.hint);

        const singularCard = makeSrsCardFromAnswers({
          id: `${deckId}::s::${index + 1}`,
          prompt: `${baseHint} (singular)`,
          displayAnswer: singularUnique[0],
          answers: singularUnique,
        });
        const pluralCard = makeSrsCardFromAnswers({
          id: `${deckId}::p::${index + 1}`,
          prompt: `${baseHint} (plural)`,
          displayAnswer: pluralUnique[0],
          answers: pluralUnique,
        });

        if (singularCard) {
          cards.push({
            ...singularCard,
            deckId,
            deckTitle: deck.title,
            trackLabel,
          });
        }
        if (pluralCard) {
          cards.push({
            ...pluralCard,
            deckId,
            deckTitle: deck.title,
            trackLabel,
          });
        }
      });

      pushDeck({
        id: deckId,
        title: deck.title,
        subtitle: `${deck.count} nouns (singular + plural)`,
        moduleType,
        kind: "noun",
        sourceId: deck.id,
        trackMode,
        items: cards,
      });
    });
  };

  const addGroupDecks = (groups, moduleType, kind, itemMapper) => {
    const trackLabel = getModuleTitleByType(moduleType);
    groups.forEach((group) => {
      const deckId = `srs::${moduleType}::${group.id}`;
      const mappedItems = group.items.map(itemMapper);
      const cards = mappedItems
        .map((item, index) =>
          makeSrsCardFromAnswers({
            id: `${deckId}::${index + 1}`,
            prompt: item.hint,
            displayAnswer: item.displayAnswer,
            answers: item.answers,
          }),
        )
        .filter(Boolean)
        .map((card) => ({
          ...card,
          deckId,
          deckTitle: group.title,
          trackLabel,
        }));

      pushDeck({
        id: deckId,
        title: group.title,
        subtitle: `${group.count} cards`,
        moduleType,
        kind,
        sourceId: group.id,
        trackMode: null,
        items: cards,
      });
    });
  };

  addVerbDecks(state.verbs, "kofi", "core");
  addNounDecks(state.nounDecks, "nouns", "core");
  addGroupDecks(state.beginnerGroups, "beginner", "beginner", makeBeginnerQuizItem);
  addGroupDecks(state.discourseGroups, "discourse", "discourse", makeDiscourseQuizItem);
  addGroupDecks(state.conversionGroups, "conversion", "conversion", makeConversionQuizItem);
  addGroupDecks(state.grammarGroups, "grammar", "grammar", makeGrammarQuizItem);
  addGroupDecks(state.slangGroups, "slang", "slang", makeSlangQuizItem);
  addVerbDecks(state.verbsAdditional, "kofi-additional", "additional");
  addNounDecks(state.nounDecksAdvanced, "nouns-advanced", "advanced");

  return decks;
}

function getSrsDeckUnlockInfo(deck) {
  const trackUnlock = getTrackUnlockInfo(deck.moduleType);
  if (!trackUnlock.unlocked) {
    return trackUnlock;
  }

  if (deck.kind === "verb") {
    return getVerbUnlockInfo(deck.sourceId, deck.trackMode);
  }
  if (deck.kind === "noun") {
    return getNounDeckUnlockInfo(deck.sourceId, deck.trackMode);
  }
  if (deck.kind === "beginner") {
    return getBeginnerDeckUnlockInfo(deck.sourceId);
  }
  if (deck.kind === "discourse") {
    return getDiscourseDeckUnlockInfo(deck.sourceId);
  }
  if (deck.kind === "conversion") {
    return getConversionDeckUnlockInfo(deck.sourceId);
  }
  if (deck.kind === "grammar") {
    return getGrammarDeckUnlockInfo(deck.sourceId);
  }
  if (deck.kind === "slang") {
    return getSlangDeckUnlockInfo(deck.sourceId);
  }
  return {
    unlocked: true,
    previousTitle: "",
    previousPercent: 100,
    message: "",
  };
}

function syncSrsDataToCatalog() {
  if (!state.srsData) {
    state.srsData = createEmptySrsData();
  }
  state.srsData = normalizeSrsData(state.srsData);

  let changed = resetSrsDailyCounterIfNeeded();

  const deckIds = new Set(state.srsDeckCatalog.map((deck) => deck.id));
  Object.keys(state.srsData.selectedDecks).forEach((deckId) => {
    if (!deckIds.has(deckId)) {
      delete state.srsData.selectedDecks[deckId];
      changed = true;
    }
  });

  Object.keys(state.srsData.cardStates).forEach((cardId) => {
    if (!state.srsCardMap.has(cardId)) {
      delete state.srsData.cardStates[cardId];
      changed = true;
    }
  });

  if (!state.srsData.initialized) {
    state.srsDeckCatalog.forEach((deck) => {
      const unlockInfo = getSrsDeckUnlockInfo(deck);
      if (unlockInfo.unlocked) {
        state.srsData.selectedDecks[deck.id] = true;
      }
    });
    state.srsData.initialized = true;
    changed = true;
  }

  if (changed) {
    saveSrsData();
  }
}

function rebuildSrsCatalog() {
  state.srsDeckCatalog = buildSrsDeckCatalog();
  state.srsDeckMap = new Map(state.srsDeckCatalog.map((deck) => [deck.id, deck]));
  const cardEntries = [];
  state.srsDeckCatalog.forEach((deck) => {
    deck.items.forEach((card) => {
      cardEntries.push([card.id, card]);
    });
  });
  state.srsCardMap = new Map(cardEntries);
  syncSrsDataToCatalog();
}

function getSelectedSrsDecks() {
  if (!state.srsData) {
    return [];
  }
  return state.srsDeckCatalog.filter((deck) => Boolean(state.srsData.selectedDecks[deck.id]));
}

function getSelectedUnlockedSrsDecks() {
  return getSelectedSrsDecks().filter((deck) => getSrsDeckUnlockInfo(deck).unlocked);
}

function getSrsQueueSummary() {
  if (!state.srsData) {
    return {
      dueNow: 0,
      newTotal: 0,
      newRemaining: SRS_DAILY_NEW_LIMIT,
      newAvailable: 0,
      queueCount: 0,
      selectedDecks: 0,
      selectedCards: 0,
      unlockedSelectedDecks: 0,
      unlockedSelectedCards: 0,
    };
  }

  const changed = resetSrsDailyCounterIfNeeded();
  if (changed) {
    saveSrsData();
  }

  const now = Date.now();
  let dueNow = 0;
  let newTotal = 0;
  let selectedCards = 0;
  let unlockedSelectedDecks = 0;
  let unlockedSelectedCards = 0;

  const selectedDecks = getSelectedSrsDecks();
  selectedDecks.forEach((deck) => {
    selectedCards += deck.items.length;
    const unlockInfo = getSrsDeckUnlockInfo(deck);
    if (!unlockInfo.unlocked) {
      return;
    }
    unlockedSelectedDecks += 1;
    unlockedSelectedCards += deck.items.length;
    deck.items.forEach((card) => {
      const cardState = state.srsData.cardStates[card.id];
      if (!cardState) {
        newTotal += 1;
        return;
      }
      if (Number(cardState.dueAt) <= now) {
        dueNow += 1;
      }
    });
  });

  const newRemaining = Math.max(0, SRS_DAILY_NEW_LIMIT - state.srsData.daily.newCount);
  const newAvailable = Math.min(newTotal, newRemaining);

  return {
    dueNow,
    newTotal,
    newRemaining,
    newAvailable,
    queueCount: dueNow + newAvailable,
    selectedDecks: selectedDecks.length,
    selectedCards,
    unlockedSelectedDecks,
    unlockedSelectedCards,
  };
}

function shuffleInPlace(items) {
  for (let index = items.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
  }
}

function buildSrsSessionQueue() {
  const queue = [];
  const dueCards = [];
  const newCards = [];
  const now = Date.now();
  const newRemaining = Math.max(0, SRS_DAILY_NEW_LIMIT - state.srsData.daily.newCount);

  getSelectedUnlockedSrsDecks().forEach((deck) => {
    deck.items.forEach((card) => {
      const cardState = state.srsData.cardStates[card.id];
      if (cardState) {
        if (Number(cardState.dueAt) <= now) {
          dueCards.push({
            cardId: card.id,
            isNew: false,
            dueAt: Number(cardState.dueAt) || now,
          });
        }
        return;
      }
      newCards.push({
        cardId: card.id,
        isNew: true,
        dueAt: now,
      });
    });
  });

  dueCards.sort((left, right) => left.dueAt - right.dueAt);
  shuffleInPlace(newCards);

  queue.push(...dueCards);
  queue.push(...newCards.slice(0, newRemaining));
  return queue;
}

function setSrsGradeButtonsEnabled(enabled) {
  [srsGradeAgainButton, srsGradeHardButton, srsGradeGoodButton, srsGradeEasyButton].forEach(
    (button) => {
      button.disabled = !enabled;
    },
  );
}

function updateSrsReviewMeta() {
  const dueRemaining = state.srsQueue.reduce(
    (count, entry) => count + (entry.isNew ? 0 : 1),
    0,
  );
  const newRemaining = state.srsQueue.length - dueRemaining;
  srsReviewMeta.textContent = `${state.srsQueue.length} left (${dueRemaining} due, ${newRemaining} new)`;

  if (state.srsSessionReviewed === 0) {
    srsSessionSummary.textContent = "Session: 0 reviewed";
    return;
  }
  const accuracy = calculatePercent(state.srsSessionCorrect, state.srsSessionReviewed);
  srsSessionSummary.textContent = `Session: ${state.srsSessionReviewed} reviewed • ${accuracy}% accurate`;
}

function renderSrsCurrentCard() {
  updateSrsReviewMeta();
  const queueItem = state.srsQueue[0] || null;
  state.srsCurrentCard = queueItem;
  state.srsCurrentSubmitted = false;
  state.srsCurrentCorrect = false;
  state.srsCurrentRecommendedGrade = "good";
  setSrsGradeButtonsEnabled(false);

  srsAnswerInput.value = "";
  srsFeedback.className = "feedback";
  srsFeedback.textContent = "";
  srsRevealAnswer.hidden = true;
  srsRevealAnswer.textContent = "";

  if (!queueItem) {
    srsDeckLabel.textContent = "Queue complete";
    srsPrompt.textContent =
      state.srsSessionReviewed > 0
        ? "Session complete. Come back when more cards are due."
        : "No cards due right now. Add decks or return later.";
    srsAnswerInput.disabled = true;
    srsFeedback.className = "feedback ok";
    srsFeedback.textContent = "No review cards available.";
    renderSrsHubTile();
    return;
  }

  const card = state.srsCardMap.get(queueItem.cardId);
  if (!card) {
    state.srsQueue.shift();
    renderSrsCurrentCard();
    return;
  }

  srsDeckLabel.textContent = `${card.trackLabel} • ${card.deckTitle}`;
  srsPrompt.textContent = card.prompt;
  srsAnswerInput.disabled = false;
  srsAnswerInput.focus();
}

function renderSrsHubTile() {
  if (!srsHubMeta || !srsDueNow || !srsNewToday || !srsStartButton || !srsManageButton) {
    return;
  }
  if (!state.dataLoaded) {
    srsHubMeta.textContent = "Loading SRS deck catalog...";
    srsDueNow.textContent = "Due now: ...";
    srsNewToday.textContent = "New available: ...";
    srsStartButton.disabled = true;
    srsManageButton.disabled = true;
    return;
  }

  syncSrsDataToCatalog();
  const summary = getSrsQueueSummary();
  srsHubMeta.textContent = `${summary.unlockedSelectedDecks} unlocked decks selected • ${summary.unlockedSelectedCards} cards`;
  srsDueNow.textContent = `Due now: ${summary.dueNow}`;
  srsNewToday.textContent = `New available: ${summary.newAvailable}`;
  srsStartButton.disabled = summary.queueCount === 0;
  srsStartButton.textContent =
    summary.queueCount > 0 ? `Start Review (${summary.queueCount})` : "Start Review";
  srsManageButton.disabled = false;
}

function openSrsReview() {
  if (!state.dataLoaded) {
    setStatus("Load data first to start SRS.", true);
    return;
  }
  syncSrsDataToCatalog();
  state.srsQueue = buildSrsSessionQueue();
  state.srsSessionReviewed = 0;
  state.srsSessionCorrect = 0;
  showView(srsReviewView);
  clearStatus();
  renderSrsCurrentCard();
}

function openSrsManageView() {
  if (!state.dataLoaded) {
    setStatus("Load data first to manage SRS decks.", true);
    return;
  }
  syncSrsDataToCatalog();
  renderSrsManageView();
  clearStatus();
  showView(srsManageView);
}

function ensureSrsCardState(cardId) {
  const existing = state.srsData.cardStates[cardId];
  if (existing) {
    return normalizeSrsCardState(existing);
  }
  return normalizeSrsCardState({
    ease: SRS_DEFAULT_EASE,
    intervalDays: 0,
    dueAt: Date.now(),
    reps: 0,
    lapses: 0,
    step: 0,
    seen: 0,
    lastGrade: "",
    lastReviewedAt: 0,
  });
}

function applySrsGrade(cardState, grade, now = Date.now()) {
  const next = normalizeSrsCardState(cardState);
  const firstStepMs = SRS_LEARNING_STEPS_MINUTES[0] * 60 * 1000;
  next.lastGrade = grade;
  next.lastReviewedAt = now;
  next.seen += 1;

  if (grade === "again") {
    next.reps = 0;
    next.lapses += 1;
    next.step = 0;
    next.intervalDays = 0;
    next.ease = Math.max(SRS_MIN_EASE, next.ease - 0.2);
    next.dueAt = now + firstStepMs;
    return next;
  }

  const inLearning = next.step >= 0 && next.step < SRS_LEARNING_STEPS_MINUTES.length;

  if (inLearning) {
    if (grade === "hard") {
      const stepIndex = Math.min(next.step + 1, SRS_LEARNING_STEPS_MINUTES.length - 1);
      next.step = stepIndex;
      next.intervalDays = 0;
      next.ease = Math.max(SRS_MIN_EASE, next.ease - 0.05);
      next.dueAt = now + SRS_LEARNING_STEPS_MINUTES[stepIndex] * 60 * 1000;
      return next;
    }

    if (grade === "easy") {
      next.step = -1;
      next.reps = Math.max(2, next.reps + 1);
      next.intervalDays = 4;
      next.ease = Math.min(SRS_MAX_EASE, next.ease + 0.15);
      next.dueAt = now + 4 * 24 * 60 * 60 * 1000;
      return next;
    }

    const nextStep = next.step + 1;
    if (nextStep < SRS_LEARNING_STEPS_MINUTES.length) {
      next.step = nextStep;
      next.intervalDays = 0;
      next.dueAt = now + SRS_LEARNING_STEPS_MINUTES[nextStep] * 60 * 1000;
      return next;
    }

    next.step = -1;
    next.reps = Math.max(1, next.reps + 1);
    next.intervalDays = 1;
    next.dueAt = now + 24 * 60 * 60 * 1000;
    return next;
  }

  const baseInterval = Math.max(1, next.intervalDays || 1);

  if (grade === "hard") {
    next.ease = Math.max(SRS_MIN_EASE, next.ease - 0.15);
    next.intervalDays = Math.max(1, Math.round(baseInterval * 1.2));
  } else if (grade === "easy") {
    next.ease = Math.min(SRS_MAX_EASE, next.ease + 0.15);
    next.reps += 1;
    next.intervalDays = Math.max(2, Math.round(baseInterval * next.ease * 1.3));
  } else {
    next.reps += 1;
    if (next.reps <= 1) {
      next.intervalDays = 1;
    } else if (next.reps === 2) {
      next.intervalDays = 3;
    } else {
      next.intervalDays = Math.max(1, Math.round(baseInterval * next.ease));
    }
  }

  next.step = -1;
  next.dueAt = now + next.intervalDays * 24 * 60 * 60 * 1000;
  return next;
}

function gradeCurrentSrsCard(grade) {
  if (!state.srsCurrentCard || !state.srsCurrentSubmitted) {
    return;
  }

  const queueItem = state.srsCurrentCard;
  const cardId = queueItem.cardId;
  if (!state.srsCardMap.has(cardId)) {
    state.srsQueue.shift();
    renderSrsCurrentCard();
    return;
  }

  const wasNewCard = !state.srsData.cardStates[cardId];
  resetSrsDailyCounterIfNeeded();

  const baseState = ensureSrsCardState(cardId);
  const nextState = applySrsGrade(baseState, grade);
  state.srsData.cardStates[cardId] = nextState;

  if (wasNewCard) {
    state.srsData.daily.newCount += 1;
  }

  state.srsData.stats.reviews += 1;
  if (state.srsCurrentCorrect) {
    state.srsData.stats.correct += 1;
  }

  state.srsSessionReviewed += 1;
  if (state.srsCurrentCorrect) {
    state.srsSessionCorrect += 1;
  }

  state.srsQueue.shift();
  saveSrsData();
  markGamificationActivity("srs-review");
  renderAchievementsPanel();
  renderSrsCurrentCard();
  renderSrsHubTile();
}

function attemptSrsAnswer(rawValue, strict = false) {
  if (!state.srsCurrentCard) {
    return;
  }

  if (state.srsCurrentSubmitted) {
    if (strict) {
      gradeCurrentSrsCard(state.srsCurrentRecommendedGrade);
    }
    return;
  }

  const card = state.srsCardMap.get(state.srsCurrentCard.cardId);
  if (!card) {
    state.srsQueue.shift();
    renderSrsCurrentCard();
    return;
  }

  const key = normalize(rawValue);
  if (!key) {
    if (strict) {
      srsFeedback.className = "feedback";
      srsFeedback.textContent = "";
    }
    return;
  }

  const wasCorrect = card.normalizedAnswers.includes(key);
  state.srsCurrentSubmitted = true;
  state.srsCurrentCorrect = wasCorrect;
  state.srsCurrentRecommendedGrade = wasCorrect ? "good" : "again";

  srsAnswerInput.disabled = true;
  srsRevealAnswer.hidden = false;
  srsRevealAnswer.textContent = `Answer: ${card.displayAnswer}`;
  setSrsGradeButtonsEnabled(true);

  if (wasCorrect) {
    srsFeedback.className = "feedback ok";
    srsFeedback.textContent = "Correct. Choose a grade.";
  } else {
    srsFeedback.className = "feedback bad";
    srsFeedback.textContent = "Incorrect. Choose a grade.";
  }
}

function setSrsDeckSelected(deckId, selected) {
  if (!state.srsData) {
    state.srsData = createEmptySrsData();
  }
  if (selected) {
    state.srsData.selectedDecks[deckId] = true;
  } else {
    delete state.srsData.selectedDecks[deckId];
  }
  saveSrsData();
}

function renderSrsManageView() {
  if (!srsManageDeckList || !srsManageSummary) {
    return;
  }

  syncSrsDataToCatalog();
  const summary = getSrsQueueSummary();
  srsManageSummary.textContent =
    `Selected: ${summary.selectedDecks} decks (${summary.selectedCards} cards) • ` +
    `Unlocked selected: ${summary.unlockedSelectedDecks} decks (${summary.unlockedSelectedCards} cards) • ` +
    `Daily new limit: ${SRS_DAILY_NEW_LIMIT}`;

  srsManageDeckList.innerHTML = "";

  const trackOrder = TRACK_UNLOCK_TIERS.flat();
  trackOrder.forEach((moduleType) => {
    const decks = state.srsDeckCatalog.filter((deck) => deck.moduleType === moduleType);
    if (!decks.length) {
      return;
    }

    const trackUnlock = getTrackUnlockInfo(moduleType);
    const selectedCount = decks.filter((deck) => state.srsData.selectedDecks[deck.id]).length;
    const selectedCards = decks.reduce((total, deck) => {
      if (state.srsData.selectedDecks[deck.id]) {
        return total + deck.itemCount;
      }
      return total;
    }, 0);

    const section = document.createElement("section");
    section.className = "srs-track-group";

    const header = document.createElement("div");
    header.className = "srs-track-header";

    const titleWrap = document.createElement("div");
    const title = document.createElement("h3");
    title.className = "srs-track-title";
    title.textContent = getModuleTitleByType(moduleType);
    const meta = document.createElement("p");
    meta.className = "srs-track-meta";
    meta.textContent = `${selectedCount}/${decks.length} decks selected • ${selectedCards} cards`;
    titleWrap.append(title, meta);

    const controls = document.createElement("div");
    controls.className = "srs-track-controls";
    const selectAllButton = document.createElement("button");
    selectAllButton.type = "button";
    selectAllButton.className = "ghost-button srs-mini-btn";
    selectAllButton.textContent = "Select all";
    selectAllButton.disabled = !trackUnlock.unlocked;
    selectAllButton.addEventListener("click", () => {
      decks.forEach((deck) => {
        const unlockInfo = getSrsDeckUnlockInfo(deck);
        if (unlockInfo.unlocked) {
          setSrsDeckSelected(deck.id, true);
        }
      });
      renderSrsManageView();
      renderSrsHubTile();
    });

    const clearButton = document.createElement("button");
    clearButton.type = "button";
    clearButton.className = "ghost-button srs-mini-btn";
    clearButton.textContent = "Clear";
    clearButton.addEventListener("click", () => {
      decks.forEach((deck) => {
        setSrsDeckSelected(deck.id, false);
      });
      renderSrsManageView();
      renderSrsHubTile();
    });
    controls.append(selectAllButton, clearButton);

    header.append(titleWrap, controls);
    section.appendChild(header);

    if (!trackUnlock.unlocked) {
      const lockText = document.createElement("p");
      lockText.className = "srs-track-lock";
      lockText.textContent = trackUnlock.message;
      section.appendChild(lockText);
    }

    const deckList = document.createElement("div");
    deckList.className = "srs-deck-list";

    decks.forEach((deck) => {
      const unlockInfo = getSrsDeckUnlockInfo(deck);
      const row = document.createElement("label");
      row.className = `srs-deck-option ${unlockInfo.unlocked ? "unlocked" : "locked"}`;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = Boolean(state.srsData.selectedDecks[deck.id]);
      checkbox.disabled = !unlockInfo.unlocked;
      checkbox.addEventListener("change", (event) => {
        setSrsDeckSelected(deck.id, event.target.checked);
        renderSrsManageView();
        renderSrsHubTile();
      });

      const name = document.createElement("span");
      name.className = "srs-deck-name";
      name.textContent = deck.title;

      const meta = document.createElement("span");
      meta.className = "srs-deck-meta";
      meta.textContent = unlockInfo.unlocked ? `${deck.itemCount} cards` : "Locked";

      row.append(checkbox, name, meta);
      if (!unlockInfo.unlocked) {
        row.title = unlockInfo.message;
      }
      deckList.appendChild(row);
    });

    section.appendChild(deckList);
    srsManageDeckList.appendChild(section);
  });
}

function buildAnswerLookup(items, answerSelector) {
  const lookup = new Map();
  items.forEach((item, index) => {
    const answers = answerSelector(item);
    answers.forEach((answer) => {
      const key = normalize(answer);
      if (!key) {
        return;
      }
      if (!lookup.has(key)) {
        lookup.set(key, []);
      }
      lookup.get(key).push(index);
    });
  });
  return lookup;
}

function buildDiscourseGroups(rawData) {
  const languagePrefix = getCurrentLanguage() === "es" ? "" : `${getCurrentLanguage()}-`;
  return DISCOURSE_GROUPS.map((group) => {
    const rows = Array.isArray(rawData?.[group.key]) ? rawData[group.key] : [];
    const items = rows.map((row, index) => ({
      hint: row.en || "",
      answer: row.it || row.es || row.target || "",
      answers: [row.it || row.es || row.target || ""],
      index: index + 1,
    }));
    return {
      id: `${languagePrefix}${group.id}`,
      title: group.title,
      count: items.length,
      items,
    };
  });
}

function buildConversionGroups(rawData) {
  const groups = Array.isArray(rawData?.groups) ? rawData.groups : [];
  return groups.map((group) => ({
    id: group.id,
    title: group.title,
    description: group.description || "",
    source: group.source || "",
    count: Number(group.count) || 0,
    items: Array.isArray(group.items)
      ? group.items.map((item, index) => ({
          hint: item.hint || "",
          answer: item.answer || "",
          answers: Array.isArray(item.answers) && item.answers.length ? item.answers : [item.answer || ""],
          imperfect: Boolean(item.imperfect),
          index: index + 1,
        }))
      : [],
  }));
}

function buildGrammarGroups(rawData) {
  const groups = Array.isArray(rawData?.groups) ? rawData.groups : [];
  return groups.map((group) => ({
    id: group.id,
    title: group.title,
    description: group.description || "",
    source: group.source || "",
    count: Number(group.count) || 0,
    items: Array.isArray(group.items)
      ? group.items.map((item, index) => ({
          hint: item.hint || "",
          answer: item.answer || "",
          answers: Array.isArray(item.answers) && item.answers.length ? item.answers : [item.answer || ""],
          imperfect: Boolean(item.imperfect),
          index: index + 1,
        }))
      : [],
  }));
}

function buildSlangGroups(rawData) {
  const groups = Array.isArray(rawData?.groups) ? rawData.groups : [];
  return groups.map((group) => ({
    id: group.id,
    title: group.title,
    description: group.description || "",
    source: group.source || "",
    count: Number(group.count) || 0,
    items: Array.isArray(group.items)
      ? group.items.map((item, index) => ({
          hint: item.hint || "",
          answer: item.answer || "",
          answers: Array.isArray(item.answers) && item.answers.length ? item.answers : [item.answer || ""],
          index: index + 1,
        }))
      : [],
  }));
}

function buildStories(rawData) {
  const parseStoryParagraphs = (rawStory) => {
    if (Array.isArray(rawStory)) {
      return rawStory.map((paragraph) => String(paragraph).trim()).filter(Boolean);
    }
    if (typeof rawStory === "string") {
      return rawStory
        .split(/\n\s*\n/g)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);
    }
    return [];
  };

  const rows = Array.isArray(rawData?.stories) ? rawData.stories : [];
  return rows
    .map((story, index) => ({
      id: story.id ?? `story-${index + 1}`,
      title: story.title || `${getTargetLanguageName()} Story ${index + 1}`,
      level: story.level || story.target_cefr || "A1",
      unlockPercent:
        Number(story.unlockPercent) || STORY_UNLOCK_THRESHOLDS[index] || 100,
      paragraphs: parseStoryParagraphs(story.text ?? story.story),
    }))
    .sort((a, b) => a.unlockPercent - b.unlockPercent);
}

function renderStoriesGrid() {
  storiesGrid.innerHTML = "";
  const studyProgress = getOverallStudyProgress();
  const roundedPercent = Math.round(studyProgress.percent);
  storiesUnlockMeta.textContent = state.adminMode
    ? `Study progress: ${roundedPercent}% • Admin mode: ON`
    : `Study progress: ${roundedPercent}%`;

  state.stories.forEach((story, index) => {
    const naturallyUnlocked = studyProgress.percent >= story.unlockPercent;
    const unlocked = isStoryUnlocked(story, studyProgress);
    const card = document.createElement("button");
    card.type = "button";
    card.className = `training-tile story-card ${unlocked ? "unlocked" : "locked"}`;
    card.style.setProperty("--stagger", index.toString());
    card.disabled = !unlocked;
    const statusText = unlocked
      ? naturallyUnlocked
        ? "Available now"
        : "Unlocked (admin mode)"
      : `Unlocks at ${story.unlockPercent}%`;
    card.title = unlocked
      ? naturallyUnlocked
        ? "Open this story"
        : "Unlocked by admin mode"
      : `Unlocks when overall study progress reaches ${story.unlockPercent}%`;
    card.innerHTML = `
      <span class="tile-title">${story.title}</span>
      <span class="tile-subtitle">Level ${story.level}</span>
      <span class="story-status">${statusText}</span>
    `;
    card.addEventListener("click", () => {
      openStory(story.id);
    });
    storiesGrid.appendChild(card);
  });
}

function renderVerbGrid(items) {
  verbGrid.innerHTML = "";
  if (items.length === 0) {
    const empty = document.createElement("p");
    empty.className = "meta";
    empty.textContent = "No verbs match that filter.";
    verbGrid.appendChild(empty);
    return;
  }

  items.forEach((verb, index) => {
    const best = getVerbBestScore(verb, state.activeVerbTrack);
    const percent = calculatePercent(best, verb.formCount);
    const unlockInfo = getVerbUnlockInfo(verb.infinitive, state.activeVerbTrack);

    const card = document.createElement("button");
    card.type = "button";
    card.className = "verb-card";
    card.style.setProperty("--stagger", index.toString());
    card.disabled = !unlockInfo.unlocked;
    card.title = unlockInfo.unlocked ? `Open ${verb.infinitive}` : unlockInfo.message;
    card.innerHTML = `
      <span class="verb">${verb.infinitive}</span>
      <span class="translation">${verb.translation || ""}</span>
      <span class="count">${verb.formCount} forms</span>
      ${unlockInfo.unlocked ? "" : `<span class="tile-lock-text">${unlockInfo.message}</span>`}
      <span class="best">Best: ${formatScore(best, verb.formCount)}</span>
      <div class="mini-progress-track">
        <div class="mini-progress-fill" style="width:${percent}%"></div>
      </div>
    `;
    card.addEventListener("click", () => openVerbQuiz(verb.infinitive));
    verbGrid.appendChild(card);
  });
}

function filterAndRenderVerbs() {
  const filterValue = normalize(verbSearch.value);
  const filtered = getActiveVerbList(state.activeVerbTrack).filter((verb) =>
    normalize(verb.infinitive).includes(filterValue),
  );
  verbCount.textContent = `${filtered.length} verbs`;
  renderVerbGrid(filtered);
}

function renderVerbForms(forms) {
  formsList.innerHTML = "";
  forms.forEach((form, index) => {
    const row = document.createElement("li");
    row.className = "form-row";
    row.dataset.index = index.toString();
    row.innerHTML = `
      <span class="form-label">${form.label}</span>
      <span class="form-answer">${placeholder(form.answer)}</span>
    `;
    formsList.appendChild(row);
  });
}

function updateVerbQuizMeta() {
  if (!state.currentVerb) {
    quizMeta.textContent = "";
    return;
  }
  const total = state.currentVerb.formCount;
  const best = getVerbBestScore(state.currentVerb, state.activeVerbTrack);
  const timerMeta = state.quizEnded ? "" : ` • ${getQuizTimerText()}`;
  quizMeta.textContent = `${total} total forms • Best: ${formatScore(best, total)}${timerMeta}`;
}

function updateVerbProgress() {
  const total = state.currentVerb.forms.length;
  const found = state.foundIndexes.size;
  const percent = total === 0 ? 0 : Math.round((found / total) * 100);

  progressText.textContent = `${found}/${total} correct`;
  progressFill.style.width = `${percent}%`;

  if (found === total && !state.quizEnded) {
    endVerbQuiz("completed");
  }
}

function markVerbMatches(indices) {
  let added = 0;
  indices.forEach((index) => {
    if (state.foundIndexes.has(index)) {
      return;
    }
    state.foundIndexes.add(index);
    added += 1;

    const row = formsList.querySelector(`[data-index="${index}"]`);
    if (!row) {
      return;
    }
    row.classList.add("found");
    row.querySelector(".form-answer").textContent =
      state.currentVerb.forms[index].answer;
  });
  return added;
}

function revealAllVerbAnswers() {
  state.currentVerb.forms.forEach((form, index) => {
    const row = formsList.querySelector(`[data-index="${index}"]`);
    if (!row) {
      return;
    }
    if (!state.foundIndexes.has(index)) {
      row.classList.add("revealed");
    }
    row.querySelector(".form-answer").textContent = form.answer;
  });
}

function endVerbQuiz(reason) {
  if (!state.currentVerb || state.quizEnded) {
    return;
  }

  state.quizEnded = true;
  stopQuizTimer();
  const total = state.currentVerb.forms.length;
  const score = state.foundIndexes.size;
  const changed = recordBestScore(
    "verbs",
    verbScoreKey(state.currentVerb.infinitive, state.activeVerbTrack),
    score,
    total,
  );
  updateVerbQuizMeta();

  if (reason === "gave-up") {
    revealAllVerbAnswers();
    feedback.className = "feedback bad";
    feedback.textContent = `Gave up. Final score: ${formatScore(score, total)}.`;
  } else if (reason === "time-up") {
    revealAllVerbAnswers();
    feedback.className = "feedback bad";
    feedback.textContent = `Time is up. Final score: ${formatScore(score, total)}.`;
  } else if (reason === "completed") {
    feedback.className = "feedback ok";
    feedback.textContent = `All conjugations completed. Final score: ${formatScore(score, total)}.`;
  }

  answerInput.disabled = true;
  setQuizActionButton(giveUpButton, true);

  if (changed) {
    refreshProgressViews();
  }
}

function attemptVerbAnswer(rawValue, strict = false) {
  if (state.quizEnded) {
    return;
  }

  const key = normalize(rawValue);
  if (!key) {
    if (strict) {
      feedback.className = "feedback";
      feedback.textContent = "";
    }
    return;
  }

  const matches = state.answerLookup.get(key);
  const statsTrack = state.activeVerbTrack === "additional" ? "kofi-additional" : "kofi";
  if (!matches) {
    if (strict) {
      feedback.className = "feedback bad";
      feedback.textContent = "Not a match yet.";
      recordAttemptStat(statsTrack, false, rawValue);
    }
    return;
  }

  const added = markVerbMatches(matches);
  if (added > 0) {
    feedback.className = "feedback ok";
    feedback.textContent = `✓ ${state.currentVerb.forms[matches[0]].answer}`;
    answerInput.value = "";
    updateVerbProgress();
    if (strict) {
      recordAttemptStat(statsTrack, true, rawValue);
    }
  }
}

function openVerbQuiz(infinitive) {
  const verbs = getActiveVerbList(state.activeVerbTrack);
  const verb = verbs.find((item) => item.infinitive === infinitive);
  if (!verb) {
    return;
  }
  const unlockInfo = getVerbUnlockInfo(infinitive, state.activeVerbTrack);
  if (!unlockInfo.unlocked) {
    setStatus(unlockInfo.message, true);
    return;
  }

  state.currentVerb = verb;
  state.foundIndexes = new Set();
  state.answerLookup = buildAnswerLookup(verb.forms, (form) => [form.answer]);
  state.quizEnded = false;

  quizVerbTitle.textContent = verb.infinitive;
  startQuizTimer({
    onTick: () => {
      updateVerbQuizMeta();
    },
    onExpire: () => {
      if (!state.quizEnded) {
        endVerbQuiz("time-up");
      }
    },
  });
  updateVerbQuizMeta();
  feedback.className = "feedback";
  feedback.textContent = "";
  answerInput.value = "";
  answerInput.disabled = false;
  setQuizActionButton(giveUpButton, false);

  renderVerbForms(verb.forms);
  updateVerbProgress();

  showView(quizView);
  clearStatus();
  answerInput.focus();
}

function returnToVerbDashboard() {
  stopQuizTimer();
  if (state.currentVerb && !state.quizEnded) {
    const changed = recordBestScore(
      "verbs",
      verbScoreKey(state.currentVerb.infinitive, state.activeVerbTrack),
      state.foundIndexes.size,
      state.currentVerb.forms.length,
    );
    if (changed) {
      refreshProgressViews();
    }
  }

  state.currentVerb = null;
  state.foundIndexes = new Set();
  state.answerLookup = new Map();
  state.quizEnded = false;
  feedback.className = "feedback";
  feedback.textContent = "";
  answerInput.disabled = false;
  setQuizActionButton(giveUpButton, false);

  openVerbDashboard(state.activeVerbTrack);
}

function addEnglishArticle(hint) {
  const cleaned = hint.trim();
  if (!cleaned) {
    return "the";
  }
  if (cleaned.toLowerCase().startsWith("the ")) {
    return cleaned;
  }
  return `the ${cleaned}`;
}

function pluralizeSpanishWord(word) {
  const lower = word.toLowerCase();
  if (lower.endsWith("z")) {
    return `${word.slice(0, -1)}ces`;
  }
  if (/[sx]$/i.test(word)) {
    if (/[áéíóú]/i.test(word)) {
      return `${word}es`;
    }
    return word;
  }
  if (/[aeiouáéó]$/i.test(word)) {
    return `${word}s`;
  }
  if (/[íú]$/i.test(word)) {
    return `${word}es`;
  }
  return `${word}es`;
}

function pluralizeNounPhrase(nounPhrase) {
  const parts = nounPhrase.split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return nounPhrase;
  }
  parts[0] = pluralizeSpanishWord(parts[0]);
  return parts.join(" ");
}

function pluralizeAnswerWithArticle(answer) {
  const parts = answer.split(/\s+/).filter(Boolean);
  if (parts.length < 2) {
    return answer;
  }

  const article = parts[0].toLowerCase();
  const pluralArticle = article === "el" ? "los" : article === "la" ? "las" : parts[0];
  const noun = parts.slice(1).join(" ");
  const pluralNoun = pluralizeNounPhrase(noun);
  return `${pluralArticle} ${pluralNoun}`;
}

function getPluralAnswersFromItem(item, singularAnswers) {
  if (Array.isArray(item?.pluralAnswers) && item.pluralAnswers.length > 0) {
    return [...new Set(item.pluralAnswers.filter(Boolean).map((entry) => String(entry).trim()))];
  }
  return [...new Set((singularAnswers || []).map(pluralizeAnswerWithArticle))];
}

function makeNounQuizItem(item) {
  const singularAnswers = item.answers && item.answers.length ? item.answers : [item.answer];
  const singularUnique = [...new Set(singularAnswers)];
  const baseHint = addEnglishArticle(item.hint);

  if (state.nounMode === "plural") {
    const pluralAnswers = getPluralAnswersFromItem(item, singularUnique);
    return {
      hint: `${baseHint} (plural)`,
      displayAnswer: pluralAnswers[0],
      answers: pluralAnswers,
    };
  }

  return {
    hint: baseHint,
    displayAnswer: singularUnique[0],
    answers: singularUnique,
  };
}

function updateNounsAnswerPrompt() {
  const target = getTargetLanguageAdjective();
  const examples =
    getCurrentLanguage() === "it"
      ? { singular: "Example: il libro", plural: "Example: i libri" }
      : { singular: "Example: el libro", plural: "Example: los libros" };
  if (state.nounMode === "plural") {
    nounsAnswerLabel.textContent = `Type ${target} noun with article (plural)`;
    nounsAnswerInput.placeholder = examples.plural;
  } else {
    nounsAnswerLabel.textContent = `Type ${target} noun with article (singular)`;
    nounsAnswerInput.placeholder = examples.singular;
  }
}

function renderNounsDeckGrid() {
  nounsDeckGrid.innerHTML = "";
  const decks = getActiveNounDecks(state.activeNounTrack);
  nounsDeckCount.textContent = `${decks.length} decks`;
  nounModeToggle.checked = state.nounMode === "plural";

  decks.forEach((deck, index) => {
    const best = getNounBestScore(deck, state.nounMode);
    const percent = calculatePercent(best, deck.count);
    const unlockInfo = getNounDeckUnlockInfo(deck.id, state.activeNounTrack);

    const card = document.createElement("button");
    card.type = "button";
    card.className = "training-tile noun-deck-card";
    card.style.setProperty("--stagger", index.toString());
    card.disabled = !unlockInfo.unlocked;
    card.title = unlockInfo.unlocked ? `Open ${deck.title}` : unlockInfo.message;
    card.innerHTML = `
      <span class="tile-title">${deck.title}</span>
      <span class="tile-subtitle">${deck.count} nouns</span>
      ${unlockInfo.unlocked ? "" : `<span class="tile-lock-text">${unlockInfo.message}</span>`}
      <span class="best deck-best">Best: ${formatScore(best, deck.count)}</span>
      <div class="mini-progress-track">
        <div class="mini-progress-fill" style="width:${percent}%"></div>
      </div>
    `;
    card.addEventListener("click", () => openNounQuiz(deck.id));
    nounsDeckGrid.appendChild(card);
  });
}

function renderNounsQuizItems(items) {
  nounsList.innerHTML = "";
  items.forEach((item, index) => {
    const row = document.createElement("li");
    row.className = "form-row";
    row.dataset.index = index.toString();
    row.innerHTML = `
      <span class="form-label">${item.hint}</span>
      <span class="form-answer">${placeholder(item.displayAnswer)}</span>
    `;
    nounsList.appendChild(row);
  });
}

function updateNounsQuizMeta() {
  if (!state.currentNounDeck) {
    nounsQuizMeta.textContent = "";
    return;
  }
  const total = state.currentNounDeck.count;
  const best = getNounBestScore(state.currentNounDeck, state.nounMode);
  const timerMeta = state.nounQuizEnded ? "" : ` • ${getQuizTimerText()}`;
  nounsQuizMeta.textContent = `${total} nouns • ${state.nounMode} mode • Best: ${formatScore(best, total)}${timerMeta}`;
}

function updateNounProgress() {
  const total = state.currentNounItems.length;
  const found = state.nounFoundIndexes.size;
  const percent = total === 0 ? 0 : Math.round((found / total) * 100);

  nounsProgressText.textContent = `${found}/${total} correct`;
  nounsProgressFill.style.width = `${percent}%`;

  if (found === total && !state.nounQuizEnded) {
    endNounQuiz("completed");
  }
}

function markNounMatches(indices) {
  let added = 0;
  indices.forEach((index) => {
    if (state.nounFoundIndexes.has(index)) {
      return;
    }
    state.nounFoundIndexes.add(index);
    added += 1;

    const row = nounsList.querySelector(`[data-index="${index}"]`);
    if (!row) {
      return;
    }
    row.classList.add("found");
    row.querySelector(".form-answer").textContent = state.currentNounItems[index].displayAnswer;
  });
  return added;
}

function revealAllNounAnswers() {
  state.currentNounItems.forEach((item, index) => {
    const row = nounsList.querySelector(`[data-index="${index}"]`);
    if (!row) {
      return;
    }
    if (!state.nounFoundIndexes.has(index)) {
      row.classList.add("revealed");
    }
    row.querySelector(".form-answer").textContent = item.displayAnswer;
  });
}

function endNounQuiz(reason) {
  if (!state.currentNounDeck || state.nounQuizEnded) {
    return;
  }

  state.nounQuizEnded = true;
  stopQuizTimer();
  const total = state.currentNounItems.length;
  const score = state.nounFoundIndexes.size;
  const changed = recordBestScore(
    "nouns",
    nounScoreKey(state.currentNounDeck.id),
    score,
    total,
  );
  updateNounsQuizMeta();

  if (reason === "gave-up") {
    revealAllNounAnswers();
    nounsFeedback.className = "feedback bad";
    nounsFeedback.textContent = `Gave up. Final score: ${formatScore(score, total)}.`;
  } else if (reason === "time-up") {
    revealAllNounAnswers();
    nounsFeedback.className = "feedback bad";
    nounsFeedback.textContent = `Time is up. Final score: ${formatScore(score, total)}.`;
  } else if (reason === "completed") {
    nounsFeedback.className = "feedback ok";
    nounsFeedback.textContent = `Deck completed. Final score: ${formatScore(score, total)}.`;
  }

  nounsAnswerInput.disabled = true;
  setQuizActionButton(nounsGiveUpButton, true);

  if (changed) {
    refreshProgressViews();
  }
}

function attemptNounAnswer(rawValue, strict = false) {
  if (state.nounQuizEnded) {
    return;
  }

  const key = normalize(rawValue);
  if (!key) {
    if (strict) {
      nounsFeedback.className = "feedback";
      nounsFeedback.textContent = "";
    }
    return;
  }

  const matches = state.nounAnswerLookup.get(key);
  const statsTrack = state.activeNounTrack === "advanced" ? "nouns-advanced" : "nouns";
  if (!matches) {
    if (strict) {
      nounsFeedback.className = "feedback bad";
      nounsFeedback.textContent = "Not a match yet.";
      recordAttemptStat(statsTrack, false, rawValue);
    }
    return;
  }

  const added = markNounMatches(matches);
  if (added > 0) {
    nounsFeedback.className = "feedback ok";
    nounsFeedback.textContent = `✓ ${state.currentNounItems[matches[0]].displayAnswer}`;
    nounsAnswerInput.value = "";
    updateNounProgress();
    if (strict) {
      recordAttemptStat(statsTrack, true, rawValue);
    }
  }
}

function openNounQuiz(deckId) {
  const decks = getActiveNounDecks(state.activeNounTrack);
  const deck = decks.find((item) => item.id === deckId);
  if (!deck) {
    return;
  }
  const unlockInfo = getNounDeckUnlockInfo(deckId, state.activeNounTrack);
  if (!unlockInfo.unlocked) {
    setStatus(unlockInfo.message, true);
    return;
  }

  state.currentNounDeck = deck;
  state.currentNounItems = deck.items.map(makeNounQuizItem);
  state.nounFoundIndexes = new Set();
  state.nounAnswerLookup = buildAnswerLookup(state.currentNounItems, (item) => item.answers);
  state.nounQuizEnded = false;

  nounsQuizTitle.textContent = deck.title;
  startQuizTimer({
    onTick: () => {
      updateNounsQuizMeta();
    },
    onExpire: () => {
      if (!state.nounQuizEnded) {
        endNounQuiz("time-up");
      }
    },
  });
  updateNounsQuizMeta();
  updateNounsAnswerPrompt();
  nounsFeedback.className = "feedback";
  nounsFeedback.textContent = "";
  nounsAnswerInput.value = "";
  nounsAnswerInput.disabled = false;
  setQuizActionButton(nounsGiveUpButton, false);

  renderNounsQuizItems(state.currentNounItems);
  updateNounProgress();

  showView(nounsQuizView);
  clearStatus();
  nounsAnswerInput.focus();
}

function returnToNounsDashboard() {
  stopQuizTimer();
  if (state.currentNounDeck && !state.nounQuizEnded) {
    const changed = recordBestScore(
      "nouns",
      nounScoreKey(state.currentNounDeck.id),
      state.nounFoundIndexes.size,
      state.currentNounItems.length,
    );
    if (changed) {
      refreshProgressViews();
    }
  }

  state.currentNounDeck = null;
  state.currentNounItems = [];
  state.nounFoundIndexes = new Set();
  state.nounAnswerLookup = new Map();
  state.nounQuizEnded = false;
  nounsFeedback.className = "feedback";
  nounsFeedback.textContent = "";
  nounsAnswerInput.disabled = false;
  setQuizActionButton(nounsGiveUpButton, false);

  openNounsDashboard(state.activeNounTrack);
}

function makeBeginnerQuizItem(item) {
  const answers = item.answers && item.answers.length ? item.answers : [item.answer];
  const uniqueAnswers = [...new Set(answers)];
  return {
    hint: item.hint,
    displayAnswer: uniqueAnswers[0],
    answers: uniqueAnswers,
  };
}

function renderBeginnerDeckGrid() {
  beginnerDeckGrid.innerHTML = "";
  beginnerDeckCount.textContent = `${state.beginnerGroups.length} decks`;

  state.beginnerGroups.forEach((group, index) => {
    const best = getBeginnerBestScore(group);
    const percent = calculatePercent(best, group.count);
    const unlockInfo = getBeginnerDeckUnlockInfo(group.id);

    const card = document.createElement("button");
    card.type = "button";
    card.className = "training-tile beginner-deck-card";
    card.style.setProperty("--stagger", index.toString());
    card.disabled = !unlockInfo.unlocked;
    card.title = unlockInfo.unlocked ? `Open ${group.title}` : unlockInfo.message;
    card.innerHTML = `
      <span class="tile-title">${group.title}</span>
      <span class="tile-subtitle">${group.count} items</span>
      ${unlockInfo.unlocked ? "" : `<span class="tile-lock-text">${unlockInfo.message}</span>`}
      <span class="best deck-best">Best: ${formatScore(best, group.count)}</span>
      <div class="mini-progress-track">
        <div class="mini-progress-fill" style="width:${percent}%"></div>
      </div>
    `;
    card.addEventListener("click", () => openBeginnerQuiz(group.id));
    beginnerDeckGrid.appendChild(card);
  });
}

function renderBeginnerQuizItems(items) {
  beginnerList.innerHTML = "";
  items.forEach((item, index) => {
    const row = document.createElement("li");
    row.className = "form-row";
    row.dataset.index = index.toString();
    row.innerHTML = `
      <span class="form-label">${item.hint}</span>
      <span class="form-answer">${placeholder(item.displayAnswer)}</span>
    `;
    beginnerList.appendChild(row);
  });
}

function updateBeginnerQuizMeta() {
  if (!state.currentBeginnerGroup) {
    beginnerQuizMeta.textContent = "";
    return;
  }
  const total = state.currentBeginnerGroup.count;
  const best = getBeginnerBestScore(state.currentBeginnerGroup);
  const timerMeta = state.beginnerQuizEnded ? "" : ` • ${getQuizTimerText()}`;
  beginnerQuizMeta.textContent = `${total} items • Best: ${formatScore(best, total)}${timerMeta}`;
}

function updateBeginnerProgress() {
  const total = state.currentBeginnerItems.length;
  const found = state.beginnerFoundIndexes.size;
  const percent = total === 0 ? 0 : Math.round((found / total) * 100);

  beginnerProgressText.textContent = `${found}/${total} correct`;
  beginnerProgressFill.style.width = `${percent}%`;

  if (found === total && !state.beginnerQuizEnded) {
    endBeginnerQuiz("completed");
  }
}

function markBeginnerMatches(indices) {
  let added = 0;
  indices.forEach((index) => {
    if (state.beginnerFoundIndexes.has(index)) {
      return;
    }
    state.beginnerFoundIndexes.add(index);
    added += 1;

    const row = beginnerList.querySelector(`[data-index="${index}"]`);
    if (!row) {
      return;
    }
    row.classList.add("found");
    row.querySelector(".form-answer").textContent =
      state.currentBeginnerItems[index].displayAnswer;
  });
  return added;
}

function revealAllBeginnerAnswers() {
  state.currentBeginnerItems.forEach((item, index) => {
    const row = beginnerList.querySelector(`[data-index="${index}"]`);
    if (!row) {
      return;
    }
    if (!state.beginnerFoundIndexes.has(index)) {
      row.classList.add("revealed");
    }
    row.querySelector(".form-answer").textContent = item.displayAnswer;
  });
}

function endBeginnerQuiz(reason) {
  if (!state.currentBeginnerGroup || state.beginnerQuizEnded) {
    return;
  }

  state.beginnerQuizEnded = true;
  stopQuizTimer();
  const total = state.currentBeginnerItems.length;
  const score = state.beginnerFoundIndexes.size;
  const changed = recordBestScore("beginner", state.currentBeginnerGroup.id, score, total);
  updateBeginnerQuizMeta();

  if (reason === "gave-up") {
    revealAllBeginnerAnswers();
    beginnerFeedback.className = "feedback bad";
    beginnerFeedback.textContent = `Gave up. Final score: ${formatScore(score, total)}.`;
  } else if (reason === "time-up") {
    revealAllBeginnerAnswers();
    beginnerFeedback.className = "feedback bad";
    beginnerFeedback.textContent = `Time is up. Final score: ${formatScore(score, total)}.`;
  } else if (reason === "completed") {
    beginnerFeedback.className = "feedback ok";
    beginnerFeedback.textContent = `Deck completed. Final score: ${formatScore(score, total)}.`;
  }

  beginnerAnswerInput.disabled = true;
  setQuizActionButton(beginnerGiveUpButton, true);

  if (changed) {
    refreshProgressViews();
  }
}

function attemptBeginnerAnswer(rawValue, strict = false) {
  if (state.beginnerQuizEnded) {
    return;
  }

  const key = normalize(rawValue);
  if (!key) {
    if (strict) {
      beginnerFeedback.className = "feedback";
      beginnerFeedback.textContent = "";
    }
    return;
  }

  const matches = state.beginnerAnswerLookup.get(key);
  if (!matches) {
    if (strict) {
      beginnerFeedback.className = "feedback bad";
      beginnerFeedback.textContent = "Not a match yet.";
      recordAttemptStat("beginner", false, rawValue);
    }
    return;
  }

  const added = markBeginnerMatches(matches);
  if (added > 0) {
    beginnerFeedback.className = "feedback ok";
    beginnerFeedback.textContent = `✓ ${state.currentBeginnerItems[matches[0]].displayAnswer}`;
    beginnerAnswerInput.value = "";
    updateBeginnerProgress();
    if (strict) {
      recordAttemptStat("beginner", true, rawValue);
    }
  }
}

function openBeginnerQuiz(groupId) {
  const group = state.beginnerGroups.find((item) => item.id === groupId);
  if (!group) {
    return;
  }
  const unlockInfo = getBeginnerDeckUnlockInfo(groupId);
  if (!unlockInfo.unlocked) {
    setStatus(unlockInfo.message, true);
    return;
  }

  state.currentBeginnerGroup = group;
  state.currentBeginnerItems = group.items.map(makeBeginnerQuizItem);
  state.beginnerFoundIndexes = new Set();
  state.beginnerAnswerLookup = buildAnswerLookup(
    state.currentBeginnerItems,
    (item) => item.answers,
  );
  state.beginnerQuizEnded = false;

  beginnerQuizTitle.textContent = group.title;
  startQuizTimer({
    onTick: () => {
      updateBeginnerQuizMeta();
    },
    onExpire: () => {
      if (!state.beginnerQuizEnded) {
        endBeginnerQuiz("time-up");
      }
    },
  });
  updateBeginnerQuizMeta();
  beginnerAnswerLabel.textContent = `Type ${getTargetLanguageAdjective()} answer`;
  beginnerAnswerInput.placeholder = "Press Enter to submit...";
  beginnerFeedback.className = "feedback";
  beginnerFeedback.textContent = "";
  beginnerAnswerInput.value = "";
  beginnerAnswerInput.disabled = false;
  setQuizActionButton(beginnerGiveUpButton, false);

  renderBeginnerQuizItems(state.currentBeginnerItems);
  updateBeginnerProgress();

  showView(beginnerQuizView);
  clearStatus();
  beginnerAnswerInput.focus();
}

function returnToBeginnerDashboard() {
  stopQuizTimer();
  if (state.currentBeginnerGroup && !state.beginnerQuizEnded) {
    const changed = recordBestScore(
      "beginner",
      state.currentBeginnerGroup.id,
      state.beginnerFoundIndexes.size,
      state.currentBeginnerItems.length,
    );
    if (changed) {
      refreshProgressViews();
    }
  }

  state.currentBeginnerGroup = null;
  state.currentBeginnerItems = [];
  state.beginnerFoundIndexes = new Set();
  state.beginnerAnswerLookup = new Map();
  state.beginnerQuizEnded = false;
  beginnerFeedback.className = "feedback";
  beginnerFeedback.textContent = "";
  beginnerAnswerInput.disabled = false;
  setQuizActionButton(beginnerGiveUpButton, false);

  openBeginnerDashboard();
}

function expandDiscourseAnswerVariants(answer) {
  const variants = new Set([answer]);
  if (answer.includes("/a")) {
    variants.add(answer.replace("/a", "o"));
    variants.add(answer.replace("/a", "a"));
  }
  if (answer.includes("/o")) {
    variants.add(answer.replace("/o", "o"));
    variants.add(answer.replace("/o", "a"));
  }
  return [...variants];
}

function makeDiscourseQuizItem(item) {
  const sourceAnswers = item.answers && item.answers.length ? item.answers : [item.answer];
  const expanded = sourceAnswers.flatMap(expandDiscourseAnswerVariants);
  const uniqueAnswers = [...new Set(expanded)];
  return {
    hint: item.hint,
    displayAnswer: uniqueAnswers[0],
    answers: uniqueAnswers,
  };
}

function renderDiscourseDeckGrid() {
  discourseDeckGrid.innerHTML = "";
  discourseDeckCount.textContent = `${state.discourseGroups.length} decks`;

  state.discourseGroups.forEach((group, index) => {
    const best = getDiscourseBestScore(group);
    const percent = calculatePercent(best, group.count);
    const unlockInfo = getDiscourseDeckUnlockInfo(group.id);

    const card = document.createElement("button");
    card.type = "button";
    card.className = "training-tile discourse-deck-card";
    card.style.setProperty("--stagger", index.toString());
    card.disabled = !unlockInfo.unlocked;
    card.title = unlockInfo.unlocked ? `Open ${group.title}` : unlockInfo.message;
    card.innerHTML = `
      <span class="tile-title">${group.title}</span>
      <span class="tile-subtitle">${group.count} items</span>
      ${unlockInfo.unlocked ? "" : `<span class="tile-lock-text">${unlockInfo.message}</span>`}
      <span class="best deck-best">Best: ${formatScore(best, group.count)}</span>
      <div class="mini-progress-track">
        <div class="mini-progress-fill" style="width:${percent}%"></div>
      </div>
    `;
    card.addEventListener("click", () => openDiscourseQuiz(group.id));
    discourseDeckGrid.appendChild(card);
  });
}

function renderDiscourseQuizItems(items) {
  discourseList.innerHTML = "";
  items.forEach((item, index) => {
    const row = document.createElement("li");
    row.className = "form-row";
    row.dataset.index = index.toString();
    row.innerHTML = `
      <span class="form-label">${item.hint}</span>
      <span class="form-answer">${placeholder(item.displayAnswer)}</span>
    `;
    discourseList.appendChild(row);
  });
}

function updateDiscourseQuizMeta() {
  if (!state.currentDiscourseGroup) {
    discourseQuizMeta.textContent = "";
    return;
  }
  const total = state.currentDiscourseGroup.count;
  const best = getDiscourseBestScore(state.currentDiscourseGroup);
  const timerMeta = state.discourseQuizEnded ? "" : ` • ${getQuizTimerText()}`;
  discourseQuizMeta.textContent = `${total} items • Best: ${formatScore(best, total)}${timerMeta}`;
}

function updateDiscourseProgress() {
  const total = state.currentDiscourseItems.length;
  const found = state.discourseFoundIndexes.size;
  const percent = total === 0 ? 0 : Math.round((found / total) * 100);

  discourseProgressText.textContent = `${found}/${total} correct`;
  discourseProgressFill.style.width = `${percent}%`;

  if (found === total && !state.discourseQuizEnded) {
    endDiscourseQuiz("completed");
  }
}

function markDiscourseMatches(indices) {
  let added = 0;
  indices.forEach((index) => {
    if (state.discourseFoundIndexes.has(index)) {
      return;
    }
    state.discourseFoundIndexes.add(index);
    added += 1;

    const row = discourseList.querySelector(`[data-index="${index}"]`);
    if (!row) {
      return;
    }
    row.classList.add("found");
    row.querySelector(".form-answer").textContent =
      state.currentDiscourseItems[index].displayAnswer;
  });
  return added;
}

function revealAllDiscourseAnswers() {
  state.currentDiscourseItems.forEach((item, index) => {
    const row = discourseList.querySelector(`[data-index="${index}"]`);
    if (!row) {
      return;
    }
    if (!state.discourseFoundIndexes.has(index)) {
      row.classList.add("revealed");
    }
    row.querySelector(".form-answer").textContent = item.displayAnswer;
  });
}

function endDiscourseQuiz(reason) {
  if (!state.currentDiscourseGroup || state.discourseQuizEnded) {
    return;
  }

  state.discourseQuizEnded = true;
  stopQuizTimer();
  const total = state.currentDiscourseItems.length;
  const score = state.discourseFoundIndexes.size;
  const changed = recordBestScore("discourse", state.currentDiscourseGroup.id, score, total);
  updateDiscourseQuizMeta();

  if (reason === "gave-up") {
    revealAllDiscourseAnswers();
    discourseFeedback.className = "feedback bad";
    discourseFeedback.textContent = `Gave up. Final score: ${formatScore(score, total)}.`;
  } else if (reason === "time-up") {
    revealAllDiscourseAnswers();
    discourseFeedback.className = "feedback bad";
    discourseFeedback.textContent = `Time is up. Final score: ${formatScore(score, total)}.`;
  } else if (reason === "completed") {
    discourseFeedback.className = "feedback ok";
    discourseFeedback.textContent = `Deck completed. Final score: ${formatScore(score, total)}.`;
  }

  discourseAnswerInput.disabled = true;
  setQuizActionButton(discourseGiveUpButton, true);

  if (changed) {
    refreshProgressViews();
  }
}

function attemptDiscourseAnswer(rawValue, strict = false) {
  if (state.discourseQuizEnded) {
    return;
  }

  const key = normalize(rawValue);
  if (!key) {
    if (strict) {
      discourseFeedback.className = "feedback";
      discourseFeedback.textContent = "";
    }
    return;
  }

  const matches = state.discourseAnswerLookup.get(key);
  if (!matches) {
    if (strict) {
      discourseFeedback.className = "feedback bad";
      discourseFeedback.textContent = "Not a match yet.";
      recordAttemptStat("discourse", false, rawValue);
    }
    return;
  }

  const added = markDiscourseMatches(matches);
  if (added > 0) {
    discourseFeedback.className = "feedback ok";
    discourseFeedback.textContent = `✓ ${state.currentDiscourseItems[matches[0]].displayAnswer}`;
    discourseAnswerInput.value = "";
    updateDiscourseProgress();
    if (strict) {
      recordAttemptStat("discourse", true, rawValue);
    }
  }
}

function openDiscourseQuiz(groupId) {
  const group = state.discourseGroups.find((item) => item.id === groupId);
  if (!group) {
    return;
  }
  const unlockInfo = getDiscourseDeckUnlockInfo(groupId);
  if (!unlockInfo.unlocked) {
    setStatus(unlockInfo.message, true);
    return;
  }

  state.currentDiscourseGroup = group;
  state.currentDiscourseItems = group.items.map(makeDiscourseQuizItem);
  state.discourseFoundIndexes = new Set();
  state.discourseAnswerLookup = buildAnswerLookup(
    state.currentDiscourseItems,
    (item) => item.answers,
  );
  state.discourseQuizEnded = false;

  discourseQuizTitle.textContent = group.title;
  startQuizTimer({
    onTick: () => {
      updateDiscourseQuizMeta();
    },
    onExpire: () => {
      if (!state.discourseQuizEnded) {
        endDiscourseQuiz("time-up");
      }
    },
  });
  updateDiscourseQuizMeta();
  discourseAnswerLabel.textContent = `Type ${getTargetLanguageAdjective()} chunk`;
  discourseAnswerInput.placeholder = "Press Enter to submit...";
  discourseFeedback.className = "feedback";
  discourseFeedback.textContent = "";
  discourseAnswerInput.value = "";
  discourseAnswerInput.disabled = false;
  setQuizActionButton(discourseGiveUpButton, false);

  renderDiscourseQuizItems(state.currentDiscourseItems);
  updateDiscourseProgress();

  showView(discourseQuizView);
  clearStatus();
  discourseAnswerInput.focus();
}

function returnToDiscourseDashboard() {
  stopQuizTimer();
  if (state.currentDiscourseGroup && !state.discourseQuizEnded) {
    const changed = recordBestScore(
      "discourse",
      state.currentDiscourseGroup.id,
      state.discourseFoundIndexes.size,
      state.currentDiscourseItems.length,
    );
    if (changed) {
      refreshProgressViews();
    }
  }

  state.currentDiscourseGroup = null;
  state.currentDiscourseItems = [];
  state.discourseFoundIndexes = new Set();
  state.discourseAnswerLookup = new Map();
  state.discourseQuizEnded = false;
  discourseFeedback.className = "feedback";
  discourseFeedback.textContent = "";
  discourseAnswerInput.disabled = false;
  setQuizActionButton(discourseGiveUpButton, false);

  openDiscourseDashboard();
}

function makeConversionQuizItem(item) {
  const answers = item.answers && item.answers.length ? item.answers : [item.answer];
  const uniqueAnswers = [...new Set(answers)];
  return {
    hint: item.imperfect ? `${item.hint} *` : item.hint,
    displayAnswer: uniqueAnswers[0],
    answers: uniqueAnswers,
    imperfect: item.imperfect,
  };
}

function renderConversionDeckGrid() {
  conversionDeckGrid.innerHTML = "";
  conversionDeckCount.textContent = `${state.conversionGroups.length} decks`;

  state.conversionGroups.forEach((group, index) => {
    const best = getConversionBestScore(group);
    const percent = calculatePercent(best, group.count);
    const unlockInfo = getConversionDeckUnlockInfo(group.id);

    const card = document.createElement("button");
    card.type = "button";
    card.className = "training-tile conversion-deck-card";
    card.style.setProperty("--stagger", index.toString());
    card.disabled = !unlockInfo.unlocked;
    card.title = unlockInfo.unlocked ? `Open ${group.title}` : unlockInfo.message;
    card.innerHTML = `
      <span class="tile-title">${group.title}</span>
      <span class="tile-subtitle">${group.count} words</span>
      ${unlockInfo.unlocked ? "" : `<span class="tile-lock-text">${unlockInfo.message}</span>`}
      <span class="best deck-best">Best: ${formatScore(best, group.count)}</span>
      <div class="mini-progress-track">
        <div class="mini-progress-fill" style="width:${percent}%"></div>
      </div>
    `;
    card.addEventListener("click", () => openConversionQuiz(group.id));
    conversionDeckGrid.appendChild(card);
  });
}

function renderConversionQuizItems(items) {
  conversionList.innerHTML = "";
  items.forEach((item, index) => {
    const row = document.createElement("li");
    row.className = "form-row";
    row.dataset.index = index.toString();
    row.innerHTML = `
      <span class="form-label">${item.hint}</span>
      <span class="form-answer">${placeholder(item.displayAnswer)}</span>
    `;
    conversionList.appendChild(row);
  });
}

function updateConversionQuizMeta() {
  if (!state.currentConversionGroup) {
    conversionQuizMeta.textContent = "";
    return;
  }
  const total = state.currentConversionGroup.count;
  const best = getConversionBestScore(state.currentConversionGroup);
  const timerMeta = state.conversionQuizEnded ? "" : ` • ${getQuizTimerText()}`;
  conversionQuizMeta.textContent = `${total} words • Best: ${formatScore(best, total)}${timerMeta}`;
}

function updateConversionProgress() {
  const total = state.currentConversionItems.length;
  const found = state.conversionFoundIndexes.size;
  const percent = total === 0 ? 0 : Math.round((found / total) * 100);

  conversionProgressText.textContent = `${found}/${total} correct`;
  conversionProgressFill.style.width = `${percent}%`;

  if (found === total && !state.conversionQuizEnded) {
    endConversionQuiz("completed");
  }
}

function markConversionMatches(indices) {
  let added = 0;
  indices.forEach((index) => {
    if (state.conversionFoundIndexes.has(index)) {
      return;
    }
    state.conversionFoundIndexes.add(index);
    added += 1;

    const row = conversionList.querySelector(`[data-index="${index}"]`);
    if (!row) {
      return;
    }
    row.classList.add("found");
    row.querySelector(".form-answer").textContent =
      state.currentConversionItems[index].displayAnswer;
  });
  return added;
}

function revealAllConversionAnswers() {
  state.currentConversionItems.forEach((item, index) => {
    const row = conversionList.querySelector(`[data-index="${index}"]`);
    if (!row) {
      return;
    }
    if (!state.conversionFoundIndexes.has(index)) {
      row.classList.add("revealed");
    }
    row.querySelector(".form-answer").textContent = item.displayAnswer;
  });
}

function endConversionQuiz(reason) {
  if (!state.currentConversionGroup || state.conversionQuizEnded) {
    return;
  }

  state.conversionQuizEnded = true;
  stopQuizTimer();
  const total = state.currentConversionItems.length;
  const score = state.conversionFoundIndexes.size;
  const changed = recordBestScore("conversion", state.currentConversionGroup.id, score, total);
  updateConversionQuizMeta();

  if (reason === "gave-up") {
    revealAllConversionAnswers();
    conversionFeedback.className = "feedback bad";
    conversionFeedback.textContent = `Gave up. Final score: ${formatScore(score, total)}.`;
  } else if (reason === "time-up") {
    revealAllConversionAnswers();
    conversionFeedback.className = "feedback bad";
    conversionFeedback.textContent = `Time is up. Final score: ${formatScore(score, total)}.`;
  } else if (reason === "completed") {
    conversionFeedback.className = "feedback ok";
    conversionFeedback.textContent = `Deck completed. Final score: ${formatScore(score, total)}.`;
  }

  conversionAnswerInput.disabled = true;
  setQuizActionButton(conversionGiveUpButton, true);

  if (changed) {
    refreshProgressViews();
  }
}

function attemptConversionAnswer(rawValue, strict = false) {
  if (state.conversionQuizEnded) {
    return;
  }

  const key = normalize(rawValue);
  if (!key) {
    if (strict) {
      conversionFeedback.className = "feedback";
      conversionFeedback.textContent = "";
    }
    return;
  }

  const matches = state.conversionAnswerLookup.get(key);
  if (!matches) {
    if (strict) {
      conversionFeedback.className = "feedback bad";
      conversionFeedback.textContent = "Not a match yet.";
      recordAttemptStat("conversion", false, rawValue);
    }
    return;
  }

  const added = markConversionMatches(matches);
  if (added > 0) {
    conversionFeedback.className = "feedback ok";
    conversionFeedback.textContent = `✓ ${state.currentConversionItems[matches[0]].displayAnswer}`;
    conversionAnswerInput.value = "";
    updateConversionProgress();
    if (strict) {
      recordAttemptStat("conversion", true, rawValue);
    }
  }
}

function openConversionQuiz(groupId) {
  const group = state.conversionGroups.find((item) => item.id === groupId);
  if (!group) {
    return;
  }
  const unlockInfo = getConversionDeckUnlockInfo(groupId);
  if (!unlockInfo.unlocked) {
    setStatus(unlockInfo.message, true);
    return;
  }

  state.currentConversionGroup = group;
  state.currentConversionItems = group.items.map(makeConversionQuizItem);
  state.conversionFoundIndexes = new Set();
  state.conversionAnswerLookup = buildAnswerLookup(
    state.currentConversionItems,
    (item) => item.answers,
  );
  state.conversionQuizEnded = false;

  conversionQuizTitle.textContent = group.title;
  conversionRuleDescription.textContent = `${group.description} (* = not a perfect match)`;
  startQuizTimer({
    onTick: () => {
      updateConversionQuizMeta();
    },
    onExpire: () => {
      if (!state.conversionQuizEnded) {
        endConversionQuiz("time-up");
      }
    },
  });
  updateConversionQuizMeta();
  conversionAnswerLabel.textContent = `Type ${getTargetLanguageAdjective()} conversion`;
  conversionAnswerInput.placeholder = "Press Enter to submit...";
  conversionFeedback.className = "feedback";
  conversionFeedback.textContent = "";
  conversionAnswerInput.value = "";
  conversionAnswerInput.disabled = false;
  setQuizActionButton(conversionGiveUpButton, false);

  renderConversionQuizItems(state.currentConversionItems);
  updateConversionProgress();

  showView(conversionQuizView);
  clearStatus();
  conversionAnswerInput.focus();
}

function returnToConversionDashboard() {
  stopQuizTimer();
  if (state.currentConversionGroup && !state.conversionQuizEnded) {
    const changed = recordBestScore(
      "conversion",
      state.currentConversionGroup.id,
      state.conversionFoundIndexes.size,
      state.currentConversionItems.length,
    );
    if (changed) {
      refreshProgressViews();
    }
  }

  state.currentConversionGroup = null;
  state.currentConversionItems = [];
  state.conversionFoundIndexes = new Set();
  state.conversionAnswerLookup = new Map();
  state.conversionQuizEnded = false;
  conversionFeedback.className = "feedback";
  conversionFeedback.textContent = "";
  conversionAnswerInput.disabled = false;
  setQuizActionButton(conversionGiveUpButton, false);

  openConversionDashboard();
}

function makeGrammarQuizItem(item) {
  const answers = item.answers && item.answers.length ? item.answers : [item.answer];
  const uniqueAnswers = [...new Set(answers)];
  return {
    hint: item.imperfect ? `${item.hint} *` : item.hint,
    displayAnswer: uniqueAnswers[0],
    answers: uniqueAnswers,
    imperfect: item.imperfect,
  };
}

function renderGrammarDeckGrid() {
  grammarDeckGrid.innerHTML = "";
  grammarDeckCount.textContent = `${state.grammarGroups.length} decks`;

  state.grammarGroups.forEach((group, index) => {
    const best = getGrammarBestScore(group);
    const percent = calculatePercent(best, group.count);
    const unlockInfo = getGrammarDeckUnlockInfo(group.id);

    const card = document.createElement("button");
    card.type = "button";
    card.className = "training-tile grammar-deck-card";
    card.style.setProperty("--stagger", index.toString());
    card.disabled = !unlockInfo.unlocked;
    card.title = unlockInfo.unlocked ? `Open ${group.title}` : unlockInfo.message;
    card.innerHTML = `
      <span class="tile-title">${group.title}</span>
      <span class="tile-subtitle">${group.count} prompts</span>
      ${unlockInfo.unlocked ? "" : `<span class="tile-lock-text">${unlockInfo.message}</span>`}
      <span class="best deck-best">Best: ${formatScore(best, group.count)}</span>
      <div class="mini-progress-track">
        <div class="mini-progress-fill" style="width:${percent}%"></div>
      </div>
    `;
    card.addEventListener("click", () => openGrammarQuiz(group.id));
    grammarDeckGrid.appendChild(card);
  });
}

function renderGrammarQuizItems(items) {
  grammarList.innerHTML = "";
  items.forEach((item, index) => {
    const row = document.createElement("li");
    row.className = "form-row";
    row.dataset.index = index.toString();
    row.innerHTML = `
      <span class="form-label">${item.hint}</span>
      <span class="form-answer">${placeholder(item.displayAnswer)}</span>
    `;
    grammarList.appendChild(row);
  });
}

function updateGrammarQuizMeta() {
  if (!state.currentGrammarGroup) {
    grammarQuizMeta.textContent = "";
    return;
  }
  const total = state.currentGrammarGroup.count;
  const best = getGrammarBestScore(state.currentGrammarGroup);
  const timerMeta = state.grammarQuizEnded ? "" : ` • ${getQuizTimerText()}`;
  grammarQuizMeta.textContent = `${total} prompts • Best: ${formatScore(best, total)}${timerMeta}`;
}

function updateGrammarProgress() {
  const total = state.currentGrammarItems.length;
  const found = state.grammarFoundIndexes.size;
  const percent = total === 0 ? 0 : Math.round((found / total) * 100);

  grammarProgressText.textContent = `${found}/${total} correct`;
  grammarProgressFill.style.width = `${percent}%`;

  if (found === total && !state.grammarQuizEnded) {
    endGrammarQuiz("completed");
  }
}

function markGrammarMatches(indices) {
  let added = 0;
  indices.forEach((index) => {
    if (state.grammarFoundIndexes.has(index)) {
      return;
    }
    state.grammarFoundIndexes.add(index);
    added += 1;

    const row = grammarList.querySelector(`[data-index="${index}"]`);
    if (!row) {
      return;
    }
    row.classList.add("found");
    row.querySelector(".form-answer").textContent = state.currentGrammarItems[index].displayAnswer;
  });
  return added;
}

function revealAllGrammarAnswers() {
  state.currentGrammarItems.forEach((item, index) => {
    const row = grammarList.querySelector(`[data-index="${index}"]`);
    if (!row) {
      return;
    }
    if (!state.grammarFoundIndexes.has(index)) {
      row.classList.add("revealed");
    }
    row.querySelector(".form-answer").textContent = item.displayAnswer;
  });
}

function endGrammarQuiz(reason) {
  if (!state.currentGrammarGroup || state.grammarQuizEnded) {
    return;
  }

  state.grammarQuizEnded = true;
  stopQuizTimer();
  const total = state.currentGrammarItems.length;
  const score = state.grammarFoundIndexes.size;
  const changed = recordBestScore("grammar", state.currentGrammarGroup.id, score, total);
  updateGrammarQuizMeta();

  if (reason === "gave-up") {
    revealAllGrammarAnswers();
    grammarFeedback.className = "feedback bad";
    grammarFeedback.textContent = `Gave up. Final score: ${formatScore(score, total)}.`;
  } else if (reason === "time-up") {
    revealAllGrammarAnswers();
    grammarFeedback.className = "feedback bad";
    grammarFeedback.textContent = `Time is up. Final score: ${formatScore(score, total)}.`;
  } else if (reason === "completed") {
    grammarFeedback.className = "feedback ok";
    grammarFeedback.textContent = `Deck completed. Final score: ${formatScore(score, total)}.`;
  }

  grammarAnswerInput.disabled = true;
  setQuizActionButton(grammarGiveUpButton, true);

  if (changed) {
    refreshProgressViews();
  }
}

function attemptGrammarAnswer(rawValue, strict = false) {
  if (state.grammarQuizEnded) {
    return;
  }

  const key = normalize(rawValue);
  if (!key) {
    if (strict) {
      grammarFeedback.className = "feedback";
      grammarFeedback.textContent = "";
    }
    return;
  }

  const matches = state.grammarAnswerLookup.get(key);
  if (!matches) {
    if (strict) {
      grammarFeedback.className = "feedback bad";
      grammarFeedback.textContent = "Not a match yet.";
      recordAttemptStat("grammar", false, rawValue);
    }
    return;
  }

  const added = markGrammarMatches(matches);
  if (added > 0) {
    grammarFeedback.className = "feedback ok";
    grammarFeedback.textContent = `✓ ${state.currentGrammarItems[matches[0]].displayAnswer}`;
    grammarAnswerInput.value = "";
    updateGrammarProgress();
    if (strict) {
      recordAttemptStat("grammar", true, rawValue);
    }
  }
}

function openGrammarQuiz(groupId) {
  const group = state.grammarGroups.find((item) => item.id === groupId);
  if (!group) {
    return;
  }
  const unlockInfo = getGrammarDeckUnlockInfo(groupId);
  if (!unlockInfo.unlocked) {
    setStatus(unlockInfo.message, true);
    return;
  }

  state.currentGrammarGroup = group;
  state.currentGrammarItems = group.items.map(makeGrammarQuizItem);
  state.grammarFoundIndexes = new Set();
  state.grammarAnswerLookup = buildAnswerLookup(state.currentGrammarItems, (item) => item.answers);
  state.grammarQuizEnded = false;

  grammarQuizTitle.textContent = group.title;
  grammarRuleDescription.textContent = group.description;
  startQuizTimer({
    onTick: () => {
      updateGrammarQuizMeta();
    },
    onExpire: () => {
      if (!state.grammarQuizEnded) {
        endGrammarQuiz("time-up");
      }
    },
  });
  updateGrammarQuizMeta();
  grammarAnswerLabel.textContent = `Type ${getTargetLanguageAdjective()} answer`;
  grammarAnswerInput.placeholder = "Press Enter to submit...";
  grammarFeedback.className = "feedback";
  grammarFeedback.textContent = "";
  grammarAnswerInput.value = "";
  grammarAnswerInput.disabled = false;
  setQuizActionButton(grammarGiveUpButton, false);

  renderGrammarQuizItems(state.currentGrammarItems);
  updateGrammarProgress();

  showView(grammarQuizView);
  clearStatus();
  grammarAnswerInput.focus();
}

function returnToGrammarDashboard() {
  stopQuizTimer();
  if (state.currentGrammarGroup && !state.grammarQuizEnded) {
    const changed = recordBestScore(
      "grammar",
      state.currentGrammarGroup.id,
      state.grammarFoundIndexes.size,
      state.currentGrammarItems.length,
    );
    if (changed) {
      refreshProgressViews();
    }
  }

  state.currentGrammarGroup = null;
  state.currentGrammarItems = [];
  state.grammarFoundIndexes = new Set();
  state.grammarAnswerLookup = new Map();
  state.grammarQuizEnded = false;
  grammarFeedback.className = "feedback";
  grammarFeedback.textContent = "";
  grammarAnswerInput.disabled = false;
  setQuizActionButton(grammarGiveUpButton, false);

  openGrammarDashboard();
}

function makeSlangQuizItem(item) {
  const answers = item.answers && item.answers.length ? item.answers : [item.answer];
  const uniqueAnswers = [...new Set(answers)];
  return {
    hint: item.hint,
    displayAnswer: uniqueAnswers[0],
    answers: uniqueAnswers,
  };
}

function renderSlangDeckGrid() {
  slangDeckGrid.innerHTML = "";
  slangDeckCount.textContent = `${state.slangGroups.length} decks`;

  state.slangGroups.forEach((group, index) => {
    const best = getSlangBestScore(group);
    const percent = calculatePercent(best, group.count);
    const unlockInfo = getSlangDeckUnlockInfo(group.id);

    const card = document.createElement("button");
    card.type = "button";
    card.className = "training-tile slang-deck-card";
    card.style.setProperty("--stagger", index.toString());
    card.disabled = !unlockInfo.unlocked;
    card.title = unlockInfo.unlocked ? `Open ${group.title}` : unlockInfo.message;
    card.innerHTML = `
      <span class="tile-title">${group.title}</span>
      <span class="tile-subtitle">${group.count} items</span>
      ${unlockInfo.unlocked ? "" : `<span class="tile-lock-text">${unlockInfo.message}</span>`}
      <span class="best deck-best">Best: ${formatScore(best, group.count)}</span>
      <div class="mini-progress-track">
        <div class="mini-progress-fill" style="width:${percent}%"></div>
      </div>
    `;
    card.addEventListener("click", () => openSlangQuiz(group.id));
    slangDeckGrid.appendChild(card);
  });
}

function renderSlangQuizItems(items) {
  slangList.innerHTML = "";
  items.forEach((item, index) => {
    const row = document.createElement("li");
    row.className = "form-row";
    row.dataset.index = index.toString();
    row.innerHTML = `
      <span class="form-label">${item.hint}</span>
      <span class="form-answer">${placeholder(item.displayAnswer)}</span>
    `;
    slangList.appendChild(row);
  });
}

function updateSlangQuizMeta() {
  if (!state.currentSlangGroup) {
    slangQuizMeta.textContent = "";
    return;
  }
  const total = state.currentSlangGroup.count;
  const best = getSlangBestScore(state.currentSlangGroup);
  const timerMeta = state.slangQuizEnded ? "" : ` • ${getQuizTimerText()}`;
  slangQuizMeta.textContent = `${total} items • Best: ${formatScore(best, total)}${timerMeta}`;
}

function updateSlangProgress() {
  const total = state.currentSlangItems.length;
  const found = state.slangFoundIndexes.size;
  const percent = total === 0 ? 0 : Math.round((found / total) * 100);

  slangProgressText.textContent = `${found}/${total} correct`;
  slangProgressFill.style.width = `${percent}%`;

  if (found === total && !state.slangQuizEnded) {
    endSlangQuiz("completed");
  }
}

function markSlangMatches(indices) {
  let added = 0;
  indices.forEach((index) => {
    if (state.slangFoundIndexes.has(index)) {
      return;
    }
    state.slangFoundIndexes.add(index);
    added += 1;

    const row = slangList.querySelector(`[data-index="${index}"]`);
    if (!row) {
      return;
    }
    row.classList.add("found");
    row.querySelector(".form-answer").textContent = state.currentSlangItems[index].displayAnswer;
  });
  return added;
}

function revealAllSlangAnswers() {
  state.currentSlangItems.forEach((item, index) => {
    const row = slangList.querySelector(`[data-index="${index}"]`);
    if (!row) {
      return;
    }
    if (!state.slangFoundIndexes.has(index)) {
      row.classList.add("revealed");
    }
    row.querySelector(".form-answer").textContent = item.displayAnswer;
  });
}

function endSlangQuiz(reason) {
  if (!state.currentSlangGroup || state.slangQuizEnded) {
    return;
  }

  state.slangQuizEnded = true;
  stopQuizTimer();
  const total = state.currentSlangItems.length;
  const score = state.slangFoundIndexes.size;
  const changed = recordBestScore("slang", state.currentSlangGroup.id, score, total);
  updateSlangQuizMeta();

  if (reason === "gave-up") {
    revealAllSlangAnswers();
    slangFeedback.className = "feedback bad";
    slangFeedback.textContent = `Gave up. Final score: ${formatScore(score, total)}.`;
  } else if (reason === "time-up") {
    revealAllSlangAnswers();
    slangFeedback.className = "feedback bad";
    slangFeedback.textContent = `Time is up. Final score: ${formatScore(score, total)}.`;
  } else if (reason === "completed") {
    slangFeedback.className = "feedback ok";
    slangFeedback.textContent = `Deck completed. Final score: ${formatScore(score, total)}.`;
  }

  slangAnswerInput.disabled = true;
  setQuizActionButton(slangGiveUpButton, true);

  if (changed) {
    refreshProgressViews();
  }
}

function attemptSlangAnswer(rawValue, strict = false) {
  if (state.slangQuizEnded) {
    return;
  }

  const key = normalize(rawValue);
  if (!key) {
    if (strict) {
      slangFeedback.className = "feedback";
      slangFeedback.textContent = "";
    }
    return;
  }

  const matches = state.slangAnswerLookup.get(key);
  if (!matches) {
    if (strict) {
      slangFeedback.className = "feedback bad";
      slangFeedback.textContent = "Not a match yet.";
      recordAttemptStat("slang", false, rawValue);
    }
    return;
  }

  const added = markSlangMatches(matches);
  if (added > 0) {
    slangFeedback.className = "feedback ok";
    slangFeedback.textContent = `✓ ${state.currentSlangItems[matches[0]].displayAnswer}`;
    slangAnswerInput.value = "";
    updateSlangProgress();
    if (strict) {
      recordAttemptStat("slang", true, rawValue);
    }
  }
}

function openSlangQuiz(groupId) {
  const group = state.slangGroups.find((item) => item.id === groupId);
  if (!group) {
    return;
  }
  const unlockInfo = getSlangDeckUnlockInfo(groupId);
  if (!unlockInfo.unlocked) {
    setStatus(unlockInfo.message, true);
    return;
  }

  state.currentSlangGroup = group;
  state.currentSlangItems = group.items.map(makeSlangQuizItem);
  state.slangFoundIndexes = new Set();
  state.slangAnswerLookup = buildAnswerLookup(state.currentSlangItems, (item) => item.answers);
  state.slangQuizEnded = false;

  slangQuizTitle.textContent = group.title;
  slangRegionDescription.textContent = group.description;
  startQuizTimer({
    onTick: () => {
      updateSlangQuizMeta();
    },
    onExpire: () => {
      if (!state.slangQuizEnded) {
        endSlangQuiz("time-up");
      }
    },
  });
  updateSlangQuizMeta();
  slangAnswerLabel.textContent = `Type regional ${getTargetLanguageAdjective()} slang`;
  slangAnswerInput.placeholder = "Press Enter to submit...";
  slangFeedback.className = "feedback";
  slangFeedback.textContent = "";
  slangAnswerInput.value = "";
  slangAnswerInput.disabled = false;
  setQuizActionButton(slangGiveUpButton, false);

  renderSlangQuizItems(state.currentSlangItems);
  updateSlangProgress();

  showView(slangQuizView);
  clearStatus();
  slangAnswerInput.focus();
}

function returnToSlangDashboard() {
  stopQuizTimer();
  if (state.currentSlangGroup && !state.slangQuizEnded) {
    const changed = recordBestScore(
      "slang",
      state.currentSlangGroup.id,
      state.slangFoundIndexes.size,
      state.currentSlangItems.length,
    );
    if (changed) {
      refreshProgressViews();
    }
  }

  state.currentSlangGroup = null;
  state.currentSlangItems = [];
  state.slangFoundIndexes = new Set();
  state.slangAnswerLookup = new Map();
  state.slangQuizEnded = false;
  slangFeedback.className = "feedback";
  slangFeedback.textContent = "";
  slangAnswerInput.disabled = false;
  setQuizActionButton(slangGiveUpButton, false);

  openSlangDashboard();
}

function setNounMode(mode) {
  if (mode !== "singular" && mode !== "plural") {
    return;
  }
  state.nounMode = mode;
  nounModeToggle.checked = mode === "plural";
  updateNounsAnswerPrompt();
  refreshProgressViews();
}

function isValidPassword(password) {
  return password.length >= 6;
}

function isValidUsernameForSupabase(username) {
  return /^[a-z0-9._-]+$/.test(username);
}

function setLoggedInState() {
  showAppShell();
  clearAuthFeedback();
  renderLeaderboardHubTile();
  renderStatsHubTile();
  renderLeaderboards();
}

async function handleLogin(username, password) {
  const normalized = normalizeUsername(username);
  if (!normalized) {
    throw new Error("Enter a username.");
  }
  if (!password) {
    throw new Error("Enter a password.");
  }
  if (hasSupabaseConfig() && !isValidUsernameForSupabase(normalized)) {
    throw new Error("Username can only include letters, numbers, dots, underscores, and hyphens.");
  }

  if (hasSupabaseConfig()) {
    await supabaseSignIn({ username: normalized, password });
    const identity = await resolveSupabaseIdentity();
    if (!identity) {
      throw new Error("Unable to load your account.");
    }
    await setCurrentUser(identity);
    setLoggedInState();
    try {
      await ensureDataLoaded();
      scheduleRemoteStateSync();
    } catch (error) {
      await logoutCurrentUser();
      throw error;
    }
    refreshProgressViews();
    openTrainingHub();
    return;
  }

  const userRecord = state.users[normalized];
  if (!userRecord) {
    throw new Error("Account not found.");
  }

  const valid = await verifyPassword(userRecord, password);
  if (!valid) {
    throw new Error("Incorrect password.");
  }

  await setCurrentUser(userRecord);
  setLoggedInState();
  try {
    await ensureDataLoaded();
  } catch (error) {
    await logoutCurrentUser();
    throw error;
  }
  refreshProgressViews();
  openTrainingHub();
}

async function handleSignup(name, username, password, confirmPassword) {
  const trimmedName = name.trim();
  const normalized = normalizeUsername(username);

  if (!trimmedName) {
    throw new Error("Enter your name.");
  }
  if (!normalized) {
    throw new Error("Choose a username.");
  }
  if (hasSupabaseConfig() && !isValidUsernameForSupabase(normalized)) {
    throw new Error("Username can only include letters, numbers, dots, underscores, and hyphens.");
  }
  if (normalized.length < 3) {
    throw new Error("Username must be at least 3 characters.");
  }
  if (!hasSupabaseConfig() && state.users[normalized]) {
    throw new Error("That username is already taken.");
  }
  if (!isValidPassword(password)) {
    throw new Error("Password must be at least 6 characters.");
  }
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match.");
  }

  if (hasSupabaseConfig()) {
    try {
      await supabaseSignUp({
        username: normalized,
        password,
        name: trimmedName,
      });
    } catch (error) {
      const text = String(error.message || "");
      if (/already registered|already exists|duplicate|unique/i.test(text)) {
        throw new Error("That username is already taken.");
      }
      throw error;
    }

    if (!state.supabaseSession?.access_token) {
      await supabaseSignIn({ username: normalized, password });
    }

    const identity = await resolveSupabaseIdentity();
    if (!identity) {
      throw new Error("Unable to load your new account.");
    }
    if (identity.name !== trimmedName) {
      identity.name = trimmedName;
      await upsertProfile({
        userId: identity.user_id,
        username: identity.username,
        name: identity.name,
      });
    }

    await setCurrentUser(identity);
    setLoggedInState();
    try {
      await ensureDataLoaded();
      scheduleRemoteStateSync();
    } catch (error) {
      await logoutCurrentUser();
      throw error;
    }
    refreshProgressViews();
    openTrainingHub();
    return;
  }

  const salt = generateSalt();
  const passwordHash = await hashPassword(password, salt);
  state.users[normalized] = {
    username: normalized,
    name: trimmedName,
    salt,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  saveUsers(state.users);

  await setCurrentUser(state.users[normalized]);
  setLoggedInState();
  try {
    await ensureDataLoaded();
  } catch (error) {
    await logoutCurrentUser();
    throw error;
  }
  refreshProgressViews();
  openTrainingHub();
}

async function handleProfileNameUpdate(nextName) {
  if (!state.currentUser) {
    throw new Error("No account is signed in.");
  }
  const trimmed = nextName.trim();
  if (!trimmed) {
    throw new Error("Name cannot be empty.");
  }

  const username = state.currentUser.username;
  if (hasSupabaseConfig() && state.currentUser.user_id) {
    await upsertProfile({
      userId: state.currentUser.user_id,
      username,
      name: trimmed,
    });
    state.currentUser.name = trimmed;
    state.users[username] = {
      ...(state.users[username] || {}),
      username,
      name: trimmed,
      user_id: state.currentUser.user_id,
    };
    scheduleRemoteStateSync();
    refreshCurrentUserLabel();
    return;
  }

  state.users[username] = {
    ...state.users[username],
    name: trimmed,
  };
  saveUsers(state.users);
  await setCurrentUser(username);
}

async function handlePasswordUpdate(currentPassword, nextPassword, confirmPassword) {
  if (!state.currentUser) {
    throw new Error("No account is signed in.");
  }
  if (!currentPassword) {
    throw new Error("Enter your current password.");
  }
  if (!isValidPassword(nextPassword)) {
    throw new Error("New password must be at least 6 characters.");
  }
  if (nextPassword !== confirmPassword) {
    throw new Error("New passwords do not match.");
  }

  if (hasSupabaseConfig()) {
    try {
      await supabaseRequest("/auth/v1/token?grant_type=password", {
        method: "POST",
        auth: false,
        body: {
          email: usernameToAuthEmail(state.currentUser.username),
          password: currentPassword,
        },
      });
    } catch (_error) {
      throw new Error("Current password is incorrect.");
    }
    await supabaseUpdatePassword(nextPassword);
    return;
  }

  const username = state.currentUser.username;
  const userRecord = state.users[username];
  const validCurrent = await verifyPassword(userRecord, currentPassword);
  if (!validCurrent) {
    throw new Error("Current password is incorrect.");
  }

  const salt = generateSalt();
  const passwordHash = await hashPassword(nextPassword, salt);
  state.users[username] = {
    ...userRecord,
    salt,
    passwordHash,
    updatedAt: new Date().toISOString(),
  };
  saveUsers(state.users);
}

async function logoutCurrentUser() {
  if (hasSupabaseConfig()) {
    await supabaseSignOut();
  }
  if (remoteStateSyncTimer) {
    clearTimeout(remoteStateSyncTimer);
    remoteStateSyncTimer = null;
  }
  clearSessionUsername();
  state.currentUser = null;
  state.bestScores = createEmptyBestScores();
  state.activityMap = {};
  state.attemptStats = createEmptyAttemptStats();
  state.remoteLeaderboardRows = [];
  state.srsQueue = [];
  state.srsCurrentCard = null;
  state.srsCurrentSubmitted = false;
  state.srsCurrentCorrect = false;
  state.srsSessionReviewed = 0;
  state.srsSessionCorrect = 0;
  state.gamificationData = createEmptyGamificationData();
  state.srsData = createEmptySrsData();
  state.adminMode = false;
  refreshCurrentUserLabel();
  refreshAdminModeAccess();
  showAuthScreen();
  clearAuthForms();
}

async function loadData() {
  setStatus("Loading training data...");

  try {
    const dataUrls = getDataUrlsForLanguage();
    const [
      verbsResponse,
      nounsResponse,
      beginnerResponse,
      discourseResponse,
      conversionResponse,
      grammarResponse,
      slangResponse,
      storiesResponse,
    ] =
      await Promise.all([
        fetch(dataUrls.verbs),
        fetch(dataUrls.nouns),
        fetch(dataUrls.beginner),
        fetch(dataUrls.discourse),
        fetch(dataUrls.conversion),
        fetch(dataUrls.grammar),
        fetch(dataUrls.slang),
        fetch(dataUrls.stories),
      ]);

    if (!verbsResponse.ok) {
      throw new Error(`Verb data HTTP ${verbsResponse.status}`);
    }
    if (!nounsResponse.ok) {
      throw new Error(`Noun data HTTP ${nounsResponse.status}`);
    }
    if (!beginnerResponse.ok) {
      throw new Error(`Beginner data HTTP ${beginnerResponse.status}`);
    }
    if (!discourseResponse.ok) {
      throw new Error(`Discourse data HTTP ${discourseResponse.status}`);
    }
    if (!conversionResponse.ok) {
      throw new Error(`Conversion data HTTP ${conversionResponse.status}`);
    }
    if (!grammarResponse.ok) {
      throw new Error(`Grammar data HTTP ${grammarResponse.status}`);
    }
    if (!slangResponse.ok) {
      throw new Error(`Slang data HTTP ${slangResponse.status}`);
    }
    if (!storiesResponse.ok) {
      throw new Error(`Stories data HTTP ${storiesResponse.status}`);
    }

    const [verbs, nouns, beginner, discourse, conversion, grammar, slang, stories] =
      await Promise.all([
        verbsResponse.json(),
        nounsResponse.json(),
        beginnerResponse.json(),
        discourseResponse.json(),
        conversionResponse.json(),
        grammarResponse.json(),
        slangResponse.json(),
        storiesResponse.json(),
      ]);

    const splitVerbs = splitVerbTracks(verbs);
    const splitNouns = splitNounTracks(nouns.decks || []);

    state.verbs = splitVerbs.core;
    state.verbsAdditional = splitVerbs.additional;
    state.nounDecks = splitNouns.core;
    state.nounDecksAdvanced = splitNouns.advanced;
    state.activeVerbTrack = "core";
    state.activeNounTrack = "core";
    state.beginnerGroups = beginner.groups || [];
    state.discourseGroups = buildDiscourseGroups(discourse);
    state.conversionGroups = buildConversionGroups(conversion);
    state.grammarGroups = buildGrammarGroups(grammar);
    state.slangGroups = buildSlangGroups(slang);
    state.stories = buildStories(stories);
    if (!(hasSupabaseConfig() && state.currentUser?.user_id)) {
      state.bestScores = loadBestScores();
      state.srsData = loadSrsData();
      state.gamificationData = loadGamificationData();
    }
    rebuildSrsCatalog();
    evaluateAchievementsAndSync({ source: "init", save: true });

    refreshLanguageModuleTitles();

    filterAndRenderVerbs();
    renderNounsDeckGrid();
    renderBeginnerDeckGrid();
    renderDiscourseDeckGrid();
    renderConversionDeckGrid();
    renderGrammarDeckGrid();
    renderSlangDeckGrid();
    renderStoriesGrid();
    renderSrsHubTile();
    renderAchievementsPanel();
    updateDashboardProgressBars();
    renderTrainingGrid();
    updateNounsAnswerPrompt();
    clearStatus();
    return true;
  } catch (error) {
    console.error(error);
    setStatus(
      "Could not load training data. Start a local server (for example: python3 -m http.server).",
      true,
    );
    return false;
  }
}

verbSearch.addEventListener("input", filterAndRenderVerbs);

if (languageToggle) {
  languageToggle.addEventListener("change", async (event) => {
    const nextLanguage = normalizeLanguageCode(event.target.value);
    setStatus(`Switching to ${getLanguageUiCopy(nextLanguage).targetLanguageName}...`);
    try {
      await switchActiveLanguage(nextLanguage);
    } catch (_error) {
      setStatus("Could not switch language. Check data files and try again.", true);
    }
  });
}

if (adminModeToggle) {
  adminModeToggle.addEventListener("change", (event) => {
    setAdminMode(event.target.checked);
  });
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setFeedbackMessage(loginFeedback, "");
  try {
    await handleLogin(loginUsername.value, loginPassword.value);
    clearAuthForms();
  } catch (error) {
    setFeedbackMessage(loginFeedback, error.message, "bad");
  }
});

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setFeedbackMessage(signupFeedback, "");
  try {
    await handleSignup(
      signupName.value,
      signupUsername.value,
      signupPassword.value,
      signupPasswordConfirm.value,
    );
    clearAuthForms();
  } catch (error) {
    setFeedbackMessage(signupFeedback, error.message, "bad");
  }
});

profileForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setFeedbackMessage(profileFeedback, "");
  try {
    await handleProfileNameUpdate(profileNameInput.value);
    renderLeaderboardHubTile();
    renderStatsHubTile();
    renderLeaderboards();
    setFeedbackMessage(profileFeedback, "Name updated.", "ok");
  } catch (error) {
    setFeedbackMessage(profileFeedback, error.message, "bad");
  }
});

passwordForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setFeedbackMessage(passwordFeedback, "");
  try {
    await handlePasswordUpdate(
      currentPasswordInput.value,
      newPasswordInput.value,
      newPasswordConfirmInput.value,
    );
    passwordForm.reset();
    setFeedbackMessage(passwordFeedback, "Password updated.", "ok");
  } catch (error) {
    setFeedbackMessage(passwordFeedback, error.message, "bad");
  }
});

accountManageButton.addEventListener("click", () => {
  openAccountManagement();
});

accountBackButton.addEventListener("click", () => {
  openTrainingHub();
});

logoutButton.addEventListener("click", async () => {
  await logoutCurrentUser();
});

backToTrainingButton.addEventListener("click", () => {
  openTrainingHub();
});

backToTrainingFromNounsButton.addEventListener("click", () => {
  openTrainingHub();
});

backToTrainingFromBeginnerButton.addEventListener("click", () => {
  openTrainingHub();
});

backToTrainingFromDiscourseButton.addEventListener("click", () => {
  openTrainingHub();
});

backToTrainingFromConversionButton.addEventListener("click", () => {
  openTrainingHub();
});

backToTrainingFromGrammarButton.addEventListener("click", () => {
  openTrainingHub();
});

backToTrainingFromSlangButton.addEventListener("click", () => {
  openTrainingHub();
});

backToTrainingFromLeaderboardButton.addEventListener("click", () => {
  openTrainingHub();
});

storyBackButton.addEventListener("click", () => {
  openTrainingHub();
});

if (srsStartButton) {
  srsStartButton.addEventListener("click", () => {
    openSrsReview();
  });
}

if (srsManageButton) {
  srsManageButton.addEventListener("click", () => {
    openSrsManageView();
  });
}

if (srsBackButton) {
  srsBackButton.addEventListener("click", () => {
    openTrainingHub();
  });
}

if (srsManageFromReviewButton) {
  srsManageFromReviewButton.addEventListener("click", () => {
    openSrsManageView();
  });
}

if (srsManageBackButton) {
  srsManageBackButton.addEventListener("click", () => {
    openTrainingHub();
  });
}

if (srsSelectUnlockedButton) {
  srsSelectUnlockedButton.addEventListener("click", () => {
    state.srsDeckCatalog.forEach((deck) => {
      const unlockInfo = getSrsDeckUnlockInfo(deck);
      if (unlockInfo.unlocked) {
        setSrsDeckSelected(deck.id, true);
      }
    });
    renderSrsManageView();
    renderSrsHubTile();
  });
}

if (srsClearSelectionButton) {
  srsClearSelectionButton.addEventListener("click", () => {
    state.srsDeckCatalog.forEach((deck) => {
      setSrsDeckSelected(deck.id, false);
    });
    renderSrsManageView();
    renderSrsHubTile();
  });
}

if (srsAnswerInput) {
  srsAnswerInput.addEventListener("input", () => {
    if (srsFeedback.classList.contains("bad")) {
      srsFeedback.className = "feedback";
      srsFeedback.textContent = "";
    }
  });

  srsAnswerInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
      return;
    }
    event.preventDefault();
    attemptSrsAnswer(srsAnswerInput.value, true);
  });
}

[srsGradeAgainButton, srsGradeHardButton, srsGradeGoodButton, srsGradeEasyButton].forEach(
  (button) => {
    if (!button) {
      return;
    }
    button.addEventListener("click", () => {
      const grade = button.textContent.toLowerCase();
      gradeCurrentSrsCard(grade);
    });
  },
);

moduleBackButton.addEventListener("click", () => {
  openTrainingHub();
});

backButton.addEventListener("click", returnToVerbDashboard);

giveUpButton.addEventListener("click", () => {
  if (state.quizEnded) {
    if (state.currentVerb) {
      openVerbQuiz(state.currentVerb.infinitive);
    }
    return;
  }
  endVerbQuiz("gave-up");
});

answerInput.addEventListener("input", () => {
  if (feedback.classList.contains("bad")) {
    feedback.className = "feedback";
    feedback.textContent = "";
  }
});

answerInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") {
    return;
  }
  event.preventDefault();
  attemptVerbAnswer(answerInput.value, true);
});

nounModeToggle.addEventListener("change", (event) => {
  const mode = event.target.checked ? "plural" : "singular";
  setNounMode(mode);
});

nounsBackButton.addEventListener("click", returnToNounsDashboard);

nounsGiveUpButton.addEventListener("click", () => {
  if (state.nounQuizEnded) {
    if (state.currentNounDeck) {
      openNounQuiz(state.currentNounDeck.id);
    }
    return;
  }
  endNounQuiz("gave-up");
});

nounsAnswerInput.addEventListener("input", () => {
  if (nounsFeedback.classList.contains("bad")) {
    nounsFeedback.className = "feedback";
    nounsFeedback.textContent = "";
  }
});

nounsAnswerInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") {
    return;
  }
  event.preventDefault();
  attemptNounAnswer(nounsAnswerInput.value, true);
});

beginnerBackButton.addEventListener("click", returnToBeginnerDashboard);

beginnerGiveUpButton.addEventListener("click", () => {
  if (state.beginnerQuizEnded) {
    if (state.currentBeginnerGroup) {
      openBeginnerQuiz(state.currentBeginnerGroup.id);
    }
    return;
  }
  endBeginnerQuiz("gave-up");
});

beginnerAnswerInput.addEventListener("input", () => {
  if (beginnerFeedback.classList.contains("bad")) {
    beginnerFeedback.className = "feedback";
    beginnerFeedback.textContent = "";
  }
});

beginnerAnswerInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") {
    return;
  }
  event.preventDefault();
  attemptBeginnerAnswer(beginnerAnswerInput.value, true);
});

discourseBackButton.addEventListener("click", returnToDiscourseDashboard);

discourseGiveUpButton.addEventListener("click", () => {
  if (state.discourseQuizEnded) {
    if (state.currentDiscourseGroup) {
      openDiscourseQuiz(state.currentDiscourseGroup.id);
    }
    return;
  }
  endDiscourseQuiz("gave-up");
});

discourseAnswerInput.addEventListener("input", () => {
  if (discourseFeedback.classList.contains("bad")) {
    discourseFeedback.className = "feedback";
    discourseFeedback.textContent = "";
  }
});

discourseAnswerInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") {
    return;
  }
  event.preventDefault();
  attemptDiscourseAnswer(discourseAnswerInput.value, true);
});

conversionBackButton.addEventListener("click", returnToConversionDashboard);

conversionGiveUpButton.addEventListener("click", () => {
  if (state.conversionQuizEnded) {
    if (state.currentConversionGroup) {
      openConversionQuiz(state.currentConversionGroup.id);
    }
    return;
  }
  endConversionQuiz("gave-up");
});

conversionAnswerInput.addEventListener("input", () => {
  if (conversionFeedback.classList.contains("bad")) {
    conversionFeedback.className = "feedback";
    conversionFeedback.textContent = "";
  }
});

conversionAnswerInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") {
    return;
  }
  event.preventDefault();
  attemptConversionAnswer(conversionAnswerInput.value, true);
});

grammarBackButton.addEventListener("click", returnToGrammarDashboard);

grammarGiveUpButton.addEventListener("click", () => {
  if (state.grammarQuizEnded) {
    if (state.currentGrammarGroup) {
      openGrammarQuiz(state.currentGrammarGroup.id);
    }
    return;
  }
  endGrammarQuiz("gave-up");
});

grammarAnswerInput.addEventListener("input", () => {
  if (grammarFeedback.classList.contains("bad")) {
    grammarFeedback.className = "feedback";
    grammarFeedback.textContent = "";
  }
});

grammarAnswerInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") {
    return;
  }
  event.preventDefault();
  attemptGrammarAnswer(grammarAnswerInput.value, true);
});

slangBackButton.addEventListener("click", returnToSlangDashboard);

slangGiveUpButton.addEventListener("click", () => {
  if (state.slangQuizEnded) {
    if (state.currentSlangGroup) {
      openSlangQuiz(state.currentSlangGroup.id);
    }
    return;
  }
  endSlangQuiz("gave-up");
});

slangAnswerInput.addEventListener("input", () => {
  if (slangFeedback.classList.contains("bad")) {
    slangFeedback.className = "feedback";
    slangFeedback.textContent = "";
  }
});

slangAnswerInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") {
    return;
  }
  event.preventDefault();
  attemptSlangAnswer(slangAnswerInput.value, true);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  if (!quizView.hidden) {
    returnToVerbDashboard();
    return;
  }

  if (!nounsQuizView.hidden) {
    returnToNounsDashboard();
    return;
  }

  if (!beginnerQuizView.hidden) {
    returnToBeginnerDashboard();
    return;
  }

  if (!discourseQuizView.hidden) {
    returnToDiscourseDashboard();
    return;
  }

  if (!conversionQuizView.hidden) {
    returnToConversionDashboard();
    return;
  }

  if (!grammarQuizView.hidden) {
    returnToGrammarDashboard();
    return;
  }

  if (!slangQuizView.hidden) {
    returnToSlangDashboard();
    return;
  }

  if (!srsReviewView.hidden) {
    openTrainingHub();
    return;
  }

  if (!srsManageView.hidden) {
    openTrainingHub();
    return;
  }

  if (!leaderboardView.hidden) {
    openTrainingHub();
    return;
  }

  if (!storyView.hidden) {
    openTrainingHub();
    return;
  }

  if (!accountView.hidden) {
    openTrainingHub();
    return;
  }

  if (
    !dashboardView.hidden ||
    !nounsDashboardView.hidden ||
    !beginnerDashboardView.hidden ||
    !discourseDashboardView.hidden ||
    !conversionDashboardView.hidden ||
    !grammarDashboardView.hidden ||
    !slangDashboardView.hidden ||
    !leaderboardView.hidden ||
    !accountView.hidden ||
    !srsReviewView.hidden ||
    !srsManageView.hidden ||
    !moduleView.hidden
  ) {
    openTrainingHub();
  }
});

async function bootstrap() {
  updateDashboardProgressBars();
  renderTrainingGrid();

  if (hasSupabaseConfig()) {
    state.supabaseSession = loadSupabaseSession();
    if (state.supabaseSession?.access_token) {
      try {
        const identity = await resolveSupabaseIdentity();
        if (!identity) {
          throw new Error("No active Supabase session.");
        }
        await setCurrentUser(identity);
        showAppShell();
        await ensureDataLoaded();
        scheduleRemoteStateSync();
        refreshProgressViews();
        openTrainingHub();
        return;
      } catch (error) {
        console.error(error);
        await logoutCurrentUser();
      }
    } else {
      clearSupabaseSession();
    }

    showAuthScreen();
    loginUsername.focus();
    return;
  }

  const sessionUsername = loadSessionUsername();
  if (sessionUsername && state.users[sessionUsername]) {
    await setCurrentUser(sessionUsername);
    showAppShell();
    try {
      await ensureDataLoaded();
      refreshProgressViews();
      openTrainingHub();
    } catch (error) {
      console.error(error);
      showAuthScreen();
    }
    return;
  }

  clearSessionUsername();
  showAuthScreen();
  loginUsername.focus();
}

bootstrap();
