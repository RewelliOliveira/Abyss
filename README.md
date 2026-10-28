# Abyss

> Role das ondas iluminadas pelo sol até o Challenger Deep, a 10.935 m de profundidade.

**Abyss** é uma landing page interativa guiada pelo scroll que leva você num mergulho da superfície do oceano até o fundo da Fossa das Marianas. Rolar a página *é* o mergulho: o medidor de profundidade, a luz, as cores e as criaturas mudam conforme você desce. É uma vitrine educativa, sem venda e sem formulários.

Feito com React, TypeScript, Tailwind CSS e GSAP.

> O site em si é em inglês (en-US).

---

## Sumário

- [Destaques](#destaques)
- [O mergulho](#o-mergulho)
- [Stack](#stack)
- [Como rodar](#como-rodar)
- [Scripts disponíveis](#scripts-disponíveis)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Como funciona](#como-funciona)
- [Personalização](#personalização)
- [Acessibilidade](#acessibilidade)
- [Contribuindo](#contribuindo)

---

## Destaques

- **Cinco zonas oceânicas**, cada uma com seu próprio gradiente de cor, curiosidades e criaturas.
- **Mais de 20 ilustrações em SVG vetorizadas à mão**: vida marinha, um navio de pesquisa, um submarino, gaivotas e um fundo do mar detalhado.
- **Painel de instrumentos ao vivo** com profundidade (m / ft), temperatura (°C / °F) e pressão conforme você rola.
- **Efeito de lanterna** nas zonas escuras: a escuridão tem um foco de luz que segue o cursor, o dedo ou o centro da tela.
- **Bioluminescência**: iscas, pontas de cauda e fotóforos continuam brilhando acima da escuridão.
- **Fichas das criaturas**: passe o mouse ou dê foco numa criatura para saber mais sobre ela.
- **Scroll suave** com GSAP ScrollSmoother e criaturas que entram nadando quando o mergulho chega até elas.
- **Responsivo**, com um palco próprio para as criaturas no celular e suporte completo a `prefers-reduced-motion`.

## O mergulho

| Zona | Profundidade | Algumas criaturas |
| --- | --- | --- |
| Zona Eufótica (Sunlight Zone) | 0 – 200 m | Tartaruga-verde, arenque-do-atlântico, raia-manta-gigante, tubarão-martelo-gigante, água-viva-luminosa |
| Zona Mesopelágica (Twilight Zone) | 200 – 1.000 m | Lula-de-humboldt, peixe-espada, peixe-lanterna, peixe-machado-prateado, cachalote |
| Zona Batipelágica (Midnight Zone) | 1.000 – 4.000 m | Peixe-diabo, enguia-pelicano, lula-vampira, água-viva-coroa |
| Zona Abissal (Abyssal Zone) | 4.000 – 6.000 m | Peixe-tripé, lula-de-nadadeiras-grandes, camarão-vermelho de profundidade |
| Zona Hadal (Hadal Zone) | 6.000 – 10.935 m | Anêmona de profundidade, peixe-caracol-das-marianas |

A jornada termina no **Challenger Deep**, o ponto mais profundo conhecido da Terra.

## Stack

| Tecnologia | Uso |
| --- | --- |
| [React 19](https://react.dev) | Interface |
| [TypeScript](https://www.typescriptlang.org) | Tipagem |
| [Vite](https://vite.dev) | Dev server e build |
| [Tailwind CSS v4](https://tailwindcss.com) | Estilos, com tokens de tema em `src/styles/theme.css` |
| [GSAP 3](https://gsap.com) + `@gsap/react` | ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText, DrawSVGPlugin |
| [vite-plugin-svgr](https://github.com/pd4d10/vite-plugin-svgr) | Importa SVGs como componentes React (`?react`) |
| [SVGO](https://github.com/svg/svgo) | Otimização dos SVGs |

Fontes: **Space Grotesk** (títulos), **Inter** (texto) e **JetBrains Mono** (números dos instrumentos), via Google Fonts.

## Como rodar

**Pré-requisitos:** Node.js 20+ e npm.

```bash
git clone https://github.com/RewelliOliveira/Abyss.git
cd Abyss
npm install
npm run dev
```

A página abre em `http://localhost:5173`.

## Scripts disponíveis

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Checa os tipos (`tsc -b`) e gera o build de produção em `dist/` |
| `npm run preview` | Serve o build de produção localmente |
| `npm run lint` | Roda o ESLint |

## Estrutura de pastas

```
Abyss/
├── public/                 # favicon e logo
├── src/
│   ├── assets/             # ilustrações originais (nunca alteradas)
│   │   └── svg/            # SVGs vetorizados e otimizados
│   ├── components/
│   │   ├── sections/       # Hero, ZoneSection, TrenchFloor
│   │   ├── ui/             # painel de instrumentos, lanterna, partículas, ficha, céu...
│   │   └── creatures/      # um componente por criatura ou ilustração
│   ├── data/               # conteúdo tipado: zonas, criaturas, curiosidades, céu, presets de movimento
│   ├── hooks/              # profundidade, revelação, lanterna, scroll suave...
│   ├── lib/                # configuração do GSAP, movimento, estado do mergulho, animação ambiente
│   ├── styles/             # tokens de tema
│   ├── types/              # tipos TypeScript compartilhados
│   ├── App.tsx
│   └── main.tsx
├── index.html
└── vite.config.ts
```

## Como funciona

**Profundidade a partir do scroll.** `src/lib/dive-store.ts` guarda a profundidade atual. Cada `ZoneSection` converte o progresso do scroll na sua faixa de profundidade (`useZoneDepth`), e os instrumentos, faróis e partículas reagem a esse valor.

**Fundo contínuo.** Cada zona pinta um gradiente vertical da sua cor até a cor da próxima zona, então o oceano escurece suavemente conforme você rola.

**Camadas fixas.** Fora do wrapper de scroll suave ficam o `ParticleField` (canvas), o `DiveGuide` (o submarino) e o `InstrumentPanel`.

**Escuridão e brilho.** As zonas escuras renderizam uma `Lantern` (uma camada de escuridão com um foco de luz radial) e uma segunda camada de criaturas por cima, que mostra só as partes bioluminescentes e seus halos pré-desenhados. O brilho nunca é um filtro SVG animado: os halos são gradientes radiais animados só na opacidade, o que mantém tudo leve.

**Entrada das criaturas.** A arte subaquática é estática. As criaturas só aparecem quando o mergulho chega até elas: deslizando pela esquerda ou pela direita, ou subindo de baixo.

**Céu animado.** Só a cena da superfície anima seus SVGs: o sol, os raios de luz, as ondas, o navio de pesquisa e um bando de gaivotas que trocam de pose em voo. Esses agentes usam ruído com semente, rodam num único `gsap.ticker` por cena e pausam fora da tela.

**Divisão do bundle.** As ilustrações são separadas em chunks próprios (`seafloor`, `sea-life`, `illustrations`, `vendor`) em `vite.config.ts`.

## Personalização

| O quê | Onde |
| --- | --- |
| Cores, fontes, espaçamentos | `src/styles/theme.css` |
| Links das fontes | `index.html` |
| Tempos de animação e breakpoints | `src/lib/motion.ts` (`MOTION`, `MEDIA`) |
| Zonas, criaturas e curiosidades | `src/data/zones.ts`, `src/data/creatures.ts` |
| Céu e gaivotas | `src/data/sky.ts`, `src/lib/flight.ts` |
| Presets de animação ambiente | `src/data/motion-presets.ts` |

## Acessibilidade

- HTML semântico, texto alternativo em todas as ilustrações, navegação por teclado e foco visível.
- `prefers-reduced-motion` desliga parallax, partículas e a lanterna, mas o gradiente de profundidade e os instrumentos continuam funcionando.
- Unidades no sistema métrico com o imperial ao lado (metros / pés, °C / °F).

## Contribuindo

Os commits seguem o [Conventional Commits](https://www.conventionalcommits.org) em inglês:

```
feat(hero): add surface scene with animated title
fix(lantern): follow touch position on mobile
```

Rode `npm run build` antes de commitar para garantir que a checagem de tipos e o build passam.
