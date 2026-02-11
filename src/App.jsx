import { useState, useEffect, useMemo, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════
   AURENIS CUSTOMER — LOGICIEL COMPLET UNIFIÉ
   Rôles : Admin · Technicien · Poseur
   Auth : Login · Register · Email Verify · Password Reset
   ═══════════════════════════════════════════════════════════ */

/* ═══ INITIAL DATA ═══ */
const INIT_TECHS = [
  { id: "T001", name: "Ahmed Benali", tel: "+33 6 12 34 56 78", spe: "Plomberie", commission: 0.20, status: "Disponible", color: "#0EA5E9", email: "ahmed@aquatech.fr", role: "tech" },
  { id: "T002", name: "Lucas Martin", tel: "+33 6 23 45 67 89", spe: "Serrurerie", commission: 0.20, status: "Disponible", color: "#8B5CF6", email: "lucas@aquatech.fr", role: "tech" },
  { id: "T003", name: "Karim Dupont", tel: "+33 6 34 56 78 90", spe: "Plomberie", commission: 0.20, status: "En intervention", color: "#F97316", email: "karim@aquatech.fr", role: "tech" },
  { id: "T004", name: "David Lefebvre", tel: "+33 6 45 67 89 01", spe: "Électricité", commission: 0.25, status: "Disponible", color: "#14B8A6", email: "david@aquatech.fr", role: "tech" },
];

const INIT_POSEURS = [
  { id: "P001", name: "Rachid Amrani", tel: "+33 6 50 60 70 80", spe: "Plomberie", status: "Disponible", color: "#EC4899", email: "rachid@aquatech.fr", role: "poseur" },
  { id: "P002", name: "Sofiane Belkacem", tel: "+33 6 60 70 80 90", spe: "Serrurerie", status: "Disponible", color: "#F43F5E", email: "sofiane@aquatech.fr", role: "poseur" },
];

const ADMIN_EMAIL = "admin@aquatech.fr";

const INIT_INTERVENTIONS = [
  { ref: "INT-001", date: "2026-02-11", heure: "09:00", type: "Plomberie", mode: "Urgence", clientNom: "Dupont", clientPrenom: "Marie", tel: "+33 6 11 22 33 44", adresse: "12 rue de la Paix, 75002", tech: "Ahmed Benali", statut: "Validée", ttc: 350, commRate: 0.20, poseur: null, poseurCost: 0, poseurMode: null },
  { ref: "INT-002", date: "2026-02-11", heure: "10:30", type: "Serrurerie", mode: "RDV", clientNom: "Martin", clientPrenom: "Pierre", tel: "+33 6 22 33 44 55", adresse: "5 av. des Champs, 75008", tech: "Lucas Martin", statut: "Validée", ttc: 280, commRate: 0.20, poseur: null, poseurCost: 0, poseurMode: null },
  { ref: "INT-003", date: "2026-02-11", heure: "14:00", type: "Plomberie", mode: "RDV", clientNom: "Leroy", clientPrenom: "Jean", tel: "+33 6 33 44 55 66", adresse: "8 bd Voltaire, 75011", tech: "Karim Dupont", statut: "En cours", ttc: 0, commRate: 0.20, poseur: null, poseurCost: 0, poseurMode: null },
  { ref: "INT-004", date: "2026-02-11", heure: "16:00", type: "Électricité", mode: "RDV", clientNom: "Petit", clientPrenom: "Sophie", tel: "+33 6 44 55 66 77", adresse: "22 rue Rivoli, 75004", tech: "David Lefebvre", statut: "Planifiée", ttc: 0, commRate: 0.25, poseur: null, poseurCost: 0, poseurMode: null },
  { ref: "INT-005", date: "2026-02-12", heure: "08:30", type: "Plomberie", mode: "Urgence", clientNom: "Garcia", clientPrenom: "Luis", tel: "+33 6 55 66 77 88", adresse: "15 rue Monge, 75005", tech: "Ahmed Benali", statut: "Terminée", ttc: 420, commRate: 0.20, poseur: "Rachid Amrani", poseurCost: 150, poseurMode: "divise2" },
  { ref: "INT-006", date: "2026-02-12", heure: "11:00", type: "Serrurerie", mode: "Urgence", clientNom: "Bernard", clientPrenom: "Chloé", tel: "+33 6 66 77 88 99", adresse: "3 rue de Sèze, 75009", tech: "Lucas Martin", statut: "Terminée", ttc: 195, commRate: 0.20, poseur: null, poseurCost: 0, poseurMode: null },
  { ref: "INT-007", date: "2026-02-12", heure: "15:00", type: "Plomberie", mode: "RDV", clientNom: "Moreau", clientPrenom: "Alice", tel: "+33 6 77 88 99 00", adresse: "41 rue Oberkampf, 75011", tech: "Karim Dupont", statut: "Validée", ttc: 310, commRate: 0.20, poseur: "Rachid Amrani", poseurCost: 120, poseurMode: "gratuit" },
  { ref: "INT-008", date: "2026-02-13", heure: "09:30", type: "Électricité", mode: "Urgence", clientNom: "Roux", clientPrenom: "Thomas", tel: "+33 6 88 99 00 11", adresse: "7 rue de Turbigo, 75003", tech: "David Lefebvre", statut: "Validée", ttc: 475, commRate: 0.25, poseur: null, poseurCost: 0, poseurMode: null },
  { ref: "INT-009", date: "2026-02-13", heure: "14:00", type: "Plomberie", mode: "RDV", clientNom: "Blanc", clientPrenom: "Emma", tel: "+33 6 99 00 11 22", adresse: "18 rue de Rivoli, 75001", tech: "Ahmed Benali", statut: "Terminée", ttc: 290, commRate: 0.20, poseur: "Sofiane Belkacem", poseurCost: 100, poseurMode: "divise2" },
  { ref: "INT-010", date: "2026-02-14", heure: "10:00", type: "Serrurerie", mode: "Urgence", clientNom: "Faure", clientPrenom: "Marc", tel: "+33 6 10 20 30 40", adresse: "9 rue du Bac, 75007", tech: "Lucas Martin", statut: "Terminée", ttc: 365, commRate: 0.20, poseur: null, poseurCost: 0, poseurMode: null },
  { ref: "INT-011", date: "2026-02-14", heure: "15:30", type: "Électricité", mode: "RDV", clientNom: "Robin", clientPrenom: "Julie", tel: "+33 6 20 30 40 50", adresse: "27 av. Parmentier, 75011", tech: "David Lefebvre", statut: "En cours", ttc: 0, commRate: 0.25, poseur: null, poseurCost: 0, poseurMode: null },
  { ref: "INT-012", date: "2026-02-15", heure: "09:00", type: "Plomberie", mode: "Urgence", clientNom: "Simon", clientPrenom: "Paul", tel: "+33 6 30 40 50 60", adresse: "4 rue de la Roquette, 75011", tech: "Karim Dupont", statut: "Planifiée", ttc: 0, commRate: 0.20, poseur: null, poseurCost: 0, poseurMode: null },
];

/* ═══ FINANCE HELPERS ═══ */
const calcCommission = (inter) => {
  const brute = inter.ttc * inter.commRate;
  if (inter.poseur && inter.poseurMode === "divise2") {
    return Math.max(0, brute - (inter.poseurCost / 2));
  }
  return brute;
};

const calcNetPatron = (inter) => {
  const comm = calcCommission(inter);
  return inter.ttc - comm - inter.poseurCost;
};

/* ═══ WHATSAPP HELPER ═══ */
const sendWhatsApp = (phone, message) => {
  const clean = phone.replace(/[\s\-\.\(\)]/g, "").replace(/^\+/, "");
  const url = `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};

const waMessageClient = (inter) => {
  return `Bonjour ${inter.clientPrenom} ${inter.clientNom},\n\nNous vous confirmons votre intervention :\n📋 Réf : ${inter.ref}\n📅 ${inter.date} à ${inter.heure}\n🔧 Type : ${inter.type} (${inter.mode})\n👨‍🔧 Technicien : ${inter.tech}\n📍 ${inter.adresse}\n\nCordialement,\nAURENIS - AquaTech Services`;
};

const waMessageTech = (inter, tech) => {
  return `Bonjour ${tech ? tech.split(" ")[0] : ""},\n\nNouvelle intervention assignée :\n📋 ${inter.ref}\n📅 ${inter.date} à ${inter.heure}\n🔧 ${inter.type} (${inter.mode})\n👤 Client : ${inter.clientPrenom} ${inter.clientNom}\n📞 ${inter.tel}\n📍 ${inter.adresse}\n\nMerci,\nAURENIS`;
};

/* ═══ STORAGE (localStorage) ═══ */
const ST = {
  async get(k) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch { return null; } },
  async set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } },
};

/* ═══ TOKENS ═══ */
const T = { dark: "#0F1225", bg: "#1B1F3B", gold: "#C8A44E", goldLight: "#E8C96A", green: "#059669", red: "#EF476F", blue: "#4361EE", violet: "#7209B7", textMuted: "rgba(255,255,255,0.4)", textSoft: "rgba(255,255,255,0.6)", radius: 20, radiusSm: 14, radiusXs: 10 };
const typeColors = { "Plomberie": "#0EA5E9", "Serrurerie": "#8B5CF6", "Électricité": "#F59E0B" };
const statutColors = { "Planifiée": { bg: "rgba(67,97,238,0.15)", c: "#818CF8" }, "En cours": { bg: "rgba(249,115,22,0.15)", c: "#F97316" }, "Terminée": { bg: "rgba(255,210,80,0.15)", c: "#FFD166" }, "Validée": { bg: "rgba(6,214,160,0.15)", c: "#06D6A0" } };

/* ═══ SHARED COMPONENTS ═══ */
const AurenisLogo = ({ size = "lg" }) => {
  const s = size === "lg" ? 44 : 32; const fs = size === "lg" ? 24 : 18; const sub = size === "lg" ? 13 : 10;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: size === "lg" ? 14 : 10 }}>
      <div style={{ width: s, height: s, borderRadius: s * 0.32, background: "linear-gradient(135deg, #C8A44E, #E8C96A, #A07828)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(200,164,78,0.35)" }}>
        <svg width={s * 0.55} height={s * 0.55} viewBox="0 0 24 24" fill="none"><path d="M12 2C12 2 5 10 5 15C5 18.87 8.13 22 12 22C15.87 22 19 18.87 19 15C19 10 12 2 12 2Z" fill="rgba(255,255,255,0.95)" /><path d="M12 6C12 6 8 11 8 14C8 16.21 9.79 18 12 18C14.21 18 16 16.21 16 14C16 11 12 6 12 6Z" fill="rgba(200,164,78,0.4)" /></svg>
      </div>
      <div><div style={{ display: "flex", alignItems: "baseline", gap: 4 }}><span style={{ fontSize: fs, fontWeight: 800, letterSpacing: -0.5, background: "linear-gradient(135deg, #C8A44E, #E8C96A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AURENIS</span><span style={{ fontSize: sub, fontWeight: 500, color: T.textMuted, letterSpacing: 2, textTransform: "uppercase" }}>customer</span></div></div>
    </div>
  );
};

const Inp = ({ icon, type = "text", placeholder, value, onChange, error, onKeyDown, style: sx }) => (
  <div style={{ position: "relative", marginBottom: error ? 4 : 0, ...sx }}>
    {icon && <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 18, opacity: 0.5, pointerEvents: "none" }}>{icon}</div>}
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDown}
      style={{ width: "100%", padding: icon ? "14px 16px 14px 48px" : "14px 16px", fontSize: 14, fontWeight: 500, background: "rgba(255,255,255,0.06)", border: error ? "1.5px solid #EF476F" : "1.5px solid rgba(255,255,255,0.08)", borderRadius: T.radiusSm, color: "#fff", outline: "none", boxSizing: "border-box", transition: "all 0.2s", fontFamily: "inherit" }}
      onFocus={e => { e.target.style.borderColor = T.gold; }} onBlur={e => { e.target.style.borderColor = error ? "#EF476F" : "rgba(255,255,255,0.08)"; }} />
    {error && <div style={{ fontSize: 12, color: "#EF476F", marginTop: 4, fontWeight: 500, paddingLeft: 4 }}>{error}</div>}
  </div>
);

const Btn = ({ children, onClick, loading, variant = "primary", disabled, style: sx }) => {
  const p = variant === "primary";
  return <button onClick={onClick} disabled={disabled || loading} style={{ padding: "12px 24px", fontSize: 14, fontWeight: 700, border: "none", borderRadius: T.radiusSm, cursor: disabled || loading ? "not-allowed" : "pointer", background: p ? "linear-gradient(135deg, #C8A44E, #E8C96A)" : variant === "danger" ? "rgba(239,71,111,0.15)" : "rgba(255,255,255,0.06)", color: p ? "#1B1F3B" : variant === "danger" ? "#EF476F" : "#fff", opacity: disabled || loading ? 0.5 : 1, transition: "all 0.2s", fontFamily: "inherit", boxShadow: p ? "0 4px 20px rgba(200,164,78,0.3)" : "none", width: sx?.width || "auto", ...sx }}>{loading ? "..." : children}</button>;
};

const Badge = ({ status }) => { const s = statutColors[status] || { bg: "rgba(148,163,184,0.15)", c: "#94A3B8" }; return <span style={{ background: s.bg, color: s.c, padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>{status}</span>; };
const ModeBadge = ({ mode }) => <span style={{ background: mode === "Urgence" ? "linear-gradient(135deg, #EF476F, #F97316)" : "linear-gradient(135deg, #4361EE, #7209B7)", color: "#fff", padding: "3px 10px", borderRadius: 16, fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>{mode === "Urgence" ? "⚡ URG" : "📅 RDV"}</span>;
const TypeBadge = ({ type }) => { const c = typeColors[type] || T.blue; return <span style={{ background: `${c}22`, color: c, padding: "3px 10px", borderRadius: 8, fontSize: 11, fontWeight: 700 }}>{type}</span>; };

const KPI = ({ label, value, color, icon }) => (
  <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: T.radius, padding: "20px 22px", border: "1px solid rgba(255,255,255,0.06)", borderTop: `3px solid ${color}`, flex: 1, minWidth: 150 }}>
    <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
    <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>{label}</div>
    <div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>{value}</div>
  </div>
);

const Card = ({ children, style: sx }) => <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: T.radius, border: "1px solid rgba(255,255,255,0.06)", padding: 24, ...sx }}>{children}</div>;
const SectionTitle = ({ children, right }) => <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}><h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#fff" }}>{children}</h2>{right}</div>;

/* ═══ MODAL ═══ */
const Modal = ({ open, onClose, title, children, width = 480 }) => {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 12, backdropFilter: "blur(4px)" }} onClick={onClose}>
      <div style={{ background: "#1E2243", borderRadius: 24, padding: "24px 20px", width: "100%", maxWidth: width, border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 24px 64px rgba(0,0,0,0.5)", maxHeight: "90vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#fff" }}>{title}</h3>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.06)", border: "none", borderRadius: 10, width: 36, height: 36, cursor: "pointer", color: "#fff", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};

/* ═══ AUTH SHELL ═══ */
const AuthShell = ({ children }) => (
  <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(160deg, ${T.dark} 0%, ${T.bg} 40%, ${T.dark} 100%)`, padding: 20 }}>
    <div style={{ position: "fixed", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,164,78,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
    <div style={{ width: "100%", maxWidth: 420, animation: "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1)" }}>{children}</div>
  </div>
);
const AuthCard = ({ children, title, subtitle }) => (
  <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 24, padding: "36px 32px", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(20px)", boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}>
    <div style={{ textAlign: "center", marginBottom: 28 }}><div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}><AurenisLogo /></div><h1 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800, color: "#fff" }}>{title}</h1><p style={{ margin: 0, fontSize: 13, color: T.textMuted, lineHeight: 1.5 }}>{subtitle}</p></div>{children}
  </div>
);

