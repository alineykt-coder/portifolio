import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Linkedin,
  Mail,
  Maximize2,
  Menu,
  X,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Sobre", href: "#sobre" },
  { label: "Cases", href: "#cases" },
  { label: "Habilidades", href: "#habilidades" },
  { label: "Contato", href: "#contato" },
];

const TAGS = [
  "Discovery",
  "UX Strategy",
  "Product Design",
  "Pesquisa",
  "Service Design",
  "Design Systems",
];

const HIGHLIGHTS = [
  "Produtos com +50 milhões de usuários",
  "CSAT elevado de 49 para 64 pontos",
  "+75% de taxa de conclusão de funil",
  "4ª maior fonte de receita em menos de 1 ano",
];

type Case = {
  id: number;
  company: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  tags: string[];
  challenge: string;
  responsibilities: string[];
  process: string;
  metrics: { value: string; label: string; detail?: string }[];
  takeaway: string;
};

const CASES: Case[] = [
  {
    id: 1,
    company: "Qive",
    title: "Plataforma Fiscal — Reforma Tributária",
    subtitle:
      "Discovery, indicadores e dashboard para o contexto da Reforma Tributária",
    image: "/cases/qive.png",
    imageAlt: "Dashboard de plataforma fiscal digital",
    tags: ["SaaS", "Gov Tech", "Discovery", "UX Strategy"],
    challenge:
      "A Reforma Tributária criou um cenário inédito — sem benchmarks consolidados e com incerteza entre especialistas sobre quais indicadores apoiariam decisões estratégicas. O desafio: transformar dados fiscais complexos em uma experiência clara e acionável.",
    responsibilities: [
      "Estruturação da informação e indicadores",
      "Facilitação com financeiro, negócio e dados",
      "UX Strategy e definição da experiência",
      "Prototipação navegável no Figma",
      "IA para acelerar discovery e interface",
      "Design visual e arquitetura do dashboard",
    ],
    process:
      "Com especialistas de financeiro, negócio e dados, identifiquei os indicadores mais relevantes da Reforma Tributária. Usei IA para acelerar cenários, organização da informação e fluxos iniciais — transformando conhecimento técnico complexo em dashboard navegável pronto para demo em cinco dias.",
    metrics: [
      {
        value: "+40",
        label: "Clientes SMBs e MIDs",
        detail: "Contratação do módulo adicional da Reforma em 3 meses.",
      },
      {
        value: "30%",
        label: "Aumento de MRR",
        detail:
          "Incremento projetado de 20 a 30% no MRR em contas de expansão e novos clientes.",
      },
      {
        value: "+26%",
        label: "Leads",
        detail:
          "Aumento de leads em Q3, apoiando o topo do funil para conversão de vendas.",
      },
    ],
    takeaway:
      "Sem referências competitivas, a solução comunicou com clareza os impactos da reforma e servirá de apoio para o planejamento da transição tributária dos clientes.",
  },
  {
    id: 2,
    company: "iClinic RX",
    title: "Plataforma de Prescrição Digital",
    subtitle: "Discovery, segmentação e experiência escalável em saúde",
    image: "/cases/iclinic.png",
    imageAlt: "Interface de software médico em tablet",
    tags: ["Saúde", "Discovery", "UX Design"],
    challenge:
      "A solução de prescrição digital foi lançada em beta e precisava migrar usuários de sistemas legados, mantendo o engajamento e aumentando a confiança entre os médicos.",
    responsibilities: [
      "Entrevistas de discovery",
      "Segmentação de usuários",
      "Repositório de pesquisa",
      "Workshops de co-criação",
      "UX flows",
      "Design de interface",
      "Análise de métricas",
    ],
    process:
      "Conduzi entrevistas e mapeei padrões de comportamento para identificar pontos de atrito nos fluxos de prescrição. Criei bases de pesquisa segmentadas, validei regras de negócio e colaborei com produto e engenharia para priorizar melhorias de alto impacto.",
    metrics: [
      { value: "8.000+", label: "médicos ativos" },
      { value: "2,2 mi", label: "prescrições geradas" },
      { value: "+15 pts", label: "CSAT (49 → 64)" },
    ],
    takeaway:
      "Além da usabilidade, a retenção dependia de manter a frequência de prescrição e reduzir o atrito operacional para os profissionais de saúde.",
  },
  {
    id: 3,
    company: "Serasa",
    title: "Serasa Premium — Proteção de Score",
    subtitle: "Discovery e estratégia de UX para retenção de usuários",
    image: "/cases/serasa.png",
    imageAlt: "Dashboard financeiro com gráficos de score de crédito",
    tags: ["Fintech", "Estratégia", "Retenção"],
    challenge:
      "Os usuários não tinham visibilidade nem controle sobre consultas ao score de crédito, reduzindo o valor percebido das assinaturas premium.",
    responsibilities: [
      "Pesquisa quantitativa",
      "UX flows",
      "Validação de regras de negócio",
      "Design de interface",
      "Proposta de métricas de retenção",
    ],
    process:
      "Mapeei preocupações relacionadas a confiança e monitoramento financeiro. Redesenhei fluxos de comunicação e padrões de interação para melhorar a clareza e o controle percebido sobre recursos de proteção do score.",
    metrics: [
      { value: "↑", label: "Percepção de valor premium" },
      { value: "↑", label: "Oportunidades de engajamento" },
      { value: "✓", label: "Funil de retenção estruturado" },
    ],
    takeaway:
      "Produtos financeiros dependem fortemente de confiança, transparência e clareza na comunicação.",
  },
  {
    id: 4,
    company: "OLX",
    title: "OLX Pagamentos — Adoção e Estratégia de PIX",
    subtitle:
      "Pesquisa, mapeamento comportamental e estratégia de pagamento",
    image: "/cases/olx-pix.png",
    imageAlt: "Experiência de checkout mobile com PIX",
    tags: ["Marketplace", "Pagamentos", "Pesquisa"],
    challenge:
      "Em 2021, a OLX avaliava a adoção do PIX no checkout, em um mercado ainda sem padrões consolidados e poucas referências entre marketplaces. O desafio era entender o comportamento dos usuários e criar uma experiência confiável para compradores e vendedores.",
    responsibilities: [
      "Consolidação de pesquisas",
      "Mapeamento de personas",
      "Discovery",
      "Pesquisa de checkout",
      "Análise de adoção do PIX",
      "Design de interface",
      "Testes de usabilidade",
    ],
    process:
      "Consolidei pesquisas históricas e analisei comportamentos relacionados ao PIX. Identifiquei vendedores buscando comprar planos e destaques em seus anúncios e redesenhei o checkout com foco em confiança, clareza e adoção do novo meio de pagamento. O projeto ajudou a orientar a estratégia de implementação em um cenário com poucas referências de mercado.",
    metrics: [
      { value: "40%", label: "dos pagamentos em algumas modalidades após 1 ano" },
      { value: "2º meio", label: "de pagamento mais utilizado no checkout" },
      { value: "Pioneirismo", label: "adoção em fase inicial do PIX no mercado" },
    ],
    takeaway:
      "Em aproximadamente um ano, o PIX tornou-se o segundo meio de pagamento mais utilizado no checkout da OLX, representando cerca de 40% das transações em algumas modalidades.",
  },
  {
    id: 5,
    company: "OLX",
    title: "OLX Financiamentos — Marketplace",
    subtitle: "Recuperação de conversão por pesquisa e design colaborativo",
    image: "/cases/olx-financiamentos.png",
    imageAlt: "Simulador de financiamento de veículos digital",
    tags: ["Marketplace", "Conversão", "Pesquisa de Campo"],
    challenge:
      "Após substituir um simulador legado, as taxas de conversão caíram de 14% para 2% antes da análise de crédito.",
    responsibilities: [
      "Pesquisa qualitativa",
      "Análise de funil",
      "Pesquisa de campo",
      "Grupos focais",
      "Testes de usabilidade",
      "Workshops de co-criação",
      "Wireframes e UI design",
    ],
    process:
      "Analisei dados comportamentais, revi gravações de navegação e conduzi pesquisa de campo com compradores e concessionárias. Facilitei sessões colaborativas de ideação e revisões iterativas para redesenhar a jornada de financiamento.",
    metrics: [
      { value: "20 mil", label: "simulações por dia" },
      { value: "17%", label: "contratos via OLX" },
      { value: "4°", label: "maior receita da empresa" },
    ],
    takeaway:
      "Os problemas de conversão estavam profundamente ligados a confiança, comunicação e fricção no onboarding ao longo da jornada de financiamento.",
  },
];

