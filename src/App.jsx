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
    <div onClick={onClose} className="fixed inset-0 bg-black/90 flex items-center justify-center z-[2000] p-4 backdrop-blur-sm">
      <button onClick={onClose} className="absolute top-4 right-4 bg-white/15 border-none rounded-full w-10 h-10 cursor-pointer text-white text-xl flex items-center justify-center z-[2001] hover:bg-white/25 transition-colors">✕</button>
      <div onClick={e => e.stopPropagation()} className="max-w-[95vw] max-h-[90vh]">
        {media.type === "video" ? (
          <video src={media.url} controls autoPlay className="max-w-[95vw] max-h-[85vh] rounded-xl" />
        ) : (
          <img src={media.url} alt="" className="max-w-[95vw] max-h-[85vh] rounded-xl object-contain" />
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
    <div className="mt-2.5">
      {viewMedia && <MediaLightbox media={viewMedia} onClose={() => setViewMedia(null)} />}
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-500 font-bold uppercase tracking-wide">📸 {label}</span>
        {minRequired > 0 && medias.length < minRequired && <span className="text-xs text-danger-600 font-semibold">Min. {minRequired} requis</span>}
        {medias.length >= minRequired && minRequired > 0 && <span className="text-xs text-success-600 font-semibold">✅ {medias.length} fichier{medias.length > 1 ? "s" : ""}</span>}
      </div>
      {/* Media grid */}
      {medias.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-2.5">
          {medias.map((m, idx) => (
            <div key={idx} className="relative w-[90px] h-[90px] rounded-lg overflow-hidden border border-gray-200">
              {m.type === "video" ? (
                <video src={m.url} className="w-full h-full object-cover cursor-pointer" onClick={() => setViewMedia(m)} />
              ) : (
                <img src={m.url} alt="" className="w-full h-full object-cover cursor-pointer" onClick={() => setViewMedia(m)} />
              )}
              {m.type === "video" && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl pointer-events-none drop-shadow-lg">▶️</div>}
              {!readOnly && <button onClick={() => onRemove(idx)} className="absolute top-0.5 right-0.5 bg-black/70 border-none rounded-full w-5 h-5 cursor-pointer text-danger-500 text-xs flex items-center justify-center hover:bg-black/90">✕</button>}
            </div>
          ))}
        </div>
      )}
      {/* Upload buttons */}
      {!readOnly && (
        <div className="flex gap-2">
          <input ref={fileRef} type="file" accept="image/*,video/*" multiple onChange={handleFiles} className="hidden" />
          <input ref={cameraRef} type="file" accept="image/*" capture="environment" onChange={handleFiles} className="hidden" />
          <button onClick={() => cameraRef.current?.click()} disabled={uploading} className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-primary-50 border border-dashed border-primary-200 rounded-lg cursor-pointer text-primary-600 text-xs font-semibold flex-1 disabled:opacity-50 disabled:cursor-wait hover:bg-primary-100 transition-colors">
            📷 Prendre photo
          </button>
          <button onClick={() => fileRef.current?.click()} disabled={uploading} className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-gray-50 border border-dashed border-gray-200 rounded-lg cursor-pointer text-gray-600 text-xs font-semibold flex-1 disabled:opacity-50 disabled:cursor-wait hover:bg-gray-100 transition-colors">
            📁 Galerie / Fichier
          </button>
        </div>
      )}
      {uploading && <div className="mt-2 flex items-center gap-2 text-xs text-primary-600"><span className="inline-block w-3.5 h-3.5 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin" /> Envoi en cours...</div>}
    </div>
  );
};

/* ═══ STORAGE (localStorage) ═══ */
const ST = {
  async get(k) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch { return null; } },
  async set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } },
};

/* ═══ SHARED COMPONENTS ═══ */
const AurenisLogo = ({ size = "lg" }) => {
  const s = size === "lg" ? 40 : 28; const fs = size === "lg" ? 22 : 16; const sub = size === "lg" ? 11 : 9;
  return (
    <div className={`flex items-center ${size === "lg" ? "gap-3" : "gap-2"}`}>
      <div className="flex items-center justify-center rounded-lg border-2 border-primary-600 bg-primary-50" style={{ width: s, height: s }}>
        <svg width={s * 0.5} height={s * 0.5} viewBox="0 0 24 24" fill="none"><path d="M12 2C12 2 5 10 5 15C5 18.87 8.13 22 12 22C15.87 22 19 18.87 19 15C19 10 12 2 12 2Z" stroke="#06B6D4" strokeWidth="2" fill="none" /><path d="M12 8C12 8 9 12 9 14.5C9 16.43 10.34 18 12 18C13.66 18 15 16.43 15 14.5C15 12 12 8 12 8Z" fill="#06B6D4" opacity="0.3" /></svg>
      </div>
      <div><div className="flex items-baseline gap-1.5"><span className="font-bold text-primary-600 tracking-wider" style={{ fontSize: fs }}>AURENIS</span><span className="font-light text-gray-400 tracking-widest uppercase" style={{ fontSize: sub }}>customer</span></div></div>
    </div>
  );
};

const Inp = ({ icon, type = "text", placeholder, value, onChange, error, onKeyDown, style: sx }) => (
  <div className={`relative ${error ? "mb-1" : "mb-0"}`} style={sx}>
    {icon && <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base text-gray-400 pointer-events-none">{icon}</div>}
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDown}
      className={`input ${icon ? "pl-11" : ""} ${error ? "input-error" : ""}`} />
    {error && <div className="text-xs text-danger-600 mt-1 font-medium pl-1">{error}</div>}
  </div>
);

const Btn = ({ children, onClick, loading, variant = "primary", disabled, style: sx }) => {
  const variantClass = variant === "primary" ? "btn-primary" : variant === "danger" ? "btn-danger" : variant === "success" ? "btn-success" : "btn-ghost";
  return <button onClick={onClick} disabled={disabled || loading} className={`btn ${variantClass}`} style={sx}>{loading ? "..." : children}</button>;
};

const Badge = ({ status }) => {
  const statusMap = {
    "Planifiée": "badge-primary",
    "En cours": "badge-warning",
    "Terminée": "badge-warning",
    "Validée": "badge-success"
  };
  return <span className={`badge ${statusMap[status] || "badge-gray"} uppercase tracking-wide border-l-2`}>{status}</span>;
};
const ModeBadge = ({ mode }) => <span className={`badge text-xs font-bold uppercase tracking-wide ${mode === "Urgence" ? "bg-danger-600 text-white animate-pulse" : "bg-primary-600 text-white"}`}>{mode === "Urgence" ? "⚡ URG" : "📅 RDV"}</span>;
const TypeBadge = ({ type }) => {
  const typeColorMap = { "Plomberie": "text-cyan-600 bg-cyan-50", "Serrurerie": "text-purple-600 bg-purple-50", "Électricité": "text-amber-600 bg-amber-50" };
  return <span className={`badge ${typeColorMap[type] || "badge-gray"} inline-flex items-center gap-1.5`}><span className="w-1.5 h-1.5 rounded-full" style={{ background: type === "Plomberie" ? "#06B6D4" : type === "Serrurerie" ? "#8B5CF6" : "#F59E0B" }} />{type}</span>;
};

const KPI = ({ label, value, color, icon }) => (
  <div className="kpi-card flex-1 min-w-[140px] border-l-3" style={{ borderLeftColor: color }}>
    <div className="text-lg mb-1 opacity-80">{icon}</div>
    <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">{label}</div>
    <div className="text-2xl font-bold text-gray-900 break-words font-mono">{value}</div>
  </div>
);

const Card = ({ children, style: sx }) => <div className="card p-5" style={sx}>{children}</div>;
const SectionTitle = ({ children, right }) => <div className="flex justify-between items-center mb-5"><h2 className="m-0 text-lg font-bold text-gray-900">{children}</h2>{right}</div>;

/* ═══ MODAL ═══ */
const Modal = ({ open, onClose, title, children, width = 480 }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/70 flex items-end justify-center z-[1000] p-0 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-t-2xl p-5 w-full border border-gray-200 border-b-0 shadow-2xl max-h-[88vh] overflow-y-auto animate-slide-up" style={{ maxWidth: width }} onClick={e => e.stopPropagation()}>
        <div className="w-12 h-1 rounded-full bg-gray-300 mx-auto mb-4 opacity-40" />
        <div className="flex justify-between items-center mb-4">
          <h3 className="m-0 text-lg font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="bg-gray-100 border border-gray-200 rounded-lg w-9 h-9 cursor-pointer text-gray-500 text-base flex items-center justify-center flex-shrink-0 hover:bg-gray-200 transition-all">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};

/* ═══ AUTH SHELL ═══ */
const AuthShell = ({ children }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 bg-grid-pattern">
    <div className="w-full max-w-md animate-fade-up">{children}</div>
  </div>
);
const AuthCard = ({ children, title, subtitle }) => (
  <div className="card p-8 shadow-soft-lg">
    <div className="text-center mb-6"><div className="flex justify-center mb-3.5"><AurenisLogo /></div><h1 className="m-0 mb-1.5 text-xl font-bold text-gray-900">{title}</h1><p className="m-0 text-sm text-gray-600 leading-relaxed">{subtitle}</p></div>{children}
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
      <div className="flex flex-col gap-3.5">
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 text-xs text-primary-600 leading-relaxed">
          <strong>Démo Admin :</strong> admin@aquatech.fr / Admin123<br/>
          <strong>Créer un compte tech :</strong> ahmed@aquatech.fr, lucas@aquatech.fr...<br/>
          <strong>Créer un compte poseur :</strong> rachid@aquatech.fr, sofiane@aquatech.fr
        </div>
        <Inp icon="✉️" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handle()} />
        <div className="relative"><Inp icon="🔒" type={show ? "text" : "password"} placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handle()} /><button onClick={() => setShow(!show)} className="absolute right-3.5 top-3.5 bg-transparent border-none cursor-pointer text-sm text-gray-400 hover:text-gray-600">{show ? "🙈" : "👁️"}</button></div>
        {error && <div className="bg-danger-50 rounded-lg p-3 text-sm text-danger-600 font-medium">{error}</div>}
        <Btn onClick={handle} loading={loading} style={{ width: "100%" }}>Se connecter</Btn>
        <button onClick={onGoForgot} className="bg-transparent border-none cursor-pointer text-sm text-primary-600 font-semibold p-2 hover:text-primary-700">Mot de passe oublié ?</button>
      </div>
      <div className="mt-5 pt-4 border-t border-gray-200 text-center"><span className="text-sm text-gray-600">Pas de compte ? </span><button onClick={onGoRegister} className="bg-transparent border-none cursor-pointer text-sm text-primary-600 font-bold hover:text-primary-700">Créer un compte</button></div>
    </AuthCard></AuthShell>
  );
};

