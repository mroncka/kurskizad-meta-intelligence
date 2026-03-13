# Kurskizad – Meta-Intelligence

> A 90-second Remotion educational short for the [Kurskizad](https://youtube.com) YouTube channel.

## Concept

Explores **meta-intelligence** — how organisms (people, companies, societies) form cells of collective intelligence, and what it means to truly *belong* vs. being consumed as fuel.

**Script beats (90s):**
| Time | Scene | Theme |
|------|-------|-------|
| 0–10s | Hook | Are you part of something greater? |
| 10–25s | Meta-Intelligence | The concept introduced |
| 25–38s | Food vs. Member | Most people are fuel, not participants |
| 38–55s | Family Control | Control = belonging; parent → child growth |
| 55–68s | Power | Control resurfaces through power |
| 68–78s | The Trap | Easy cells consume your agency |
| 78–90s | Build Your Cell | Create your own — start the big game |

## Visual Style

- Dark background with animated radial gradients
- Abstract **cell/organism characters** — SVG circles and spiked shapes
- Spike count = power/agency level
- Color coding:
  - 🔵 Blue `#3b82f6` — meta-intelligence, society
  - 🟡 Amber `#f59e0b` — family, warmth, resource
  - 🟢 Green `#22c55e` — agency, growth, founder
  - 🔴 Red `#ef4444` — consumption, danger, trap
  - 🟣 Purple `#a855f7` — power, authority
- Smooth spring animations via Remotion

## Structure

```
src/
├── Root.tsx                  # Composition registry
├── MetaIntelligence.tsx      # Main 90s composition
├── scenes/
│   ├── Hook.tsx              # 0–10s
│   ├── MetaIntroScene.tsx    # 10–25s
│   ├── FoodVsMember.tsx      # 25–38s
│   ├── FamilyControl.tsx     # 38–55s
│   ├── PowerScene.tsx        # 55–68s
│   ├── TrapScene.tsx         # 68–78s
│   └── BuildYourCell.tsx     # 78–90s
└── components/
    ├── Cell.tsx              # Animated organism character
    ├── CellNetwork.tsx       # Connection network
    ├── TextOverlay.tsx       # Animated text
    └── Background.tsx        # Animated dark bg
```

## Getting Started

```bash
npm install
npm start        # Open Remotion Studio
npm run build    # Render to out/meta-intelligence.mp4
```

## Voiceover

Drop your voiceover file at `public/voiceover.mp3` and uncomment the `<Audio>` line in `MetaIntelligence.tsx`.

Generate via ElevenLabs using the script below.

## Voiceover Script

> Are you truly part of something greater than yourself?
>
> Some people seem embedded in a larger intelligence — a company, a movement, a family. But most of us are not members. We are food. Fuel for the cell.
>
> To truly belong, you need some form of control. A family begins with the parent holding everything. As children grow, they take on responsibility — and become real parts of the whole. They expand into society. They influence it.
>
> This same dynamic reappears later in life through power. As you navigate the world, you search for greater cells that help you survive. Some are easy to enter. But easy usually means expensive — you pay with your agency.
>
> There is another path. Build your own cell. Cooperate with others on equal terms. And start the big game.
