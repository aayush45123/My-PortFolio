const express = require("express");
const router = express.Router();

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "aayush45123";

// In-memory cache for GitHub contributions (30 minutes)
let cache = {
  data: null,
  timestamp: 0,
};
const CACHE_TTL_MS = 30 * 60 * 1000;

// Helper to query GitHub GraphQL API
async function fetchFromGraphQL(username, token) {
  const now = new Date();
  const to = now.toISOString();
  const fromDate = new Date(now);
  fromDate.setFullYear(now.getFullYear() - 1);
  const from = fromDate.toISOString();

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            colors
            months {
              name
              firstDay
              totalWeeks
            }
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
                color
                weekday
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "Portfolio-Server",
    },
    body: JSON.stringify({
      query,
      variables: { username, from, to },
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL API responded with status ${response.status}`);
  }

  const json = await response.json();
  if (json.errors && json.errors.length > 0) {
    throw new Error(json.errors[0].message || "GraphQL error");
  }

  const calendar =
    json.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) {
    throw new Error("Invalid GitHub GraphQL response structure");
  }

  return calendar;
}

// Resilient fallback when GITHUB_TOKEN is not yet set in environment
async function fetchFromFallback(username) {
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
    {
      headers: { "User-Agent": "Portfolio-Server" },
    }
  );

  if (!response.ok) {
    throw new Error(`Fallback API responded with status ${response.status}`);
  }

  const json = await response.json();
  const totalContributions = json.total?.lastYear || 0;
  const contributions = json.contributions || [];

  // Transform flat array into weeks (7 days per week)
  const weeks = [];
  let currentWeek = { contributionDays: [] };

  contributions.forEach((day) => {
    const d = new Date(day.date);
    const weekday = d.getUTCDay();

    // If day is Sunday and we already have days, start new week
    if (weekday === 0 && currentWeek.contributionDays.length > 0) {
      weeks.push(currentWeek);
      currentWeek = { contributionDays: [] };
    }

    const levelMap = {
      0: "NONE",
      1: "FIRST_QUARTILE",
      2: "SECOND_QUARTILE",
      3: "THIRD_QUARTILE",
      4: "FOURTH_QUARTILE",
    };

    currentWeek.contributionDays.push({
      date: day.date,
      contributionCount: day.count || 0,
      contributionLevel: levelMap[day.level] || "NONE",
      weekday,
    });
  });

  if (currentWeek.contributionDays.length > 0) {
    weeks.push(currentWeek);
  }

  return {
    totalContributions,
    weeks,
    isFallback: true,
  };
}

// GET /api/github/contributions
router.get("/contributions", async (req, res) => {
  const username = req.query.username || GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  // Serve from in-memory cache if fresh
  const now = Date.now();
  if (cache.data && now - cache.timestamp < CACHE_TTL_MS) {
    return res.json({
      success: true,
      data: cache.data,
      source: "cache",
      username,
    });
  }

  let calendar = null;

  // 1. Try official GitHub GraphQL API if token is provided
  if (token) {
    try {
      calendar = await fetchFromGraphQL(username, token);
    } catch (err) {
      console.warn("GitHub GraphQL failed, attempting fallback:", err.message);
    }
  }

  // 2. If token absent or GraphQL query failed, use fallback
  if (!calendar) {
    try {
      calendar = await fetchFromFallback(username);
    } catch (fallbackErr) {
      console.error("All GitHub contribution sources failed:", fallbackErr.message);
      return res.status(503).json({
        success: false,
        error: "GitHub contributions are temporarily unavailable.",
      });
    }
  }

  // Cache successful response
  cache = {
    data: calendar,
    timestamp: now,
  };

  return res.json({
    success: true,
    data: calendar,
    username,
  });
});

module.exports = router;