/* ═══ REGISTER ═══ */
const RegisterPage = ({ onGoLogin, onRegistered }) => {
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [confirm, setConfirm] = useState(""); const [role, setRole] = useState("tech"); const [errors, setErrors] = useState({}); const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false); const [showCf, setShowCf] = useState(false);
  const validate = () => {
    const e = {}; const em = email.toLowerCase().trim();
    if (!name.trim()) e.name = "Requis";
    if (!em) e.email = "Requis"; else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) e.email = "Format invalide";
    if (!password) e.password = "Requis"; else if (password.length < 6) e.password = "Min. 6 car."; else if (!/[A-Z]/.test(password)) e.password = "1 majuscule"; else if (!/[0-9]/.test(password)) e.password = "1 chiffre";
    if (password !== confirm) e.confirm = "Non identiques"; setErrors(e); return Object.keys(e).length === 0;
  };
  const handle = async () => {
    if (!validate()) return; setLoading(true); await new Promise(r => setTimeout(r, 800));
    const em = email.toLowerCase().trim(); const ex = await ST.get(`account:${em}`); if (ex) { setLoading(false); return setErrors({ email: "Compte existant" }); }
    const memberId = role === "admin" ? "A" + Date.now() : (role === "tech" ? "T" + Date.now() : "P" + Date.now());
    const code = String(Math.floor(100000 + Math.random() * 900000));
    await ST.set(`account:${em}`, { email: em, password, name: name.trim(), memberId, role, verified: false, verifyCode: code });
    setLoading(false); onRegistered(em, code);
  };
  const strength = (() => { if (!password) return { pct: 0, label: "", color: "#333" }; let s = 0; if (password.length >= 6) s++; if (password.length >= 10) s++; if (/[A-Z]/.test(password)) s++; if (/[0-9]/.test(password)) s++; if (/[^a-zA-Z0-9]/.test(password)) s++; return [{ pct: 20, label: "Très faible", color: "#EF4444" }, { pct: 40, label: "Faible", color: "#F97316" }, { pct: 60, label: "Moyen", color: "#FBBF24" }, { pct: 80, label: "Fort", color: "#06D6A0" }, { pct: 100, label: "Excellent", color: "#10B981" }][Math.min(s, 4)]; })();
  const eyeBtn = (visible, toggle) => <button onClick={toggle} className="absolute right-3.5 top-3.5 bg-transparent border-none cursor-pointer text-sm text-gray-400 hover:text-gray-600">{visible ? "🙈" : "👁️"}</button>;
  return (
    <AuthShell><AuthCard title="Créer un compte" subtitle="Inscription libre - Tous les rôles disponibles">
      <div className="flex flex-col gap-3.5">
        <Inp icon="👤" type="text" placeholder="Nom complet" value={name} onChange={e => setName(e.target.value)} error={errors.name} />
        <Inp icon="✉️" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} error={errors.email} />
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 ml-1">🎭 Rôle</label>
          <div className="flex gap-2">
            <button onClick={() => setRole("admin")} className={`flex-1 py-2.5 px-3 rounded-lg border-2 text-sm font-semibold transition-all ${role === "admin" ? "bg-primary-50 border-primary-600 text-primary-700" : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"}`}>👑 Admin</button>
            <button onClick={() => setRole("tech")} className={`flex-1 py-2.5 px-3 rounded-lg border-2 text-sm font-semibold transition-all ${role === "tech" ? "bg-primary-50 border-primary-600 text-primary-700" : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"}`}>🔧 Tech</button>
            <button onClick={() => setRole("poseur")} className={`flex-1 py-2.5 px-3 rounded-lg border-2 text-sm font-semibold transition-all ${role === "poseur" ? "bg-primary-50 border-primary-600 text-primary-700" : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"}`}>👷 Poseur</button>
          </div>
        </div>
        <div><div className="relative"><Inp icon="🔒" type={showPw ? "text" : "password"} placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} error={errors.password} />{eyeBtn(showPw, () => setShowPw(!showPw))}</div>{password && <div className="mt-2"><div className="flex gap-1 mb-1">{[0,1,2,3,4].map(i => <div key={i} className="flex-1 h-1 rounded" style={{ background: i < strength.pct / 20 ? strength.color : "#E5E7EB" }} />)}</div><span className="text-xs font-semibold" style={{ color: strength.color }}>{strength.label}</span></div>}</div>
        <div className="relative"><Inp icon="🔒" type={showCf ? "text" : "password"} placeholder="Confirmer" value={confirm} onChange={e => setConfirm(e.target.value)} error={errors.confirm} />{eyeBtn(showCf, () => setShowCf(!showCf))}</div>
        <Btn onClick={handle} loading={loading} style={{ width: "100%" }}>Créer mon compte</Btn>
      </div>
      <div className="mt-5 pt-4 border-t border-gray-200 text-center"><button onClick={onGoLogin} className="bg-transparent border-none cursor-pointer text-sm text-primary-600 font-bold hover:text-primary-700">← Se connecter</button></div>
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
    <AuthShell><AuthCard title="Vérification" subtitle={<>Code envoyé à <strong className="text-primary-600">{email}</strong></>}>
      <div className="bg-primary-50 border border-primary-200 rounded-lg px-3.5 py-2.5 text-xs text-primary-600 text-center mb-5 font-semibold">📧 Démo — Code : <span className="text-base tracking-widest font-bold">{code}</span></div>
      <div className="flex gap-2 justify-center mb-5">{input.map((v, i) => <input key={i} id={`otp-${i}`} type="text" inputMode="numeric" maxLength={1} value={v} onChange={e => hc(i, e.target.value)} onKeyDown={e => hk(i, e)} className={`w-12 h-14 text-center text-2xl font-bold ${v ? "bg-primary-50 border-primary-200" : "bg-gray-50 border-gray-200"} border-2 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-primary-500`} />)}</div>
      {error && <div className="bg-danger-50 rounded-lg p-2.5 text-sm text-danger-600 text-center mb-3.5">{error}</div>}
      <Btn onClick={handle} loading={loading} style={{ width: "100%" }}>Vérifier</Btn>
      <div className="mt-4 text-center"><button onClick={onGoLogin} className="bg-transparent border-none cursor-pointer text-sm text-gray-500 hover:text-gray-700">← Retour</button></div>
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
  const eyeBtn = (visible, toggle) => <button onClick={toggle} className="absolute right-3.5 top-3.5 bg-transparent border-none cursor-pointer text-sm text-gray-400 hover:text-gray-600">{visible ? "🙈" : "👁️"}</button>;
  return (
    <AuthShell><AuthCard title={step === "done" ? "Réinitialisé ✓" : "Récupération"} subtitle={step === "done" ? "Connectez-vous" : "Récupérez votre accès"}>
      {step === "email" && <div className="flex flex-col gap-3.5"><Inp icon="✉️" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />{err && <div className="text-sm text-danger-600">{err}</div>}<Btn onClick={send} loading={ld} style={{ width: "100%" }}>Envoyer</Btn></div>}
      {step === "code" && <div className="flex flex-col gap-3.5"><div className="bg-primary-50 rounded-lg p-2.5 text-xs text-primary-600 text-center font-semibold">Code : <strong>{gc}</strong></div><Inp icon="🔑" placeholder="Code 6 chiffres" value={rc} onChange={e => setRc(e.target.value)} />{err && <div className="text-sm text-danger-600">{err}</div>}<Btn onClick={verify} style={{ width: "100%" }}>Vérifier</Btn></div>}
      {step === "newpass" && <div className="flex flex-col gap-3.5"><div className="relative"><Inp icon="🔒" type={showNp ? "text" : "password"} placeholder="Nouveau" value={np} onChange={e => setNp(e.target.value)} />{eyeBtn(showNp, () => setShowNp(!showNp))}</div><div className="relative"><Inp icon="🔒" type={showCp ? "text" : "password"} placeholder="Confirmer" value={cp} onChange={e => setCp(e.target.value)} />{eyeBtn(showCp, () => setShowCp(!showCp))}</div>{err && <div className="text-sm text-danger-600">{err}</div>}<Btn onClick={reset} loading={ld} style={{ width: "100%" }}>Réinitialiser</Btn></div>}
      {step === "done" && <div className="text-center"><div className="text-5xl mb-4">✅</div><Btn onClick={onGoLogin} style={{ width: "100%" }}>Se connecter</Btn></div>}
      {step !== "done" && <div className="mt-4 text-center"><button onClick={onGoLogin} className="bg-transparent border-none cursor-pointer text-sm text-gray-500 hover:text-gray-700">← Retour</button></div>}
    </AuthCard></AuthShell>
  );
};

