# CLAUDE.md — Aurenis Customer

## Projet

Application de gestion d'interventions pour **AquaTech Services** (marque Aurenis). Permet la planification, le suivi et la facturation d'interventions à domicile (plomberie, serrurerie, électricité) avec gestion des rôles Admin / Technicien / Poseur.

## Stack technique

- **Frontend** : React 18 (JSX) — application monolithique single-file
- **Build** : Vite 5
- **Backend** : Supabase (REST API) — table `app_data` (key-value) + bucket `media`
- **Auth** : Custom localStorage (pas de Supabase Auth)
- **Styling** : CSS-in-JS inline + balise `<style>` globale
- **Routing** : State-based (pas de React Router)
- **Déploiement cible** : Vercel

## Commandes

```bash
npm install       # Installer les dépendances
npm run dev       # Serveur de dev sur http://localhost:3000
npm run build     # Build de production
npm run preview   # Preview du build
```

## Structure des fichiers

```
aurenis-customer-main/
├── index.html          # Point d'entrée HTML (lang="fr", font DM Sans)
├── package.json        # Dépendances (react, react-dom, vite, @vitejs/plugin-react)
├── vite.config.js      # Config Vite (port 3000, host: true)
├── README.md           # Instructions de déploiement
└── src/
    ├── main.jsx        # Entry point React (StrictMode)
    └── App.jsx         # Application complète (~1750 lignes)
```

## Architecture de App.jsx

Toute la logique est dans `src/App.jsx`. Voici l'organisation interne :

| Section                    | Lignes (approx.) | Contenu                                                  |
| -------------------------- | ----------------- | -------------------------------------------------------- |
| Données initiales          | 10-37             | `INIT_TECHS`, `INIT_POSEURS`, `INIT_INTERVENTIONS`      |
| Helpers financiers         | 39-51             | `calcCommission()`, `calcNetPatron()`                    |
| Sound effects              | 53-89             | `playKaching()` (Web Audio API)                          |
| WhatsApp helpers           | 91-105            | `sendWhatsApp()`, `waMessageClient()`, `waMessageTech()` |
| Supabase config & helpers  | 107-190           | `supaLoad()`, `supaSave()`, `supaUploadFile()`           |
| MediaLightbox              | 192-210           | Visionneuse plein écran photo/vidéo                      |
| MediaUpload                | ~210-270          | Upload photo/vidéo avec fallback base64                  |
| Design tokens (T)          | ~278              | Couleurs, radius, thème sombre                           |
| Composants réutilisables   | ~280-355          | `Inp`, `Btn`, `Badge`, `KPI`, `Card`, `Modal`, etc.     |
| Pages Auth                 | ~356-460          | `LoginPage`, `RegisterPage`, `VerifyPage`, `ForgotPage`  |
| AddressAutocomplete        | ~483-578          | Google Places API + fallback API Adresse gouv.fr         |
| AdminDash                  | ~607-1287         | Dashboard admin avec 5 onglets                           |
| TechDash                   | ~1291-1478        | Dashboard technicien                                     |
| PoseurDash                 | ~1483-1628        | Dashboard poseur                                         |
| App (root)                 | ~1633-1754        | Composant racine, chargement Supabase, routing           |

## Modèles de données

### Intervention

```javascript
{
  ref: "INT-001",           // Référence unique
  date: "2026-02-11",       // Date YYYY-MM-DD
  heure: "09:00",           // Heure HH:MM
  type: "Plomberie",        // Spécialité
  mode: "Urgence" | "RDV",  // Mode d'intervention
  clientNom, clientPrenom,   // Identité client
  tel: "+33 6 ...",          // Téléphone client
  adresse: "...",            // Adresse complète
  tech: "Ahmed Benali",     // Nom du technicien
  statut: "Planifiée" | "En cours" | "Terminée" | "Validée",
  ttc: 350,                 // Montant TTC
  commRate: 0.20,           // Taux de commission du tech
  poseur: "Rachid Amrani",  // Poseur assigné (ou null)
  poseurCost: 150,           // Coût poseur
  poseurMode: "divise2" | "gratuit" | null,
  poseurPrixPose: 0,         // Prix pose déclaré
  poseurAchats: 0,           // Achats avancés par le poseur
  poseurNote: "",            // Notes du poseur
  techMedias: [],            // [{url, type: "image"|"video", name}]
  poseurMedias: []           // Idem
}
```

### Technicien / Poseur

```javascript
{
  id: "T001",
  name: "Ahmed Benali",
  tel: "+33 6 ...",
  spe: "Plomberie",
  commission: 0.20,       // Tech uniquement
  status: "Disponible" | "En intervention",
  color: "#0EA5E9",
  email: "ahmed@aquatech.fr",
  role: "tech" | "poseur"
}
```

