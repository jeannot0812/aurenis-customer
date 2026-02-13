import { useState, useEffect, useMemo, useCallback, useRef } from "react";

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
  { ref: "INT-001", date: "2026-02-11", heure: "09:00", type: "Plomberie", mode: "Urgence", clientNom: "Dupont", clientPrenom: "Marie", tel: "+33 6 11 22 33 44", adresse: "12 rue de la Paix, 75002", tech: "Ahmed Benali", statut: "Validée", ttc: 350, commRate: 0.20, poseur: null, poseurCost: 0, poseurMode: null, techMedias: [], poseurMedias: [], poseurPrixPose: 0, poseurAchats: 0, poseurNote: "" },
  { ref: "INT-002", date: "2026-02-11", heure: "10:30", type: "Serrurerie", mode: "RDV", clientNom: "Martin", clientPrenom: "Pierre", tel: "+33 6 22 33 44 55", adresse: "5 av. des Champs, 75008", tech: "Lucas Martin", statut: "Validée", ttc: 280, commRate: 0.20, poseur: null, poseurCost: 0, poseurMode: null, techMedias: [], poseurMedias: [], poseurPrixPose: 0, poseurAchats: 0, poseurNote: "" },
  { ref: "INT-003", date: "2026-02-11", heure: "14:00", type: "Plomberie", mode: "RDV", clientNom: "Leroy", clientPrenom: "Jean", tel: "+33 6 33 44 55 66", adresse: "8 bd Voltaire, 75011", tech: "Karim Dupont", statut: "En cours", ttc: 0, commRate: 0.20, poseur: null, poseurCost: 0, poseurMode: null, techMedias: [], poseurMedias: [], poseurPrixPose: 0, poseurAchats: 0, poseurNote: "" },
  { ref: "INT-004", date: "2026-02-11", heure: "16:00", type: "Électricité", mode: "RDV", clientNom: "Petit", clientPrenom: "Sophie", tel: "+33 6 44 55 66 77", adresse: "22 rue Rivoli, 75004", tech: "David Lefebvre", statut: "Planifiée", ttc: 0, commRate: 0.25, poseur: null, poseurCost: 0, poseurMode: null, techMedias: [], poseurMedias: [], poseurPrixPose: 0, poseurAchats: 0, poseurNote: "" },
  { ref: "INT-005", date: "2026-02-12", heure: "08:30", type: "Plomberie", mode: "Urgence", clientNom: "Garcia", clientPrenom: "Luis", tel: "+33 6 55 66 77 88", adresse: "15 rue Monge, 75005", tech: "Ahmed Benali", statut: "Terminée", ttc: 420, commRate: 0.20, poseur: "Rachid Amrani", poseurCost: 150, poseurMode: "divise2", techMedias: [], poseurMedias: [], poseurPrixPose: 0, poseurAchats: 0, poseurNote: "" },
  { ref: "INT-006", date: "2026-02-12", heure: "11:00", type: "Serrurerie", mode: "Urgence", clientNom: "Bernard", clientPrenom: "Chloé", tel: "+33 6 66 77 88 99", adresse: "3 rue de Sèze, 75009", tech: "Lucas Martin", statut: "Terminée", ttc: 195, commRate: 0.20, poseur: null, poseurCost: 0, poseurMode: null, techMedias: [], poseurMedias: [], poseurPrixPose: 0, poseurAchats: 0, poseurNote: "" },
  { ref: "INT-007", date: "2026-02-12", heure: "15:00", type: "Plomberie", mode: "RDV", clientNom: "Moreau", clientPrenom: "Alice", tel: "+33 6 77 88 99 00", adresse: "41 rue Oberkampf, 75011", tech: "Karim Dupont", statut: "Validée", ttc: 310, commRate: 0.20, poseur: "Rachid Amrani", poseurCost: 120, poseurMode: "gratuit", techMedias: [], poseurMedias: [], poseurPrixPose: 0, poseurAchats: 0, poseurNote: "" },
  { ref: "INT-008", date: "2026-02-13", heure: "09:30", type: "Électricité", mode: "Urgence", clientNom: "Roux", clientPrenom: "Thomas", tel: "+33 6 88 99 00 11", adresse: "7 rue de Turbigo, 75003", tech: "David Lefebvre", statut: "Validée", ttc: 475, commRate: 0.25, poseur: null, poseurCost: 0, poseurMode: null, techMedias: [], poseurMedias: [], poseurPrixPose: 0, poseurAchats: 0, poseurNote: "" },
  { ref: "INT-009", date: "2026-02-13", heure: "14:00", type: "Plomberie", mode: "RDV", clientNom: "Blanc", clientPrenom: "Emma", tel: "+33 6 99 00 11 22", adresse: "18 rue de Rivoli, 75001", tech: "Ahmed Benali", statut: "Terminée", ttc: 290, commRate: 0.20, poseur: "Sofiane Belkacem", poseurCost: 100, poseurMode: "divise2", techMedias: [], poseurMedias: [], poseurPrixPose: 0, poseurAchats: 0, poseurNote: "" },
  { ref: "INT-010", date: "2026-02-14", heure: "10:00", type: "Serrurerie", mode: "Urgence", clientNom: "Faure", clientPrenom: "Marc", tel: "+33 6 10 20 30 40", adresse: "9 rue du Bac, 75007", tech: "Lucas Martin", statut: "Terminée", ttc: 365, commRate: 0.20, poseur: null, poseurCost: 0, poseurMode: null, techMedias: [], poseurMedias: [], poseurPrixPose: 0, poseurAchats: 0, poseurNote: "" },
  { ref: "INT-011", date: "2026-02-14", heure: "15:30", type: "Électricité", mode: "RDV", clientNom: "Robin", clientPrenom: "Julie", tel: "+33 6 20 30 40 50", adresse: "27 av. Parmentier, 75011", tech: "David Lefebvre", statut: "En cours", ttc: 0, commRate: 0.25, poseur: null, poseurCost: 0, poseurMode: null, techMedias: [], poseurMedias: [], poseurPrixPose: 0, poseurAchats: 0, poseurNote: "" },
  { ref: "INT-012", date: "2026-02-15", heure: "09:00", type: "Plomberie", mode: "Urgence", clientNom: "Simon", clientPrenom: "Paul", tel: "+33 6 30 40 50 60", adresse: "4 rue de la Roquette, 75011", tech: "Karim Dupont", statut: "Planifiée", ttc: 0, commRate: 0.20, poseur: null, poseurCost: 0, poseurMode: null, techMedias: [], poseurMedias: [], poseurPrixPose: 0, poseurAchats: 0, poseurNote: "" },
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

/* ═══ SOUND EFFECTS (Web Audio API) ═══ */
const playKaching = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    // Coin sound 1
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(1200, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.08);
    gain1.gain.setValueAtTime(0.3, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
    osc1.connect(gain1); gain1.connect(ctx.destination);
    osc1.start(ctx.currentTime); osc1.stop(ctx.currentTime + 0.25);
    // Coin sound 2 (delayed)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(1500, ctx.currentTime + 0.12);
    osc2.frequency.exponentialRampToValueAtTime(2200, ctx.currentTime + 0.2);
    gain2.gain.setValueAtTime(0, ctx.currentTime);
    gain2.gain.setValueAtTime(0.3, ctx.currentTime + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    osc2.connect(gain2); gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.12); osc2.stop(ctx.currentTime + 0.4);
    // Shimmer
    const osc3 = ctx.createOscillator();
    const gain3 = ctx.createGain();
    osc3.type = "triangle";
    osc3.frequency.setValueAtTime(2400, ctx.currentTime + 0.15);
    gain3.gain.setValueAtTime(0.08, ctx.currentTime + 0.15);
    gain3.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc3.connect(gain3); gain3.connect(ctx.destination);
    osc3.start(ctx.currentTime + 0.15); osc3.stop(ctx.currentTime + 0.6);
    setTimeout(() => ctx.close(), 800);
  } catch (e) { /* silent */ }
};

/* ═══ WHATSAPP HELPER ═══ */
const WaIcon = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;
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

/* ═══ SUPABASE CONFIG ═══ */
const SUPA_URL = "https://yfroontiqlljzllamvek.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlmcm9vbnRpcXpsanpsbGFtdmVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3OTA0MTgsImV4cCI6MjA4NjM2NjQxOH0.cuk5ZcU_gpdCa77UIQntjlIaK1DRAiJmLJKU5qjIlZg";
const SUPA_HEADERS = { "apikey": SUPA_KEY, "Authorization": `Bearer ${SUPA_KEY}`, "Content-Type": "application/json" };

const supaLoad = async (key) => {
  try {
    const res = await fetch(`${SUPA_URL}/rest/v1/app_data?key=eq.${key}&select=value`, { headers: SUPA_HEADERS });
    if (!res.ok) return null;
    const data = await res.json();
    return data.length > 0 && data[0].value && data[0].value.length > 0 ? data[0].value : null;
  } catch (e) { console.log("Supabase load error:", e); return null; }
};

const supaSave = async (key, value) => {
  try {
    await fetch(`${SUPA_URL}/rest/v1/app_data`, {
      method: "POST",
      headers: { ...SUPA_HEADERS, "Prefer": "resolution=merge-duplicates" },
      body: JSON.stringify({ key, value, updated_at: new Date().toISOString() })
    });
  } catch (e) { console.log("Supabase save error:", e); }
};