const VerifiedPage = ({ onGoLogin }) => (
  <AuthShell><AuthCard title="Email vérifié !" subtitle="Compte activé"><div style={{ textAlign: "center", marginBottom: 20 }}><div style={{ fontSize: 48 }}>✅</div></div><Btn onClick={onGoLogin} style={{ width: "100%" }}>Se connecter</Btn></AuthCard></AuthShell>
);

/* ═══ APP HEADER ═══ */
const Header = ({ account, onLogout, roleBadge }) => {
  const member = [...INIT_TECHS, ...INIT_POSEURS].find(m => m.id === account.memberId);
  const color = member?.color || "#06B6D4";
  const initials = account.name?.split(" ").map(n => n[0]).join("") || "A";
  const roleColorClass = account.role === "admin" ? "bg-primary-600" : account.role === "tech" ? "bg-blue-600" : "bg-pink-600";
  return (
    <div className="bg-white border-b border-gray-200 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
      <div className={`h-0.5 ${roleColorClass}`} />
      <div className="aurenis-header-inner px-4 py-2.5">
        <AurenisLogo size="sm" />
        <div className="aurenis-header-right">
          <span className={`text-xs font-bold px-2 py-1 rounded-lg uppercase tracking-wide ${account.role === "admin" ? "bg-primary-50 text-primary-600" : account.role === "tech" ? "bg-blue-50 text-blue-600" : "bg-pink-50 text-pink-600"}`}>{account.role === "admin" ? "Admin" : account.role === "tech" ? "Technicien" : "Poseur"}</span>
          <div className="text-right"><div className="text-sm font-semibold text-gray-900">{account.name}</div></div>
          <div className="w-[34px] h-[34px] rounded-lg flex items-center justify-center text-white font-bold text-xs" style={{ background: color }}>{initials}</div>
          <button onClick={onLogout} className="bg-transparent border-none cursor-pointer text-xs text-danger-600 font-semibold px-2.5 py-1.5 opacity-80 hover:opacity-100">Déconnexion</button>
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
    <div className="relative">
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base opacity-40 pointer-events-none">📍</div>
      <input
        type="text" placeholder="Tapez une adresse..." value={query}
        onChange={e => { setQuery(e.target.value); onChange(e.target.value); setShowSugg(true); }}
        onFocus={() => { setFocused(true); setShowSugg(true); }}
        onBlur={() => setTimeout(() => { setFocused(false); setShowSugg(false); }, 250)}
        className={`w-full px-4 py-3 pl-11 text-sm font-medium bg-white border ${focused ? "border-primary-500 ring-2 ring-primary-500/20" : "border-gray-300"} rounded-xl text-gray-900 outline-none transition-all`}
      />
      {loading && <div className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin" />}
      {showSugg && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-[100] mt-1 bg-white border border-primary-100 rounded-xl overflow-hidden shadow-soft-lg">
          {suggestions.map((s, i) => (
            <div key={i} onMouseDown={e => e.preventDefault()} onClick={() => { setQuery(s.full); onChange(s.full); setShowSugg(false); setSuggestions([]); }}
              className={`px-4 py-2.5 text-sm text-gray-900 cursor-pointer transition-colors hover:bg-primary-50 ${i < suggestions.length - 1 ? "border-b border-gray-100" : ""}`}>
              <div className="flex items-center gap-2">
                <span className="text-primary-600 text-sm">📍</span>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{s.main}</div>
                  <div className="text-xs text-gray-500">{s.secondary}</div>
                </div>
              </div>
            </div>
          ))}
          <div className="px-4 py-1.5 text-[9px] text-gray-300 text-right">{source === "google" ? "Google Places" : "🇫🇷 Base Adresse Nationale"}</div>
        </div>
      )}
    </div>
  );
};

