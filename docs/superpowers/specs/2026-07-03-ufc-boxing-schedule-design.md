# UFC & Boxing Fight Schedule — Sports Tab

**Date:** 2026-07-03 · **Status:** Approved by user

## Goal
Show upcoming UFC events and boxing fight cards in the Sports tab, date-grouped
like the football list, with honest "watch" affordances.

## Data Source
TheSportsDB free API (key `123`), CORS-open, no proxy needed:
- UFC: `https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=4443`
- Boxing: `https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=4445`

`strTimestamp` is UTC without a `Z` suffix — append `Z` before parsing, then
format in `Asia/Kolkata`.

## Components (all in app.js, Sports section)
- `fetchFightEvents()` — parallel fetch of both leagues via `Promise.allSettled`
  (one league failing must not sink the other), 30-minute cache.
- `fightStatus(e)` — UPCOMING before start, LIVE for 6h window, ENDED after.
- `refreshFightEvents()` — renders section header + date-grouped event cards
  into `#fightSection`; renders nothing (clears) on total failure.
- Section position: between Boxing & MMA channels row and Football header.
- Card: league pill (UFC ember / BOXING brass), event title, IST time, status
  badge. When LIVE: buttons to open MMA TV and FightBox in the in-app player.
- 2-minute Sports auto-refresh loop also calls `refreshFightEvents()`
  (cheap — cache-hit re-render keeps status badges current).

## Error Handling
- API down or empty: fight section disappears entirely; football unaffected.
- Malformed events (no timestamp) are skipped.

## Testing
Verified endpoints live (UFC 329 on 2026-07-11, Mason vs Bell 2026-07-04) and
CORS headers (`Access-Control-Allow-Origin: *`) before design approval.
