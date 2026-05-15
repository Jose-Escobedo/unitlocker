# Wiring the Screenshot Extractor into Your Admin Page

You only need to change 2 things in your existing `app/admin/page.js`:

---

## 1. Add the import at the top

Add this with your other imports:

```js
import ScreenshotExtractor from '@/components/admin/ScreenshotExtractor';
```

(Or wherever you want to put the component — `components/admin/` is a clean spot.)

---

## 2. Add the `handleExtracted` function inside `AdminPage()`

Put this right above your `handleSubmit` function:

```js
const handleExtracted = (data) => {
  setForm(f => ({
    ...f,
    sport: data.sport ?? f.sport,
    playerName: data.playerName ?? f.playerName,
    team: data.team ?? f.team,
    matchup: data.matchup ?? f.matchup,
    eventDate: data.eventDate ? toDatetimeLocal(data.eventDate) : f.eventDate,
    stat: data.stat ?? f.stat,
    line: data.line ?? f.line,
    // stats grid
    avgL10: data.stats?.avgL10 ?? '',
    l5:     data.stats?.l5     ?? '',
    l10:    data.stats?.l10    ?? '',
    l15:    data.stats?.l15    ?? '',
    h2h:    data.stats?.h2h    ?? '',
  }));
  // Stash history arrays for submission
  setExtractedHistory({
    history:    data.stats?.history    ?? [],
    h2hHistory: data.stats?.h2hHistory ?? [],
  });
  // Auto-open the stats accordion since we just filled it
  setStatsOpen(true);
};
```

And add this state near your other useState calls (like next to `const [form, setForm] = useState(EMPTY_FORM);`):

```js
const [extractedHistory, setExtractedHistory] = useState({ history: [], h2hHistory: [] });
```

---

## 3. Update `buildStatsPayload` to include history

Find your `buildStatsPayload` function and update it to merge in the extracted history:

```js
const buildStatsPayload = () => {
  const { avgL10, diff, l5, l10, l15, h2h } = form;
  const hasStats = [avgL10, diff, l5, l10, l15, h2h].some(v => v !== '');
  const hasHistory = extractedHistory.history.length > 0 || extractedHistory.h2hHistory.length > 0;
  if (!hasStats && !hasHistory) return undefined;
  const obj = {};
  if (avgL10 !== '') obj.avgL10 = parseFloat(avgL10);
  if (diff   !== '') obj.diff   = parseFloat(diff);
  if (l5     !== '') obj.l5     = l5;
  if (l10    !== '') obj.l10    = l10;
  if (l15    !== '') obj.l15    = l15;
  if (h2h    !== '') obj.h2h    = h2h;
  if (extractedHistory.history.length)    obj.history    = extractedHistory.history;
  if (extractedHistory.h2hHistory.length) obj.h2hHistory = extractedHistory.h2hHistory;
  return obj;
};
```

---

## 4. Drop the component into the JSX

Find the section where your form lives. Right ABOVE this line:

```jsx
{/* ── FORM ── */}
<div style={{ borderRadius: 20, overflow: 'hidden', marginBottom: 20, ...
```

Add:

```jsx
<ScreenshotExtractor onExtracted={handleExtracted} />
```

---

## 5. (Optional) Clear history on edit/cancel

If you want clean state when switching between editing/creating, update `handleCancelEdit`:

```js
const handleCancelEdit = () => {
  setEditingId(null);
  setForm(EMPTY_FORM);
  setExtractedHistory({ history: [], h2hHistory: [] });
  setFormMsg(null);
  setStatsOpen(false);
};
```

And in `handleEdit`, you can pre-load existing history:

```js
setExtractedHistory({
  history:    pick.stats?.history    ?? [],
  h2hHistory: pick.stats?.h2hHistory ?? [],
});
```

---

## File Placement Summary

- `pages/api/admin/extract-picks.js` ← the API route
- `components/admin/ScreenshotExtractor.js` ← the upload component
- `.env.local` ← add `ANTHROPIC_API_KEY=sk-ant-...`

---

## Make Sure Your Pick Model Supports History

If your `models/Pick.js` doesn't already have `stats.history` and `stats.h2hHistory` arrays defined, MongoDB will still store them (it accepts arbitrary nested objects), so you don't strictly need to update the schema. But for type safety you can add:

```js
stats: {
  avgL10: Number,
  diff:   Number,
  l5:  String,
  l10: String,
  l15: String,
  h2h: String,
  history:    [{ date: String, value: Number, label: String }],
  h2hHistory: [{ date: String, value: Number, label: String }],
},
```
