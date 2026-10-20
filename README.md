# Medha (मेधा)

**Multilingual Education through Dictation, Highlights & AI**

*Medha* is Sanskrit for intellect and retentive memory. It is a live lecture note-taker for multilingual engineering classrooms.

Technical classrooms in India bring together students with many different mother tongues. Medha lets a teacher teach normally while the browser turns the lecture into written notes. The teacher reviews and corrects the notes after class and shares one file with students. Each student can then read the notes in their own language: Hindi, Bengali, Assamese, Manipuri, Tamil, Telugu and more.

Developed by **Dr. Bipul Das**, Department of Mechanical Engineering, NIT Silchar.

## Features

- **Live transcription.** Speech-to-text runs continuously during the class, restarts by itself after pauses, and shows a running timer, word count and live captions.
- **Automatic highlighting.** Each sentence is classified as an *Exam tip*, *Definition*, *Formula* or *Key point*, based on the cue phrases teachers naturally use ("is defined as", "remember", "equals", "important for your exam").
- **Teacher review.** Any line can be corrected in place. The teacher can override a highlight, delete stray lines, and jump to any highlight from the summary panel.
- **One-file sharing.** The app exports a self-contained HTML page that opens in any browser on a phone or laptop, with no app install and no login. Notes can also be copied as plain text for WhatsApp, Moodle or email.
- **Bhashini integration (Government of India, MeitY).**
  - *Translation:* the teacher translates the reviewed notes into any of 22 Indian languages, including Assamese, Bodo, Manipuri and Santali. The translations are packed into the student file, so students need no account or key and can switch languages offline.
  - *Speech recognition:* teachers can lecture in Indian languages that browsers can't transcribe, such as Bodo or Manipuri. The Bhashini engine captures the mic, resamples to 16 kHz, splits the audio at natural pauses and sends short WAV clips for recognition.
- **AI assistant (Google Gemini or Anthropic Claude).**
  - *Clean-up:* fixes misheard technical terms using the course and topic as context, adds punctuation, writes spoken formulas in symbols (e.g. "Q equals mu P divided by v" → `Q = μP / v`), turns code-mixed speech into clear notes, and removes filler lines. The teacher can undo all AI changes in one click, and cleaned lines carry an "AI" badge for review.
  - *Smarter highlights:* the AI's judgement replaces the cue-phrase rules, but a teacher's manual choice always wins.
  - *Study notes:* a summary, topic-wise points, formulas with symbol meanings, and revision questions with model answers. Everything is editable and goes into the student file, and it can be translated with Bhashini.
- **Classes with teacher approval (sign-in).** Teachers create a class and share its code or join link. Students sign in with Google or an email code and ask to join, and the teacher approves, declines or removes them. Notes published to a class can be opened only by approved students. This is enforced by the database's row-level security, not just hidden in the app.
- **AI quiz with instant scores.** After the lecture, AI writes five multiple-choice questions from it, each with an explanation, and the teacher edits them. The quiz travels inside the student notes file:
  - Students enter their name and roll number, answer, and submit once. They see their score and the explanations immediately.
  - Students send their result to the teacher with one tap (WhatsApp, if the teacher adds a number) or by copy and paste. Results travel as a coded message, so no login, server or AI key is needed on the student's side.
  - The teacher pastes the collected messages into Medha to build a class score sheet (roll, name, marks per question, total, percentage), which can be copied or downloaded for Excel. The first submission from each roll number counts.
  - It is a practice tool: the correct answers are inside the notes file, so it should not be used for formal examinations.
- **Translation for students.** The student page has a "Read in…" selector. Teacher-translated (Bhashini) languages switch instantly. Any other language is translated on the device by Chrome's built-in Translator API, with Google Translate links as a fallback.
- **Print or save as PDF** from the student page.
- **Resume work.** Drafts are saved automatically in the browser. An editable copy (.json), or any exported student file, can be reopened later.
- **Demo mode.** A sample lecture on friction stir welding plays without a microphone, which is useful for demonstrations.

## How it works

| Part | Approach |
|---|---|
| Speech recognition | Two engines. **Browser:** Web Speech API, continuous mode with auto-restart. **Bhashini:** Web Audio capture → 16 kHz mono → pause-based segmentation (≥3 s clip, 700 ms silence, 14 s cap) → WAV → Bhashini ASR, with requests queued in order |
| Bhashini client | Two-step ULCA flow: `getModelsPipeline` returns the service ID and inference key per task and language pair (cached), then calls the Dhruva inference endpoint; translations are batched 20 lines per call |
| Highlight detection | Ordered rule-based classifier over cue-phrase patterns (exam → definition → formula → key point); teacher overrides are stored per line |
| AI layer | Provider-agnostic client (Gemini `generateContent` with JSON response mode, or Claude Messages API) using structured JSON prompts. Clean-up runs in 40-line batches with preceding context, keeps line IDs so timestamps survive, and is validated before it is applied; study notes are generated from the reviewed transcript in one call |
| Highlight precedence | teacher's choice → AI category → rule-based cue phrases |
| Accounts and access | Supabase Auth (Google OAuth, email one-time code). Postgres tables `classes`, `memberships` and `lectures`, protected by row-level security policies. Students join only through a `join_class()` function and can never approve themselves; teachers may change only a request's status. The rules are verified by 21 automated access tests |
| Storage | `localStorage` draft; JSON export; data embedded in the exported HTML so it can be re-imported |
| Translation | Chrome Translator API with download progress; Google Translate deep links as fallback, chunked to fit URL limits |
| Stack | One HTML file, plain JavaScript and CSS, no build step, no server, no dependencies |

