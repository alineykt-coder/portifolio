# Criar portfólio online

Portfólio de Product Designer gerado a partir do protótipo [Figma Make — Criar portfólio online](https://www.figma.com/make/Hpk6hRzJ6DMXHzL9vDw0Z9/Criar-portfolio-online).

## Rodar localmente

```bash
cd ~/Projects/criar-portfolio-online
npm install
npm run dev
```

Abra o endereço que o Vite mostrar (geralmente `http://localhost:5173`).

## Deploy

```bash
npm run build
```

A pasta `dist/` pode ser publicada na [Vercel](https://vercel.com), Netlify ou GitHub Pages.

## Personalizar

- **Foto:** substitua o avatar com iniciais em `About` por `public/avatar.jpg` e use `<img src="/avatar.jpg" ... />`.
- **Screenshots dos cases:** exporte do Figma Make e coloque em `public/cases/`; atualize o campo `image` em `src/App.tsx`.
- **Conteúdo:** edite os arrays `CASES`, `SKILLS` e textos em `src/App.tsx` — espelham o protótipo Make.

## Stack

- React 18 + TypeScript
- Vite 6
- Tailwind CSS 4
- Fraunces + DM Sans (Google Fonts)