/* ═══ LOGIN ═══ */
const LoginPage = ({ onLogin, onGoRegister, onGoForgot }) => {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(false); const [show, setShow] = useState(false);
  const handle = async () => {
    setError(""); if (!email.trim()) return setError("Email requis"); if (!password) return setError("Mot de passe requis");
    setLoading(true); await new Promise(r => setTimeout(r, 600));
    const em = email.toLowerCase().trim();
    if (em === ADMIN_EMAIL) { if (password === "Admin123") { setLoading(false); return onLogin({ email: em, name: "Administrateur", role: "admin" }); } else { setLoading(false); return setError("Mot de passe admin incorrect"); } }
    const a = await ST.get(`account:${em}`); if (!a) { setLoading(false); return setError("Aucun compte trouvé"); }
    if (!a.verified) { setLoading(false); return setError("Email non vérifié"); }
    if (a.password !== password) { setLoading(false); return setError("Mot de passe incorrect"); }
    setLoading(false); onLogin(a);
  };
  return (
    <AuthShell><AuthCard title="Connexion" subtitle="Accédez à votre espace Aurenis">
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ background: "rgba(200,164,78,0.06)", border: "1px solid rgba(200,164,78,0.12)", borderRadius: T.radiusXs, padding: "8px 12px", fontSize: 11, color: T.gold, lineHeight: 1.6 }}>
          <strong>Démo Admin :</strong> admin@aquatech.fr / Admin123<br/>
          <strong>Créer un compte tech :</strong> ahmed@aquatech.fr, lucas@aquatech.fr...<br/>
          <strong>Créer un compte poseur :</strong> rachid@aquatech.fr, sofiane@aquatech.fr
        </div>
        <Inp icon="✉️" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handle()} />
        <div style={{ position: "relative" }}><Inp icon="🔒" type={show ? "text" : "password"} placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handle()} /><button onClick={() => setShow(!show)} style={{ position: "absolute", right: 14, top: 14, background: "none", border: "none", cursor: "pointer", fontSize: 14, color: T.textMuted }}>{show ? "🙈" : "👁️"}</button></div>
        {error && <div style={{ background: "rgba(239,71,111,0.1)", borderRadius: T.radiusXs, padding: "10px 14px", fontSize: 13, color: "#EF476F", fontWeight: 500 }}>{error}</div>}
        <Btn onClick={handle} loading={loading} style={{ width: "100%" }}>Se connecter</Btn>
        <button onClick={onGoForgot} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: T.gold, fontWeight: 600, padding: 8, fontFamily: "inherit" }}>Mot de passe oublié ?</button>
      </div>
      <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}><span style={{ fontSize: 13, color: T.textMuted }}>Pas de compte ? </span><button onClick={onGoRegister} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: T.gold, fontWeight: 700, fontFamily: "inherit" }}>Créer un compte</button></div>
    </AuthCard></AuthShell>
  );
};

/* ═══ REGISTER ═══ */
const RegisterPage = ({ onGoLogin, onRegistered }) => {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [confirm, setConfirm] = useState(""); const [errors, setErrors] = useState({}); const [loading, setLoading] = useState(false);
  const allMembers = [...INIT_TECHS, ...INIT_POSEURS];
  const validate = () => {
    const e = {}; const em = email.toLowerCase().trim();
    if (!em) e.email = "Requis"; else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) e.email = "Format invalide"; else if (!allMembers.find(t => t.email === em)) e.email = "Email non autorisé";
    if (!password) e.password = "Requis"; else if (password.length < 6) e.password = "Min. 6 car."; else if (!/[A-Z]/.test(password)) e.password = "1 majuscule"; else if (!/[0-9]/.test(password)) e.password = "1 chiffre";
    if (password !== confirm) e.confirm = "Non identiques"; setErrors(e); return Object.keys(e).length === 0;
  };
  const handle = async () => {
    if (!validate()) return; setLoading(true); await new Promise(r => setTimeout(r, 800));
    const em = email.toLowerCase().trim(); const ex = await ST.get(`account:${em}`); if (ex) { setLoading(false); return setErrors({ email: "Compte existant" }); }
    const member = allMembers.find(t => t.email === em); const code = String(Math.floor(100000 + Math.random() * 900000));
    await ST.set(`account:${em}`, { email: em, password, name: member.name, memberId: member.id, role: member.role, verified: false, verifyCode: code });
    setLoading(false); onRegistered(em, code);
  };
  const strength = (() => { if (!password) return { pct: 0, label: "", color: "#333" }; let s = 0; if (password.length >= 6) s++; if (password.length >= 10) s++; if (/[A-Z]/.test(password)) s++; if (/[0-9]/.test(password)) s++; if (/[^a-zA-Z0-9]/.test(password)) s++; return [{ pct: 20, label: "Très faible", color: "#EF476F" }, { pct: 40, label: "Faible", color: "#F97316" }, { pct: 60, label: "Moyen", color: "#FFD166" }, { pct: 80, label: "Fort", color: "#06D6A0" }, { pct: 100, label: "Excellent", color: "#059669" }][Math.min(s, 4)]; })();
  return (
    <AuthShell><AuthCard title="Créer un compte" subtitle="Email professionnel fourni par l'entreprise">
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Inp icon="✉️" type="email" placeholder="Email professionnel" value={email} onChange={e => setEmail(e.target.value)} error={errors.email} />
        <div><Inp icon="🔒" type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} error={errors.password} />{password && <div style={{ marginTop: 8 }}><div style={{ display: "flex", gap: 4, marginBottom: 4 }}>{[0,1,2,3,4].map(i => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i < strength.pct / 20 ? strength.color : "rgba(255,255,255,0.08)" }} />)}</div><span style={{ fontSize: 11, color: strength.color, fontWeight: 600 }}>{strength.label}</span></div>}</div>
        <Inp icon="🔒" type="password" placeholder="Confirmer" value={confirm} onChange={e => setConfirm(e.target.value)} error={errors.confirm} />
        <Btn onClick={handle} loading={loading} style={{ width: "100%" }}>Créer mon compte</Btn>
      </div>
      <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}><button onClick={onGoLogin} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: T.gold, fontWeight: 700, fontFamily: "inherit" }}>← Se connecter</button></div>
    </AuthCard></AuthShell>
  );
};

/* ═══ VERIFY ═══ */
const VerifyPage = ({ email, code, onVerified, onGoLogin }) => {
  const [input, setInput] = useState(["","","","","",""]); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  const hc = (i, v) => { if (v.length > 1) v = v.slice(-1); if (v && !/[0-9]/.test(v)) return; const n = [...input]; n[i] = v; setInput(n); setError(""); if (v && i < 5) document.getElementById(`otp-${i+1}`)?.focus(); };
  const hk = (i, e) => { if (e.key === "Backspace" && !input[i] && i > 0) document.getElementById(`otp-${i-1}`)?.focus(); };
  const handle = async () => { const c = input.join(""); if (c.length !== 6) return setError("6 chiffres requis"); setLoading(true); await new Promise(r => setTimeout(r, 500)); if (c !== code) { setLoading(false); return setError("Code incorrect"); } const a = await ST.get(`account:${email}`); if (a) { a.verified = true; await ST.set(`account:${email}`, a); } setLoading(false); onVerified(); };
  return (
    <AuthShell><AuthCard title="Vérification" subtitle={<>Code envoyé à <strong style={{ color: T.gold }}>{email}</strong></>}>
      <div style={{ background: "rgba(200,164,78,0.08)", border: "1px solid rgba(200,164,78,0.15)", borderRadius: T.radiusXs, padding: "10px 14px", fontSize: 12, color: T.gold, textAlign: "center", marginBottom: 20, fontWeight: 600 }}>📧 Démo — Code : <span style={{ fontSize: 16, letterSpacing: 3, fontWeight: 800 }}>{code}</span></div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20 }}>{input.map((v, i) => <input key={i} id={`otp-${i}`} type="text" inputMode="numeric" maxLength={1} value={v} onChange={e => hc(i, e.target.value)} onKeyDown={e => hk(i, e)} style={{ width: 48, height: 56, textAlign: "center", fontSize: 22, fontWeight: 800, background: v ? "rgba(200,164,78,0.1)" : "rgba(255,255,255,0.06)", border: "1.5px solid " + (v ? "rgba(200,164,78,0.3)" : "rgba(255,255,255,0.08)"), borderRadius: T.radiusXs, color: "#fff", outline: "none", fontFamily: "inherit" }} />)}</div>
      {error && <div style={{ background: "rgba(239,71,111,0.1)", borderRadius: T.radiusXs, padding: "10px", fontSize: 13, color: "#EF476F", textAlign: "center", marginBottom: 14 }}>{error}</div>}
      <Btn onClick={handle} loading={loading} style={{ width: "100%" }}>Vérifier</Btn>
      <div style={{ marginTop: 16, textAlign: "center" }}><button onClick={onGoLogin} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: T.textMuted, fontFamily: "inherit" }}>← Retour</button></div>
    </AuthCard></AuthShell>
  );
};

