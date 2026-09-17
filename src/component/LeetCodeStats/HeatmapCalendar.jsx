import React, { useMemo, useState, useRef } from "react";
import styles from "./HeatmapCalendar.module.css";

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
const SVG_WIDTH = LEFT_PAD + TOTAL_WEEKS * STEP; // 32 + 53 * 17 = 933
const SVG_HEIGHT = TOP_PAD + 7 * STEP + 4; // 26 + 119 + 4 = 149

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
        const iso = d.toISOString().slice(0, 10);
        map[iso] = (map[iso] || 0) + numCount;
        total += numCount;
      }
    }

    return { dateMap: map, totalSubmissionsInYear: total };
  }, [submissionCalendar]);

  // Construct 53 weeks of days ending on the current week's Saturday
  const { weeks, monthHeaders } = useMemo(() => {
    const today = new Date();
    // Normalize to midnight UTC
    const end = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
    );

    // Current day of week (0 = Sun, 6 = Sat)
    const endDayOfWeek = end.getUTCDay();
    // End grid on the upcoming Saturday
    const gridEnd = new Date(end);
    gridEnd.setUTCDate(gridEnd.getUTCDate() + (6 - endDayOfWeek));

    // Start grid 53 weeks prior
    const gridStart = new Date(gridEnd);
    gridStart.setUTCDate(gridStart.getUTCDate() - (TOTAL_WEEKS * 7 - 1));

    const weeksList = [];
    const months = [];
    let lastMonth = -1;

    let current = new Date(gridStart);
    for (let w = 0; w < TOTAL_WEEKS; w++) {
      const days = [];
      let monthDetected = -1;

      for (let d = 0; d < 7; d++) {
        const dateCopy = new Date(current);
        const iso = dateCopy.toISOString().slice(0, 10);
        const count = dateMap[iso] || 0;
        const isFuture = dateCopy > end;

        if (d === 0) {
          monthDetected = dateCopy.getUTCMonth();
        }

        days.push({
          date: dateCopy,
          iso,
          count,
          isFuture,
          col: w,
          row: d,
        });

        current.setUTCDate(current.getUTCDate() + 1);
      }

      // Add month label if month has changed and not too close to the end (week 51+)
      if (monthDetected !== -1 && monthDetected !== lastMonth) {
        if (w < 51) {
          months.push({ weekIndex: w, name: MONTH_NAMES[monthDetected] });
        }
        lastMonth = monthDetected;
      }

      weeksList.push(days);
    }

    return { weeks: weeksList, monthHeaders: months };
  }, [dateMap]);

  const getLevelClass = (count, isFuture) => {
    if (isFuture) return styles.cellFuture;
    if (count === 0) return styles.cellLevel0;
    if (count <= 2) return styles.cellLevel1;
    if (count <= 5) return styles.cellLevel2;
    if (count <= 9) return styles.cellLevel3;
    return styles.cellLevel4;
  };

  const handleCellHover = (day, e) => {
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
      date: dateFormatted,
      count: day.count,
    });
  };

  const handleCellLeave = () => {
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

      {/* Responsive SVG Calendar Container */}
      <div className={styles.calendarSvgContainer}>
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className={styles.heatmapSvg}
          preserveAspectRatio="xMinYMin meet"
        >
          {/* Month Labels */}
          {monthHeaders.map((m, idx) => (
            <text
              key={idx}
              x={LEFT_PAD + m.weekIndex * STEP}
              y={14}
              className={styles.monthText}
            >
              {m.name}
            </text>
          ))}

          {/* Weekday Labels (Mon, Wed, Fri) */}
          {WEEKDAYS.map((w, idx) => {
            if (!w.label) return null;
            return (
              <text
                key={idx}
                x={LEFT_PAD - 8}
                y={TOP_PAD + w.row * STEP + CELL_SIZE * 0.78}
                className={styles.weekdayText}
              >
                {w.label}
              </text>
            );
          })}

          {/* Heatmap Grid of Day Rectangles */}
          {weeks.map((week, wIdx) =>
            week.map((day) => {
              const x = LEFT_PAD + wIdx * STEP;
              const y = TOP_PAD + day.row * STEP;

              return (
                <rect
                  key={day.iso}
                  x={x}
                  y={y}
                  width={CELL_SIZE}
                  height={CELL_SIZE}
                  rx={2.5}
                  ry={2.5}
                  className={`${styles.dayRect} ${getLevelClass(
                    day.count,
                    day.isFuture
                  )}`}
                  onMouseEnter={(e) => handleCellHover(day, e)}
                  onMouseLeave={handleCellLeave}
                />
              );
            })
          )}
        </svg>
      </div>

      {/* Heatmap Footer: Total Submissions & Intensity Legend */}
      <div className={styles.heatmapFooter}>
        <div className={styles.activitySummary}>
          <span>Submissions in the past year:</span>
          <span className={styles.highlightValue}>{totalSubmissionsInYear}</span>
        </div>

        <div className={styles.legend}>
          <span className={styles.legendText}>Less</span>
          <span className={`${styles.legendCell} ${styles.cellLevel0}`} title="0 submissions" />
          <span className={`${styles.legendCell} ${styles.cellLevel1}`} title="1-2 submissions" />
          <span className={`${styles.legendCell} ${styles.cellLevel2}`} title="3-5 submissions" />
          <span className={`${styles.legendCell} ${styles.cellLevel3}`} title="6-9 submissions" />
          <span className={`${styles.legendCell} ${styles.cellLevel4}`} title="10+ submissions" />
          <span className={styles.legendText}>More</span>
        </div>
      </div>
    </div>
  );
};

export default HeatmapCalendar;
