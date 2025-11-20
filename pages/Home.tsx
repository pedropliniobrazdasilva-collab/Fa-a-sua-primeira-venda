import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { CheckCircle, Lock, ArrowRight, PlayCircle, ShieldCheck } from 'lucide-react';
import { COURSE_DATA, FAQ_DATA } from '../constants';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-in fade-in duration-700">
      
      {/* HERO SECTION */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-in slide-in-from-bottom-4 duration-1000">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"/>
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Nova Turma Aberta</span>
        </div>

        <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
          DOMINE A ARTE DE <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 neon-text">
            VENDER ONLINE
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
          O guia definitivo de 30 episódios para sair do zero absoluto até sua primeira venda, sem aparecer e sem precisar de ferramentas caras.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Button onClick={() => navigate('/modulos')} variant="secondary" glow className="w-full sm:w-auto">
            QUERO FAZER MINHA PRIMEIRA VENDA
          </Button>
          <Button onClick={() => navigate('/modulos')} variant="outline" className="w-full sm:w-auto">
            VER GRADE CURRICULAR
          </Button>
        </div>

        {/* Floating Stats/Elements */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
          {[
            { label: "Módulos", value: "06" },
            { label: "Episódios", value: "30" },
            { label: "Formato", value: "Texto" },
            { label: "Acesso", value: "Vitalício" },
          ].map((stat, i) => (
            <div key={i} className="glass-panel p-4 rounded-xl text-center hover:border-cyan-500/30 transition-colors">
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT IS IT */}
      <section className="py-24 bg-black/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">O QUE É O CURSO?</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Esqueça vídeos longos de 2 horas que só enrolam. O <span className="text-cyan-400 font-bold">FAÇA SUA PRIMEIRA VENDA</span> é um treinamento direto ao ponto, focado em execução.
            </p>
            <p className="text-gray-400 mb-8 leading-relaxed">
              30 Episódios em texto, meticulosamente escritos para você ler, aplicar e ter resultado. É um manual de guerra para o mercado digital.
            </p>
            <ul className="space-y-4">
              {[
                "Método direto e sem enrolação",
                "Aplicação rápida (15 min/dia)",
                "Não precisa aparecer",
                "Investimento opcional"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="text-cyan-500 w-5 h-5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-violet-500/20 rounded-2xl blur-2xl" />
            <div className="relative glass-panel p-8 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Lock className="text-cyan-400 w-5 h-5" />
                MÉTODO EXCLUSIVO
              </h3>
              <div className="space-y-4">
                {COURSE_DATA.map((mod) => (
                   <div key={mod.id} className="p-4 rounded bg-white/5 hover:bg-white/10 transition-colors cursor-default">
                     <div className="text-xs text-cyan-400 mb-1 font-bold tracking-widest">MÓDULO {mod.id.split('-')[1]}</div>
                     <div className="text-gray-200 text-sm font-medium">{mod.title.split('—')[1]}</div>
                   </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEARNING POINTS */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">VOCÊ VAI APRENDER</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Ofertas Irresistíveis", desc: "Como criar ofertas que as pessoas se sentem estúpidas em recusar." },
              { title: "Tráfego Viral", desc: "As técnicas exatas para alcançar milhares de pessoas sem gastar um real." },
              { title: "Escala Infinita", desc: "O plano matemático para transformar sua primeira venda em rotina." },
              { title: "Copywriting Dark", desc: "Textos persuasivos que entram na mente do cliente." },
              { title: "Produtos Vencedores", desc: "Como garimpar produtos ocultos que vendem muito." },
              { title: "Mindset Blindado", desc: "A mentalidade que separa quem tenta de quem consegue." }
            ].map((item, i) => (
              <div key={i} className="glass-panel p-8 rounded-xl hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all duration-300 text-left group">
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors">
                  <PlayCircle className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto glass-panel p-12 rounded-3xl border border-cyan-500/20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-cyan-500" />
          <ShieldCheck className="w-20 h-20 text-cyan-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">GARANTIA BLINDADA DE 7 DIAS</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Acesse todo o conteúdo. Se você sentir que não vale 10x o que você pagou, nós devolvemos 100% do seu dinheiro. Sem perguntas, sem letras miúdas.
          </p>
          <div className="text-xs uppercase tracking-widest text-gray-600">Risco Zero • Satisfação Garantida</div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">PERGUNTAS FREQUENTES</h2>
        <div className="space-y-4">
          {FAQ_DATA.map((item, i) => (
            <div key={i} className="glass-panel rounded-lg p-6 hover:bg-white/5 transition-colors">
              <h4 className="text-lg font-medium text-white mb-2">{item.q}</h4>
              <p className="text-gray-400 text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">ESTÁ PRONTO?</h2>
        <Button onClick={() => navigate('/modulos')} variant="secondary" glow className="text-xl px-12 py-6">
          COMEÇAR AGORA <ArrowRight className="w-6 h-6" />
        </Button>
      </section>

    </div>
  );
};