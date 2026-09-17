import React, { useMemo, useState, useRef } from "react";
import styles from "./HeatmapCalendar.module.css";

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const WEEKDAYS = ["", "Mon", "", "Wed", "", "Fri", ""];

const HeatmapCalendar = ({ submissionCalendar = {} }) => {
  const [tooltip, setTooltip] = useState(null);
  const containerRef = useRef(null);

  // Parse submission data into a map: "YYYY-MM-DD" -> count
  const { dateMap, totalSubmissionsInYear } = useMemo(() => {
    const map = {};
    let total = 0;

    if (submissionCalendar && typeof submissionCalendar === "object") {
      for (const [timestamp, count] of Object.entries(submissionCalendar)) {
        const numCount = Number(count) || 0;
        const d = new Date(Number(timestamp) * 1000);
        // Format to YYYY-MM-DD UTC
        const iso = d.toISOString().slice(0, 10);
        map[iso] = (map[iso] || 0) + numCount;
        total += numCount;
      }
    }

    return { dateMap: map, totalSubmissionsInYear: total };
  }, [submissionCalendar]);

  // Construct a 53-week calendar matrix ending on the coming/current Saturday
  const { weeks, monthHeaders } = useMemo(() => {
    const today = new Date();
    // Normalize to midnight
    const end = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
    
    // Day of week for end date (0 = Sun, 6 = Sat)
    const endDayOfWeek = end.getUTCDay();
    // Move to the upcoming or current Saturday to complete the grid
    const gridEnd = new Date(end);
    gridEnd.setUTCDate(gridEnd.getUTCDate() + (6 - endDayOfWeek));

    // Start date: 52 full weeks prior (52 * 7 = 364 days before gridEnd, which gives 53 total columns)
    const gridStart = new Date(gridEnd);
    gridStart.setUTCDate(gridStart.getUTCDate() - (53 * 7 - 1));

    const weeksList = [];
    const months = [];
    let lastMonth = -1;

    let current = new Date(gridStart);
    for (let w = 0; w < 53; w++) {
      const days = [];
      let weekMonth = -1;

      for (let d = 0; d < 7; d++) {
        const dateCopy = new Date(current);
        const iso = dateCopy.toISOString().slice(0, 10);
        const count = dateMap[iso] || 0;
        const isFuture = dateCopy > end;

        if (d === 0) {
          weekMonth = dateCopy.getUTCMonth();
        }

        days.push({
          date: dateCopy,
          iso,
          count,
          isFuture,
        });

        current.setUTCDate(current.getUTCDate() + 1);
      }

      if (weekMonth !== -1 && weekMonth !== lastMonth) {
        months.push({ weekIndex: w, name: MONTH_NAMES[weekMonth] });
        lastMonth = weekMonth;
      }

      weeksList.push(days);
    }

    return { weeks: weeksList, monthHeaders: months };
  }, [dateMap]);

  const getIntensityClass = (count, isFuture) => {
    if (isFuture) return styles.emptyCell;
    if (count === 0) return styles.level0;
    if (count <= 2) return styles.level1;
    if (count <= 5) return styles.level2;
    if (count <= 9) return styles.level3;
    return styles.level4;
  };

  const handleMouseEnter = (day, e) => {
    if (day.isFuture || !containerRef.current) return;
    const rect = e.target.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const dateFormatted = day.date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });

    setTooltip({
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top - containerRect.top,
      text: `${day.count} submission${day.count === 1 ? "" : "s"} on ${dateFormatted}`,
      date: dateFormatted,
      count: day.count,
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <div className={styles.heatmapWrapper} ref={containerRef}>
      {/* Floating Tooltip */}
      {tooltip && (
        <div
          className={styles.tooltip}
          style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
        >
          <span className={styles.tooltipDate}>{tooltip.date}</span>
          <span className={styles.tooltipSubmissions}>
            {tooltip.count === 0
              ? "No submissions"
              : `${tooltip.count} submission${tooltip.count === 1 ? "" : "s"}`}
          </span>
        </div>
      )}

      {/* Horizontally Scrollable Heatmap */}
      <div className={styles.heatmapScrollArea}>
        <div className={styles.heatmapContent}>
          {/* Months header */}
          <div className={styles.monthsRow}>
            <span></span> {/* spacer for weekday labels */}
            {weeks.map((_, i) => {
              const header = monthHeaders.find((m) => m.weekIndex === i);
              return (
                <span key={i} className={header ? styles.monthLabel : ""}>
                  {header ? header.name : ""}
                </span>
              );
            })}
          </div>

          {/* Weekday labels + Days Grid */}
          <div className={styles.gridRow}>
            {/* Weekday indicators */}
            <div className={styles.weekdayLabels}>
              {WEEKDAYS.map((day, idx) => (
                <span key={idx} className={styles.weekdayLabel}>
                  {day}
                </span>
              ))}
            </div>

            {/* Weeks */}
            <div className={styles.weeksGrid}>
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className={styles.weekColumn}>
                  {week.map((day) => (
                    <div
                      key={day.iso}
                      className={`${styles.dayCell} ${getIntensityClass(
                        day.count,
                        day.isFuture
                      )}`}
                      onMouseEnter={(e) => handleMouseEnter(day, e)}
                      onMouseLeave={handleMouseLeave}
                      aria-label={`${day.count} submissions on ${day.iso}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Heatmap Footer: Total Submissions & Intensity Legend */}
      <div className={styles.heatmapFooter}>
        <div className={styles.activitySummary}>
          <span>Submissions in the past year:</span>
          <span className={styles.highlightValue}>{totalSubmissionsInYear}</span>
        </div>

        <div className={styles.legend}>
          <span className={styles.legendText}>Less</span>
          <span className={`${styles.legendCell} ${styles.level0}`} title="0 submissions" />
          <span className={`${styles.legendCell} ${styles.level1}`} title="1-2 submissions" />
          <span className={`${styles.legendCell} ${styles.level2}`} title="3-5 submissions" />
          <span className={`${styles.legendCell} ${styles.level3}`} title="6-9 submissions" />
          <span className={`${styles.legendCell} ${styles.level4}`} title="10+ submissions" />
          <span className={styles.legendText}>More</span>
        </div>
      </div>
    </div>
  );
};

export default HeatmapCalendar;
