# Public Release Security Checklist

Checklist for preparing this repository for a public release. This document is safe to share; it describes categories of sensitive data and remediation steps without listing private values.

---

## Executive summary

| Area | Status |
|------|--------|
| `.env` / secrets in current git tree | **Clean** — never committed |
| Hardcoded API keys in current code | **Clean** |
| Personal email in current code | **Clean** (removed) |
| Personal email / LAN IP in git history | **Present** — needs history cleanup |
| Local `.env` files on disk | **Contain real secrets** — must stay untracked |
| Mock data user UUID | **Review** — replace with an obvious fake UUID if it matches a real account |

Current tracked branches are in good shape: no `.env` files, API keys, or personal email in HEAD. The main risks before going public are **local secret files**, **old git history**, and a few **project identifiers** already present in the codebase.

---

## Findings by severity

### Critical — local only (not in git, but must never be committed)

These files exist on disk and are correctly gitignored, but they contain live credentials:

| File | Concern |
|------|---------|
| `apps/backend/.env` | Supabase **service role key** (highest risk), anon key, JWT key ID, project URL |
| `apps/backend/.env.bak` | Same as above |
| `apps/frontend/web/.env` | Supabase URL + anon/publishable key |
| `apps/frontend/web/.env.bak` | Same as above |
| `apps/frontend/mobile/.env` | Supabase URL + anon key + local network URL in `EXPO_PUBLIC_BASE_URL` |
| `apps/frontend/mobile/.env.bak` | Same as above |

No actual Supabase key values were found in git history. `.gitignore` is working.

**Action:** Rotate credentials before going public, especially the **service role key**. Update local `.env` files only — never commit them.

---

### Medium — in git history (will become public unless history is rewritten)

These were removed from current code but may remain in commit history:

| Item | Risk |
|------|------|
| Personal email address (previously hardcoded in mobile login UI) | PII exposure |
| Private LAN IP addresses (previously in mobile services / backend CORS) | Network footprint |
| `apps/frontend/mobile/android/app/debug.keystore` | Low (standard Android debug keystore), but unnecessary in history |
| `backup/mobile-bak/` directories | Clutter / possible stale config |
| `.secrets.baseline` files | Low — detect-secrets baselines |

---

### Low / intentional — safe to publish, but worth reviewing

| Item | Location | Notes |
|------|----------|-------|
| Supabase project ID | `package.json` (`generate-schema-types` script) | Identifies the Supabase project; anon keys are client-facing by design |
| Full DB schema types | `packages/schema/src/lib/common/database.types.ts` | Normal for Supabase projects |
| Mock user UUIDs | `packages/mocks/`, `apps/backend/mocks/` | Use clearly fake UUIDs in sample data |
| Expo owner | `apps/frontend/mobile/app.json` | Public Expo account metadata |
| EAS project ID | `apps/frontend/mobile/app.json` | Links to Expo project |
| Business contact email | `CallsToAction.tsx` | Intentional public contact |

---

### Gaps to address before public release

- Add `.env.example` files for backend, web, and mobile
- Enable GitHub secret scanning
- Add pre-push or CI secret scanning (e.g. `gitleaks`)
- Pre-commit hook runs lint/tests only — no secret scanning yet

---

## Plan of action

### Phase 1 — Before making the repo public

1. **Rotate Supabase credentials** (Supabase Dashboard → Project Settings → API):
   - Rotate **service role key** (mandatory precaution)
   - Optionally rotate anon key
   - Update local `.env` files only

2. **Verify nothing sensitive is staged:**

   ```bash
   git status
   git ls-files | rg -i '(\.env|secret|credential|keystore|\.bak)'
   ```

3. **Add `.env.example` files** (placeholders only):
   - `apps/backend/.env.example`
   - `apps/frontend/web/.env.example`
   - `apps/frontend/mobile/.env.example`

   Use placeholders like `your_supabase_url`, not real values.

4. **Sanitize mock data** — use obviously fake UUIDs (e.g. `00000000-0000-4000-8000-000000000001`).

5. **Harden `.gitignore`** — add explicit `.env` entries to `apps/frontend/web/.gitignore` and `apps/frontend/mobile/.gitignore` if they rely only on the root ignore.

---

### Phase 2 — Clean git history (recommended before first public push)

Choose one approach while the repo is still private:

**Option A — `git filter-repo` (recommended)**

```bash
# Install: pip install git-filter-repo

# Backup first
git clone --mirror git@github.com:YOUR_ORG/calisthenics-workout-tracker.git ../cwt-backup.git

# Remove sensitive files from all history
git filter-repo --path apps/frontend/mobile/android/app/debug.keystore --invert-paths
git filter-repo --path backup/mobile-bak --invert-paths
git filter-repo --path backup/mobile-bak2 --invert-paths
git filter-repo --path .secrets.baseline --invert-paths
git filter-repo --path apps/backend/.secrets.baseline --invert-paths

# Force-push all branches (coordinate with collaborators first)
git push origin --force --all
git push origin --force --tags
```

For personal email and LAN IPs embedded in file content, use a replace-text pass (e.g. BFG Repo-Cleaner) with a private replacements file — do not commit that file.

**Option B — Fresh public repo**

Export a clean snapshot of `main` with no history. Simplest if full commit history does not need to be public.

---

### Phase 3 — After history cleanup

1. Enable **GitHub secret scanning** (Settings → Code security).
2. Add CI or pre-push scanning:

   ```bash
   gitleaks detect --source . --verbose
   ```

3. Update **README** with setup instructions referencing `.env.example` files.
4. Review **Supabase RLS policies** — anon key must not bypass row-level security.
5. Make the repo public only after Phases 1–2 are complete.

---

### Phase 4 — Ongoing hygiene

- Never commit `.env`, `.bak`, keystores, or EAS credentials
- Keep `credentials.json` and `secret_keystore.txt` gitignored (mobile app)
- Consider moving the Supabase project ID in `generate-schema-types` to an env var: `SUPABASE_PROJECT_ID`
- Delete local `.env.bak` files when no longer needed

---

## What you do not need to remove

- Auth code referencing `token`, `password`, `access_token` — normal application patterns
- `FAKE_API_KEY_ID = "AKIAIOSFODNN7EXAMPLE"` — AWS documentation example key
- Supabase anon/publishable key **usage** in client code — keep **values** in env vars only
- `database.types.ts` — fine to publish

---

## Bottom line

Before going public:

1. Rotate the **Supabase service role key**
2. **Rewrite git history** to remove PII and private network details
3. Add **`.env.example`** files and **sanitize mock data**
4. Enable **secret scanning** on GitHub
