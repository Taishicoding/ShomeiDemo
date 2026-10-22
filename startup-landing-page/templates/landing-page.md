# Shōmei Landing Page

This document records the landing page’s current content, structure, navigation, and visual direction. Use it as the reference when updating or rebuilding the page in `src/app/page.tsx`.

## Page purpose

Introduce Shōmei as a full stack property management platform. The page presents one workspace for day-to-day property operations, maintenance, contractor procurement, and urgent repairs, then directs visitors to create or enter a workspace.

## Header

### Brand

- Wordmark: **shōmei.**
- Mark: **証** inside a terracotta square.
- Brand link: `/`

### Navigation

The three text links scroll to sections on this page and are hidden on small screens:

| Label | Anchor |
| --- | --- |
| Property operations | `#platform` |
| Procurement | `#trust` |
| How it works | `#approach` |

Header actions:

- **Sign in** → `/login` (hidden on the smallest screens)
- **Enter workspace** → `/login`

## Hero

### Eyebrow

**THE FULL STACK PROPERTY MANAGEMENT PLATFORM**

### Headline

**The full stack**  
***property management platform.***

The second line is set in italic serif type and terracotta.

### Supporting copy

> Shōmei brings property operations into one workspace: keep tenants and reported issues in view, coordinate maintenance, compare service tenders, and make decisions with a clear record.

### Actions

- **Build your property workspace** → `/login`
- **Explore the platform** → `#platform`

### Benefit notes

- Tenant and maintenance visibility
- Compliance-aware procurement

Each benefit is preceded by a check icon.

## Building preview

The right side of the hero contains a framed, illustrative building profile preview.

### Preview header

- **PROPERTY MANAGEMENT · LIVE PREVIEW**
- **SHŌMEI / 01**

### Illustration

- Accessible description: “Perspective illustration of a modern strata building”
- Caption in drawing: **COMMON PROPERTY**
- Drawing subtitle: **Conceptual building sketch**
- Building profile: **8 floors · 30 m wide**
- Frontage label: **30 m frontage**
- Footer label: **CREDENTIAL-READY PROPERTY**
- Footprint label: **SQUARE FOOTPRINT**
- Floating note: **Compliance gate active**

The sketch is an inline SVG concept illustration. It is not a photograph or a real property model. Its dimensions and details are sample presentation content.

## Platform overview

This white, three-column section has the anchor `#platform` and explains the product areas.

### 01 · OPERATE

**Know what’s happening in your building**

See tenant activity, reported problems, property details, and maintenance work together.

### 02 · SOURCE

**Run tenders across building services**

Compare contractor bids and reverse tenders for services such as internet, insurance, and pool maintenance.

This card has the anchor `#trust`.

### 03 · RESPOND

**Prepare for urgent issues**

Set up an emergency contracting workflow and retain a clear record of property decisions.

This card has the anchor `#approach`.

## Footer

- **© 2026 SHŌMEI TECHNOLOGIES**
- **BUILT FOR BETTER BUILDINGS ✳**

## Visual direction

- Warm paper page background: `#fbf8f5`
- White content surfaces
- Charcoal text: `#241d20`
- Terracotta primary accent: `#b3261e`
- Deep red accent: `#761d17`
- Pale rose panels: `#f4e9e7`
- Dusty rose borders: `#e3d8db`
- Muted supporting text in gray-mauve tones
- Sans-serif interface typography with italic serif emphasis in the hero
- Thin borders, compact labels, restrained shadows, and mostly square corners
- Responsive layout: the hero stacks on smaller screens, the navigation links collapse, and the building illustration scales down

## Route and interaction summary

| Element | Behavior |
| --- | --- |
| Shōmei wordmark | Navigate to `/` |
| Sign in | Navigate to `/login` |
| Enter workspace | Navigate to `/login` |
| Build your property workspace | Navigate to `/login` |
| Explore the platform | Scroll to `#platform` |
| Property operations | Scroll to `#platform` |
| Procurement | Scroll to `#trust` |
| How it works | Scroll to `#approach` |

The landing page itself has no form submission, authentication, live property lookup, or backend interaction. Workspace setup begins after the visitor selects one of the login or workspace actions.

## Search metadata

The root layout currently sets the document title to **Shōmei — Verified procurement for strata** and the description to **Autonomous, compliance-gated tendering for commercial strata properties.** Update these in `src/app/layout.tsx` if the product positioning or landing page title changes.