## Run it

1. Download `index.html` and open it in **Google Chrome** or **Microsoft Edge**.
2. Allow microphone access when asked.
3. Choose the teaching language and press the red button.

### Install Medha as an app

Medha is an installable web app (PWA). Once it is on GitHub Pages, open the link in Chrome on Android, or Chrome or Edge on a computer, and tap **Install Medha app** (or Chrome's menu → **Install app** / **Add to Home screen**). Medha then gets its own icon, opens full-screen, and starts even without internet. Recording, AI and translation still need internet. To publish on the Google Play Store later, the same site can be packaged with [PWABuilder](https://www.pwabuilder.com).

### Publish free on GitHub Pages

1. Create a GitHub repository named `medha` and upload all files from the folder: `index.html`, `config.js`, `manifest.webmanifest`, `sw.js`, the four icon `.png` files, `supabase-setup.sql`, `README.md` and `LICENSE`.
2. Open **Settings → Pages**, set *Source* to *Deploy from a branch*, choose `main` and `/ (root)`, then save.
3. After a minute the app is live at `https://<your-username>.github.io/medha/`.

### Set up classes and sign-in (one time, about 15 minutes)

Everything else works without this. You only need it for classes, approval and publishing.

1. **Create the project.** Sign up free at [supabase.com](https://supabase.com), tap **New project**, give it a name (e.g. `medha`), set a database password, and choose the **Mumbai (ap-south-1)** region.
2. **Create the tables and rules.** Open **SQL Editor → New query**, paste the whole of `supabase-setup.sql`, and press **Run**. It should say "Success. No rows returned".
3. **Point sign-in back to your site.** Open **Authentication → URL Configuration**. Set **Site URL** to your app address (e.g. `https://YOUR-USERNAME.github.io/medha/`) and add the same address under **Redirect URLs**.
4. **Let the sign-in email carry a code.** Open **Authentication → Emails → Magic Link**, and add this line to the template: `Your Medha code: {{ .Token }}`. Students can then either tap the link or type the code.
5. **Connect the app.** Open **Project Settings → API Keys** and copy the **publishable** key (it starts with `sb_publishable_`; older projects show an "anon public" key instead). Copy the **Project URL** from **Project Settings → Data API**, or from the **Connect** button. Put both into `config.js` and upload it to the same GitHub repository as `index.html`. Never use the *secret* key.
6. **Allow students' email to arrive (needed before a real class).** Supabase's built-in email service sends only a handful of emails per hour, and only to your own team's addresses. Use one of these:
   - **Google sign-in (recommended):** in Google Cloud Console, create an *OAuth client ID* (type *Web application*) with the redirect URI shown in Supabase under **Authentication → Providers → Google**. Paste the client ID and secret there and switch Google on. Students then tap *Continue with Google*, with no emails involved.
   - **Your own email sender:** add a free SMTP service (e.g. Brevo or Resend) under **Authentication → Emails → SMTP Settings**.

The free Supabase plan is enough for a pilot. Free projects pause after 7 days without any use; if that happens, open the Supabase dashboard and press **Resume**.

### Connect Bhashini

1. Register at [bhashini.gov.in/ulca](https://bhashini.gov.in/ulca) and open **My Profile** to get your **User ID** and **ULCA API key**.
2. In Medha, open **Bhashini connection**, paste both values and press **Save and test**.
3. The key is stored only in the teacher's browser. It is never written into files shared with students.

### Connect the AI assistant

1. Get a free Gemini key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey), or a Claude key at [console.anthropic.com](https://console.anthropic.com).
2. Open **AI assistant**, choose the provider, paste the key and press **Save and test**. The model name can be changed if providers release newer models.
3. Choose **Write cleaned notes in → English** if you teach in a mix of English and a regional language but want English notes.

## Privacy and limitations

- With classes switched on, Medha stores each student's name, roll number and email, and published notes, in your Supabase project. Tell students what is stored and why before they join. Under India's DPDP Act, you, or your institution, are responsible for this data. Removing a student or deleting a class removes their access immediately.
- AI clean-up and study notes send the lecture text, never audio, to the chosen AI provider. On Gemini's free tier, Google may use that text to improve its products.

- Chrome and Edge send the audio to their own cloud speech service for recognition, so an internet connection is needed while recording. Medha itself has no server and stores nothing outside the teacher's browser.
- Live transcription works in Chrome and Edge (desktop and Android). Firefox and Safari can still use the demo, editing and export.
- With the Bhashini engine, short audio clips are sent to Bhashini's servers. Automatic highlighting currently works on English text; for other teaching languages, lines are highlighted manually.
- Recognition accuracy depends on the microphone and room noise. A clip-on or headset mic works best.
- Machine translation can mistranslate technical terms. The student page lets students switch back to the original text at any time.

## Roadmap

- Diagram and board-photo attachments per lecture
- A course archive that groups lectures by subject

## Access

Medha is available only to teachers approved by the author. Each approved teacher receives a personal access code, which Medha asks for once per device. Students do not need a code: the notes files they receive always open.

## License

Copyright © 2026 Dr. Bipul Das. All rights reserved. No part of Medha may be copied, modified, redistributed or hosted without written permission. See `LICENSE`.