/* ═══ CONFIG ITEM — add/remove chip ═══ */
const ConfigList = ({ items, onAdd, onRemove, label, icon, color }) => {
  const [newItem, setNewItem] = useState("");
  return (
    <div className="mb-5">
      <div className="text-xs text-gray-500 font-bold uppercase tracking-wide mb-2.5 flex items-center gap-1.5"><span>{icon}</span> {label}</div>
      <div className="flex gap-2 flex-wrap mb-2.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
            <span className="text-sm font-semibold" style={{ color }}>{item}</span>
            <button onClick={() => onRemove(item)} className="bg-transparent border-none cursor-pointer text-danger-600 text-sm p-0 leading-none opacity-70 hover:opacity-100 transition-opacity">✕</button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input type="text" placeholder={`Ajouter ${label.toLowerCase()}...`} value={newItem} onChange={e => setNewItem(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && newItem.trim()) { onAdd(newItem.trim()); setNewItem(""); } }}
          className="flex-1 input" />
        <button onClick={() => { if (newItem.trim()) { onAdd(newItem.trim()); setNewItem(""); } }} className="btn btn-primary">+ Ajouter</button>
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
    <div className="bg-gray-50 min-h-screen">
      <Header account={account} onLogout={onLogout} />
      <div className="max-w-[1100px] mx-auto px-4 py-5">
        {/* Time + Nav */}
        <div className="flex justify-between items-center mb-5">
          <div className="aurenis-tabs">
            {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} className={tab === t.id ? "active" : ""}>{t.icon} {t.label}</button>)}
          </div>
          <div className="text-sm font-semibold text-gray-500">{time.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" })} · <span className="text-primary-600">{time.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</span></div>
        </div>

        {/* ═══ DASHBOARD ═══ */}
        {tab === "dashboard" && (
          <div>
            <div className="aurenis-kpis">
              <KPI label="Interventions" value={interventions.length} color="#06B6D4" icon="📋" />
              <KPI label="Validées" value={validees.length} color="#06D6A0" icon="✅" />
              <KPI label="En attente" value={attente} color="#FBBF24" icon="⏳" />
              <KPI label="CA Validé TTC" value={`${totalTTC.toLocaleString("fr-FR")} €`} color="#10B981" icon="💰" />
              <KPI label="Commissions" value={`${totalComm.toLocaleString("fr-FR")} €`} color="#EF4444" icon="💸" />
              <KPI label="CA Net Patron" value={`${caNet.toLocaleString("fr-FR")} €`} color="#06B6D4" icon="🏢" />
            </div>
            {terminees.length > 0 && (
              <Card className="mb-5 border-l-3 border-l-warning-500">
                <SectionTitle right={<span className="text-xs text-warning-500 font-bold">⏳ {terminees.length} en attente</span>}>Interventions à valider</SectionTitle>
                {terminees.map(inter => (
                  <div key={inter.ref} className="aurenis-inter-row py-3 border-b border-gray-100">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-bold text-primary-600 text-sm">{inter.ref}</span>
                      <span className="text-gray-600 text-sm">{inter.date}</span>
                      <span className="text-gray-900 font-semibold text-sm">{inter.tech}</span>
                      <TypeBadge type={inter.type} />
                      {inter.poseur && <span className="text-xs text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md">👷 {inter.poseur}</span>}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-success-600 text-base">{inter.ttc} €</span>
                      <button className="wa-btn" onClick={() => sendWhatsApp(inter.tel, waMessageClient(inter))} title="WhatsApp client"><WaIcon /></button>
                      <Btn onClick={() => setEditModal(inter.ref)} variant="ghost" className="btn-sm">✏️ Modifier</Btn>
                      <Btn onClick={() => validerIntervention(inter.ref)} className="btn-sm">✅ Valider</Btn>
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
            <SectionTitle right={<span className="text-xs text-gray-500">{interventions.length} interventions</span>}>Toutes les interventions</SectionTitle>
            {interventions.map((inter, idx) => (
              <div key={inter.ref} className="aurenis-inter-row">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-bold text-primary-600 text-sm min-w-[68px]">{inter.ref}</span>
                  <span className="text-gray-600 text-xs">{inter.date} {inter.heure}</span>
                  <TypeBadge type={inter.type} />
                  <ModeBadge mode={inter.mode} />
                  <span className="text-sm text-gray-900 font-semibold">{inter.tech}</span>
                  {inter.poseur && <span className="text-xs text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md">👷 {inter.poseur} ({inter.poseurCost}€ · {inter.poseurMode === "divise2" ? "÷2" : "gratuit"})</span>}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-500">{inter.clientNom} {inter.clientPrenom}</span>
                  <Badge status={inter.statut} />
                  <span className={`font-bold text-sm ${inter.ttc > 0 ? "text-success-600" : "text-gray-300"}`}>{inter.ttc > 0 ? `${inter.ttc} €` : "—"}</span>
                  <button className="wa-btn" onClick={() => sendWhatsApp(inter.tel, waMessageClient(inter))} title="WhatsApp client"><WaIcon /></button>
                  {(() => { const t = techs.find(tc => tc.name === inter.tech); return t ? <button className="wa-btn" onClick={() => sendWhatsApp(t.tel, waMessageTech(inter, t.name))} title="WhatsApp tech"><WaIcon /><span className="text-[9px]">Tech</span></button> : null; })()}
                  <Btn onClick={() => setEditModal(inter.ref)} variant="ghost" className="btn-sm">✏️</Btn>
                  {inter.statut === "Terminée" && <Btn onClick={() => validerIntervention(inter.ref)} className="btn-sm">✅ Valider</Btn>}
                </div>
              </div>
            ))}
          </Card>
        )}

        {/* ═══ EQUIPE ═══ */}
        {tab === "equipe" && (
          <div>
            <Card className="mb-5">
              <SectionTitle>Techniciens</SectionTitle>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3.5">
                {techs.map(tech => {
                  const myInter = interventions.filter(i => i.tech === tech.name && i.statut === "Validée");
                  const ca = myInter.reduce((s, i) => s + i.ttc, 0);
                  return (
                    <div key={tech.id} className="bg-white rounded-2xl p-5 border-l-3" style={{ borderLeftColor: tech.color }}>
                      <div className="flex justify-between items-start mb-3">
                        <div><div className="font-bold text-gray-900 text-base">{tech.name}</div><div className="text-xs text-gray-500">{tech.spe}</div></div>
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background: tech.color }}>{tech.name.split(" ").map(n => n[0]).join("")}</div>
                      </div>
                      <div className="flex justify-between items-center mb-2.5">
                        <span className="text-xs text-gray-500">{myInter.length} validées · CA {ca.toLocaleString("fr-FR")} €</span>
                      </div>
                      {/* Téléphone */}
                      <div className="flex justify-between items-center bg-gray-50 rounded-lg px-3.5 py-2.5 mb-2">
                        <div><span className="text-xs text-gray-500">Téléphone</span><div className="text-sm font-semibold text-gray-900 mt-0.5">{tech.tel}</div></div>
                        <div className="flex gap-1.5">
                          <button className="wa-btn !p-2" onClick={() => sendWhatsApp(tech.tel, `Bonjour ${tech.name.split(" ")[0]},\n\n`)} title="WhatsApp"><WaIcon /></button>
                          <Btn onClick={() => { setTelModal(tech.id); setNewTel(tech.tel); }} variant="ghost" className="btn-sm">✏️</Btn>
                        </div>
                      </div>
                      {/* Commission */}
                      <div className="flex justify-between items-center bg-gray-50 rounded-lg px-3.5 py-2.5">
                        <div><span className="text-xs text-gray-500">Taux commission</span><div className="text-xl font-bold text-primary-600">{(tech.commission * 100)}%</div></div>
                        <Btn onClick={() => { setCommModal(tech.id); setNewRate(String(tech.commission * 100)); }} variant="ghost" className="btn-sm">✏️ Modifier</Btn>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
            <Card>
              <SectionTitle>Poseurs</SectionTitle>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3.5">
                {INIT_POSEURS.map(p => {
                  const myInter = interventions.filter(i => i.poseur === p.name);
                  return (
                    <div key={p.id} className="bg-white rounded-2xl p-5 border-l-3" style={{ borderLeftColor: p.color }}>
                      <div className="font-bold text-gray-900 text-base">{p.name}</div>
                      <div className="text-xs text-gray-500 mb-2">{p.spe} · {myInter.length} interventions</div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-pink-100 text-pink-600">POSEUR</span>
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
            const SortIcon = ({ field }) => { if (jSortField !== field) return <span className="opacity-30 text-[9px]">⇅</span>; return <span className="text-primary-600 text-[9px]">{jSortDir === "asc" ? "▲" : "▼"}</span>; };

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

            return (
              <div>
                {/* Header with actions */}
                <div className="flex justify-between items-center mb-4 flex-wrap gap-2.5">
                  <h2 className="m-0 text-lg font-bold text-gray-900">💰 Journal de compte</h2>
                  <div className="flex gap-2">
                    <button onClick={() => setJShowStats(!jShowStats)} className={`${jShowStats ? "bg-primary-100 border-primary-200 text-primary-600" : "bg-gray-100 border-gray-200 text-gray-600"} border rounded-lg px-3.5 py-1.5 cursor-pointer text-xs font-semibold transition-colors`}>📊 Stats</button>
                    <button onClick={exportCSV} className="bg-success-50 border border-success-200 text-success-600 rounded-lg px-3.5 py-1.5 cursor-pointer text-xs font-semibold hover:bg-success-100">📥 CSV</button>
                    <button onClick={exportPDF} className="bg-danger-50 border border-danger-200 text-danger-600 rounded-lg px-3.5 py-1.5 cursor-pointer text-xs font-semibold hover:bg-danger-100">📄 PDF</button>
                  </div>
                </div>

                {/* Filters */}
                <Card className="p-4 mb-3.5">
                  <div className="aurenis-filter-row">
                    <div className="flex-[1_1_180px]"><label className="text-xs text-gray-500 font-bold uppercase tracking-wide block mb-1">🔍 Recherche</label><input type="text" placeholder="Réf, client, tech, adresse..." value={jSearch} onChange={e => setJSearch(e.target.value)} className="input" /></div>
                    <div className="flex-[0_0_135px]"><label className="text-xs text-gray-500 font-bold uppercase tracking-wide block mb-1">📅 Du</label><input type="date" value={jDateFrom} onChange={e => { setJDateFrom(e.target.value); setJQuickPeriod(""); }} className="input" /></div>
                    <div className="flex-[0_0_135px]"><label className="text-xs text-gray-500 font-bold uppercase tracking-wide block mb-1">📅 Au</label><input type="date" value={jDateTo} onChange={e => { setJDateTo(e.target.value); setJQuickPeriod(""); }} className="input" /></div>
                    <div className="flex-[0_0_140px]"><label className="text-xs text-gray-500 font-bold uppercase tracking-wide block mb-1">👨‍🔧 Technicien</label><select value={jTechFilter} onChange={e => setJTechFilter(e.target.value)} className="input"><option value="">Tous</option>{techNames.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                    <div className="flex-[0_0_130px]"><label className="text-xs text-gray-500 font-bold uppercase tracking-wide block mb-1">🔧 Type</label><select value={jTypeFilter} onChange={e => setJTypeFilter(e.target.value)} className="input"><option value="">Tous</option>{typeNames.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                    <div className="flex-[0_0_140px]"><label className="text-xs text-gray-500 font-bold uppercase tracking-wide block mb-1">👷 Poseur</label><select value={jPoseurFilter} onChange={e => setJPoseurFilter(e.target.value)} className="input"><option value="">Tous</option><option value="__all__">Avec poseur</option>{poseurNames.map(p => <option key={p} value={p}>{p}</option>)}</select></div>
                    {hasFilters && <div className="flex-[0_0_auto]"><label className="text-xs text-transparent font-bold uppercase tracking-wide block mb-1">&nbsp;</label><button onClick={resetFilters} className="bg-gray-100 border border-gray-200 text-gray-600 rounded-lg px-3 py-2 cursor-pointer text-xs hover:bg-gray-200">✕ Reset</button></div>}
                  </div>
                  <div className="flex gap-1.5 mt-2.5 flex-wrap">
                    {[{ key: "today", label: "Aujourd'hui" }, { key: "yesterday", label: "Hier" }, { key: "week", label: "7 jours" }, { key: "month", label: "Ce mois" }, { key: "lastmonth", label: "Mois dernier" }, { key: "", label: "Tout" }].map(p => (
                      <button key={p.key} onClick={() => applyQuickPeriod(p.key)} className={`${jQuickPeriod === p.key ? "bg-primary-100 border-primary-200 text-primary-600" : "bg-gray-50 border-gray-200 text-gray-600"} border rounded-full px-3 py-1 cursor-pointer text-xs font-semibold hover:bg-gray-100`}>{p.label}</button>
                    ))}
                  </div>
                </Card>

                {/* Stats */}
                {jShowStats && (
                  <div className="mb-3.5">
                    <div className="flex gap-2.5 flex-wrap mb-2.5">
                      {[
                        { label: "Interventions", value: jStats.count, color: "#06B6D4", icon: "📋" },
                        { label: "CA Total", value: `${fmt(jStats.total)} €`, color: "#06D6A0", icon: "💰" },
                        { label: "Commissions", value: `-${fmt(jStats.totalC)} €`, color: "#EF4444", icon: "💸" },
                        { label: "Poseurs", value: `-${fmt(jStats.totalP)} €`, color: "#EC4899", icon: "👷" },
                        { label: "Net Patron", value: `${fmt(jStats.net)} €`, color: "#06B6D4", icon: "🏢" },
                        { label: "Moy / inter", value: `${fmt(jStats.avg)} €`, color: "#818CF8", icon: "📈" },
                      ].map((s, i) => <KPI key={i} label={s.label} value={s.value} color={s.color} icon={s.icon} />)}
                    </div>
                    <div className="aurenis-stats-grid">
                      <Card className="p-3.5">
                        <div className="text-xs text-gray-500 font-bold uppercase tracking-wide mb-2.5">👨‍🔧 Par technicien</div>
                        {Object.entries(jStats.byTech).map(([name, d]) => (
                          <div key={name} className="flex justify-between items-center py-1.5 border-b border-gray-100">
                            <div><span className="font-semibold text-sm text-gray-900">{name}</span><span className="text-gray-500 text-xs ml-2">{d.count} inter</span></div>
                            <div className="flex gap-3.5 text-xs"><span className="text-success-600">{fmt(d.ca)} €</span><span className="text-primary-600 font-bold">{fmt(d.net)} € net</span></div>
                          </div>
                        ))}
                      </Card>
                      <Card className="p-3.5">
                        <div className="text-xs text-gray-500 font-bold uppercase tracking-wide mb-2.5">🔧 Par type</div>
                        {Object.entries(jStats.byType).map(([type, d]) => {
                          const tc = type === "Plomberie" ? "#06B6D4" : type === "Serrurerie" ? "#8B5CF6" : "#F59E0B";
                          const pct = jStats.total > 0 ? (d.ca / jStats.total * 100) : 0;
                          return (<div key={type} className="mb-2.5">
                            <div className="flex justify-between mb-1"><span className="font-semibold text-sm" style={{ color: tc }}>{type}</span><span className="text-xs text-gray-500">{d.count} inter · {fmt(d.ca)} € ({pct.toFixed(0)}%)</span></div>
                            <div className="bg-gray-100 rounded h-1.5 overflow-hidden"><div className="h-full rounded" style={{ width: `${pct}%`, background: tc }} /></div>
                          </div>);
                        })}
                      </Card>
                    </div>
                  </div>
                )}

                {/* Table */}
                <Card className="p-0 overflow-hidden">
                  {/* Table header */}
                  <div className="aurenis-journal-grid aurenis-journal-head border-b border-gray-200 text-xs text-gray-600 uppercase tracking-wide font-bold">
                    <div onClick={() => toggleSort("ref")} className="cursor-pointer">Réf <SortIcon field="ref" /></div>
                    <div onClick={() => toggleSort("date")} className="cursor-pointer">Date <SortIcon field="date" /></div>
                    <div>Client / Tech</div>
                    <div>Type</div>
                    <div onClick={() => toggleSort("ttc")} className="cursor-pointer text-right">TTC <SortIcon field="ttc" /></div>
                    <div className="text-right">Comm.</div>
                    <div className="text-right">Poseur</div>
                    <div onClick={() => toggleSort("net")} className="cursor-pointer text-right">Net <SortIcon field="net" /></div>
                  </div>

                  {jFiltered.length === 0 && <div className="p-10 text-center"><div className="text-4xl opacity-30 mb-2">🔍</div><div className="text-sm text-gray-600">Aucune intervention trouvée</div></div>}

                  {jFiltered.map((inter, idx) => {
                    const comm = calcCommission(inter);
                    const net = calcNetPatron(inter);
                    const isExpanded = jExpandedRow === inter.ref;
                    return (
                      <div key={inter.ref}>
                        <div onClick={() => setJExpandedRow(isExpanded ? null : inter.ref)} className={`aurenis-journal-grid border-b border-gray-100 cursor-pointer transition-colors ${isExpanded ? "bg-primary-50" : idx % 2 ? "bg-gray-50/50" : "bg-white"} hover:bg-primary-50/50`}>
                          <span className="font-bold text-primary-600 text-xs">{inter.ref}</span>
                          <span className="text-gray-500 text-xs">{inter.date}</span>
                          <div>
                            <span className="font-semibold text-gray-900 text-sm">{inter.clientNom} {inter.clientPrenom}</span>
                            <span className="text-gray-500 text-xs ml-1.5">({inter.tech})</span>
                          </div>
                          <div><TypeBadge type={inter.type} /></div>
                          <div className="text-right font-bold text-success-600">{fmt(inter.ttc)} €</div>
                          <div className="text-right text-danger-600 text-xs">-{fmt(comm)} €</div>
                          <div className={`text-right text-xs ${inter.poseurCost > 0 ? "text-pink-600" : "text-gray-300"}`}>
                            {inter.poseurCost > 0 ? <>👷 -{fmt(inter.poseurCost)} €</> : "—"}
                          </div>
                          <div className="text-right font-bold text-primary-600">{fmt(net)} €</div>
                        </div>
                        {isExpanded && (
                          <div className="px-3.5 py-2.5 bg-primary-50 border-b border-primary-100 text-xs flex flex-wrap gap-3.5">
                            <div><div className="text-gray-500 text-[10px] uppercase mb-0.5">📞 Téléphone</div><div className="text-gray-900">{inter.tel}</div></div>
                            <div><div className="text-gray-500 text-[10px] uppercase mb-0.5">📍 Adresse</div><div className="text-gray-900">{inter.adresse}</div></div>
                            <div><div className="text-gray-500 text-[10px] uppercase mb-0.5">⚡ Mode</div><div><ModeBadge mode={inter.mode} /></div></div>
                            {inter.poseur && <div><div className="text-gray-500 text-[10px] uppercase mb-0.5">👷 Poseur</div><div className="text-pink-600 font-semibold">{inter.poseur} · {fmt(inter.poseurCost)} € · {inter.poseurMode === "divise2" ? "÷2" : "Gratuit"}</div></div>}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Total row */}
                  {jFiltered.length > 0 && (
                    <div className="aurenis-journal-grid border-t-2 border-primary-200 font-bold bg-primary-50">
                      <div className="text-primary-600 col-span-4">TOTAL — {jStats.count} intervention{jStats.count > 1 ? "s" : ""}</div>
                      <div className="text-right text-success-600">{fmt(jStats.total)} €</div>
                      <div className="text-right text-danger-600">-{fmt(jStats.totalC)} €</div>
                      <div className="text-right text-pink-600">{jStats.totalP > 0 ? `-${fmt(jStats.totalP)} €` : "—"}</div>
                      <div className="text-right text-primary-600 font-bold">{fmt(jStats.net)} €</div>
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
            <Card className="mb-5">
              <SectionTitle right={<span className="text-[11px] text-primary-600 bg-primary-100 px-3 py-1 rounded-lg font-bold">CONFIGURATION</span>}>Paramètres du système</SectionTitle>

              <ConfigList
                items={specialties}
                onAdd={item => { if (!specialties.includes(item)) setSpecialties(prev => [...prev, item]); }}
                onRemove={item => { if (specialties.length > 1) setSpecialties(prev => prev.filter(s => s !== item)); }}
                label="Spécialités / Types"
                icon="🔧"
                color="#0EA5E9"
              />

              <div className="border-t border-gray-200 pt-5 mt-2.5" />

              <ConfigList
                items={statuts}
                onAdd={item => { if (!statuts.includes(item)) setStatuts(prev => [...prev, item]); }}
                onRemove={item => { if (statuts.length > 1 && item !== "Validée") setStatuts(prev => prev.filter(s => s !== item)); }}
                label="Statuts d'intervention"
                icon="📌"
                color="#06D6A0"
              />

              <div className="bg-blue-50 rounded-xl p-3.5 border border-blue-200 mt-2.5">
                <div className="text-xs text-gray-600 leading-relaxed">
                  <strong className="text-blue-500">ℹ️ Info :</strong> Le statut <strong className="text-success-600">Validée</strong> est obligatoire car il déclenche le calcul définitif des commissions. Les autres statuts peuvent être personnalisés librement. Les spécialités ajoutées seront disponibles dans le formulaire de modification des interventions.
                </div>
              </div>
            </Card>

            <Card>
              <SectionTitle>📍 Autocomplétion d'adresse</SectionTitle>
              <div className="flex items-center gap-3 bg-success-50 rounded-xl p-4 border border-success-200 mb-3">
                <span className="text-[28px]">🌍</span>
                <div>
                  <div className="text-sm font-bold text-success-600 mb-0.5">Google Places API + Base Adresse Nationale</div>
                  <div className="text-xs text-gray-600">L'autocomplétion utilise Google Places API en priorité, avec fallback sur l'API gouv.fr (BAN). Toutes les adresses de France sont couvertes.</div>
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
          const lbl = "text-xs text-gray-500 block mb-1 font-semibold";
          return (
            <div className="flex flex-col gap-4">
              {/* REF Header */}
              <div className="flex items-center gap-2.5">
                <span className="font-bold text-primary-600 text-base">{inter.ref}</span>
                <Badge status={inter.statut} />
              </div>

              {/* ROW: Date + Heure */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className={lbl}>📅 Date</label>
                  <input type="date" value={inter.date} onChange={e => updateIntervention(inter.ref, { date: e.target.value })} className="input" />
                </div>
                <div className="flex-1">
                  <label className={lbl}>🕐 Heure</label>
                  <input type="time" value={inter.heure} onChange={e => updateIntervention(inter.ref, { heure: e.target.value })} className="input" />
                </div>
              </div>

              {/* ROW: Statut + Type */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className={lbl}>📌 Statut</label>
                  <select value={inter.statut} onChange={e => updateIntervention(inter.ref, { statut: e.target.value })} className="input">
                    {statuts.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="flex-1">
                  <label className={lbl}>🔧 Spécialité</label>
                  <select value={inter.type} onChange={e => updateIntervention(inter.ref, { type: e.target.value })} className="input">
                    {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* ROW: Mode + TTC */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className={lbl}>⚡ Mode</label>
                  <select value={inter.mode} onChange={e => updateIntervention(inter.ref, { mode: e.target.value })} className="input">
                    <option value="Urgence">⚡ Urgence</option>
                    <option value="RDV">📅 RDV</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className={lbl}>💰 Montant TTC (€)</label>
                  <Inp placeholder="Montant" type="number" value={inter.ttc || ""} onChange={e => updateIntervention(inter.ref, { ttc: parseFloat(e.target.value) || 0 })} />
                </div>
              </div>

              {/* Technicien attribué */}
              <div>
                <label className={lbl}>👨‍🔧 Technicien attribué</label>
                <select value={inter.tech} onChange={e => {
                  const newTech = techs.find(t => t.name === e.target.value);
                  updateIntervention(inter.ref, { tech: e.target.value, commRate: newTech ? newTech.commission : inter.commRate });
                }} className="input">
                  {techs.map(t => <option key={t.id} value={t.name}>{t.name} ({t.spe} · {(t.commission * 100)}%)</option>)}
                </select>
              </div>

              {/* Client info */}
              <div className="bg-gray-50 rounded-xl p-3.5">
                <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-2.5">👤 Client</div>
                <div className="flex gap-3">
                  <div className="flex-1"><label className={lbl}>Nom</label><Inp placeholder="Nom" value={inter.clientNom} onChange={e => updateIntervention(inter.ref, { clientNom: e.target.value })} /></div>
                  <div className="flex-1"><label className={lbl}>Prénom</label><Inp placeholder="Prénom" value={inter.clientPrenom} onChange={e => updateIntervention(inter.ref, { clientPrenom: e.target.value })} /></div>
                </div>
                <div className="mt-2.5"><label className={lbl}>Adresse</label><AddressAutocomplete value={inter.adresse} onChange={v => updateIntervention(inter.ref, { adresse: v })} /></div>
                <div className="mt-2.5"><label className={lbl}>Téléphone</label><Inp placeholder="Tél" value={inter.tel} onChange={e => updateIntervention(inter.ref, { tel: e.target.value })} /></div>
              </div>

              {/* Poseur section */}
              <div className="bg-pink-50 rounded-xl p-3.5 border border-pink-200">
                <div className="text-[11px] text-pink-600 font-bold uppercase tracking-wider mb-2.5">👷 Poseur</div>
                <select value={inter.poseur || ""} onChange={e => updateIntervention(inter.ref, { poseur: e.target.value || null, poseurCost: e.target.value ? inter.poseurCost : 0, poseurMode: e.target.value ? (inter.poseurMode || "divise2") : null })} className="input">
                  <option value="">Aucun poseur</option>
                  {INIT_POSEURS.map(p => <option key={p.id} value={p.name}>{p.name} ({p.spe})</option>)}
                </select>
                {inter.poseur && (
                  <div className="mt-3 flex flex-col gap-2.5">
                    <div><label className={lbl}>Coût poseur (€)</label><Inp placeholder="Coût" type="number" value={inter.poseurCost || ""} onChange={e => updateIntervention(inter.ref, { poseurCost: parseFloat(e.target.value) || 0 })} /></div>
                    <div>
                      <label className={lbl}>Mode poseur</label>
                      <div className="flex gap-2.5">
                        {[{ v: "divise2", l: "÷ 2 (partagé)" }, { v: "gratuit", l: "Gratuit (patron)" }].map(o => (
                          <button key={o.v} onClick={() => updateIntervention(inter.ref, { poseurMode: o.v })} className={`flex-1 px-3.5 py-2.5 rounded-lg text-xs font-semibold cursor-pointer ${inter.poseurMode === o.v ? "border-2 border-primary-600 bg-primary-50 text-primary-600" : "border border-gray-200 bg-white text-gray-500"}`}>{o.l}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* APERÇU CALCUL */}
              {inter.ttc > 0 && (
                <div className="bg-primary-50 rounded-xl p-3.5 border border-primary-200">
                  <div className="text-[11px] text-primary-600 mb-2.5 font-bold uppercase tracking-wider">📊 Aperçu financier</div>
                  <div className="flex justify-between text-[13px] text-gray-600 mb-1"><span>Montant TTC</span><span className="font-bold text-gray-900">{inter.ttc.toLocaleString("fr-FR")} €</span></div>
                  <div className="flex justify-between text-[13px] text-gray-600 mb-1"><span>Commission brute ({(inter.commRate * 100)}%)</span><span>{(inter.ttc * inter.commRate).toLocaleString("fr-FR")} €</span></div>
                  {inter.poseur && inter.poseurMode === "divise2" && <div className="flex justify-between text-[13px] text-red-600 mb-1"><span>Part poseur déduite tech (÷2)</span><span>-{(inter.poseurCost / 2).toLocaleString("fr-FR")} €</span></div>}
                  <div className="flex justify-between text-[13px] text-success-600 font-bold border-t border-gray-200 pt-1.5 mt-1"><span>Commission nette tech</span><span>{calcCommission(inter).toLocaleString("fr-FR")} €</span></div>
                  {inter.poseur && <div className="flex justify-between text-[13px] text-pink-600 mt-1"><span>Coût poseur total</span><span>-{inter.poseurCost.toLocaleString("fr-FR")} €</span></div>}
                  <div className="flex justify-between text-sm text-primary-600 font-bold border-t border-gray-200 pt-1.5 mt-1.5"><span>Net patron</span><span>{calcNetPatron(inter).toLocaleString("fr-FR")} €</span></div>
                </div>
              )}

              {/* POSEUR DETAILS */}
              {inter.poseur && (inter.poseurPrixPose > 0 || inter.poseurAchats > 0) && (
                <div className="bg-pink-50 rounded-xl p-3.5 border border-pink-200">
                  <div className="text-[11px] text-pink-600 mb-2 font-bold uppercase tracking-wider">👷 Détails poseur — {inter.poseur}</div>
                  <div className="flex justify-between text-[13px] text-gray-600 mb-1"><span>Prix de pose déclaré</span><span className="font-bold text-pink-600">{(inter.poseurPrixPose || 0).toLocaleString("fr-FR")} €</span></div>
                  {inter.poseurAchats > 0 && <div className="flex justify-between text-[13px] text-gray-600 mb-1"><span>Achats avancés</span><span className="font-bold text-orange-600">{inter.poseurAchats.toLocaleString("fr-FR")} €</span></div>}
                  {inter.poseurNote && <div className="text-xs text-gray-600 mt-1.5 italic bg-gray-50 p-2 rounded-lg">📝 {inter.poseurNote}</div>}
                </div>
              )}

              {/* MEDIAS TECH */}
              {(inter.techMedias || []).length > 0 && (
                <div>
                  <div className="text-[11px] text-primary-600 font-bold uppercase tracking-wider mb-2">📸 Photos/vidéos technicien ({(inter.techMedias || []).length})</div>
                  <div className="flex gap-1.5 flex-wrap">
                    {(inter.techMedias || []).map((m, i) => (
                      <div key={i} className="relative w-[70px] h-[70px] rounded-lg overflow-hidden border border-gray-200 cursor-pointer" onClick={() => setViewMedia(m)}>
                        {m.type === "video" ? <video src={m.url} className="w-full h-full object-cover" /> : <img src={m.url} alt="" className="w-full h-full object-cover" />}
                        {m.type === "video" && <div className="absolute inset-0 flex items-center justify-center text-xl drop-shadow-md">▶️</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MEDIAS POSEUR */}
              {(inter.poseurMedias || []).length > 0 && (
                <div>
                  <div className="text-[11px] text-pink-600 font-bold uppercase tracking-wider mb-2">📸 Photos/vidéos poseur ({(inter.poseurMedias || []).length})</div>
                  <div className="flex gap-1.5 flex-wrap">
                    {(inter.poseurMedias || []).map((m, i) => (
                      <div key={i} className="relative w-[70px] h-[70px] rounded-lg overflow-hidden border border-pink-200 cursor-pointer" onClick={() => setViewMedia(m)}>
                        {m.type === "video" ? <video src={m.url} className="w-full h-full object-cover" /> : <img src={m.url} alt="" className="w-full h-full object-cover" />}
                        {m.type === "video" && <div className="absolute inset-0 flex items-center justify-center text-xl drop-shadow-md">▶️</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 mt-1 flex-wrap">
                <button className="wa-btn px-3.5 py-2.5 text-xs flex-1"><WaIcon size={14} /> Client</button>
                {(() => { const t = techs.find(tc => tc.name === inter.tech); return t ? <button className="wa-btn px-3.5 py-2.5 text-xs flex-1" onClick={() => sendWhatsApp(t.tel, waMessageTech(inter, t.name))}><WaIcon size={14} /> Tech</button> : null; })()}
                <Btn onClick={() => setEditModal(null)} variant="ghost" className="flex-1">Fermer</Btn>
                {inter.statut === "Terminée" && <Btn onClick={() => { validerIntervention(inter.ref); setEditModal(null); }} className="flex-1">✅ Valider</Btn>}
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
            <div className="flex flex-col gap-3.5">
              <div className="text-sm text-gray-900 font-semibold">{tech?.name}</div>
              <div className="text-[13px] text-gray-500">Taux actuel : <strong className="text-primary-600">{(tech?.commission * 100)}%</strong></div>
              <div><label className="text-xs text-gray-500 block mb-1">Nouveau taux (%)</label><Inp placeholder="Ex: 25" type="number" value={newRate} onChange={e => setNewRate(e.target.value)} /></div>
              <div className="bg-blue-50 rounded-lg px-3.5 py-2.5 text-xs text-gray-600 leading-relaxed">⚠️ Le nouveau taux s'appliquera uniquement aux <strong>futures interventions</strong>. Les interventions passées gardent leur taux d'origine.</div>
              <div className="flex gap-2.5">
                <Btn onClick={() => setCommModal(null)} variant="ghost" className="flex-1">Annuler</Btn>
                <Btn onClick={() => changeTechRate(commModal)} className="flex-1">Appliquer {newRate}%</Btn>
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
            <div className="flex flex-col gap-3.5">
              <div className="text-sm text-gray-900 font-semibold">{tech?.name}</div>
              <div className="text-[13px] text-gray-500">Numéro actuel : <strong className="text-primary-600">{tech?.tel}</strong></div>
              <div><label className="text-xs text-gray-500 block mb-1">Nouveau numéro</label><Inp icon="📞" placeholder="+33 6 12 34 56 78" value={newTel} onChange={e => setNewTel(e.target.value)} onKeyDown={e => e.key === "Enter" && changeTechTel(telModal)} /></div>
              <div className="flex gap-2.5">
                <Btn onClick={() => setTelModal(null)} variant="ghost" className="flex-1">Annuler</Btn>
                <Btn onClick={() => changeTechTel(telModal)} className="flex-1">✅ Enregistrer</Btn>
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

  const saveTTC = (ref) => {
    const val = parseFloat(editTTC);
    if (!isNaN(val) && val >= 0) {
      setInterventions(prev => prev.map(i => i.ref === ref ? { ...i, ttc: val } : i));
      if (val > 0) playKaching();
    }
    setEditRef(null); setEditTTC("");
  };

  const getTypeColor = (type) => type === "Plomberie" ? "#06B6D4" : type === "Serrurerie" ? "#8B5CF6" : "#F59E0B";

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header account={account} onLogout={onLogout} />
      <div className="max-w-[1000px] mx-auto px-4 py-6">
        <div className="flex justify-between items-end mb-6 flex-wrap gap-3">
          <div><h1 className="m-0 mb-1 text-2xl font-bold text-gray-900">Bonjour {tech?.name.split(" ")[0]} 👋</h1><p className="m-0 text-sm text-gray-500">Votre activité</p></div>
          <div className="text-right"><div className="text-xl font-bold gradient-text">{time.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</div></div>
        </div>

        <div className="aurenis-kpis">
          <KPI label="Interventions" value={myInter.length} color="#06B6D4" icon="📋" />
          <KPI label="Validées" value={validees.length} color="#06D6A0" icon="✅" />
          <KPI label="Mon CA" value={`${totalCA.toLocaleString("fr-FR")} €`} color="#10B981" icon="💰" />
          <KPI label="Mes commissions" value={`${totalComm.toLocaleString("fr-FR")} €`} color="#EF4444" icon="💸" />
          <KPI label="Mon taux" value={`${(tech?.commission * 100)}%`} color={tech?.color} icon="📊" />
        </div>

        {/* FILTERS */}
        <Card className="p-4 mb-4">
          <div className="flex gap-3 items-center flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-sm opacity-40 pointer-events-none">🔍</div>
              <input type="text" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} className="w-full py-2.5 px-3.5 pl-10 text-sm bg-white border border-gray-300 rounded-xl text-gray-900 outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl ${showFilters ? "bg-primary-100 border-primary-200 text-primary-600" : "bg-gray-100 border-gray-200 text-gray-600"} border cursor-pointer text-sm font-semibold transition-colors`}>⚙️ Filtres {activeFilters > 0 && <span className="bg-primary-600 text-white w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold">{activeFilters}</span>}</button>
            {activeFilters > 0 && <button onClick={() => { setSearch(""); setFilterType("all"); setDateFrom(""); setDateTo(""); }} className="px-3.5 py-2.5 rounded-xl border border-danger-200 bg-danger-50 text-danger-600 cursor-pointer text-xs font-semibold hover:bg-danger-100">✕ Effacer</button>}
          </div>
          {showFilters && (
            <div className="mt-3.5 pt-3.5 border-t border-gray-200 flex flex-col gap-3.5">
              <div>
                <div className="text-xs text-gray-500 font-bold uppercase tracking-wide mb-2">🔧 Spécialité</div>
                <div className="flex gap-2 flex-wrap">
                  <button onClick={() => setFilterType("all")} className={`px-4 py-1.5 rounded-full border-none cursor-pointer text-xs font-bold ${filterType === "all" ? "bg-primary-100 text-primary-600" : "bg-gray-100 text-gray-600"}`}>Toutes</button>
                  {types.map(t => <button key={t} onClick={() => setFilterType(filterType === t ? "all" : t)} className={`px-4 py-1.5 rounded-full border-none cursor-pointer text-xs font-bold flex items-center gap-1.5`} style={{ background: filterType === t ? `${getTypeColor(t)}33` : "#F3F4F6", color: filterType === t ? getTypeColor(t) : "#6B7280" }}><span className="w-2 h-2 rounded" style={{ background: getTypeColor(t), opacity: filterType === t ? 1 : 0.4 }} />{t}</button>)}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-bold uppercase tracking-wide mb-2">📅 Période</div>
                <div className="flex gap-3 items-center flex-wrap">
                  <div className="flex items-center gap-1.5"><span className="text-xs text-gray-500">Du</span><input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="input" /></div>
                  <div className="flex items-center gap-1.5"><span className="text-xs text-gray-500">Au</span><input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="input" /></div>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* STATUS TABS */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-3.5 border border-gray-200 flex-wrap">
          {[{ id: "all", l: "Toutes" }, { id: "validees", l: "Validées" }, { id: "terminees", l: "En attente" }, { id: "encours", l: "En cours" }, { id: "planifiees", l: "Planifiées" }].map(t => (
            <button key={t.id} onClick={() => setStatusTab(t.id)} className={`flex-1 px-3.5 py-2 border-none rounded-lg cursor-pointer text-xs font-semibold min-w-[80px] ${statusTab === t.id ? "bg-white text-gray-900 shadow-sm" : "bg-transparent text-gray-600"}`}>{t.l}</button>
          ))}
        </div>

        {/* LIST */}
        <Card className="p-0 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center"><div className="text-4xl opacity-30 mb-2">🔍</div><div className="text-sm text-gray-600">Aucune intervention</div></div>
          ) : filtered.map((inter, idx) => {
            const commBrute = inter.ttc * inter.commRate;
            const commNette = calcCommission(inter);
            const isEditing = editRef === inter.ref;
            const canEdit = inter.statut !== "Validée";
            return (
              <div key={inter.ref} className={`px-3.5 py-3.5 border-b border-gray-100 ${idx % 2 ? "bg-gray-50/50" : "bg-white"}`}>
                {/* Row 1: main info */}
                <div className={`flex justify-between items-start flex-wrap gap-2 ${inter.poseur ? "mb-2.5" : ""}`}>
                  <div className="flex items-center gap-1.5 flex-wrap flex-1 min-w-0">
                    <span className="font-bold text-primary-600 text-sm">{inter.ref}</span>
                    <span className="text-gray-600 text-xs">{inter.date} {inter.heure}</span>
                    <TypeBadge type={inter.type} />
                    <ModeBadge mode={inter.mode} />
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge status={inter.statut} />
                    {isEditing ? (
                      <div className="flex items-center gap-1.5">
                        <input type="number" inputMode="decimal" value={editTTC} onChange={e => setEditTTC(e.target.value)} onKeyDown={e => e.key === "Enter" && saveTTC(inter.ref)} className="w-[90px] px-2.5 py-2 text-base font-bold bg-white border border-primary-500 rounded-lg text-success-600 outline-none text-right focus:ring-2 focus:ring-primary-500" autoFocus />
                        <span className="text-gray-500 text-sm">€</span>
                        <Btn onClick={() => saveTTC(inter.ref)} className="btn-sm !min-h-9">✓</Btn>
                        <button onClick={() => { setEditRef(null); setEditTTC(""); }} className="bg-transparent border-none cursor-pointer text-base text-gray-500 p-1.5 min-w-[30px] min-h-[30px] hover:text-gray-700">✕</button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <span className={`font-bold text-base ${inter.ttc > 0 ? "text-success-600" : "text-gray-300"}`}>{inter.ttc > 0 ? `${inter.ttc} €` : "—"}</span>
                        {canEdit && <button onClick={() => { setEditRef(inter.ref); setEditTTC(String(inter.ttc || "")); }} className="bg-gray-100 border-none rounded-lg px-2.5 py-1.5 cursor-pointer text-sm text-gray-600 min-w-9 min-h-9 flex items-center justify-center hover:bg-gray-200">✏️</button>}
                        {inter.statut === "Validée" && <span className="text-xs text-success-600">🔒</span>}
                      </div>
                    )}
                  </div>
                </div>
                {/* Client info line */}
                <div className="text-xs text-gray-500 mt-1 mb-1 flex flex-wrap gap-1">
                  <span>👤 {inter.clientNom} {inter.clientPrenom}</span>
                  <span className="text-gray-300">·</span>
                  <span className="text-xs">{inter.adresse}</span>
                </div>

                {/* Row 2: commission breakdown if poseur */}
                {inter.poseur && inter.ttc > 0 && (
                  <div className="bg-pink-50 rounded-lg px-3.5 py-2.5 border border-pink-100">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs text-pink-600 font-bold">👷 Poseur : {inter.poseur} ({inter.poseurCost} €)</span>
                      <span className={`text-xs px-2 py-0.5 rounded-md font-semibold ${inter.poseurMode === "divise2" ? "bg-warning-100 text-warning-600" : "bg-success-100 text-success-600"}`}>
                        {inter.poseurMode === "divise2" ? "÷ 2" : "Gratuit"}
                      </span>
                    </div>
                    <div className="flex gap-5 flex-wrap text-sm">
                      <span className="text-gray-600">Commission brute ({(inter.commRate * 100)}%) : <strong className="text-gray-900">{commBrute.toLocaleString("fr-FR")} €</strong></span>
                      {inter.poseurMode === "divise2" && <span className="text-danger-600">Part poseur : <strong>-{(inter.poseurCost / 2).toLocaleString("fr-FR")} €</strong></span>}
                      <span className="text-success-600 font-bold">Commission nette : <strong>{commNette.toLocaleString("fr-FR")} €</strong></span>
                    </div>
                  </div>
                )}
                {/* Simple commission display if no poseur */}
                {!inter.poseur && inter.ttc > 0 && inter.statut === "Validée" && (
                  <div className="mt-1.5 text-xs text-success-600">💰 Commission ({(inter.commRate * 100)}%) : <strong>{commNette.toLocaleString("fr-FR")} €</strong></div>
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
            <div className="px-5 py-3.5 bg-primary-50 border-t border-primary-200 flex justify-between items-center flex-wrap gap-3">
              <span className="font-bold text-primary-600 text-[13px]">TOTAL VALIDÉ</span>
              <div className="flex gap-5">
                <span><span className="text-[11px] text-gray-500">CA </span><span className="font-bold text-success-600 text-[15px]">{filtered.filter(i => i.statut === "Validée").reduce((s, i) => s + i.ttc, 0).toLocaleString("fr-FR")} €</span></span>
                <span><span className="text-[11px] text-gray-500">Commission </span><span className="font-bold text-primary-600 text-[15px]">{filtered.filter(i => i.statut === "Validée").reduce((s, i) => s + calcCommission(i), 0).toLocaleString("fr-FR")} €</span></span>
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

  return (
    <div className="font-body bg-gray-50 min-h-screen">
      <Header account={account} onLogout={onLogout} />
      <div className="max-w-[900px] mx-auto px-4 py-6">
        <div className="mb-6"><h1 className="m-0 mb-1 text-2xl font-bold text-gray-900">Bonjour {poseur?.name.split(" ")[0]} 👋</h1><p className="m-0 text-[13px] text-gray-500">Vos interventions en tant que poseur</p></div>

        <div className="aurenis-kpis">
          <KPI label="Mes poses" value={myInter.length} color="#EC4899" icon="👷" />
          <KPI label="Validées" value={validees.length} color="#06D6A0" icon="✅" />
          <KPI label="Total poses" value={`${totalPose.toLocaleString("fr-FR")} €`} color="#EC4899" icon="💰" />
          <KPI label="Total achats avancés" value={`${totalAchats.toLocaleString("fr-FR")} €`} color="#F97316" icon="🧾" />
        </div>

        {viewMedia && <MediaLightbox media={viewMedia} onClose={() => setViewMedia(null)} />}
        <Card className="p-0 overflow-hidden">
          {myInter.length === 0 ? (
            <div className="p-12 text-center"><div className="text-[40px] opacity-30 mb-2">👷</div><div className="text-sm text-gray-600">Aucune intervention assignée</div></div>
          ) : myInter.map((inter, idx) => {
            const isExpanded = expandedRef === inter.ref;
            const isLocked = inter.statut === "Validée";
            return (
              <div key={inter.ref} className={`border-b border-gray-100 ${idx % 2 ? "bg-gray-50" : "bg-white"}`}>
                {/* Header row — click to expand */}
                <div onClick={() => setExpandedRef(isExpanded ? null : inter.ref)} className="px-3.5 py-3.5 cursor-pointer transition-colors hover:bg-primary-50">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-bold text-pink-600 text-[13px]">{inter.ref}</span>
                      <span className="text-gray-600 text-xs">{inter.date} {inter.heure}</span>
                      <TypeBadge type={inter.type} />
                      <ModeBadge mode={inter.mode} />
                      <span className={`text-xs ${isExpanded ? "text-primary-600" : "text-gray-400"}`}>{isExpanded ? "▾" : "▸"}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Badge status={inter.statut} />
                      <span className="font-bold text-pink-600 text-[15px]">{(inter.poseurPrixPose || inter.poseurCost || 0)} €</span>
                      {(inter.poseurMedias || []).length > 0 && <span className="text-[11px] text-success-600">📸 {(inter.poseurMedias || []).length}</span>}
                    </div>
                  </div>
                  <div className="mt-1.5 text-xs text-gray-500 flex flex-wrap gap-1">
                    <span>Dépanneur : <strong className="text-gray-900">{inter.tech}</strong></span>
                    <span className="mx-1.5">·</span>
                    <span>Client : {inter.clientNom} {inter.clientPrenom}</span>
                    <span className="mx-1.5">·</span>
                    <span>{inter.adresse}</span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className={`text-[11px] px-2.5 py-0.5 rounded-md font-semibold ${inter.poseurMode === "divise2" ? "bg-yellow-100 text-yellow-600" : "bg-success-100 text-success-600"}`}>
                      {inter.poseurMode === "divise2" ? "Mode ÷ 2 (partagé)" : "Mode gratuit"}
                    </span>
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="px-3.5 pb-4 border-t border-primary-100">
                    {/* Vidéo/photos du technicien */}
                    {(inter.techMedias || []).length > 0 && (
                      <div className="bg-primary-50 rounded-xl p-3.5 mt-3.5 border border-primary-200">
                        <div className="text-[11px] text-primary-600 font-bold uppercase tracking-wider mb-2.5">🎬 Médias du technicien — À faire</div>
                        <div className="flex gap-2 flex-wrap">
                          {(inter.techMedias || []).map((m, i) => (
                            <div key={i} className="relative w-[110px] h-[110px] rounded-lg overflow-hidden border border-primary-200">
                              {m.type === "video" ? (
                                <video src={m.url} className="w-full h-full object-cover cursor-pointer" onClick={() => setViewMedia(m)} />
                              ) : (
                                <img src={m.url} alt="" className="w-full h-full object-cover cursor-pointer" onClick={() => setViewMedia(m)} />
                              )}
                              {m.type === "video" && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[28px] pointer-events-none drop-shadow-lg">▶️</div>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Prix de la pose */}
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3 mt-3.5">
                      <div>
                        <label className="text-[11px] text-gray-500 font-bold uppercase tracking-wider block mb-1.5">💰 Prix de ma pose (€)</label>
                        <input type="number" value={inter.poseurPrixPose || ""} placeholder="0" disabled={isLocked}
                          onChange={e => updateInter(inter.ref, { poseurPrixPose: parseFloat(e.target.value) || 0 })}
                          className={`input text-pink-600 ${isLocked ? "opacity-50" : ""}`} />
                      </div>
                      <div>
                        <label className="text-[11px] text-gray-500 font-bold uppercase tracking-wider block mb-1.5">🧾 Achats avancés (€)</label>
                        <input type="number" value={inter.poseurAchats || ""} placeholder="0" disabled={isLocked}
                          onChange={e => updateInter(inter.ref, { poseurAchats: parseFloat(e.target.value) || 0 })}
                          className={`input text-orange-600 ${isLocked ? "opacity-50" : ""}`} />
                      </div>
                    </div>

                    {/* Note */}
                    <div className="mt-3">
                      <label className="text-[11px] text-gray-500 font-bold uppercase tracking-wider block mb-1.5">📝 Note / commentaire</label>
                      <textarea value={inter.poseurNote || ""} placeholder="Détails sur le chantier..." disabled={isLocked}
                        onChange={e => updateInter(inter.ref, { poseurNote: e.target.value })}
                        className={`input min-h-[60px] resize-y ${isLocked ? "opacity-50" : ""}`} />
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
                      <div className="bg-pink-50 rounded-xl p-3.5 mt-3.5 border border-pink-200">
                        <div className="text-[11px] text-pink-600 font-bold uppercase tracking-wider mb-2">📊 Récapitulatif</div>
                        <div className="flex justify-between text-[13px] text-gray-600 mb-1"><span>Prix de la pose</span><span className="font-bold text-pink-600">{(inter.poseurPrixPose || 0).toLocaleString("fr-FR")} €</span></div>
                        {inter.poseurAchats > 0 && <div className="flex justify-between text-[13px] text-gray-600 mb-1"><span>Achats avancés</span><span className="font-bold text-orange-600">{inter.poseurAchats.toLocaleString("fr-FR")} €</span></div>}
                        <div className="flex justify-between text-sm font-bold border-t border-gray-200 pt-1.5 mt-1"><span className="text-gray-900">Total à percevoir</span><span className="text-pink-600">{((inter.poseurPrixPose || 0) + (inter.poseurAchats || 0)).toLocaleString("fr-FR")} €</span></div>
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
    <>
      {/* Loading screen */}
      {loading && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <AurenisLogo />
          <div className="mt-8 flex gap-1.5">
            {[0,1,2].map(i => <div key={i} className="w-2 h-2 rounded-full bg-primary-600 animate-pulse opacity-60" style={{ animationDelay: `${i * 0.2}s`, animationDuration: "1.2s" }} />)}
          </div>
          <div className="mt-3.5 text-sm text-gray-500">Chargement des données...</div>
        </div>
      )}

      {!loading && page === "login" && <LoginPage onLogin={a => { setAccount(a); setPage("dashboard"); }} onGoRegister={() => setPage("register")} onGoForgot={() => setPage("forgot")} />}
      {!loading && page === "register" && <RegisterPage onGoLogin={() => setPage("login")} onRegistered={(e, c) => { setVerifyEmail(e); setVerifyCode(c); setPage("verify"); }} />}
      {!loading && page === "verify" && <VerifyPage email={verifyEmail} code={verifyCode} onVerified={() => setPage("verified")} onGoLogin={() => setPage("login")} />}
      {!loading && page === "verified" && <VerifiedPage onGoLogin={() => setPage("login")} />}
      {!loading && page === "forgot" && <ForgotPage onGoLogin={() => setPage("login")} />}
      {!loading && page === "dashboard" && account?.role === "admin" && <AdminDash account={account} onLogout={() => { setAccount(null); setPage("login"); }} interventions={interventions} setInterventions={setInterventions} techs={techs} setTechs={setTechs} specialties={specialties} setSpecialties={setSpecialties} statuts={statuts} setStatuts={setStatuts} />}
      {!loading && page === "dashboard" && account?.role === "tech" && <TechDash account={account} onLogout={() => { setAccount(null); setPage("login"); }} interventions={interventions} setInterventions={setInterventions} techs={techs} specialties={specialties} />}
      {!loading && page === "dashboard" && account?.role === "poseur" && <PoseurDash account={account} onLogout={() => { setAccount(null); setPage("login"); }} interventions={interventions} setInterventions={setInterventions} />}
    </>
  );
}
