import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import styles from "./GitHubContributions.module.css";
import { API_BASE } from "../../api/axios";
import {
  Github,
  ExternalLink,
  GitCommit,
  Flame,
  CalendarCheck,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

const GITHUB_USERNAME = "aayush45123";
const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;
const CACHE_KEY = `github_contributions_${GITHUB_USERNAME}`;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 mins

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const WEEKDAYS = [
  { label: "", row: 0 },
  { label: "Mon", row: 1 },
  { label: "", row: 2 },
  { label: "Wed", row: 3 },
  { label: "", row: 4 },
  { label: "Fri", row: 5 },
  { label: "", row: 6 },
];

const CELL_SIZE = 13.5;
const CELL_GAP = 3.5;
const STEP = CELL_SIZE + CELL_GAP; // 17px
const LEFT_PAD = 32;
const TOP_PAD = 26;
const TOTAL_WEEKS = 53;
const SVG_WIDTH = LEFT_PAD + TOTAL_WEEKS * STEP; // 933
const SVG_HEIGHT = TOP_PAD + 7 * STEP + 4; // 149

const GitHubContributions = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [calendarData, setCalendarData] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const containerRef = useRef(null);

  const fetchContributions = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    // 1. Check client session cache
    if (!forceRefresh) {
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
            setCalendarData(parsed.data);
            setLoading(false);
            return;
          }
        }
      } catch {
        // Ignore cache parse error
      }
    }

    // 2. Fetch from backend endpoint
    let calendar = null;
    try {
      const res = await fetch(`${API_BASE}/api/github/contributions?username=${GITHUB_USERNAME}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          calendar = json.data;
        }
      }
    } catch {
      // Backend not running locally or network issue, proceed to client fallback
    }

    // 3. Resilient public fallback if backend is offline or unconfigured
    if (!calendar) {
      try {
        const fallbackRes = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
        );
        if (fallbackRes.ok) {
          const fbJson = await fallbackRes.json();
          const totalContributions = fbJson.total?.lastYear || 0;
          const contributions = fbJson.contributions || [];

          // Transform into weeks structure
          const weeks = [];
          let currentWeek = { contributionDays: [] };

          contributions.forEach((day) => {
            const d = new Date(day.date);
            const weekday = d.getUTCDay();

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

          calendar = {
            totalContributions,
            weeks,
          };
        }
      } catch {
        // All sources failed
      }
    }

    if (calendar && calendar.weeks && calendar.weeks.length > 0) {
      setCalendarData(calendar);
      try {
        sessionStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: calendar, timestamp: Date.now() })
        );
      } catch {
        // Safe to ignore
      }
    } else {
      setError("GitHub contributions are temporarily unavailable.");
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchContributions();
  }, [fetchContributions]);

  // Transform weeks & compute month labels
  const { normalizedWeeks, monthHeaders, maxDayCount, activeDaysCount } = useMemo(() => {
    if (!calendarData?.weeks || calendarData.weeks.length === 0) {
      return {
        normalizedWeeks: [],
        monthHeaders: [],
        maxDayCount: 0,
        activeDaysCount: 0,
      };
    }

    // Take the last 53 weeks
    const weeksSlice = calendarData.weeks.slice(-TOTAL_WEEKS);
    const months = [];
    let lastMonth = -1;
    let maxCount = 0;
    let activeDays = 0;

    const weeks = weeksSlice.map((w, wIdx) => {
      let weekMonth = -1;

      const days = w.contributionDays.map((d) => {
        const count = d.contributionCount || 0;
        if (count > maxCount) maxCount = count;
        if (count > 0) activeDays += 1;

        const dateObj = new Date(d.date);
        if (d.weekday === 0 || weekMonth === -1) {
          weekMonth = dateObj.getUTCMonth();
        }

        return {
          date: d.date,
          count,
          level: d.contributionLevel || "NONE",
          weekday: d.weekday,
          dateObj,
        };
      });

      if (weekMonth !== -1 && weekMonth !== lastMonth) {
        if (wIdx < 51) {
          months.push({ weekIndex: wIdx, name: MONTH_NAMES[weekMonth] });
        }
        lastMonth = weekMonth;
      }

      return days;
    });

    return {
      normalizedWeeks: weeks,
      monthHeaders: months,
      maxDayCount: maxCount,
      activeDaysCount: activeDays,
    };
  }, [calendarData]);

  // Map intensity levels
  const getLevelClass = (level, count) => {
    if (count === 0 || level === "NONE") return styles.level0;
    if (level === "FIRST_QUARTILE" || count <= 2) return styles.level1;
    if (level === "SECOND_QUARTILE" || count <= 5) return styles.level2;
    if (level === "THIRD_QUARTILE" || count <= 9) return styles.level3;
    return styles.level4;
  };

  const handleCellHover = (day, e) => {
    if (!containerRef.current) return;
    const rect = e.target.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const dateFormatted = day.dateObj.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });

    setTooltip({
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top - containerRect.top,
      date: dateFormatted,
      count: day.count,
    });
  };

  const handleCellLeave = () => {
    setTooltip(null);
  };

  const totalContributions = calendarData?.totalContributions || 0;

  return (
    <section className={styles.githubSection} id="github">
      <div className={styles.githubContainer}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.headerTitleGroup}>
              <span className={styles.sectionIndex}>[ 03 ]</span>
              <h2 className={styles.sectionTitle}>GitHub Contributions</h2>
            </div>
            <p className={styles.sectionSubtitle}>
              Open source activity, commits, and engineering velocity.
            </p>
          </div>

          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.profileLinkBtn}
            title="Open GitHub Profile in a new tab"
          >
            <span>View GitHub Profile</span>
            <ExternalLink size={15} />
          </a>
        </div>

        {/* Loading State */}
        {loading && (
          <div className={styles.skeletonContainer}>
            <div className={styles.skeletonStrip} />
            <div className={styles.skeletonCalendar} />
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className={styles.errorCard}>
            <AlertCircle size={40} className={styles.errorIcon} />
            <h3 className={styles.errorTitle}>Service Notice</h3>
            <p className={styles.errorMessage}>{error}</p>
            <div className={styles.errorActions}>
              <button
                className={styles.retryBtn}
                onClick={() => fetchContributions(true)}
              >
                <RefreshCw size={13} style={{ marginRight: "6px" }} />
                Retry
              </button>
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.profileLinkBtn}
              >
                <span>View On GitHub</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        )}

        {/* Dynamic Content */}
        {!loading && !error && calendarData && (
          <div className={styles.mainLayout}>
            {/* Overview Metric Strip */}
            <div className={styles.overviewStrip}>
              {/* Profile Card */}
              <div className={`${styles.overviewCard} ${styles.userOverviewCard}`}>
                <div className={styles.cardTop}>
                  <span className={styles.cardLabel}>Profile</span>
                  <Github size={20} className={styles.cardIcon} />
                </div>
                <div className={styles.userCardBody}>
                  <img
                    src={`https://github.com/${GITHUB_USERNAME}.png`}
                    alt={GITHUB_USERNAME}
                    className={styles.userAvatar}
                  />
                  <div className={styles.userInfo}>
                    <span className={styles.userName}>{GITHUB_USERNAME}</span>
                    <span className={styles.userHandle}>github.com/{GITHUB_USERNAME}</span>
                  </div>
                </div>
              </div>

              {/* Total Contributions */}
              <div className={styles.overviewCard}>
                <div className={styles.cardTop}>
                  <span className={styles.cardLabel}>Yearly Contributions</span>
                  <GitCommit size={18} className={styles.cardIcon} />
                </div>
                <div>
                  <div className={styles.statValue}>{totalContributions.toLocaleString()}</div>
                  <span className={styles.statMeta}>Commits, PRs & reviews</span>
                </div>
              </div>

              {/* Active Days */}
              <div className={styles.overviewCard}>
                <div className={styles.cardTop}>
                  <span className={styles.cardLabel}>Active Days</span>
                  <CalendarCheck size={18} className={styles.cardIcon} />
                </div>
                <div>
                  <div className={styles.statValue}>{activeDaysCount} Days</div>
                  <span className={styles.statMeta}>Days with activity</span>
                </div>
              </div>

              {/* Peak Single Day */}
              <div className={styles.overviewCard}>
                <div className={styles.cardTop}>
                  <span className={styles.cardLabel}>Peak Day</span>
                  <Flame size={18} style={{ color: "var(--accent-amber)" }} />
                </div>
                <div>
                  <div className={styles.statValue}>{maxDayCount}</div>
                  <span className={styles.statMeta}>Most commits in a day</span>
                </div>
              </div>
            </div>

            {/* Calendar Card */}
            <div className={styles.calendarCard} ref={containerRef}>
              {/* Floating Tooltip */}
              {tooltip && (
                <div
                  className={styles.tooltip}
                  style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
                >
                  <span className={styles.tooltipDate}>{tooltip.date}</span>
                  <span className={styles.tooltipCount}>
                    {tooltip.count === 0
                      ? "No contributions"
                      : `${tooltip.count} contribution${
                          tooltip.count === 1 ? "" : "s"
                        }`}
                  </span>
                </div>
              )}

              <div className={styles.calendarCardHeader}>
                <div className={styles.calendarTitleGroup}>
                  <GitCommit size={18} style={{ color: "var(--accent-amber)" }} />
                  <h3 className={styles.calendarTitle}>Activity Heatmap</h3>
                </div>
                <div className={styles.periodPill}>
                  Last 12 Months
                </div>
              </div>

              {/* SVG Heatmap */}
              <div className={styles.calendarScrollArea}>
                <svg
                  viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
                  className={styles.calendarSvg}
                  preserveAspectRatio="xMinYMin meet"
                >
                  {/* Month labels */}
                  {monthHeaders.map((m, idx) => (
                    <text
                      key={idx}
                      x={LEFT_PAD + m.weekIndex * STEP}
                      y={14}
                      className={styles.monthLabelText}
                    >
                      {m.name}
                    </text>
                  ))}

                  {/* Weekday labels */}
                  {WEEKDAYS.map((w, idx) => {
                    if (!w.label) return null;
                    return (
                      <text
                        key={idx}
                        x={LEFT_PAD - 8}
                        y={TOP_PAD + w.row * STEP + CELL_SIZE * 0.78}
                        className={styles.weekdayLabelText}
                      >
                        {w.label}
                      </text>
                    );
                  })}

                  {/* Day cells */}
                  {normalizedWeeks.map((week, wIdx) =>
                    week.map((day) => {
                      const x = LEFT_PAD + wIdx * STEP;
                      const y = TOP_PAD + day.weekday * STEP;

                      return (
                        <rect
                          key={day.date}
                          x={x}
                          y={y}
                          width={CELL_SIZE}
                          height={CELL_SIZE}
                          rx={2.5}
                          ry={2.5}
                          className={`${styles.dayRect} ${getLevelClass(
                            day.level,
                            day.count
                          )}`}
                          onMouseEnter={(e) => handleCellHover(day, e)}
                          onMouseLeave={handleCellLeave}
                        />
                      );
                    })
                  )}
                </svg>
              </div>

              {/* Footer / Legend */}
              <div className={styles.calendarFooter}>
                <div className={styles.totalSummary}>
                  <span>Total contributions in the last year:</span>
                  <span className={styles.highlightValue}>
                    {totalContributions.toLocaleString()}
                  </span>
                </div>

                <div className={styles.legend}>
                  <span className={styles.legendText}>Less</span>
                  <span className={`${styles.legendCell} ${styles.level0}`} title="No contributions" />
                  <span className={`${styles.legendCell} ${styles.level1}`} title="1-2 contributions" />
                  <span className={`${styles.legendCell} ${styles.level2}`} title="3-5 contributions" />
                  <span className={`${styles.legendCell} ${styles.level3}`} title="6-9 contributions" />
                  <span className={`${styles.legendCell} ${styles.level4}`} title="10+ contributions" />
                  <span className={styles.legendText}>More</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GitHubContributions;