const SKILLS = [
  {
    category: "UX/UI",
    items: [
      "Discovery",
      "Entrevistas com Usuários",
      "Pesquisa Quantitativa",
      "Service Design",
      "Design Systems",
      "Interaction Design",
    ],
  },
  {
    category: "Produto",
    items: [
      "UX Strategy",
      "Product Thinking",
      "Métricas",
      "Análise de Funil",
      "Priorização",
    ],
  },
  {
    category: "Ferramentas",
    items: ["Figma", "FigJam", "Miro", "Maze", "Hotjar", "Google Analytics"],
  },
  {
    category: "IA",
    items: [
      "AI-assisted workflow",
      "Claude",
      "Cursor",
      "v0",
      "Figma AI",
      "Prototipação rápida",
      "Geração de specs",
      "Personas sintéticas",
    ],
  },
];

const SECTION_IDS = ["sobre", "cases", "habilidades", "contato"] as const;

function useScrollSpy(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!elements.length) return;

    const headerOffset = 96;

    const updateFromScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80;

      if (nearBottom) {
        setActive(ids[ids.length - 1]);
        return;
      }

      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (window.scrollY + headerOffset >= top - 1) {
          current = id;
        }
      }
      setActive(current);
    };

    const observer = new IntersectionObserver(
      () => updateFromScroll(),
      {
        rootMargin: `-${headerOffset}px 0px -45% 0px`,
        threshold: [0, 0.05, 0.1, 0.25, 0.5],
      },
    );

    elements.forEach((el) => observer.observe(el));
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", updateFromScroll, { passive: true });
    updateFromScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("resize", updateFromScroll);
    };
  }, [ids]);

  return active;
}

