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
  metrics: { value: string; label: string }[];
  takeaway: string;
};

const CASES: Case[] = [
  {
    id: 1,
    company: "Qive",
    title: "Plataforma Fiscal — Reforma Tributária",
    subtitle:
      "Discovery, research e redesign de experiência para conformidade tributária",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=900&fit=crop&auto=format",
    imageAlt: "Dashboard de plataforma fiscal digital",
    tags: ["SaaS", "Gov Tech", "Discovery", "UX Strategy"],
    challenge:
      "A reforma tributária brasileira (EC 132/2023) exigiu que plataformas fiscais repensassem fluxos complexos de apuração, emissão e conformidade — impactando diretamente a experiência de contadores, gestores financeiros e PMEs.",
    responsibilities: [
      "Discovery e mapeamento de jornada",
      "Entrevistas com usuários",
      "Benchmarking regulatório",
      "Prototipação no Figma",
      "Workshops com stakeholders",
      "Testes de usabilidade",
      "Design system e UI",
    ],
    process:
      "Utilizei prompts com conteúdos da Reforma Tributária e personas sintéticas no Gemini para acelerar a ideação. O resultado foi adaptado no Figma Make com base no Design System da empresa e refinado com os times de negócios e técnico. Um protótipo navegável foi entregue via Cursor + Vercel em 5 dias — a tempo para ser apresentado no Qive Conecta.",
    metrics: [
      { value: "Inédito", label: "solução sem referências no mercado fiscal/financeiro" },
      { value: "+20", label: "empresas enterprise interessadas" },
      { value: "↑ MRR", label: "potencial impacto direto na meta de receita" },
    ],
    takeaway:
      "A proposta foi destaque no Qive Conecta — evento anual da empresa para apresentação de novidades a clientes e leads — abrindo oportunidades de upsell em grandes contas enterprise.",
  },
  {
    id: 2,
    company: "iClinic RX",
    title: "Plataforma de Prescrição Digital",
    subtitle: "Discovery, segmentação e experiência escalável em saúde",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=700&fit=crop&auto=format",
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
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=700&fit=crop&auto=format",
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
    title: "OLX Pagamentos — Redesign PIX",
    subtitle:
      "Pesquisa, mapeamento comportamental e redesign da experiência de pagamento",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=700&fit=crop&auto=format",
    imageAlt: "Experiência de checkout mobile com PIX",
    tags: ["Marketplace", "Pagamentos", "Pesquisa"],
    challenge:
      "O time de pagamentos precisava entender o comportamento dos usuários em relação à adoção do PIX e otimizar a experiência de checkout para diferentes perfis de vendedores.",
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
      "Organizei dados históricos de pesquisa e identifiquei lacunas comportamentais em pagamentos digitais. Mapeei um segmento crescente de vendedores semiprofissionais e redesenhei fluxos de pagamento para suportar confiança e transações mais rápidas.",
    metrics: [
      { value: "↑", label: "Compreensão do PIX" },
      { value: "Nova", label: "Persona de vendedor identificada" },
      { value: "↑", label: "Priorização do roadmap" },
    ],
    takeaway:
      "O comportamento de pagamento varia significativamente dependendo da intenção, frequência e percepção de confiança do usuário.",
  },
  {
    id: 5,
    company: "OLX",
    title: "OLX Financiamentos — Marketplace",
    subtitle: "Recuperação de conversão por pesquisa e design colaborativo",
    image:
      "https://images.unsplash.com/photo-1560472355-536de3962603?w=1200&h=700&fit=crop&auto=format",
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
    category: "Pesquisa",
    items: [
      "Discovery",
      "Entrevistas com Usuários",
      "Testes de Usabilidade",
      "Pesquisa Quantitativa",
      "Service Design",
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
    category: "Design",
    items: [
      "UX/UI Design",
      "Design Systems",
      "Wireframing",
      "Prototipação",
      "Interaction Design",
    ],
  },
  {
    category: "Ferramentas",
    items: ["Figma", "FigJam", "Miro", "Maze", "Hotjar", "Google Analytics"],
  },
];

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY + 100;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.offsetTop <= scrollY) {
          setActive(ids[i]);
          return;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [ids]);
  return active;
}

function scrollTo(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useScrollSpy(["sobre", "cases", "habilidades", "contato"]);

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

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              type="button"
              onClick={() => scrollTo(l.href)}
              className={`text-sm transition-colors ${
                active === l.href.replace("#", "")
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => scrollTo("#contato")}
            className="text-sm px-4 py-2 bg-foreground text-primary-foreground rounded-sm hover:opacity-80 transition-opacity"
          >
            Contato
          </button>
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
        <div className="md:hidden bg-[#F8F7F3] border-t border-black/8 px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              type="button"
              onClick={() => {
                scrollTo(l.href);
                setOpen(false);
              }}
              className="text-left text-base text-foreground"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center pt-16 px-6 md:px-10 max-w-6xl mx-auto"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="pt-20 pb-16">
        <div className="flex flex-wrap gap-2 mb-12">
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
          className="text-[clamp(2.6rem,6vw,5rem)] leading-[1.08] font-light tracking-tight text-foreground mb-8 max-w-4xl"
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontVariationSettings: "'opsz' 72",
          }}
        >
          Projetando produtos digitais que conectam necessidades dos usuários ao
          impacto no negócio.
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-12 font-light">
          Product Designer com experiência em healthtech, fintech e marketplaces,
          liderando discovery, pesquisa, estratégia de UX e experiências de
          produto escaláveis.
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
      className="py-24 px-6 md:px-10 max-w-6xl mx-auto"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center md:items-start">
        <div className="relative shrink-0 flex items-center justify-center">
          <div
            className="absolute rounded-full"
            style={{ width: 200, height: 200, background: "var(--secondary)", zIndex: 0 }}
          />
          <div
            className="relative z-10 flex items-center justify-center rounded-full bg-secondary text-foreground font-light"
            style={{
              width: 188,
              height: 188,
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: "3rem",
            }}
            aria-hidden
          >
            AY
          </div>
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
              href="https://linkedin.com/in/alineyokota"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin size={14} />
              linkedin.com/in/alineyokota
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
    <article className="border-t border-black/10 pt-10 pb-10">
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
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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

          <div className="grid grid-cols-3 gap-4 mb-6">
            {c.metrics.map((m) => (
              <div key={m.label} className="bg-secondary rounded-sm px-4 py-3">
                <div
                  className="text-xl font-light text-foreground mb-0.5"
                  style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                >
                  {m.value}
                </div>
                <div className="text-xs text-muted-foreground leading-tight">
                  {m.label}
                </div>
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
      className="py-28 px-6 md:px-10 max-w-6xl mx-auto"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="grid md:grid-cols-[1fr_2fr] gap-16 mb-16">
        <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
          Cases
        </span>
        <h2
          className="text-3xl font-light text-foreground"
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
      className="py-28 px-6 md:px-10 max-w-6xl mx-auto"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="grid md:grid-cols-[1fr_2fr] gap-16">
        <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
          Habilidades
        </span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
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
      className="py-28 px-6 md:px-10 max-w-6xl mx-auto border-t border-black/10"
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
              href="https://linkedin.com/in/alineyokota"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-black/20 text-foreground text-sm font-medium rounded-sm hover:border-black/40 transition-colors"
            >
              <Linkedin size={15} />
              linkedin.com/in/alineyokota
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