/* ═══ FORGOT ═══ */
const ForgotPage = ({ onGoLogin }) => {
  const [step, setStep] = useState("email"); const [email, setEmail] = useState(""); const [rc, setRc] = useState(""); const [gc, setGc] = useState(""); const [np, setNp] = useState(""); const [cp, setCp] = useState(""); const [err, setErr] = useState(""); const [ld, setLd] = useState(false);
  const send = async () => { setErr(""); if (!email.trim()) return setErr("Email requis"); setLd(true); await new Promise(r => setTimeout(r, 600)); const a = await ST.get(`account:${email.toLowerCase().trim()}`); if (!a) { setLd(false); return setErr("Aucun compte"); } const c = String(Math.floor(100000 + Math.random() * 900000)); a.resetCode = c; await ST.set(`account:${email.toLowerCase().trim()}`, a); setGc(c); setLd(false); setStep("code"); };
  const verify = () => { setErr(""); if (rc !== gc) return setErr("Code incorrect"); setStep("newpass"); };
  const reset = async () => { setErr(""); if (np.length < 6) return setErr("Min. 6 car."); if (np !== cp) return setErr("Non identiques"); setLd(true); const a = await ST.get(`account:${email.toLowerCase().trim()}`); if (a) { a.password = np; await ST.set(`account:${email.toLowerCase().trim()}`, a); } setLd(false); setStep("done"); };
  return (
    <AuthShell><AuthCard title={step === "done" ? "Réinitialisé ✓" : "Récupération"} subtitle={step === "done" ? "Connectez-vous" : "Récupérez votre accès"}>
      {step === "email" && <div style={{ display: "flex", flexDirection: "column", gap: 14 }}><Inp icon="✉️" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />{err && <div style={{ fontSize: 13, color: "#EF476F" }}>{err}</div>}<Btn onClick={send} loading={ld} style={{ width: "100%" }}>Envoyer</Btn></div>}
      {step === "code" && <div style={{ display: "flex", flexDirection: "column", gap: 14 }}><div style={{ background: "rgba(200,164,78,0.08)", borderRadius: T.radiusXs, padding: "10px", fontSize: 12, color: T.gold, textAlign: "center", fontWeight: 600 }}>Code : <strong>{gc}</strong></div><Inp icon="🔑" placeholder="Code 6 chiffres" value={rc} onChange={e => setRc(e.target.value)} />{err && <div style={{ fontSize: 13, color: "#EF476F" }}>{err}</div>}<Btn onClick={verify} style={{ width: "100%" }}>Vérifier</Btn></div>}
      {step === "newpass" && <div style={{ display: "flex", flexDirection: "column", gap: 14 }}><Inp icon="🔒" type="password" placeholder="Nouveau" value={np} onChange={e => setNp(e.target.value)} /><Inp icon="🔒" type="password" placeholder="Confirmer" value={cp} onChange={e => setCp(e.target.value)} />{err && <div style={{ fontSize: 13, color: "#EF476F" }}>{err}</div>}<Btn onClick={reset} loading={ld} style={{ width: "100%" }}>Réinitialiser</Btn></div>}
      {step === "done" && <div style={{ textAlign: "center" }}><div style={{ fontSize: 48, marginBottom: 16 }}>✅</div><Btn onClick={onGoLogin} style={{ width: "100%" }}>Se connecter</Btn></div>}
      {step !== "done" && <div style={{ marginTop: 16, textAlign: "center" }}><button onClick={onGoLogin} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: T.textMuted, fontFamily: "inherit" }}>← Retour</button></div>}
    </AuthCard></AuthShell>
  );
};

const VerifiedPage = ({ onGoLogin }) => (
  <AuthShell><AuthCard title="Email vérifié !" subtitle="Compte activé"><div style={{ textAlign: "center", marginBottom: 20 }}><div style={{ fontSize: 48 }}>✅</div></div><Btn onClick={onGoLogin} style={{ width: "100%" }}>Se connecter</Btn></AuthCard></AuthShell>
);

/* ═══ APP HEADER ═══ */
const Header = ({ account, onLogout, roleBadge }) => {
  const member = [...INIT_TECHS, ...INIT_POSEURS].find(m => m.id === account.memberId);
  const color = member?.color || T.gold;
  const initials = account.name?.split(" ").map(n => n[0]).join("") || "A";
  return (
    <div style={{ background: "rgba(27,31,59,0.95)", borderBottom: "1px solid rgba(200,164,78,0.12)", padding: "14px 28px", backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 50 }}>
      <div className="aurenis-header-inner">
        <AurenisLogo size="sm" />
        <div className="aurenis-header-right">
          <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 8, background: account.role === "admin" ? "rgba(200,164,78,0.15)" : account.role === "tech" ? "rgba(14,165,233,0.15)" : "rgba(236,72,153,0.15)", color: account.role === "admin" ? T.gold : account.role === "tech" ? "#0EA5E9" : "#EC4899", textTransform: "uppercase", letterSpacing: 1 }}>{account.role === "admin" ? "Admin" : account.role === "tech" ? "Technicien" : "Poseur"}</span>
          <div style={{ textAlign: "right" }}><div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{account.name}</div></div>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${color}, ${color}88)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 13 }}>{initials}</div>
          <button onClick={onLogout} style={{ background: "rgba(239,71,111,0.1)", border: "1px solid rgba(239,71,111,0.2)", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 11, color: "#EF476F", fontWeight: 600, fontFamily: "inherit" }}>Déconnexion</button>
        </div>
      </div>
    </div>
  );
};

/* ═══ ADDRESS AUTOCOMPLETE — GOOGLE PLACES (primary) + GOUV.FR (fallback) ═══ */
const GPLACES_KEY = "AIzaSyB-EE_iFGP9G2LM2vsEN77NBdkVQnUToI8";