/* ═══ SUPABASE STORAGE (photos/vidéos) ═══ */
const supaUploadFile = async (file, folder) => {
  try {
    const ext = file.name.split(".").pop().toLowerCase();
    const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`;
    
    const formData = new FormData();
    formData.append("", file);
    
    const res = await fetch(`${SUPA_URL}/storage/v1/object/media/${fileName}`, {
      method: "POST",
      headers: {
        "apikey": SUPA_KEY,
        "Authorization": `Bearer ${SUPA_KEY}`,
        "x-upsert": "true"
      },
      body: formData
    });
    if (!res.ok) {
      const errText = await res.text();
      console.error("Upload error:", res.status, errText);
      // Fallback: stocker en base64 dans la base
      return await fileToBase64(file);
    }
    return `${SUPA_URL}/storage/v1/object/public/media/${fileName}`;
  } catch (e) {
    console.error("Upload error:", e);
    // Fallback: stocker en base64
    return await fileToBase64(file);
  }
};

const fileToBase64 = (file) => new Promise((resolve) => {
  // Pour les images, on compresse via canvas
  if (file.type.startsWith("image/")) {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const maxSize = 800;
      let w = img.width, h = img.height;
      if (w > maxSize || h > maxSize) {
        if (w > h) { h = Math.round(h * maxSize / w); w = maxSize; }
        else { w = Math.round(w * maxSize / h); h = maxSize; }
      }
      canvas.width = w; canvas.height = h;
      canvas.getContext("2d").drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.7));
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
    img.src = url;
  } else {
    // Vidéos : base64 brut (attention taille)
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  }
});

/* ═══ MEDIA LIGHTBOX ═══ */
const MediaLightbox = ({ media, onClose }) => {
  if (!media) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, padding: 16, backdropFilter: "blur(8px)" }}>
      <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%", width: 40, height: 40, cursor: "pointer", color: "#fff", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2001 }}>✕</button>
      <div onClick={e => e.stopPropagation()} style={{ maxWidth: "95vw", maxHeight: "90vh" }}>
        {media.type === "video" ? (
          <video src={media.url} controls autoPlay style={{ maxWidth: "95vw", maxHeight: "85vh", borderRadius: 12 }} />
        ) : (
          <img src={media.url} alt="" style={{ maxWidth: "95vw", maxHeight: "85vh", borderRadius: 12, objectFit: "contain" }} />
        )}
      </div>
    </div>
  );
};

/* ═══ MEDIA UPLOAD COMPONENT ═══ */
const MediaUpload = ({ medias = [], onAdd, onRemove, label = "Photos / Vidéos", minRequired = 0, readOnly = false }) => {
  const fileRef = useRef(null);
  const cameraRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [viewMedia, setViewMedia] = useState(null);

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    for (const file of files) {
      const url = await supaUploadFile(file, "chantier");
      if (url) onAdd({ url, type: file.type.startsWith("video") ? "video" : "image", name: file.name });
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
    if (cameraRef.current) cameraRef.current.value = "";
  };

  return (
    <div style={{ marginTop: 10 }}>
      {viewMedia && <MediaLightbox media={viewMedia} onClose={() => setViewMedia(null)} />}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 11, color: T.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>📸 {label}</span>
        {minRequired > 0 && medias.length < minRequired && <span style={{ fontSize: 10, color: "#EF4444", fontWeight: 600 }}>Min. {minRequired} requis</span>}
        {medias.length >= minRequired && minRequired > 0 && <span style={{ fontSize: 10, color: "#06D6A0", fontWeight: 600 }}>✅ {medias.length} fichier{medias.length > 1 ? "s" : ""}</span>}
      </div>
      {/* Media grid */}
      {medias.length > 0 && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
          {medias.map((m, idx) => (
            <div key={idx} style={{ position: "relative", width: 90, height: 90, borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
              {m.type === "video" ? (
                <video src={m.url} style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }} onClick={() => setViewMedia(m)} />
              ) : (
                <img src={m.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }} onClick={() => setViewMedia(m)} />
              )}
              {m.type === "video" && <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: 24, pointerEvents: "none", textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>▶️</div>}
              {!readOnly && <button onClick={() => onRemove(idx)} style={{ position: "absolute", top: 2, right: 2, background: "rgba(0,0,0,0.7)", border: "none", borderRadius: "50%", width: 20, height: 20, cursor: "pointer", color: "#EF4444", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>}
            </div>
          ))}
        </div>
      )}
      {/* Upload buttons */}
      {!readOnly && (
        <div style={{ display: "flex", gap: 8 }}>
          <input ref={fileRef} type="file" accept="image/*,video/*" multiple onChange={handleFiles} style={{ display: "none" }} />
          <input ref={cameraRef} type="file" accept="image/*" capture="environment" onChange={handleFiles} style={{ display: "none" }} />
          <button onClick={() => cameraRef.current?.click()} disabled={uploading} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px 16px", background: "rgba(6,182,212,0.1)", border: "1px dashed rgba(6,182,212,0.2)", borderRadius: 10, cursor: uploading ? "wait" : "pointer", color: T.cyan, fontSize: 12, fontWeight: 600, fontFamily: T.fontBody, flex: 1 }}>
            📷 Prendre photo
          </button>
          <button onClick={() => fileRef.current?.click()} disabled={uploading} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px 16px", background: "rgba(255,255,255,0.04)", border: "1px dashed rgba(255,255,255,0.15)", borderRadius: 10, cursor: uploading ? "wait" : "pointer", color: T.textSoft, fontSize: 12, fontWeight: 600, fontFamily: T.fontBody, flex: 1 }}>
            📁 Galerie / Fichier
          </button>
        </div>
      )}
      {uploading && <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: T.cyan }}><span style={{ width: 14, height: 14, border: "2px solid rgba(6,182,212,0.2)", borderTopColor: T.cyan, borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} /> Envoi en cours...</div>}
    </div>
  );
};

/* ═══ STORAGE (localStorage) ═══ */
const ST = {
  async get(k) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch { return null; } },
  async set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } },
};

/* ═══ TOKENS ═══ */
const T = { dark: "#0A0F1C", bg: "#111827", surface: "#1F2937", surfaceHover: "#263044", cyan: "#06B6D4", cyanLight: "#22D3EE", cyanDim: "rgba(6,182,212,0.12)", amber: "#F59E0B", amberLight: "#FBBF24", amberDim: "rgba(245,158,11,0.12)", green: "#10B981", red: "#EF4444", pink: "#EC4899", violet: "#8B5CF6", blue: "#3B82F6", textPrimary: "#F9FAFB", textSecondary: "#9CA3AF", textMuted: "#6B7280", textSoft: "#9CA3AF", textInverse: "#0A0F1C", border: "rgba(255,255,255,0.06)", borderActive: "rgba(6,182,212,0.4)", borderSubtle: "rgba(255,255,255,0.03)", radius: 12, radiusSm: 8, radiusXs: 6, radiusFull: 9999, fontDisplay: "'Space Grotesk', sans-serif", fontBody: "'Outfit', sans-serif", fontMono: "'JetBrains Mono', monospace", gold: "#06B6D4", goldLight: "#22D3EE" };
const typeColors = { "Plomberie": "#06B6D4", "Serrurerie": "#8B5CF6", "Électricité": "#F59E0B" };
const statutColors = { "Planifiée": { bg: "rgba(59,130,246,0.12)", c: "#60A5FA" }, "En cours": { bg: "rgba(245,158,11,0.12)", c: "#FBBF24" }, "Terminée": { bg: "rgba(249,115,22,0.12)", c: "#FB923C" }, "Validée": { bg: "rgba(16,185,129,0.12)", c: "#34D399" } };

/* ═══ SHARED COMPONENTS ═══ */
const AurenisLogo = ({ size = "lg" }) => {
  const s = size === "lg" ? 40 : 28; const fs = size === "lg" ? 22 : 16; const sub = size === "lg" ? 11 : 9;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: size === "lg" ? 12 : 8 }}>
      <div style={{ width: s, height: s, borderRadius: T.radiusSm, border: `2px solid ${T.cyan}`, display: "flex", alignItems: "center", justifyContent: "center", background: T.cyanDim }}>
        <svg width={s * 0.5} height={s * 0.5} viewBox="0 0 24 24" fill="none"><path d="M12 2C12 2 5 10 5 15C5 18.87 8.13 22 12 22C15.87 22 19 18.87 19 15C19 10 12 2 12 2Z" stroke={T.cyan} strokeWidth="2" fill="none" /><path d="M12 8C12 8 9 12 9 14.5C9 16.43 10.34 18 12 18C13.66 18 15 16.43 15 14.5C15 12 12 8 12 8Z" fill={T.cyan} opacity="0.3" /></svg>
      </div>
      <div><div style={{ display: "flex", alignItems: "baseline", gap: 6 }}><span style={{ fontSize: fs, fontWeight: 700, letterSpacing: 2, color: T.cyan, fontFamily: T.fontDisplay }}>AURENIS</span><span style={{ fontSize: sub, fontWeight: 300, color: T.textMuted, letterSpacing: 4, textTransform: "uppercase", fontFamily: T.fontBody }}>customer</span></div></div>
    </div>
  );
};

const Inp = ({ icon, type = "text", placeholder, value, onChange, error, onKeyDown, style: sx }) => (
  <div style={{ position: "relative", marginBottom: error ? 4 : 0, ...sx }}>
    {icon && <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: T.textMuted, pointerEvents: "none" }}>{icon}</div>}
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDown}
      style={{ width: "100%", padding: icon ? "13px 16px 13px 44px" : "13px 16px", fontSize: 15, fontWeight: 400, background: T.surface, border: error ? `1px solid ${T.red}` : `1px solid ${T.border}`, borderRadius: T.radiusSm, color: T.textPrimary, outline: "none", boxSizing: "border-box", transition: "all 0.15s", fontFamily: T.fontBody }}
      onFocus={e => { e.target.style.borderColor = T.cyan; e.target.style.boxShadow = "0 0 0 3px rgba(6,182,212,0.1)"; }} onBlur={e => { e.target.style.borderColor = error ? T.red : T.border; e.target.style.boxShadow = "none"; }} />
    {error && <div style={{ fontSize: 12, color: T.red, marginTop: 4, fontWeight: 500, paddingLeft: 4, fontFamily: T.fontBody }}>{error}</div>}
  </div>
);

const Btn = ({ children, onClick, loading, variant = "primary", disabled, style: sx }) => {
  const p = variant === "primary";
  return <button onClick={onClick} disabled={disabled || loading} style={{ padding: "12px 20px", fontSize: 14, fontWeight: 600, border: p ? "none" : variant === "danger" ? `1px solid rgba(239,68,68,0.2)` : `1px solid ${T.border}`, borderRadius: T.radiusSm, cursor: disabled || loading ? "not-allowed" : "pointer", background: p ? T.cyan : variant === "danger" ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.04)", color: p ? T.textInverse : variant === "danger" ? T.red : T.textPrimary, opacity: disabled || loading ? 0.4 : 1, transition: "all 0.15s", fontFamily: T.fontBody, boxShadow: p ? "0 2px 12px rgba(6,182,212,0.25)" : "none", minHeight: 44, width: sx?.width || "auto", ...sx }}>{loading ? "..." : children}</button>;
};

const Badge = ({ status }) => { const s = statutColors[status] || { bg: "rgba(148,163,184,0.12)", c: "#94A3B8" }; return <span style={{ background: s.bg, color: s.c, padding: "3px 10px", borderRadius: T.radiusXs, fontSize: 11, fontWeight: 600, whiteSpace: "nowrap", textTransform: "uppercase", letterSpacing: 0.5, fontFamily: T.fontBody, borderLeft: `2px solid ${s.c}` }}>{status}</span>; };
const ModeBadge = ({ mode }) => <span style={{ background: mode === "Urgence" ? T.red : T.blue, color: "#fff", padding: "3px 10px", borderRadius: T.radiusXs, fontSize: 10, fontWeight: 700, whiteSpace: "nowrap", textTransform: "uppercase", letterSpacing: 0.5, fontFamily: T.fontBody, animation: mode === "Urgence" ? "pulseUrgent 2s infinite" : "none" }}>{mode === "Urgence" ? "⚡ URG" : "📅 RDV"}</span>;
const TypeBadge = ({ type }) => { const c = typeColors[type] || T.blue; return <span style={{ background: `${c}18`, color: c, padding: "3px 10px", borderRadius: T.radiusXs, fontSize: 11, fontWeight: 600, fontFamily: T.fontBody, display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: c, display: "inline-block" }} />{type}</span>; };

const KPI = ({ label, value, color, icon }) => (
  <div className="aurenis-reveal" style={{ background: T.surface, borderRadius: T.radius, padding: "16px 14px", border: `1px solid ${T.border}`, borderLeft: `3px solid ${color}`, flex: 1, minWidth: 140, boxShadow: "0 1px 3px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.02)" }}>
    <div style={{ fontSize: 18, marginBottom: 4, opacity: 0.8 }}>{icon}</div>
    <div style={{ fontSize: 10, color: T.textMuted, fontWeight: 500, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4, fontFamily: T.fontBody }}>{label}</div>
    <div style={{ fontSize: 22, fontWeight: 700, color: T.textPrimary, wordBreak: "break-word", fontFamily: T.fontMono }}>{value}</div>
  </div>
);

const Card = ({ children, style: sx }) => <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.02)", ...sx }}>{children}</div>;
const SectionTitle = ({ children, right }) => <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}><h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: T.textPrimary, fontFamily: T.fontDisplay }}>{children}</h2>{right}</div>;

/* ═══ MODAL ═══ */
const Modal = ({ open, onClose, title, children, width = 480 }) => {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 1000, padding: 0, backdropFilter: "blur(8px)" }} onClick={onClose}>
      <div style={{ background: T.surface, borderRadius: `${T.radius}px ${T.radius}px 0 0`, padding: "20px 16px", width: "100%", maxWidth: width, border: `1px solid ${T.border}`, borderBottom: "none", boxShadow: "0 -24px 64px rgba(0,0,0,0.6)", maxHeight: "88vh", overflowY: "auto", WebkitOverflowScrolling: "touch", animation: "slideUp 0.35s cubic-bezier(0.32, 0.72, 0, 1)" }} onClick={e => e.stopPropagation()}>
        <div style={{ width: 48, height: 4, borderRadius: 2, background: T.textMuted, margin: "0 auto 16px", opacity: 0.4 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: T.textPrimary, fontFamily: T.fontDisplay }}>{title}</h3>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${T.border}`, borderRadius: T.radiusSm, width: 36, height: 36, cursor: "pointer", color: T.textSecondary, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};

/* ═══ AUTH SHELL ═══ */
const AuthShell = ({ children }) => (
  <div className="aurenis-auth-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: T.dark, padding: 16 }}>
    <div style={{ width: "100%", maxWidth: 400, animation: "fadeUp 0.4s cubic-bezier(0.16,1,0.3,1)" }}>{children}</div>
  </div>
);
const AuthCard = ({ children, title, subtitle }) => (
  <div style={{ background: T.surface, borderRadius: T.radius, padding: "32px 24px", border: `1px solid ${T.border}`, boxShadow: "0 24px 64px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.3)" }}>
    <div style={{ textAlign: "center", marginBottom: 24 }}><div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}><AurenisLogo /></div><h1 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 700, color: T.textPrimary, fontFamily: T.fontDisplay }}>{title}</h1><p style={{ margin: 0, fontSize: 13, color: T.textMuted, lineHeight: 1.5, fontFamily: T.fontBody }}>{subtitle}</p></div>{children}
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
        <div style={{ background: T.cyanDim, border: `1px solid ${T.borderActive}`, borderRadius: T.radiusXs, padding: "8px 12px", fontSize: 11, color: T.cyan, lineHeight: 1.6, fontFamily: T.fontBody }}>
          <strong>Démo Admin :</strong> admin@aquatech.fr / Admin123<br/>
          <strong>Créer un compte tech :</strong> ahmed@aquatech.fr, lucas@aquatech.fr...<br/>
          <strong>Créer un compte poseur :</strong> rachid@aquatech.fr, sofiane@aquatech.fr
        </div>
        <Inp icon="✉️" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handle()} />
        <div style={{ position: "relative" }}><Inp icon="🔒" type={show ? "text" : "password"} placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handle()} /><button onClick={() => setShow(!show)} style={{ position: "absolute", right: 14, top: 14, background: "none", border: "none", cursor: "pointer", fontSize: 14, color: T.textMuted }}>{show ? "🙈" : "👁️"}</button></div>
        {error && <div style={{ background: "rgba(239,68,68,0.1)", borderRadius: T.radiusXs, padding: "10px 14px", fontSize: 13, color: T.red, fontWeight: 500, fontFamily: T.fontBody }}>{error}</div>}
        <Btn onClick={handle} loading={loading} style={{ width: "100%" }}>Se connecter</Btn>
        <button onClick={onGoForgot} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: T.cyan, fontWeight: 600, padding: 8, fontFamily: T.fontBody }}>Mot de passe oublié ?</button>
      </div>
      <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${T.border}`, textAlign: "center" }}><span style={{ fontSize: 13, color: T.textMuted }}>Pas de compte ? </span><button onClick={onGoRegister} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: T.cyan, fontWeight: 700, fontFamily: T.fontBody }}>Créer un compte</button></div>
    </AuthCard></AuthShell>
  );
};

/* ═══ REGISTER ═══ */
const RegisterPage = ({ onGoLogin, onRegistered }) => {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [confirm, setConfirm] = useState(""); const [errors, setErrors] = useState({}); const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false); const [showCf, setShowCf] = useState(false);
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
  const strength = (() => { if (!password) return { pct: 0, label: "", color: "#333" }; let s = 0; if (password.length >= 6) s++; if (password.length >= 10) s++; if (/[A-Z]/.test(password)) s++; if (/[0-9]/.test(password)) s++; if (/[^a-zA-Z0-9]/.test(password)) s++; return [{ pct: 20, label: "Très faible", color: "#EF4444" }, { pct: 40, label: "Faible", color: "#F97316" }, { pct: 60, label: "Moyen", color: "#FBBF24" }, { pct: 80, label: "Fort", color: "#06D6A0" }, { pct: 100, label: "Excellent", color: "#10B981" }][Math.min(s, 4)]; })();
  const eyeBtn = (visible, toggle) => <button onClick={toggle} style={{ position: "absolute", right: 14, top: 14, background: "none", border: "none", cursor: "pointer", fontSize: 14, color: T.textMuted }}>{visible ? "🙈" : "👁️"}</button>;
  return (
    <AuthShell><AuthCard title="Créer un compte" subtitle="Email professionnel fourni par l'entreprise">
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Inp icon="✉️" type="email" placeholder="Email professionnel" value={email} onChange={e => setEmail(e.target.value)} error={errors.email} />
        <div><div style={{ position: "relative" }}><Inp icon="🔒" type={showPw ? "text" : "password"} placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} error={errors.password} />{eyeBtn(showPw, () => setShowPw(!showPw))}</div>{password && <div style={{ marginTop: 8 }}><div style={{ display: "flex", gap: 4, marginBottom: 4 }}>{[0,1,2,3,4].map(i => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i < strength.pct / 20 ? strength.color : "rgba(255,255,255,0.08)" }} />)}</div><span style={{ fontSize: 11, color: strength.color, fontWeight: 600 }}>{strength.label}</span></div>}</div>
        <div style={{ position: "relative" }}><Inp icon="🔒" type={showCf ? "text" : "password"} placeholder="Confirmer" value={confirm} onChange={e => setConfirm(e.target.value)} error={errors.confirm} />{eyeBtn(showCf, () => setShowCf(!showCf))}</div>
        <Btn onClick={handle} loading={loading} style={{ width: "100%" }}>Créer mon compte</Btn>
      </div>
      <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}><button onClick={onGoLogin} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: T.cyan, fontWeight: 700, fontFamily: T.fontBody }}>← Se connecter</button></div>
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
    <AuthShell><AuthCard title="Vérification" subtitle={<>Code envoyé à <strong style={{ color: T.cyan }}>{email}</strong></>}>
      <div style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.15)", borderRadius: T.radiusXs, padding: "10px 14px", fontSize: 12, color: T.cyan, textAlign: "center", marginBottom: 20, fontWeight: 600 }}>📧 Démo — Code : <span style={{ fontSize: 16, letterSpacing: 3, fontWeight: 700 }}>{code}</span></div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20 }}>{input.map((v, i) => <input key={i} id={`otp-${i}`} type="text" inputMode="numeric" maxLength={1} value={v} onChange={e => hc(i, e.target.value)} onKeyDown={e => hk(i, e)} style={{ width: 48, height: 56, textAlign: "center", fontSize: 22, fontWeight: 700, background: v ? "rgba(6,182,212,0.1)" : "rgba(255,255,255,0.06)", border: "1.5px solid " + (v ? "rgba(6,182,212,0.2)" : "rgba(255,255,255,0.08)"), borderRadius: T.radiusXs, color: "#fff", outline: "none", fontFamily: T.fontBody }} />)}</div>
      {error && <div style={{ background: "rgba(239,68,68,0.1)", borderRadius: T.radiusXs, padding: "10px", fontSize: 13, color: "#EF4444", textAlign: "center", marginBottom: 14 }}>{error}</div>}
      <Btn onClick={handle} loading={loading} style={{ width: "100%" }}>Vérifier</Btn>
      <div style={{ marginTop: 16, textAlign: "center" }}><button onClick={onGoLogin} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: T.textMuted, fontFamily: T.fontBody }}>← Retour</button></div>
    </AuthCard></AuthShell>
  );
};

/* ═══ FORGOT ═══ */
const ForgotPage = ({ onGoLogin }) => {
  const [step, setStep] = useState("email"); const [email, setEmail] = useState(""); const [rc, setRc] = useState(""); const [gc, setGc] = useState(""); const [np, setNp] = useState(""); const [cp, setCp] = useState(""); const [err, setErr] = useState(""); const [ld, setLd] = useState(false);
  const [showNp, setShowNp] = useState(false); const [showCp, setShowCp] = useState(false);
  const send = async () => { setErr(""); if (!email.trim()) return setErr("Email requis"); setLd(true); await new Promise(r => setTimeout(r, 600)); const a = await ST.get(`account:${email.toLowerCase().trim()}`); if (!a) { setLd(false); return setErr("Aucun compte"); } const c = String(Math.floor(100000 + Math.random() * 900000)); a.resetCode = c; await ST.set(`account:${email.toLowerCase().trim()}`, a); setGc(c); setLd(false); setStep("code"); };
  const verify = () => { setErr(""); if (rc !== gc) return setErr("Code incorrect"); setStep("newpass"); };
  const reset = async () => { setErr(""); if (np.length < 6) return setErr("Min. 6 car."); if (np !== cp) return setErr("Non identiques"); setLd(true); const a = await ST.get(`account:${email.toLowerCase().trim()}`); if (a) { a.password = np; await ST.set(`account:${email.toLowerCase().trim()}`, a); } setLd(false); setStep("done"); };
  const eyeBtn = (visible, toggle) => <button onClick={toggle} style={{ position: "absolute", right: 14, top: 14, background: "none", border: "none", cursor: "pointer", fontSize: 14, color: T.textMuted }}>{visible ? "🙈" : "👁️"}</button>;
  return (
    <AuthShell><AuthCard title={step === "done" ? "Réinitialisé ✓" : "Récupération"} subtitle={step === "done" ? "Connectez-vous" : "Récupérez votre accès"}>
      {step === "email" && <div style={{ display: "flex", flexDirection: "column", gap: 14 }}><Inp icon="✉️" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />{err && <div style={{ fontSize: 13, color: "#EF4444" }}>{err}</div>}<Btn onClick={send} loading={ld} style={{ width: "100%" }}>Envoyer</Btn></div>}
      {step === "code" && <div style={{ display: "flex", flexDirection: "column", gap: 14 }}><div style={{ background: "rgba(6,182,212,0.08)", borderRadius: T.radiusXs, padding: "10px", fontSize: 12, color: T.cyan, textAlign: "center", fontWeight: 600 }}>Code : <strong>{gc}</strong></div><Inp icon="🔑" placeholder="Code 6 chiffres" value={rc} onChange={e => setRc(e.target.value)} />{err && <div style={{ fontSize: 13, color: "#EF4444" }}>{err}</div>}<Btn onClick={verify} style={{ width: "100%" }}>Vérifier</Btn></div>}
      {step === "newpass" && <div style={{ display: "flex", flexDirection: "column", gap: 14 }}><div style={{ position: "relative" }}><Inp icon="🔒" type={showNp ? "text" : "password"} placeholder="Nouveau" value={np} onChange={e => setNp(e.target.value)} />{eyeBtn(showNp, () => setShowNp(!showNp))}</div><div style={{ position: "relative" }}><Inp icon="🔒" type={showCp ? "text" : "password"} placeholder="Confirmer" value={cp} onChange={e => setCp(e.target.value)} />{eyeBtn(showCp, () => setShowCp(!showCp))}</div>{err && <div style={{ fontSize: 13, color: "#EF4444" }}>{err}</div>}<Btn onClick={reset} loading={ld} style={{ width: "100%" }}>Réinitialiser</Btn></div>}
      {step === "done" && <div style={{ textAlign: "center" }}><div style={{ fontSize: 48, marginBottom: 16 }}>✅</div><Btn onClick={onGoLogin} style={{ width: "100%" }}>Se connecter</Btn></div>}
      {step !== "done" && <div style={{ marginTop: 16, textAlign: "center" }}><button onClick={onGoLogin} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: T.textMuted, fontFamily: T.fontBody }}>← Retour</button></div>}
    </AuthCard></AuthShell>
  );
};

const VerifiedPage = ({ onGoLogin }) => (
  <AuthShell><AuthCard title="Email vérifié !" subtitle="Compte activé"><div style={{ textAlign: "center", marginBottom: 20 }}><div style={{ fontSize: 48 }}>✅</div></div><Btn onClick={onGoLogin} style={{ width: "100%" }}>Se connecter</Btn></AuthCard></AuthShell>
);

/* ═══ APP HEADER ═══ */
const Header = ({ account, onLogout, roleBadge }) => {
  const member = [...INIT_TECHS, ...INIT_POSEURS].find(m => m.id === account.memberId);
  const color = member?.color || T.cyan;
  const initials = account.name?.split(" ").map(n => n[0]).join("") || "A";
  const roleColor = account.role === "admin" ? T.cyan : account.role === "tech" ? T.blue : T.pink;
  return (
    <div style={{ background: T.dark, borderBottom: `1px solid ${T.border}`, padding: 0, backdropFilter: "blur(24px)", position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ height: 2, background: roleColor }} />
      <div className="aurenis-header-inner" style={{ padding: "10px 16px" }}>
        <AurenisLogo size="sm" />
        <div className="aurenis-header-right">
          <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: T.radiusXs, background: `${roleColor}18`, color: roleColor, textTransform: "uppercase", letterSpacing: 1, fontFamily: T.fontBody }}>{account.role === "admin" ? "Admin" : account.role === "tech" ? "Technicien" : "Poseur"}</span>
          <div style={{ textAlign: "right" }}><div style={{ fontSize: 13, fontWeight: 600, color: T.textPrimary, fontFamily: T.fontBody }}>{account.name}</div></div>
          <div style={{ width: 34, height: 34, borderRadius: T.radiusSm, background: color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 12, fontFamily: T.fontDisplay }}>{initials}</div>
          <button onClick={onLogout} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: T.red, fontWeight: 600, fontFamily: T.fontBody, padding: "6px 10px", opacity: 0.8 }}>Déconnexion</button>
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
        style={{ width: "100%", padding: "12px 16px 12px 42px", fontSize: 14, fontWeight: 500, background: "rgba(255,255,255,0.04)", border: focused ? "1.5px solid " + T.cyan : "1.5px solid rgba(255,255,255,0.08)", borderRadius: T.radiusSm, color: "#fff", outline: "none", boxSizing: "border-box", fontFamily: T.fontBody }}
      />
      {loading && <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, border: "2px solid rgba(6,182,212,0.2)", borderTopColor: T.cyan, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />}
      {showSugg && suggestions.length > 0 && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 100, marginTop: 4, background: "#1F2937", border: "1px solid rgba(6,182,212,0.15)", borderRadius: 12, overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.5)" }}>
          {suggestions.map((s, i) => (
            <div key={i} onMouseDown={e => e.preventDefault()} onClick={() => { setQuery(s.full); onChange(s.full); setShowSugg(false); setSuggestions([]); }}
              style={{ padding: "10px 16px", fontSize: 13, color: "#fff", cursor: "pointer", borderBottom: i < suggestions.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(6,182,212,0.1)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: T.cyan, fontSize: 14 }}>📍</span>
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
            <button onClick={() => onRemove(item)} style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444", fontSize: 14, padding: 0, lineHeight: 1, fontFamily: T.fontBody, opacity: 0.7 }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0.7}>✕</button>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input type="text" placeholder={`Ajouter ${label.toLowerCase()}...`} value={newItem} onChange={e => setNewItem(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && newItem.trim()) { onAdd(newItem.trim()); setNewItem(""); } }}
          style={{ flex: 1, padding: "10px 14px", fontSize: 13, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, color: "#fff", outline: "none", fontFamily: T.fontBody }}
          onFocus={e => e.target.style.borderColor = T.cyan} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
        <button onClick={() => { if (newItem.trim()) { onAdd(newItem.trim()); setNewItem(""); } }} style={{ padding: "10px 18px", borderRadius: 10, border: "none", background: "#06B6D4", color: "#111827", cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: T.fontBody }}>+ Ajouter</button>
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
  const [viewMedia, setViewMedia] = useState(null);

  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearTimeout(t); }, []);

  const validees = interventions.filter(i => i.statut === "Validée");
  const terminees = interventions.filter(i => i.statut === "Terminée");
  const totalTTC = validees.reduce((s, i) => s + i.ttc, 0);
  const totalComm = validees.reduce((s, i) => s + calcCommission(i), 0);
  const totalPoseur = validees.reduce((s, i) => s + i.poseurCost, 0);
  const caNet = totalTTC - totalComm - totalPoseur;
  const attente = terminees.length;

  const updateIntervention = (ref, updates) => { setInterventions(prev => prev.map(i => i.ref === ref ? { ...i, ...updates } : i)); };
  const validerIntervention = (ref) => { updateIntervention(ref, { statut: "Validée" }); playKaching(); };

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
          <div style={{ fontSize: 13, fontWeight: 600, color: T.textMuted }}>{time.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" })} · <span style={{ color: T.cyan }}>{time.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</span></div>
        </div>

        {/* ═══ DASHBOARD ═══ */}
        {tab === "dashboard" && (
          <div>
            <div className="aurenis-kpis">
              <KPI label="Interventions" value={interventions.length} color={T.cyan} icon="📋" />
              <KPI label="Validées" value={validees.length} color="#06D6A0" icon="✅" />
              <KPI label="En attente" value={attente} color="#FBBF24" icon="⏳" />
              <KPI label="CA Validé TTC" value={`${totalTTC.toLocaleString("fr-FR")} €`} color="#10B981" icon="💰" />
              <KPI label="Commissions" value={`${totalComm.toLocaleString("fr-FR")} €`} color="#EF4444" icon="💸" />
              <KPI label="CA Net Patron" value={`${caNet.toLocaleString("fr-FR")} €`} color={T.cyan} icon="🏢" />
            </div>
            {terminees.length > 0 && (
              <Card style={{ marginBottom: 20, borderLeft: "3px solid #FBBF24" }}>
                <SectionTitle right={<span style={{ fontSize: 12, color: "#FBBF24", fontWeight: 700 }}>⏳ {terminees.length} en attente</span>}>Interventions à valider</SectionTitle>
                {terminees.map(inter => (
                  <div key={inter.ref} className="aurenis-inter-row" style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 700, color: T.cyan, fontSize: 13 }}>{inter.ref}</span>
                      <span style={{ color: T.textSoft, fontSize: 13 }}>{inter.date}</span>
                      <span style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>{inter.tech}</span>
                      <TypeBadge type={inter.type} />
                      {inter.poseur && <span style={{ fontSize: 11, color: "#EC4899", background: "rgba(236,72,153,0.1)", padding: "2px 8px", borderRadius: 6 }}>👷 {inter.poseur}</span>}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 700, color: "#06D6A0", fontSize: 15 }}>{inter.ttc} €</span>
                      <button className="wa-btn" onClick={() => sendWhatsApp(inter.tel, waMessageClient(inter))} title="WhatsApp client"><WaIcon /></button>
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
                onMouseEnter={e => e.currentTarget.style.background = "rgba(6,182,212,0.03)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 700, color: T.cyan, fontSize: 13, minWidth: 68 }}>{inter.ref}</span>
                  <span style={{ color: T.textSoft, fontSize: 12 }}>{inter.date} {inter.heure}</span>
                  <TypeBadge type={inter.type} />
                  <ModeBadge mode={inter.mode} />
                  <span style={{ fontSize: 13, color: "#fff", fontWeight: 600 }}>{inter.tech}</span>
                  {inter.poseur && <span style={{ fontSize: 11, color: "#EC4899", background: "rgba(236,72,153,0.1)", padding: "2px 8px", borderRadius: 6 }}>👷 {inter.poseur} ({inter.poseurCost}€ · {inter.poseurMode === "divise2" ? "÷2" : "gratuit"})</span>}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 13, color: T.textMuted }}>{inter.clientNom} {inter.clientPrenom}</span>
                  <Badge status={inter.statut} />
                  <span style={{ fontWeight: 700, fontSize: 14, color: inter.ttc > 0 ? "#06D6A0" : "rgba(255,255,255,0.15)" }}>{inter.ttc > 0 ? `${inter.ttc} €` : "—"}</span>
                  <button className="wa-btn" onClick={() => sendWhatsApp(inter.tel, waMessageClient(inter))} title="WhatsApp client"><WaIcon /></button>
                  {(() => { const t = techs.find(tc => tc.name === inter.tech); return t ? <button className="wa-btn" onClick={() => sendWhatsApp(t.tel, waMessageTech(inter, t.name))} title="WhatsApp tech"><WaIcon /><span style={{ fontSize: 9 }}>Tech</span></button> : null; })()}
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
                        <div style={{ width: 36, height: 36, borderRadius: T.radiusSm, background: tech.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13 }}>{tech.name.split(" ").map(n => n[0]).join("")}</div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <span style={{ fontSize: 12, color: T.textMuted }}>{myInter.length} validées · CA {ca.toLocaleString("fr-FR")} €</span>
                      </div>
                      {/* Téléphone */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
                        <div><span style={{ fontSize: 11, color: T.textMuted }}>Téléphone</span><div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginTop: 2 }}>{tech.tel}</div></div>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button className="wa-btn" onClick={() => sendWhatsApp(tech.tel, `Bonjour ${tech.name.split(" ")[0]},\n\n`)} title="WhatsApp" style={{ padding: "7px 10px" }}><WaIcon /></button>
                          <Btn onClick={() => { setTelModal(tech.id); setNewTel(tech.tel); }} variant="ghost" style={{ padding: "6px 12px", fontSize: 11 }}>✏️</Btn>
                        </div>
                      </div>
                      {/* Commission */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 14px" }}>
                        <div><span style={{ fontSize: 11, color: T.textMuted }}>Taux commission</span><div style={{ fontSize: 20, fontWeight: 700, color: T.cyan }}>{(tech.commission * 100)}%</div></div>
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
            const SortIcon = ({ field }) => { if (jSortField !== field) return <span style={{ opacity: 0.3, fontSize: 9 }}>⇅</span>; return <span style={{ color: T.cyan, fontSize: 9 }}>{jSortDir === "asc" ? "▲" : "▼"}</span>; };

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
.hdr{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;border-bottom:3px solid #06B6D4;padding-bottom:14px}
.logo{font-size:22px;font-weight:800;color:#06B6D4}.sub{font-size:11px;color:#64748b}.meta{text-align:right;font-size:11px;color:#64748b;line-height:1.6}
.filt{background:#f8fafc;border-radius:6px;padding:6px 12px;font-size:10px;color:#475569;margin-bottom:12px}
.sg{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px}
.sc{border:1px solid #e2e8f0;border-radius:6px;padding:10px}.sl{font-size:9px;color:#64748b;text-transform:uppercase;letter-spacing:.05em}.sv{font-size:18px;font-weight:700;margin-top:3px}
table{width:100%;border-collapse:collapse;margin-bottom:16px}th{background:#111827;color:#06B6D4;padding:7px 8px;text-align:left;font-size:9px;text-transform:uppercase;letter-spacing:.05em}
th:nth-child(n+5){text-align:right}td{padding:6px 8px;border-bottom:1px solid #e2e8f0}td:nth-child(n+5){text-align:right;font-variant-numeric:tabular-nums}
tr:nth-child(even){background:#f8fafc}.tr td{font-weight:700;background:#fffbeb!important;border-top:2px solid #06B6D4;font-size:11px}
.g{color:#10B981}.y{color:#d97706}.r{color:#dc2626}.gd{color:#06B6D4}
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

            const fSel = { padding: "8px 12px", fontSize: 13, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: T.radiusSm, color: "#fff", fontFamily: T.fontBody, outline: "none", appearance: "none", WebkitAppearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='white' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", width: "100%", boxSizing: "border-box" };
            const fInp = { width: "100%", padding: "8px 12px", fontSize: 13, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: T.radiusSm, color: "#fff", outline: "none", boxSizing: "border-box", fontFamily: T.fontBody };
            const fLabel = { fontSize: 10, color: T.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 4 };

            return (
              <div>
                {/* Header with actions */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
                  <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#fff" }}>💰 Journal de compte</h2>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setJShowStats(!jShowStats)} style={{ background: jShowStats ? "rgba(6,182,212,0.15)" : "rgba(255,255,255,0.06)", border: jShowStats ? "1px solid rgba(6,182,212,0.2)" : "1px solid rgba(255,255,255,0.08)", color: jShowStats ? T.cyan : T.textMuted, borderRadius: T.radiusSm, padding: "7px 14px", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: T.fontBody }}>📊 Stats</button>
                    <button onClick={exportCSV} style={{ background: "rgba(6,214,160,0.1)", border: "1px solid rgba(6,214,160,0.2)", color: "#06D6A0", borderRadius: T.radiusSm, padding: "7px 14px", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: T.fontBody }}>📥 CSV</button>
                    <button onClick={exportPDF} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,71,111,0.2)", color: "#EF4444", borderRadius: T.radiusSm, padding: "7px 14px", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: T.fontBody }}>📄 PDF</button>
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
                    {hasFilters && <div style={{ flex: "0 0 auto" }}><label style={{ ...fLabel, color: "transparent" }}>&nbsp;</label><button onClick={resetFilters} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: T.textMuted, borderRadius: T.radiusSm, padding: "8px 12px", cursor: "pointer", fontSize: 12, fontFamily: T.fontBody }}>✕ Reset</button></div>}
                  </div>
                  <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                    {[{ key: "today", label: "Aujourd'hui" }, { key: "yesterday", label: "Hier" }, { key: "week", label: "7 jours" }, { key: "month", label: "Ce mois" }, { key: "lastmonth", label: "Mois dernier" }, { key: "", label: "Tout" }].map(p => (
                      <button key={p.key} onClick={() => applyQuickPeriod(p.key)} style={{ background: jQuickPeriod === p.key ? "rgba(6,182,212,0.15)" : "rgba(255,255,255,0.04)", border: jQuickPeriod === p.key ? "1px solid rgba(6,182,212,0.2)" : "1px solid rgba(255,255,255,0.06)", color: jQuickPeriod === p.key ? T.cyan : T.textMuted, borderRadius: 20, padding: "3px 12px", cursor: "pointer", fontSize: 11, fontWeight: 600, fontFamily: T.fontBody }}>{p.label}</button>
                    ))}
                  </div>
                </Card>

                {/* Stats */}
                {jShowStats && (
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
                      {[
                        { label: "Interventions", value: jStats.count, color: T.cyan, icon: "📋" },
                        { label: "CA Total", value: `${fmt(jStats.total)} €`, color: "#06D6A0", icon: "💰" },
                        { label: "Commissions", value: `-${fmt(jStats.totalC)} €`, color: "#EF4444", icon: "💸" },
                        { label: "Poseurs", value: `-${fmt(jStats.totalP)} €`, color: "#EC4899", icon: "👷" },
                        { label: "Net Patron", value: `${fmt(jStats.net)} €`, color: T.cyan, icon: "🏢" },
                        { label: "Moy / inter", value: `${fmt(jStats.avg)} €`, color: "#818CF8", icon: "📈" },
                      ].map((s, i) => <KPI key={i} label={s.label} value={s.value} color={s.color} icon={s.icon} />)}
                    </div>
                    <div className="aurenis-stats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <Card style={{ padding: 14 }}>
                        <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>👨‍🔧 Par technicien</div>
                        {Object.entries(jStats.byTech).map(([name, d]) => (
                          <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                            <div><span style={{ fontWeight: 600, fontSize: 13, color: "#fff" }}>{name}</span><span style={{ color: T.textMuted, fontSize: 11, marginLeft: 8 }}>{d.count} inter</span></div>
                            <div style={{ display: "flex", gap: 14, fontSize: 12 }}><span style={{ color: "#06D6A0" }}>{fmt(d.ca)} €</span><span style={{ color: T.cyan, fontWeight: 700 }}>{fmt(d.net)} € net</span></div>
                          </div>
                        ))}
                      </Card>
                      <Card style={{ padding: 14 }}>
                        <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>🔧 Par type</div>
                        {Object.entries(jStats.byType).map(([type, d]) => {
                          const tc = typeColors[type] || T.blue; const pct = jStats.total > 0 ? (d.ca / jStats.total * 100) : 0;
                          return (<div key={type} style={{ marginBottom: 10 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ color: tc, fontWeight: 600, fontSize: 13 }}>{type}</span><span style={{ fontSize: 11, color: T.textMuted }}>{d.count} inter · {fmt(d.ca)} € ({pct.toFixed(0)}%)</span></div>
                            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 4, height: 5, overflow: "hidden" }}><div style={{ width: `${pct}%`, height: "100%", background: tc, borderRadius: 4 }} /></div>
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
                          background: isExpanded ? "rgba(6,182,212,0.04)" : idx % 2 ? "rgba(255,255,255,0.02)" : "transparent", transition: "background 0.15s"
                        }}
                          onMouseEnter={e => { if (!isExpanded) e.currentTarget.style.background = "rgba(6,182,212,0.03)"; }}
                          onMouseLeave={e => { if (!isExpanded) e.currentTarget.style.background = idx % 2 ? "rgba(255,255,255,0.02)" : "transparent"; }}
                        >
                          <span style={{ fontWeight: 700, color: T.cyan, fontSize: 11 }}>{inter.ref}</span>
                          <span style={{ color: T.textMuted, fontSize: 12 }}>{inter.date}</span>
                          <div>
                            <span style={{ fontWeight: 600, color: "#fff", fontSize: 13 }}>{inter.clientNom} {inter.clientPrenom}</span>
                            <span style={{ color: T.textMuted, fontSize: 11, marginLeft: 6 }}>({inter.tech})</span>
                          </div>
                          <div><TypeBadge type={inter.type} /></div>
                          <div style={{ textAlign: "right", fontWeight: 700, color: "#06D6A0" }}>{fmt(inter.ttc)} €</div>
                          <div style={{ textAlign: "right", color: "#EF4444", fontSize: 12 }}>-{fmt(comm)} €</div>
                          <div style={{ textAlign: "right", color: inter.poseurCost > 0 ? "#EC4899" : "rgba(255,255,255,0.1)", fontSize: 12 }}>
                            {inter.poseurCost > 0 ? <>👷 -{fmt(inter.poseurCost)} €</> : "—"}
                          </div>
                          <div style={{ textAlign: "right", fontWeight: 700, color: T.cyan }}>{fmt(net)} €</div>
                        </div>
                        {isExpanded && (
                          <div style={{ padding: "10px 14px 10px 14px", background: "rgba(6,182,212,0.03)", borderBottom: "1px solid rgba(6,182,212,0.08)", fontSize: 12, display: "flex", flexWrap: "wrap", gap: 14 }}>
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
                    <div className="aurenis-journal-grid" style={{ display: "grid", gridTemplateColumns: "80px 85px 1fr 75px 85px 80px 100px 90px", padding: "12px 14px", borderTop: "2px solid rgba(6,182,212,0.15)", fontSize: 13, fontWeight: 700, alignItems: "center", background: "rgba(6,182,212,0.04)" }}>
                      <div style={{ color: T.cyan, gridColumn: "span 4" }}>TOTAL — {jStats.count} intervention{jStats.count > 1 ? "s" : ""}</div>
                      <div style={{ textAlign: "right", color: "#06D6A0" }}>{fmt(jStats.total)} €</div>
                      <div style={{ textAlign: "right", color: "#EF4444" }}>-{fmt(jStats.totalC)} €</div>
                      <div style={{ textAlign: "right", color: "#EC4899" }}>{jStats.totalP > 0 ? `-${fmt(jStats.totalP)} €` : "—"}</div>
                      <div style={{ textAlign: "right", color: T.cyan, fontWeight: 700 }}>{fmt(jStats.net)} €</div>
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
              <SectionTitle right={<span style={{ fontSize: 11, color: T.cyan, background: "rgba(6,182,212,0.1)", padding: "4px 12px", borderRadius: 8, fontWeight: 700 }}>CONFIGURATION</span>}>Paramètres du système</SectionTitle>

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
          const selStyle = { width: "100%", padding: "12px", fontSize: 14, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: T.radiusSm, color: "#fff", fontFamily: T.fontBody };
          const lbl = (t) => ({ fontSize: 12, color: T.textMuted, display: "block", marginBottom: 4, fontWeight: 600 });
          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* REF Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontWeight: 700, color: T.cyan, fontSize: 16 }}>{inter.ref}</span>
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
                    {statuts.map(s => <option key={s} value={s} style={{ background: "#1F2937" }}>{s}</option>)}
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={lbl()}>🔧 Spécialité</label>
                  <select value={inter.type} onChange={e => updateIntervention(inter.ref, { type: e.target.value })} style={selStyle}>
                    {specialties.map(s => <option key={s} value={s} style={{ background: "#1F2937" }}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* ROW: Mode + TTC */}
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={lbl()}>⚡ Mode</label>
                  <select value={inter.mode} onChange={e => updateIntervention(inter.ref, { mode: e.target.value })} style={selStyle}>
                    <option value="Urgence" style={{ background: "#1F2937" }}>⚡ Urgence</option>
                    <option value="RDV" style={{ background: "#1F2937" }}>📅 RDV</option>
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
                  {techs.map(t => <option key={t.id} value={t.name} style={{ background: "#1F2937" }}>{t.name} ({t.spe} · {(t.commission * 100)}%)</option>)}
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
                  <option value="" style={{ background: "#1F2937" }}>Aucun poseur</option>
                  {INIT_POSEURS.map(p => <option key={p.id} value={p.name} style={{ background: "#1F2937" }}>{p.name} ({p.spe})</option>)}
                </select>
                {inter.poseur && (
                  <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                    <div><label style={lbl()}>Coût poseur (€)</label><Inp placeholder="Coût" type="number" value={inter.poseurCost || ""} onChange={e => updateIntervention(inter.ref, { poseurCost: parseFloat(e.target.value) || 0 })} /></div>
                    <div>
                      <label style={lbl()}>Mode poseur</label>
                      <div style={{ display: "flex", gap: 10 }}>
                        {[{ v: "divise2", l: "÷ 2 (partagé)" }, { v: "gratuit", l: "Gratuit (patron)" }].map(o => (
                          <button key={o.v} onClick={() => updateIntervention(inter.ref, { poseurMode: o.v })} style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: inter.poseurMode === o.v ? "1.5px solid " + T.cyan : "1.5px solid rgba(255,255,255,0.08)", background: inter.poseurMode === o.v ? "rgba(6,182,212,0.1)" : "rgba(255,255,255,0.04)", color: inter.poseurMode === o.v ? T.cyan : T.textMuted, cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: T.fontBody }}>{o.l}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* APERÇU CALCUL */}
              {inter.ttc > 0 && (
                <div style={{ background: "rgba(6,182,212,0.06)", borderRadius: 12, padding: 14, border: "1px solid rgba(6,182,212,0.12)" }}>
                  <div style={{ fontSize: 11, color: T.cyan, marginBottom: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>📊 Aperçu financier</div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: T.textSoft, marginBottom: 4 }}><span>Montant TTC</span><span style={{ fontWeight: 700, color: "#fff" }}>{inter.ttc.toLocaleString("fr-FR")} €</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: T.textSoft, marginBottom: 4 }}><span>Commission brute ({(inter.commRate * 100)}%)</span><span>{(inter.ttc * inter.commRate).toLocaleString("fr-FR")} €</span></div>
                  {inter.poseur && inter.poseurMode === "divise2" && <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#EF4444", marginBottom: 4 }}><span>Part poseur déduite tech (÷2)</span><span>-{(inter.poseurCost / 2).toLocaleString("fr-FR")} €</span></div>}
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#06D6A0", fontWeight: 700, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 6, marginTop: 4 }}><span>Commission nette tech</span><span>{calcCommission(inter).toLocaleString("fr-FR")} €</span></div>
                  {inter.poseur && <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#EC4899", marginTop: 4 }}><span>Coût poseur total</span><span>-{inter.poseurCost.toLocaleString("fr-FR")} €</span></div>}
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: T.cyan, fontWeight: 700, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 6, marginTop: 6 }}><span>Net patron</span><span>{calcNetPatron(inter).toLocaleString("fr-FR")} €</span></div>
                </div>
              )}

              {/* POSEUR DETAILS */}
              {inter.poseur && (inter.poseurPrixPose > 0 || inter.poseurAchats > 0) && (
                <div style={{ background: "rgba(236,72,153,0.06)", borderRadius: 12, padding: 14, border: "1px solid rgba(236,72,153,0.12)" }}>
                  <div style={{ fontSize: 11, color: "#EC4899", marginBottom: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>👷 Détails poseur — {inter.poseur}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: T.textSoft, marginBottom: 4 }}><span>Prix de pose déclaré</span><span style={{ fontWeight: 700, color: "#EC4899" }}>{(inter.poseurPrixPose || 0).toLocaleString("fr-FR")} €</span></div>
                  {inter.poseurAchats > 0 && <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: T.textSoft, marginBottom: 4 }}><span>Achats avancés</span><span style={{ fontWeight: 700, color: "#F97316" }}>{inter.poseurAchats.toLocaleString("fr-FR")} €</span></div>}
                  {inter.poseurNote && <div style={{ fontSize: 12, color: T.textSoft, marginTop: 6, fontStyle: "italic", background: "rgba(255,255,255,0.03)", padding: 8, borderRadius: 8 }}>📝 {inter.poseurNote}</div>}
                </div>
              )}

              {/* MEDIAS TECH */}
              {(inter.techMedias || []).length > 0 && (
                <div>
                  <div style={{ fontSize: 11, color: T.cyan, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>📸 Photos/vidéos technicien ({(inter.techMedias || []).length})</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {(inter.techMedias || []).map((m, i) => (
                      <div key={i} style={{ position: "relative", width: 70, height: 70, borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer" }} onClick={() => setViewMedia(m)}>
                        {m.type === "video" ? <video src={m.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <img src={m.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                        {m.type === "video" && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, textShadow: "0 2px 6px rgba(0,0,0,0.6)" }}>▶️</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MEDIAS POSEUR */}
              {(inter.poseurMedias || []).length > 0 && (
                <div>
                  <div style={{ fontSize: 11, color: "#EC4899", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>📸 Photos/vidéos poseur ({(inter.poseurMedias || []).length})</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {(inter.poseurMedias || []).map((m, i) => (
                      <div key={i} style={{ position: "relative", width: 70, height: 70, borderRadius: 8, overflow: "hidden", border: "1px solid rgba(236,72,153,0.2)", cursor: "pointer" }} onClick={() => setViewMedia(m)}>
                        {m.type === "video" ? <video src={m.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <img src={m.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                        {m.type === "video" && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, textShadow: "0 2px 6px rgba(0,0,0,0.6)" }}>▶️</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
                <button className="wa-btn" onClick={() => sendWhatsApp(inter.tel, waMessageClient(inter))} style={{ padding: "10px 14px", fontSize: 12, flex: 1 }}><WaIcon size={14} /> Client</button>
                {(() => { const t = techs.find(tc => tc.name === inter.tech); return t ? <button className="wa-btn" onClick={() => sendWhatsApp(t.tel, waMessageTech(inter, t.name))} style={{ padding: "10px 14px", fontSize: 12, flex: 1 }}><WaIcon size={14} /> Tech</button> : null; })()}
                <Btn onClick={() => setEditModal(null)} variant="ghost" style={{ flex: 1 }}>Fermer</Btn>
                {inter.statut === "Terminée" && <Btn onClick={() => { validerIntervention(inter.ref); setEditModal(null); }} style={{ flex: 1 }}>✅ Valider</Btn>}
              </div>
            </div>
          );
        })()}
      </Modal>

      {/* COMMISSION MODAL */}
      {viewMedia && <MediaLightbox media={viewMedia} onClose={() => setViewMedia(null)} />}
      <Modal open={!!commModal} onClose={() => setCommModal(null)} title="Modifier le taux de commission">
        {commModal && (() => {
          const tech = techs.find(t => t.id === commModal);
          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ fontSize: 14, color: "#fff", fontWeight: 600 }}>{tech?.name}</div>
              <div style={{ fontSize: 13, color: T.textMuted }}>Taux actuel : <strong style={{ color: T.cyan }}>{(tech?.commission * 100)}%</strong></div>
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
              <div style={{ fontSize: 13, color: T.textMuted }}>Numéro actuel : <strong style={{ color: T.cyan }}>{tech?.tel}</strong></div>
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
  const dateStyle = { padding: "9px 12px", fontSize: 13, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, color: "#fff", outline: "none", fontFamily: T.fontBody };

  const saveTTC = (ref) => {
    const val = parseFloat(editTTC);
    if (!isNaN(val) && val >= 0) {
      setInterventions(prev => prev.map(i => i.ref === ref ? { ...i, ttc: val } : i));
      if (val > 0) playKaching();
    }
    setEditRef(null); setEditTTC("");
  };

  return (
    <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", background: `linear-gradient(160deg, ${T.dark} 0%, ${T.bg} 40%, ${T.dark} 100%)`, minHeight: "100vh" }}>
      <Header account={account} onLogout={onLogout} />
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <div><h1 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 700, color: "#fff" }}>Bonjour {tech?.name.split(" ")[0]} 👋</h1><p style={{ margin: 0, fontSize: 13, color: T.textMuted }}>Votre activité</p></div>
          <div style={{ textAlign: "right" }}><div style={{ fontSize: 20, fontWeight: 700, background: "#06B6D4", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{time.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</div></div>
        </div>

        <div className="aurenis-kpis">
          <KPI label="Interventions" value={myInter.length} color={T.cyan} icon="📋" />
          <KPI label="Validées" value={validees.length} color="#06D6A0" icon="✅" />
          <KPI label="Mon CA" value={`${totalCA.toLocaleString("fr-FR")} €`} color="#10B981" icon="💰" />
          <KPI label="Mes commissions" value={`${totalComm.toLocaleString("fr-FR")} €`} color="#EF4444" icon="💸" />
          <KPI label="Mon taux" value={`${(tech?.commission * 100)}%`} color={tech?.color} icon="📊" />
        </div>

        {/* FILTERS */}
        <Card style={{ padding: 16, marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
              <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, opacity: 0.4, pointerEvents: "none" }}>🔍</div>
              <input type="text" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: "100%", padding: "10px 14px 10px 38px", fontSize: 13, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, color: "#fff", outline: "none", fontFamily: T.fontBody, boxSizing: "border-box" }} />
            </div>
            <button onClick={() => setShowFilters(!showFilters)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 16px", borderRadius: 12, background: showFilters ? "rgba(6,182,212,0.15)" : "rgba(255,255,255,0.06)", border: showFilters ? "1px solid rgba(6,182,212,0.2)" : "1px solid rgba(255,255,255,0.08)", color: showFilters ? T.cyan : T.textSoft, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: T.fontBody }}>⚙️ Filtres {activeFilters > 0 && <span style={{ background: T.cyan, color: T.dark, width: 18, height: 18, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>{activeFilters}</span>}</button>
            {activeFilters > 0 && <button onClick={() => { setSearch(""); setFilterType("all"); setDateFrom(""); setDateTo(""); }} style={{ padding: "10px 14px", borderRadius: 12, border: "1px solid rgba(239,71,111,0.2)", background: "rgba(239,71,111,0.08)", color: "#EF4444", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: T.fontBody }}>✕ Effacer</button>}
          </div>
          {showFilters && (
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>🔧 Spécialité</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button onClick={() => setFilterType("all")} style={{ padding: "7px 16px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: T.fontBody, background: filterType === "all" ? "rgba(6,182,212,0.15)" : "rgba(255,255,255,0.04)", color: filterType === "all" ? T.cyan : T.textMuted }}>Toutes</button>
                  {types.map(t => <button key={t} onClick={() => setFilterType(filterType === t ? "all" : t)} style={{ padding: "7px 16px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: T.fontBody, background: filterType === t ? `${typeColors[t]}33` : "rgba(255,255,255,0.04)", color: filterType === t ? typeColors[t] : T.textMuted, display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 4, background: typeColors[t], opacity: filterType === t ? 1 : 0.4 }} />{t}</button>)}
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
            <button key={t.id} onClick={() => setStatusTab(t.id)} style={{ flex: 1, padding: "8px 14px", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: T.fontBody, background: statusTab === t.id ? "rgba(255,255,255,0.1)" : "transparent", color: statusTab === t.id ? "#fff" : T.textMuted, minWidth: 80 }}>{t.l}</button>
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
              <div key={inter.ref} style={{ padding: "14px 14px", borderBottom: "1px solid rgba(255,255,255,0.04)", background: idx % 2 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                {/* Row 1: main info */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: inter.poseur ? 10 : 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", flex: 1, minWidth: 0 }}>
                    <span style={{ fontWeight: 700, color: T.cyan, fontSize: 13 }}>{inter.ref}</span>
                    <span style={{ color: T.textSoft, fontSize: 11 }}>{inter.date} {inter.heure}</span>
                    <TypeBadge type={inter.type} />
                    <ModeBadge mode={inter.mode} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                    <Badge status={inter.statut} />
                    {isEditing ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <input type="number" inputMode="decimal" value={editTTC} onChange={e => setEditTTC(e.target.value)} onKeyDown={e => e.key === "Enter" && saveTTC(inter.ref)} style={{ width: 90, padding: "8px 10px", fontSize: 16, fontWeight: 700, background: "rgba(255,255,255,0.1)", border: "1px solid " + T.cyan, borderRadius: 8, color: "#06D6A0", outline: "none", fontFamily: T.fontBody, textAlign: "right" }} autoFocus />
                        <span style={{ color: T.textMuted, fontSize: 14 }}>€</span>
                        <Btn onClick={() => saveTTC(inter.ref)} style={{ padding: "6px 12px", fontSize: 13, minHeight: 36 }}>✓</Btn>
                        <button onClick={() => { setEditRef(null); setEditTTC(""); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: T.textMuted, padding: 6, minWidth: 30, minHeight: 30 }}>✕</button>
                      </div>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontWeight: 700, fontSize: 15, color: inter.ttc > 0 ? "#06D6A0" : "rgba(255,255,255,0.15)" }}>{inter.ttc > 0 ? `${inter.ttc} €` : "—"}</span>
                        {canEdit && <button onClick={() => { setEditRef(inter.ref); setEditTTC(String(inter.ttc || "")); }} style={{ background: "rgba(255,255,255,0.04)", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 13, color: T.textMuted, minWidth: 36, minHeight: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>✏️</button>}
                        {inter.statut === "Validée" && <span style={{ fontSize: 10, color: "#06D6A0" }}>🔒</span>}
                      </div>
                    )}
                  </div>
                </div>
                {/* Client info line */}
                <div style={{ fontSize: 12, color: T.textMuted, marginTop: 4, marginBottom: 4, display: "flex", flexWrap: "wrap", gap: 4 }}>
                  <span>👤 {inter.clientNom} {inter.clientPrenom}</span>
                  <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
                  <span style={{ fontSize: 11 }}>{inter.adresse}</span>
                </div>

                {/* Row 2: commission breakdown if poseur */}
                {inter.poseur && inter.ttc > 0 && (
                  <div style={{ background: "rgba(236,72,153,0.05)", borderRadius: 10, padding: "10px 14px", border: "1px solid rgba(236,72,153,0.1)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: 12, color: "#EC4899", fontWeight: 700 }}>👷 Poseur : {inter.poseur} ({inter.poseurCost} €)</span>
                      <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 6, background: inter.poseurMode === "divise2" ? "rgba(251,191,36,0.12)" : "rgba(6,214,160,0.15)", color: inter.poseurMode === "divise2" ? "#FBBF24" : "#06D6A0", fontWeight: 600 }}>
                        {inter.poseurMode === "divise2" ? "÷ 2" : "Gratuit"}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 20, flexWrap: "wrap", fontSize: 13 }}>
                      <span style={{ color: T.textSoft }}>Commission brute ({(inter.commRate * 100)}%) : <strong style={{ color: "#fff" }}>{commBrute.toLocaleString("fr-FR")} €</strong></span>
                      {inter.poseurMode === "divise2" && <span style={{ color: "#EF4444" }}>Part poseur : <strong>-{(inter.poseurCost / 2).toLocaleString("fr-FR")} €</strong></span>}
                      <span style={{ color: "#06D6A0", fontWeight: 700 }}>Commission nette : <strong>{commNette.toLocaleString("fr-FR")} €</strong></span>
                    </div>
                  </div>
                )}
                {/* Simple commission display if no poseur */}
                {!inter.poseur && inter.ttc > 0 && inter.statut === "Validée" && (
                  <div style={{ marginTop: 6, fontSize: 12, color: "#06D6A0" }}>💰 Commission ({(inter.commRate * 100)}%) : <strong>{commNette.toLocaleString("fr-FR")} €</strong></div>
                )}
                {/* Media upload section */}
                <MediaUpload
                  medias={inter.techMedias || []}
                  readOnly={inter.statut === "Validée"}
                  label="Mes photos / vidéos chantier"
                  onAdd={(media) => setInterventions(prev => prev.map(i => i.ref === inter.ref ? { ...i, techMedias: [...(i.techMedias || []), media] } : i))}
                  onRemove={(idx) => setInterventions(prev => prev.map(i => i.ref === inter.ref ? { ...i, techMedias: (i.techMedias || []).filter((_, j) => j !== idx) } : i))}
                />
              </div>
            );
          })}
          {filtered.filter(i => i.statut === "Validée").length > 0 && (
            <div style={{ padding: "14px 20px", background: "rgba(6,182,212,0.06)", borderTop: "1px solid rgba(6,182,212,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <span style={{ fontWeight: 700, color: T.cyan, fontSize: 13 }}>TOTAL VALIDÉ</span>
              <div style={{ display: "flex", gap: 20 }}>
                <span><span style={{ fontSize: 11, color: T.textMuted }}>CA </span><span style={{ fontWeight: 700, color: "#06D6A0", fontSize: 15 }}>{filtered.filter(i => i.statut === "Validée").reduce((s, i) => s + i.ttc, 0).toLocaleString("fr-FR")} €</span></span>
                <span><span style={{ fontSize: 11, color: T.textMuted }}>Commission </span><span style={{ fontWeight: 700, color: T.cyan, fontSize: 15 }}>{filtered.filter(i => i.statut === "Validée").reduce((s, i) => s + calcCommission(i), 0).toLocaleString("fr-FR")} €</span></span>
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
const PoseurDash = ({ account, onLogout, interventions, setInterventions }) => {
  const [time, setTime] = useState(new Date());
  const [expandedRef, setExpandedRef] = useState(null);
  const [viewMedia, setViewMedia] = useState(null);
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearTimeout(t); }, []);

  const poseur = INIT_POSEURS.find(p => p.id === account.memberId);
  const myInter = interventions.filter(i => i.poseur === poseur?.name);
  const validees = myInter.filter(i => i.statut === "Validée");
  const totalPose = myInter.reduce((s, i) => s + (i.poseurPrixPose || i.poseurCost || 0), 0);
  const totalAchats = myInter.reduce((s, i) => s + (i.poseurAchats || 0), 0);

  const updateInter = (ref, updates) => {
    setInterventions(prev => prev.map(i => i.ref === ref ? { ...i, ...updates } : i));
  };

  const inputStyle = { padding: "10px 12px", fontSize: 14, fontWeight: 700, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#fff", outline: "none", fontFamily: T.fontBody, width: "100%", boxSizing: "border-box" };

  return (
    <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", background: `linear-gradient(160deg, ${T.dark} 0%, ${T.bg} 40%, ${T.dark} 100%)`, minHeight: "100vh" }}>
      <Header account={account} onLogout={onLogout} />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
        <div style={{ marginBottom: 24 }}><h1 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 700, color: "#fff" }}>Bonjour {poseur?.name.split(" ")[0]} 👋</h1><p style={{ margin: 0, fontSize: 13, color: T.textMuted }}>Vos interventions en tant que poseur</p></div>

        <div className="aurenis-kpis">
          <KPI label="Mes poses" value={myInter.length} color="#EC4899" icon="👷" />
          <KPI label="Validées" value={validees.length} color="#06D6A0" icon="✅" />
          <KPI label="Total poses" value={`${totalPose.toLocaleString("fr-FR")} €`} color="#EC4899" icon="💰" />
          <KPI label="Total achats avancés" value={`${totalAchats.toLocaleString("fr-FR")} €`} color="#F97316" icon="🧾" />
        </div>

        {viewMedia && <MediaLightbox media={viewMedia} onClose={() => setViewMedia(null)} />}
        <Card style={{ padding: 0, overflow: "hidden" }}>
          {myInter.length === 0 ? (
            <div style={{ padding: 48, textAlign: "center" }}><div style={{ fontSize: 40, opacity: 0.3, marginBottom: 8 }}>👷</div><div style={{ fontSize: 14, color: T.textSoft }}>Aucune intervention assignée</div></div>
          ) : myInter.map((inter, idx) => {
            const isExpanded = expandedRef === inter.ref;
            const isLocked = inter.statut === "Validée";
            return (
              <div key={inter.ref} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: idx % 2 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                {/* Header row — click to expand */}
                <div onClick={() => setExpandedRef(isExpanded ? null : inter.ref)} style={{ padding: "14px 14px", cursor: "pointer", transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(6,182,212,0.03)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 700, color: "#EC4899", fontSize: 13 }}>{inter.ref}</span>
                      <span style={{ color: T.textSoft, fontSize: 12 }}>{inter.date} {inter.heure}</span>
                      <TypeBadge type={inter.type} />
                      <ModeBadge mode={inter.mode} />
                      <span style={{ fontSize: 12, color: isExpanded ? T.cyan : T.textMuted }}>{isExpanded ? "▾" : "▸"}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Badge status={inter.statut} />
                      <span style={{ fontWeight: 700, color: "#EC4899", fontSize: 15 }}>{(inter.poseurPrixPose || inter.poseurCost || 0)} €</span>
                      {(inter.poseurMedias || []).length > 0 && <span style={{ fontSize: 11, color: "#06D6A0" }}>📸 {(inter.poseurMedias || []).length}</span>}
                    </div>
                  </div>
                  <div style={{ marginTop: 6, fontSize: 12, color: T.textMuted, display: "flex", flexWrap: "wrap", gap: 4 }}>
                    <span>Dépanneur : <strong style={{ color: "#fff" }}>{inter.tech}</strong></span>
                    <span style={{ margin: "0 6px" }}>·</span>
                    <span>Client : {inter.clientNom} {inter.clientPrenom}</span>
                    <span style={{ margin: "0 6px" }}>·</span>
                    <span>{inter.adresse}</span>
                  </div>
                  <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 6, background: inter.poseurMode === "divise2" ? "rgba(255,210,80,0.12)" : "rgba(6,214,160,0.12)", color: inter.poseurMode === "divise2" ? "#FBBF24" : "#06D6A0", fontWeight: 600 }}>
                      {inter.poseurMode === "divise2" ? "Mode ÷ 2 (partagé)" : "Mode gratuit"}
                    </span>
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div style={{ padding: "0 14px 16px", borderTop: "1px solid rgba(6,182,212,0.08)" }}>
                    {/* Vidéo/photos du technicien */}
                    {(inter.techMedias || []).length > 0 && (
                      <div style={{ background: "rgba(6,182,212,0.06)", borderRadius: 12, padding: 14, marginTop: 14, border: "1px solid rgba(6,182,212,0.12)" }}>
                        <div style={{ fontSize: 11, color: T.cyan, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>🎬 Médias du technicien — À faire</div>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          {(inter.techMedias || []).map((m, i) => (
                            <div key={i} style={{ position: "relative", width: 110, height: 110, borderRadius: 10, overflow: "hidden", border: "1px solid rgba(6,182,212,0.15)" }}>
                              {m.type === "video" ? (
                                <video src={m.url} style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }} onClick={() => setViewMedia(m)} />
                              ) : (
                                <img src={m.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }} onClick={() => setViewMedia(m)} />
                              )}
                              {m.type === "video" && <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: 28, pointerEvents: "none", textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>▶️</div>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Prix de la pose */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginTop: 14 }}>
                      <div>
                        <label style={{ fontSize: 11, color: T.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>💰 Prix de ma pose (€)</label>
                        <input type="number" value={inter.poseurPrixPose || ""} placeholder="0" disabled={isLocked}
                          onChange={e => updateInter(inter.ref, { poseurPrixPose: parseFloat(e.target.value) || 0 })}
                          style={{ ...inputStyle, color: "#EC4899", opacity: isLocked ? 0.5 : 1 }} />
                      </div>
                      <div>
                        <label style={{ fontSize: 11, color: T.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>🧾 Achats avancés (€)</label>
                        <input type="number" value={inter.poseurAchats || ""} placeholder="0" disabled={isLocked}
                          onChange={e => updateInter(inter.ref, { poseurAchats: parseFloat(e.target.value) || 0 })}
                          style={{ ...inputStyle, color: "#F97316", opacity: isLocked ? 0.5 : 1 }} />
                      </div>
                    </div>

                    {/* Note */}
                    <div style={{ marginTop: 12 }}>
                      <label style={{ fontSize: 11, color: T.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>📝 Note / commentaire</label>
                      <textarea value={inter.poseurNote || ""} placeholder="Détails sur le chantier..." disabled={isLocked}
                        onChange={e => updateInter(inter.ref, { poseurNote: e.target.value })}
                        style={{ ...inputStyle, minHeight: 60, resize: "vertical", opacity: isLocked ? 0.5 : 1 }} />
                    </div>

                    {/* Photos/vidéos chantier fini */}
                    <MediaUpload
                      medias={inter.poseurMedias || []}
                      readOnly={isLocked}
                      label="Mes photos / vidéos chantier fini"
                      minRequired={2}
                      onAdd={(media) => updateInter(inter.ref, { poseurMedias: [...(inter.poseurMedias || []), media] })}
                      onRemove={(idx) => updateInter(inter.ref, { poseurMedias: (inter.poseurMedias || []).filter((_, j) => j !== idx) })}
                    />

                    {/* Récapitulatif */}
                    {(inter.poseurPrixPose > 0 || inter.poseurAchats > 0) && (
                      <div style={{ background: "rgba(236,72,153,0.06)", borderRadius: 12, padding: 14, marginTop: 14, border: "1px solid rgba(236,72,153,0.12)" }}>
                        <div style={{ fontSize: 11, color: "#EC4899", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>📊 Récapitulatif</div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: T.textSoft, marginBottom: 4 }}><span>Prix de la pose</span><span style={{ fontWeight: 700, color: "#EC4899" }}>{(inter.poseurPrixPose || 0).toLocaleString("fr-FR")} €</span></div>
                        {inter.poseurAchats > 0 && <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: T.textSoft, marginBottom: 4 }}><span>Achats avancés</span><span style={{ fontWeight: 700, color: "#F97316" }}>{inter.poseurAchats.toLocaleString("fr-FR")} €</span></div>}
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 700, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 6, marginTop: 4 }}><span style={{ color: "#fff" }}>Total à percevoir</span><span style={{ color: "#EC4899" }}>{((inter.poseurPrixPose || 0) + (inter.poseurAchats || 0)).toLocaleString("fr-FR")} €</span></div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
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
  const [loading, setLoading] = useState(true);

  const [interventions, setInterventions] = useState(INIT_INTERVENTIONS);
  const [techs, setTechs] = useState(INIT_TECHS);
  const [specialties, setSpecialties] = useState(["Plomberie", "Serrurerie", "Électricité"]);
  const [statuts, setStatuts] = useState(["Planifiée", "En cours", "Terminée", "Validée"]);

  /* ═══ CHARGEMENT INITIAL DEPUIS SUPABASE ═══ */
  const dataLoaded = useRef(false);
  useEffect(() => {
    const load = async () => {
      const [dbTechs, dbInter, dbSpe, dbStat] = await Promise.all([
        supaLoad("techs"), supaLoad("interventions"), supaLoad("specialties"), supaLoad("statuts")
      ]);
      if (dbTechs) setTechs(dbTechs);
      else supaSave("techs", INIT_TECHS);
      if (dbInter) setInterventions(dbInter);
      else supaSave("interventions", INIT_INTERVENTIONS);
      if (dbSpe) setSpecialties(dbSpe);
      else supaSave("specialties", ["Plomberie", "Serrurerie", "Électricité"]);
      if (dbStat) setStatuts(dbStat);
      else supaSave("statuts", ["Planifiée", "En cours", "Terminée", "Validée"]);
      dataLoaded.current = true;
      setLoading(false);
    };
    load();
  }, []);

  /* ═══ SAUVEGARDE AUTO DANS SUPABASE À CHAQUE CHANGEMENT ═══ */
  useEffect(() => { if (dataLoaded.current) supaSave("techs", techs); }, [techs]);
  useEffect(() => { if (dataLoaded.current) supaSave("interventions", interventions); }, [interventions]);
  useEffect(() => { if (dataLoaded.current) supaSave("specialties", specialties); }, [specialties]);
  useEffect(() => { if (dataLoaded.current) supaSave("statuts", statuts); }, [statuts]);

  useEffect(() => {
    if (!document.querySelector('meta[name="viewport"]')) {
      const meta = document.createElement("meta"); meta.name = "viewport"; meta.content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div style={{ fontFamily: T.fontBody }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* Loading screen */}
      {loading && (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: T.dark }}>
          <AurenisLogo />
          <div style={{ marginTop: 32, display: "flex", gap: 6 }}>
            {[0,1,2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: T.cyan, animation: `pulseUrgent 1.2s infinite ${i * 0.2}s`, opacity: 0.6 }} />)}
          </div>
          <div style={{ marginTop: 14, fontSize: 13, color: T.textMuted, fontFamily: T.fontBody }}>Chargement des données...</div>
        </div>
      )}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}@keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}@keyframes pulseUrgent{0%,100%{opacity:1}50%{opacity:0.4}}@keyframes shimmer{from{background-position:-200% 0}to{background-position:200% 0}}*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}::placeholder{color:rgba(255,255,255,0.2)}html{-webkit-text-size-adjust:100%}body{overscroll-behavior:none;background:#0A0F1C}body::before{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");pointer-events:none;z-index:0}input,textarea,select,button{font-size:16px!important}input[type="date"]{color-scheme:dark}input[type="date"]::-webkit-calendar-picker-indicator{filter:invert(0.6);cursor:pointer;padding:4px}input[type="time"]{color-scheme:dark}input[type="time"]::-webkit-calendar-picker-indicator{filter:invert(0.6);cursor:pointer;padding:4px}select{appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='white' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center}
.aurenis-auth-bg{background-image:linear-gradient(rgba(6,182,212,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,0.03) 1px,transparent 1px)!important;background-size:40px 40px!important}
.aurenis-reveal{opacity:0;transform:translateY(12px);transition:opacity 0.5s ease,transform 0.5s ease}.aurenis-visible{opacity:1;transform:translateY(0)}

/* ═══ RESPONSIVE BASE ═══ */
.aurenis-tabs{display:flex;gap:3px;background:rgba(255,255,255,0.03);border-radius:8px;padding:3px;border:1px solid rgba(255,255,255,0.06);overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}
.aurenis-tabs::-webkit-scrollbar{display:none}
.aurenis-tabs button{padding:8px 18px;border:none;border-radius:6px;cursor:pointer;font-size:13px!important;font-weight:600;font-family:'Outfit',sans-serif;background:transparent;color:#6B7280;transition:all 0.15s;white-space:nowrap;flex-shrink:0;min-height:38px}
.aurenis-tabs button.active{background:rgba(6,182,212,0.1);color:#22D3EE}
.aurenis-kpis{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:24px}
.aurenis-kpis>div{flex:1;min-width:150px}
.aurenis-header-inner{display:flex;justify-content:space-between;align-items:center;max-width:1100px;margin:0 auto}
.aurenis-header-right{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.aurenis-inter-row{display:flex;justify-content:space-between;align-items:center;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.04);flex-wrap:wrap;gap:8px;transition:background 0.15s}
.aurenis-inter-row:hover{background:rgba(6,182,212,0.02)}
.aurenis-journal-grid{display:grid;grid-template-columns:80px 85px 1fr 75px 85px 80px 100px 90px;padding:10px 14px;font-size:13px!important;align-items:center}
.aurenis-stats-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.aurenis-filter-row{display:flex;gap:10px;flex-wrap:wrap;align-items:end}
.wa-btn{display:inline-flex;align-items:center;justify-content:center;gap:5px;background:rgba(37,211,102,0.1);border:1px solid rgba(37,211,102,0.2);color:#25D366;border-radius:8px;padding:8px 10px;cursor:pointer;font-size:12px!important;font-weight:600;font-family:'Outfit',sans-serif;white-space:nowrap;transition:all 0.15s;line-height:1;min-height:44px}
.wa-btn:hover{background:rgba(37,211,102,0.2);transform:translateY(-1px)}

/* ═══ TABLET (768px) ═══ */
@media(max-width:768px){
  .aurenis-header-inner{flex-direction:column;gap:8px;padding:10px 12px!important}
  .aurenis-header-right{justify-content:center;gap:8px}
  .aurenis-header-right>span{font-size:10px!important}
  .aurenis-header-right>div>div{font-size:12px!important}
  .aurenis-tabs{padding:3px}
  .aurenis-tabs button{padding:8px 14px;font-size:12px!important;min-height:36px}
  .aurenis-kpis>div{min-width:calc(50% - 7px);flex:unset}
  .aurenis-inter-row{flex-direction:column;align-items:flex-start;gap:10px}
  .aurenis-journal-grid{grid-template-columns:1fr 1fr!important;gap:6px 10px;font-size:12px!important}
  .aurenis-journal-grid>div:nth-child(3){grid-column:span 2}
  .aurenis-journal-grid>div:nth-child(4){display:none}
  .aurenis-journal-head{display:none!important}
  .aurenis-stats-grid{grid-template-columns:1fr}
  .aurenis-filter-row>div{flex:1 1 100%!important;min-width:0!important}
  .aurenis-filter-row>div:nth-child(2),.aurenis-filter-row>div:nth-child(3){flex:1 1 calc(50% - 5px)!important}
}

/* ═══ MOBILE (480px) ═══ */
@media(max-width:480px){
  .aurenis-kpis{gap:8px}
  .aurenis-kpis>div{min-width:calc(50% - 4px)}
  .aurenis-journal-grid{grid-template-columns:1fr!important;gap:4px}
  .aurenis-journal-grid>div:nth-child(3){grid-column:span 1}
  .aurenis-journal-grid>div{text-align:left!important}
  .aurenis-tabs button{padding:8px 10px;font-size:11px!important}
}

/* ═══ MOBILE SMALL (380px) ═══ */
@media(max-width:380px){
  .aurenis-kpis>div{min-width:100%}
}
`}</style>

      {!loading && page === "login" && <LoginPage onLogin={a => { setAccount(a); setPage("dashboard"); }} onGoRegister={() => setPage("register")} onGoForgot={() => setPage("forgot")} />}
      {!loading && page === "register" && <RegisterPage onGoLogin={() => setPage("login")} onRegistered={(e, c) => { setVerifyEmail(e); setVerifyCode(c); setPage("verify"); }} />}
      {!loading && page === "verify" && <VerifyPage email={verifyEmail} code={verifyCode} onVerified={() => setPage("verified")} onGoLogin={() => setPage("login")} />}
      {!loading && page === "verified" && <VerifiedPage onGoLogin={() => setPage("login")} />}
      {!loading && page === "forgot" && <ForgotPage onGoLogin={() => setPage("login")} />}
      {!loading && page === "dashboard" && account?.role === "admin" && <AdminDash account={account} onLogout={() => { setAccount(null); setPage("login"); }} interventions={interventions} setInterventions={setInterventions} techs={techs} setTechs={setTechs} specialties={specialties} setSpecialties={setSpecialties} statuts={statuts} setStatuts={setStatuts} />}
      {!loading && page === "dashboard" && account?.role === "tech" && <TechDash account={account} onLogout={() => { setAccount(null); setPage("login"); }} interventions={interventions} setInterventions={setInterventions} techs={techs} specialties={specialties} />}
      {!loading && page === "dashboard" && account?.role === "poseur" && <PoseurDash account={account} onLogout={() => { setAccount(null); setPage("login"); }} interventions={interventions} setInterventions={setInterventions} />}
    </div>
  );
}