function scrollTo(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 88;
  window.scrollTo({ top, behavior: "smooth" });
}

function navLinkClass(isActive: boolean, size: "sm" | "md" = "sm") {
  const base =
    size === "sm"
      ? "text-sm px-3 py-1.5 rounded-md transition-all duration-200"
      : "text-base px-3 py-2 rounded-md transition-all duration-200 text-left w-full";

  if (isActive) {
    return `${base} text-[#2a2926] font-medium bg-[#EFEDE7] shadow-[0_2px_10px_rgba(17,17,16,0.14)] hover:shadow-[0_4px_14px_rgba(17,17,16,0.2)] hover:text-[#111110]`;
  }

  return `${base} text-muted-foreground hover:text-[#3d3c38] hover:shadow-[0_1px_6px_rgba(17,17,16,0.1)]`;
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollActive = useScrollSpy(SECTION_IDS);
  const [active, setActive] = useState<string>(SECTION_IDS[0]);

  useEffect(() => {
    setActive(scrollActive);
  }, [scrollActive]);

  const handleNavClick = (href: string, closeMenu = false) => {
    const id = href.replace("#", "");
    setActive(id);
    scrollTo(href);
    if (closeMenu) setOpen(false);
  };

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F8F7F3]/95 backdrop-blur-sm border-b border-black/8"
          : "bg-transparent"
      }`}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <button
          type="button"
          onClick={() => scrollTo("#hero")}
          className="text-[15px] font-medium tracking-tight text-foreground"
        >
          Aline Yokota
        </button>

        <nav className="hidden md:flex items-center gap-2">
          {NAV_LINKS.map((l) => {
            const isActive = active === l.href.replace("#", "");
            return (
              <button
                key={l.href}
                type="button"
                onClick={() => handleNavClick(l.href)}
                className={navLinkClass(isActive)}
                aria-current={isActive ? "page" : undefined}
              >
                {l.label}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#F8F7F3] border-t border-black/8 px-6 py-6 flex flex-col gap-2">
          {NAV_LINKS.map((l) => {
            const isActive = active === l.href.replace("#", "");
            return (
              <button
                key={l.href}
                type="button"
                onClick={() => handleNavClick(l.href, true)}
                className={navLinkClass(isActive, "md")}
                aria-current={isActive ? "page" : undefined}
              >
                {l.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="px-6 md:px-10 max-w-6xl mx-auto border-b border-black/10"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="pt-24 md:pt-28 pb-14">
        <div className="flex flex-wrap gap-2 mb-8">
          {TAGS.map((t) => (
            <span
              key={t}
              className="text-xs px-3 py-1 border border-black/15 rounded-full text-muted-foreground tracking-wide"
            >
              {t}
            </span>
          ))}
        </div>

        <h1
          className="text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[1.1] font-light tracking-tight text-foreground mb-5 max-w-4xl"
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontVariationSettings: "'opsz' 72",
          }}
        >
          Product Designer focada em produtos SaaS, B2B e jornadas financeiras
          complexas.
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-10 font-light">
          10+ anos criando experiências que equilibram negócio, métricas e
          usabilidade.
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => scrollTo("#cases")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-primary-foreground text-sm font-medium rounded-sm hover:opacity-80 transition-opacity"
          >
            Ver Cases
            <ArrowUpRight size={15} />
          </button>
          <button
            type="button"
            onClick={() => scrollTo("#contato")}
            className="inline-flex items-center gap-2 px-6 py-3 border border-black/20 text-foreground text-sm font-medium rounded-sm hover:border-black/40 transition-colors"
          >
            Contato
          </button>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      id="sobre"
      className="pt-20 pb-12 px-6 md:px-10 max-w-6xl mx-auto border-b border-black/10"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center md:items-start">
        <div className="relative shrink-0 flex items-center justify-center">
          <div
            className="absolute rounded-full"
            style={{ width: 200, height: 200, background: "var(--secondary)", zIndex: 0 }}
          />
          <img
            src="/avatar.png"
            alt="Aline Yokota"
            className="relative z-10 object-cover object-top rounded-full"
            style={{ width: 188, height: 188, display: "block" }}
          />
        </div>

        <div className="flex-1">
          <p className="text-base text-muted-foreground mb-1">Olá, sou</p>
          <h2
            className="text-[clamp(2.2rem,5vw,3.8rem)] font-light leading-[1.05] text-foreground tracking-tight mb-3"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            Aline Yokota
          </h2>

          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 border border-black/15 rounded-full text-muted-foreground mb-6">
            São Paulo, Brasil
          </span>

          <p className="text-base leading-relaxed text-foreground mb-3 max-w-xl">
            UX / Product Designer desde 2010, com passagens por SaaS, consultorias,
            fintechs e healthtechs. Experiência em liderança, mentoria, research,
            métricas e dinâmicas colaborativas, com foco em resultados mensuráveis.
          </p>
          <p className="text-sm text-muted-foreground mb-6 max-w-xl">
            <span className="font-medium text-foreground">Expertise:</span> UX/UI
            Design · Discovery · Research · Design Systems · Figma · IA aplicada a
            produto
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8 max-w-xl">
            {HIGHLIGHTS.map((h) => (
              <div key={h} className="flex items-start gap-2.5">
                <div className="w-1 h-1 rounded-full bg-foreground mt-[9px] shrink-0" />
                <span className="text-sm text-foreground leading-relaxed">{h}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 items-center border-t border-black/10 pt-6">
            <a
              href="mailto:aline.ykt@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail size={14} />
              aline.ykt@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/aline-yy/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin size={14} />
              linkedin.com/in/aline-yy
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImageModal({
  open,
  onClose,
  label,
  src,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  src: string;
}) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
      style={{ backdropFilter: "blur(4px)" }}
      role="dialog"
      aria-modal
      aria-label={label}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 text-white/80 hover:text-white transition-colors bg-white/10 rounded-full p-2"
        aria-label="Fechar"
      >
        <X size={22} />
      </button>
      <div className="relative max-w-[92vw] max-h-[88vh]" onClick={(e) => e.stopPropagation()}>
        <img
          src={src}
          alt={label}
          className="max-h-[80vh] w-auto max-w-full rounded-xl shadow-2xl object-contain"
        />
        <p
          className="text-center text-white/50 text-xs mt-3"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

function CaseCard({ c, index }: { c: Case; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <article
      className={`pb-10 ${index > 0 ? "border-t border-black/10 pt-10" : "pt-2"}`}
    >
      <ImageModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        label={`${c.company} — ${c.title}`}
        src={c.image}
      />
      <div className="grid md:grid-cols-[1fr_2fr] gap-10 items-start">
        <button
          type="button"
          className="relative overflow-hidden rounded-sm bg-muted aspect-[4/3] cursor-zoom-in group text-left"
          onClick={() => setModalOpen(true)}
          title="Clique para ampliar"
        >
          <img
            src={c.image}
            alt={c.imageAlt}
            className="w-full h-full object-contain bg-[#EFEDE7] transition-transform duration-700 group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-200" />
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-sm opacity-70 group-hover:opacity-100 transition-opacity">
            <Maximize2 size={14} className="text-foreground" />
          </div>
        </button>

        <div>
          <div className="mb-4">
            <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2 block">
              {String(index + 1).padStart(2, "0")} — {c.company}
            </span>
            <h3
              className="text-2xl font-light text-foreground mb-1"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              {c.title}
            </h3>
            <p className="text-sm text-muted-foreground">{c.subtitle}</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {c.tags.map((t) => (
              <span
                key={t}
                className="text-xs px-2.5 py-1 bg-muted rounded-sm text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            <span className="font-medium text-foreground">Desafio: </span>
            {c.challenge}
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 mb-6">
            {c.metrics.map((m) => (
              <div key={m.label} className="bg-secondary rounded-sm px-4 py-3">
                <div
                  className="text-xl font-light text-foreground mb-0.5"
                  style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                >
                  {m.value}
                </div>
                <div
                  className={`text-xs leading-tight ${
                    m.detail ? "font-medium text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {m.label}
                </div>
                {m.detail && (
                  <div className="text-xs text-muted-foreground leading-tight mt-1">
                    {m.detail}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 text-sm text-foreground font-medium hover:opacity-60 transition-opacity"
          >
            {expanded ? "Ver menos" : "Ver processo"}
            <ChevronDown
              size={15}
              className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            />
          </button>

          <div
            ref={contentRef}
            className="overflow-hidden transition-all duration-500"
            style={{
              maxHeight: expanded ? `${contentRef.current?.scrollHeight ?? 800}px` : "0px",
              opacity: expanded ? 1 : 0,
            }}
          >
            <div className="pt-6 space-y-5">
              <div>
                <h4 className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-3">
                  Responsabilidades
                </h4>
                <ul className="flex flex-wrap gap-2">
                  {c.responsibilities.map((r) => (
                    <li
                      key={r}
                      className="text-xs px-2.5 py-1 border border-black/12 rounded-sm text-foreground list-none"
                    >
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-3">
                  Processo
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.process}</p>
              </div>
              <div className="border-l-2 border-foreground pl-4">
                <p className="text-sm text-foreground italic leading-relaxed">
                  &ldquo;{c.takeaway}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function Cases() {
  return (
    <section
      id="cases"
      className="pt-12 pb-12 px-6 md:px-10 max-w-6xl mx-auto"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="grid md:grid-cols-[1fr_2fr] gap-10 mb-8">
        <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
          Cases
        </span>
        <h2
          className="text-3xl font-light text-foreground text-left"
          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
        >
          Projetos selecionados
        </h2>
      </div>
      <div className="space-y-4">
        {CASES.map((c, i) => (
          <CaseCard key={c.id} c={c} index={i} />
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section
      id="habilidades"
      className="pt-12 pb-12 px-6 md:px-10 max-w-6xl mx-auto border-t border-black/10"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="grid md:grid-cols-[1fr_2fr] gap-16">
        <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
          Habilidades
        </span>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {SKILLS.map((s) => (
            <div key={s.category}>
              <h3 className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4">
                {s.category}
              </h3>
              <ul className="space-y-2">
                {s.items.map((item) => (
                  <li key={item} className="text-sm text-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contato"
      className="pt-12 pb-12 px-6 md:px-10 max-w-6xl mx-auto border-t border-black/10"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="grid md:grid-cols-[1fr_2fr] gap-16">
        <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
          Contato
        </span>
        <div>
          <h2
            className="text-[clamp(1.8rem,3.5vw,3rem)] font-light leading-[1.1] text-foreground mb-6"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            Meus contatos:
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:aline.ykt@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-primary-foreground text-sm font-medium rounded-sm hover:opacity-80 transition-opacity"
            >
              <Mail size={15} />
              aline.ykt@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/aline-yy/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-black/20 text-foreground text-sm font-medium rounded-sm hover:border-black/40 transition-colors"
            >
              <Linkedin size={15} />
              linkedin.com/in/aline-yy
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="border-t border-black/10 px-6 md:px-10 max-w-6xl mx-auto py-8 flex flex-col sm:flex-row items-center justify-between gap-4"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <span className="text-xs text-muted-foreground">
        © 2026 Aline Yokota · Product Designer
      </span>
      <span className="text-xs text-muted-foreground">São Paulo, Brasil</span>
    </footer>
  );
}

export default function App() {
  return (
    <div className="bg-background min-h-screen" style={{ scrollBehavior: "smooth" }}>
      <style>{`
        html { scroll-behavior: smooth; }
        section[id] { scroll-margin-top: 5.5rem; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(17,17,16,0.15); border-radius: 3px; }
      `}</style>
      <Nav />
      <main>
        <Hero />
        <About />
        <Cases />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