const AddressAutocomplete = ({ value, onChange }) => {
  const [query, setQuery] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [showSugg, setShowSugg] = useState(false);
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState("");

  useEffect(() => { setQuery(value || ""); }, [value]);

  const fetchSuggestions = useCallback(async (input) => {
    if (!input || input.length < 3) { setSuggestions([]); return; }
    setLoading(true);

    /* 1) Try Google Places API (New) */
    try {
      const gRes = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Goog-Api-Key": GPLACES_KEY },
        body: JSON.stringify({ input, includedRegionCodes: ["fr"], languageCode: "fr", includedPrimaryTypes: ["street_address", "subpremise", "route", "premise"] })
      });
      if (gRes.ok) {
        const gData = await gRes.json();
        if (gData.suggestions && gData.suggestions.length > 0) {
          setSuggestions(gData.suggestions.filter(s => s.placePrediction).map(s => ({
            main: s.placePrediction.structuredFormat?.mainText?.text || "",
            secondary: s.placePrediction.structuredFormat?.secondaryText?.text || "",
            full: s.placePrediction.text?.text || ""
          })).slice(0, 5));
          setSource("google");
          setLoading(false);
          return;
        }
      }
    } catch (e) { console.log("Google Places unavailable, trying gouv.fr"); }

    /* 2) Fallback: API Adresse gouv.fr */
    try {
      const res = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(input)}&limit=6&type=housenumber&autocomplete=1`);
      if (res.ok) {
        const data = await res.json();
        if (data.features && data.features.length > 0) {
          setSuggestions(data.features.map(f => ({
            main: f.properties.name || "",
            secondary: `${f.properties.postcode || ""} ${f.properties.city || ""}`,
            full: f.properties.label || ""
          })));
          setSource("gouv");
          setLoading(false);
          return;
        }
      }
    } catch (e) { console.log("Gouv.fr also unavailable"); }

    setSuggestions([]);
    setLoading(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { if (query.length >= 3 && focused) fetchSuggestions(query); }, 350);
    return () => clearTimeout(timer);
  }, [query, focused, fetchSuggestions]);

  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, opacity: 0.4, pointerEvents: "none" }}>📍</div>
      <input
        type="text" placeholder="Tapez une adresse..." value={query}
        onChange={e => { setQuery(e.target.value); onChange(e.target.value); setShowSugg(true); }}
        onFocus={() => { setFocused(true); setShowSugg(true); }}
        onBlur={() => setTimeout(() => { setFocused(false); setShowSugg(false); }, 250)}
        style={{ width: "100%", padding: "12px 16px 12px 42px", fontSize: 14, fontWeight: 500, background: "rgba(255,255,255,0.06)", border: focused ? "1.5px solid " + T.gold : "1.5px solid rgba(255,255,255,0.08)", borderRadius: T.radiusSm, color: "#fff", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
      />
      {loading && <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, border: "2px solid rgba(200,164,78,0.3)", borderTopColor: T.gold, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />}
      {showSugg && suggestions.length > 0 && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 100, marginTop: 4, background: "#1E2243", border: "1px solid rgba(200,164,78,0.2)", borderRadius: 12, overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.5)" }}>
          {suggestions.map((s, i) => (
            <div key={i} onMouseDown={e => e.preventDefault()} onClick={() => { setQuery(s.full); onChange(s.full); setShowSugg(false); setSuggestions([]); }}
              style={{ padding: "10px 16px", fontSize: 13, color: "#fff", cursor: "pointer", borderBottom: i < suggestions.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(200,164,78,0.1)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: T.gold, fontSize: 14 }}>📍</span>
                <div>
                  <div style={{ fontWeight: 600, color: "#fff", fontSize: 13 }}>{s.main}</div>
                  <div style={{ fontSize: 11, color: T.textMuted }}>{s.secondary}</div>
                </div>
              </div>
            </div>
          ))}
          <div style={{ padding: "5px 16px", fontSize: 9, color: "rgba(255,255,255,0.15)", textAlign: "right" }}>{source === "google" ? "Google Places" : "🇫🇷 Base Adresse Nationale"}</div>
        </div>
      )}
    </div>
  );
};

/* ═══ CONFIG ITEM — add/remove chip ═══ */
const ConfigList = ({ items, onAdd, onRemove, label, icon, color }) => {
  const [newItem, setNewItem] = useState("");
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 12, color: T.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}><span>{icon}</span> {label}</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, background: `${color}18`, border: `1px solid ${color}30`, borderRadius: 20, padding: "6px 14px" }}>
            <span style={{ fontSize: 13, fontWeight: 600, color }}>{item}</span>
            <button onClick={() => onRemove(item)} style={{ background: "none", border: "none", cursor: "pointer", color: "#EF476F", fontSize: 14, padding: 0, lineHeight: 1, fontFamily: "inherit", opacity: 0.7 }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0.7}>✕</button>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input type="text" placeholder={`Ajouter ${label.toLowerCase()}...`} value={newItem} onChange={e => setNewItem(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && newItem.trim()) { onAdd(newItem.trim()); setNewItem(""); } }}
          style={{ flex: 1, padding: "10px 14px", fontSize: 13, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, color: "#fff", outline: "none", fontFamily: "inherit" }}
          onFocus={e => e.target.style.borderColor = T.gold} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
        <button onClick={() => { if (newItem.trim()) { onAdd(newItem.trim()); setNewItem(""); } }} style={{ padding: "10px 18px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #C8A44E, #E8C96A)", color: "#1B1F3B", cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "inherit" }}>+ Ajouter</button>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   ADMIN DASHBOARD
   ═══════════════════════════════════════════════════════════ */
const AdminDash = ({ account, onLogout, interventions, setInterventions, techs, setTechs, specialties, setSpecialties, statuts, setStatuts }) => {
  const [tab, setTab] = useState("dashboard");
  const [editModal, setEditModal] = useState(null);
  const [commModal, setCommModal] = useState(null);
  const [newRate, setNewRate] = useState("");
  const [telModal, setTelModal] = useState(null);
  const [newTel, setNewTel] = useState("");
  const [time, setTime] = useState(new Date());

  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearTimeout(t); }, []);

  const validees = interventions.filter(i => i.statut === "Validée");
  const terminees = interventions.filter(i => i.statut === "Terminée");
  const totalTTC = validees.reduce((s, i) => s + i.ttc, 0);
  const totalComm = validees.reduce((s, i) => s + calcCommission(i), 0);
  const totalPoseur = validees.reduce((s, i) => s + i.poseurCost, 0);
  const caNet = totalTTC - totalComm - totalPoseur;
  const attente = terminees.length;

  const updateIntervention = (ref, updates) => { setInterventions(prev => prev.map(i => i.ref === ref ? { ...i, ...updates } : i)); };
  const validerIntervention = (ref) => { updateIntervention(ref, { statut: "Validée" }); };

  const changeTechRate = (techId) => {
    const rate = parseFloat(newRate) / 100;
    if (isNaN(rate) || rate < 0 || rate > 1) return;
    setTechs(prev => prev.map(t => t.id === techId ? { ...t, commission: rate } : t));
    setNewRate(""); setCommModal(null);
  };

  const changeTechTel = (techId) => {
    if (!newTel.trim()) return;
    setTechs(prev => prev.map(t => t.id === techId ? { ...t, tel: newTel.trim() } : t));
    setNewTel(""); setTelModal(null);
  };

  const tabs = [{ id: "dashboard", label: "Dashboard", icon: "📊" }, { id: "interventions", label: "Interventions", icon: "📞" }, { id: "equipe", label: "Équipe", icon: "👥" }, { id: "journal", label: "Journal", icon: "💰" }, { id: "params", label: "Paramètres", icon: "⚙️" }];

  return (
    <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", background: `linear-gradient(160deg, ${T.dark} 0%, ${T.bg} 40%, ${T.dark} 100%)`, minHeight: "100vh" }}>
      <Header account={account} onLogout={onLogout} />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 16px" }}>
        {/* Time + Nav */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 6, background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: 4, border: "1px solid rgba(255,255,255,0.06)", overflowX: "auto", WebkitOverflowScrolling: "touch" }} className="aurenis-tabs">
            {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} className={tab === t.id ? "active" : ""}>{t.icon} {t.label}</button>)}
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.textMuted }}>{time.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" })} · <span style={{ color: T.gold }}>{time.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</span></div>
        </div>

        {/* ═══ DASHBOARD ═══ */}
        {tab === "dashboard" && (
          <div>
            <div className="aurenis-kpis">
              <KPI label="Interventions" value={interventions.length} color={T.gold} icon="📋" />
              <KPI label="Validées" value={validees.length} color="#06D6A0" icon="✅" />
              <KPI label="En attente" value={attente} color="#FFD166" icon="⏳" />
              <KPI label="CA Validé TTC" value={`${totalTTC.toLocaleString("fr-FR")} €`} color="#059669" icon="💰" />
              <KPI label="Commissions" value={`${totalComm.toLocaleString("fr-FR")} €`} color="#EF476F" icon="💸" />
              <KPI label="CA Net Patron" value={`${caNet.toLocaleString("fr-FR")} €`} color={T.gold} icon="🏢" />
            </div>
            {terminees.length > 0 && (
              <Card style={{ marginBottom: 20, borderLeft: "3px solid #FFD166" }}>
                <SectionTitle right={<span style={{ fontSize: 12, color: "#FFD166", fontWeight: 700 }}>⏳ {terminees.length} en attente</span>}>Interventions à valider</SectionTitle>
                {terminees.map(inter => (
                  <div key={inter.ref} className="aurenis-inter-row" style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 700, color: T.gold, fontSize: 13 }}>{inter.ref}</span>
                      <span style={{ color: T.textSoft, fontSize: 13 }}>{inter.date}</span>
                      <span style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>{inter.tech}</span>
                      <TypeBadge type={inter.type} />
                      {inter.poseur && <span style={{ fontSize: 11, color: "#EC4899", background: "rgba(236,72,153,0.1)", padding: "2px 8px", borderRadius: 6 }}>👷 {inter.poseur}</span>}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 800, color: "#06D6A0", fontSize: 15 }}>{inter.ttc} €</span>
                      <button className="wa-btn" onClick={() => sendWhatsApp(inter.tel, waMessageClient(inter))}>📱 Client</button>
                      <Btn onClick={() => setEditModal(inter.ref)} variant="ghost" style={{ padding: "6px 12px", fontSize: 12 }}>✏️ Modifier</Btn>
                      <Btn onClick={() => validerIntervention(inter.ref)} style={{ padding: "6px 16px", fontSize: 12 }}>✅ Valider</Btn>
                    </div>
                  </div>
                ))}
              </Card>
            )}
          </div>
        )}

        {/* ═══ INTERVENTIONS ═══ */}
        {tab === "interventions" && (
          <Card>
            <SectionTitle right={<span style={{ fontSize: 12, color: T.textMuted }}>{interventions.length} interventions</span>}>Toutes les interventions</SectionTitle>
            {interventions.map((inter, idx) => (
              <div key={inter.ref} className="aurenis-inter-row"
                onMouseEnter={e => e.currentTarget.style.background = "rgba(200,164,78,0.03)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 700, color: T.gold, fontSize: 13, minWidth: 68 }}>{inter.ref}</span>
                  <span style={{ color: T.textSoft, fontSize: 12 }}>{inter.date} {inter.heure}</span>
                  <TypeBadge type={inter.type} />
                  <ModeBadge mode={inter.mode} />
                  <span style={{ fontSize: 13, color: "#fff", fontWeight: 600 }}>{inter.tech}</span>
                  {inter.poseur && <span style={{ fontSize: 11, color: "#EC4899", background: "rgba(236,72,153,0.1)", padding: "2px 8px", borderRadius: 6 }}>👷 {inter.poseur} ({inter.poseurCost}€ · {inter.poseurMode === "divise2" ? "÷2" : "gratuit"})</span>}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 13, color: T.textMuted }}>{inter.clientNom} {inter.clientPrenom}</span>
                  <Badge status={inter.statut} />
                  <span style={{ fontWeight: 800, fontSize: 14, color: inter.ttc > 0 ? "#06D6A0" : "rgba(255,255,255,0.15)" }}>{inter.ttc > 0 ? `${inter.ttc} €` : "—"}</span>
                  <button className="wa-btn" onClick={() => sendWhatsApp(inter.tel, waMessageClient(inter))} title="WhatsApp client">📱 Client</button>
                  {(() => { const t = techs.find(tc => tc.name === inter.tech); return t ? <button className="wa-btn" onClick={() => sendWhatsApp(t.tel, waMessageTech(inter, t.name))} title="WhatsApp tech">📱 Tech</button> : null; })()}
                  <Btn onClick={() => setEditModal(inter.ref)} variant="ghost" style={{ padding: "4px 10px", fontSize: 11 }}>✏️</Btn>
                  {inter.statut === "Terminée" && <Btn onClick={() => validerIntervention(inter.ref)} style={{ padding: "4px 12px", fontSize: 11 }}>✅ Valider</Btn>}
                </div>
              </div>
            ))}
          </Card>
        )}

        {/* ═══ EQUIPE ═══ */}
        {tab === "equipe" && (
          <div>
            <Card style={{ marginBottom: 20 }}>
              <SectionTitle>Techniciens</SectionTitle>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
                {techs.map(tech => {
                  const myInter = interventions.filter(i => i.tech === tech.name && i.statut === "Validée");
                  const ca = myInter.reduce((s, i) => s + i.ttc, 0);
                  return (
                    <div key={tech.id} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 20, borderLeft: `3px solid ${tech.color}` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
                        <div><div style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>{tech.name}</div><div style={{ fontSize: 12, color: T.textMuted }}>{tech.spe}</div></div>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${tech.color}, ${tech.color}88)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 13 }}>{tech.name.split(" ").map(n => n[0]).join("")}</div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <span style={{ fontSize: 12, color: T.textMuted }}>{myInter.length} validées · CA {ca.toLocaleString("fr-FR")} €</span>
                      </div>
                      {/* Téléphone */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
                        <div><span style={{ fontSize: 11, color: T.textMuted }}>Téléphone</span><div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginTop: 2 }}>{tech.tel}</div></div>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button className="wa-btn" onClick={() => sendWhatsApp(tech.tel, `Bonjour ${tech.name.split(" ")[0]},\n\n`)} style={{ padding: "6px 10px" }}>📱 WhatsApp</button>
                          <Btn onClick={() => { setTelModal(tech.id); setNewTel(tech.tel); }} variant="ghost" style={{ padding: "6px 12px", fontSize: 11 }}>✏️</Btn>
                        </div>
                      </div>
                      {/* Commission */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 14px" }}>
                        <div><span style={{ fontSize: 11, color: T.textMuted }}>Taux commission</span><div style={{ fontSize: 20, fontWeight: 800, color: T.gold }}>{(tech.commission * 100)}%</div></div>
                        <Btn onClick={() => { setCommModal(tech.id); setNewRate(String(tech.commission * 100)); }} variant="ghost" style={{ padding: "6px 12px", fontSize: 11 }}>✏️ Modifier</Btn>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
            <Card>
              <SectionTitle>Poseurs</SectionTitle>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
                {INIT_POSEURS.map(p => {
                  const myInter = interventions.filter(i => i.poseur === p.name);
                  return (
                    <div key={p.id} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 20, borderLeft: `3px solid ${p.color}` }}>
                      <div style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 8 }}>{p.spe} · {myInter.length} interventions</div>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 8, background: "rgba(236,72,153,0.15)", color: "#EC4899" }}>POSEUR</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

        {/* ═══ JOURNAL ═══ */}
        {tab === "journal" && (() => {
          const JournalTab = () => {
            const [jSearch, setJSearch] = useState("");
            const [jDateFrom, setJDateFrom] = useState("");
            const [jDateTo, setJDateTo] = useState("");
            const [jTechFilter, setJTechFilter] = useState("");
            const [jTypeFilter, setJTypeFilter] = useState("");
            const [jPoseurFilter, setJPoseurFilter] = useState("");
            const [jSortField, setJSortField] = useState("date");
            const [jSortDir, setJSortDir] = useState("desc");
            const [jShowStats, setJShowStats] = useState(false);
            const [jQuickPeriod, setJQuickPeriod] = useState("");
            const [jExpandedRow, setJExpandedRow] = useState(null);

            const applyQuickPeriod = (period) => {
              setJQuickPeriod(period);
              const today = new Date();
              let from = "", to = today.toISOString().slice(0, 10);
              if (period === "today") { from = to; }
              else if (period === "yesterday") { const d = new Date(today); d.setDate(d.getDate() - 1); from = d.toISOString().slice(0, 10); to = from; }
              else if (period === "week") { const d = new Date(today); d.setDate(d.getDate() - 7); from = d.toISOString().slice(0, 10); }
              else if (period === "month") { from = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-01`; }
              else if (period === "lastmonth") { const d = new Date(today.getFullYear(), today.getMonth() - 1, 1); from = d.toISOString().slice(0, 10); to = new Date(today.getFullYear(), today.getMonth(), 0).toISOString().slice(0, 10); }
              else { from = ""; to = ""; }
              setJDateFrom(from); setJDateTo(to);
            };

            const techNames = [...new Set(validees.map(i => i.tech))];
            const poseurNames = [...new Set(validees.filter(i => i.poseur).map(i => i.poseur))];
            const typeNames = [...new Set(validees.map(i => i.type))];

            const jFiltered = useMemo(() => {
              let data = [...validees];
              if (jSearch) { const s = jSearch.toLowerCase(); data = data.filter(r => r.ref.toLowerCase().includes(s) || `${r.clientNom} ${r.clientPrenom}`.toLowerCase().includes(s) || r.tech.toLowerCase().includes(s) || r.adresse.toLowerCase().includes(s) || (r.poseur && r.poseur.toLowerCase().includes(s))); }
              if (jDateFrom) data = data.filter(r => r.date >= jDateFrom);
              if (jDateTo) data = data.filter(r => r.date <= jDateTo);
              if (jTechFilter) data = data.filter(r => r.tech === jTechFilter);
              if (jTypeFilter) data = data.filter(r => r.type === jTypeFilter);
              if (jPoseurFilter === "__all__") data = data.filter(r => r.poseur);
              else if (jPoseurFilter) data = data.filter(r => r.poseur === jPoseurFilter);
              data.sort((a, b) => {
                let va = a[jSortField], vb = b[jSortField];
                if (jSortField === "ttc" || jSortField === "net") { va = jSortField === "net" ? calcNetPatron(a) : a.ttc; vb = jSortField === "net" ? calcNetPatron(b) : b.ttc; }
                if (typeof va === "string") return jSortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
                return jSortDir === "asc" ? va - vb : vb - va;
              });
              return data;
            }, [validees, jSearch, jDateFrom, jDateTo, jTechFilter, jTypeFilter, jPoseurFilter, jSortField, jSortDir]);

            const jStats = useMemo(() => {
              const total = jFiltered.reduce((s, r) => s + r.ttc, 0);
              const totalC = jFiltered.reduce((s, r) => s + calcCommission(r), 0);
              const totalP = jFiltered.reduce((s, r) => s + r.poseurCost, 0);
              const net = total - totalC - totalP;
              const avg = jFiltered.length ? total / jFiltered.length : 0;
              const byTech = {};
              jFiltered.forEach(r => { if (!byTech[r.tech]) byTech[r.tech] = { count: 0, ca: 0, net: 0 }; byTech[r.tech].count++; byTech[r.tech].ca += r.ttc; byTech[r.tech].net += calcNetPatron(r); });
              const byType = {};
              jFiltered.forEach(r => { if (!byType[r.type]) byType[r.type] = { count: 0, ca: 0 }; byType[r.type].count++; byType[r.type].ca += r.ttc; });
              return { total, totalC, totalP, net, avg, count: jFiltered.length, byTech, byType };
            }, [jFiltered]);

            const toggleSort = (field) => { if (jSortField === field) setJSortDir(jSortDir === "asc" ? "desc" : "asc"); else { setJSortField(field); setJSortDir("desc"); } };
            const SortIcon = ({ field }) => { if (jSortField !== field) return <span style={{ opacity: 0.3, fontSize: 9 }}>⇅</span>; return <span style={{ color: T.gold, fontSize: 9 }}>{jSortDir === "asc" ? "▲" : "▼"}</span>; };

            const fmt = (n) => n.toLocaleString("fr-FR", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });

            const exportCSV = () => {
              const headers = ["Réf", "Date", "Client", "Adresse", "Type", "Technicien", "Montant TTC", "Commission", "Poseur", "Coût poseur", "Net patron"];
              const rows = jFiltered.map(r => [r.ref, r.date, `${r.clientNom} ${r.clientPrenom}`, r.adresse, r.type, r.tech, r.ttc, calcCommission(r).toFixed(2), r.poseur || "", r.poseurCost, calcNetPatron(r).toFixed(2)]);
              const totalRow = ["TOTAL", "", "", "", "", "", jStats.total, jStats.totalC.toFixed(2), "", jStats.totalP, jStats.net.toFixed(2)];
              const csv = [headers, ...rows, totalRow].map(r => r.map(c => `"${c}"`).join(";")).join("\n");
              const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
              const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url;
              a.download = `journal_aurenis_${jDateFrom || "all"}_${jDateTo || "all"}.csv`; a.click(); URL.revokeObjectURL(url);
            };

            const exportPDF = () => {
              const periodLabel = jDateFrom && jDateTo ? `Du ${jDateFrom} au ${jDateTo}` : jDateFrom ? `À partir du ${jDateFrom}` : jDateTo ? `Jusqu'au ${jDateTo}` : "Toutes les dates";
              const filterInfo = [jTechFilter ? `Tech: ${jTechFilter}` : "", jTypeFilter ? `Type: ${jTypeFilter}` : "", jPoseurFilter === "__all__" ? "Avec poseur" : jPoseurFilter ? `Poseur: ${jPoseurFilter}` : "", jSearch ? `"${jSearch}"` : ""].filter(Boolean).join(" · ");
              const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Journal AURENIS</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:system-ui,sans-serif;padding:28px;color:#1e293b;font-size:11px}
.hdr{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;border-bottom:3px solid #C8A44E;padding-bottom:14px}
.logo{font-size:22px;font-weight:800;color:#C8A44E}.sub{font-size:11px;color:#64748b}.meta{text-align:right;font-size:11px;color:#64748b;line-height:1.6}
.filt{background:#f8fafc;border-radius:6px;padding:6px 12px;font-size:10px;color:#475569;margin-bottom:12px}
.sg{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px}
.sc{border:1px solid #e2e8f0;border-radius:6px;padding:10px}.sl{font-size:9px;color:#64748b;text-transform:uppercase;letter-spacing:.05em}.sv{font-size:18px;font-weight:700;margin-top:3px}
table{width:100%;border-collapse:collapse;margin-bottom:16px}th{background:#1B1F3B;color:#C8A44E;padding:7px 8px;text-align:left;font-size:9px;text-transform:uppercase;letter-spacing:.05em}
th:nth-child(n+5){text-align:right}td{padding:6px 8px;border-bottom:1px solid #e2e8f0}td:nth-child(n+5){text-align:right;font-variant-numeric:tabular-nums}
tr:nth-child(even){background:#f8fafc}.tr td{font-weight:700;background:#fffbeb!important;border-top:2px solid #C8A44E;font-size:11px}
.g{color:#059669}.y{color:#d97706}.r{color:#dc2626}.gd{color:#C8A44E}
.ft{margin-top:20px;padding-top:10px;border-top:1px solid #e2e8f0;font-size:9px;color:#94a3b8;text-align:center}
@media print{body{padding:14px}}</style></head><body>
<div class="hdr"><div><div class="logo">💧 AURENIS</div><div class="sub">Journal de compte</div></div>
<div class="meta"><div><strong>${periodLabel}</strong></div><div>Généré le ${new Date().toLocaleDateString("fr-FR")} à ${new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})}</div><div>${jStats.count} intervention${jStats.count>1?"s":""}</div></div></div>
${filterInfo ? `<div class="filt">Filtres : ${filterInfo}</div>` : ""}
<div class="sg"><div class="sc"><div class="sl">CA Total</div><div class="sv g">${fmt(jStats.total)} €</div></div>
<div class="sc"><div class="sl">Commissions</div><div class="sv y">-${fmt(jStats.totalC)} €</div></div>
<div class="sc"><div class="sl">Net Patron</div><div class="sv gd">${fmt(jStats.net)} €</div></div></div>
<table><thead><tr><th>Réf</th><th>Date</th><th>Client / Tech</th><th>Type</th><th>TTC</th><th>Comm.</th><th>Poseur</th><th>Net</th></tr></thead><tbody>
${jFiltered.map(r=>{const c=calcCommission(r);const n=calcNetPatron(r);return`<tr><td><strong>${r.ref}</strong></td><td>${r.date}</td><td>${r.clientNom} ${r.clientPrenom}<br><span style="font-size:9px;color:#94a3b8">${r.tech}</span></td><td>${r.type}</td><td class="g"><strong>${fmt(r.ttc)} €</strong></td><td class="y">-${fmt(c)} €</td><td class="r">${r.poseurCost>0?`-${fmt(r.poseurCost)} €`:"—"}</td><td class="gd"><strong>${fmt(n)} €</strong></td></tr>`;}).join("")}
<tr class="tr"><td colspan="4"><strong>TOTAL — ${jStats.count} interventions</strong></td><td class="g">${fmt(jStats.total)} €</td><td class="y">-${fmt(jStats.totalC)} €</td><td class="r">${jStats.totalP>0?`-${fmt(jStats.totalP)} €`:"—"}</td><td class="gd">${fmt(jStats.net)} €</td></tr></tbody></table>
${Object.keys(jStats.byTech).length>0?`<table><thead><tr><th style="background:#334155;color:#fff">Technicien</th><th style="background:#334155;color:#fff;text-align:right">Inter.</th><th style="background:#334155;color:#fff;text-align:right">CA</th><th style="background:#334155;color:#fff;text-align:right">Net</th></tr></thead><tbody>${Object.entries(jStats.byTech).map(([n,d])=>`<tr><td><strong>${n}</strong></td><td style="text-align:right">${d.count}</td><td style="text-align:right" class="g">${fmt(d.ca)} €</td><td style="text-align:right" class="gd">${fmt(d.net)} €</td></tr>`).join("")}</tbody></table>`:""}
<div class="ft">AURENIS — Document généré automatiquement · AquaTech Services</div>
<script>window.onload=()=>window.print()</script></body></html>`;
              const blob = new Blob([html], { type: "text/html;charset=utf-8" }); const url = URL.createObjectURL(blob);
              window.open(url, "_blank"); setTimeout(() => URL.revokeObjectURL(url), 5000);
            };

            const resetFilters = () => { setJSearch(""); setJDateFrom(""); setJDateTo(""); setJTechFilter(""); setJTypeFilter(""); setJPoseurFilter(""); setJQuickPeriod(""); };
            const hasFilters = jSearch || jDateFrom || jDateTo || jTechFilter || jTypeFilter || jPoseurFilter;

            const fSel = { padding: "8px 12px", fontSize: 13, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: T.radiusSm, color: "#fff", fontFamily: "inherit", outline: "none", appearance: "none", WebkitAppearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='white' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", width: "100%", boxSizing: "border-box" };
            const fInp = { width: "100%", padding: "8px 12px", fontSize: 13, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: T.radiusSm, color: "#fff", outline: "none", boxSizing: "border-box", fontFamily: "inherit" };
            const fLabel = { fontSize: 10, color: T.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 4 };

            return (
              <div>
                {/* Header with actions */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
                  <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#fff" }}>💰 Journal de compte</h2>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setJShowStats(!jShowStats)} style={{ background: jShowStats ? "rgba(200,164,78,0.15)" : "rgba(255,255,255,0.06)", border: jShowStats ? "1px solid rgba(200,164,78,0.3)" : "1px solid rgba(255,255,255,0.08)", color: jShowStats ? T.gold : T.textMuted, borderRadius: T.radiusSm, padding: "7px 14px", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit" }}>📊 Stats</button>
                    <button onClick={exportCSV} style={{ background: "rgba(6,214,160,0.1)", border: "1px solid rgba(6,214,160,0.2)", color: "#06D6A0", borderRadius: T.radiusSm, padding: "7px 14px", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit" }}>📥 CSV</button>
                    <button onClick={exportPDF} style={{ background: "rgba(239,71,111,0.1)", border: "1px solid rgba(239,71,111,0.2)", color: "#EF476F", borderRadius: T.radiusSm, padding: "7px 14px", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit" }}>📄 PDF</button>
                  </div>
                </div>

                {/* Filters */}
                <Card style={{ padding: 16, marginBottom: 14 }}>
                  <div className="aurenis-filter-row" style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "end" }}>
                    <div style={{ flex: "1 1 180px" }}><label style={fLabel}>🔍 Recherche</label><input type="text" placeholder="Réf, client, tech, adresse..." value={jSearch} onChange={e => setJSearch(e.target.value)} style={fInp} /></div>
                    <div style={{ flex: "0 0 135px" }}><label style={fLabel}>📅 Du</label><input type="date" value={jDateFrom} onChange={e => { setJDateFrom(e.target.value); setJQuickPeriod(""); }} style={fInp} /></div>
                    <div style={{ flex: "0 0 135px" }}><label style={fLabel}>📅 Au</label><input type="date" value={jDateTo} onChange={e => { setJDateTo(e.target.value); setJQuickPeriod(""); }} style={fInp} /></div>
                    <div style={{ flex: "0 0 140px" }}><label style={fLabel}>👨‍🔧 Technicien</label><select value={jTechFilter} onChange={e => setJTechFilter(e.target.value)} style={fSel}><option value="">Tous</option>{techNames.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                    <div style={{ flex: "0 0 130px" }}><label style={fLabel}>🔧 Type</label><select value={jTypeFilter} onChange={e => setJTypeFilter(e.target.value)} style={fSel}><option value="">Tous</option>{typeNames.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                    <div style={{ flex: "0 0 140px" }}><label style={fLabel}>👷 Poseur</label><select value={jPoseurFilter} onChange={e => setJPoseurFilter(e.target.value)} style={fSel}><option value="">Tous</option><option value="__all__">Avec poseur</option>{poseurNames.map(p => <option key={p} value={p}>{p}</option>)}</select></div>
                    {hasFilters && <div style={{ flex: "0 0 auto" }}><label style={{ ...fLabel, color: "transparent" }}>&nbsp;</label><button onClick={resetFilters} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: T.textMuted, borderRadius: T.radiusSm, padding: "8px 12px", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>✕ Reset</button></div>}
                  </div>
                  <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                    {[{ key: "today", label: "Aujourd'hui" }, { key: "yesterday", label: "Hier" }, { key: "week", label: "7 jours" }, { key: "month", label: "Ce mois" }, { key: "lastmonth", label: "Mois dernier" }, { key: "", label: "Tout" }].map(p => (
                      <button key={p.key} onClick={() => applyQuickPeriod(p.key)} style={{ background: jQuickPeriod === p.key ? "rgba(200,164,78,0.15)" : "rgba(255,255,255,0.04)", border: jQuickPeriod === p.key ? "1px solid rgba(200,164,78,0.3)" : "1px solid rgba(255,255,255,0.06)", color: jQuickPeriod === p.key ? T.gold : T.textMuted, borderRadius: 20, padding: "3px 12px", cursor: "pointer", fontSize: 11, fontWeight: 600, fontFamily: "inherit" }}>{p.label}</button>
                    ))}
                  </div>
                </Card>

                {/* Stats */}
                {jShowStats && (
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
                      {[
                        { label: "Interventions", value: jStats.count, color: T.gold, icon: "📋" },
                        { label: "CA Total", value: `${fmt(jStats.total)} €`, color: "#06D6A0", icon: "💰" },
                        { label: "Commissions", value: `-${fmt(jStats.totalC)} €`, color: "#EF476F", icon: "💸" },
                        { label: "Poseurs", value: `-${fmt(jStats.totalP)} €`, color: "#EC4899", icon: "👷" },
                        { label: "Net Patron", value: `${fmt(jStats.net)} €`, color: T.gold, icon: "🏢" },
                        { label: "Moy / inter", value: `${fmt(jStats.avg)} €`, color: "#818CF8", icon: "📈" },
                      ].map((s, i) => <KPI key={i} label={s.label} value={s.value} color={s.color} icon={s.icon} />)}
                    </div>
                    <div className="aurenis-stats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <Card style={{ padding: 14 }}>
                        <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>👨‍🔧 Par technicien</div>
                        {Object.entries(jStats.byTech).map(([name, d]) => (
                          <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                            <div><span style={{ fontWeight: 600, fontSize: 13, color: "#fff" }}>{name}</span><span style={{ color: T.textMuted, fontSize: 11, marginLeft: 8 }}>{d.count} inter</span></div>
                            <div style={{ display: "flex", gap: 14, fontSize: 12 }}><span style={{ color: "#06D6A0" }}>{fmt(d.ca)} €</span><span style={{ color: T.gold, fontWeight: 700 }}>{fmt(d.net)} € net</span></div>
                          </div>
                        ))}
                      </Card>
                      <Card style={{ padding: 14 }}>
                        <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>🔧 Par type</div>
                        {Object.entries(jStats.byType).map(([type, d]) => {
                          const tc = typeColors[type] || T.blue; const pct = jStats.total > 0 ? (d.ca / jStats.total * 100) : 0;
                          return (<div key={type} style={{ marginBottom: 10 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ color: tc, fontWeight: 600, fontSize: 13 }}>{type}</span><span style={{ fontSize: 11, color: T.textMuted }}>{d.count} inter · {fmt(d.ca)} € ({pct.toFixed(0)}%)</span></div>
                            <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 4, height: 5, overflow: "hidden" }}><div style={{ width: `${pct}%`, height: "100%", background: tc, borderRadius: 4 }} /></div>
                          </div>);
                        })}
                      </Card>
                    </div>
                  </div>
                )}

                {/* Table */}
                <Card style={{ padding: 0, overflow: "hidden" }}>
                  {/* Table header */}
                  <div className="aurenis-journal-grid aurenis-journal-head" style={{ display: "grid", gridTemplateColumns: "80px 85px 1fr 75px 85px 80px 100px 90px", padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.08)", fontSize: 10, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700 }}>
                    <div onClick={() => toggleSort("ref")} style={{ cursor: "pointer" }}>Réf <SortIcon field="ref" /></div>
                    <div onClick={() => toggleSort("date")} style={{ cursor: "pointer" }}>Date <SortIcon field="date" /></div>
                    <div>Client / Tech</div>
                    <div>Type</div>
                    <div onClick={() => toggleSort("ttc")} style={{ cursor: "pointer", textAlign: "right" }}>TTC <SortIcon field="ttc" /></div>
                    <div style={{ textAlign: "right" }}>Comm.</div>
                    <div style={{ textAlign: "right" }}>Poseur</div>
                    <div onClick={() => toggleSort("net")} style={{ cursor: "pointer", textAlign: "right" }}>Net <SortIcon field="net" /></div>
                  </div>

                  {jFiltered.length === 0 && <div style={{ padding: 40, textAlign: "center" }}><div style={{ fontSize: 36, opacity: 0.3, marginBottom: 8 }}>🔍</div><div style={{ fontSize: 13, color: T.textSoft }}>Aucune intervention trouvée</div></div>}

                  {jFiltered.map((inter, idx) => {
                    const comm = calcCommission(inter);
                    const net = calcNetPatron(inter);
                    const isExpanded = jExpandedRow === inter.ref;
                    return (
                      <div key={inter.ref}>
                        <div onClick={() => setJExpandedRow(isExpanded ? null : inter.ref)} className="aurenis-journal-grid" style={{
                          display: "grid", gridTemplateColumns: "80px 85px 1fr 75px 85px 80px 100px 90px",
                          padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.03)",
                          fontSize: 13, alignItems: "center", cursor: "pointer",
                          background: isExpanded ? "rgba(200,164,78,0.04)" : idx % 2 ? "rgba(255,255,255,0.02)" : "transparent", transition: "background 0.15s"
                        }}
                          onMouseEnter={e => { if (!isExpanded) e.currentTarget.style.background = "rgba(200,164,78,0.03)"; }}
                          onMouseLeave={e => { if (!isExpanded) e.currentTarget.style.background = idx % 2 ? "rgba(255,255,255,0.02)" : "transparent"; }}
                        >
                          <span style={{ fontWeight: 700, color: T.gold, fontSize: 11 }}>{inter.ref}</span>
                          <span style={{ color: T.textMuted, fontSize: 12 }}>{inter.date}</span>
                          <div>
                            <span style={{ fontWeight: 600, color: "#fff", fontSize: 13 }}>{inter.clientNom} {inter.clientPrenom}</span>
                            <span style={{ color: T.textMuted, fontSize: 11, marginLeft: 6 }}>({inter.tech})</span>
                          </div>
                          <div><TypeBadge type={inter.type} /></div>
                          <div style={{ textAlign: "right", fontWeight: 700, color: "#06D6A0" }}>{fmt(inter.ttc)} €</div>
                          <div style={{ textAlign: "right", color: "#EF476F", fontSize: 12 }}>-{fmt(comm)} €</div>
                          <div style={{ textAlign: "right", color: inter.poseurCost > 0 ? "#EC4899" : "rgba(255,255,255,0.1)", fontSize: 12 }}>
                            {inter.poseurCost > 0 ? <>👷 -{fmt(inter.poseurCost)} €</> : "—"}
                          </div>
                          <div style={{ textAlign: "right", fontWeight: 800, color: T.gold }}>{fmt(net)} €</div>
                        </div>
                        {isExpanded && (
                          <div style={{ padding: "10px 14px 10px 14px", background: "rgba(200,164,78,0.03)", borderBottom: "1px solid rgba(200,164,78,0.08)", fontSize: 12, display: "flex", flexWrap: "wrap", gap: 14 }}>
                            <div><div style={{ color: T.textMuted, fontSize: 10, textTransform: "uppercase", marginBottom: 2 }}>📞 Téléphone</div><div style={{ color: "#fff" }}>{inter.tel}</div></div>
                            <div><div style={{ color: T.textMuted, fontSize: 10, textTransform: "uppercase", marginBottom: 2 }}>📍 Adresse</div><div style={{ color: "#fff" }}>{inter.adresse}</div></div>
                            <div><div style={{ color: T.textMuted, fontSize: 10, textTransform: "uppercase", marginBottom: 2 }}>⚡ Mode</div><div><ModeBadge mode={inter.mode} /></div></div>
                            {inter.poseur && <div><div style={{ color: T.textMuted, fontSize: 10, textTransform: "uppercase", marginBottom: 2 }}>👷 Poseur</div><div style={{ color: "#EC4899", fontWeight: 600 }}>{inter.poseur} · {fmt(inter.poseurCost)} € · {inter.poseurMode === "divise2" ? "÷2" : "Gratuit"}</div></div>}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Total row */}
                  {jFiltered.length > 0 && (
                    <div className="aurenis-journal-grid" style={{ display: "grid", gridTemplateColumns: "80px 85px 1fr 75px 85px 80px 100px 90px", padding: "12px 14px", borderTop: "2px solid rgba(200,164,78,0.2)", fontSize: 13, fontWeight: 700, alignItems: "center", background: "rgba(200,164,78,0.04)" }}>
                      <div style={{ color: T.gold, gridColumn: "span 4" }}>TOTAL — {jStats.count} intervention{jStats.count > 1 ? "s" : ""}</div>
                      <div style={{ textAlign: "right", color: "#06D6A0" }}>{fmt(jStats.total)} €</div>
                      <div style={{ textAlign: "right", color: "#EF476F" }}>-{fmt(jStats.totalC)} €</div>
                      <div style={{ textAlign: "right", color: "#EC4899" }}>{jStats.totalP > 0 ? `-${fmt(jStats.totalP)} €` : "—"}</div>
                      <div style={{ textAlign: "right", color: T.gold, fontWeight: 800 }}>{fmt(jStats.net)} €</div>
                    </div>
                  )}
                </Card>
              </div>
            );
          };
          return <JournalTab />;
        })()}

        {/* ═══ PARAMÈTRES ═══ */}
        {tab === "params" && (
          <div>
            <Card style={{ marginBottom: 20 }}>
              <SectionTitle right={<span style={{ fontSize: 11, color: T.gold, background: "rgba(200,164,78,0.1)", padding: "4px 12px", borderRadius: 8, fontWeight: 700 }}>CONFIGURATION</span>}>Paramètres du système</SectionTitle>

              <ConfigList
                items={specialties}
                onAdd={item => { if (!specialties.includes(item)) setSpecialties(prev => [...prev, item]); }}
                onRemove={item => { if (specialties.length > 1) setSpecialties(prev => prev.filter(s => s !== item)); }}
                label="Spécialités / Types"
                icon="🔧"
                color="#0EA5E9"
              />

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20, marginTop: 10 }} />

              <ConfigList
                items={statuts}
                onAdd={item => { if (!statuts.includes(item)) setStatuts(prev => [...prev, item]); }}
                onRemove={item => { if (statuts.length > 1 && item !== "Validée") setStatuts(prev => prev.filter(s => s !== item)); }}
                label="Statuts d'intervention"
                icon="📌"
                color="#06D6A0"
              />

              <div style={{ background: "rgba(67,97,238,0.06)", borderRadius: 12, padding: 14, border: "1px solid rgba(67,97,238,0.1)", marginTop: 10 }}>
                <div style={{ fontSize: 12, color: T.textSoft, lineHeight: 1.6 }}>
                  <strong style={{ color: "#818CF8" }}>ℹ️ Info :</strong> Le statut <strong style={{ color: "#06D6A0" }}>Validée</strong> est obligatoire car il déclenche le calcul définitif des commissions. Les autres statuts peuvent être personnalisés librement. Les spécialités ajoutées seront disponibles dans le formulaire de modification des interventions.
                </div>
              </div>
            </Card>

            <Card>
              <SectionTitle>📍 Autocomplétion d'adresse</SectionTitle>
              <div style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(6,214,160,0.06)", borderRadius: 12, padding: 16, border: "1px solid rgba(6,214,160,0.12)", marginBottom: 12 }}>
                <span style={{ fontSize: 28 }}>🌍</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#06D6A0", marginBottom: 2 }}>Google Places API + Base Adresse Nationale</div>
                  <div style={{ fontSize: 12, color: T.textSoft }}>L'autocomplétion utilise Google Places API en priorité, avec fallback sur l'API gouv.fr (BAN). Toutes les adresses de France sont couvertes.</div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* EDIT MODAL — FULL ADMIN CONTROL */}
      <Modal open={!!editModal} onClose={() => setEditModal(null)} title="Modifier l'intervention" width={540}>
        {editModal && (() => {
          const inter = interventions.find(i => i.ref === editModal);
          if (!inter) return null;
          const selStyle = { width: "100%", padding: "12px", fontSize: 14, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: T.radiusSm, color: "#fff", fontFamily: "inherit" };
          const lbl = (t) => ({ fontSize: 12, color: T.textMuted, display: "block", marginBottom: 4, fontWeight: 600 });
          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* REF Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontWeight: 800, color: T.gold, fontSize: 16 }}>{inter.ref}</span>
                <Badge status={inter.statut} />
              </div>

              {/* ROW: Date + Heure */}
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={lbl()}>📅 Date</label>
                  <input type="date" value={inter.date} onChange={e => updateIntervention(inter.ref, { date: e.target.value })} style={{ ...selStyle, padding: "10px 12px" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={lbl()}>🕐 Heure</label>
                  <input type="time" value={inter.heure} onChange={e => updateIntervention(inter.ref, { heure: e.target.value })} style={{ ...selStyle, padding: "10px 12px" }} />
                </div>
              </div>

              {/* ROW: Statut + Type */}
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={lbl()}>📌 Statut</label>
                  <select value={inter.statut} onChange={e => updateIntervention(inter.ref, { statut: e.target.value })} style={selStyle}>
                    {statuts.map(s => <option key={s} value={s} style={{ background: "#1E2243" }}>{s}</option>)}
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={lbl()}>🔧 Spécialité</label>
                  <select value={inter.type} onChange={e => updateIntervention(inter.ref, { type: e.target.value })} style={selStyle}>
                    {specialties.map(s => <option key={s} value={s} style={{ background: "#1E2243" }}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* ROW: Mode + TTC */}
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={lbl()}>⚡ Mode</label>
                  <select value={inter.mode} onChange={e => updateIntervention(inter.ref, { mode: e.target.value })} style={selStyle}>
                    <option value="Urgence" style={{ background: "#1E2243" }}>⚡ Urgence</option>
                    <option value="RDV" style={{ background: "#1E2243" }}>📅 RDV</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={lbl()}>💰 Montant TTC (€)</label>
                  <Inp placeholder="Montant" type="number" value={inter.ttc || ""} onChange={e => updateIntervention(inter.ref, { ttc: parseFloat(e.target.value) || 0 })} />
                </div>
              </div>

              {/* Technicien attribué */}
              <div>
                <label style={lbl()}>👨‍🔧 Technicien attribué</label>
                <select value={inter.tech} onChange={e => {
                  const newTech = techs.find(t => t.name === e.target.value);
                  updateIntervention(inter.ref, { tech: e.target.value, commRate: newTech ? newTech.commission : inter.commRate });
                }} style={selStyle}>
                  {techs.map(t => <option key={t.id} value={t.name} style={{ background: "#1E2243" }}>{t.name} ({t.spe} · {(t.commission * 100)}%)</option>)}
                </select>
              </div>

              {/* Client info */}
              <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 14 }}>
                <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>👤 Client</div>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ flex: 1 }}><label style={lbl()}>Nom</label><Inp placeholder="Nom" value={inter.clientNom} onChange={e => updateIntervention(inter.ref, { clientNom: e.target.value })} /></div>
                  <div style={{ flex: 1 }}><label style={lbl()}>Prénom</label><Inp placeholder="Prénom" value={inter.clientPrenom} onChange={e => updateIntervention(inter.ref, { clientPrenom: e.target.value })} /></div>
                </div>
                <div style={{ marginTop: 10 }}><label style={lbl()}>Adresse</label><AddressAutocomplete value={inter.adresse} onChange={v => updateIntervention(inter.ref, { adresse: v })} /></div>
                <div style={{ marginTop: 10 }}><label style={lbl()}>Téléphone</label><Inp placeholder="Tél" value={inter.tel} onChange={e => updateIntervention(inter.ref, { tel: e.target.value })} /></div>
              </div>

              {/* Poseur section */}
              <div style={{ background: "rgba(236,72,153,0.04)", borderRadius: 12, padding: 14, border: "1px solid rgba(236,72,153,0.1)" }}>
                <div style={{ fontSize: 11, color: "#EC4899", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>👷 Poseur</div>
                <select value={inter.poseur || ""} onChange={e => updateIntervention(inter.ref, { poseur: e.target.value || null, poseurCost: e.target.value ? inter.poseurCost : 0, poseurMode: e.target.value ? (inter.poseurMode || "divise2") : null })} style={selStyle}>
                  <option value="" style={{ background: "#1E2243" }}>Aucun poseur</option>
                  {INIT_POSEURS.map(p => <option key={p.id} value={p.name} style={{ background: "#1E2243" }}>{p.name} ({p.spe})</option>)}
                </select>
                {inter.poseur && (
                  <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                    <div><label style={lbl()}>Coût poseur (€)</label><Inp placeholder="Coût" type="number" value={inter.poseurCost || ""} onChange={e => updateIntervention(inter.ref, { poseurCost: parseFloat(e.target.value) || 0 })} /></div>
                    <div>
                      <label style={lbl()}>Mode poseur</label>
                      <div style={{ display: "flex", gap: 10 }}>
                        {[{ v: "divise2", l: "÷ 2 (partagé)" }, { v: "gratuit", l: "Gratuit (patron)" }].map(o => (
                          <button key={o.v} onClick={() => updateIntervention(inter.ref, { poseurMode: o.v })} style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: inter.poseurMode === o.v ? "1.5px solid " + T.gold : "1.5px solid rgba(255,255,255,0.08)", background: inter.poseurMode === o.v ? "rgba(200,164,78,0.1)" : "rgba(255,255,255,0.04)", color: inter.poseurMode === o.v ? T.gold : T.textMuted, cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit" }}>{o.l}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* APERÇU CALCUL */}
              {inter.ttc > 0 && (
                <div style={{ background: "rgba(200,164,78,0.06)", borderRadius: 12, padding: 14, border: "1px solid rgba(200,164,78,0.12)" }}>
                  <div style={{ fontSize: 11, color: T.gold, marginBottom: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>📊 Aperçu financier</div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: T.textSoft, marginBottom: 4 }}><span>Montant TTC</span><span style={{ fontWeight: 700, color: "#fff" }}>{inter.ttc.toLocaleString("fr-FR")} €</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: T.textSoft, marginBottom: 4 }}><span>Commission brute ({(inter.commRate * 100)}%)</span><span>{(inter.ttc * inter.commRate).toLocaleString("fr-FR")} €</span></div>
                  {inter.poseur && inter.poseurMode === "divise2" && <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#EF476F", marginBottom: 4 }}><span>Part poseur déduite tech (÷2)</span><span>-{(inter.poseurCost / 2).toLocaleString("fr-FR")} €</span></div>}
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#06D6A0", fontWeight: 700, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 6, marginTop: 4 }}><span>Commission nette tech</span><span>{calcCommission(inter).toLocaleString("fr-FR")} €</span></div>
                  {inter.poseur && <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#EC4899", marginTop: 4 }}><span>Coût poseur total</span><span>-{inter.poseurCost.toLocaleString("fr-FR")} €</span></div>}
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: T.gold, fontWeight: 800, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 6, marginTop: 6 }}><span>Net patron</span><span>{calcNetPatron(inter).toLocaleString("fr-FR")} €</span></div>
                </div>
              )}

              {/* Actions */}
              <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
                <button className="wa-btn" onClick={() => sendWhatsApp(inter.tel, waMessageClient(inter))} style={{ padding: "10px 14px", fontSize: 12, flex: 1 }}>📱 WhatsApp Client</button>
                {(() => { const t = techs.find(tc => tc.name === inter.tech); return t ? <button className="wa-btn" onClick={() => sendWhatsApp(t.tel, waMessageTech(inter, t.name))} style={{ padding: "10px 14px", fontSize: 12, flex: 1 }}>📱 WhatsApp Tech</button> : null; })()}
                <Btn onClick={() => setEditModal(null)} variant="ghost" style={{ flex: 1 }}>Fermer</Btn>
                {inter.statut === "Terminée" && <Btn onClick={() => { validerIntervention(inter.ref); setEditModal(null); }} style={{ flex: 1 }}>✅ Valider</Btn>}
              </div>
            </div>
          );
        })()}
      </Modal>

      {/* COMMISSION MODAL */}
      <Modal open={!!commModal} onClose={() => setCommModal(null)} title="Modifier le taux de commission">
        {commModal && (() => {
          const tech = techs.find(t => t.id === commModal);
          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ fontSize: 14, color: "#fff", fontWeight: 600 }}>{tech?.name}</div>
              <div style={{ fontSize: 13, color: T.textMuted }}>Taux actuel : <strong style={{ color: T.gold }}>{(tech?.commission * 100)}%</strong></div>
              <div><label style={{ fontSize: 12, color: T.textMuted, display: "block", marginBottom: 4 }}>Nouveau taux (%)</label><Inp placeholder="Ex: 25" type="number" value={newRate} onChange={e => setNewRate(e.target.value)} /></div>
              <div style={{ background: "rgba(67,97,238,0.08)", borderRadius: T.radiusXs, padding: "10px 14px", fontSize: 12, color: T.textSoft, lineHeight: 1.6 }}>⚠️ Le nouveau taux s'appliquera uniquement aux <strong>futures interventions</strong>. Les interventions passées gardent leur taux d'origine.</div>
              <div style={{ display: "flex", gap: 10 }}>
                <Btn onClick={() => setCommModal(null)} variant="ghost" style={{ flex: 1 }}>Annuler</Btn>
                <Btn onClick={() => changeTechRate(commModal)} style={{ flex: 1 }}>Appliquer {newRate}%</Btn>
              </div>
            </div>
          );
        })()}
      </Modal>

      {/* TELEPHONE MODAL */}
      <Modal open={!!telModal} onClose={() => setTelModal(null)} title="Modifier le téléphone">
        {telModal && (() => {
          const tech = techs.find(t => t.id === telModal);
          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ fontSize: 14, color: "#fff", fontWeight: 600 }}>{tech?.name}</div>
              <div style={{ fontSize: 13, color: T.textMuted }}>Numéro actuel : <strong style={{ color: T.gold }}>{tech?.tel}</strong></div>
              <div><label style={{ fontSize: 12, color: T.textMuted, display: "block", marginBottom: 4 }}>Nouveau numéro</label><Inp icon="📞" placeholder="+33 6 12 34 56 78" value={newTel} onChange={e => setNewTel(e.target.value)} onKeyDown={e => e.key === "Enter" && changeTechTel(telModal)} /></div>
              <div style={{ display: "flex", gap: 10 }}>
                <Btn onClick={() => setTelModal(null)} variant="ghost" style={{ flex: 1 }}>Annuler</Btn>
                <Btn onClick={() => changeTechTel(telModal)} style={{ flex: 1 }}>✅ Enregistrer</Btn>
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   TECH DASHBOARD   ═══════════════════════════════════════════════════════════ */
const TechDash = ({ account, onLogout, interventions, setInterventions, techs, specialties }) => {
  const [time, setTime] = useState(new Date());
  const [statusTab, setStatusTab] = useState("all");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [editRef, setEditRef] = useState(null);
  const [editTTC, setEditTTC] = useState("");

  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearTimeout(t); }, []);

  const tech = techs.find(t => t.id === account.memberId);
  const myInter = interventions.filter(i => i.tech === tech?.name);

  const filtered = useMemo(() => {
    let d = [...myInter];
    if (statusTab === "terminees") d = d.filter(i => i.statut === "Terminée");
    else if (statusTab === "encours") d = d.filter(i => i.statut === "En cours");
    else if (statusTab === "planifiees") d = d.filter(i => i.statut === "Planifiée");
    else if (statusTab === "validees") d = d.filter(i => i.statut === "Validée");
    if (search.trim()) { const q = search.toLowerCase(); d = d.filter(i => `${i.clientNom} ${i.clientPrenom}`.toLowerCase().includes(q) || i.ref.toLowerCase().includes(q) || i.adresse.toLowerCase().includes(q)); }
    if (filterType !== "all") d = d.filter(i => i.type === filterType);
    if (dateFrom) d = d.filter(i => i.date >= dateFrom);
    if (dateTo) d = d.filter(i => i.date <= dateTo);
    return d;
  }, [myInter, statusTab, search, filterType, dateFrom, dateTo]);

  const validees = myInter.filter(i => i.statut === "Validée");
  const totalCA = validees.reduce((s, i) => s + i.ttc, 0);
  const totalComm = validees.reduce((s, i) => s + calcCommission(i), 0);
  const activeFilters = [search.trim(), filterType !== "all", dateFrom, dateTo].filter(Boolean).length;
  const types = [...new Set([...specialties, ...myInter.map(i => i.type)])];
  const dateStyle = { padding: "9px 12px", fontSize: 13, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, color: "#fff", outline: "none", fontFamily: "inherit" };

  const saveTTC = (ref) => {
    const val = parseFloat(editTTC);
    if (!isNaN(val) && val >= 0) {
      setInterventions(prev => prev.map(i => i.ref === ref ? { ...i, ttc: val } : i));
    }
    setEditRef(null); setEditTTC("");
  };

  return (
    <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", background: `linear-gradient(160deg, ${T.dark} 0%, ${T.bg} 40%, ${T.dark} 100%)`, minHeight: "100vh" }}>
      <Header account={account} onLogout={onLogout} />
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <div><h1 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 800, color: "#fff" }}>Bonjour {tech?.name.split(" ")[0]} 👋</h1><p style={{ margin: 0, fontSize: 13, color: T.textMuted }}>Votre activité</p></div>
          <div style={{ textAlign: "right" }}><div style={{ fontSize: 20, fontWeight: 700, background: "linear-gradient(135deg, #C8A44E, #E8C96A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{time.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</div></div>
        </div>

        <div className="aurenis-kpis">
          <KPI label="Interventions" value={myInter.length} color={T.gold} icon="📋" />
          <KPI label="Validées" value={validees.length} color="#06D6A0" icon="✅" />
          <KPI label="Mon CA" value={`${totalCA.toLocaleString("fr-FR")} €`} color="#059669" icon="💰" />
          <KPI label="Mes commissions" value={`${totalComm.toLocaleString("fr-FR")} €`} color="#EF476F" icon="💸" />
          <KPI label="Mon taux" value={`${(tech?.commission * 100)}%`} color={tech?.color} icon="📊" />
        </div>

        {/* FILTERS */}
        <Card style={{ padding: 16, marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
              <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, opacity: 0.4, pointerEvents: "none" }}>🔍</div>
              <input type="text" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: "100%", padding: "10px 14px 10px 38px", fontSize: 13, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, color: "#fff", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
            </div>
            <button onClick={() => setShowFilters(!showFilters)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 16px", borderRadius: 12, background: showFilters ? "rgba(200,164,78,0.15)" : "rgba(255,255,255,0.06)", border: showFilters ? "1px solid rgba(200,164,78,0.3)" : "1px solid rgba(255,255,255,0.08)", color: showFilters ? T.gold : T.textSoft, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "inherit" }}>⚙️ Filtres {activeFilters > 0 && <span style={{ background: T.gold, color: T.dark, width: 18, height: 18, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>{activeFilters}</span>}</button>
            {activeFilters > 0 && <button onClick={() => { setSearch(""); setFilterType("all"); setDateFrom(""); setDateTo(""); }} style={{ padding: "10px 14px", borderRadius: 12, border: "1px solid rgba(239,71,111,0.2)", background: "rgba(239,71,111,0.08)", color: "#EF476F", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit" }}>✕ Effacer</button>}
          </div>
          {showFilters && (
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>🔧 Spécialité</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button onClick={() => setFilterType("all")} style={{ padding: "7px 16px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit", background: filterType === "all" ? "rgba(200,164,78,0.2)" : "rgba(255,255,255,0.04)", color: filterType === "all" ? T.gold : T.textMuted }}>Toutes</button>
                  {types.map(t => <button key={t} onClick={() => setFilterType(filterType === t ? "all" : t)} style={{ padding: "7px 16px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit", background: filterType === t ? `${typeColors[t]}33` : "rgba(255,255,255,0.04)", color: filterType === t ? typeColors[t] : T.textMuted, display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 4, background: typeColors[t], opacity: filterType === t ? 1 : 0.4 }} />{t}</button>)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>📅 Période</div>
                <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ fontSize: 12, color: T.textMuted }}>Du</span><input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} style={dateStyle} /></div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ fontSize: 12, color: T.textMuted }}>Au</span><input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} style={dateStyle} /></div>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* STATUS TABS */}
        <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 4, marginBottom: 14, border: "1px solid rgba(255,255,255,0.06)", flexWrap: "wrap" }}>
          {[{ id: "all", l: "Toutes" }, { id: "validees", l: "Validées" }, { id: "terminees", l: "En attente" }, { id: "encours", l: "En cours" }, { id: "planifiees", l: "Planifiées" }].map(t => (
            <button key={t.id} onClick={() => setStatusTab(t.id)} style={{ flex: 1, padding: "8px 14px", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit", background: statusTab === t.id ? "rgba(255,255,255,0.1)" : "transparent", color: statusTab === t.id ? "#fff" : T.textMuted, minWidth: 80 }}>{t.l}</button>
          ))}
        </div>

        {/* LIST */}
        <Card style={{ padding: 0, overflow: "hidden" }}>
          {filtered.length === 0 ? (
            <div style={{ padding: 48, textAlign: "center" }}><div style={{ fontSize: 40, opacity: 0.3, marginBottom: 8 }}>🔍</div><div style={{ fontSize: 14, color: T.textSoft }}>Aucune intervention</div></div>
          ) : filtered.map((inter, idx) => {
            const commBrute = inter.ttc * inter.commRate;
            const commNette = calcCommission(inter);
            const isEditing = editRef === inter.ref;
            const canEdit = inter.statut !== "Validée";
            return (
              <div key={inter.ref} style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.04)", background: idx % 2 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                {/* Row 1: main info */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: inter.poseur ? 10 : 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700, color: T.gold, fontSize: 13 }}>{inter.ref}</span>
                    <span style={{ color: T.textSoft, fontSize: 12 }}>{inter.date} {inter.heure}</span>
                    <TypeBadge type={inter.type} />
                    <ModeBadge mode={inter.mode} />
                    <span style={{ fontSize: 13, color: T.textSoft }}>{inter.clientNom} {inter.clientPrenom}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Badge status={inter.statut} />
                    {isEditing ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <input type="number" value={editTTC} onChange={e => setEditTTC(e.target.value)} onKeyDown={e => e.key === "Enter" && saveTTC(inter.ref)} style={{ width: 80, padding: "6px 10px", fontSize: 14, fontWeight: 700, background: "rgba(255,255,255,0.1)", border: "1px solid " + T.gold, borderRadius: 8, color: "#06D6A0", outline: "none", fontFamily: "inherit", textAlign: "right" }} autoFocus />
                        <span style={{ color: T.textMuted, fontSize: 14 }}>€</span>
                        <Btn onClick={() => saveTTC(inter.ref)} style={{ padding: "4px 10px", fontSize: 11 }}>✓</Btn>
                        <button onClick={() => { setEditRef(null); setEditTTC(""); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: T.textMuted }}>✕</button>
                      </div>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontWeight: 800, fontSize: 15, color: inter.ttc > 0 ? "#06D6A0" : "rgba(255,255,255,0.15)" }}>{inter.ttc > 0 ? `${inter.ttc} €` : "—"}</span>
                        {canEdit && <button onClick={() => { setEditRef(inter.ref); setEditTTC(String(inter.ttc || "")); }} style={{ background: "rgba(255,255,255,0.06)", border: "none", borderRadius: 6, padding: "3px 8px", cursor: "pointer", fontSize: 11, color: T.textMuted }}>✏️</button>}
                        {inter.statut === "Validée" && <span style={{ fontSize: 10, color: "#06D6A0" }}>🔒</span>}
                      </div>
                    )}
                  </div>
                </div>

                {/* Row 2: commission breakdown if poseur */}
                {inter.poseur && inter.ttc > 0 && (
                  <div style={{ background: "rgba(236,72,153,0.05)", borderRadius: 10, padding: "10px 14px", border: "1px solid rgba(236,72,153,0.1)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: 12, color: "#EC4899", fontWeight: 700 }}>👷 Poseur : {inter.poseur} ({inter.poseurCost} €)</span>
                      <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 6, background: inter.poseurMode === "divise2" ? "rgba(255,210,80,0.15)" : "rgba(6,214,160,0.15)", color: inter.poseurMode === "divise2" ? "#FFD166" : "#06D6A0", fontWeight: 600 }}>
                        {inter.poseurMode === "divise2" ? "÷ 2" : "Gratuit"}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 20, flexWrap: "wrap", fontSize: 13 }}>
                      <span style={{ color: T.textSoft }}>Commission brute ({(inter.commRate * 100)}%) : <strong style={{ color: "#fff" }}>{commBrute.toLocaleString("fr-FR")} €</strong></span>
                      {inter.poseurMode === "divise2" && <span style={{ color: "#EF476F" }}>Part poseur : <strong>-{(inter.poseurCost / 2).toLocaleString("fr-FR")} €</strong></span>}
                      <span style={{ color: "#06D6A0", fontWeight: 700 }}>Commission nette : <strong>{commNette.toLocaleString("fr-FR")} €</strong></span>
                    </div>
                  </div>
                )}
                {/* Simple commission display if no poseur */}
                {!inter.poseur && inter.ttc > 0 && inter.statut === "Validée" && (
                  <div style={{ marginTop: 6, fontSize: 12, color: "#06D6A0" }}>💰 Commission ({(inter.commRate * 100)}%) : <strong>{commNette.toLocaleString("fr-FR")} €</strong></div>
                )}
              </div>
            );
          })}
          {filtered.filter(i => i.statut === "Validée").length > 0 && (
            <div style={{ padding: "14px 20px", background: "linear-gradient(135deg, rgba(200,164,78,0.1), rgba(200,164,78,0.04))", borderTop: "1px solid rgba(200,164,78,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <span style={{ fontWeight: 700, color: T.gold, fontSize: 13 }}>TOTAL VALIDÉ</span>
              <div style={{ display: "flex", gap: 20 }}>
                <span><span style={{ fontSize: 11, color: T.textMuted }}>CA </span><span style={{ fontWeight: 800, color: "#06D6A0", fontSize: 15 }}>{filtered.filter(i => i.statut === "Validée").reduce((s, i) => s + i.ttc, 0).toLocaleString("fr-FR")} €</span></span>
                <span><span style={{ fontSize: 11, color: T.textMuted }}>Commission </span><span style={{ fontWeight: 800, color: T.gold, fontSize: 15 }}>{filtered.filter(i => i.statut === "Validée").reduce((s, i) => s + calcCommission(i), 0).toLocaleString("fr-FR")} €</span></span>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   POSEUR DASHBOARD
   ═══════════════════════════════════════════════════════════ */
const PoseurDash = ({ account, onLogout, interventions }) => {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearTimeout(t); }, []);

  const poseur = INIT_POSEURS.find(p => p.id === account.memberId);
  const myInter = interventions.filter(i => i.poseur === poseur?.name);
  const validees = myInter.filter(i => i.statut === "Validée");
  const totalPose = myInter.reduce((s, i) => s + i.poseurCost, 0);

  return (
    <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", background: `linear-gradient(160deg, ${T.dark} 0%, ${T.bg} 40%, ${T.dark} 100%)`, minHeight: "100vh" }}>
      <Header account={account} onLogout={onLogout} />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
        <div style={{ marginBottom: 24 }}><h1 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 800, color: "#fff" }}>Bonjour {poseur?.name.split(" ")[0]} 👋</h1><p style={{ margin: 0, fontSize: 13, color: T.textMuted }}>Vos interventions en tant que poseur</p></div>

        <div className="aurenis-kpis">
          <KPI label="Mes poses" value={myInter.length} color="#EC4899" icon="👷" />
          <KPI label="Validées" value={validees.length} color="#06D6A0" icon="✅" />
          <KPI label="Total prestations" value={`${totalPose.toLocaleString("fr-FR")} €`} color="#EC4899" icon="💰" />
        </div>

        <Card style={{ padding: 0, overflow: "hidden" }}>
          {myInter.length === 0 ? (
            <div style={{ padding: 48, textAlign: "center" }}><div style={{ fontSize: 40, opacity: 0.3, marginBottom: 8 }}>👷</div><div style={{ fontSize: 14, color: T.textSoft }}>Aucune intervention assignée</div></div>
          ) : myInter.map((inter, idx) => (
            <div key={inter.ref} style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.04)", background: idx % 2 ? "rgba(255,255,255,0.02)" : "transparent" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 700, color: "#EC4899", fontSize: 13 }}>{inter.ref}</span>
                  <span style={{ color: T.textSoft, fontSize: 12 }}>{inter.date} {inter.heure}</span>
                  <TypeBadge type={inter.type} />
                  <ModeBadge mode={inter.mode} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Badge status={inter.statut} />
                  <span style={{ fontWeight: 800, color: "#EC4899", fontSize: 15 }}>{inter.poseurCost} €</span>
                </div>
              </div>
              <div style={{ marginTop: 8, fontSize: 12, color: T.textMuted }}>
                <span>Dépanneur : <strong style={{ color: "#fff" }}>{inter.tech}</strong></span>
                <span style={{ margin: "0 10px" }}>·</span>
                <span>Client : {inter.clientNom} {inter.clientPrenom}</span>
                <span style={{ margin: "0 10px" }}>·</span>
                <span>{inter.adresse}</span>
              </div>
              <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 6, background: inter.poseurMode === "divise2" ? "rgba(255,210,80,0.12)" : "rgba(6,214,160,0.12)", color: inter.poseurMode === "divise2" ? "#FFD166" : "#06D6A0", fontWeight: 600 }}>
                  {inter.poseurMode === "divise2" ? "Mode ÷ 2 (partagé avec dépanneur)" : "Mode gratuit (pris en charge par l'entreprise)"}
                </span>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("login");
  const [account, setAccount] = useState(null);
  const [verifyEmail, setVerifyEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [interventions, setInterventions] = useState(INIT_INTERVENTIONS);
  const [techs, setTechs] = useState(INIT_TECHS);
  const [specialties, setSpecialties] = useState(["Plomberie", "Serrurerie", "Électricité"]);
  const [statuts, setStatuts] = useState(["Planifiée", "En cours", "Terminée", "Validée"]);

  useEffect(() => {
    if (!document.querySelector('meta[name="viewport"]')) {
      const meta = document.createElement("meta"); meta.name = "viewport"; meta.content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}*{box-sizing:border-box}::placeholder{color:rgba(255,255,255,0.25)}input[type="date"]{color-scheme:dark}input[type="date"]::-webkit-calendar-picker-indicator{filter:invert(0.6);cursor:pointer}input[type="time"]{color-scheme:dark}input[type="time"]::-webkit-calendar-picker-indicator{filter:invert(0.6);cursor:pointer}select{appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='white' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center}
/* ═══ RESPONSIVE ═══ */
.aurenis-tabs{display:flex;gap:6px;background:rgba(255,255,255,0.04);border-radius:14px;padding:4px;border:1px solid rgba(255,255,255,0.06);overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}
.aurenis-tabs::-webkit-scrollbar{display:none}
.aurenis-tabs button{padding:8px 18px;border:none;border-radius:10px;cursor:pointer;font-size:13px;font-weight:600;font-family:inherit;background:transparent;color:rgba(255,255,255,0.4);transition:all 0.2s;white-space:nowrap;flex-shrink:0}
.aurenis-tabs button.active{background:rgba(255,255,255,0.1);color:#fff}
.aurenis-kpis{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:24px}
.aurenis-kpis>div{flex:1;min-width:150px}
.aurenis-header-inner{display:flex;justify-content:space-between;align-items:center;max-width:1100px;margin:0 auto}
.aurenis-header-right{display:flex;align-items:center;gap:14px}
.aurenis-inter-row{display:flex;justify-content:space-between;align-items:center;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.04);flex-wrap:wrap;gap:8px}
.aurenis-journal-grid{display:grid;grid-template-columns:80px 85px 1fr 75px 85px 80px 100px 90px;padding:10px 14px;font-size:13px;align-items:center}
.aurenis-stats-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.aurenis-filter-row{display:flex;gap:10px;flex-wrap:wrap;align-items:end}
.wa-btn{display:inline-flex;align-items:center;gap:4px;background:rgba(37,211,102,0.12);border:1px solid rgba(37,211,102,0.25);color:#25D366;border-radius:8px;padding:4px 10px;cursor:pointer;font-size:11px;font-weight:600;font-family:inherit;white-space:nowrap;transition:all 0.2s}
.wa-btn:hover{background:rgba(37,211,102,0.22)}
@media(max-width:768px){
.aurenis-header-inner{flex-direction:column;gap:10px;padding:10px 16px!important}
.aurenis-header-right{flex-wrap:wrap;justify-content:center;gap:8px}
.aurenis-header-right>span,.aurenis-header-right>div,.aurenis-header-right>button{font-size:11px!important}
.aurenis-tabs{padding:3px}
.aurenis-tabs button{padding:6px 12px;font-size:11px}
.aurenis-kpis>div{min-width:calc(50% - 8px);flex:unset}
.aurenis-inter-row{flex-direction:column;align-items:flex-start;gap:10px}
.aurenis-journal-grid{grid-template-columns:1fr 1fr!important;gap:6px 10px;font-size:12px}
.aurenis-journal-grid>div:nth-child(3){grid-column:span 2}
.aurenis-journal-grid>div:nth-child(4){display:none}
.aurenis-journal-head{display:none!important}
.aurenis-stats-grid{grid-template-columns:1fr}
.aurenis-filter-row>div{flex:1 1 100%!important;min-width:0!important}
.aurenis-filter-row>div:nth-child(2),.aurenis-filter-row>div:nth-child(3){flex:1 1 calc(50% - 5px)!important}
}
@media(max-width:480px){
.aurenis-kpis>div{min-width:100%}
.aurenis-journal-grid{grid-template-columns:1fr!important;gap:4px}
.aurenis-journal-grid>div:nth-child(3){grid-column:span 1}
.aurenis-journal-grid>div{text-align:left!important}
}
`}</style>

      {page === "login" && <LoginPage onLogin={a => { setAccount(a); setPage("dashboard"); }} onGoRegister={() => setPage("register")} onGoForgot={() => setPage("forgot")} />}
      {page === "register" && <RegisterPage onGoLogin={() => setPage("login")} onRegistered={(e, c) => { setVerifyEmail(e); setVerifyCode(c); setPage("verify"); }} />}
      {page === "verify" && <VerifyPage email={verifyEmail} code={verifyCode} onVerified={() => setPage("verified")} onGoLogin={() => setPage("login")} />}
      {page === "verified" && <VerifiedPage onGoLogin={() => setPage("login")} />}
      {page === "forgot" && <ForgotPage onGoLogin={() => setPage("login")} />}
      {page === "dashboard" && account?.role === "admin" && <AdminDash account={account} onLogout={() => { setAccount(null); setPage("login"); }} interventions={interventions} setInterventions={setInterventions} techs={techs} setTechs={setTechs} specialties={specialties} setSpecialties={setSpecialties} statuts={statuts} setStatuts={setStatuts} />}
      {page === "dashboard" && account?.role === "tech" && <TechDash account={account} onLogout={() => { setAccount(null); setPage("login"); }} interventions={interventions} setInterventions={setInterventions} techs={techs} specialties={specialties} />}
      {page === "dashboard" && account?.role === "poseur" && <PoseurDash account={account} onLogout={() => { setAccount(null); setPage("login"); }} interventions={interventions} />}
    </div>
  );
}
