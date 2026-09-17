import React, { useState, useEffect, useCallback } from "react";
import styles from "./LeetCodeStats.module.css";
import HeatmapCalendar from "./HeatmapCalendar";
import LeetCodeIcon from "../Icons/LeetCodeIcon";
import {
  ExternalLink,
  Trophy,
  Flame,
  CalendarCheck,
  Award,
  AlertCircle,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";

const USERNAME = "Aayush45123";
const LEETCODE_PROFILE_URL = `https://leetcode.com/u/${USERNAME}/`;
const API_BASE_URL = "https://leetcode-api-pied.vercel.app";
const CACHE_KEY = `leetcode_stats_${USERNAME}`;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

const LeetCodeStats = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [badgesData, setBadgesData] = useState([]);
  const [calendarData, setCalendarData] = useState(null);
  const [brokenImages, setBrokenImages] = useState({});

  const fetchData = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    // Check cache if not forcing refresh
    if (!forceRefresh) {
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
            setProfileData(parsed.profile);
            setBadgesData(parsed.badges || []);
            setCalendarData(parsed.calendar);
            setLoading(false);
            return;
          }
        }
      } catch {
        // Ignore cache parse error and proceed to network
      }
    }

    try {
      const [userRes, badgesRes, calRes] = await Promise.allSettled([
        fetch(`${API_BASE_URL}/user/${USERNAME}`),
        fetch(`${API_BASE_URL}/user/${USERNAME}/badges`),
        fetch(`${API_BASE_URL}/user/${USERNAME}/calendar`),
      ]);

      // Check if user endpoint was successful
      if (userRes.status !== "fulfilled" || !userRes.value.ok) {
        throw new Error("Failed to retrieve user statistics.");
      }

      const userData = await userRes.value.json();

      let badgesList = [];
      if (badgesRes.status === "fulfilled" && badgesRes.value.ok) {
        const badgeJson = await badgesRes.value.json();
        badgesList = Array.isArray(badgeJson.badges) ? badgeJson.badges : [];
      }

      let calJson = null;
      if (calRes.status === "fulfilled" && calRes.value.ok) {
        calJson = await calRes.value.json();
      }

      setProfileData(userData);
      setBadgesData(badgesList);
      setCalendarData(calJson);

      // Save to sessionStorage
      try {
        sessionStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            profile: userData,
            badges: badgesList,
            calendar: calJson,
            timestamp: Date.now(),
          })
        );
      } catch {
        // Storage might be full or disabled, safe to ignore
      }
    } catch (err) {
      console.error("LeetCode API error:", err);
      setError("LeetCode statistics are temporarily unavailable.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle broken badge images gracefully
  const handleBadgeImageError = (badgeId) => {
    setBrokenImages((prev) => ({ ...prev, [badgeId]: true }));
  };

  // Resolve badge image URL
  const resolveBadgeUrl = (badge) => {
    const raw = badge.medal?.config?.iconGif || badge.icon;
    if (!raw) return "";
    if (raw.startsWith("http://") || raw.startsWith("https://")) {
      return raw;
    }
    return `https://leetcode.com${raw}`;
  };

  // Helper to extract solved statistics
  const getSubmissionCounts = () => {
    const acSubmissions = profileData?.submitStats?.acSubmissionNum || [];
    const totalSubmissions = profileData?.submitStats?.totalSubmissionNum || [];

    const getCount = (diff) => {
      const item = acSubmissions.find((s) => s.difficulty.toLowerCase() === diff.toLowerCase());
      return item ? item.count : 0;
    };

    const getSubmissions = (diff) => {
      const item = totalSubmissions.find((s) => s.difficulty.toLowerCase() === diff.toLowerCase());
      return item ? item.submissions : 0;
    };

    const totalSolved = getCount("all");
    const easySolved = getCount("easy");
    const mediumSolved = getCount("medium");
    const hardSolved = getCount("hard");

    const totalSubmits = getSubmissions("all");

    const easyPct = totalSolved ? ((easySolved / totalSolved) * 100).toFixed(1) : 0;
    const mediumPct = totalSolved ? ((mediumSolved / totalSolved) * 100).toFixed(1) : 0;
    const hardPct = totalSolved ? ((hardSolved / totalSolved) * 100).toFixed(1) : 0;

    return {
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      totalSubmits,
      easyPct,
      mediumPct,
      hardPct,
    };
  };

  const stats = getSubmissionCounts();
  const ranking = profileData?.profile?.ranking
    ? `#${profileData.profile.ranking.toLocaleString()}`
    : "—";
  const streak = calendarData?.streak !== undefined ? `${calendarData.streak} Days` : "—";
  const activeDays =
    calendarData?.totalActiveDays !== undefined
      ? `${calendarData.totalActiveDays} Days`
      : "—";

  return (
    <section className={styles.leetcodeSection} id="leetcode">
      <div className={styles.leetcodeContainer}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.headerTitleGroup}>
              <span className={styles.sectionIndex}>[ 04 ]</span>
              <h2 className={styles.sectionTitle}>LeetCode Journey</h2>
            </div>
            <p className={styles.sectionSubtitle}>
              Consistency, problem solving, and algorithmic proficiency.
            </p>
          </div>

          <a
            href={LEETCODE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.profileLinkBtn}
            title="Open LeetCode Profile in a new tab"
          >
            <span>View LeetCode Profile</span>
            <ExternalLink size={15} />
          </a>
        </div>

        {/* Loading State */}
        {loading && (
          <div className={styles.skeletonContainer}>
            <div className={styles.skeletonStrip} />
            <div className={styles.skeletonGrid}>
              <div className={styles.skeletonCard} />
              <div className={styles.skeletonCard} />
              <div className={styles.skeletonCard} />
            </div>
            <div className={styles.skeletonHeatmap} />
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
                onClick={() => fetchData(true)}
              >
                <RefreshCw size={13} style={{ marginRight: "6px" }} />
                Retry
              </button>
              <a
                href={LEETCODE_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.profileLinkBtn}
              >
                <span>View On LeetCode</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        )}

        {/* Dynamic Content */}
        {!loading && !error && profileData && (
          <div className={styles.mainLayout}>
            {/* User Overview Ledger Strip */}
            <div className={styles.overviewStrip}>
              {/* Card 1: User Handle & Avatar */}
              <div className={`${styles.overviewCard} ${styles.userOverviewCard}`}>
                <div className={styles.cardTop}>
                  <span className={styles.cardLabel}>Profile</span>
                  <LeetCodeIcon size={20} className={styles.cardIcon} />
                </div>
                <div className={styles.userCardBody}>
                  <img
                    src={profileData.profile?.userAvatar || "https://assets.leetcode.com/users/default_avatar.jpg"}
                    alt={USERNAME}
                    className={styles.userAvatar}
                  />
                  <div className={styles.userInfo}>
                    <span className={styles.userName}>{USERNAME}</span>
                    <span className={styles.userHandle}>leetcode.com/u/{USERNAME}</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Global Ranking */}
              <div className={styles.overviewCard}>
                <div className={styles.cardTop}>
                  <span className={styles.cardLabel}>Global Rank</span>
                  <Trophy size={18} className={styles.cardIcon} />
                </div>
                <div>
                  <div className={styles.statValue}>{ranking}</div>
                  <span className={styles.statMeta}>Worldwide position</span>
                </div>
              </div>

              {/* Card 3: Total Solved */}
              <div className={styles.overviewCard}>
                <div className={styles.cardTop}>
                  <span className={styles.cardLabel}>Total Solved</span>
                  <CheckCircle2 size={18} className={styles.cardIcon} />
                </div>
                <div>
                  <div className={styles.statValue}>{stats.totalSolved}</div>
                  <span className={styles.statMeta}>Problems accepted</span>
                </div>
              </div>

              {/* Card 4: Current Streak */}
              <div className={styles.overviewCard}>
                <div className={styles.cardTop}>
                  <span className={styles.cardLabel}>Current Streak</span>
                  <Flame size={18} style={{ color: "var(--accent-amber)" }} />
                </div>
                <div>
                  <div className={styles.statValue}>{streak}</div>
                  <span className={styles.statMeta}>Consecutive coding</span>
                </div>
              </div>

              {/* Card 5: Total Active Days */}
              <div className={styles.overviewCard}>
                <div className={styles.cardTop}>
                  <span className={styles.cardLabel}>Active Days</span>
                  <CalendarCheck size={18} className={styles.cardIcon} />
                </div>
                <div>
                  <div className={styles.statValue}>{activeDays}</div>
                  <span className={styles.statMeta}>Recorded submissions</span>
                </div>
              </div>
            </div>

            {/* Difficulty Breakdown Section */}
            <div className={styles.difficultySection}>
              <div className={styles.difficultyGrid}>
                {/* Easy Card */}
                <div className={`${styles.diffCard} ${styles.diffCardEasy}`}>
                  <div className={styles.diffHeader}>
                    <span className={`${styles.diffTitle} ${styles.diffTitleEasy}`}>
                      Easy
                    </span>
                    <span className={styles.diffPercent}>{stats.easyPct}%</span>
                  </div>
                  <div className={styles.diffBody}>
                    <span className={styles.diffCount}>{stats.easySolved}</span>
                    <span className={styles.diffSubmissions}>solved</span>
                  </div>
                </div>

                {/* Medium Card */}
                <div className={`${styles.diffCard} ${styles.diffCardMedium}`}>
                  <div className={styles.diffHeader}>
                    <span className={`${styles.diffTitle} ${styles.diffTitleMedium}`}>
                      Medium
                    </span>
                    <span className={styles.diffPercent}>{stats.mediumPct}%</span>
                  </div>
                  <div className={styles.diffBody}>
                    <span className={styles.diffCount}>{stats.mediumSolved}</span>
                    <span className={styles.diffSubmissions}>solved</span>
                  </div>
                </div>

                {/* Hard Card */}
                <div className={`${styles.diffCard} ${styles.diffCardHard}`}>
                  <div className={styles.diffHeader}>
                    <span className={`${styles.diffTitle} ${styles.diffTitleHard}`}>
                      Hard
                    </span>
                    <span className={styles.diffPercent}>{stats.hardPct}%</span>
                  </div>
                  <div className={styles.diffBody}>
                    <span className={styles.diffCount}>{stats.hardSolved}</span>
                    <span className={styles.diffSubmissions}>solved</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Coding Activity Calendar Heatmap */}
            <div className={styles.heatmapSectionCard}>
              <div className={styles.heatmapHeader}>
                <div className={styles.heatmapTitleGroup}>
                  <CalendarCheck size={18} style={{ color: "var(--accent-amber)" }} />
                  <h3 className={styles.heatmapTitle}>Coding Activity Heatmap</h3>
                </div>
                {calendarData?.activeYears && (
                  <div className={styles.yearPill}>
                    Active Years: {calendarData.activeYears.join(", ")}
                  </div>
                )}
              </div>

              <HeatmapCalendar
                submissionCalendar={calendarData?.submissionCalendar}
              />
            </div>

            {/* Badges Section */}
            <div className={styles.badgesSection}>
              <div className={styles.badgesHeader}>
                <div className={styles.heatmapTitleGroup}>
                  <Award size={18} style={{ color: "var(--accent-amber)" }} />
                  <h3 className={styles.badgesTitle}>Earned Badges</h3>
                </div>
                <span className={styles.badgeCountPill}>
                  {badgesData.length} Badges
                </span>
              </div>

              {badgesData.length === 0 ? (
                <div className={styles.emptyBadges}>
                  No badges published on profile yet.
                </div>
              ) : (
                <div className={styles.badgesGrid}>
                  {badgesData.map((badge, idx) => {
                    const badgeId = badge.id || idx;
                    const isBroken = brokenImages[badgeId];
                    const imgUrl = resolveBadgeUrl(badge);
                    const displayName =
                      badge.displayName || badge.shortName || badge.name || "Badge";
                    const formattedDate = badge.creationDate
                      ? new Date(badge.creationDate).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                      : null;

                    return (
                      <div
                        key={badgeId}
                        className={styles.badgeCard}
                        title={badge.hoverText || displayName}
                      >
                        <div className={styles.badgeImageWrapper}>
                          {!isBroken && imgUrl ? (
                            <img
                              src={imgUrl}
                              alt={displayName}
                              className={styles.badgeImg}
                              onError={() => handleBadgeImageError(badgeId)}
                              loading="lazy"
                            />
                          ) : (
                            <Award className={styles.badgeFallbackIcon} />
                          )}
                        </div>
                        <div className={styles.badgeInfo}>
                          <span className={styles.badgeName}>{displayName}</span>
                          <div className={styles.badgeMeta}>
                            {badge.category && (
                              <span className={styles.badgeCategory}>
                                {badge.category.replace(/_/g, " ")}
                              </span>
                            )}
                            {formattedDate && <span>{formattedDate}</span>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LeetCodeStats;