### Compte utilisateur (localStorage)

```javascript
{
  email, password,    // Auth en clair (mode démo)
  name, memberId,     // Lien vers tech/poseur
  role: "admin" | "tech" | "poseur",
  verified: boolean,
  verifyCode?: string,
  resetCode?: string
}
```

## Logique métier — Commissions

```
Commission brute = TTC × commRate
Si poseur mode "divise2" : Commission = brute - (poseurCost / 2)
Net patron = TTC - commission - poseurCost
```

## Rôles et permissions

| Fonctionnalité           | Admin | Tech | Poseur |
| ------------------------ | ----- | ---- | ------ |
| Voir toutes interventions | Oui   | Non  | Non    |
| Créer/modifier une intervention | Oui   | Partiel (TTC) | Partiel (notes, coûts) |
| Valider une intervention | Oui   | Non  | Non    |
| Voir les commissions     | Toutes | Les siennes | Ses coûts |
| Gérer l'équipe           | Oui   | Non  | Non    |
| Upload médias            | Non   | Oui  | Oui    |
| Journal financier        | Oui   | Non  | Non    |
| Paramètres système       | Oui   | Non  | Non    |

## Intégrations externes

### Supabase

- **URL** : `https://yfroontiqlljzllamvek.supabase.co`
- **Table** : `app_data` (clé-valeur pour techs, interventions, specialties, statuts)
- **Storage** : Bucket `media` pour photos/vidéos
- **Sync** : Auto-save via `useEffect` à chaque changement d'état
- **Clé anon** exposée dans le code (acceptable pour démo, pas pour production)

### Google Places API

- **Clé** : exposée dans le code
- **Usage** : Autocomplétion d'adresses dans le formulaire d'intervention
- **Fallback** : API Adresse data.gouv.fr (gratuite, France uniquement)

### WhatsApp

- Protocole `wa.me` pour envoyer des messages aux clients et techniciens
- Templates de messages pour confirmations et assignations

## Design system

### Thème (objet `T`)

```javascript
{
  dark: "#0F1225",        // Fond principal
  bg: "#1B1F3B",          // Fond des cards
  gold: "#C8A44E",        // Accent primaire
  goldLight: "#E8C96A",   // Accent clair
  green: "#059669",       // Succès
  red: "#EF476F",         // Erreur / danger
  blue: "#4361EE",        // Info
  violet: "#7209B7",      // Alternative
  textMuted: "rgba(255,255,255,0.4)",   // Texte tertiaire
  textSoft: "rgba(255,255,255,0.6)",    // Texte secondaire
  radius: 20, radiusSm: 14, radiusXs: 10
}
```

### Couleurs par type

- Plomberie : `#0EA5E9` (bleu ciel)
- Serrurerie : `#8B5CF6` (violet)
- Électricité : `#F59E0B` (ambre)

### Couleurs par statut

- Planifiée : `#818CF8` (bleu)
- En cours : `#F97316` (orange)
- Terminée : `#FFD166` (jaune)
- Validée : `#06D6A0` (vert)

### Breakpoints responsive

- `768px` : Tablette (header en colonne)
- `480px` : Mobile (grilles en 1 colonne)
- `380px` : Petit mobile (KPIs pleine largeur)

## Comptes de démo

| Rôle   | Email              | Mot de passe |
| ------ | ------------------ | ------------ |
| Admin  | admin@aquatech.fr  | Admin123     |
| Tech   | ahmed@aquatech.fr  | (à créer)    |
| Tech   | lucas@aquatech.fr  | (à créer)    |
| Poseur | rachid@aquatech.fr | (à créer)    |

## Points d'attention pour le développement

1. **Fichier monolithique** : Toute l'app est dans `App.jsx` (~1750 lignes). Toute modification doit tenir compte de la taille du fichier.
2. **Pas de TypeScript** : Le projet utilise JSX pur, pas de typage statique.
3. **Auth en clair** : Les mots de passe sont stockés en clair dans localStorage. C'est un mode démo, pas adapté à la production.
4. **Clés API exposées** : Les clés Supabase et Google Places sont en dur dans le code source.
5. **Pas de tests** : Aucun framework de test n'est configuré.
6. **Pas de linter/formatter** : Pas d'ESLint ni Prettier configuré.
7. **Données initiales en dur** : Les techs, poseurs et interventions de démo sont hardcodés dans le fichier.
8. **CSS inline** : Pas de CSS modules ni de bibliothèque de styling. Les styles sont en inline avec des objets JS + une balise `<style>` globale pour les media queries et animations.
